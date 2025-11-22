import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  ChefHat,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-600",
  },
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
    iconColor: "text-blue-600",
  },
  PREPARING: {
    label: "Em Preparação",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: ChefHat,
    iconColor: "text-orange-600",
  },
  READY_FOR_PICKUP: {
    label: "Pronto para Retirada",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Package,
    iconColor: "text-purple-600",
  },
  OUT_FOR_DELIVERY: {
    label: "A Caminho",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: Truck,
    iconColor: "text-indigo-600",
  },
  DELIVERED: {
    label: "Entregue",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    iconColor: "text-green-600",
  },
  CANCELED: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    iconColor: "text-red-600",
  },
};

const BadgeStatus = ({ status, showIcon = true, className = "" }) => {
  const config = statusConfig[status];

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        Status Desconhecido
      </Badge>
    );
  }

  const IconComponent = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${className} flex items-center gap-1.5 font-medium`}
    >
      {showIcon && <IconComponent className={`h-3 w-3 ${config.iconColor}`} />}
      {config.label}
    </Badge>
  );
};

export default BadgeStatus;
