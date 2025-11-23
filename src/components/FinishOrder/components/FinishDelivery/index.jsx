"use client";

import DialogLoginUser from "@/components/DialogLoginUser";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CheckoutWizardDelivery from "../CheckoutWizardDelivery";

const userAddress = {
  street: "Rua das Flores",
  number: "123",
  complement: "Apto 101",
  neighborhood: "Centro",
  city: "São Paulo",
  state: "SP",
  zipCode: "01234-567",
};

const FinishDelivery = ({
  isLogged,
  onStepChange,
  externalSubmitTrigger,
  onSubmit,
  userData = {},
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialogClick = () => {
    setDialogOpen(true);
  };

  const handleCancel = () => {
    // Voltar para a página anterior
    console.log("Cancelar pedido");
  };

  return (
    <div className="w-full p-4">
      {!isLogged ? (
        <div className="space-y-4 rounded-md border border-red-500 p-4">
          <h3 className="text-center text-2xl font-bold text-red-500">Ops</h3>
          <p className="text-center text-sm text-muted-foreground">
            Para finalizar o pedido de entrega, é necessário estar logado e ter
            um endereço cadastrado. Clique e faça o login, é rapidinho!!!
          </p>
          <Button className="w-full" onClick={handleOpenDialogClick}>
            Fazer Login
          </Button>
          <DialogLoginUser open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
      ) : (
        <div>
          <CheckoutWizardDelivery
            userAddress={userData?.address || {}}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            onStepChange={onStepChange}
            externalSubmitTrigger={externalSubmitTrigger}
          />
        </div>
      )}
    </div>
  );
};

export default FinishDelivery;
