"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/app/contexts/cart";
import CartItem from "../CartItem";

function SheetCart() {
  const { isOpen, toggleCart, products, total, extrasPrice } =
    useContext(CartContext);
  const extrasTotal = products.reduce(
    (acc, item) =>
      acc +
      (typeof extrasPrice === "function" ? extrasPrice(item.extras) : 0) *
        item.quantity,
    0,
  );
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
          <div className="rounded-md border border-gray-300 bg-slate-100 p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm opacity-50">
                Ingredientes Adicionais
              </span>
              <span className="text-sm text-green-500">
                R$ {extrasTotal.toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-green-500">
                R$ {total.toFixed(2)}
              </span>
            </div>
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
