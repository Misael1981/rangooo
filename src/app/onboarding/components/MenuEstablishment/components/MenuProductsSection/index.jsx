import { Label } from "@/components/ui/label";
import ProductCard from "../ProductCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const MenuProductsSection = ({
  categories,
  appendProduct,
  productFields,
  removeProduct,
}) => {
  const [openProductIndex, setOpenProductIndex] = useState(null);

  return (
    <section className="space-y-6 rounded-lg border p-6">
      <div>
        <Label className="text-lg font-semibold">Produtos</Label>
        <p className="text-sm text-gray-500">
          Adicione os produtos em suas respectivas categorias
        </p>
      </div>

      {productFields.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">
            Adicione categorias primeiro, depois seus produtos
          </p>
        </div>
      )}

      {productFields.map((pf, index) => (
        <ProductCard
          key={pf.id}
          index={index}
          categories={categories}
          removeProduct={removeProduct}
          isOpen={openProductIndex === index}
          onToggle={() =>
            setOpenProductIndex(openProductIndex === index ? null : index)
          }
        />
      ))}

      {categories.length > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendProduct({
              name: "",
              description: "",
              price: 0,
              category: categories[0],
              imageUrl: "",
              ingredients: [""],
            })
          }
          className="w-full border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo Produto
        </Button>
      )}
    </section>
  );
};

export default MenuProductsSection;
