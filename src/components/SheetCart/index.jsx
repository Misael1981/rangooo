"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "@/app/contexts/cart";
import CartItem from "../CartItem";
import FinishOrder from "../FinishOrder";
import { Button } from "../ui/button";
import OrderSuccessfulDialog from "../FinishOrder/components/OrderSuccessfulDialog";
import { useSearchParams } from "next/navigation";
import { formatCurrency } from "@/helpers/format-currency";

function SheetCart() {
  const searchParams = useSearchParams();
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const [finishOrderOpen, setFinishOrderOpen] = useState(false);
  const { isOpen, toggleCart, products, total, extrasPrice, deliveryFee } =
    useContext(CartContext);

  const extrasTotal = products.reduce(
    (acc, item) =>
      acc +
      (typeof extrasPrice === "function" ? extrasPrice(item.extras) : 0) *
        item.quantity,
    0,
  );

  const handleFinishOrderClick = () => {
    setFinishOrderOpen(true);
  };

  const consumptionMethods = searchParams
    .get("consumptionMethod")
    ?.toUpperCase();

  const isDelivery = consumptionMethods === "DELIVERY";

  console.log("Métodos de consumo: ", consumptionMethods);

  return (
    <>
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
                  {formatCurrency(extrasTotal)}
                </span>
              </div>
              {isDelivery && (
                <div className="mt-1 flex w-full items-center justify-between">
                  <span className="text-sm text-black opacity-50">
                    Taxa de Entrega
                  </span>
                  <span className="text-sm font-medium text-green-500">
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
              )}
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-green-500">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-300 bg-white pt-4">
              <Button
                className="h-10 w-full"
                variant="default"
                onClick={handleFinishOrderClick}
              >
                Finalizar pedido
              </Button>
              <FinishOrder
                isOpen={finishOrderOpen}
                onOpenChange={setFinishOrderOpen}
                onOrderSuccess={() => setOrderSuccessful(true)}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <OrderSuccessfulDialog
        isOpen={orderSuccessful}
        onOpenChange={setOrderSuccessful}
      />
    </>
  );
}

export default SheetCart;
