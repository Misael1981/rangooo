"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type QuantitySelectorProps = {
  price: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const QuantitySelector = ({
  price,
  quantity,
  setQuantity,
}: QuantitySelectorProps) => {
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <div className="flex items-center justify-between">
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
  );
};

export default QuantitySelector;
