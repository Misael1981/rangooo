"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import ProductCard from "./components/ProductCard";
import AdditionalIngredientCard from "./components/AdditionalIngredientCard";

const MenuEstablishment = () => {
  const form = useFormContext();
  const { control, watch } = form;

  const { uploadToCloudinary } = useImageUpload();

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "menu.menuCategory",
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "menu.products",
  });

  const {
    fields: addIngFields,
    append: appendAddIng,
    remove: removeAddIng,
  } = useFieldArray({
    control,
    name: "menu.additionalIngredients",
  });

  const categories = watch("menu.menuCategory") || [];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="border-b-2 border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Cardápio</h2>
        <p className="text-sm text-gray-500">
          Configure as categorias, produtos e ingredientes extras do seu
          cardápio
        </p>
      </div>

      {/* SEÇÃO 1: CATEGORIAS */}
      <div className="space-y-4 rounded-lg border p-6">
        <div>
          <Label className="text-lg font-semibold">
            Categorias do Cardápio
          </Label>
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

      {/* SEÇÃO 2: PRODUTOS */}
      <div className="space-y-6 rounded-lg border p-6">
        <div>
          <Label className="text-lg font-semibold">Produtos</Label>
          <p className="text-sm text-gray-500">
            Adicione os produtos em suas respectivas categorias
          </p>
        </div>

        {productFields.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">
              Adicione categorias primeiro, depois seus produtos
            </p>
          </div>
        )}

        {productFields.map((pf, index) => (
          <ProductCard
            key={pf.id}
            index={index}
            form={form}
            control={control}
            categories={categories}
            removeProduct={removeProduct}
            uploadToCloudinary={uploadToCloudinary}
          />
        ))}

        {categories.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendProduct({
                name: "",
                description: "",
                price: 0,
                category: categories[0],
                imageUrl: "",
                ingredients: [""],
              })
            }
            className="w-full border-dashed"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Novo Produto
          </Button>
        )}
      </div>

      {/* SEÇÃO 3: INGREDIENTES ADICIONAIS (POR CATEGORIA) */}
      <div className="space-y-6 rounded-lg border p-6">
        <div>
          <Label className="text-lg font-semibold">Ingredientes Extras</Label>
          <p className="text-sm text-gray-500">
            Configure ingredientes que podem ser adicionados aos produtos de
            categorias específicas
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Ex: "Bacon Extra" pode ser adicionado a pizzas e hambúrgueres
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-lg bg-yellow-50 p-4 text-center">
            <p className="text-yellow-700">
              Adicione categorias primeiro para configurar ingredientes extras
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {addIngFields.map((af, index) => (
                <AdditionalIngredientCard
                  key={af.id}
                  index={index}
                  control={control}
                  categories={categories}
                  removeAddIng={removeAddIng}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendAddIng({
                  name: "",
                  price: 0,
                  categories: [],
                })
              }
              className="w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Novo Ingrediente Extra
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuEstablishment;
