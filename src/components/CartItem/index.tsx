import { ManageableIngredient } from "@/dtos/cart.dto";
import { formatCurrency } from "@/helpers/format-currency";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { CartContext } from "@/contexts/cart-context";
import { useContext } from "react";

type CartItemProps = {
  product: {
    lineId: string;
    productId: string;
    name: string;
    imageUrl: string | null;
    price: number;
    quantity: number;
    extras: ManageableIngredient[];
    removedIngredients?: string[];
    isDouble?: boolean;
    flavor2?: {
      id: string;
      name: string;
      removedIngredients?: string[];
    };
  };
};

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className=" rounded-md border border-gray-300 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20">
            <Image
              src={product.imageUrl || "/no-image.png"}
              alt={product.name}
              fill
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="space-y-1">
            <h3 className="max-w-[90%] truncate text-ellipsis text-xs font-semibold">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-green-500">
              {formatCurrency(Number(product.price ?? 0))}
            </p>

            <div className="flex items-center gap-2 text-center">
              <Button
                className="h-7 w-7"
                variant="outline"
                onClick={() => decreaseProductQuantity(product.lineId)}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-8 text-sm font-semibold">{product.quantity}</p>
              <Button
                className="h-7 w-7"
                variant="default"
                onClick={() => increaseProductQuantity(product.lineId)}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <Button
          className="h-7 w-7"
          variant="destructive"
          onClick={() => removeProduct(product.lineId)}
        >
          <TrashIcon />
        </Button>
      </div>
      <div className="mt-2">
        {Array.isArray(product.extras) && product.extras.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Extras: {product.extras.map((e) => e.name).join(", ")}
          </p>
        )}
        {Array.isArray(product.removedIngredients) &&
          product.removedIngredients.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Retirar Ingredientes:{" "}
              {product.removedIngredients.map((e) => e).join(", ")}
            </p>
          )}
      </div>
    </div>
  );
};

export default CartItem;
