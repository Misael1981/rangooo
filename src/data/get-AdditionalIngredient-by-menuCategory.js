import "server-only";
import { cache } from "react";
import { db } from "@/lib/prisma";
import { toPlain } from "@/lib/utils";

export const getAdditionalIngredientByMenuCategory = cache(async (menuCategoryId) => {
  const rows = await db.additionalIngredient.findMany({
    where: { menuCategoryId },
    orderBy: { name: "asc" },
  });
  return toPlain(rows);
});
