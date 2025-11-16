"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { NotebookText } from "lucide-react";
import DialogDataUser from "./components/DialogDataUser";
import { useState } from "react";

const SheetUserMenuButton = ({ open, onOpenChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] overflow-auto p-4">
        <SheetHeader>
          <SheetTitle className="mb-6 text-left">
            Cantinho do usuário
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="mb-2 text-xl leading-none">
              Olá, <strong>faça seu login</strong>
            </h2>
            <p className="text-sm text-gray-500">
              Preencha o formulário, com seus dados corretamente, eles vão
              garantir que seu pedido chegue direitinho até você.
            </p>
            <p className="text-sm text-gray-500">
              Depois, é só se conectar com a sua rede preferida e aproveitar a
              experiência.
            </p>
          </div>
          <Button
            className="w-fit"
            variant="ghost"
            onClick={() => setDialogOpen(true)}
          >
            <NotebookText />
            Preencha os dados
          </Button>
          <DialogDataUser open={dialogOpen} onOpenChange={setDialogOpen} />
          <div className="flex w-full flex-col gap-2">
            <Button className="bg-[#d64131]">
              <FaGoogle />
              Entrar com Google
            </Button>
            <Button className="bg-[#3b5a9a]">
              <FaFacebookF />
              Entrar com Facebook
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetUserMenuButton;
