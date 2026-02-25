"use client";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/cart-context";
import { AddToBagButtonProps } from "@/dtos/cart.dto";
import DialogEstablishmentClosed from "../DialogEstablishmentClosed";

const AddToBagButton = ({
  product,
  establishmentOpen,
}: AddToBagButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toogleCart, addToCart } = useContext(CartContext);

  const handleAddToBag = () => {
    if (!establishmentOpen) {
      setIsDialogOpen(true);
      return;
    }

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
