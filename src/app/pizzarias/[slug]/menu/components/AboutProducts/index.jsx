import IngredientManager from "@/components/IngredientManager";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PiChefHatLight } from "react-icons/pi";

const ingredientsAdd = [
  {
    name: "Calabresa",
    price: 2.9,
  },
  {
    name: "Cebola",
    price: 3.9,
  },
  {
    name: "Catupiry",
    price: 3.9,
  },
  {
    name: "Milho",
    price: 3.9,
  },
  {
    name: "Bacon",
    price: 3.9,
  },
];

const AboutProducts = ({ product, secondProduct }) => {
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
              ingredients={ingredientsAdd}
              title="Adicionar Ingrediente"
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
              ingredients={ingredientsAdd}
              title="Adicionar Ingrediente"
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
