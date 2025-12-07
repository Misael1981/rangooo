"use server";

import { db } from "@/lib/prisma";

export async function getEstablishmentMenuData(slug) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        coverImageUrl: true,

        category: true,

        consumptionMethods: {
          orderBy: {
            displayOrder: "asc",
          },
          where: {
            isActive: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
          },
        },
      },
    });
    return establishment;
  } catch (err) {
    console.error("Erro ao buscar dados de menu:", err);
    return null;
  }
}
