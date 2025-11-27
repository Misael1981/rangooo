"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  ChefHat,
  Package,
  Truck,
  Home,
  UtensilsCrossed,
  XCircle,
  MoreVertical,
  User,
  MapPin,
  Phone,
  ShoppingCart,
} from "lucide-react";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";

const RestaurantOrdersPage = () => {
  // Dados mockados - depois conecta com sua API
  const ordersData = [
    {
      id: "1",
      user: {
        name: "João Silva",
        phone: "(11) 99999-9999",
      },
      totalAmount: 89.9,
      deliveryFee: 8.5,
      status: "PENDING",
      consumptionMethod: "DELIVERY",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
      },
      items: [
        { name: "Pizza Calabresa", quantity: 1, price: 45.9 },
        { name: "Coca-Cola 2L", quantity: 2, price: 22.0 },
      ],
      createdAt: new Date(),
      estimatedTime: "40-50 min",
    },
    {
      id: "2",
      user: {
        name: "Maria Santos",
        phone: "(11) 98888-8888",
      },
      totalAmount: 67.8,
      deliveryFee: 0,
      status: "CONFIRMED",
      consumptionMethod: "PICKUP",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 39.9 },
        { name: "Suco de Laranja", quantity: 1, price: 12.9 },
        { name: "Brownie", quantity: 1, price: 15.0 },
      ],
      createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 min atrás
      estimatedTime: "25-35 min",
    },
    {
      id: "3",
      user: {
        name: "Carlos Oliveira",
        phone: "(11) 97777-7777",
      },
      totalAmount: 120.5,
      deliveryFee: 10.0,
      status: "PREPARING",
      consumptionMethod: "DELIVERY",
      deliveryAddress: {
        street: "Av. Paulista, 1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
      },
      items: [
        { name: "Pizza Frango Catupiry", quantity: 1, price: 52.9 },
        { name: "Pizza Portuguesa", quantity: 1, price: 48.9 },
        { name: "Guaraná 2L", quantity: 1, price: 8.7 },
      ],
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min atrás
      estimatedTime: "15-25 min",
    },
    {
      id: "4",
      user: {
        name: "Ana Costa",
        phone: "(11) 96666-6666",
      },
      totalAmount: 35.9,
      deliveryFee: 0,
      status: "READY_FOR_PICKUP",
      consumptionMethod: "PICKUP",
      items: [{ name: "Pizza Mussarela", quantity: 1, price: 35.9 }],
      createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 min atrás
      estimatedTime: "Pronto",
    },
  ];

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handlers para as ações
  const handleNextStatus = (orderId, currentStatus) => {
    console.log(`Avançando status do pedido ${orderId} de ${currentStatus}`);
    // Aqui você implementa a lógica de mudança de status
  };

  const handleCancelOrder = (orderId) => {
    console.log(`Cancelando pedido ${orderId}`);
    // Lógica de cancelamento
  };

  const handleViewDetails = (order) => {
    console.log("Detalhes do pedido:", order);
    // Abrir modal ou página de detalhes
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciar Pedidos
            </h1>
            <p className="text-gray-600">Controle os pedidos da sua pizzaria</p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="bg-white">
              Total: {ordersData.length}
            </Badge>
            <Badge variant="outline" className="bg-amber-50">
              Pendentes:{" "}
              {ordersData.filter((o) => o.status === "PENDING").length}
            </Badge>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <FiltersOrders />

      {/* Card de pedido */}
      <section className="flex flex-col items-center justify-center gap-4">
        {ordersData.map((order) => (
          <CardOrder key={order.id} order={order} />
        ))}
      </section>

      {/* Lista de Pedidos */}
      <section className="mt-[100px] grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {ordersData.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const methodConfig = getMethodConfig(order.consumptionMethod);
          const StatusIcon = statusConfig.icon;
          const MethodIcon = methodConfig.icon;

          return (
            <Card
              key={order.id}
              className="border-2 border-gray-100 transition-colors hover:border-gray-300"
            >
              <CardContent className="p-6">
                {/* Header do Pedido */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="outline" className={statusConfig.color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                      <Badge variant="outline" className={methodConfig.color}>
                        <MethodIcon className="mr-1 h-3 w-3" />
                        {methodConfig.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      Pedido #{order.id} • {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Informações do Cliente */}
                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {order.user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{order.user.phone}</span>
                  </div>
                  {order.consumptionMethod === "DELIVERY" &&
                    order.deliveryAddress && (
                      <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="mt-0.5 h-3 w-3" />
                        <span>
                          {order.deliveryAddress.street},{" "}
                          {order.deliveryAddress.neighborhood}
                        </span>
                      </div>
                    )}
                </div>

                {/* Itens do Pedido */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Itens do Pedido</span>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total e Ações */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      {order.deliveryFee > 0 && (
                        <p className="text-xs text-gray-500">
                          Inclui {formatCurrency(order.deliveryFee)} de entrega
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {order.estimatedTime}
                      </p>
                      <p className="text-xs text-gray-500">Tempo estimado</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {statusConfig.nextAction && (
                      <Button
                        className="flex-1"
                        onClick={() => handleNextStatus(order.id, order.status)}
                      >
                        {statusConfig.nextAction}
                      </Button>
                    )}
                    {order.status === "PENDING" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Empty State */}
      {ordersData.length === 0 && (
        <Card className="border border-dashed border-gray-300">
          <CardContent className="p-12 text-center">
            <div className="mb-4 text-gray-400">
              <ShoppingCart className="mx-auto h-16 w-16" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Nenhum pedido no momento
            </h3>
            <p className="text-gray-500">
              Os pedidos aparecerão aqui quando forem realizados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RestaurantOrdersPage;
