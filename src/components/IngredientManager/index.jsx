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

const IngredientManager = ({ ingredients, title }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[90%] max-w-[500px] justify-between border border-gray-500"
          >
            {title}
            <CirclePlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border border-orange-500 p-0">
          <Command className="w-full max-w-[500px] bg-red-50">
            <CommandInput placeholder="Digite o ingrediente..." />
            <CommandEmpty>Nenhum ingrediente encontrado.</CommandEmpty>
            <Separator className="bg-orange-500" />
            <CommandList>
              <CommandGroup>
                {ingredients.map((ingredient, index) => (
                  <CommandItem
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox id={ingredient.name} />
                      <Label htmlFor={ingredient.name} className="text-base">
                        {ingredient.name}
                      </Label>
                    </div>
                    {title === "Adicionar Ingrediente" && (
                      <div className="text-green-600">
                        {formatCurrency(ingredient.price)}
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IngredientManager;
