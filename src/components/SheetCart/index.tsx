"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart-context";
import CartItem from "../CartItem";
import { formatCurrency } from "@/helpers/format-currency";
import { Separator } from "@/components/ui/separator";
import DrawerFinishOrder from "./components/DrawerFinishOrder";
import { signIn, useSession } from "next-auth/react";
import FirstRegistration from "../FirstRegistration";
import { useProfileStatus } from "@/hooks/use-profile-status";
import CardLogin from "./components/FinishDelivery/components/CardLogin";
import { toast } from "sonner";

/**
 * SheetCart
 * Gerencia a sacola de compras e controla o fluxo de checkout.
 * Implementa uma "trava" de segurança: se for DELIVERY, exige login antes de abrir o checkout.
 */
function SheetCart() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userClosedRegistration, setUserClosedRegistration] = useState(false);

  const {
    isOpen,
    toogleCart,
    products,
    totalFinal,
    deliveryFee,
    consumptionMethod,
    totalPrice,
    userAreaType,
  } = useContext(CartContext);

  const { status } = useSession();
  const isLogged = status === "authenticated";
  const { isProfileCompleted } = useProfileStatus();

  const handleLogin = (provider: "google" | "facebook") => {
    if (!termsAccepted) {
      toast.error("É necessário aceitar os termos e condições");
      return;
    }

    signIn(provider);
  };

  const extrasTotal = products.reduce((acc, item) => {
    const extrasSum = item.extras.reduce((s, e) => s + Number(e.price), 0);
    return acc + extrasSum * item.quantity;
  }, 0);

  const handleFinishOrder = () => {
    const isDelivery = consumptionMethod?.toUpperCase() === "DELIVERY";

    if (isDelivery && !isLogged) {
      setShowLoginModal(true);
      return;
    }

    if (isLogged && !isProfileCompleted) {
      setUserClosedRegistration(false);
      return;
    }

    setOpenDrawer(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toogleCart}>
        <SheetContent className="flex h-full w-[90%] flex-col p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="text-left text-black">Sacola</SheetTitle>
          </SheetHeader>

          {/* Lista de Produtos */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 text-black">
            {products.map((product) => (
              <CartItem key={product.lineId} product={product} />
            ))}
          </div>

          {/* Resumo de Valores */}
          <div className="p-4">
            <div className="rounded-md border border-gray-300 bg-slate-100 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extras</span>
                <span className="text-black">
                  {extrasTotal === 0 ? "Nenhum" : formatCurrency(extrasTotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span className="text-black">
                  {consumptionMethod?.toUpperCase() === "DELIVERY" ? (
                    !userAreaType ? (
                      <span className="text-red-500 text-xs font-medium">
                        Selecione a área no checkout
                      </span>
                    ) : deliveryFee === 0 ? (
                      <span className="text-green-600 font-bold">Grátis</span>
                    ) : (
                      formatCurrency(deliveryFee)
                    )
                  ) : (
                    "Não aplicável"
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-black">{formatCurrency(totalPrice)}</span>
              </div>
              <Separator className="bg-gray-300" />
              <div className="flex justify-between text-base font-bold text-black">
                <span>Total</span>
                <span>{formatCurrency(totalFinal)}</span>
              </div>
            </div>
          </div>

          <SheetFooter className="p-4">
            <Button
              className="w-full h-12 text-lg"
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

      {/* MODAL DE LOGIN (Dialog) */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="w-[95%] max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-black">
              Identificação Necessária
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Para realizar pedidos para entrega, precisamos que você esteja
            conectado.
          </p>
          <CardLogin
            termsAccepted={termsAccepted}
            onAcceptTerms={() => setTermsAccepted(true)}
            onLogin={handleLogin}
          />
        </DialogContent>
      </Dialog>

      {/* MODAL DE PRIMEIRO CADASTRO */}
      {isLogged && !isProfileCompleted && (
        <FirstRegistration
          open={!userClosedRegistration}
          onOpenChange={(open) => {
            if (!open) setUserClosedRegistration(true);
          }}
        />
      )}

      {/* DRAWER DE CHECKOUT FINAL */}
      <DrawerFinishOrder open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
}

export default SheetCart;
