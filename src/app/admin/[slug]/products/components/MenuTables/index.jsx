import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Edit,
  Grid,
  MoreVertical,
  PlusCircle,
  Trash2,
} from "lucide-react";

const MenuTables = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
  handleDeleteCategory,
}) => {
  return (
    <>
      {/* Lista de Tabelas */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`group relative flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all ${
              selectedCategoryId === category.id
                ? "border border-primary/20 bg-primary/10"
                : "border border-transparent hover:bg-gray-50"
            }`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  selectedCategoryId === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Grid size={16} />
              </div>
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-gray-500">
                  {category.productCount} produto(s)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <ChevronRight
                size={16}
                className={
                  selectedCategoryId === category.id
                    ? "text-primary"
                    : "text-gray-400"
                }
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Renomear
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
            <p className="text-sm text-gray-500">Nenhuma tabela criada</p>
          </div>
        )}
      </div>

      {/* Adicionar Nova Tabela */}
      <div className="border-t pt-4">
        <div className="mb-3 space-y-2">
          <Input
            placeholder="Nome da nova tabela"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleAddCategory}
            disabled={!newCategoryName.trim()}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tabela
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuTables;
