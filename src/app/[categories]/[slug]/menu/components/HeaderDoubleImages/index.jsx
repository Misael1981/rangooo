"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/contexts/cart";
import { useContext } from "react";

const HeaderDoubleImages = ({ imageUrl1, imageUrl2, alt1, alt2 }) => {
  const { toggleCart } = useContext(CartContext);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleCartClick = () => {
    toggleCart();
  };
  return (
    <div className="relative h-[332px] w-full">
      <div className="relative flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="relative h-[332px] min-w-[90%] shrink-0 snap-center">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
          <Image src={imageUrl1} alt={alt1} fill className="object-cover" />
        </div>
        <div className="relative h-[332px] min-w-[90%] shrink-0 snap-center">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
          <Image src={imageUrl2} alt={alt2} fill className="object-cover" />
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-20 rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-20 rounded-full"
        onClick={handleCartClick}
      >
        <ShoppingCart />
      </Button>
    </div>
  );
};

export default HeaderDoubleImages;
