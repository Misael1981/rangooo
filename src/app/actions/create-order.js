"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendOrderToPrint } from "@/lib/printing/client";

export const createOrder = async (input) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Not authenticated");

  // 1. Transação: cria pedido + itens
  const order = await db.$transaction(async (tx) => {
    const [user, restaurant] = await Promise.all([
      tx.user.findFirst({
        where: {
          OR: [{ id: session.user.id }, { email: session.user.email }],
        },
      }),
      tx.restaurant.findUnique({
        where: { slug: input.slug },
        select: { id: true },
      }),
    ]);

    if (!user || !restaurant) {
      throw new Error("User or restaurant not found");
    }

    // Número sequencial diário
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const ordersToday = await tx.order.count({
      where: {
        restaurantId: restaurant.id,
        createdAt: { gte: startOfDay },
      },
    });

    const nextOrderNumber = ordersToday + 1;

    let totalAmount = 0;

    const itemsData = input.products.map((p) => {
      const quantity = Math.max(1, Number(p.quantity ?? 1));
      const basePrice = Number(p.price ?? 0);
      const extrasPrice =
        p.extras?.reduce((acc, e) => acc + Number(e.price ?? 0), 0) ?? 0;

      totalAmount += (basePrice + extrasPrice) * quantity;

      return {
        productId: p.productId ?? p.id,
        quantity,
        priceAtOrder: basePrice,
        customName: p.name,
        extras: p.extras ? JSON.stringify(p.extras) : null,
      };
    });

    return tx.order.create({
      data: {
        userId: user.id,
        restaurantId: restaurant.id,
        orderNumber: nextOrderNumber,
        status: "PENDING",
        consumptionMethod: input.consumptionMethod,
        deliveryAddress: input.deliveryAddress ?? null,
        deliveryFee: input.deliveryFee ?? 0,
        totalAmount,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
        user: true,
      },
    });
  });

  // 2. Envio para impressão (fora da transação)
  try {
    const printData = {
      id: order.id,
      number: `#${String(order.orderNumber).padStart(2, "0")}`,
      customerName: order.user.name || "Cliente",
      customerPhone: order.user.phone || "",
      items: order.items.map((item) => ({
        name: item.customName,
        quantity: item.quantity,
        price: Number(item.priceAtOrder),
      })),
      subtotal: Number(order.totalAmount) - Number(order.deliveryFee ?? 0),
      deliveryFee: Number(order.deliveryFee ?? 0),
      total: Number(order.totalAmount),
      paymentMethod: input.paymentMethod || "Não informado",
      deliveryAddress: input.deliveryAddress || "",
      notes: input.notes || "",
      createdAt: order.createdAt,
    };

    const printId = await sendOrderToPrint(order.restaurantId, printData);

    // ✅ AQUI ESTÁ A CORREÇÃO PRINCIPAL
    if (typeof printId === "string" && printId.length > 0) {
      await db.order.update({
        where: { id: order.id },
        data: { printId }, // ← SEM boolean
      });

      console.log(`✅ Pedido #${order.orderNumber} enviado para impressão`);
    }
  } catch (err) {
    console.warn(
      `⚠️ Pedido #${order.orderNumber} criado, mas erro no printId:`,
      err?.message ?? err,
    );
  }

  // 3. Retorno seguro
  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    deliveryFee: Number(order.deliveryFee),
    items: order.items.map((item) => ({
      ...item,
      priceAtOrder: Number(item.priceAtOrder),
    })),
  };
};
