import { db } from "@/lib/prisma";

// Função para buscar e limpar dados (pode ficar no mesmo arquivo, fora do componente)
export async function getOrdersData(slug, searchParams) {
  // Normaliza query params que podem ser string | string[] (Next.js pode enviar arrays)
  const normalizeUpper = (v) => {
    if (v == null) return undefined;
    const val = Array.isArray(v) ? v[0] : v;
    return typeof val === "string" ? val.toUpperCase() : undefined;
  };

  const statusParam = normalizeUpper(searchParams?.status);
  const methodParam = normalizeUpper(searchParams?.consumptionMethod);

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
  const cleanedRestaurant = {
    ...restaurant,
    deliveryFee: Number(restaurant.deliveryFee ?? 0),
  };

  const cleanedOrders = (orders || []).map((o) => ({
    ...o,
    totalAmount: Number(o.totalAmount ?? 0),
    deliveryFee: Number(o.deliveryFee ?? 0),
    items: (o.items || []).map((it) => ({
      ...it,
      priceAtOrder: Number(it.priceAtOrder ?? 0),
      // garante que nomes de produto venham em uma propriedade previsível
      name: it.name ?? (it.product ? it.product.name : undefined),
    })),
  }));

  return JSON.parse(
    JSON.stringify({ restaurant: cleanedRestaurant, orders: cleanedOrders }),
  );
}
