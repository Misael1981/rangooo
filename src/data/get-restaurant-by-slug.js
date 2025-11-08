import "server-only";
import { cache } from "react";

import { db } from "@/lib/prisma";

export const getRestaurantBySlug = cache(async (slug) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    return null;
  }
  return restaurant;
});
