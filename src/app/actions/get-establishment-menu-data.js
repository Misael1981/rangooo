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
          orderBy: { displayOrder: "asc" },
          where: { isActive: true },
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
                price: true, // Decimal
                description: true,
                imageUrl: true,
                ingredients: true,
                updatedAt: true,
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!establishment) {
      return null;
    }

    // --- INÍCIO DA LÓGICA DE SERIALIZAÇÃO ---
    const serializedCategories = establishment.menuCategories.map((cat) => ({
      ...cat,
      createdAt: cat.createdAt?.toISOString() ?? null,
      updatedAt: cat.updatedAt?.toISOString() ?? null,

      products: cat.products.map((p) => ({
        ...p,
        price: p.price?.toNumber() ?? Number(p.price),

        createdAt: p.createdAt?.toISOString() ?? null,
        updatedAt: p.updatedAt?.toISOString() ?? null,
      })),
    }));

    return {
      ...establishment,
      menuCategories: serializedCategories,
    };
  } catch (err) {
    console.error("Erro ao buscar dados de menu e serializar:", err);
    return null;
  }
}
