"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart";
import CartItem from "../CartItem";

const SheetCart = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <section className="mt-6 space-y-2">
          <div>
            {products.map((product, index) => (
              <CartItem key={index} product={product} />
            ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCart;
