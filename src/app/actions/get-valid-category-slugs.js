"use server";

import { db } from "@/lib/prisma";

export async function getValidCategorySlugs() {
  const categories = await db.restaurant.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  const routeSlugs = categories.map((c) => c.category).map(enumCategoryToRoute);

  return [...new Set(routeSlugs)];
}
