"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderInfosPage = ({ title }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <header className="flex items-center gap-2 bg-red-600 p-4">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </header>
  );
};

export default HeaderInfosPage;
