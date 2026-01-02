"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogEstablishmentClosed = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] max-w-[95%]">
        <DialogHeader>
          <DialogTitle>OPS...</DialogTitle>
          <DialogDescription>
            O estabelecimento está fechado no momento. Por favor, volte durante
            o horário de funcionamento para fazer seu pedido.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEstablishmentClosed;
