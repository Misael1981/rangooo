import { useState } from "react";
import IngredientManager from "@/components/IngredientManager";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PiChefHatLight } from "react-icons/pi";

const AboutProducts = ({
  product,
  secondProduct,
  additionalIngredients,
  onExtrasChange,
}) => {
  const [extrasSelected, setExtrasSelected] = useState([]);
  const [extras1, setExtras1] = useState([]);
  const [extras2, setExtras2] = useState([]);

  const updateAllExtras = (newExtras1, newExtras2) => {
    const combined = [
      ...newExtras1.map((item) => ({ ...item, half: "1ª Metade" })),
      ...newExtras2.map((item) => ({ ...item, half: "2ª Metade" })),
    ];
    if (typeof onExtrasChange === "function") onExtrasChange(combined);
  };

  return (
    <ScrollArea className="flex h-[350px] flex-col gap-4 bg-white pb-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <PiChefHatLight />
        Sobre os Produtos
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-md font-bold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <ul className="list-inside list-disc">
            {product.ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {ingredient}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <IngredientManager
              ingredients={additionalIngredients}
              title="Adicionar Ingrediente"
              selected={extras1}
              onChange={(items) => {
                setExtras1(items);
                updateAllExtras(items, extras2);
              }}
            />
            <IngredientManager
              ingredients={product.ingredients?.map((i) => ({ name: i })) ?? []}
              title="Retirar Ingrediente"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-md font-bold">{secondProduct.name}</h3>
          <p className="text-sm text-muted-foreground">
            {secondProduct.description}
          </p>
          <ul className="list-inside list-disc">
            {secondProduct.ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {ingredient}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <IngredientManager
              ingredients={additionalIngredients}
              title="Adicionar Ingrediente"
              selected={extras2}
              onChange={(items) => {
                setExtras2(items);
                updateAllExtras(extras1, items);
              }}
            />
            <IngredientManager
              ingredients={
                secondProduct.ingredients?.map((i) => ({ name: i })) ?? []
              }
              title="Retirar Ingrediente"
            />
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default AboutProducts;
