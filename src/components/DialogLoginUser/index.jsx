"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserDataForm from "../SheetUserMenuButton/components/UserDataForm";

const DialogLoginUser = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Faça seu login</DialogTitle>
          <DialogDescription>
            Preencha o formulário, com seus dados corretamente, eles vão
            garantir que seu pedido chegue direitinho até você.
          </DialogDescription>
          <UserDataForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLoginUser;
