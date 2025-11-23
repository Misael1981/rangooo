"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CreditCard, CheckCircle2 } from "lucide-react";
import AddressStep from "./components/AddressStep";
import PaymentStep from "./components/PaymentStep";
import ConfirmStep from "./components/ConfirmStep";
import { Button } from "@/components/ui/button";

const steps = [
  { id: "address", label: "Endereço", icon: MapPin },
  { id: "payment", label: "Pagamento", icon: CreditCard },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

const CheckoutWizardDelivery = ({ userAddress, onSubmit, onCancel, onStepChange, externalSubmitTrigger }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    address: userAddress,
    paymentMethod: "pix",
    needsChange: false,
    changeAmount: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddressField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const isFinalStep = currentStep === steps.length - 1;

  useEffect(() => {
    if (typeof onStepChange === "function") {
      onStepChange(isFinalStep);
    }
  }, [isFinalStep, onStepChange]);

  const lastTriggerRef = useRef(null);
  useEffect(() => {
    if (!isFinalStep) return;
    if (externalSubmitTrigger === lastTriggerRef.current) return;
    lastTriggerRef.current = externalSubmitTrigger;
    if (externalSubmitTrigger) onSubmit(formData);
  }, [externalSubmitTrigger, isFinalStep, formData, onSubmit]);


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const stepComponents = {
    0: <AddressStep address={formData.address} onUpdate={updateAddressField} />,
    1: (
      <PaymentStep
        paymentMethod={formData.paymentMethod}
        needsChange={formData.needsChange}
        changeAmount={formData.changeAmount}
        onUpdate={updateFormData}
      />
    ),
    2: <ConfirmStep data={formData} />,
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
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

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
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
          {/* Navigation Buttons */}
          {!isFinalStep && (
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={currentStep === 0 ? onCancel : prevStep}
              >
                {currentStep === 0 ? "Cancelar" : "Voltar"}
              </Button>
              <Button onClick={nextStep}>Continuar</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutWizardDelivery;
