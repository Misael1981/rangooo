import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";

// Definimos o fuso horário de Brasília para evitar discrepâncias entre Server e Client
const TIMEZONE_OFFSET = -3;

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
  const allowedMethods = ["DELIVERY", "PICKUP", "DINE_IN"];

  const statusFilter = allowedStatuses.includes(statusParam.toUpperCase())
    ? statusParam.toUpperCase()
    : null;
  const methodFilter = allowedMethods.includes(methodParam.toUpperCase())
    ? methodParam.toUpperCase()
    : null;

  const restaurant = await db.restaurant.findUnique({
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

  // --- LÓGICA DE DATA CORRIGIDA (Determinística) ---
  // Criamos a data baseada em UTC para que o cálculo seja idêntico no Server e no Client
  const now = new Date();
  const utcHour = now.getUTCHours();

  // Ajuste manual simples para hora de Brasília (ou use date-fns-tz se preferir)
  const brHour = (utcHour + TIMEZONE_OFFSET + 24) % 24;
  const cutoffHour = 6;

  const startOfShift = new Date(now);
  const endOfShift = new Date(now);

  if (brHour < cutoffHour) {
    startOfShift.setUTCDate(startOfShift.getUTCDate() - 1);
  }

  // Forçamos horários fixos em UTC para evitar que a hidratação mude os segundos/milissegundos
  startOfShift.setUTCHours(cutoffHour - TIMEZONE_OFFSET, 0, 0, 0);
  endOfShift.setUTCHours(cutoffHour - TIMEZONE_OFFSET + 24, 0, 0, 0);

  // --- BUSCA NO BANCO ---
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
    include: {
      user: { select: { name: true, phone: true } },
      items: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  // --- SERIALIZAÇÃO LIMPA ---
  const viewOrders = orders.map((o) => ({
    id: o.id,
    totalAmount: Number(o.totalAmount ?? 0),
    deliveryFee: Number(o.deliveryFee ?? 0),
    status: o.status,
    consumptionMethod: o.consumptionMethod,
    deliveryAddress: o.deliveryAddress,
    createdAt: o.createdAt.toISOString(), // Essencial: passar como string
    user: o.user,
    items: o.items.map((i) => ({
      name: i.product?.name,
      quantity: i.quantity,
    })),
  }));

  // const deliveryFeeValue = Number(restaurant.deliveryFee ?? 0);

  return (
    <div className="min-h-screen p-6">
      <HeaderOrders totalOrders={viewOrders.length} />

      <div className="mb-10 space-y-8">
        <ConsumptionAndPaymentMethodsForm
          paymentMethods={restaurant.paymentMethods}
          consumptionMethods={restaurant.consumptionMethods}
        />

        {/* <DeliverySettingsForm
          deliveryFee={deliveryFeeValue}
          restaurantId={restaurant.id}
        /> */}
      </div>

      <hr className="my-8" />

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
        restaurantId={restaurant.id}
      />

      <FiltersOrders />

      <section className="mt-8 flex flex-col items-center justify-center gap-4">
        {viewOrders.length > 0 ? (
          viewOrders.map((order) => <CardOrder key={order.id} order={order} />)
        ) : (
          <div className="w-full rounded-lg bg-gray-50 p-10 text-center">
            <p className="text-gray-500">
              Nenhum pedido nesta jornada (das 06h às 06h).
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
