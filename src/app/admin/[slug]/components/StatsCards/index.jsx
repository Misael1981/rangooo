import { Card, CardContent } from "@/components/ui/card";
import { Building, CircleFadingPlus, Clock } from "lucide-react";

const StatsCards = ({ statsOrders }) => {
  const totalOrders = statsOrders.length;
  const pendingOrders = statsOrders.filter(
    (order) => order.status === "PENDING",
  ).length;
  const deliveredOrders = statsOrders.filter(
    (order) => order.status === "DELIVERED",
  ).length;

  return (
    <section className="mb-8">
      <div className="flex flex-wrap items-center justify-around gap-6">
        {/* Total de Pizzarias */}
        <Card className="border border-gray-200 transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Pedidos
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalOrders}
                </p>
                <p className="flex items-center gap-1 text-xs text-green-600">
                  Pedidos do Dia
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aprovações Pendentes */}
        <Card className="border border-gray-200 transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Pendentes
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {pendingOrders}
                </p>
                <p className="text-xs text-amber-600">Requer atenção</p>
              </div>
              <div className="rounded-lg bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total de Usuários */}
        <Card className="border border-gray-200 transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Entregues
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {deliveredOrders}
                </p>
                <p className="flex items-center gap-1 text-xs text-green-600">
                  Pedidos já entregues
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CircleFadingPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StatsCards;
