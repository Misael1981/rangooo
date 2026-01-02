import { notFound } from "next/navigation";
import { getOrdersData } from "@/data/get-order-data";
import HeaderOrders from "./components/HeaderOrders";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;
  const slug = p.slug;

  const data = await getOrdersData(slug, sp);

  const { restaurant, orders } = data;

  if (!data.restaurant) return notFound();

  return (
    <div className="min-h-screen p-6">
      <HeaderOrders totalOrders={orders.length} />

      <div className="flex flex-col items-center justify-center">
        <ConsumptionAndPaymentMethodsForm
          paymentMethods={restaurant.paymentMethods}
          consumptionMethods={restaurant.consumptionMethods}
        />
        <DeliverySettingsForm
          deliveryFee={restaurant.deliveryFee}
          restaurantId={restaurant.id}
        />
      </div>

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
        restaurantId={restaurant.id}
      />

      <FiltersOrders />

      <section className="flex flex-col items-center justify-center gap-4">
        {orders.length > 0 ? (
          orders.map((order) => <CardOrder key={order.id} order={order} />)
        ) : (
          <p className="mt-10 text-gray-500">Nenhum pedido nesta jornada.</p>
        )}
      </section>
    </div>
  );
}
