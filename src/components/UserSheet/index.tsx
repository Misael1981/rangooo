"use client";

import { EllipsisVertical, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signOut, useSession } from "next-auth/react";
import UserMenuLinks from "./components/UserMenuLinks";
import LoginSocialMidia from "./components/LoginSocialMidia";
import { UserForLoginDTO } from "@/dtos/user-for-login.dto";
import { useEffect, useState } from "react";
import FirstRegistration from "../FirstRegistration";

type UserSheetProps = {
  user: UserForLoginDTO | null;
};

const UserSheet = ({ user }: UserSheetProps) => {
  const [isOpenFirstRegistration, setIsOpenFirstRegistration] = useState(false);
  const { data, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  console.log("Status in UserSheet: ", status);

  useEffect(() => {
    if (status === "authenticated" && !user) {
      const timeout = setTimeout(() => {
        setIsOpenFirstRegistration(true);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [status, user]);

  return (
    <div className="fixed right-8 top-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-red-500/80">
            <EllipsisVertical />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] flex flex-col justify-between h-screen overflow-auto px-4">
          <SheetHeader>
            <SheetTitle className=" text-left text-red-700">
              Cantinho do usuário
            </SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <div className="flex flex-1  flex-col gap-4">
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image || undefined}
                      alt={data?.user?.name || "User Avatar"}
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
              <UserMenuLinks user={user} />
              <SheetFooter className="mt-auto">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOutIcon />
                  Sair
                </Button>
              </SheetFooter>
            </div>
          ) : (
            <LoginSocialMidia />
          )}
        </SheetContent>
      </Sheet>
      <FirstRegistration
        open={isOpenFirstRegistration}
        onOpenChange={setIsOpenFirstRegistration}
      />
    </div>
  );
};

export default UserSheet;
