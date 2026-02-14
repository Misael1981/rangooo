"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSearchParams } from "next/navigation";
import FinishDelivery from "../FinishDelivery";
import { useProfileStatus } from "@/hooks/use-profile-status";
import FinishPickup from "../FinishPickup";
import FinishDineIn from "../FinishDineIn";
import { CheckoutState } from "@/dtos/finish-order.dto";
import { useEffect, useState } from "react";

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

  const handleFinalButtonClick = () => {
    console.log("Finalizar pedido");
  };

  const handleCancel = () => {
    window.history.back();
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
              onFinalButtonClick={handleFinalButtonClick}
              onCancel={handleCancel}
              checkoutState={checkoutState}
              onUpdateState={updateCheckoutData}
            />
          )}

          {consumptionMethod === "PICKUP" && <FinishPickup />}

          {consumptionMethod === "DINE_IN" && <FinishDineIn />}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerFinishOrder;
