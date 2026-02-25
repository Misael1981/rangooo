"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogEstablishmentClosedProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogEstablishmentClosed = ({
  open,
  onOpenChange,
}: DialogEstablishmentClosedProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-md max-w-[95%]">
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
