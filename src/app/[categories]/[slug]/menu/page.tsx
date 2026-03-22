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

const CATEGORY_TO_SLUG: Record<string, string> = {
  RESTAURANT: "restaurantes",
  PIZZARIA: "pizzarias",
  HAMBURGUERIA: "hamburguerias",
  SORVETERIA: "sorveterias",
  ADEGA: "adegas",
};

// 1. Cache para as categorias (Revalida a cada 1 hora)
const getCachedValidCategories = unstable_cache(
  async () => {
    const distinctCategories = await db.restaurant.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return distinctCategories
      .map((c) => CATEGORY_TO_SLUG[c.category])
      .filter((slug): slug is string => !!slug);
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
    return notFound();
  }

  const establishment = await getEstablishmentMenuData(slug);

  if (!establishment) {
    return notFound();
  }

  const correctCategoryPath =
    CATEGORY_TO_SLUG[establishment.category] ||
    establishment.category.toLowerCase() + "s";

  if (correctCategoryPath !== categories) {
    return redirect(
      `/${correctCategoryPath}/${slug}/menu?consumptionMethod=${consumptionMethod}`,
    );
  }

  return (
    <PageContainer>
      <AppMenuUI
        category={
          categories as
            | "pizzarias"
            | "restaurantes"
            | "hamburguerias"
            | "sorveterias"
            | "adegas"
        }
        establishment={establishment}
      />
    </PageContainer>
  );
}
