"use server";

import { db } from "@/lib/prisma";

export async function getEstablishmentBySlug(slug) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      include: {
        products: true,
        consumptionMethods: {
          orderBy: {
            displayOrder: "asc",
          },
          where: {
            isActive: true,
          },
        },
      },
    });

    if (!establishment) return null;

    // Serializar Decimal para number
    const serialized = {
      ...establishment,
      products: establishment.products.map((p) => ({
        ...p,
        price: p.price?.toNumber?.() ?? Number(p.price),
      })),
    };

    return serialized;
  } catch (err) {
    console.error("Erro ao buscar estabelecimento por slug:", err);
    return null;
  }
}
