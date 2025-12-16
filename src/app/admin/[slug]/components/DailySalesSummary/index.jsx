"use client";

import React from "react";
import {
  ShoppingCart,
  Package,
  CreditCard,
  Cash,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DailySalesSummary = ({ orders, restaurant }) => {
  // Filtra apenas pedidos do dia atual
  const todayOrders = Array.isArray(orders) ? orders : [];

  // Calcula estatísticas básicas
  const totalOrders = todayOrders.length;
  const totalRevenue = todayOrders.reduce((sum, order) => {
    return sum + parseFloat(order.totalAmount || 0);
  }, 0);

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Agrupa por método de consumo
  const ordersByConsumptionMethod = todayOrders.reduce((acc, order) => {
    const method = order.consumptionMethod || "UNKNOWN";
    if (!acc[method]) {
      acc[method] = { count: 0, revenue: 0 };
    }
    acc[method].count += 1;
    acc[method].revenue += parseFloat(order.totalAmount || 0);
    return acc;
  }, {});

  // Agrupa por status
  const ordersByStatus = todayOrders.reduce((acc, order) => {
    const status = order.status || "UNKNOWN";
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status] += 1;
    return acc;
  }, {});

  // Calcula vendas por produto
  const productSales = {};
  const categorySales = {};

  todayOrders.forEach((order) => {
    order.items?.forEach((item) => {
      const productId = item.product?.id || "unknown";
      const productName = item.product?.name || "Produto desconhecido";
      const categoryName = item.product?.menuCategory?.name || "Sem categoria";
      const quantity = item.quantity || 0;
      const price = parseFloat(item.priceAtOrder || item.product?.price || 0);
      const revenue = quantity * price;

      // Por produto
      if (!productSales[productId]) {
        productSales[productId] = {
          name: productName,
          category: categoryName,
          quantity: 0,
          revenue: 0,
          price: price,
        };
      }
      productSales[productId].quantity += quantity;
      productSales[productId].revenue += revenue;

      // Por categoria
      if (!categorySales[categoryName]) {
        categorySales[categoryName] = {
          quantity: 0,
          revenue: 0,
          products: new Set(),
        };
      }
      categorySales[categoryName].quantity += quantity;
      categorySales[categoryName].revenue += revenue;
      categorySales[categoryName].products.add(productId);
    });
  });

  // Converte para arrays ordenadas
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  const topCategories = Object.entries(categorySales)
    .map(([name, data]) => ({
      name,
      quantity: data.quantity,
      revenue: data.revenue,
      productCount: data.products.size,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Formata valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Formata método de consumo
  const formatConsumptionMethod = (method) => {
    const translations = {
      DELIVERY: "Entrega",
      PICKUP: "Retirada",
      DINE_IN: "Consumo no local",
    };
    return translations[method] || method;
  };

  // Formata status do pedido
  const formatOrderStatus = (status) => {
    const translations = {
      PENDING: "Pendente",
      CONFIRMED: "Confirmado",
      PREPARING: "Em preparação",
      READY_FOR_PICKUP: "Pronto para retirada",
      OUT_FOR_DELIVERY: "A caminho",
      DELIVERED: "Entregue",
      CANCELED: "Cancelado",
    };
    return translations[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      DELIVERED: "bg-green-100 text-green-800",
      CANCELED: "bg-red-100 text-red-800",
      PREPARING: "bg-blue-100 text-blue-800",
      PENDING: "bg-yellow-100 text-yellow-800",
      DEFAULT: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.DEFAULT;
  };

  return (
    <section className="space-y-6">
      {/* Cabeçalho com data */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Resumo do Dia</h2>
          <p className="mt-1 text-gray-600">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-lg">
          <Clock className="mr-2 h-4 w-4" />
          {format(new Date(), "HH:mm")}
        </Badge>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pedidos
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +{ordersByStatus.DELIVERED || 0} entregues hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ticket médio: {formatCurrency(averageOrderValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Ativos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordersByStatus.PREPARING ||
                0 + ordersByStatus.OUT_FOR_DELIVERY ||
                0}
            </div>
            <p className="text-xs text-muted-foreground">
              Em preparação: {ordersByStatus.PREPARING || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Cancelamento
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalOrders > 0
                ? Math.round(
                    ((ordersByStatus.CANCELED || 0) / totalOrders) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {ordersByStatus.CANCELED || 0} pedidos cancelados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes visões */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="methods">Métodos</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* Tab: Produtos Mais Vendidos */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Produtos Mais Vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {index + 1}. {product.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{formatCurrency(product.price)} cada</span>
                          <span>•</span>
                          <span>Total: {formatCurrency(product.revenue)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {product.quantity} un.
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(product.revenue)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-gray-500">
                    Nenhum produto vendido hoje
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Vendas por Categoria */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Vendas por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topCategories.map((category, index) => {
                  const percentage =
                    totalRevenue > 0
                      ? (category.revenue / totalRevenue) * 100
                      : 0;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="outline">
                            {category.productCount} produtos
                          </Badge>
                        </div>
                        <span className="font-bold">
                          {formatCurrency(category.revenue)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={percentage} className="h-2 flex-1" />
                        <span className="whitespace-nowrap text-sm text-gray-600">
                          {category.quantity} un. • {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Métodos de Consumo */}
        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Consumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Object.entries(ordersByConsumptionMethod).map(
                  ([method, data]) => (
                    <Card key={method} className="text-center">
                      <CardContent className="pt-6">
                        <div className="text-3xl font-bold">{data.count}</div>
                        <p className="mt-1 text-sm text-gray-600">
                          {formatConsumptionMethod(method)}
                        </p>
                        <div className="mt-2 text-lg font-semibold">
                          {formatCurrency(data.revenue)}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {totalOrders > 0
                            ? Math.round((data.count / totalOrders) * 100)
                            : 0}
                          % dos pedidos
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Status dos Pedidos */}
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(ordersByStatus).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(status)}>
                        {formatOrderStatus(status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{count}</span>
                      <span className="text-sm text-gray-600">
                        {totalOrders > 0
                          ? Math.round((count / totalOrders) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Seção de Resumo Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Métodos de Pagamento (se disponível) */}
            <div>
              <h3 className="mb-3 font-semibold">Métodos de Consumo</h3>
              <div className="space-y-2">
                {Object.entries(ordersByConsumptionMethod).map(
                  ([method, data]) => (
                    <div
                      key={method}
                      className="flex items-center justify-between"
                    >
                      <span>{formatConsumptionMethod(method)}</span>
                      <div className="text-right">
                        <div className="font-medium">{data.count} pedidos</div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(data.revenue)}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Top 5 Produtos */}
            <div>
              <h3 className="mb-3 font-semibold">Top 5 Produtos</h3>
              <div className="space-y-2">
                {topProducts.slice(0, 5).map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate">{product.name}</span>
                    <div className="whitespace-nowrap text-right">
                      <span className="font-medium">{product.quantity}x</span>
                      <span className="ml-2 text-sm text-gray-600">
                        {formatCurrency(product.revenue)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="mt-8 border-t pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(totalRevenue)}
                </div>
                <div className="text-sm text-gray-600">Faturamento Bruto</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(
                    todayOrders.reduce(
                      (sum, order) => sum + parseFloat(order.deliveryFee || 0),
                      0,
                    ),
                  )}
                </div>
                <div className="text-sm text-gray-600">Taxas de Entrega</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {totalOrders > 0 ? Math.round(averageOrderValue) : 0}
                </div>
                <div className="text-sm text-gray-600">Ticket Médio (R$)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DailySalesSummary;
