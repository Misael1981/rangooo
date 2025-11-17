"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import LoginScreen from "./components/LoginScreen";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../ui/button";
import { LogOutIcon, NotebookText, ScrollTextIcon } from "lucide-react";

const SheetUserMenuButton = ({ open, onOpenChange }) => {
  const { data } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] overflow-auto p-4">
        <SheetHeader>
          <SheetTitle className="mb-6 text-left text-red-700">
            Cantinho do usuário
          </SheetTitle>
        </SheetHeader>
        {data?.user ? (
          <div className="flex min-h-[90%] flex-col gap-4">
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={data?.user?.image}
                    alt={data?.user?.name}
                    width={6}
                    height={6}
                  />
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-xl leading-none">
                    Olá, <strong>{data.user.name}</strong>
                  </h2>
                  <p className="truncate leading-none text-gray-400">
                    <span className="text-sm capitalize">
                      {format(new Date(), "EEEE, dd", { locale: ptBR })}
                    </span>
                    <span className="text-sm">&nbsp;de&nbsp;</span>
                    <span className="text-sm capitalize">
                      {format(new Date(), "MMMM", { locale: ptBR })}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Seja bem-vindo(a) ao seu cantinho! Aqui você pode ver seus
                pedidos, acompanhar o status de entrega e fazer alterações em
                seus dados.
              </p>
            </section>
            <section className="flex flex-col gap-2">
              <Button className="w-fit" variant="secondary">
                <NotebookText />
                Editar meus Dados
              </Button>
              <Button className="w-fit" variant="secondary">
                <ScrollTextIcon />
                Meus Pedidos
              </Button>
            </section>
            <footer className="mt-auto">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOutIcon />
                Sair
              </Button>
            </footer>
          </div>
        ) : (
          <LoginScreen />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetUserMenuButton;
