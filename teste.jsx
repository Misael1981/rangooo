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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useFormContext } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import { useImageUpload } from "@/hooks/useImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, AlertCircle, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useMemo } from "react";

const MenuEstablishment = () => {
  const form = useFormContext();
  const { control, watch, setValue } = form;

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

  // Watch dos dados
  const categories = watch("menu.menuCategory") || [];
  const products = watch("menu.products") || [];
  const additionalIngredients = watch("menu.additionalIngredients") || [];

  // ⭐⭐ FILTRA APENAS CATEGORIAS VÁLIDAS (não vazias)
  const validCategories = useMemo(
    () => categories.filter((cat) => cat?.trim()),
    [categories],
  );

  // ⭐⭐ FUNÇÃO SEGURA PARA ADICIONAR PRODUTO
  const handleAddProduct = () => {
    if (validCategories.length === 0) {
      alert("Adicione pelo menos uma categoria antes de criar produtos.");
      return;
    }

    appendProduct({
      name: "",
      description: "",
      price: 0,
      category: validCategories[0], // ⭐ USA PRIMEIRA CATEGORIA VÁLIDA
      imageUrl: "",
      ingredients: [""],
    });
  };

  // ⭐⭐ FUNÇÃO SEGURA PARA REMOVER CATEGORIA
  const safeRemoveCategory = (index) => {
    const categoryToRemove = watch(`menu.menuCategory.${index}`);
    const remainingCategories = categories.filter((_, i) => i !== index);
    const remainingValidCategories = remainingCategories.filter((cat) =>
      cat?.trim(),
    );

    // 1. Remove a categoria
    removeCategory(index);

    // 2. Atualiza produtos que usavam essa categoria
    products.forEach((_, prodIndex) => {
      const prodCat = watch(`menu.products.${prodIndex}.category`);

      if (prodCat === categoryToRemove) {
        if (remainingValidCategories.length > 0) {
          // Redireciona para primeira categoria válida disponível
          setValue(
            `menu.products.${prodIndex}.category`,
            remainingValidCategories[0],
          );
        } else {
          // Limpa se não houver categorias válidas
          setValue(`menu.products.${prodIndex}.category`, "");
        }
      }
    });

    // 3. Remove ingredientes adicionais vinculados a essa categoria
    additionalIngredients.forEach((ing, ingIndex) => {
      const ingCategories = ing.categories || [];
      const updatedCategories = ingCategories.filter(
        (cat) => cat !== categoryToRemove,
      );

      if (updatedCategories.length !== ingCategories.length) {
        setValue(
          `menu.additionalIngredients.${ingIndex}.categories`,
          updatedCategories,
        );
      }
    });
  };

  // ⭐⭐ PREENCHE EXEMPLOS SE ESTIVER VAZIO (apenas em desenvolvimento)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (categories.length === 0 && productFields.length === 0) {
        const exampleCategories = ["🍕 Pizzas", "🥤 Bebidas", "🍰 Sobremesas"];
        exampleCategories.forEach((cat) => appendCategory(cat));

        // Adiciona um produto de exemplo
        setTimeout(() => {
          if (validCategories.length > 0) {
            appendProduct({
              name: "Pizza Margherita",
              description: "Molho de tomate, mussarela, manjericão fresco",
              price: 45.9,
              category: validCategories[0],
              imageUrl: "",
              ingredients: [
                "Massa fina",
                "Molho de tomate",
                "Mussarela",
                "Manjericão",
              ],
            });
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* SEÇÃO 1: CATEGORIAS (já corrigida anteriormente) */}
      <div className="space-y-4 rounded-lg border p-6">
        {/* ... código das categorias que já corrigimos ... */}
      </div>

      {/* ⭐⭐ SEÇÃO 2: PRODUTOS (VERSÃO CORRIGIDA) ⭐⭐ */}
      <div className="space-y-6 rounded-lg border p-6">
        <div>
          <Label className="text-lg font-semibold">Produtos</Label>
          <p className="text-sm text-gray-500">
            Adicione os produtos em suas respectivas categorias
          </p>

          {/* ⭐⭐ RESUMO ESTATÍSTICO */}
          {productFields.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="rounded-lg bg-blue-50 px-3 py-1">
                <span className="text-sm font-medium text-blue-700">
                  {productFields.length} produto
                  {productFields.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="rounded-lg bg-green-50 px-3 py-1">
                <span className="text-sm font-medium text-green-700">
                  {validCategories.length} categoria
                  {validCategories.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ⭐⭐ LISTA DE PRODUTOS */}
        {productFields.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Nenhum produto adicionado
            </h3>
            <p className="mx-auto mb-6 max-w-md text-gray-500">
              {validCategories.length === 0
                ? "Adicione categorias primeiro para começar a criar produtos."
                : "Comece adicionando seu primeiro produto à venda."}
            </p>

            {validCategories.length > 0 && (
              <Button
                type="button"
                onClick={handleAddProduct}
                className="min-w-[200px]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Produto
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* ⭐⭐ PRODUTOS EXISTENTES */}
            <div className="space-y-6">
              {productFields.map((pf, index) => (
                <ProductCard
                  key={pf.id}
                  index={index}
                  categories={validCategories} // ⭐ PASSA APENAS CATEGORIAS VÁLIDAS
                  removeProduct={removeProduct}
                />
              ))}
            </div>

            {/* ⭐⭐ BOTÃO PARA ADICIONAR MAIS PRODUTOS */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddProduct}
              className="w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Outro Produto
            </Button>
          </>
        )}
      </div>

      {/* SEÇÃO 3: INGREDIENTES ADICIONAIS */}
      {/* ... código dos ingredientes adicionais ... */}
    </div>
  );
};

// ⭐⭐ COMPONENTE PRODUCTCARD ATUALIZADO (sem receber `form` como prop)
const ProductCard = ({ index, categories, removeProduct }) => {
  const form = useFormContext(); // ⭐⭐ USA useContext EM VEZ DE PROP
  const { control, watch, setValue } = form;

  const { uploadToCloudinary } = useImageUpload();

  // Watch dos dados deste produto específico
  const productName = watch(`menu.products.${index}.name`);
  const productPrice = watch(`menu.products.${index}.price`);
  const productCategory = watch(`menu.products.${index}.category`);
  const productIngredients = watch(`menu.products.${index}.ingredients`) || [
    "",
  ];

  // ⭐⭐ VALIDA SE A CATEGORIA ATUAL É VÁLIDA
  const isValidCategory = categories.includes(productCategory);

  // ⭐⭐ LIDAR COM MUDANÇA DE PREÇO
  const handlePriceChange = (value) => {
    const numValue = parseFloat(value) || 0;
    setValue(`menu.products.${index}.price`, numValue);
  };

  // ⭐⭐ LIDAR COM INGREDIENTES
  const handleAddIngredient = () => {
    const current = productIngredients;
    setValue(`menu.products.${index}.ingredients`, [...current, ""]);
  };

  const handleRemoveIngredient = (ingIndex) => {
    const current = productIngredients;
    if (current.length > 1) {
      const updated = current.filter((_, i) => i !== ingIndex);
      setValue(`menu.products.${index}.ingredients`, updated);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* CABEÇALHO DO PRODUTO */}
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {productName || `Produto ${index + 1}`}
          </h3>
          {productPrice > 0 && (
            <p className="text-sm font-medium text-green-600">
              R$ {productPrice.toFixed(2)}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm(`Remover "${productName || "este produto"}"?`)) {
              removeProduct(index);
            }
          }}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </div>

      {/* CONTEÚDO DO PRODUTO */}
      <div className="space-y-4">
        {/* NOME E PREÇO */}
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      className="pl-10"
                      value={field.value || ""}
                      onChange={(e) => handlePriceChange(e.target.value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* CATEGORIA */}
        <FormField
          control={control}
          name={`menu.products.${index}.category`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria *</FormLabel>
              <Select
                value={field.value || ""}
                onValueChange={field.onChange}
                disabled={categories.length === 0}
              >
                <FormControl>
                  <SelectTrigger
                    className={
                      !isValidCategory ? "border-amber-300 bg-amber-50" : ""
                    }
                  >
                    <SelectValue
                      placeholder={
                        categories.length === 0
                          ? "Adicione categorias primeiro"
                          : "Selecione uma categoria"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat, catIndex) => (
                    <SelectItem key={catIndex} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}

                  {/* ⭐⭐ MOSTRA CATEGORIA ATUAL MESMO SE NÃO ESTIVER NA LISTA */}
                  {!isValidCategory && productCategory && (
                    <SelectItem
                      value={productCategory}
                      className="text-amber-600"
                    >
                      {productCategory} (não disponível)
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {/* ⭐⭐ AVISO SE CATEGORIA NÃO É VÁLIDA */}
              {!isValidCategory && productCategory && (
                <div className="mt-2 rounded bg-amber-50 p-2 text-sm text-amber-600">
                  ⚠️ Esta categoria não está mais disponível. Selecione uma
                  nova.
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIÇÃO */}
        <FormField
          control={control}
          name={`menu.products.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o produto de forma atrativa para seus clientes..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="mt-1 text-xs text-gray-500">Mínimo 10 caracteres</p>
            </FormItem>
          )}
        />

        {/* IMAGEM DO PRODUTO */}
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
                      setValue(`menu.products.${index}.imageUrl`, url);
                    } catch (error) {
                      console.error("Erro no upload:", error);
                    }
                  }}
                  onRemove={() => {
                    setValue(`menu.products.${index}.imageUrl`, "");
                  }}
                  maxSizeMB={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* INGREDIENTES */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel className="font-medium">Ingredientes *</FormLabel>
            <span className="text-sm text-gray-500">
              {productIngredients.filter((i) => i.trim()).length} ingrediente(s)
            </span>
          </div>

          <div className="space-y-2">
            {productIngredients.map((_, ingIndex) => (
              <div key={ingIndex} className="flex gap-2">
                <Input
                  value={productIngredients[ingIndex] || ""}
                  onChange={(e) => {
                    const updated = [...productIngredients];
                    updated[ingIndex] = e.target.value;
                    setValue(`menu.products.${index}.ingredients`, updated);
                  }}
                  placeholder={`Ingrediente ${ingIndex + 1}`}
                  className="flex-1"
                />

                {productIngredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveIngredient(ingIndex)}
                    className="h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={handleAddIngredient}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Ingrediente
          </Button>

          <p className="text-xs text-gray-500">
            💡 Liste os ingredientes principais que os clientes precisam saber.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuEstablishment;
