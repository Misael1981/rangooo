import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import {
  createAdditionalIngredient,
  deleteIngredient,
  updateAdditionalIngredient,
} from "@/app/actions/admin/ingredients";
import { formatCurrency } from "@/helpers/format-currency";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdditionalIngredientsCard = ({ selectedCategory }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showList, setShowList] = useState(false);
  const [isPending, startTransition] = useTransition();

  const ingredients = selectedCategory?.additionalIngredients || [];

  const handleSave = () => {
    if (!name.trim() || !price) return;

    startTransition(async () => {
      let result;
      if (editingId) {
        // Se tem ID, chama UPDATE
        result = await updateAdditionalIngredient({
          ingredientId: editingId,
          name,
          price,
        });
      } else {
        // Se não tem, chama CREATE
        result = await createAdditionalIngredient({
          name,
          price,
          menuCategoryId: selectedCategory.id,
        });
      }

      if (result.success) {
        setName("");
        setPrice("");
        setEditingId(null);
        toast.success(editingId ? "Atualizado!" : "Adicionado!");
      }
    });
  };

  const handleEditClick = (ing) => {
    setEditingId(ing.id);
    setName(ing.name);
    setPrice(ing.price.toString());
    // Aqui o foco vai para o input automaticamente (opcional)
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setPrice("");
  };

  const handleDelete = async (ingredientId) => {
    if (
      !confirm(
        "Tem certeza? Este adicional será excluído de todos os produtos!",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteIngredient(ingredientId);

      if (result.success) {
        toast.success("Adicional excluído com sucesso!");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Adicionais: {selectedCategory?.name}
            </h2>
            <p className="text-sm text-gray-500">
              Disponíveis para todos os produtos desta categoria.
            </p>
          </div>
          <Badge variant="ghost">{ingredients.length}</Badge>
        </div>

        <div className="rounded-md border border-dashed bg-gray-50/50 p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isPending}>
                {editingId ? "Atualizar" : "Adicionar"}
              </Button>
              {editingId && (
                <Button variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-2 transition-transform duration-200"
          >
            {showList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showList ? "Ocultar Lista" : `Ver Lista (${ingredients.length})`}
          </Button>
        </div>

        {showList && (
          <ul className="mt-4 divide-y border-t transition-all animate-in fade-in slide-in-from-top-2">
            {ingredients.map((ing) => (
              <li
                key={ing.id}
                className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md"
              >
                <span className="font-medium text-gray-700">{ing.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-green-600">
                    {formatCurrency(ing.price)}
                  </span>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(ing)}
                    >
                      <Edit className="mr-2 h-3 w-3" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(ing.id)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Remover
                    </Button>
                  </div>
                </div>
              </li>
            ))}

            {ingredients.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-400">
                Nenhum adicional cadastrado.
              </p>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AdditionalIngredientsCard;
