import Link from "next/link";
import { BsCreditCard, BsClock, BsInfoCircle } from "react-icons/bs";

const BusinessInfo = ({ slug }) => {
  const linksInfos = [
    {
      label: "Pagamentos",
      href: `/infos/modos-pagamento?slug=${slug}`,
      icon: <BsCreditCard size={24} />,
    },
    {
      label: "Horários",
      href: `/infos/horarios?slug=${slug}`,
      icon: <BsClock size={24} />,
    },
    {
      label: "Informações",
      href: `/infos/sobre-o-estabelecimento?slug=${slug}`,
      icon: <BsInfoCircle size={24} />,
    },
  ];
  return (
    <section className="space-y-4 bg-white p-4">
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
        <h4>Funcionamento</h4>
        <p className="text-lg text-green-500">Aberto</p>
      </div>
    </section>
  );
};

export default BusinessInfo;
