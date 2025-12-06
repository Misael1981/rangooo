import { Badge } from "@/components/ui/badge";

const HeaderOrders = ({ totalOrders }) => {
  return (
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
            Total: {totalOrders}
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default HeaderOrders;
