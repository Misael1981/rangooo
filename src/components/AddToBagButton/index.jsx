"use client";

import { Button } from "@/components/ui/button";
import { CartContext } from "@/app/contexts/cart";
import { useContext, useState } from "react";
import SheetCart from "../SheetCart";
import DialogEstablishmentClosed from "../DialogEstablishmentClosed";

const AddToBagButton = ({
  product,
  quantity,
  extras = [],
  isOpen,
  deliveryFee,
  consumptionMethods,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toggleCart, addToCart } = useContext(CartContext);

  const handleClick = () => {
    if (!isOpen) {
      setIsDialogOpen(true);
      return;
    }
    addToCart(product, quantity, extras, deliveryFee);
    toggleCart();
  };

  return (
    <section className="absolute bottom-0 left-0 right-0 px-4 py-2">
      <Button
        onClick={() => {
          handleClick();
        }}
        className="w-full rounded-md px-4 py-2 text-primary-foreground"
      >
        Adicionar à sacola
      </Button>
      <SheetCart consumptionMethods={consumptionMethods} />
      <DialogEstablishmentClosed
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
};

export default AddToBagButton;
