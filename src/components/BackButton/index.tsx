"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute left-4 top-4 z-20 rounded-full"
      onClick={handleBack}
    >
      <ChevronLeftIcon />
    </Button>
  );
};

export default BackButton;
