import { CheckoutState } from "@/dtos/finish-order.dto";
import { CheckCircle2, User } from "lucide-react";
import InfoStep from "./components/InfoStep";
import ConfirmStep from "./components/ConfirmStep";
import { JSX, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type FinishPickupProps = {
  checkoutState: CheckoutState;
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void;
  onSubmit: (checkoutState: CheckoutState) => void;
  onCancel: () => void;
};

const steps = [
  { id: "info", label: "Informações", icon: User },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

const FinishPickup = ({
  onSubmit,
  onCancel,
  checkoutState,
  onUpdateState,
}: FinishPickupProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFinalStep = currentStep === steps.length - 1;

  const stepComponents: Record<number, JSX.Element> = {
    0: <InfoStep checkoutState={checkoutState} onUpdateState={onUpdateState} />,
    1: <ConfirmStep checkoutState={checkoutState} />,
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Card className="gap-0 pb-0">
      <CardHeader>
        <div className=" flex justify-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex max-w-32 flex-1 flex-col items-center"
            >
              <div className="flex w-fit items-center">
                <div
                  className={`flex flex-col items-center ${index < steps.length - 1 ? "w-full" : ""}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      index <= currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    } `}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-center text-sm">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`-ml-2 -mr-2 mt-5 h-0.5 flex-1 ${index < currentStep ? "bg-primary" : "bg-muted-foreground/30"} `}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4 gap-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      {/* Navigation Buttons */}
      <CardFooter className="border-t bg-background sticky bottom-0">
        <div className="w-full flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onCancel : prevStep}
          >
            {currentStep === 0 ? "Cancelar" : "Voltar"}
          </Button>

          {isFinalStep ? (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onSubmit(checkoutState)}
            >
              Finalizar Pedido
            </Button>
          ) : (
            <Button onClick={nextStep}>Continuar</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FinishPickup;
