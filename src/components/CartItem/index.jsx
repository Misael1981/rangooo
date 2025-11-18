"use client";

import { CartContext } from "@/app/contexts/cart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

const CartItem = ({ product }) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            objectFit="contain"
          />
        </div>
        <div className="space-y-1">
          <h3 className="max-w-[90%] truncate text-ellipsis text-xs font-semibold">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-green-500">
            {formatCurrency(Number(product.price ?? 0))}
          </p>
          {Array.isArray(product.extras) && product.extras.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Extras: {product.extras.map((e) => e.name).join(", ")}
            </p>
          )}
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
  );
};

export default CartItem;
