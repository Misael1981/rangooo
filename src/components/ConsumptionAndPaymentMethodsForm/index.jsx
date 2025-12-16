"use client";

import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ConsumptionMethods = ["DELIVERY", "PICKUP", "DINE_IN"];
const PaymentMethods = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "PIX",
  "CASH",
  "MEAL_VOUCHER",
  "FOOD_VOUCHER",
  "ONLINE",
  "BANK_TRANSFER",
];

const methodsSchema = z.object({
  consumptionMethods: z.array(z.enum(ConsumptionMethods)),
  paymentMethods: z.array(z.enum(PaymentMethods)),
});

const ConsumptionAndPaymentMethodsForm = ({
  paymentMethods,
  consumptionMethods,
  restaurantId,
}) => {
  const defaultConsumptionMethods = useMemo(
    () => consumptionMethods?.map((item) => item.method) || [],
    [consumptionMethods],
  );

  const defaultPaymentMethods = useMemo(
    () => paymentMethods?.map((item) => item.method) || [],
    [paymentMethods],
  );

  const form = useForm({
    resolver: zodResolver(methodsSchema),
  });

  useEffect(() => {
    form.reset({
      consumptionMethods: defaultConsumptionMethods,
      paymentMethods: defaultPaymentMethods,
    });
  }, [defaultConsumptionMethods, defaultPaymentMethods, form]);

  const onSubmit = async (data) => {
    form.setValue("isSubmitting", true);

    const payload = {
      methods: data.consumptionMethods,
      paymentMethods: data.paymentMethods,
      restaurantId: restaurantId,
    };

    try {
      const response = await fetch("/api/admin/methods", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Falha ao atualizar");
      }

      toast.success("Métodos atualizados com sucesso!");
    } catch (error) {
      console.error("Erro:", error);

      // Mostrar erro para o usuário
      form.setError("root", {
        type: "manual",
        message: error.message,
      });
    } finally {
      form.setValue("isSubmitting", false);
    }
  };

  return (
    <section className="flex w-full justify-center">
      <div className="w-fit rounded-lg bg-white p-6 shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
              {/* Métodos de Consumo */}
              <FormField
                control={form.control}
                name="consumptionMethods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Métodos de Consumo
                    </FormLabel>
                    <div className="mt-3 space-y-2">
                      {[
                        { value: "DINE_IN", label: "Comer no local" },
                        { value: "PICKUP", label: "Pegar no local" },
                        { value: "DELIVERY", label: "Entrega" },
                      ].map((opt) => {
                        const checked =
                          Array.isArray(field.value) &&
                          field.value.includes(opt.value);
                        return (
                          <div
                            key={opt.value}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              id={opt.value}
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                const prev = Array.isArray(field.value)
                                  ? field.value
                                  : [];
                                field.onChange(
                                  isChecked
                                    ? [...prev, opt.value]
                                    : prev.filter((v) => v !== opt.value),
                                );
                              }}
                            />
                            <Label htmlFor={opt.value}>{opt.label}</Label>
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Métodos de Pagamento */}
              <FormField
                control={form.control}
                name="paymentMethods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Métodos de Pagamento
                    </FormLabel>
                    <div className="mt-3 space-y-2">
                      {[
                        { value: "CREDIT_CARD", label: "Cartão de Crédito" },
                        { value: "DEBIT_CARD", label: "Cartão de Débito" },
                        { value: "PIX", label: "PIX" },
                        {
                          value: "BANK_TRANSFER",
                          label: "Transferência Bancária",
                        },
                        { value: "CASH", label: "Dinheiro" },
                      ].map((opt) => {
                        const checked =
                          Array.isArray(field.value) &&
                          field.value.includes(opt.value);
                        return (
                          <div
                            key={opt.value}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              id={opt.value}
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                const prev = Array.isArray(field.value)
                                  ? field.value
                                  : [];
                                field.onChange(
                                  isChecked
                                    ? [...prev, opt.value]
                                    : prev.filter((v) => v !== opt.value),
                                );
                              }}
                            />
                            <Label htmlFor={opt.value}>{opt.label}</Label>
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ConsumptionAndPaymentMethodsForm;
