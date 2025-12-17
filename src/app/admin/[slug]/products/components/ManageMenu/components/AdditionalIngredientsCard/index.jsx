import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const mockIngredients = [
  { id: 1, name: "Queijo", price: 2.9 },
  { id: 2, name: "Tomate", price: 2.9 },
  { id: 3, name: "Cebola", price: 2.9 },
];

const AdditionalIngredientsCard = () => {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-semibold">Ingredientes Adicionais</h2>
          <p className="text-sm text-gray-500">
            Adicione e gerencie ingredientes extras referentes à tabela.
          </p>
        </div>
        <div className="w-full rounded-md border border-gray-200 p-2">
          <h3 className="text-md mb-4 font-semibold">Adicionar Ingredientes</h3>
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <Input placeholder="Nome do ingrediente" className="min-w-24" />
            <Input placeholder="Preço (R$)" className="min-w-24" />
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </div>
        <ol>
          {mockIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - R$ {ingredient.price.toFixed(2)}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default AdditionalIngredientsCard;
