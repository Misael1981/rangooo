"use client";

import { Button } from "@/components/ui/button";

const ViewModeToggle = ({ value = "single", onChange }) => {
  const isSingle = String(value) === "single";
  const isDouble = String(value) === "double";
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-center text-sm font-medium text-green-500">
        Você pode escolher até dois sabores
      </span>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="w-32 border border-yellow-500"
          variant={isSingle ? "default" : "outline"}
          aria-pressed={isSingle}
          onClick={() => onChange?.("single")}
        >
          1 sabor
        </Button>
        <Button
          className="w-32 border border-yellow-500"
          variant={isDouble ? "default" : "outline"}
          aria-pressed={isDouble}
          onClick={() => onChange?.("double")}
        >
          2 sabores
        </Button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
