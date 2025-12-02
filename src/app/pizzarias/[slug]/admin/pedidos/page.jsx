import { Badge } from "@/components/ui/badge";
import FiltersOrders from "./components/FiltersOrders";
import CardOrder from "./components/CardOrder";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import prisma from "@/lib/prisma";

export default async function RestaurantOrdersPage({ params }) {
  const p = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: p.slug },
    select: { id: true, name: true, consumptionMethods: true },
  });

  if (!restaurant) notFound();
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

  return (
    <div className="min-h-screen p-6">
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

      {/* Métodos de Consumo */}
      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
      />

      {/* Filtros */}
      <FiltersOrders />

      {/* Card de pedido */}
      <section className="flex flex-col items-center justify-center gap-4">
        {ordersData.map((order) => (
          <CardOrder key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}
