"use client";

import { Button } from "@/components/ui/button";
import { CartContext } from "@/app/restaurantes/[slug]/menu/contexts/cart";
import { useContext } from "react";
import SheetCart from "../../../components/SheetCart";

const AddToBagButton = ({ product, quantity }) => {
  const { isOpen, toggleCart, addToCart } = useContext(CartContext);

  const handleClick = () => {
    addToCart(product, quantity);
    toggleCart();
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 px-4 py-2">
      <Button
        onClick={() => {
          handleClick();
        }}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Adicionar à sacola
      </Button>
      <SheetCart />
    </section>
  );
};

export default AddToBagButton;
