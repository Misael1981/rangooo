import { Separator } from "@/components/ui/separator";
import { ScrollTextIcon, ShieldAlert, UserStar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AccountSettingsAccordion from "../AccountSettingsAccordion";

const slug = "pizzaria-jk";

const UserMenuLinks = () => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Link href="/sobre" className="w-full py-2">
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
        <Link href={`/pizzarias/${slug}/admin`} className="w-full py-2">
          <span className="flex items-center gap-2">
            <UserStar className="text-yellow-500" />
            Admin
          </span>
        </Link>
        <Separator className="bg-gray-500" />
      </div>
      <div className="flex flex-col gap-2">
        <AccountSettingsAccordion />
        <Separator className="bg-gray-500" />
      </div>
    </section>
  );
};

export default UserMenuLinks;
