"use client";

import { useEffect, useMemo, useState } from "react";
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
import AddProductCard from "./components/AddProductCard";
import ProductListCard from "./components/ProductListCard";
import AdditionalIngredientsCard from "./components/AdditionalIngredientsCard";

const ManageMenu = ({ products = [] }) => {
  // Categorias com contagem de produtos
  const categories = useMemo(() => {
    const categoryMap = new Map();
    const productCountMap = new Map();

    // Contar produtos por categoria
    products?.forEach((p) => {
      const categoryId = p?.menuCategory?.id;
      if (categoryId) {
        productCountMap.set(
          categoryId,
          (productCountMap.get(categoryId) || 0) + 1,
        );
      }
    });

    // Criar array de categorias
    products?.forEach((p) => {
      const category = p?.menuCategory;
      if (category?.id && !categoryMap.has(category.id)) {
        categoryMap.set(category.id, {
          id: category.id,
          name: category.name,
          productCount: productCountMap.get(category.id) || 0,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [products]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [viewMode, setViewMode] = useState("list");

  // Seleciona primeira categoria por padrão
  useEffect(() => {
    if (!selectedCategoryId && categories[0]?.id) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // Produtos filtrados pela categoria selecionada
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return [];
    return (products || []).filter(
      (p) => p?.menuCategory?.id === selectedCategoryId,
    );
  }, [products, selectedCategoryId]);

  // Handlers
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      // Aqui você integraria com a API
      console.log("Adicionar categoria:", newCategoryName);
      setNewCategoryName("");
    }
  };

  const handleAddProduct = () => {
    if (newProductName.trim() && newProductPrice) {
      // Aqui você integraria com a API
      console.log("Adicionar produto:", newProductName, newProductPrice);
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  const handleDeleteCategory = (categoryId) => {
    // Aqui você integraria com a API
    console.log("Deletar categoria:", categoryId);
  };

  const handleDeleteProduct = (productId) => {
    // Aqui você integraria com a API
    console.log("Deletar produto:", productId);
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
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                handleAddCategory={handleAddCategory}
                handleDeleteCategory={handleDeleteCategory}
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
            <AdditionalIngredientsCard />

            {/* Adicionar Produto */}
            <AddProductCard
              newProductName={newProductName}
              setNewProductName={setNewProductName}
              newProductPrice={newProductPrice}
              setNewProductPrice={setNewProductPrice}
              handleAddProduct={handleAddProduct}
            />

            {/* Lista de Produtos */}
            <ProductListCard
              viewMode={viewMode}
              filteredProducts={filteredProducts}
              handleDeleteProduct={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
