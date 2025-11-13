"use client";

import { Button } from "@/components/ui/button";

const ViewModeToggle = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-center text-sm font-medium text-green-500">
        Você pode escolher até dois sabores
      </span>
      <div className="flex items-center justify-center gap-4">
        <Button className="w-32 border border-yellow-500" variant="default">
          1 sabor
        </Button>
        <Button className="w-32 border border-yellow-500" variant="outline">
          2 sabores
        </Button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
