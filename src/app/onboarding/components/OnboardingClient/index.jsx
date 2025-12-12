"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Building,
  CheckCircle,
  User,
} from "lucide-react";
import OwnerData from "../OwnerData";
import EstablishmentData from "../EstablishmentData";
import MenuEstablishment from "../MenuEstablishment";
import Confirmation from "../Confirmation";
import HeaderForm from "../HeaderForm";
import ProgressSteps from "../ProgressSteps";
import { useOnboardingForm } from "@/app/hooks/useOnboardingData";

export default function OnboardingClient({ token }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { form, goToNextStep, clearStorage } = useOnboardingForm();

  const steps = [
    { number: 1, title: "Dados do Dono", icon: User },
    { number: 2, title: "Dados do Estabelecimento", icon: Building },
    { number: 3, title: "Cardápio", icon: BookOpenCheck },
    { number: 4, title: "Confirmação", icon: CheckCircle },
  ];

  const validateMenuStep = async (form) => {
    const formData = form.getValues();
    const errors = validateMenuForm(formData);

    if (errors.length > 0) {
      // Mostra o primeiro erro
      alert(errors[0]);
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    await goToNextStep(currentStep, setCurrentStep);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Valida TODO o formulário
      const isValid = await form.trigger();
      if (!isValid) {
        alert("Por favor, corrija os erros antes de finalizar.");
        return;
      }

      // 2. Pega todos os dados
      const formData = form.getValues();

      // 3. Envia para a API (TUDO de uma vez)
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      // 4. Limpa localStorage e redireciona
      clearStorage();
      alert("Cadastro concluído com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao finalizar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <HeaderForm />
        <ProgressSteps steps={steps} currentStep={currentStep} />

        <Card className="border-2 border-orange-100 shadow-lg">
          <CardContent className="p-8">
            {/* FORM PROVIDER envolve tudo */}
            <FormProvider {...form}>
              {currentStep === 1 && <OwnerData />}
              {currentStep === 2 && <EstablishmentData />}
              {currentStep === 3 && <MenuEstablishment />}
              {currentStep === 4 && <Confirmation />}

              <div className="flex justify-between border-t border-gray-200 pt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNext}>
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Finalizando..." : "Finalizar Cadastro"}
                  </Button>
                )}
              </div>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
