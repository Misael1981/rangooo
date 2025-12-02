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

  const orders = await prisma.order.findMany({
    where: {
      restaurantId: restaurant.id,
      OR: windows.map(({ start, end }) => ({
        createdAt: { gte: start, lt: end },
      })),
    },
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
    orderBy: { createdAt: "asc" },
  });

  const viewOrders = orders.map((o) => ({
    ...o,
    items:
      o.items?.map((i) => ({ name: i.product?.name, quantity: i.quantity })) ??
      [],
  }));
  const ordersData = viewOrders;

  console.log("orders: ", orders);
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
