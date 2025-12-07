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
        avatarImageUrl: true,
        description: true,
        address: true,
        street: true,
        number: true,
        neighborhood: true,
        city: true,
        state: true,
        category: true,
        brandColors: true,

        consumptionMethods: {
          orderBy: {
            displayOrder: "asc",
          },
          where: {
            isActive: true,
          },
        },
        menuCategories: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
            createdAt: true,
            products: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
                imageUrl: true,
                ingredients: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
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
