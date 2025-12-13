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
import { formSchema } from "@/app/schemas/form-schema";

export default function OnboardingClient({ token }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

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
    setError(null);

    try {
      // 1. Validação HÍBRIDA (Zod + campos críticos)
      const formData = form.getValues();

      // Validação rápida de campos críticos
      const criticalFields = {
        owner: ["name", "email", "phone"],
        store: [
          "name",
          "slug",
          "category",
          "street",
          "number",
          "city",
          "state",
        ],
        menu: ["menuCategory", "products"],
      };

      let hasCriticalError = false;
      let errorMessage = "";

      // Check owner
      for (const field of criticalFields.owner) {
        if (!formData.owner?.[field]?.toString().trim()) {
          hasCriticalError = true;
          errorMessage = `Dono: ${field} é obrigatório`;
          break;
        }
      }

      // Check store (se owner ok)
      if (!hasCriticalError) {
        for (const field of criticalFields.store) {
          if (!formData.store?.[field]?.toString().trim()) {
            hasCriticalError = true;
            errorMessage = `Estabelecimento: ${field} é obrigatório`;
            break;
          }
        }
      }

      // Check menu (se store ok)
      if (!hasCriticalError) {
        if (!formData.menu?.menuCategory?.filter((c) => c.trim()).length) {
          hasCriticalError = true;
          errorMessage = "Adicione pelo menos uma categoria no cardápio";
        } else if (!formData.menu?.products?.length) {
          hasCriticalError = true;
          errorMessage = "Adicione pelo menos um produto";
        }
      }

      if (hasCriticalError) {
        throw new Error(errorMessage);
      }

      // 2. Validação Zod para os tipos de dados
      try {
        await formSchema.parseAsync(formData);
      } catch (zodError) {
        console.warn("Aviso Zod:", zodError.errors?.[0]?.message);
        // Continua mesmo com warnings do Zod se os críticos estão ok
      }

      // 3. ENVIO PARA API
      console.log("🚀 Enviando dados validados...");

      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "demo-token"}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Tratamento de erros específicos
        if (result.code === "DUPLICATE_ENTRY") {
          if (result.error.includes("Link único")) {
            form.setError("store.slug", {
              type: "manual",
              message: "Este link já está em uso. Escolha outro.",
            });
            setCurrentStep(2); // Volta para step do estabelecimento
          }
        }

        throw new Error(
          result.error || `Erro ${response.status}: ${response.statusText}`,
        );
      }

      // 4. SUCESSO!
      clearStorage();

      // Mostra modal de sucesso
      setSuccessData({
        restaurantName: result.data.restaurantName,
        restaurantSlug: result.data.restaurantSlug,
        dashboardUrl: result.data.dashboardUrl,
        publicUrl: result.data.publicUrl,
        nextSteps: result.nextSteps,
      });

      // 5. Log para debug
      console.log("✅ Cadastro realizado!", result);
    } catch (error) {
      console.error("❌ Erro no cadastro:", error);

      // Define erro no estado
      setError(error.message);

      // Scroll para topo
      window.scrollTo({ top: 0, behavior: "smooth" });
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

      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                🎉 Parabéns!
              </h3>
              <p className="mb-6 text-gray-600">
                <strong>{successData.storeName}</strong> foi cadastrado com
                sucesso!
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Seu link público:
                  </p>
                  <p className="mt-1 text-green-600">
                    seuapp.com/store/{successData.publicUrl}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://seuapp.com/store/${successData.publicUrl}`,
                      );
                      alert("Link copiado!");
                    }}
                  >
                    📋 Copiar Link
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      window.location.href = successData.dashboardUrl;
                    }}
                  >
                    📊 Ir para Dashboard
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    🏠 Página Inicial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
