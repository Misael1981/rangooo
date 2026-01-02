import { notFound } from "next/navigation";
import { getOrdersData } from "@/data/get-order-data";
import HeaderOrders from "./components/HeaderOrders";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;
  const slug = p.slug;

  const data = await getOrdersData(slug);

  const { restaurant, orders } = data;

  if (!data.restaurant) return notFound();

  return (
    <div className="min-h-screen p-6">
      <HeaderOrders totalOrders={orders.length} />
    </div>
  );
}
