"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PiChefHatLight } from "react-icons/pi";
import IngredientManager from "../IngredientManager";

const ingredientsAdd = [
  {
    name: "Ingrediente 1",
    price: 2.9,
  },
  {
    name: "Ingrediente 2",
    price: 3.9,
  },
  {
    name: "Ingrediente 3",
    price: 3.9,
  },
  {
    name: "Ingrediente 4",
    price: 3.9,
  },
  {
    name: "Ingrediente 5",
    price: 3.9,
  },
];

const ProductDescription = ({ product }) => {
  return (
    <ScrollArea className="max-h-[calc(100vh-220px)] overflow-auto">
      <section className="space-y-6 bg-white px-4 pb-16">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sobre</h3>
          <p className="text-sm opacity-55">{product.description}</p>
        </div>
        <div className="space-y-2">
          <h3 className="flex items-center text-lg font-semibold">
            <PiChefHatLight className="mr-2" />
            Ingredientes
          </h3>
          <ul className="list-inside list-disc text-sm opacity-55">
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <IngredientManager
              ingredients={ingredientsAdd}
              title="Adicionar Ingrediente"
            />
            <IngredientManager
              ingredients={product.ingredients?.map((i) => ({ name: i })) ?? []}
              title="Retirar Ingrediente"
            />
          </div>
        </div>
      </section>
    </ScrollArea>
  );
};

export default ProductDescription;
