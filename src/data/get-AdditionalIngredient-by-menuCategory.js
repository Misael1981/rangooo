import "server-only";
import { cache } from "react";
import { db } from "@/lib/prisma";

export const getAdditionalIngredientByMenuCategory = cache(
  async (menuCategoryId) => {
    const rows = await db.additionalIngredient.findMany({
      where: { menuCategoryId },
      select: {
        id: true,
        name: true,
        price: true, // Decimal - será convertido abaixo
        isActive: true,
      },
      orderBy: { name: "asc" },
    });

    // Serializar Decimal para number
    return rows.map((item) => ({
      ...item,
      price: item.price?.toNumber?.() ?? Number(item.price),
    }));
  },
);
