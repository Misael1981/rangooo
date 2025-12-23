// src/app/admin/[slug]/page.jsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import StatusOpenSwitch from "./components/StatusOpenSwitch";
import StatsCards from "./components/StatsCards";
import { notFound, redirect } from "next/navigation";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";
import DailySalesSummary from "./components/DailySalesSummary";
import { startOfDay, endOfDay } from "date-fns";

export default async function AdminPage({ params }) {
  const p = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const userId = session.user.id;
  const userRole = session.user.role;
  const restaurantSlug = p.slug;

  const isAdmin = userRole === "ADMIN";

  // CORREÇÃO AQUI: Chame as funções!
  const startOfToday = startOfDay(new Date());
  const endOfToday = endOfDay(new Date());

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: restaurantSlug,
      ...(!isAdmin && {
        OR: [
          { ownerId: userId },
          {
            users: {
              some: { userId: userId },
            },
          },
        ],
      }),
    },
    select: {
      id: true,
      ownerId: true,
      name: true,
      avatarImageUrl: true,
      isOpen: true,
      paymentMethods: true,
      consumptionMethods: true,
      printingToken: true,
      orders: {
        where: {
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        select: {
          id: true,
          status: true,
          totalAmount: true,
          deliveryFee: true,
          consumptionMethod: true,
          createdAt: true,
          items: {
            select: {
              quantity: true,
              priceAtOrder: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  menuCategory: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const orders = restaurant.orders;
  const paymentMethods = restaurant.paymentMethods;
  const consumptionMethods = restaurant.consumptionMethods;

  if (!restaurant) {
    console.log(
      `[AUTH FAIL] Usuário ${userId} (${userRole}) tentou acessar slug ${restaurantSlug}.`,
    );
    notFound();
  }

  const serializedOrders =
    restaurant?.orders?.map((order) => ({
      ...order,
      totalAmount: order.totalAmount?.toNumber() || 0,
      deliveryFee: order.deliveryFee?.toNumber() || 0,
      items:
        order.items?.map((item) => ({
          ...item,
          priceAtOrder: item.priceAtOrder?.toNumber() || 0,
          product: {
            ...item.product,
            price: item.product?.price?.toNumber() || 0,
          },
        })) || [],
    })) || [];

  const serializedRestaurant = {
    ...restaurant,
    orders: serializedOrders,
    paymentMethods:
      restaurant?.paymentMethods?.map((pm) => ({
        ...pm,
        // converter se tiver campos Decimal
      })) || [],
  };

  return (
    <div className="container mx-auto min-h-screen px-6 pb-8">
      <header className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrativo - {restaurant.name}
          </h1>
          <p className="text-gray-600">Gerencie seus pedidos e usuários</p>
        </div>
        <StatusOpenSwitch
          initialIsOpen={restaurant.isOpen}
          restaurantId={restaurant.id}
          restaurantSlug={p.slug}
          printingToken={printingToken}
        />
      </header>

      <div className="space-y-8">
        {/* Stats Cards */}
        {/* <StatsCards statsOrders={orders} /> */}

        {/* Daily Sales Summary */}
        <DailySalesSummary
          orders={serializedOrders}
          restaurant={serializedRestaurant}
        />

        {/* Métodos de Consumo e Pagamento */}
        <ConsumptionAndPaymentMethodsForm
          paymentMethods={paymentMethods}
          consumptionMethods={consumptionMethods}
          restaurantId={restaurant.id}
        />

        {/* Daily Orders Chart */}
        {/* <DailyOrdersChart /> */}
      </div>
    </div>
  );
}
