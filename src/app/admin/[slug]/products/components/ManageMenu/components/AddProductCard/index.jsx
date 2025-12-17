import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const AddProductCard = ({
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  handleAddProduct,
}) => {
  return (
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
  );
};

export default AddProductCard;
