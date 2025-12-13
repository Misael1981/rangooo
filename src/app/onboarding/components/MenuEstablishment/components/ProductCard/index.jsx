import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "../../../ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { useImageUpload } from "@/app/hooks/useImageUpload";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCard = ({
  index,
  categories,
  removeProduct,
  isOpen,
  onToggle,
}) => {
  const form = useFormContext();
  const { control, watch } = form;

  const { uploadToCloudinary } = useImageUpload();

  const validCategories = categories.filter(
    (cat) => typeof cat === "string" && cat.trim() !== "",
  );

  const productName =
    watch(`menu.products.${index}.name`) || `Produto ${index + 1}`;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <span className="font-semibold">{productName}</span>
          {!isOpen && (
            <span className="text-xs text-gray-500">Clique para editar</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              removeProduct(index);
            }}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remover
          </Button>

          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </div>

      {/* CONTEÚDO COLAPSÁVEL */}
      {isOpen && (
        <div className="space-y-4 border-t p-4">
          {/* Nome e Preço */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`menu.products.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Pizza Margherita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`menu.products.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
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

          {/* Categoria e Imagem */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`menu.products.${index}.category`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {validCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`menu.products.${index}.imageUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem do Produto</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={async (file) => {
                        const url = await uploadToCloudinary(file);
                        form.setValue(`menu.products.${index}.imageUrl`, url);
                      }}
                      onRemove={() =>
                        form.setValue(`menu.products.${index}.imageUrl`, "")
                      }
                      maxSizeMB={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descrição */}
          <FormField
            control={control}
            name={`menu.products.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva o produto..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ingredientes */}
          <div className="space-y-3">
            {/* Usamos Label simples aqui porque este rótulo não está dentro de um FormField/FormItem */}
            <Label className="block text-sm font-medium">
              Ingredientes Principais *
            </Label>

            {(form.watch(`menu.products.${index}.ingredients`) || [""]).map(
              (_, ingIdx) => (
                <FormField
                  key={`ing-${index}-${ingIdx}`}
                  control={control}
                  name={`menu.products.${index}.ingredients.${ingIdx}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder={`Ingrediente ${ingIdx + 1}`}
                            {...field}
                            className="flex-1"
                          />
                        </FormControl>
                        {ingIdx > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const current =
                                form.watch(
                                  `menu.products.${index}.ingredients`,
                                ) || [];
                              const updated = current.filter(
                                (_, i) => i !== ingIdx,
                              );
                              form.setValue(
                                `menu.products.${index}.ingredients`,
                                updated,
                              );
                            }}
                            className="h-10 w-10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ),
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const current =
                  form.watch(`menu.products.${index}.ingredients`) || [];
                form.setValue(`menu.products.${index}.ingredients`, [
                  ...current,
                  "",
                ]);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Ingrediente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
