"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderImage = ({ image, alt }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <header className="relative min-h-[332px] w-full">
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
    </header>
  );
};

export default HeaderImage;
