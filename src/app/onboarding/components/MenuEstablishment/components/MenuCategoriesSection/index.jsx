import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

const MenuCategoriesSection = ({
  control,
  categoryFields,
  removeCategory,
  appendCategory,
}) => {
  const { watch } = useFormContext();

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div>
        <Label className="text-lg font-semibold">Categorias do Cardápio</Label>
        <p className="text-sm text-gray-500">
          Crie as categorias que vão organizar seus produtos (ex: Pizzas,
          Bebidas, Sobremesas)
        </p>
      </div>

      <div className="space-y-3">
        {categoryFields.map((f, index) => (
          <FormField
            key={f.id}
            control={control}
            name={`menu.menuCategory.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Categoria ${index + 1}`}
                      {...field}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        // Remove a categoria e todos os ingredientes vinculados a ela
                        removeCategory(index);

                        // Atualiza produtos que usavam essa categoria
                        const products = watch("menu.products") || [];
                        products.forEach((_, prodIndex) => {
                          const prodCat = watch(
                            `menu.products.${prodIndex}.category`,
                          );
                          if (prodCat === field.value) {
                            form.setValue(
                              `menu.products.${prodIndex}.category`,
                              "",
                            );
                          }
                        });
                      }}
                      className="h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => appendCategory("")}
        className="w-full border-dashed"
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Nova Categoria
      </Button>
    </div>
  );
};

export default MenuCategoriesSection;
