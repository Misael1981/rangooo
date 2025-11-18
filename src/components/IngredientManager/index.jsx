"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { formatCurrency } from "@/helpers/format-currency";
import { Separator } from "../ui/separator";

const IngredientManager = ({ ingredients, title, selected = [], onChange }) => {
  const keyOf = (ing) => (ing?.id ?? ing?.name ?? String(ing));
  const [selectedKeys, setSelectedKeys] = useState(
    Array.isArray(selected) ? selected.map(keyOf) : [],
  );

  const toggle = (item) => {
    const key = keyOf(item);
    const exists = selectedKeys.includes(key);
    const nextKeys = exists
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key];
    setSelectedKeys(nextKeys);
    if (typeof onChange === "function") {
      const nextItems = ingredients.filter((ing) => nextKeys.includes(keyOf(ing)));
      onChange(nextItems);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[90%] max-w-[500px] justify-between border border-gray-500"
          >
            {title}
            <CirclePlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border border-orange-500 p-0">
          <Command className="w-full max-w-[500px] bg-gray-100">
            <CommandInput placeholder="Digite o ingrediente..." />
            <CommandEmpty>Nenhum ingrediente encontrado.</CommandEmpty>
            <Separator className="bg-orange-500" />
            <CommandList>
              <CommandGroup>
                {ingredients.map((ingredient, index) => {
                  const key = keyOf(ingredient);
                  const checked = selectedKeys.includes(key);
                  return (
                    <CommandItem
                      key={index}
                      className="flex items-center justify-between"
                      onSelect={() => toggle(ingredient)}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={key}
                          checked={checked}
                          onCheckedChange={() => toggle(ingredient)}
                        />
                        <Label htmlFor={key} className="text-base">
                          {ingredient.name ?? String(ingredient)}
                        </Label>
                      </div>
                      {title === "Adicionar Ingrediente" && (
                        <div className="text-green-600">
                          {formatCurrency(Number(ingredient.price ?? 0))}
                        </div>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IngredientManager;
