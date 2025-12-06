"use server";

import { db } from "@/lib/prisma";

export async function getEstablishmentWelcomeData(slug) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },

      select: {
        id: true,
        name: true,
        slug: true,
        avatarImageUrl: true,
        category: true,
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

    return establishment;
  } catch (err) {
    console.error("Erro ao buscar dados de boas-vindas:", err);
    return null;
  }
}
