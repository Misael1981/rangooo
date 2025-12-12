"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // ✅ CORREÇÃO AQUI!
import { Checkbox } from "@/components/ui/checkbox"; // ✅ Adicionar esta importação
import { Trash2 } from "lucide-react";

const AdditionalIngredientCard = ({
  index,
  control,
  categories,
  removeAddIng,
}) => {
  // Não use control._formValues diretamente - use watch do useFormContext
  // Mas para simplificar, vamos ajustar o código:

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <FormField
              control={control}
              name={`menu.additionalIngredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Ingrediente *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Bacon Extra, Queijo Extra"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`menu.additionalIngredients.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Adicional (R$) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="mb-2 block">Aplicar às Categorias *</Label>
            <p className="mb-2 text-sm text-gray-500">
              Selecione em quais categorias este ingrediente estará disponível
            </p>

            <FormField
              control={control}
              name={`menu.additionalIngredients.${index}.categories`}
              render={({ field }) => {
                const selectedCategories = field.value || [];

                return (
                  <FormItem>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <div
                            key={cat}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`ing-${index}-${cat}`}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, cat]);
                                } else {
                                  field.onChange(
                                    current.filter((c) => c !== cat),
                                  );
                                }
                              }}
                            />
                            <Label
                              htmlFor={`ing-${index}-${cat}`}
                              className="cursor-pointer text-sm font-normal"
                            >
                              {cat}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removeAddIng(index)}
          className="ml-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Preview das categorias selecionadas */}
      <FormField
        control={control}
        name={`menu.additionalIngredients.${index}.categories`}
        render={({ field }) => {
          const selectedCategories = field.value || [];

          return selectedCategories.length > 0 ? (
            <div className="rounded bg-blue-50 p-2">
              <p className="text-xs text-blue-700">
                Disponível em: {selectedCategories.join(", ")}
              </p>
            </div>
          ) : null;
        }}
      />
    </div>
  );
};

export default AdditionalIngredientCard;
