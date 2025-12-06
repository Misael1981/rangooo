"use server";

import { db } from "@/lib/prisma";

export async function getEstablishmentBySlug(slug) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
    });

    return establishment;
  } catch (err) {
    console.error("Erro ao buscar estabelecimento por slug:", err);
    return null;
  }
}
