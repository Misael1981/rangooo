"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const OrderSuccessfulDialog = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const params = useParams();
  const sp = useSearchParams();
  const slug = params?.slug;
  const cm = sp.get("consumptionMethod");

  const goToOrders = () => {
    onOpenChange(false);
    router.push("/orders");
  };

  const goToMenu = () => {
    onOpenChange(false);
    router.push(
      `/pizzarias/${slug}/menu${cm ? `?consumptionMethod=${cm}` : ""}`,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[350px] max-w-[95%] rounded-md bg-white p-4 shadow-md">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <DialogHeader>
          <DialogTitle>Pedido Efetuado!</DialogTitle>
          <DialogDescription>
            Seu pedido foi realizado com sucesso!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around">
          <Button
            variant="outline"
            className="text-red-500"
            onClick={goToOrders}
          >
            Ver Pedidos
          </Button>
          <Button variant="outline" onClick={goToMenu}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessfulDialog;
