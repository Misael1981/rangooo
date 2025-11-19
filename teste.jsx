// components/checkout/dine-in-wizard.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Utensils,
  CreditCard,
  DollarSign,
  QrCode,
  CheckCircle2,
  User,
} from "lucide-react";

const steps = [
  { id: "table", label: "Mesa", icon: Utensils },
  { id: "payment", label: "Pagamento", icon: CreditCard },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
];

export function DineInWizard({ onSubmit, onCancel }) {
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
    <div className="mx-auto w-full max-w-md p-4">
      {/* Progress Steps */}
      <div className="mb-8 flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 flex-col items-center">
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
}

// Table Step Component
function TableStep({ tableNumber, customerName, onUpdate }) {
  // Sugestões de mesas (pode vir do banco depois)
  const suggestedTables = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Comer no Local</h3>
        <p className="text-sm text-muted-foreground">
          Informe os dados da sua mesa
        </p>
      </div>

      {/* Nome do Cliente */}
      <div className="space-y-2">
        <Label htmlFor="customerName" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Seu nome (opcional)
        </Label>
        <Input
          id="customerName"
          placeholder="Como devemos chamar você?"
          value={customerName}
          onChange={(e) => onUpdate("customerName", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Para facilitar a entrega do pedido
        </p>
      </div>

      {/* Número da Mesa */}
      <div className="space-y-3">
        <Label htmlFor="tableNumber">Número da Mesa *</Label>
        <Input
          id="tableNumber"
          placeholder="Ex: 05"
          value={tableNumber}
          onChange={(e) => onUpdate("tableNumber", e.target.value)}
          className="text-center text-lg font-semibold"
        />

        {/* Sugestões Rápidas de Mesas */}
        <div className="pt-2">
          <p className="mb-2 text-sm text-muted-foreground">
            Selecione rapidamente:
          </p>
          <div className="grid grid-cols-5 gap-2">
            {suggestedTables.map((table) => (
              <Button
                key={table}
                type="button"
                variant={tableNumber === table ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate("tableNumber", table)}
                className="h-10"
              >
                {table}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-start space-x-2 text-amber-800">
          <Utensils className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Atenção</p>
            <p className="text-xs">Confirme o número da mesa com o garçom</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Payment Step Component (Reutilizado do delivery com ajustes)
function PaymentStep({ paymentMethod, needsChange, changeAmount, onUpdate }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Forma de pagamento</h3>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => onUpdate("paymentMethod", value)}
        className="space-y-3"
      >
        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50">
          <RadioGroupItem value="pix" id="pix" />
          <QrCode className="h-5 w-5 text-green-600" />
          <Label htmlFor="pix" className="flex-1 cursor-pointer">
            <div className="font-medium">PIX</div>
            <div className="text-sm text-muted-foreground">
              Pagamento instantâneo
            </div>
          </Label>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50">
          <RadioGroupItem value="card" id="card" />
          <CreditCard className="h-5 w-5 text-blue-600" />
          <Label htmlFor="card" className="flex-1 cursor-pointer">
            <div className="font-medium">Cartão</div>
            <div className="text-sm text-muted-foreground">
              Crédito ou débito
            </div>
          </Label>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50">
          <RadioGroupItem value="cash" id="cash" />
          <DollarSign className="h-5 w-5 text-amber-600" />
          <Label htmlFor="cash" className="flex-1 cursor-pointer">
            <div className="font-medium">Dinheiro</div>
            <div className="text-sm text-muted-foreground">
              Pagamento na conta
            </div>
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === "cash" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 pt-4"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="needsChange"
              checked={needsChange}
              onChange={(e) => onUpdate("needsChange", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="needsChange" className="cursor-pointer">
              Precisa de troco?
            </Label>
          </div>

          {needsChange && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <Label htmlFor="changeAmount">Valor para troco</Label>
              <Input
                id="changeAmount"
                type="number"
                placeholder="Ex: 50.00"
                value={changeAmount}
                onChange={(e) => onUpdate("changeAmount", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Informe o valor que você vai pagar
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Confirm Step Component
function ConfirmStep({ data }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Confirme seu pedido</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Local de consumo
          </h4>
          <p className="text-sm">
            Mesa: <strong>{data.tableNumber}</strong>
            {data.customerName && (
              <>
                {" "}
                • Cliente: <strong>{data.customerName}</strong>
              </>
            )}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Forma de pagamento
          </h4>
          <p className="text-sm capitalize">
            {data.paymentMethod === "pix" && "PIX"}
            {data.paymentMethod === "card" && "Cartão"}
            {data.paymentMethod === "cash" && "Dinheiro"}
            {data.paymentMethod === "cash" &&
              data.needsChange &&
              ` (Troco para R$ ${data.changeAmount})`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            Pedido confirmado! Aguarde o atendimento.
          </span>
        </div>
      </div>
    </div>
  );
}
