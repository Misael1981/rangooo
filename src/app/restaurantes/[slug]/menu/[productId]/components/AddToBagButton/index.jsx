"use client";

import { Button } from "@/components/ui/button";
import { CartContext } from "@/app/restaurantes/[slug]/menu/contexts/cart";
import { useContext } from "react";
import SheetCart from "../../../components/SheetCart";

const AddToBagButton = ({ product }) => {
  const { isOpen, toggleCart } = useContext(CartContext);
  const handleToCart = () => {
    toggleCart();
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 px-4 py-2">
      <Button
        onClick={() => {
          handleToCart();
        }}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Adicionar à sacola
      </Button>
      <SheetCart open={isOpen} onOpenChange={toggleCart} />
    </section>
  );
};

export default AddToBagButton;
