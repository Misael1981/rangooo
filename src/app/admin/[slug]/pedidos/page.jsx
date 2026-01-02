import CardOrder from "./components/CardOrder";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";
import { getOrdersData } from "@/data/get-order-data";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;

  const data = await getOrdersData(p.slug, sp);
  if (!data) return notFound();

  return (
    <div className="min-h-screen p-6">
      {/* Nível 1: Dados básicos */}
      <HeaderOrders totalOrders={data.orders.length} />

      {/* Nível 2: Componente que você mexeu ontem */}
      {/* Comente esta linha se o erro persistir */}
      {/* <DeliverySettingsForm
        deliveryFee={data.restaurant.deliveryFee}
        restaurantId={data.restaurant.id}
      /> */}

      {/* Nível 3: Listagem de Pedidos (Onde o 418 costuma morar) */}
      <section className="mt-8 flex flex-col gap-4">
        {data.orders.map((order) => (
          // Use o fallback de erro aqui
          <CardOrder key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}
