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
import { useContext, useState, useEffect, useTransition } from "react";
import AnimationFadeIn from "../AnimationFadeIn";
import { createOrder } from "@/app/actions/create-order";
import { CartContext } from "@/app/contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import OrderSuccessfulDialog from "./components/OrderSuccessfulDialog";
import useSWR from "swr";

// Fetcher para o SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const FinishOrder = ({ isOpen, onOpenChange, onOrderSuccess }) => {
  // === ESTADOS ===
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === HOOKS ===
  const params = useParams();
  const { products, closeCart, clearCart } = useContext(CartContext);
  const sp = useSearchParams();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  // === BUSCA DADOS DO USUÁRIO (CORRETO) ===
  const { data: userData, isLoading: userLoading } = useSWR(
    session?.user ? "/api/users" : null,
    fetcher,
  );

  // === VARIÁVEIS COMPUTADAS ===
  const consumptionMethod = sp.get("consumptionMethod") || "DELIVERY";
  const slugParam = params?.slug ?? sp.get("slug");
  const isDelivery = consumptionMethod === "DELIVERY";
  const isLogged = !!session?.user;

  // ✅ Usa os dados do SWR ou da session como fallback
  const user = userData?.user || session?.user;
  const hasAddress = !!user?.address;

  const canFinish = !isDelivery || (isLogged && isFinalStep);

  // === HANDLERS ===
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await createOrder({
        userId: user?.id,
        consumptionMethod,
        deliveryAddress: formData.address,
        slug: slugParam,
        products: products.map((product) => ({
          productId: product.productId ?? product.id,
          quantity: product.quantity,
          extras: product.extras, // O JSON de extras
          name: product.name, // 👈 ADICIONE ISSO (O nome composto)
          price: product.price, // 👈 ADICIONE ISSO (O preço unitário/meio a meio)
        })),
        paymentMethod: formData.paymentMethod,
      });

      setSubmitTrigger(false);
      closeCart();
      clearCart();
      onOrderSuccess();
    } catch (error) {
      setSubmitTrigger(false);
      toast.error("Erro ao criar pedido. Tente novamente.");
      console.log("Erro ao criar pedido:", error);
    } finally {
      setIsSubmitting(false);
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
          <DrawerContent className="flex max-h-[96vh] flex-col">
            <DrawerHeader className="p-2">
              <DrawerTitle className="text-2xl font-bold text-red-500">
                Quase lá!
              </DrawerTitle>
              <DrawerDescription>
                Método de consumo: {consumptionMethod}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-1">
              <section>
                {consumptionMethod === "DELIVERY" && (
                  <FinishDelivery
                    isLogged={isLogged}
                    userData={user}
                    onStepChange={setIsFinalStep}
                    externalSubmitTrigger={submitTrigger}
                    onSubmit={handleSubmit}
                  />
                )}
                {consumptionMethod === "PICKUP" && (
                  <FinishPickup
                    onSubmit={handleSubmit}
                    onCancel={() => setIsFinalStep(false)}
                  />
                )}
                {consumptionMethod === "DINE_IN" && (
                  <FinishDineIn onSubmit={handleSubmit} />
                )}
              </section>
            </div>

            <AnimationFadeIn>
              <DrawerFooter className="flex-none">
                {isFinalStep && (
                  <div className="flex w-full flex-col gap-2">
                    <Button
                      disabled={isSubmitting || !canFinish}
                      onClick={handleFinalButtonClick}
                    >
                      {isSubmitting && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSubmitting ? "Processando..." : "Finalizar Pedido"}
                    </Button>

                    <DrawerClose asChild>
                      <Button variant="destructive" onClick={handleCancel}>
                        Cancelar
                      </Button>
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
