import { linksPage } from "@/app/sobre/helpers/links-page";
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
      </ul>
    </nav>
  );
};

export default NavMenu;
