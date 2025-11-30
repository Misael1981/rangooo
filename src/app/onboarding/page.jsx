// app/onboarding/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  User,
  Pizza,
  CheckCircle,
} from "lucide-react";
import OwnerData from "./components/OwnerData";
import EstablishmentData from "./components/EstablishmentData";
import MenuEstablishment from "./components/MenuEstablishment";
import Confirmation from "./components/Confirmation";
import HeaderForm from "./components/HeaderForm";
import ProgressSteps from "./components/ProgressSteps";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const CategoryUi = [
  "restaurant",
  "pizzaria",
  "hamburgueria",
  "sorveteria",
  "acai",
  "saudavel",
  "doces",
];

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
  phone: z
    .string({ required_error: "Campo obrigatório." })
    .min(10, { message: "Campo obrigatório." }),
  email: z
    .string({ required_error: "Campo obrigatório." })
    .email({ message: "Email inválido." }),
  establishmentName: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
  slogan: z
    .string({ required_error: "Campo obrigatório." })
    .min(10, { message: "Mínimo de 10 caracteres." })
    .max(25, { message: "Máximo de 25 caracteres." }),
  category: z.enum(CategoryUi, { required_error: "Selecione uma categoria" }),
  emailEstablishment: z
    .string({ required_error: "Campo obrigatório." })
    .email({ message: "Email inválido." }),
  contacts: z
    .array(z.string().min(1, "Contato é obrigatório"))
    .min(1, "Pelo menos um contato é necessário"),
  socialMedia: z.object({
    facebook: z.string().url({ message: "URL inválida" }).optional(),
    instagram: z.string().url({ message: "URL inválida" }).optional(),
  }),
  street: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
  number: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
  complement: z.string().optional(),
  city: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
  state: z.string().min(2, {
    message: "Campo obrigatório.",
  }),
});

const OnboardingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      establishmentName: "",
      slogan: "",
      category: "",
      emailEstablishment: "",
      contacts: [""],
      socialMedia: {
        facebook: "",
        instagram: "",
      },
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Submissão final
  const handleSubmit = async () => {
    console.log("Handle Submit");
  };

  // Steps do formulário
  const steps = [
    { number: 1, title: "Dados do Dono", icon: User },
    { number: 2, title: "Dados da Pizzaria", icon: Building },
    { number: 3, title: "Cardápio", icon: Pizza },
    { number: 4, title: "Confirmação", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* HeaderForm */}
        <HeaderForm />

        {/* ProgressSteps */}
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Dados do Dono */}
                {currentStep === 1 && <OwnerData form={form} />}

                {/* Step 2: Dados da Pizzaria */}
                {currentStep === 2 && <EstablishmentData form={form} />}

                {/* Step 3: Cardápio */}
                {currentStep === 3 && <MenuEstablishment />}

                {/* Step 4: Confirmação */}
                {currentStep === 4 && <Confirmation />}

                {/* Navigation Buttons */}
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
};

export default OnboardingPage;
