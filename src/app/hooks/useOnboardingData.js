// hooks/useOnboardingForm.js
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, defaultValues } from "@/app/schemas/form-schema";

export const useOnboardingForm = () => {
  const STORAGE_KEY = "onboarding_form_data";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  // 1. CARREGAR dados do localStorage ao iniciar
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
      }
    }
  }, [form]);

  // 2. SALVAR dados automaticamente no localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 3. Função para validar step atual
  const validateCurrentStep = async (step) => {
    try {
      const fieldsToValidate = getStepFields(step);

      // IMPORTANTE: Remove validações assíncronas temporariamente
      const isValid = await form.trigger(fieldsToValidate, {
        shouldFocus: true,
      });

      if (isValid) {
        console.log(`Step ${step} validado com sucesso!`);
        return true;
      }

      // Encontra e foca no primeiro erro
      const errors = form.formState.errors;
      const firstErrorKey = Object.keys(errors)[0];

      if (firstErrorKey) {
        const element = document.querySelector(`[name="${firstErrorKey}"]`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          element.focus();
        }
      }

      return false;
    } catch (error) {
      console.error("Erro na validação:", error);
      alert("Erro ao validar formulário. Verifique os campos.");
      return false;
    }
  };

  // 4. Função para ir para próximo step
  const goToNextStep = async (currentStep, setCurrentStep) => {
    const isValid = await validateCurrentStep(currentStep);

    if (isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mostra erro no primeiro campo inválido
      const errors = form.formState.errors;
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        element?.scrollIntoView({ behavior: "smooth" });
        element?.focus();
      }
    }
  };

  return {
    form,
    validateCurrentStep,
    goToNextStep,
    // Função para limpar dados
    clearStorage: () => {
      localStorage.removeItem(STORAGE_KEY);
      for (let i = 1; i <= 4; i++) {
        localStorage.removeItem(`${STORAGE_KEY}_step_${i}_valid`);
      }
      form.reset(defaultValues);
    },
  };
};

// Helper: Define quais campos pertencem a cada step
const getStepFields = (step) => {
  switch (step) {
    case 1:
      return ["owner.name", "owner.phone", "owner.email"];
    case 2:
      return [
        "store.name",
        "store.slug",
        "store.category",
        "store.street",
        "store.number",
        "store.city",
        "store.state",
        "store.zipCode",
        "store.neighborhood",
        "store.contacts",
        "store.description",
      ];
    case 3:
      return ["menu.menuCategory", "menu.products"];
    default:
      return [];
  }
};
