"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  User,
  CheckCircle,
  BookOpenCheck,
} from "lucide-react";
import OwnerData from "../OwnerData";
import EstablishmentData from "../EstablishmentData";
import MenuEstablishment from "../MenuEstablishment";
import Confirmation from "../Confirmation";
import HeaderForm from "../HeaderForm";
import ProgressSteps from "../ProgressSteps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { formSchema, defaultValues } from "@/app/schemas/form-schema";

export default function OnboardingClient({ token }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log({ data, token });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = form.getValues();
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha no cadastro");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Dados do Dono", icon: User },
    { number: 2, title: "Dados da Estabelecimento", icon: Building },
    { number: 3, title: "Cardápio", icon: BookOpenCheck },
    { number: 4, title: "Confirmação", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <HeaderForm />
        <ProgressSteps steps={steps} currentStep={currentStep} />
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 1 && <OwnerData form={form} />}
                {currentStep === 2 && <EstablishmentData form={form} />}
                {currentStep === 3 && <MenuEstablishment form={form} />}
                {currentStep === 4 && <Confirmation form={form} />}

                <div className="flex justify-between border-t border-gray-200 pt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={currentStep === 1 || isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      disabled={isLoading}
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
