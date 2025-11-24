import Link from "next/link";

const linksPage = [
  {
    id: 1,
    href: "#",
    label: "Sobre nós",
  },
  {
    id: 2,
    href: "#",
    label: "Preços",
  },
  {
    id: 3,
    href: "#",
    label: "Contato",
  },
];

const NavMenu = () => {
  return (
    <nav className="w-full py-4">
      <ul className="w-full space-y-4 font-bold lg:flex lg:items-center lg:gap-6 lg:space-y-0">
        <li className="border-b border-orange-300 py-2 text-lg lg:border-b-0 lg:p-0 lg:hover:border-b">
          <Link
            href="/"
            className="text-orange-600 transition-all duration-300 group-hover:text-orange-700"
          >
            Página de Pedidos
          </Link>
        </li>
        {linksPage.map((item) => (
          <li
            key={item.id}
            className="border-b border-orange-300 py-2 text-lg lg:border-b-0 lg:p-0 lg:hover:border-b"
          >
            <a
              href={item.href}
              className="text-orange-600 transition-all duration-300 group-hover:text-orange-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
