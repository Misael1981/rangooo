import { db } from "@/lib/prisma";
import HeaderMenu from "./components/HeaderMenu";
import { notFound } from "next/navigation";
import RestaurantCategories from "./components/RestaurantCategories";
import CategoriesProducts from "./components/CategoriesProducts";

const isConsumptionMethod = (method) => {
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method?.toUpperCase());
};

export default async function MenuPage({ params, searchParams }) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      brandColors: true,
      category: true,
      address: true,
    },
  });

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

  if (!restaurant) {
    return notFound();
  }

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  return (
    <div className="w-full">
      {/* Exemplo de uso: passe para seu componente de categorias */}
      <HeaderMenu
        image={restaurant.coverImageUrl}
        alt="Imagem do restaurante"
      />
      <RestaurantCategories restaurant={restaurant} categories={categories} />
      <CategoriesProducts categories={categories} slug={slug} />
    </div>
  );
}
