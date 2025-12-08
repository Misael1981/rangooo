export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound, redirect } from "next/navigation";
import { getEstablishmentMenuData } from "@/app/actions/get-establishment-menu-data";
import AppMenuUI from "./components/AppMenuUI";
import { unstable_cache } from "next/cache";
import { enumCategoryToRoute } from "@/app/utils/constants";
import { db } from "@/lib/prisma";
import QrCode from "@/components/QrCode";

// Função para buscar e CACNEAR (Build Time ou Revalidate Time)
// Use o cache do Next.js para que esta função não bata no DB a cada request
const getCachedValidRouteSlugs = unstable_cache(
  async () => {
    const distinctCategories = await db.restaurant.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    const routeSlugs = distinctCategories
      .map((c) => c.category)
      .map(enumCategoryToRoute);

    return [...new Set(routeSlugs)];
  },
  ["valid-category-slugs"],
  { revalidate: 3600 },
);

const isConsumptionMethod = (method) => {
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method?.toUpperCase());
};

export default async function MenuPage({ params, searchParams }) {
  const { categories, slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const VALID_ROUTE_SLUGS = await getCachedValidRouteSlugs();
  if (!VALID_ROUTE_SLUGS.includes(categories)) {
    return redirect("/404");
  }

  const establishment = await getEstablishmentMenuData(slug);

  if (!establishment) {
    return redirect("/404");
  }

  const dbCategoriaSlug = enumCategoryToRoute(establishment.category);

  if (dbCategoriaSlug !== categories) {
    return redirect(`/${dbCategoriaSlug}/${slug}/menu`);
  }

  return (
    <div className="relative min-h-screen bg-yellow-50 sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto max-w-xl bg-white shadow-all-sides">
        <AppMenuUI category={categories} menuData={establishment} />
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
