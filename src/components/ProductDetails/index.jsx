"use client";

import LogoImage from "@/components/LogoImage";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../../app/contexts/cart";
import ProductDescription from "../ProductDescription";
import AddToBagButton from "../AddToBagButton";

const ProductDetails = ({ product, restaurant, secondProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const displayProduct = secondProduct
    ? {
        ...product,
        name: `${product.name} + ${secondProduct.name}`,
        price: Math.max(
          Number(product.price ?? 0),
          Number(secondProduct.price ?? 0),
        ),
        composite: [product, secondProduct],
      }
    : product;

  const handleAddToCart = () => {
    addToCart(displayProduct, quantity);
  };
  return (
    <section className="">
      <div className="relative -top-5 z-50 rounded-t-3xl bg-white px-4">
        <div className="pt-4">
          <div className="flex items-center gap-2">
            <LogoImage
              restaurant={restaurant}
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-sm text-muted-foreground">{restaurant.name}</p>
          </div>
          <p className="text-lg font-semibold">{displayProduct.name}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-green-500">
            {formatCurrency(displayProduct.price)}
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
      <div className="flex-auto">
        <ProductDescription product={displayProduct} />
      </div>
      <AddToBagButton product={displayProduct} quantity={quantity} />
    </section>
  );
};

export default ProductDetails;
