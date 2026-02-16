"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FinishDelivery from "../FinishDelivery";
import { useProfileStatus } from "@/hooks/use-profile-status";
import FinishPickup from "../FinishPickup";
import { CheckoutState } from "@/dtos/finish-order.dto";
import { useEffect, useState } from "react";
import { createOrder } from "@/app/action/create-order";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import FinishDineIn from "../FinishDineIn";

type DrawerFinishOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const METHOD_MAP = [
  { value: "DELIVERY", label: "Entrega" },
  { value: "PICKUP", label: "Retirada" },
  { value: "DINE_IN", label: "Mesa" },
] as const;

type ConsumptionMethod = (typeof METHOD_MAP)[number]["value"];

const DrawerFinishOrder = ({ open, setOpen }: DrawerFinishOrderProps) => {
  const sp = useSearchParams();
  const methodParam = sp.get("consumptionMethod");
  const router = useRouter();
  const { products, clearCart, toogleCart, deliveryFee } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

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

  const handleSubmit = async (checkoutState: CheckoutState) => {
    if (products.length === 0) return toast.error("Seu carrinho está vazio!");

    try {
      setIsSubmitting(true);

      const result = await createOrder({
        ...checkoutState,
        products: products,
        slug: slug,
        deliveryFee: deliveryFee,
        customer: {
          name: checkoutState.customer?.name ?? undefined,
          phone: checkoutState.customer?.phone ?? undefined,
        },
      });

      if (result) {
        toast.success("Pedido enviado com sucesso! 🚀");

        clearCart();
        setOpen(false);
        toogleCart();
        router.back();
      }
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error("Vixi! Algo deu errado ao processar seu pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-red-500">
            Quase lá!
          </DrawerTitle>
          <DrawerDescription>
            Método de consumo: {methodLabel}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-1">
          {consumptionMethod === "DELIVERY" && (
            <FinishDelivery
              isProfileCompleted={isProfileCompleted}
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
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerFinishOrder;
