"use client";

import { AdditionalIngredientDTO } from "@/dtos/establishment-menu-data.dto";
import { PiChefHatLight } from "react-icons/pi";
import IngredientManager from "../IngredientManager";
import { UtensilsCrossed } from "lucide-react";
import { ManageableIngredient } from "@/dtos/cart.dto";

type DescriptionProductProps = {
  title?: string | null;
  descriptionProduct: string | null;
  ingredients: string[];
  additionalIngredients: AdditionalIngredientDTO[];
  onExtrasChange?: (items: ManageableIngredient[]) => void;
  onRemovedIngredientsChange?: (items: string[]) => void;
};

const DescriptionProduct = ({
  title,
  descriptionProduct,
  additionalIngredients,
  ingredients,
  onExtrasChange,
  onRemovedIngredientsChange,
}: DescriptionProductProps) => {
  return (
    <section className="space-y-6 bg-white">
      <div className="space-y-2">
        <h3 className="flex items-center text-lg font-semibold">
          <UtensilsCrossed className="mr-2" />
          Sobre o Produto
        </h3>
        {title && <h4 className="text-base">{title}</h4>}
        <p className="text-sm opacity-55">{descriptionProduct}</p>
      </div>
      <div className="space-y-2">
        <h3 className="flex items-center text-lg font-semibold">
          <PiChefHatLight className="mr-2" />
          Ingredientes
        </h3>

        <ul className="list-inside list-disc text-sm opacity-55">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <div className="flex flex-col items-center justify-center gap-4 p-4 pb-8">
          <IngredientManager
            title="Adicionar ingrediente"
            ingredients={additionalIngredients}
            onChange={onExtrasChange}
          />
          <IngredientManager
            title="Retirar ingrediente"
            ingredients={ingredients.map((name) => ({ name }))}
            onChangeDelete={onRemovedIngredientsChange}
          />
        </div>
      </div>
    </section>
  );
};

export default DescriptionProduct;
