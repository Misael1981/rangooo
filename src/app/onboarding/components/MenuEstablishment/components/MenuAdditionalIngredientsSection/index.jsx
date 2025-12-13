import { Label } from "@/components/ui/label";
import AdditionalIngredientCard from "../AdditionalIngredientCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MenuAdditionalIngredientsSection = ({
  categories,
  addIngFields,
  removeAddIng,
  appendAddIng,
}) => {
  return (
    <section className="space-y-6 rounded-lg border p-6">
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
    </section>
  );
};

export default MenuAdditionalIngredientsSection;
