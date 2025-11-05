"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

const CategoriesProducts = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <ScrollArea className="w-full px-4">
      <div className="flex w-max items-center gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory.id === category.id ? "default" : "secondary"
            }
            size="sm"
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoriesProducts;
