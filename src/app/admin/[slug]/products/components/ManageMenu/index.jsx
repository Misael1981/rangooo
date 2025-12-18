"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuTables from "../MenuTables";
import SelectedCategoryHeader from "./components/SelectedCategoryHeader";
import ProductListCard from "./components/ProductListCard";
import AdditionalIngredientsCard from "./components/AdditionalIngredientsCard";
import { createCategory, deleteCategory } from "@/app/actions/admin/categories";
import { toast } from "sonner";

const ManageMenu = ({ initialCategories = [], restaurantId }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategories[0]?.id,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    const selected = categories.find((c) => c.id === selectedCategoryId);
    return selected?.products || [];
  }, [categories, selectedCategoryId]);

  // Seleciona primeira categoria por padrão
  useEffect(() => {
    if (!selectedCategoryId && categories[0]?.id) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // Handlers

  // Adiciona nova categoria
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    // startTransition avisa ao React que isso é uma mudança de dados
    startTransition(async () => {
      const result = await createCategory({
        name: newCategoryName,
        restaurantId,
      });

      if (result.success) {
        setNewCategoryName("");
        toast.success("Categoria adicionada com sucesso!");
      } else {
        console.error(result.error);
        toast.error("Erro ao adicionar categoria!");
      }
    });
  };

  const handleDeleteCategory = (categoryId) => {
    if (
      !confirm(
        "Tem certeza? Todos os produtos desta categoria serão excluídos!",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        toast.success("Categoria excluída com sucesso!");
        setCategories(categories.filter((c) => c.id !== categoryId));
        if (selectedCategoryId === categoryId) {
          setSelectedCategoryId(null);
        }
      } else {
        toast.error(result.error);
      }
    });
  };

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar - Tabelas */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Tabelas</span>
                <Badge variant="secondary">{categories.length}</Badge>
              </CardTitle>
              <CardDescription>Clique para gerenciar produtos</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <MenuTables
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                handleAddCategory={handleAddCategory}
                handleDeleteCategory={handleDeleteCategory}
                categories={categories}
              />
            </CardContent>
          </Card>

          {/* Conteúdo Principal - Produtos */}
          <div className="space-y-6 lg:col-span-3">
            {/* Header da Categoria Selecionada */}
            {selectedCategory && (
              <SelectedCategoryHeader
                title={selectedCategory.name}
                viewMode={viewMode}
                handleViewModeChange={handleViewModeChange}
              />
            )}

            {/* Card de Gerenciamento de Ingredientes Adicionais */}
            <AdditionalIngredientsCard selectedCategory={selectedCategory} />

            {/* Lista de Produtos */}
            {selectedCategory && (
              <ProductListCard
                selectedCategory={selectedCategory}
                viewMode={viewMode}
                filteredProducts={filteredProducts}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
