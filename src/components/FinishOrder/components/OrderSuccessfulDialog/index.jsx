"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, CheckCircle2 } from "lucide-react";

const OrderSuccessfulDialog = ({ isOpen, onOpenChange }) => {
  // Radix Dialog expects the prop name `open` (not `isOpen`).
  // Map `isOpen` -> `open` so callers using `isOpen` still work.
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
          <Button variant="outline" className="text-red-500">
            Ver Pedidos
          </Button>
          <Button variant="outline">Continuar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessfulDialog;
