"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams, useSearchParams } from "next/navigation";
import FinishDelivery from "../FinishDelivery";
import { useProfileStatus } from "@/hooks/use-profile-status";
import FinishPickup from "../FinishPickup";
import { CheckoutState } from "@/dtos/finish-order.dto";
import { useEffect, useState } from "react";
import { createOrder } from "@/app/action/create-order";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import FinishDineIn from "../FinishDineIn";
import OrderSuccessfulDialog from "@/components/OrderSuccessfulDialog";
import { signIn, useSession } from "next-auth/react";
import CardLogin from "../FinishDelivery/components/CardLogin";
import FirstRegistration from "@/components/FirstRegistration";
import { CreateOrderInputDTO } from "@/dtos/create-order.dto";

type DrawerFinishOrderProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void; // Nome padrão do Shadcn
};

const METHOD_MAP = [
  { value: "DELIVERY", label: "Entrega" },
  { value: "PICKUP", label: "Retirada" },
  { value: "DINE_IN", label: "Mesa" },
] as const;

type ConsumptionMethod = (typeof METHOD_MAP)[number]["value"];

const DrawerFinishOrder = ({ open, onOpenChange }: DrawerFinishOrderProps) => {
  const [openOrderSuccess, setOpenOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userClosedModal, setUserClosedModal] = useState(false);

  const sp = useSearchParams();
  const methodParam = sp.get("consumptionMethod");
  const { products, clearCart, toogleCart, deliveryFee } = useCart();
  const params = useParams();
  const slug = params.slug as string;
  const { data: session, status } = useSession();

  console.log(session);

  const isLogged = status === "authenticated";

  const consumptionMethod: ConsumptionMethod = METHOD_MAP.some(
    (m) => m.value === methodParam,
  )
    ? (methodParam as ConsumptionMethod)
    : "DELIVERY";

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    consumptionMethod,
    customer: {},
  });

  const methodLabel = METHOD_MAP.find(
    (m) => m.value === consumptionMethod,
  )?.label;

  const { isProfileCompleted, userData } = useProfileStatus();

  useEffect(() => {
    if (userData && !checkoutState.customer.name) {
      const timer = setTimeout(() => {
        setCheckoutState((prev) => ({
          ...prev,
          customer: {
            name: userData.name ?? "",
            phone: userData.phone ?? "",
          },
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [userData, checkoutState.customer.name]);

  const updateCheckoutData = (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => {
    setCheckoutState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleLogin = (provider: "google" | "facebook") => {
    if (!termsAccepted) {
      toast.error("É necessário aceitar os termos e condições");
      return;
    }

    signIn(provider);
  };

  const handleSubmit = async (checkoutState: CheckoutState) => {
    if (products.length === 0) return toast.error("Seu carrinho está vazio!");

    try {
      setIsSubmitting(true);

      const orderInput = {
        ...checkoutState,
        products: products,
        slug: slug,
        deliveryFee: Number(deliveryFee),
        delivery:
          checkoutState.consumptionMethod === "DELIVERY"
            ? {
                address: {
                  street: checkoutState.delivery?.address?.street ?? "",
                  number: checkoutState.delivery?.address?.number ?? "",
                  neighborhood:
                    checkoutState.delivery?.address?.neighborhood ?? "",
                  city: checkoutState.delivery?.address?.city ?? "",
                  complement:
                    checkoutState.delivery?.address?.complement ?? null,
                },
              }
            : undefined,
      };

      const result = await createOrder(
        orderInput as unknown as CreateOrderInputDTO,
      );

      if (result) {
        toast.success("Pedido enviado com sucesso! 🚀");

        clearCart();
        onOpenChange(false);
        setOpenOrderSuccess(true);
        toogleCart();
      }
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      console.log(isSubmitting);
      toast.error("Vixi! Algo deu errado ao processar seu pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-red-500">
              Quase lá!
            </DrawerTitle>
            <DrawerDescription>
              Método de consumo: {methodLabel}
            </DrawerDescription>
          </DrawerHeader>
          {!isLogged ? (
            <CardLogin
              termsAccepted={termsAccepted}
              onAcceptTerms={() => setTermsAccepted(true)}
              onLogin={handleLogin}
            />
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden">
              {!isProfileCompleted && (
                <FirstRegistration
                  open={!userClosedModal}
                  onOpenChange={(open) => {
                    if (!open) setUserClosedModal(true);
                  }}
                />
              )}
              <div className="flex-1 overflow-y-auto px-1">
                {consumptionMethod === "DELIVERY" && (
                  <FinishDelivery
                    userData={userData}
                    onCancel={handleCancel}
                    checkoutState={checkoutState}
                    onUpdateState={updateCheckoutData}
                    onSubmit={handleSubmit}
                  />
                )}

                {consumptionMethod === "PICKUP" && (
                  <FinishPickup
                    checkoutState={checkoutState}
                    onUpdateState={updateCheckoutData}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                )}

                {consumptionMethod === "DINE_IN" && (
                  <FinishDineIn
                    onCancel={handleCancel}
                    checkoutState={checkoutState}
                    onUpdateState={updateCheckoutData}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
      <OrderSuccessfulDialog
        isOpen={openOrderSuccess}
        onOpenChange={setOpenOrderSuccess}
      />
    </>
  );
};

export default DrawerFinishOrder;
