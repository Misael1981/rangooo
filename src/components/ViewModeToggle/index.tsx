"use client";

import { Button } from "../ui/button";

type ViewModeToggleProps = {
  viewMode: string;
  setViewMode: (mode: "single" | "double") => void;
};

const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  const isSingle = String(viewMode) === "single";
  const isDouble = String(viewMode) === "double";

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-center text-sm font-medium text-green-500">
          Você pode escolher até dois sabores
        </span>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="w-32"
            variant={isSingle ? "default" : "secondary"}
            onClick={() => setViewMode("single")}
          >
            1 sabor
          </Button>
          <Button
            className="w-32"
            variant={isDouble ? "default" : "secondary"}
            onClick={() => setViewMode("double")}
          >
            2 sabores
          </Button>
        </div>
      </div>
    </>
  );
};

export default ViewModeToggle;
