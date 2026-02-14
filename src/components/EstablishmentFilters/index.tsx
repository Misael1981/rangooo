"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { categoriesWithAll } from "@/helpers/filter-restaurant-categories";

type EstablishmentFiltersProps = {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  buttons?: { value: string; label: string; link: string }[];
};

const EstablishmentFilters = ({
  buttons,
  onSelectCategory,
  selectedCategory,
}: EstablishmentFiltersProps) => {
  const items = buttons?.length ? buttons : categoriesWithAll;
  const selected = selectedCategory ?? "ALL";
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {items.map((button) => {
          const isActive = button.value === selected;
          const variant = isActive ? "default" : "ghost";

          if (onSelectCategory) {
            return (
              <Button
                key={button.label}
                variant={variant}
                className={isActive ? "" : "border border-white"}
                onClick={() => onSelectCategory(button.value)}
                aria-pressed={isActive}
              >
                {button.label}
              </Button>
            );
          }

          return (
            <Link key={button.label} href={button.link}>
              <Button
                variant={variant}
                className={isActive ? "" : "border border-white"}
                aria-pressed={isActive}
              >
                {button.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default EstablishmentFilters;
