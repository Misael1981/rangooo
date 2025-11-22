"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import FinishDelivery from "./components/FinishDelivery";
import FinishPickup from "./components/FinishPickup";
import FinishDineIn from "./components/FinishDineIn";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useState, useTransition } from "react";
import AnimationFadeIn from "../AnimationFadeIn";
import { createOrder } from "@/app/actions/create-order";
import { CartContext } from "@/app/contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import OrderSuccessfulDialog from "./components/OrderSuccessfulDialog";

const FinishOrder = ({ isOpen, onOpenChange, onOrderSuccess }) => {
  // === ESTADOS ===
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  // === HOOKS ===
  const params = useParams();
  const { products, closeCart, clearCart } = useContext(CartContext);
  const sp = useSearchParams();
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();

  // === VARIÁVEIS COMPUTADAS ===
  const consumptionMethod = sp.get("consumptionMethod") || "DELIVERY";
  const slugParam = params?.slug ?? sp.get("slug");
  const isDelivery = consumptionMethod === "DELIVERY";
  const isLogged = !!data?.user;
  const hasAddress = !!data?.user?.address;

  // ✅ CORRIGIDO: Agora isFinalStep já foi declarado
  const canFinish = !isDelivery || (isLogged && isFinalStep);

  // === HANDLERS ===
  const handleSubmit = async (formData) => {
    try {
      startTransition(async () => {
        await createOrder({
          userId: data?.user?.id,
          consumptionMethod,
          deliveryAddress: formData.address,
          slug: slugParam,
          products: products.map((product) => ({
            productId: product.productId ?? product.id,
            quantity: product.quantity,
            extras: product.extras,
          })),
          paymentMethod: formData.paymentMethod,
        });
        setSubmitTrigger(false);
        closeCart();
        clearCart();
        onOrderSuccess();
      });
    } catch (error) {
      setSubmitTrigger(false);
      toast.error("Erro ao criar pedido. Tente novamente.");
      console.log("Erro ao criar pedido:", error);
    }
  };

  const handleFinalButtonClick = () => {
    setSubmitTrigger((v) => !v);
  };

  const handleCancel = () => {
    window.history.back();
  };

  // === RENDER ===
  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <AnimationFadeIn>
          <DrawerContent className="h-fit">
            <DrawerHeader className="p-2">
              <DrawerTitle className="text-2xl font-bold text-red-500">
                Quase lá!
              </DrawerTitle>
              <DrawerDescription>
                Método de consumo: {consumptionMethod}
              </DrawerDescription>
            </DrawerHeader>

            <section>
              {consumptionMethod === "DELIVERY" && (
                <FinishDelivery
                  isLogged={isLogged}
                  onStepChange={setIsFinalStep}
                  externalSubmitTrigger={submitTrigger}
                  onSubmit={handleSubmit}
                />
              )}
              {consumptionMethod === "PICKUP" && (
                <FinishPickup
                  onSubmit={() => setSubmitTrigger((v) => !v)}
                  onCancel={() => setIsFinalStep(false)}
                />
              )}
              {consumptionMethod === "DINE_IN" && <FinishDineIn />}
            </section>

            <AnimationFadeIn>
              <DrawerFooter>
                {isFinalStep && (
                  <div className="flex w-full flex-col gap-2">
                    <Button
                      disabled={isPending || !canFinish}
                      onClick={handleFinalButtonClick}
                    >
                      {isPending && <Loader2Icon className="animate-spin" />}
                      Finalizar Pedido
                    </Button>

                    <DrawerClose asChild>
                      <Button variant="destructive">Cancelar</Button>
                    </DrawerClose>
                  </div>
                )}
              </DrawerFooter>
            </AnimationFadeIn>
          </DrawerContent>
        </AnimationFadeIn>
      </Drawer>
      <OrderSuccessfulDialog
        isOpen={orderSuccessful}
        onOpenChange={(open) => {
          setOrderSuccessful(open);
          if (!open) {
            onOpenChange(true);
          }
        }}
      />
    </>
  );
};

export default FinishOrder;
