"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ChefHat,
  Clock,
  Package,
  Truck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";

const getMethodConfig = (method) => {
  const configs = {
    DELIVERY: { icon: Truck, label: "Entrega", color: "text-blue-600" },
    PICKUP: { icon: Package, label: "Retirada", color: "text-green-600" },
    DINE_IN: {
      icon: UtensilsCrossed,
      label: "Mesa",
      color: "text-purple-600",
    },
  };
  return configs[method] || configs.DELIVERY;
};

const getStatusConfig = (status) => {
  const configs = {
    PENDING: {
      variant: "secondary",
      icon: Clock,
      label: "Pendente",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      nextAction: "confirmar",
    },
    CONFIRMED: {
      variant: "default",
      icon: CheckCircle,
      label: "Confirmado",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      nextAction: "iniciar preparo",
    },
    PREPARING: {
      variant: "default",
      icon: ChefHat,
      label: "Em Preparo",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      nextAction: "pronto para entrega",
    },
    READY_FOR_PICKUP: {
      variant: "default",
      icon: Package,
      label: "Pronto para Retirada",
      color: "text-green-600 bg-green-50 border-green-200",
      nextAction: "saiu para entrega",
    },
    OUT_FOR_DELIVERY: {
      variant: "default",
      icon: Truck,
      label: "A Caminho",
      color: "text-orange-600 bg-orange-50 border-orange-200",
      nextAction: "entregue",
    },
    DELIVERED: {
      variant: "default",
      icon: CheckCircle,
      label: "Entregue",
      color: "text-green-600 bg-green-50 border-green-200",
      nextAction: null,
    },
    CANCELED: {
      variant: "destructive",
      icon: XCircle,
      label: "Cancelado",
      color: "text-red-600 bg-red-50 border-red-200",
      nextAction: null,
    },
  };
  return configs[status] || configs.PENDING;
};

const formatDateTime = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));

const CardOrder = ({ order }) => {
  const methodConfig = getMethodConfig(order?.consumptionMethod);
  const MethodIcon = methodConfig.icon;
  const statusConfig = getStatusConfig(order?.status);
  const StatusIcon = statusConfig.icon;

  const itemsText = Array.isArray(order?.items)
    ? order.items.map((item) => `${item.quantity}x ${item.name}`).join(" · ")
    : "";

  const total = Number(order?.totalAmount ?? 0);

  return (
    <Card className="w-[800px] max-w-[95%] border-2">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={methodConfig.color}>
              <MethodIcon className="mr-1 h-3 w-3" />
              {methodConfig.label}
            </Badge>
            <Badge
              variant={statusConfig.variant}
              className="flex items-center gap-1"
            >
              <StatusIcon className="h-3 w-3" />
              {statusConfig.label}
            </Badge>
          </div>
          <div className="text-sm font-semibold text-green-600">
            {formatCurrency(total)}
          </div>
        </div>

        {itemsText && (
          <div className="text-xs text-muted-foreground">{itemsText}</div>
        )}

        <Separator />

        <div className="flex items-start justify-between text-sm">
          <div className="space-y-1">
            <div className="font-medium">
              {order?.customer?.name ?? order?.user?.name ?? "Cliente"}
            </div>
            {order?.consumptionMethod === "DELIVERY" &&
              order?.deliveryAddress && (
                <div className="text-muted-foreground">
                  {order.deliveryAddress.street}
                  {order.deliveryAddress.number
                    ? `, ${order.deliveryAddress.number}`
                    : ""}
                  {order.deliveryAddress.complement
                    ? ` - ${order.deliveryAddress.complement}`
                    : ""}
                  {order.deliveryAddress.neighborhood
                    ? ` - ${order.deliveryAddress.neighborhood}`
                    : ""}
                </div>
              )}
          </div>
          <div className="text-right text-xs text-muted-foreground">
            {order?.createdAt ? formatDateTime(order.createdAt) : ""}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOrder;
