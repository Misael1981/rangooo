import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const MenuEstablishment = ({ form }) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuCategory",
  });
  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });
  const {
    fields: addIngFields,
    append: appendAddIng,
    remove: removeAddIng,
  } = useFieldArray({
    control,
    name: "additionalIngredients",
  });
  const categories = form.watch("menuCategory") || [];

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          Cardápio
        </h2>
      </div>
      {/* Categoria do Cardápio */}

      <div className="space-y-4">
        <Label>Categorias do Cardápio</Label>
        <p className="text-sm text-gray-500">
          Crie tabelas para agrupar os itens do cardápio. Serão exibidas no app
          do cliente.
        </p>

        {fields.map((f, index) => (
          <FormField
            key={f.id}
            control={control}
            name={`menuCategory.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="Ex: Pizzas, Bebidas..." {...field} />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                    >
                      Remover
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="button" onClick={() => append("")}>
          Adicionar Categoria
        </Button>
      </div>
      {/* Produtos */}
      <div className="space-y-4">
        <Label>Produtos</Label>
        {productFields.map((pf, index) => (
          <div key={pf.id} className="space-y-3 rounded-md border p-3">
            <div className="flex gap-2">
              <FormField
                control={control}
                name={`products.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`products.${index}.price`}
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Preço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Ingredientes */}
            {(() => {
              const ing = form.watch(`products.${index}.ingredients`) || [];
              return (
                <div className="space-y-2">
                  <Label>Ingredientes</Label>
                  {ing.map((_, ingIdx) => (
                    <FormField
                      key={`ing-${pf.id}-${ingIdx}`}
                      control={control}
                      name={`products.${index}.ingredients.${ingIdx}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Ingrediente" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const cur =
                          form.getValues(`products.${index}.ingredients`) || [];
                        form.setValue(`products.${index}.ingredients`, [
                          ...cur,
                          "",
                        ]);
                      }}
                    >
                      Adicionar Ingrediente
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        const cur =
                          form.getValues(`products.${index}.ingredients`) || [];
                        if (cur.length > 0) {
                          form.setValue(
                            `products.${index}.ingredients`,
                            cur.slice(0, -1),
                          );
                        }
                      }}
                    >
                      Remover Ingrediente
                    </Button>
                  </div>
                </div>
              );
            })()}
            {/* Imagem do Produto */}
            <div className="min-w-[200px] flex-1">
              <FormField
                control={form.control}
                name={`products.${index}.imageUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem do Produto</FormLabel>
                    <FormControl>
                      <ImageUpload
                        field={field}
                        onChange={async (file) => {
                          const url = await uploadImageToCloudinary(file);
                          form.setValue(`products.${index}.imageUrl`, url ?? "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Descrição do Produto */}
            <FormField
              control={control}
              name={`products.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Descrição do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeProduct(index)}
              >
                Remover produto
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendProduct({
              name: "",
              description: "",
              price: 0,
              category: "",
              imageUrl: "",
              ingredients: [""],
            })
          }
        >
          Adicionar Produto
        </Button>
      </div>

      {/* Ingredientes adicionais */}
      <div className="space-y-4">
        <Label>Ingredientes adicionais (aplicados a todas as categorias)</Label>
        {addIngFields.map((af, index) => (
          <div key={af.id} className="flex gap-2">
            <FormField
              control={control}
              name={`additionalIngredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Nome do ingrediente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`additionalIngredients.${index}.price`}
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Preço"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeAddIng(index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendAddIng({ name: "", price: 0 })}
        >
          Adicionar Ingrediente Adicional
        </Button>
      </div>
    </div>
  );
};

export default MenuEstablishment;
