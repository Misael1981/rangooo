"use client";

import { useContext } from "react";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/cart-context";
import { AddToBagButtonProps } from "@/dtos/cart.dto";

const AddToBagButton = ({ product }: AddToBagButtonProps) => {
  const { toogleCart, addToCart } = useContext(CartContext);

  const handleAddToBag = () => {
    toogleCart();
    addToCart(product);
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 px-4 pt-10">
      <Button className="w-full " onClick={handleAddToBag}>
        Adicionar à sacola
      </Button>
    </div>
  );
};

export default AddToBagButton;
