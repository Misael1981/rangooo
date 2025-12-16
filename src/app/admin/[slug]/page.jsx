// src/app/admin/[slug]/page.jsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import StatusOpenSwitch from "./components/StatusOpenSwitch";
import StatsCards from "./components/StatsCards";
import { notFound, redirect } from "next/navigation";
import PrintButton from "./components/PrintButton";
import ConsumptionAndPaymentMethodsForm from "@/components/ConsumptionAndPaymentMethodsForm";

export default async function AdminPage({ params }) {
  const p = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // restante do código...

  const userId = session.user.id;
  const userRole = session.user.role;
  const restaurantSlug = p.slug;

  const isAdmin = userRole === "ADMIN";

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
      orders: true,
      paymentMethods: true,
      consumptionMethods: true,
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
        />
      </header>

      {/* Stats Cards */}
      <StatsCards statsOrders={orders} />

      {/* Métodos de Consumo e Pagamento */}
      <ConsumptionAndPaymentMethodsForm
        paymentMethods={paymentMethods}
        consumptionMethods={consumptionMethods}
        restaurantId={restaurant.id}
      />

      {/* Print Button */}
      {/* <PrintButton restaurantId={restaurant.id} /> */}

      {/* Daily Orders Chart */}
      {/* <DailyOrdersChart /> */}
    </div>
  );
}
