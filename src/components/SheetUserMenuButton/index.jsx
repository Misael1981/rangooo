"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FirstRegistration from "./components/FirstRegistration";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import LoginSocialMidia from "./components/LoginSocialMidia";
import UserMenuLinks from "./components/UserMenuLinks";

const SheetUserMenuButton = ({ open, onOpenChange }) => {
  const { data } = useSession();
  const [firstRegOpen, setFirstRegOpen] = useState(false);

  useEffect(() => {
    if (data?.user) {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem("prefill_user_data")
          : null;
      if (raw) {
        fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        }).finally(() => {
          try {
            localStorage.removeItem("prefill_user_data");
          } catch {}
        });
      }
      const missingProfile = !data.user.phone || !data.user.address;
      const skip =
        typeof window !== "undefined"
          ? localStorage.getItem("first_registration_skipped") === "1"
          : false;
      if (missingProfile && !skip) {
        setFirstRegOpen(true);
      }
    }
  }, [data?.user]);

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
                Seja bem-vindo(a) ao seu cantinho! Agora você pode ver seus
                pedidos, acompanhar o status de entrega e fazer alterações em
                seus dados.
              </p>
            </section>
            <UserMenuLinks />
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
          <LoginSocialMidia />
        )}
      </SheetContent>
      <FirstRegistration
        open={firstRegOpen}
        onOpenChange={(open) => {
          setFirstRegOpen(open);
          if (!open) {
            try {
              localStorage.setItem("first_registration_skipped", "1");
            } catch {}
          }
        }}
      />
    </Sheet>
  );
};

export default SheetUserMenuButton;
