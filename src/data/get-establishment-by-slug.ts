import { db } from "@/lib/prisma";

export async function getEstablishmentBySlug(slug: string) {
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

    if (!establishment) {
      return null;
    }

    return {
      ...establishment,
      methods: establishment.consumptionMethods.map((method) => ({
        type: method.method,
        isActive: method.isActive,
      })),
    };
  } catch (err) {
    console.error("Erro ao buscar dados de boas-vindas:", err);
    return null;
  }
}
