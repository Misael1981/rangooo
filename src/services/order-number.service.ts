import { Prisma } from "@misael1981/rangooo-database"

export async function generateOrderNumber(
  tx: Prisma.TransactionClient,
  restaurantId: string,
) {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const currentDay = new Date().getDate()

  const ordersToday = await tx.order.count({
    where: {
      restaurantId: restaurantId,
      createdAt: { gte: startOfDay },
    },
  })

  return currentDay * 100 + (ordersToday + 1)
}
