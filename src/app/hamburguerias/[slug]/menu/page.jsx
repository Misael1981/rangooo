import BusinessInfo from "@/components/BusinessInfo";
import CategoriesProducts from "@/components/CategoriesProducts";
import EstablishmentDescription from "@/components/EstablishmentDescription";
import HeaderImage from "@/components/HeaderImage";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

const isConsumptionMethod = (method) => {
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method?.toUpperCase());
};

export default async function MenuPage({ params, searchParams }) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const categoriesRaw = await db.menuCategory.findMany({
    where: { restaurantId: restaurant.id },
    include: { products: true },
    orderBy: { createdAt: "asc" },
  });

  const categories = categoriesRaw.map((cat) => ({
    ...cat,
    createdAt:
      typeof cat.createdAt?.toISOString === "function"
        ? cat.createdAt.toISOString()
        : (cat.createdAt ?? null),
    updatedAt:
      typeof cat.updatedAt?.toISOString === "function"
        ? cat.updatedAt.toISOString()
        : (cat.updatedAt ?? null),
    products: cat.products.map((p) => ({
      ...p,
      price:
        typeof p.price?.toNumber === "function"
          ? p.price.toNumber()
          : Number(p.price),
      createdAt:
        typeof p.createdAt?.toISOString === "function"
          ? p.createdAt.toISOString()
          : (p.createdAt ?? null),
      updatedAt:
        typeof p.updatedAt?.toISOString === "function"
          ? p.updatedAt.toISOString()
          : (p.updatedAt ?? null),
    })),
  }));

  return (
    <div>
      <HeaderImage image={restaurant.coverImageUrl} alt={restaurant.name} />

      <EstablishmentDescription restaurant={restaurant} />
      <BusinessInfo restaurant={restaurant} />
      <CategoriesProducts
        categories={categories}
        slug={slug}
        segment={restaurant.category}
      />
    </div>
  );
}
