import prisma from "@/lib/prisma";
import { cache } from "react";

export const getRestaurantBySlug = cache(async (slug) => {
  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
  return restaurant;
});
