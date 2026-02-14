import { db } from "@/lib/prisma";

export const getEstablishmentsForHomepage = async () => {
  return await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
      category: true,
      isOpen: true,
    },
    orderBy: { name: "asc" },
  });
};
