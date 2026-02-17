import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Se tiver o componente de Badge do Shadcn
import { Separator } from "@/components/ui/separator";
import { Utensils, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dica: Crie uma interface para o pedido (Order)
const OrderCard = ({ order }: { order: any }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-muted">
      <CardHeader className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          {/* Restaurante Info */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border">
              <Image
                src={order.restaurant.avatarImageUrl}
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

          {/* Status Badge */}
          <Badge
            variant={order.status === "DELIVERED" ? "default" : "secondary"}
            className="text-[10px]"
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        {/* Resumo dos Itens */}
        <div className="space-y-1">
          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-[10px] font-bold">
                {item.quantity}x
              </span>
              <span className="truncate">{item.product.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Total
            </span>
            <span className="font-bold text-red-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRP",
              }).format(order.totalPrice)}
            </span>
          </div>

          {/* Botão para voltar à loja */}
          <Link
            href={`/${order.restaurant.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Pedir novamente
            <ChevronRight size={14} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
