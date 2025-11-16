"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import SheetUserMenuButton from "../SheetUserMenuButton";

const UserMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  return (
    <div>
      <Button
        onClick={() => handleOpenChange(!isOpen)}
        className="bg-red-500/80"
      >
        <EllipsisVertical />
      </Button>
      <SheetUserMenuButton open={isOpen} onOpenChange={handleOpenChange} />
    </div>
  );
};

export default UserMenuButton;
