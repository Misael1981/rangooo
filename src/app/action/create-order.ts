"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { sendOrderToPrint } from "@/lib/send-order-to-print";
import {
  CreateOrderInputDTO,
  OrderExtraDTO,
  OrderResponseDTO,
} from "@/dtos/create-order.dto";
import { serializeOrder } from "@/helpers/serialize-order";
import { pusherServer } from "@/lib/pusher";
import { sendPushToDeliveryPersons } from "./send-push-to-delivery-persons";
import { Prisma } from "@/generated/prisma/client";
import { parseJsonArray } from "@/helpers/parse-json-array";
import { sendPushToEstablishments } from "./send-push-to-establishments";

export const createOrder = async (
  input: CreateOrderInputDTO,
): Promise<OrderResponseDTO> => {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Não autenticado");

  const order = await db.$transaction(async (tx) => {
    const [user, restaurant] = await Promise.all([
      tx.user.findFirst({
        where: {
          OR: [
            { id: session.user.id },
            { email: session.user.email as string },
          ],
        },
      }),
      tx.restaurant.findUnique({
        where: { slug: input.slug },
        select: { id: true, name: true },
      }),
    ]);

    if (!user || !restaurant)
      throw new Error("Usuário ou Restaurante não encontrado");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Função Nº do pedido
    const currentDay = new Date().getDate();

    const ordersToday = await tx.order.count({
      where: {
        restaurantId: restaurant.id,
        createdAt: { gte: startOfDay },
      },
    });

    const nextOrderNumber = currentDay * 100 + (ordersToday + 1);

    const totalAmount = input.products.reduce((acc, p) => {
      const extrasTotal =
        p.extras?.reduce((sum, e) => sum + (e.price || 0), 0) || 0;

      const additionalTotal =
        p.additionalIngredients?.reduce((sum, e) => sum + (e.price || 0), 0) ||
        0;

      const flavor2AdditionalTotal =
        p.flavor2?.additionalIngredients?.reduce(
          (sum, e) => sum + (e.price || 0),
          0,
        ) || 0;

      const base =
        p.price + extrasTotal + additionalTotal + flavor2AdditionalTotal;

      return acc + base * (p.quantity || 1);
    }, 0);

    const finalDeliveryFee =
      input.consumptionMethod === "DELIVERY" ? (input.deliveryFee ?? 0) : 0;

    const finalTotalAmount = totalAmount + finalDeliveryFee;

    return tx.order.create({
      data: {
        userId: user.id,
        restaurantId: restaurant.id,
        orderNumber: nextOrderNumber,
        status: "PENDING",
        consumptionMethod: input.consumptionMethod,
        paymentMethod: input.payment?.paymentMethod || "NOT_DEFINED",

        deliveryAddress:
          input.consumptionMethod === "DELIVERY"
            ? input.delivery?.address
            : input.consumptionMethod === "DINE_IN"
              ? input.dineInDetails
              : input.pickupDetails,

        deliveryFee: finalDeliveryFee,
        totalAmount: finalTotalAmount,

        items: {
          create: input.products.map((p) => {
            if (!p.productId || !p.quantity) {
              throw new Error(`Produto ou quantidade inválida`);
            }

            return {
              product: {
                connect: { id: p.productId },
              },
              quantity: p.quantity,
              priceAtOrder: p.price,
              customName: p.name,
              extras: JSON.stringify(p.extras || []),
              removedIngredients: JSON.stringify(p.removedIngredients || []),

              additionalIngredients: p.additionalIngredients || Prisma.JsonNull,

              isDouble: !!p.flavor2,
              flavor2Id: p.flavor2?.id || null,
              flavor2Name: p.flavor2?.name || null,
              flavor2Removed: p.flavor2
                ? JSON.stringify(p.flavor2.removedIngredients)
                : null,

              flavor2additionalIngredients:
                p.flavor2?.additionalIngredients || Prisma.JsonNull,
            };
          }),
        },
      },

      include: {
        user: true,
        restaurant: true,
        items: {
          include: {
            product: {
              include: { menuCategory: true },
            },
          },
        },
      },
    });
  });

  pusherServer
    .trigger(`restaurant-${order.restaurantId}`, "order:created", {
      order: {
        id: order.id,
        restaurantName: order.restaurant.name,
        restaurantId: order.restaurantId,
      },
      // Adicionado para debug visual no terminal do VS Code/Cursor
      consoleTolog: `Pedido #${order.orderNumber} disparado para canal: restaurant-${order.restaurantId}`,
    })
    .then(() =>
      console.log(`✅ Pusher disparado para restaurant-${order.restaurantId}`),
    )
    .catch((err) => console.error("❌ Erro Pusher Estabelecimento:", err));
  sendPushToEstablishments({
    slug: order.restaurant.slug,
    restaurantId: order.restaurantId,
  }).catch((err) => console.error("❌ Erro Push:", err));

  if (order.consumptionMethod === "DELIVERY") {
    pusherServer
      .trigger("delivery-orders", "order:created", {
        orderId: order.id,
        restaurantName: order.restaurant.name,
        restaurantId: order.restaurantId,
      })
      .catch((err) => console.error("❌ Erro Pusher:", err));

    sendPushToDeliveryPersons().catch((err) =>
      console.error("❌ Erro Push:", err),
    );
  }

  /* ---------------- Impressão ---------------- */
  try {
    const printData = {
      id: order.id,
      restaurantName: order.restaurant.name,
      number: `#${String(order.orderNumber).padStart(2, "0")}`,
      customerName: input.customer?.name || order.user.name || "Cliente",
      customerPhone: input.customer?.phone || order.user.phone || "",
      method: order.consumptionMethod,
      deliveryFee: Number(order.deliveryFee),
      payment: order.paymentMethod,
      items: order.items.map((item) => {
        const flavor1Extras = parseJsonArray<OrderExtraDTO>(item.extras)
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e);

        const flavor1Removed = parseJsonArray<string>(item.removedIngredients);

        let flavor2Info: {
          name: string;
          extras: string[];
          removed: string[];
        } | null = null;

        if (item.isDouble && item.flavor2Name) {
          const f2Extras = parseJsonArray<OrderExtraDTO>(
            item.flavor2additionalIngredients,
          )
            .map((e) => e.name || e.title)
            .filter((e): e is string => !!e);

          const f2Removed = parseJsonArray<string>(item.flavor2Removed);

          flavor2Info = {
            name: item.flavor2Name,
            extras: f2Extras,
            removed: f2Removed,
          };
        }

        return {
          name: item.customName,
          category: item.product?.menuCategory?.name || "Geral",
          quantity: item.quantity,
          price: Number(item.priceAtOrder),

          extras: flavor1Extras,
          removedIngredients: flavor1Removed,

          isDouble: item.isDouble,
          flavor2: flavor2Info,
        };
      }),
      total: Number(order.totalAmount),
      details: order.deliveryAddress,
    };

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout Impressora")), 15000),
    );

    const printId = await Promise.race([
      sendOrderToPrint(order.restaurantId, printData),
      timeoutPromise,
    ]).catch((err) => {
      console.warn(
        `⚠️ Falha na comunicação com a impressora (#${order.orderNumber}):`,
        err.message,
      );
      return null;
    });

    if (printId) {
      await db.order.update({
        where: { id: order.id },
        data: { printId: printId as string },
      });
      console.log(
        `✅ Impressão confirmada para o pedido #${order.orderNumber}`,
      );
    }
  } catch (criticalErr) {
    console.error("❌ Erro crítico no fluxo de impressão:", criticalErr);
  }

  return serializeOrder(order);
};
