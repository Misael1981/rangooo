import { db } from "@/lib/prisma";

// Função para buscar e limpar dados (pode ficar no mesmo arquivo, fora do componente)
export async function getOrdersData(slug, searchParams) {
  const statusParam = searchParams?.status?.toUpperCase();
  const methodParam = searchParams?.consumptionMethod?.toUpperCase();

  // ... (Sua lógica de startOfShift e endOfShift aqui) ...
  // Sugestão: Use horários fixos em UTC para teste inicial
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
      deliveryFee: true,
    },
  });

  if (!restaurant) return null;

  const orders = await db.order.findMany({
    where: {
      restaurantId: restaurant.id,
      createdAt: { gte: start, lt: end },
      ...(statusParam && { status: statusParam }),
      ...(methodParam && { consumptionMethod: methodParam }),
    },
    include: {
      user: { select: { name: true, phone: true } },
      items: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  // A MÁGICA: Limpa tudo que é Date/Decimal/Circular
  return JSON.parse(
    JSON.stringify({
      restaurant,
      orders: orders.map((o) => ({
        ...o,
        totalAmount: Number(o.totalAmount),
        deliveryFee: Number(o.deliveryFee),
      })),
    }),
  );
}
