"use client";

import {
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, UtensilsCrossed, Coffee, Moon } from "lucide-react";

const OpeningHours = ({ form }) => {
  const days = [
    { index: 0, name: "Domingo" },
    { index: 1, name: "Segunda-feira" },
    { index: 2, name: "Terça-feira" },
    { index: 3, name: "Quarta-feira" },
    { index: 4, name: "Quinta-feira" },
    { index: 5, name: "Sexta-feira" },
    { index: 6, name: "Sábado" },
  ];

  const slotTypes = [
    { value: "BREAKFAST", label: "Café da Manhã", icon: Coffee },
    { value: "LUNCH", label: "Almoço", icon: UtensilsCrossed },
    { value: "DINNER", label: "Jantar", icon: Moon },
    { value: "SPECIAL", label: "Especial", icon: UtensilsCrossed },
  ];

  const getSlotIcon = (type) => {
    const slotType = slotTypes.find((t) => t.value === type);
    const Icon = slotType?.icon || UtensilsCrossed;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Horários de Funcionamento
        </h3>
        <p className="text-sm text-gray-600">
          Configure os horários para cada dia da semana. Adicione múltiplos
          períodos se necessário.
        </p>
      </div>

      {days.map(({ index, name }) => {
        const slots = form.watch(`businessHours.${index}.timeSlots`) || [];
        const isClosed = form.watch(`businessHours.${index}.isClosed`) || false;

        return (
          <div
            key={index}
            className="space-y-3 rounded-lg border border-gray-200 bg-white p-4"
          >
            {/* Header do dia */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">{name}</h4>
                {!isClosed && slots.length > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {slots.length} período{slots.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <FormField
                control={form.control}
                name={`businessHours.${index}.isClosed`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <Checkbox
                      id={`closed-${index}`}
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label
                      htmlFor={`closed-${index}`}
                      className="cursor-pointer text-sm"
                    >
                      Fechado
                    </Label>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isClosed && (
              <div className="space-y-3">
                {/* Lista de períodos */}
                {slots.map((slot, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 rounded-md bg-gray-50 p-3"
                  >
                    {/* Tipo do período */}
                    <div className="w-40">
                      <FormField
                        control={form.control}
                        name={`businessHours.${index}.timeSlots.${j}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              value={field.value || "LUNCH"}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-10">
                                <div className="flex items-center gap-2">
                                  {getSlotIcon(field.value)}
                                  <SelectValue placeholder="Tipo" />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {slotTypes.map((type) => {
                                  const Icon = type.icon;
                                  return (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        {type.label}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Horários */}
                    <div className="flex flex-1 items-center gap-2">
                      <div className="w-32">
                        <FormField
                          control={form.control}
                          name={`businessHours.${index}.timeSlots.${j}.open`}
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                type="time"
                                {...field}
                                className="h-10"
                                placeholder="Abertura"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <span className="text-gray-500">até</span>

                      <div className="w-32">
                        <FormField
                          control={form.control}
                          name={`businessHours.${index}.timeSlots.${j}.close`}
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                type="time"
                                {...field}
                                className="h-10"
                                placeholder="Fechamento"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Botão remover */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const cur =
                            form.getValues(
                              `businessHours.${index}.timeSlots`,
                            ) || [];
                          form.setValue(
                            `businessHours.${index}.timeSlots`,
                            cur.filter((_, k) => k !== j),
                          );
                        }}
                        className="h-10 w-10 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Botão adicionar período */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const cur =
                      form.getValues(`businessHours.${index}.timeSlots`) || [];
                    form.setValue(`businessHours.${index}.timeSlots`, [
                      ...cur,
                      {
                        type: cur.length === 0 ? "LUNCH" : "DINNER",
                        open: "",
                        close: "",
                      },
                    ]);
                  }}
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar período
                </Button>

                {/* Exemplos rápidos */}
                {slots.length === 0 && (
                  <div className="text-sm text-gray-500">
                    <p className="mb-1">Exemplos comuns:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          type: "LUNCH",
                          label: "Só almoço",
                          open: "11:30",
                          close: "14:30",
                        },
                        {
                          type: "DINNER",
                          label: "Só janta",
                          open: "18:00",
                          close: "23:00",
                        },
                        {
                          type: "LUNCH",
                          label: "Almoço e Janta",
                          open: "11:30",
                          close: "14:30",
                        },
                        {
                          type: "DINNER",
                          label: "",
                          open: "18:00",
                          close: "23:00",
                        },
                      ].map((example, idx) => (
                        <Button
                          key={idx}
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            const slots =
                              form.getValues(
                                `businessHours.${index}.timeSlots`,
                              ) || [];
                            if (idx === 2) {
                              // Almoço e Janta
                              form.setValue(
                                `businessHours.${index}.timeSlots`,
                                [
                                  {
                                    type: "LUNCH",
                                    open: "11:30",
                                    close: "14:30",
                                  },
                                  {
                                    type: "DINNER",
                                    open: "18:00",
                                    close: "23:00",
                                  },
                                ],
                              );
                            } else {
                              // Período único
                              form.setValue(
                                `businessHours.${index}.timeSlots`,
                                [
                                  {
                                    type: example.type,
                                    open: example.open,
                                    close: example.close,
                                  },
                                ],
                              );
                            }
                          }}
                        >
                          {example.label ||
                            `${example.open} às ${example.close}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Resumo do dia */}
            {!isClosed && slots.length > 0 && (
              <div className="border-t border-gray-100 pt-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Horários configurados:</span>
                  {slots.map((slot, idx) => (
                    <span
                      key={idx}
                      className="ml-2 inline-flex items-center gap-1"
                    >
                      {getSlotIcon(slot.type)}
                      {slot.open && slot.close
                        ? `${slot.open} às ${slot.close}`
                        : "Horário incompleto"}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Legenda dos tipos */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="mb-2 text-sm font-medium text-gray-900">
          Legenda dos períodos:
        </p>
        <div className="flex flex-wrap gap-4">
          {slotTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.value} className="flex items-center gap-2">
                <div className="rounded bg-white p-1">
                  <Icon className="h-3 w-3 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600">{type.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
