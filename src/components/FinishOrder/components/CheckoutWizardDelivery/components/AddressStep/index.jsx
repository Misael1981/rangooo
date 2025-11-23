"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChangeAddressDialog from "../ChangeAddressDialog";

const AddressStep = ({ address, onUpdate }) => {
  const [isChangeAddressDialogOpen, setIsChangeAddressDialogOpen] =
    useState(false);

  const handleChangeAddressClick = () => {
    setIsChangeAddressDialogOpen(true);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Confirme seu endereço</h3>
      <p className="text-sm text-muted-foreground">
        Verifique se o endereço está correto ou faça ajustes se necessário
      </p>

      <div className="w-full py-4">
        <p>{`${address.street} - ${address.number} ${address.complement || ""} - ${address.neighborhood} - ${address.city}`}</p>
        <Button
          variant="ghost"
          className="text-red-500"
          onClick={handleChangeAddressClick}
        >
          Mudar Endereço
        </Button>
        <ChangeAddressDialog
          address={address}
          onUpdate={onUpdate}
          isOpen={isChangeAddressDialogOpen}
          onOpenChange={setIsChangeAddressDialogOpen}
        />
      </div>
    </div>
  );
};

export default AddressStep;
