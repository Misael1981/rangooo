import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeaderOrders from "./components/HeaderOrders";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DeliverySettingsForm from "@/components/DeliverySettingsForm";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";

export default async function RestaurantOrdersPage({ params, searchParams }) {
  try {
    // 1. Garante o recebimento dos params
    const p = await params;
    const sp = await searchParams;

    const restaurant = await db.restaurant.findUnique({
      where: { slug: p.slug },
      select: {
        id: true,
        name: true,
        consumptionMethods: true,
        paymentMethods: true,
        deliveryFee: true,
      },
    });

    if (!restaurant) return notFound();

    // 2. Lógica de Data SIMPLIFICADA e SEGURA
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const startOfShift = new Date(today);
    const endOfShift = new Date(today);

    const currentHour = now.getHours();

    if (currentHour < 6) {
      // Antes das 6h: jornada começou ontem às 6h
      startOfShift.setDate(startOfShift.getDate() - 1);
      startOfShift.setHours(6, 0, 0, 0);
      endOfShift.setHours(6, 0, 0, 0); // Hoje às 6h
    } else {
      // Depois das 6h: jornada começou hoje às 6h
      startOfShift.setHours(6, 0, 0, 0);
      endOfShift.setDate(endOfShift.getDate() + 1);
      endOfShift.setHours(6, 0, 0, 0); // Amanhã às 6h
    }

    // 3. Filtros com valores padrão
    const statusFilter = sp.status ? String(sp.status).toUpperCase() : null;
    const methodFilter = sp.consumptionMethod
      ? String(sp.consumptionMethod).toUpperCase()
      : null;

    const orders = await db.order.findMany({
      where: {
        restaurantId: restaurant.id,
        createdAt: {
          gte: startOfShift,
          lt: endOfShift,
        },
        ...(statusFilter &&
          statusFilter !== "TODOS" && { status: statusFilter }),
        ...(methodFilter &&
          methodFilter !== "TODOS" && { consumptionMethod: methodFilter }),
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 4. SERIALIZAÇÃO SEGURA - Convertendo TUDO para tipos primitivos
    const serializedRestaurant = {
      id: String(restaurant.id),
      name: String(restaurant.name),
      consumptionMethods: Array.isArray(restaurant.consumptionMethods)
        ? restaurant.consumptionMethods.map(String)
        : [],
      paymentMethods: Array.isArray(restaurant.paymentMethods)
        ? restaurant.paymentMethods.map(String)
        : [],
      deliveryFee: Number(restaurant.deliveryFee) || 0,
    };

    const serializedOrders = orders.map((order) => {
      // Garante que todas as datas sejam strings
      const items = (order.items || []).map((item) => ({
        name: String(item.product?.name || ""),
        quantity: Number(item.quantity) || 0,
      }));

      return {
        id: String(order.id),
        createdAt:
          order.createdAt instanceof Date
            ? order.createdAt.toISOString()
            : String(order.createdAt),
        updatedAt:
          order.updatedAt instanceof Date
            ? order.updatedAt.toISOString()
            : String(order.updatedAt),
        status: String(order.status || ""),
        totalAmount: Number(order.totalAmount) || 0,
        deliveryFee: Number(order.deliveryFee) || 0,
        consumptionMethod: String(order.consumptionMethod || ""),
        paymentMethod: String(order.paymentMethod || ""),
        user: {
          name: String(order.user?.name || ""),
          phone: String(order.user?.phone || ""),
        },
        items,
        restaurantId: String(order.restaurantId),
        userId: order.userId ? String(order.userId) : null,
        deliveryAddress: order.deliveryAddress
          ? String(order.deliveryAddress)
          : null,
        deliveryCity: order.deliveryCity ? String(order.deliveryCity) : null,
        observation: order.observation ? String(order.observation) : null,
      };
    });

    return (
      <div className="min-h-screen p-6">
        <HeaderOrders totalOrders={serializedOrders.length} />

        <div className="mb-10 flex flex-col gap-8">
          <ConsumptionAndPaymentMethodsForm
            paymentMethods={serializedRestaurant.paymentMethods}
            consumptionMethods={serializedRestaurant.consumptionMethods}
            restaurantId={serializedRestaurant.id}
          />

          <DeliverySettingsForm
            deliveryFee={serializedRestaurant.deliveryFee}
            restaurantId={serializedRestaurant.id}
          />
        </div>

        <FilterConsumptionMethods
          consumptionMethods={serializedRestaurant.consumptionMethods}
          restaurantId={serializedRestaurant.id}
        />

        <FiltersOrders />

        <section className="mt-8 flex flex-col items-center justify-center gap-4">
          {serializedOrders.length > 0 ? (
            serializedOrders.map((order) => (
              <CardOrder key={order.id} order={order} />
            ))
          ) : (
            <p className="mt-10 text-gray-500">Nenhum pedido nesta jornada.</p>
          )}
        </section>
      </div>
    );
  } catch (error) {
    // Log do erro em produção (você pode usar um serviço como Sentry)
    console.error("Erro em RestaurantOrdersPage:", error);

    // Fallback seguro
    return (
      <div className="min-h-screen p-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Erro ao carregar os pedidos. Tente novamente.
          </p>
        </div>
      </div>
    );
  }
}
