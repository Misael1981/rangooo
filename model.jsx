import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;
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

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: p.slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
      deliveryFee: true,
    },
  });

  if (!restaurant) return notFound();

  const deliveryFee = Number(restaurant.deliveryFee ?? 0);

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
  const orders = await prisma.order.findMany({
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
      <HeaderOrders totalOrders={viewOrders.length} />

      <ConsumptionAndPaymentMethodsForm
        paymentMethods={restaurant.paymentMethods}
        consumptionMethods={restaurant.consumptionMethods}
      />

      <DeliverySettingsForm
        deliveryFee={deliveryFee}
        restaurantId={restaurant.id}
      />

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
        restaurantId={restaurant.id}
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
