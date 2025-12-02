import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";

export default async function RestaurantOrdersPage({ params }) {
  const p = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: p.slug },
    select: { id: true, name: true, consumptionMethods: true },
  });

  if (!restaurant) notFound();

  // --- NOVA LÓGICA DE DATA (O Pulo do Gato) ---

  const now = new Date();
  const currentHour = now.getHours();
  const cutoffHour = 6; // O dia "vira" às 6 da manhã. Ajuste conforme necessidade.

  // Criamos as datas de início e fim da "Jornada"
  const startOfShift = new Date(now);
  const endOfShift = new Date(now);

  if (currentHour < cutoffHour) {
    // Se são 02:00 da manhã, estamos vendo a jornada de "Ontem"
    startOfShift.setDate(startOfShift.getDate() - 1);
    startOfShift.setHours(cutoffHour, 0, 0, 0); // Ontem às 06:00

    endOfShift.setHours(cutoffHour, 0, 0, 0); // Hoje às 06:00
  } else {
    // Se são 14:00, estamos na jornada de "Hoje"
    startOfShift.setHours(cutoffHour, 0, 0, 0); // Hoje às 06:00

    endOfShift.setDate(endOfShift.getDate() + 1);
    endOfShift.setHours(cutoffHour, 0, 0, 0); // Amanhã às 06:00
  }

  // --- FIM DA NOVA LÓGICA ---

  const orders = await prisma.order.findMany({
    where: {
      restaurantId: restaurant.id,
      createdAt: {
        gte: startOfShift,
        lt: endOfShift, // Pega tudo até o corte da manhã seguinte
      },
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

  return (
    <div className="min-h-screen p-6">
      <HeaderOrders totalOrders={viewOrders.length} pendingOrders="0" />

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
      />

      <FiltersOrders />

      <section className="flex flex-col items-center justify-center gap-4">
        {viewOrders.length > 0 ? (
          viewOrders.map((order) => <CardOrder key={order.id} order={order} />)
        ) : (
          <p className="mt-10 text-gray-500">Nenhum pedido nesta jornada.</p>
        )}
      </section>
    </div>
  );
}
