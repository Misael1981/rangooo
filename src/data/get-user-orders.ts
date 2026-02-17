import { db } from "@/lib/prisma";

export const getUserOrders = async (userId: string) => {
  return await db.order.findMany({
    where: {
      userId: userId,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
          category: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};
