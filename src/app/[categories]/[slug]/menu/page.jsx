export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { getEstablishmentMenuData } from "@/app/actions/get-establishment-menu-data";
import AppMenuUI from "./components/AppMenuUI";
import { unstable_cache } from "next/cache";
import { enumCategoryToRoute, VALID_ROUTE_SLUGS } from "@/app/utils/constants";
import { db } from "@/lib/prisma";

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

export default async function MenuPage({ params }) {
  const { categories, slug } = await params;

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

  return <AppMenuUI category={categories} menuData={establishment} />;
}
