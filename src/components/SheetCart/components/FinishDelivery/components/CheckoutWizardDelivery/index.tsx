import { UserDTO } from "@/dtos/profile-status.dto";
import { CheckCircle2, CreditCard, MapPin } from "lucide-react";
import { JSX, useEffect, useMemo, useState } from "react";
import AddressStep from "./components/AddressStep";
import PaymentStep, { PaymentFormData } from "./components/PaymentStep";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutState } from "@/dtos/finish-order.dto";
import ConfirmStep from "./components/ConfirmStep";

type CheckoutWizardDeliveryProps = {
  user: UserDTO | null;
  onStepChange: (isFinalStep: boolean) => void;
  onCancel: () => void;
  checkoutState: CheckoutState;
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void;
  onFinalButtonClick: () => void;
};

const steps = [
  { id: "address", label: "Endereço", icon: MapPin },
  { id: "payment", label: "Pagamento", icon: CreditCard },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

const CheckoutWizardDelivery = ({
  user,
  onStepChange,
  onCancel,
  checkoutState,
  onUpdateState,
  onFinalButtonClick,
}: CheckoutWizardDeliveryProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formPaymentData, setFormPaymentData] = useState<PaymentFormData>({
    paymentMethod: "pix",
    needsChange: false,
    changeAmount: "",
  });

  const isFinalStep = currentStep === steps.length - 1;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Finalizar pedido");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const defaultAddress = user?.addresses?.find((addr) => addr.isDefault);

  const userAddress = useMemo(() => {
    if (!defaultAddress) return undefined;

    return {
      street: defaultAddress.street,
      number: defaultAddress.number,
      complement: defaultAddress.complement,
      neighborhood: defaultAddress.neighborhood,
      city: defaultAddress.city,
      reference: defaultAddress.reference,
      areaType: defaultAddress.areaType,
    };
  }, [defaultAddress]);

  const deliveryAddress = checkoutState.delivery?.address;

  useEffect(() => {
    if (userAddress && !deliveryAddress) {
      onUpdateState("delivery", { address: userAddress });
    }

    if (typeof onStepChange === "function") {
      onStepChange(isFinalStep);
    }
  }, [isFinalStep, onStepChange, userAddress, deliveryAddress, onUpdateState]);

  const handlePaymentUpdate = <K extends keyof PaymentFormData>(
    field: K,
    value: PaymentFormData[K],
  ) => {
    const newPaymentData = {
      ...formPaymentData,
      [field]: value,
    };
    setFormPaymentData(newPaymentData);

    onUpdateState("payment", newPaymentData);
  };

  const stepComponents: Record<number, JSX.Element> = {
    0: <AddressStep userAddress={userAddress} />,
    1: (
      <PaymentStep formData={formPaymentData} onUpdate={handlePaymentUpdate} />
    ),
    2: <ConfirmStep checkoutState={checkoutState} />,
  };

  return (
    <div className="w-full">
      <Card>
        {/* Step Content */}
        <CardHeader>
          <div className="mb-4 flex justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div
                    className={`flex w-full flex-col items-center ${index < steps.length - 1 ? "w-full" : ""}`}
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
                    <span className="mt-2 text-center text-sm">
                      {step.label}
                    </span>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-30"
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
                onClick={onFinalButtonClick}
              >
                Finalizar Pedido
              </Button>
            ) : (
              <Button onClick={nextStep}>Continuar</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutWizardDelivery;
