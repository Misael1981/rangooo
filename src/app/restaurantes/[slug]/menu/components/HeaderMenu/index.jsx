"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderMenu = ({ image, alt }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="relative h-[250px] w-full">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-20 rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <Image src={image} alt={alt} fill className="object-cover" />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-20 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default HeaderMenu;
