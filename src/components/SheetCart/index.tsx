"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart-context";
import CartItem from "../CartItem";
import { formatCurrency } from "@/helpers/format-currency";
import { Separator } from "../ui/separator";
import DrawerFinishOrder from "./components/DrawerFinishOrder";

function SheetCart() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    isOpen,
    toogleCart,
    products,
    totalFinal,
    deliveryFee,
    consumptionMethod,
    totalPrice,
  } = useContext(CartContext);

  const extrasTotal = products.reduce((acc, item) => {
    const extrasSum = item.extras.reduce((s, e) => s + Number(e.price), 0);

    return acc + extrasSum * item.quantity;
  }, 0);

  const handleFinishOrder = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toogleCart}>
        <SheetContent className="flex h-full w-[90%] flex-col p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4">
            {products.map((product) => (
              <CartItem key={product.lineId} product={product} />
            ))}
          </div>

          <div className="p-4">
            <div className="rounded-md border border-gray-300 bg-slate-100 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extras</span>
                <span>
                  {extrasTotal === 0 ? "Nenhum" : formatCurrency(extrasTotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span>
                  {consumptionMethod?.toUpperCase() === "DELIVERY"
                    ? deliveryFee === 0
                      ? "Grátis"
                      : formatCurrency(deliveryFee)
                    : "Não aplicável"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <Separator className="bg-gray-300" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatCurrency(totalFinal)}</span>
              </div>
            </div>
          </div>
          <SheetFooter className="p-4">
            <Button
              className="w-full"
              variant="default"
              disabled={products.length === 0}
              onClick={handleFinishOrder}
            >
              {products.length === 0
                ? "Sua sacola está vazia"
                : "Finalizar pedido"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <DrawerFinishOrder open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
}

export default SheetCart;
