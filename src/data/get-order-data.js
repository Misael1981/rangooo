import { db } from "@/lib/prisma";

export async function getOrdersData(slug) {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
    },
  });

  const orders = await db.order.findMany({
    where: { restaurantId: restaurant.id },
    select: {
      id: true,
      user: { select: { name: true, phone: true } },
      totalAmount: true,
      status: true,
      consumptionMethod: true,
      createdAt: true,
      deliveryAddress: true,
      items: {
        select: { quantity: true, product: { select: { name: true } } },
      },
    },
  });

  const viewOrders = orders.map((o) => ({
    ...o,
    totalAmount: Number(o.totalAmount ?? 0),
    createdAt:
      o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt,
    items:
      o.items?.map((i) => ({ name: i.product?.name, quantity: i.quantity })) ??
      [],
  }));

  return { restaurant, orders: viewOrders };
}
