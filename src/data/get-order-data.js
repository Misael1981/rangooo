import { db } from "@/lib/prisma";

export async function getOrdersData(slug, sp) {
  const statusParam = String(sp?.status || "");
  const methodParam = String(sp?.consumptionMethod || "");

  const allowedStatuses = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "READY_FOR_PICKUP",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];
  const statusFilter = allowedStatuses.includes(statusParam.toUpperCase())
    ? statusParam.toUpperCase()
    : null;
  const methodFilter = ["DELIVERY", "PICKUP", "DINE_IN"].includes(
    methodParam.toUpperCase(),
  )
    ? methodParam.toUpperCase()
    : null;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
    },
  });

  const safeRestaurant = {
    id: String(restaurant.id),
    name: String(restaurant.name),
    consumptionMethods: restaurant.consumptionMethods,
    paymentMethods: restaurant.paymentMethods,
    deliveryFee: restaurant.deliveryFee ? Number(restaurant.deliveryFee) : 0,
  };

  // --- LÓGICA DE DATA ---

  const now = new Date();
  const currentHour = now.getHours();
  const cutoffHour = 6;

  const startOfShift = new Date(now);
  const endOfShift = new Date(now);

  if (currentHour < cutoffHour) {
    startOfShift.setDate(startOfShift.getDate() - 1);
    startOfShift.setHours(cutoffHour, 0, 0, 0);

    endOfShift.setHours(cutoffHour, 0, 0, 0);
  } else {
    startOfShift.setHours(cutoffHour, 0, 0, 0);

    endOfShift.setDate(endOfShift.getDate() + 1);
    endOfShift.setHours(cutoffHour, 0, 0, 0);
  }

  // --- FIM DA NOVA LÓGICA ---

  const whereStatus = statusFilter ? { status: statusFilter } : {};
  const whereMethod = methodFilter ? { consumptionMethod: methodFilter } : {};
  const orders = await db.order.findMany({
    where: {
      restaurantId: restaurant.id,
      createdAt: {
        gte: startOfShift,
        lt: endOfShift,
      },
      ...whereStatus,
      ...whereMethod,
    },
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
    orderBy: { createdAt: "desc" },
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

  return { restaurant: safeRestaurant, orders: viewOrders };
}
