import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  // 1. Garante o recebimento dos params (Padrão Next 15)
  const p = await params;
  const sp = await searchParams;

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

  // 2. Lógica de Data simplificada e Robusta
  const now = new Date();
  // Ajuste para fuso de Brasília (GMT-3) de forma manual para garantir consistência
  const brDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const brHour = brDate.getUTCHours();

  const startOfShift = new Date(now);
  const endOfShift = new Date(now);

  if (brHour < 6) {
    startOfShift.setDate(startOfShift.getDate() - 1);
  }
  startOfShift.setHours(6, 0, 0, 0);
  endOfShift.setHours(6, 0, 0, 0);
  if (brHour >= 6) {
    endOfShift.setDate(endOfShift.getDate() + 1);
  }

  // 3. Filtros
  const statusFilter = sp.status?.toUpperCase();
  const methodFilter = sp.consumptionMethod?.toUpperCase();

  const orders = await db.order.findMany({
    where: {
      restaurantId: restaurant.id,
      createdAt: {
        gte: startOfShift,
        lt: endOfShift,
      },
      ...(statusFilter && { status: statusFilter }),
      ...(methodFilter && { consumptionMethod: methodFilter }),
    },
    include: {
      user: { select: { name: true, phone: true } },
      items: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 4. SERIALIZAÇÃO EXTREMA (Transforma tudo em tipos primitivos)
  // Isso evita o erro de "Server Components render" em produção
  const serializedOrders = JSON.parse(JSON.stringify(orders)).map((o) => ({
    ...o,
    totalAmount: Number(o.totalAmount),
    deliveryFee: Number(o.deliveryFee),
    // Garantimos que os itens sejam um array limpo
    items:
      o.items?.map((i) => ({
        name: i.product?.name,
        quantity: i.quantity,
      })) || [],
  }));

  return (
    <div className="min-h-screen p-6">
      <HeaderOrders totalOrders={serializedOrders.length} />

      <div className="mb-10 flex flex-col gap-8">
        <ConsumptionAndPaymentMethodsForm
          paymentMethods={restaurant.paymentMethods}
          consumptionMethods={restaurant.consumptionMethods}
        />

        <DeliverySettingsForm
          deliveryFee={Number(restaurant.deliveryFee)}
          restaurantId={restaurant.id}
        />
      </div>

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
        restaurantId={restaurant.id}
      />

      <FiltersOrders />

      <section className="mt-8 flex flex-col items-center justify-center gap-4">
        {serializedOrders.length > 0 ? (
          serializedOrders.map((order) => (
            <CardOrder key={order.id} order={order} />
          ))
        ) : (
          <p className="mt-10 text-gray-500">Nenhum pedido nesta jornada.</p>
        )}
      </section>
    </div>
  );
}
