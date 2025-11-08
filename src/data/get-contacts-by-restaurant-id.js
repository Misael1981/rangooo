import "server-only";
import { cache } from "react";
import { db } from "@/lib/prisma";

export const getContactsByRestaurantId = cache(async (restaurantId) => {
  return db.contactNumber.findMany({
    where: { restaurantId },
    orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
  });
});