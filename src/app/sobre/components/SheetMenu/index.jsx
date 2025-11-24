"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavMenu from "../NavMenu";

const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-orange-300 hover:shadow-lg active:scale-95 lg:hidden">
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 transition-transform duration-1000 group-hover:translate-x-[100%]" />

          <Menu className="relative z-10 h-6 w-6 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-700" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rangooo</SheetTitle>
          <SheetDescription>
            A plataforma Rangooo é uma ferramenta que ajuda você a gerenciar
            seus projetos de forma eficiente e organizada.
          </SheetDescription>
        </SheetHeader>
        <NavMenu />
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
