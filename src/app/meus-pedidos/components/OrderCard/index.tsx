import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Se tiver o componente de Badge do Shadcn
import { Separator } from "@/components/ui/separator";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OrderItem, UserOrder } from "@/dtos/order.dto";
import { ConsumptionMethod, OrderStatus } from "@/generated/prisma/enums";
import { formatCurrency } from "@/helpers/format-currency";

type StatusConfig = {
  label: string;
  className: string;
};

const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  PENDING: {
    label: "Pendente",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  CONFIRMED: {
    label: "Confirmado",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  PREPARING: {
    label: "Preparando",
    className: "bg-orange-100 text-orange-800 border-orange-300",
  },
  DELIVERED: {
    label: "Entregue",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  CANCELED: {
    label: "Cancelado",
    className: "bg-red-100 text-red-800 border-red-300",
  },
};

const CONSUMPTION_METHOD: Record<ConsumptionMethod, string> = {
  DELIVERY: "Entrega",
  PICKUP: "Retirada",
  DINE_IN: "Mesa",
};

type OrderCardProps = {
  order: UserOrder;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const status = order.status;
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <Card className="overflow-hidden gap-2 transition-all hover:shadow-md  ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border">
              <Image
                src={order.restaurant.avatarImageUrl || "/logo.svg"}
                alt={order.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">
                {order.restaurant.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Calendar size={12} />
                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`text-[16px] font-medium ${config.className}`}
          >
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-2">
        {/* Método de consumo */}
        <div className="flex items-center justify-between text-sm text-muted-foreground font-medium">
          <span>
            {CONSUMPTION_METHOD[order.consumptionMethod as ConsumptionMethod]}
          </span>
        </div>

        {/* Lista de itens */}
        <div className="space-y-3">
          {order.items.map((item: OrderItem) => (
            <div
              key={item.id}
              className="space-y-2 rounded-lg border border-muted/50 p-3"
            >
              {/* Categoria */}
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {item.product.menuCategory.name}
              </span>

              {/* Produto */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-[11px] font-bold">
                    {item.quantity}x
                  </span>

                  <span className="font-medium leading-tight">
                    {item.product.name}
                  </span>
                </div>

                <span className="font-semibold text-emerald-600">
                  {formatCurrency(item.priceAtOrder)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total do pedido */}
        <div className="flex justify-end pt-2">
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Total do pedido
            </p>
            <p className="text-lg font-bold text-emerald-600">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="w-full border-t">
        <div className=" w-full flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-600">Nº do pedido </p>
            <p className="font-bold text-center">{order.orderNumber}</p>
          </div>
          <Link
            href={`/${order.restaurant.category.toLowerCase()}s/${order.restaurant.slug}/menu?consumptionMethod=${order.consumptionMethod}`}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Pedir novamente
            <ChevronRight size={14} />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
