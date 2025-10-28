import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import prisma from "@/lib/prisma";

export async function getRestaurantsByCategory(category) {
  return prisma.restaurant.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
    },
    orderBy: { name: "asc" },
  });
}
