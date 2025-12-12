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

const { Button } = require("@/components/ui/button");
const {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} = require("@/components/ui/form");
const { Input } = require("@/components/ui/input");
const { Trash2, Plus } = require("lucide-react");

const ProductCard = ({
  index,
  form,
  control,
  categories,
  removeProduct,
  uploadToCloudinary,
}) => {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Produto {index + 1}</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeProduct(index)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </div>

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
                  {categories.map((cat, catIndex) => (
                    <SelectItem key={catIndex} value={cat}>
                      {cat || `Categoria ${catIndex + 1}`}
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
              <FormLabel>Imagem do Produto (Opcional)</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={async (file) => {
                    try {
                      const url = await uploadToCloudinary(file);
                      form.setValue(`menu.products.${index}.imageUrl`, url);
                    } catch (error) {
                      console.error("Erro no upload:", error);
                      form.setError(`menu.products.${index}.imageUrl`, {
                        type: "manual",
                        message: "Falha no upload da imagem",
                      });
                    }
                  }}
                  onRemove={() => {
                    form.setValue(`menu.products.${index}.imageUrl`, "");
                  }}
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
                placeholder="Descreva o produto de forma atrativa..."
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
                            form.watch(`menu.products.${index}.ingredients`) ||
                            [];
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
  );
};

export default ProductCard;
