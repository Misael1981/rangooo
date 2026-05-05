"use client"

import { UserForLoginDTO } from "@/dtos/user-for-login.dto"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { EllipsisVertical, LogOutIcon } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import LoginSocialMidia from "./components/LoginSocialMidia"
import UserMenuLinks from "./components/UserMenuLinks"

type UserSheetProps = {
  user: UserForLoginDTO | null
}

const UserSheet = ({ user }: UserSheetProps) => {
  const [isOpenFirstRegistration, setIsOpenFirstRegistration] = useState(false)
  const { data, status } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  useEffect(() => {
    if (status === "authenticated" && !user) {
      const timeout = setTimeout(() => {
        setIsOpenFirstRegistration(true)
      }, 0)

      return () => clearTimeout(timeout)
    }
  }, [status, user])

  return (
    <div className="fixed top-8 right-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-primary">
            <EllipsisVertical />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex h-screen min-w-[90%] flex-col justify-between overflow-auto px-4">
          <SheetHeader>
            <SheetTitle className="text-primary text-left">
              Cantinho do usuário
            </SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <div className="flex flex-1 flex-col gap-4">
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
            <>
              <LoginSocialMidia />
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UserSheet
