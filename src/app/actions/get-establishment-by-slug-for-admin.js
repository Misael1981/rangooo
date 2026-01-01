// get-establishment-by-slug-for-admin
"use server";

import { db } from "@/lib/prisma";

export async function getEstablishmentBySlugForAdmin(slug) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        printingToken: true,
        isOpen: true,
      },
    });
    return establishment;
  } catch (err) {
    console.error("Erro ao buscar estabelecimento por slug:", err);
    return null;
  }
}
