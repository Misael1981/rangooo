export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import BadgeStatus from "./components/BadgeStatus";
import HeaderOrders from "./components/HeaderOrders";

export default async function OrdersPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        <p className="text-sm text-muted-foreground">
          Faça login para ver seus pedidos
        </p>
      </div>
    );
  }

  const sp = await searchParams;
  const status = sp?.status;
  const restaurantSlug = sp?.restaurant;
  const where = { userId: session.user.id };
  if (status) Object.assign(where, { status });
  const limitParam = Number(sp?.limit);
  const take = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 5), 30) : 30;
  const orders = await db.order.findMany({
    where: restaurantSlug
      ? { ...where, restaurant: { slug: restaurantSlug } }
      : where,
    orderBy: { createdAt: "desc" },
    take,
    include: {
      restaurant: { select: { name: true, slug: true } },
      items: { include: { product: { select: { name: true } } } },
    },
  });

  return (
    <div>
      <HeaderOrders />
      <div className="space-y-4 bg-red-50 p-6">
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Você ainda não tem pedidos
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id} className="">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {order.restaurant.name}
                    </span>
                    <div className="space-y-2">
                      <BadgeStatus status={order.status} />
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {order.items
                          .map((it) => `${it.quantity}x ${it.product.name}`)
                          .join(" · ")}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {formatCurrency(Number(order.totalAmount ?? 0))}
                      </div>
                    </div>
                    <span className="text-sm">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(order.createdAt))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
