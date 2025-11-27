import DailyOrdersChart from "./components/DailyOrdersChart";
import StatsCards from "./components/StatsCards";
import StatusOpenSwitch from "./components/StatusOpenSwitch";

export default function AdminDashboardPizzaria() {
  // Dados mockados - depois substitui pela API real
  const dashboardData = {
    stats: {
      totalRestaurants: 1247,
      pendingApprovals: 23,
      totalUsers: 8564,
      activeToday: 342,
    },
    recentApplications: [
      {
        id: "1",
        restaurantName: "Pizzaria do Zé",
        ownerName: "José Silva",
        email: "ze@pizzaria.com",
        phone: "(11) 99999-9999",
        city: "São Paulo",
        state: "SP",
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        id: "2",
        restaurantName: "Pizza Nostra",
        ownerName: "Maria Santos",
        email: "maria@pizzanostra.com",
        phone: "(11) 98888-8888",
        city: "Rio de Janeiro",
        state: "RJ",
        status: "PENDING",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "3",
        restaurantName: "Forno da Pizza",
        ownerName: "Carlos Oliveira",
        email: "carlos@forno.com",
        phone: "(11) 97777-7777",
        city: "Belo Horizonte",
        state: "MG",
        status: "APPROVED",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600">Gerencie seus pedidos e usuários</p>
        </div>
        <StatusOpenSwitch />
      </header>

      {/* Stats Cards */}
      <StatsCards statsOrders={dashboardData} />
      {/* Daily Orders Chart */}
      {/* <DailyOrdersChart /> */}
    </div>
  );
}
