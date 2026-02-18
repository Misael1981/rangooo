import { UserOrder } from "@/dtos/order.dto";
import { db } from "@/lib/prisma";

export const getUserOrders = async (userId: string) => {
  const orders = await db.order.findMany({
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
          product: {
            select: {
              name: true,
              menuCategory: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    status: order.status,
    totalAmount: Number(order.totalAmount),
    deliveryFee: Number(order.deliveryFee),
    orderNumber: order.orderNumber,
    consumptionMethod: order.consumptionMethod,
    createdAt: order.createdAt,
    restaurant: {
      name: order.restaurant.name,
      slug: order.restaurant.slug,
      avatarImageUrl: order.restaurant.avatarImageUrl,
      category: order.restaurant.category,
    },
    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      priceAtOrder: Number(item.priceAtOrder),
      product: {
        name: item.product.name,
        menuCategory: {
          name: item.product.menuCategory.name,
        },
      },
    })),
  })) as UserOrder[];
};
