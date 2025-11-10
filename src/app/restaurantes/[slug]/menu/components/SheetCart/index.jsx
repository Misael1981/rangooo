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
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
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

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between rounded-md border border-gray-300 bg-slate-100 p-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-green-500">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-gray-300 bg-white pt-4">
            <Button className="h-10 w-full" variant="default">
              Finalizar pedido
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetCart;
