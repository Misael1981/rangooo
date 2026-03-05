"use client";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/cart-context";
import { AddToBagButtonProps } from "@/dtos/cart.dto";
import DialogEstablishmentClosed from "../DialogEstablishmentClosed";
import { calcDeliveryFee } from "@/helpers/calc-delivery";
import { useSearchParams } from "next/navigation";

const AddToBagButton = ({
  product,
  establishmentOpen,
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  userAreaType,
}: AddToBagButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toogleCart, addToCart, setDeliveryFee, setConsumptionMethod } =
    useContext(CartContext);
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  const handleAddToBag = () => {
    if (!establishmentOpen) {
      setIsDialogOpen(true);
      return;
    }

    if (consumptionMethod) {
      setConsumptionMethod(consumptionMethod);
    }

    const fee = calcDeliveryFee(
      userAreaType,
      systemSettings!,
      restaurantDeliveryAreas,
      useRangoooDelivery,
    );
    setDeliveryFee(fee / 100);

    toogleCart();
    addToCart(product);
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 px-4 pt-10">
      <Button className="w-full " onClick={handleAddToBag}>
        Adicionar à sacola
      </Button>
      <DialogEstablishmentClosed
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default AddToBagButton;
