import Link from "next/link";
import { BsCreditCard, BsClock, BsInfoCircle } from "react-icons/bs";

type BusinessInfoProps = {
  slug: string;
  isOpen: boolean;
  categorie: string;
};

const BusinessInfo = ({ slug, isOpen, categorie }: BusinessInfoProps) => {
  const categories = categorie.toLowerCase();

  const linksInfos = [
    {
      label: "Pagamentos",
      href: `/${categories}s/${slug}/sobre/modos-pagamento`,
      icon: <BsCreditCard size={24} />,
    },
    {
      label: "Horários",
      href: `/${categories}s/${slug}/sobre/horarios`,
      icon: <BsClock size={24} />,
    },
    {
      label: "Informações",
      href: `/${categories}s/${slug}/sobre/contato`,
      icon: <BsInfoCircle size={24} />,
    },
  ];
  return (
    <section className="space-y-2">
      <ul className="flex items-center justify-between">
        {linksInfos.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-md flex flex-col items-center justify-center gap-1"
            >
              {item.label}
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-center">Funcionamento</h4>
        {isOpen ? (
          <p className="text-lg text-green-500 text-center">Aberto</p>
        ) : (
          <p className="text-lg text-red-500">Fechado</p>
        )}
      </div>
    </section>
  );
};

export default BusinessInfo;
