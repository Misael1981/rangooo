"use client";

import LogoImage from "@/app/restaurantes/[slug]/components/LogoImage";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const ProductDetails = ({ product, restaurant }) => {
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <section className="relative">
      <div className="absolute -top-5 left-0 right-0 z-50 rounded-t-3xl bg-white/90 p-4">
        <div>
          <div className="flex items-center gap-2">
            <LogoImage
              restaurant={restaurant}
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-sm text-muted-foreground">{restaurant.name}</p>
          </div>
          <p className="text-lg font-semibold">{product.name}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-green-500">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
