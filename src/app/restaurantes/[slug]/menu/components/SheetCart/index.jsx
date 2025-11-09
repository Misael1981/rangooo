"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart";

const SheetCart = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product, index) => (
          <div key={index}>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default SheetCart;
