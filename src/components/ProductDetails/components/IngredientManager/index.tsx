"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/helpers/format-currency";
import { ManageableIngredient } from "@/dtos/cart.dto";

type IngredientManagerProps = {
  ingredients: ManageableIngredient[];
  title: string;
  selected?: ManageableIngredient[];
  onChange?: (items: ManageableIngredient[]) => void;
  onChangeDelete?: (items: string[]) => void;
};

const IngredientManager = ({
  ingredients,
  title,
  selected = [],
  onChange,
  onChangeDelete,
}: IngredientManagerProps) => {
  const keyOf = (ing: ManageableIngredient) => ing.id ?? ing.name;

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    selected.map(keyOf),
  );

  const toggle = (item: ManageableIngredient) => {
    const key = keyOf(item);
    const exists = selectedKeys.includes(key);

    const nextKeys = exists
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key];

    setSelectedKeys(nextKeys);

    if (onChange) {
      const nextItems = ingredients.filter((ing) =>
        nextKeys.includes(keyOf(ing)),
      );
      onChange(nextItems);
    }

    if (onChangeDelete) {
      onChangeDelete(nextKeys);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[90%] justify-between border border-gray-500"
          >
            {title}
            <CirclePlus className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-75 p-0 border border-orange-500">
          <Command className="bg-gray-100">
            <CommandInput placeholder="Digite o ingrediente..." />
            <CommandEmpty>Nenhum ingrediente encontrado.</CommandEmpty>
            <Separator className="bg-orange-500" />
            <CommandList>
              <CommandGroup>
                {ingredients.map((ingredient) => {
                  const key = keyOf(ingredient);
                  const isChecked = selectedKeys.includes(key);

                  return (
                    <CommandItem
                      key={key}
                      onSelect={() => toggle(ingredient)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox checked={isChecked} />
                        <Label className="text-base cursor-pointer">
                          {ingredient.name}
                        </Label>
                      </div>

                      {/* Lógica condicional segura para o preço */}
                      {ingredient.price !== undefined &&
                        ingredient.price > 0 && (
                          <div className="text-sm font-semibold text-green-600">
                            + {formatCurrency(ingredient.price)}
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
