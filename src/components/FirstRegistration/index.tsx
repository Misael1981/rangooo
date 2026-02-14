"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { finalSchema, OnboardingFormValues } from "@/schemas/login-schema";
import StepIndicator from "./components/StepIndicator";
import StepPersonal from "./components/StepPersonal";
import StepAddress from "./components/StepAddress";
import StepReference from "./components/StepReference";
import StepNavigation from "./components/StepNavigation";
import { stepFields, steps } from "@/helpers/login-steps";
import { useRouter } from "next/navigation";
import { completeRegistration } from "@/app/action/complete-registration";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type FirstRegistrationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FirstRegistration({
  open,
  onOpenChange,
}: FirstRegistrationProps) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(finalSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      areaType: "URBAN",
      complement: "",
      reference: "",
    },
    mode: "onTouched",
  });

  const nextStep = async () => {
    const valid = await form.trigger(stepFields[step]);

    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      const result = await completeRegistration(data);

      if (result.success) {
        toast.success("Cadastro finalizado! Bem-vindo ao Rangooo.");

        await update();

        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-fit sm:h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          <DialogDescription>{steps[step].description}</DialogDescription>
        </DialogHeader>
        <StepIndicator step={step} total={steps.length} />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 0 && <StepPersonal />}
            {step === 1 && <StepAddress />}
            {step === 2 && <StepReference />}
            <DialogFooter>
              <StepNavigation
                step={step}
                total={steps.length}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
