import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

export default async function PizzariaMenuPage({ params }) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-[--brand-primary]">
        {restaurant.name}
      </h1>
    </div>
  );
}
