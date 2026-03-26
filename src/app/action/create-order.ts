"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { sendOrderToPrint } from "@/lib/send-order-to-print";
import { CreateOrderInputDTO, OrderResponseDTO } from "@/dtos/create-order.dto";
import { parseExtras } from "@/helpers/parse-extras";
import { serializeOrder } from "@/helpers/serialize-order";
import { pusherServer } from "@/lib/pusher";
import { sendPushToDeliveryPersons } from "./send-push-to-delivery-persons";

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

    let totalAmount = 0;

    const itemsData = input.products.map((p) => {
      const quantity = Math.max(1, Number(p.quantity ?? 1));
      const basePrice = Number(p.price ?? 0);

      const extrasPrice =
        p.extras?.reduce((acc, e) => acc + Number(e.price ?? 0), 0) ?? 0;

      totalAmount += (basePrice + extrasPrice) * quantity;

      return {
        productId: p.productId ?? p.id!,
        quantity,
        priceAtOrder: basePrice,
        customName: p.name,
        extras: p.extras ? JSON.stringify(p.extras) : null,
      };
    });

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
          create: itemsData,
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

  console.log("Como o pedido está sendo contruido: ", order);

  if (order.consumptionMethod === "DELIVERY") {
    console.log("🚀 Disparando evento Pusher para pedido:", order.id);
    pusherServer
      .trigger("delivery-orders", "new-order", {
        orderId: order.id,
        restaurantName: order.restaurant.name,
      })
      .then(() => console.log("✅ Evento Pusher disparado com sucesso!"))
      .catch((err) => console.error("❌ Erro ao avisar Pusher:", err));

    await sendPushToDeliveryPersons();
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
      deliveryFee: order.deliveryFee,
      payment: order.paymentMethod,
      items: order.items.map((item) => ({
        name: item.customName,
        category: item.product?.menuCategory?.name || "Geral",
        quantity: item.quantity,
        price: Number(item.priceAtOrder),
        extras: parseExtras(item.extras)
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e),
      })),
      total: Number(order.totalAmount),
      details: order.deliveryAddress,
    };

    console.log("Dados que vão para a impressora!", printData);

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
