"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const createOrder = async (input) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Not authenticated");

  // 1. Busca Usuário e Restaurante em paralelo (ganho de performance)
  const [user, restaurant] = await Promise.all([
    db.user.findFirst({
      where: { OR: [{ id: session.user.id }, { email: session.user.email }] },
    }),
    db.restaurant.findUnique({
      where: { slug: input.slug },
      select: { id: true },
    }),
  ]);

  if (!user || !restaurant) throw new Error("User or restaurant not found");

  let totalAmount = 0;

  // 2. Processa itens e calcula o total em um único loop
  const itemsData = input.products.map((p) => {
    const qty = Math.max(1, Number(p.quantity || 1));
    const basePrice = Number(p.price || 0);
    const extrasPrice =
      p.extras?.reduce((acc, e) => acc + Number(e.price || 0), 0) || 0;

    // Soma ao total acumulado da ordem
    totalAmount += (basePrice + extrasPrice) * qty;

    return {
      productId: p.productId ?? p.id,
      quantity: qty,
      priceAtOrder: basePrice,
      customName: p.name,
      extras: p.extras ? JSON.stringify(p.extras) : null,
    };
  });

  // 3. Cria o pedido no banco
  return await db.order.create({
    data: {
      userId: user.id,
      restaurantId: restaurant.id,
      status: "PENDING",
      consumptionMethod: input.consumptionMethod,
      deliveryAddress: input.deliveryAddress ?? null,
      deliveryFee: input.deliveryFee ?? 0,
      totalAmount,
      items: { create: itemsData },
    },
  });
};
