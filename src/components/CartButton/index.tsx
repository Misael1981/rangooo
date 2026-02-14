"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";

const CartButton = () => {
  const { toogleCart } = useContext(CartContext);

  const handleAddToBag = () => {
    toogleCart();
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute right-4 top-4 z-20 rounded-full"
      onClick={handleAddToBag}
    >
      <ShoppingCart />
    </Button>
  );
};

export default CartButton;
