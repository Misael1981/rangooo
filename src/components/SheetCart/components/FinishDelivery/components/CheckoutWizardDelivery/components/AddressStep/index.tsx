"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaType } from "@/generated/prisma/enums";
import { useState } from "react";
import ChangeAddressDialog from "../ChangeAddressDialog";

type AddressStepProps = {
  userAddress?: {
    street?: string;
    number?: string;
    complement?: string | null;
    neighborhood?: string;
    city?: string;
    reference?: string | null;
    areaType?: AreaType;
  };
};

const AREA_TYPE_LABEL = {
  URBAN: "Zona Urbana",
  RURAL: "Zona Rural",
  DISTRICT: "Distrito",
};

const AddressStep = ({ userAddress }: AddressStepProps) => {
  const [isChangeAddressDialogOpen, setIsChangeAddressDialogOpen] =
    useState(false);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Confirme seu endereço</h3>
      <p className="text-sm text-muted-foreground">
        Verifique se o endereço está correto ou faça ajustes se necessário
      </p>

      <div className="w-full py-4">
        {userAddress?.areaType && (
          <div className="flex justify-end py-2">
            <Badge variant="default" className="bg-orange-400">
              {AREA_TYPE_LABEL[userAddress.areaType]}
            </Badge>
          </div>
        )}
        <p>{`${userAddress?.street} - ${userAddress?.number} ${userAddress?.complement || ""} - ${userAddress?.neighborhood} - ${userAddress?.city}`}</p>
        {userAddress?.reference && <p>{userAddress?.reference}</p>}
        <Button
          variant="ghost"
          className="text-red-500"
          onClick={() => setIsChangeAddressDialogOpen(true)}
        >
          Mudar Endereço
        </Button>
        <ChangeAddressDialog
          isOpen={isChangeAddressDialogOpen}
          onOpenChange={setIsChangeAddressDialogOpen}
          userAddress={userAddress}
        />
      </div>
    </div>
  );
};

export default AddressStep;
