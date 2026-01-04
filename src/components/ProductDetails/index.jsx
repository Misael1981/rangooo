"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import AddToBagButton from "../AddToBagButton";
import { CartContext } from "@/app/contexts/cart";
import ProductDescription from "../ProductDescription";
import Image from "next/image";

const ProductDetails = ({
  product,
  additionalIngredients,
  isOpen,
  deliveryFee,
  consumptionMethods,
  avatarImageUrl,
  restaurantName,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const { addToCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const { name, price } = product;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <section className="relative">
      <div className="relative -top-5 z-50 rounded-t-3xl bg-white px-4">
        <div className="pt-4">
          <div className="flex items-center gap-2">
            <Image
              src={avatarImageUrl}
              alt={restaurantName}
              width={24}
              height={24}
              className="rounded-lg"
            />
            <p className="text-sm text-muted-foreground">{restaurantName}</p>
          </div>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-green-500">
            {formatCurrency(price)}
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
        <ProductDescription
          product={product}
          additionalIngredients={additionalIngredients}
          onExtrasChange={setExtras}
        />
      </div>
      <AddToBagButton
        product={product}
        quantity={quantity}
        extras={extras}
        isOpen={isOpen}
        deliveryFee={deliveryFee}
        consumptionMethods={consumptionMethods}
      />
    </section>
  );
};

export default ProductDetails;
