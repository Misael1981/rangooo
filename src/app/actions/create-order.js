"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const createOrder = async (input) => {
  if (!input?.slug) throw new Error("Missing restaurant slug");
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Not authenticated");
  let user = null;
  if (session.user.id) {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, phone: true, address: true },
    });
  }
  if (!user && session.user.email) {
    user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, phone: true, address: true },
    });
  }

  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug },
    select: { id: true },
  });
  if (!user || !restaurant) {
    throw new Error("User or restaurant not found");
  }
  const productIds = Array.isArray(input.products)
    ? input.products.map((p) => p.productId ?? p.id).filter(Boolean)
    : [];
  if (productIds.length === 0) {
    throw new Error("No valid products to create order");
  }
  const productsRows = await db.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true },
  });
  const priceMap = Object.fromEntries(productsRows.map((r) => [r.id, Number(r.price)]));
  const itemsData = input.products
    .map((p) => {
      const pid = p.productId ?? p.id;
      const price = priceMap[pid];
      const qty = Math.max(1, Number(p.quantity ?? 1));
      if (!pid || price === undefined) return null;
      return { productId: pid, quantity: qty, priceAtOrder: price };
    })
    .filter(Boolean);
  const total = itemsData.reduce((acc, it) => acc + Number(it.priceAtOrder) * it.quantity, 0);
  await db.order.create({
    data: {
      userId: user.id,
      status: "PENDING",
      consumptionMethod: input.consumptionMethod,
      deliveryAddress: input.deliveryAddress ?? null,
      restaurantId: restaurant.id,
      items: { create: itemsData },
      totalAmount: total,
      deliveryFee: input.deliveryFee ?? 0,
    },
  });
};
