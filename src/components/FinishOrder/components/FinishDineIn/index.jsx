import { CheckCircle2, CreditCard, Utensils } from "lucide-react";
import ConfirmStep from "./components/ConfirmStep";
import PaymentStep from "./components/PaymentStep";
import TableStep from "./components/TableStep";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const steps = [
  { id: "table", label: "Mesa", icon: Utensils },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

const FinishDineIn = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tableNumber: "",
    customerName: "",
    paymentMethod: "pix",
    needsChange: false,
    changeAmount: "",
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
      return (
        formData.tableNumber.trim() !== "" &&
        formData.customerName.trim() !== ""
      );
    }
    if (
      currentStep === 1 &&
      formData.paymentMethod === "cash" &&
      formData.needsChange
    ) {
      return formData.changeAmount.trim() !== "";
    }
    return true;
  };

  const stepComponents = {
    0: (
      <TableStep
        tableNumber={formData.tableNumber}
        customerName={formData.customerName}
        onUpdate={updateFormData}
      />
    ),
    1: <ConfirmStep data={formData} />,
  };

  return (
    <div className="mx-auto w-full max-w-md p-4">
      {/* Progress Steps */}
      <div className="mb-8 flex justify-between">
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
        <CardContent className="h-fit overflow-auto p-4">
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

export default FinishDineIn;
