export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import HeaderOrders from "./components/HeaderOrders";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const take = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 5), 30)
    : 30;
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
    <>
      <HeaderOrders />
      {orders.map((order) => (
        <Card
          key={order.id}
          className="min-w-[350px] overflow-hidden shadow-sm"
        >
          <CardContent className="p-4">
            {/* CABEÇALHO: Nome e Status */}
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">
                {order.restaurant.name}
              </h2>
              <Badge
                variant="secondary"
                className="border-none bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
              >
                {order.status === "PENDING" ? "Pendente" : order.status}
              </Badge>
            </div>

            {/* LISTA DE PRODUTOS */}
            <div className="space-y-3">
              {order.items.map((item) => {
                // Parse dos extras que salvamos como string JSON
                const extras = item.extras ? JSON.parse(item.extras) : [];

                return (
                  <div key={item.id} className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-sm font-medium">
                          {item.quantity}x{" "}
                          {item.customName || item.product.name}
                        </span>

                        {/* EXTRAS: Aqui entra a mágica dos ingredientes adicionais */}
                        {extras.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-x-2">
                            {extras.map((extra, index) => (
                              <span
                                key={index}
                                className="text-[10px] italic text-muted-foreground"
                              >
                                + {extra.name} {extra.half && `(${extra.half})`}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-semibold">
                        {formatCurrency(
                          Number(item.priceAtOrder) * item.quantity,
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-3" />

            {/* RODAPÉ: Preço Total e Data */}
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(order.createdAt), "dd/MM/yyyy, HH:mm", {
                    locale: ptBR,
                  })}
                </p>
                <p className="mt-1 text-lg font-bold text-green-600">
                  {formatCurrency(Number(order.totalAmount))}
                </p>
              </div>

              {/* Opcional: Um botão de "Ver Detalhes" ou "Repetir Pedido" */}
              <Badge variant="outline" className="text-[10px] opacity-70">
                {order.consumptionMethod}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
