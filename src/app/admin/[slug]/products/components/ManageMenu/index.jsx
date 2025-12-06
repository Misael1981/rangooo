"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Edit,
  MoreVertical,
  ChevronRight,
  Grid,
  List,
  PlusCircle,
} from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                    <p className="text-sm text-gray-500">
                      Nenhuma tabela criada
                    </p>
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
            </CardContent>
          </Card>

          {/* Conteúdo Principal - Produtos */}
          <div className="space-y-6 lg:col-span-3">
            {/* Header da Categoria Selecionada */}
            {selectedCategory && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedCategory.name}
                      </CardTitle>
                      <CardDescription>
                        Gerencie os produtos desta tabela
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List size={16} />
                      </Button>
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Adicionar Produto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Adicionar Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Nome do produto"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                  <Input
                    placeholder="Preço (R$)"
                    type="number"
                    step="0.01"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                  />
                  <Button
                    onClick={handleAddProduct}
                    disabled={!newProductName.trim() || !newProductPrice}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Produtos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Produtos</span>
                  <Badge variant="secondary">{filteredProducts.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredProducts.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <List className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      Nenhum produto
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Adicione produtos a esta tabela
                    </p>
                  </div>
                ) : viewMode === "list" ? (
                  // Vista em Lista
                  <div className="space-y-3">
                    {filteredProducts.map((product) => {
                      const price = Number(product.price ?? 0);
                      return (
                        <div
                          key={product.id}
                          className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                              <span className="text-sm font-semibold text-primary">
                                {product.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                {product.menuCategory?.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(price)}
                            </span>
                            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-3 w-3" />
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Vista em Grid
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => {
                      const price = Number(product.price ?? 0);
                      return (
                        <Card
                          key={product.id}
                          className="group overflow-hidden"
                        >
                          <CardContent className="p-4">
                            <div className="mb-3 flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {product.menuCategory?.name}
                                </p>
                              </div>
                              <div className="opacity-0 transition-opacity group-hover:opacity-100">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <MoreVertical size={14} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                              <span className="text-xl font-bold text-gray-900">
                                {formatCurrency(price)}
                              </span>
                              <Button variant="outline" size="sm">
                                Detalhes
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
