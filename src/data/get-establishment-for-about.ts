import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  return await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      contacts: true,
      socialMedia: true,
      street: true,
      number: true,
      neighborhood: true,
      city: true,
      state: true,
      businessHours: true,
      paymentMethods: true,
    },
  });
};
