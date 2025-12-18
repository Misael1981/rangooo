import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/helpers/format-currency";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  List,
  MoreVertical,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState, useTransition } from "react";
import DialogProduct from "../DialogProduct";
import { toast } from "sonner";
import { deleteProduct } from "@/app/actions/admin/products";

const ProductListCard = ({
  selectedCategory,
  filteredProducts = [],
  viewMode = "grid",
}) => {
  const [showList, setShowList] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenDialogForEdit = (product) => {
    setProductToEdit(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Produto removido!");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Produtos</span>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Produto
          </Button>
        </CardTitle>
        <DialogProduct
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setProductToEdit(null);
          }}
          product={productToEdit}
          selectedCategory={selectedCategory}
        />
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
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowList(!showList)}
                className="flex items-center gap-2 transition-transform duration-200"
              >
                {showList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showList
                  ? "Ocultar Lista"
                  : `Ver Lista (${filteredProducts.length})`}
              </Button>
            </div>
            {showList &&
              (viewMode === "list" ? (
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialogForEdit(product)}
                            >
                              <Edit className="mr-2 h-3 w-3" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
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
                      <Card key={product.id} className="group overflow-hidden">
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
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
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleOpenDialogForEdit(product)
                                    }
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDelete(product.id)}
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialogForEdit(product)}
                            >
                              Detalhes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductListCard;
