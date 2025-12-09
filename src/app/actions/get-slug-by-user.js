"use server";

import { db } from "@/lib/prisma";

export async function getSlugByUser(userId) {
  try {
    const restaurant = await db.restaurant.findFirst({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId } } }],
      },
      select: { slug: true },
    });
    return restaurant?.slug || null;
  } catch (error) {
    console.error("Error fetching slug by user:", error);
    return null;
  }
}
