"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderOrders = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex w-full items-center gap-2 bg-red-600 py-4 text-white">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="h-6 w-6" />
        <span className="text-lg font-bold">Voltar</span>
      </Button>
    </div>
  );
};

export default HeaderOrders;
