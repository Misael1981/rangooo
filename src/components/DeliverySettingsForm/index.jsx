"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DeliverySettingsForm = ({ deliveryFee, restaurantId }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (deliveryFee !== undefined && deliveryFee !== null) {
      setValue(String(deliveryFee));
    }
  }, [deliveryFee]);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/delivery-fee", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          deliveryFee: Number(value),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar taxa de entrega");
      }

      toast.success("Taxa de entrega atualizada!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar taxa de entrega");
    }
  };

  return (
    <section className="my-6 w-fit rounded-lg bg-white p-6 shadow-md">
      <Label className="mb-2 block font-medium">Valor da entrega</Label>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">R$</span>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="max-w-[120px]"
        />
        <Button onClick={handleSave}>Salvar</Button>
      </div>
    </section>
  );
};

export default DeliverySettingsForm;
