import AppMenuUI from "./components/AppMenuUI";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getEstablishmentMenuData } from "@/data/get-menu-data-for-establishment";
import { PageContainer } from "@/components/PageContainer";

type MenuPageProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};

// 1. Cache para as categorias (Revalida a cada 1 hora)
const getCachedValidCategories = unstable_cache(
  async () => {
    const distinctCategories = await db.restaurant.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return distinctCategories.map((c) => c.category.toLowerCase() + "s");
  },
  ["valid-category-slugs"],
  { revalidate: 3600, tags: ["categories"] },
);

const isConsumptionMethod = (method: string | undefined) => {
  if (!method) return false;
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method.toUpperCase());
};

export default async function MenuPage({
  params,
  searchParams,
}: MenuPageProps) {
  const { categories, slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const validCategories = await getCachedValidCategories();
  if (!validCategories.includes(categories)) {
    return redirect("/404");
  }

  const establishment = await getEstablishmentMenuData(slug);

  if (!establishment) {
    return notFound();
  }

  const correctCategoryPath = establishment.category.toLowerCase() + "s";
  if (correctCategoryPath !== categories) {
    return redirect(
      `/${correctCategoryPath}/${slug}/menu?consumptionMethod=${consumptionMethod}`,
    );
  }

  return (
    <PageContainer>
      <AppMenuUI category={categories} establishment={establishment} />
    </PageContainer>
  );
}
