"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import MenuHeader from "./components/MenuHeader";
import MenuCategoriesSection from "./components/MenuCategoriesSection";
import MenuProductsSection from "./components/MenuProductsSection";
import MenuAdditionalIngredientsSection from "./components/MenuAdditionalIngredientsSection";

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
      <MenuHeader />

      {/* SEÇÃO 1: CATEGORIAS */}
      <MenuCategoriesSection
        control={control}
        categoryFields={categoryFields}
        removeCategory={removeCategory}
        appendCategory={appendCategory}
      />

      {/* SEÇÃO 2: INGREDIENTES ADICIONAIS (POR CATEGORIA) */}
      <MenuAdditionalIngredientsSection
        categories={categories}
        addIngFields={addIngFields}
        removeAddIng={removeAddIng}
        appendAddIng={appendAddIng}
      />

      {/* SEÇÃO 3: PRODUTOS */}
      <MenuProductsSection
        categories={categories}
        productFields={productFields}
        removeProduct={removeProduct}
        appendProduct={appendProduct}
      />
    </div>
  );
};

export default MenuEstablishment;
