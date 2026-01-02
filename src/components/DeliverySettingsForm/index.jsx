"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DeliverySettingsForm = ({ deliveryFee, restaurantId }) => {
  // Inicializamos já garantindo que é um número ou string vazia
  const [value, setValue] = useState("");

  useEffect(() => {
    // Conversão explícita para Number caso o Prisma envie o objeto Decimal
    if (deliveryFee !== undefined && deliveryFee !== null) {
      setValue(String(Number(deliveryFee)));
    }
  }, [deliveryFee]);

  const handleSave = async () => {
    // Pequena validação para não enviar campo vazio
    if (value === "") return toast.error("Insira um valor válido");

    try {
      const response = await fetch("/api/admin/delivery-fee", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          // Enviamos como número, e a sua API/Prisma deve receber como Decimal
          deliveryFee: Number(value),
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Taxa de entrega atualizada!");
    } catch (err) {
      toast.error("Erro ao salvar taxa de entrega");
    }
  };

  return (
    <section className="my-6 w-fit rounded-lg border border-gray-100 bg-white p-6 shadow-md">
      <Label className="mb-2 block font-medium">
        Valor da entrega (Configuração)
      </Label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            R$
          </span>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-[140px] pl-9"
            placeholder="0,00"
          />
        </div>
        <Button onClick={handleSave}>Salvar Taxa</Button>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        * Este valor será aplicado aos novos pedidos de delivery.
      </p>
    </section>
  );
};

export default DeliverySettingsForm;
