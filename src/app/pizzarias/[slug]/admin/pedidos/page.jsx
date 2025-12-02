import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import { buildWindows, mapBusinessHoursToByDay } from "@/lib/operating-hours";

export default async function RestaurantOrdersPage({ params }) {
  const p = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: p.slug },
    select: { id: true, name: true, consumptionMethods: true },
  });

  if (!restaurant) notFound();

  const bh = await prisma.businessHours.findMany({
    where: { restaurantId: restaurant.id },
    select: { dayOfWeek: true, timeSlots: true, isClosed: true },
  });

  const byDay = mapBusinessHoursToByDay(bh);
  const windows = buildWindows(byDay, new Date());

  console.log("windows", windows);

  const now = new Date();
  const activeWindow =
    windows.find((w) => w.start <= now && now < w.end) ||
    windows.filter((w) => w.end <= now).sort((a, b) => b.end - a.end)[0] ||
    null;

  const whereDate = activeWindow
    ? { createdAt: { gte: activeWindow.start, lt: now } }
    : windows.length > 0
      ? {
          OR: windows.map(({ start, end }) => ({
            createdAt: { gte: start, lt: end },
          })),
        }
      : {};

  const orders =
    windows.length === 0
      ? []
      : await prisma.order.findMany({
          where: { restaurantId: restaurant.id, ...whereDate },
          select: {
            id: true,
            user: { select: { name: true, phone: true } },
            totalAmount: true,
            deliveryFee: true,
            status: true,
            consumptionMethod: true,
            createdAt: true,
            deliveryAddress: true,
            items: { select: { quantity: true, product: { select: { name: true } } } },
          },
          orderBy: { createdAt: "desc" },
        });

  const viewOrders = orders.map((o) => ({
    ...o,
    totalAmount: Number(o.totalAmount ?? 0),
    deliveryFee: Number(o.deliveryFee ?? 0),
    createdAt:
      o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt,
    items:
      o.items?.map((i) => ({ name: i.product?.name, quantity: i.quantity })) ??
      [],
  }));

  const ordersData = viewOrders;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <HeaderOrders totalOrders="23" pendingOrders="5" />

      {/* Métodos de Consumo */}
      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
      />

      {/* Filtros */}
      <FiltersOrders />

      {/* Card de pedido */}
      <section className="flex flex-col items-center justify-center gap-4">
        {ordersData.map((order) => (
          <CardOrder key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}
