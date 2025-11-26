import { linksPage } from "@/app/sobre/helpers/links-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="w-full">
      <ul className="flex w-full items-center gap-6 font-bold">
        <li className="group relative">
          <Link
            href="/"
            className="relative z-10 rounded-lg px-4 py-2 font-medium text-orange-600 transition-all duration-500 group-hover:text-white"
          >
            Página de Pedidos
            <span className="absolute inset-0 -z-10 scale-0 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 transition-transform duration-500 group-hover:scale-100"></span>
          </Link>
        </li>
        {linksPage.map((item) => (
          <li key={item.id} className="group relative">
            <a
              href={item.href}
              className="relative z-10 rounded-lg px-4 py-2 font-medium text-orange-600 transition-all duration-500 group-hover:text-white"
            >
              {item.label}
              <span className="absolute inset-0 -z-10 scale-0 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 transition-transform duration-500 group-hover:scale-100"></span>
            </a>
          </li>
        ))}
        <li>
          <Button
            variant="ghost"
            className="group relative w-full transform overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-2xl active:scale-95"
            asChild
          >
            <Link href="/sobre/cadastro">
              {/* Efeito de brilho no hover */}
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

              {/* Texto do botão */}
              <span className="relative z-10">Teste Grátis</span>
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
