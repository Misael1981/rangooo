import { Separator } from "@/components/ui/separator";
import { ScrollTextIcon, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AccountSettingsAccordion from "../AccountSettingsAccordion";
import { UserForLoginDTO } from "@/dtos/user-for-login.dto";

type UserMenuLinksProps = {
  user: UserForLoginDTO | null;
};

const UserMenuLinks = ({ user }: UserMenuLinksProps) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {/* Não esquecer do link da vercel */}
        <Link href="/" className="w-full py-2">
          <span className="flex items-center gap-2">
            <Image
              src="/logo-rangooo.png"
              alt="Logo Rangooo"
              width={24}
              height={24}
            />
            Sobre a Plataforma{" "}
            <span className="font-bold text-red-500">Rangooo</span>
          </span>
        </Link>
        <Separator className="bg-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/orders" className="w-full py-2">
          <span className="flex items-center gap-2">
            <ScrollTextIcon className="text-blue-500" />
            Meus Pedidos
          </span>
        </Link>
        <Separator className="bg-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/" className="w-full py-2">
          <span className="flex items-center gap-2">
            <ShieldAlert className="text-green-500" />
            Termos e Condições
          </span>
        </Link>
        <Separator className="bg-gray-500" />
      </div>

      <div className="flex flex-col gap-2">
        <AccountSettingsAccordion user={user} />
        <Separator className="bg-gray-500" />
      </div>
    </section>
  );
};

export default UserMenuLinks;
