"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Clock, CheckCircle2, Store } from "lucide-react";
import InfoStep from "./components/InfoStep";
import ConfirmStep from "./components/ConfirmStep";

const steps = [
  { id: "info", label: "Informações", icon: User },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

const FinishPickup = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    customerName: "",
    estimatedTime: "15", // tempo padrão em minutos
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.customerName.trim() !== "";
    }
    return true;
  };

  const stepComponents = {
    0: (
      <InfoStep
        customerName={formData.customerName}
        estimatedTime={formData.estimatedTime}
        onUpdate={updateFormData}
      />
    ),
    1: <ConfirmStep data={formData} />,
  };

  return (
    <div className="mx-auto w-full max-w-md p-4">
      {/* Progress Steps - Mais simples */}
      <div className="mb-8 flex justify-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex max-w-32 flex-1 flex-col items-center"
          >
            <div className="flex w-full items-center">
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
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? onCancel : prevStep}
            >
              {currentStep === 0 ? "Cancelar" : "Voltar"}
            </Button>
            <Button onClick={nextStep} disabled={!canProceed()}>
              {currentStep === steps.length - 1
                ? "Finalizar Pedido"
                : "Continuar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinishPickup;
