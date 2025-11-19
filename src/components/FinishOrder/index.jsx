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
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AnimationFadeIn from "../AnimationFadeIn";

const FinishOrder = ({ isOpen, onOpenChange }) => {
  const sp = useSearchParams();
  const consumptionMethod = sp.get("consumptionMethod") || "DELIVERY";

  const { data } = useSession();
  const isDelivery = (sp.get("consumptionMethod") || "DELIVERY") === "DELIVERY";
  const isLogged = !!data?.user;
  const hasAddress = !!data?.user?.address;
  const canFinish = !isDelivery || (isLogged && hasAddress);

  const [isFinalStep, setIsFinalStep] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  return (
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
              />
            )}
            {consumptionMethod === "PICKUP" && <FinishPickup />}
            {consumptionMethod === "DINE_IN" && <FinishDineIn />}
          </section>
          <AnimationFadeIn>
            <DrawerFooter>
              {isFinalStep && (
                <div className="flex w-full flex-col gap-2">
                  <Button
                    disabled={!canFinish}
                    onClick={() => setSubmitTrigger((v) => !v)}
                  >
                    Confirmar
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
  );
};

export default FinishOrder;
