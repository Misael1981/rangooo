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
import { Button } from "@/components/ui/button";

function SheetCart() {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex h-full w-[90%] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4">
          {products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>

        <div className="border-t border-gray-300 bg-white p-4">
          <Button className="h-10 w-full" variant="default">
            Finalizar pedido
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetCart;
