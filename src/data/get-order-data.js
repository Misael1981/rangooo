import { db } from "@/lib/prisma";

export async function getOrdersData(slug) {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
      deliveryFee: true,
    },
  });

  const orders = await db.order.findMany({
    where: { restaurantId: restaurant.id },
    select: {
      id: true,
      user: { select: { name: true, phone: true } },
      totalAmount: true,
      deliveryFee: true,
      status: true,
      consumptionMethod: true,
      createdAt: true,
      deliveryAddress: true,
      items: {
        select: { quantity: true, product: { select: { name: true } } },
      },
    },
  });

  return { restaurant, orders };
}
