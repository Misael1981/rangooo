"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NavigationButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full"
      onClick={handleBack}
    >
      <ChevronLeftIcon className="h-6 w-6" />
    </Button>
  );
};

export default NavigationButton;
