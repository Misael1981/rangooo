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
import { GrInstagram } from "react-icons/gr"

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

              <section className="flex h-full flex-col justify-between">
                <UserMenuLinks user={user} />

                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-slate-200 hover:bg-slate-50">
                  <p className="text-sm font-medium text-slate-600">
                    Acompanhe as novidades do Rangooo
                  </p>

                  <a
                    href="https://www.instagram.com/rangooo.app?igsh=ajFmbzM0NXBvaTA3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
                  >
                    <GrInstagram className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                    <span>Siga @rangooo.app</span>
                  </a>
                </div>
              </section>

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
