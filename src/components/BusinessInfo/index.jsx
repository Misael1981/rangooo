import Link from "next/link";
import { BsCreditCard, BsClock, BsInfoCircle } from "react-icons/bs";
import { Separator } from "../ui/separator";

const BusinessInfo = ({ restaurant }) => {
  const linksInfos = [
    {
      label: "Pagamentos",
      href: `/modos-pagamento?slug=${restaurant.slug}`,
      icon: <BsCreditCard size={24} />,
    },
    {
      label: "Horários",
      href: `/horarios?slug=${restaurant.slug}`,
      icon: <BsClock size={24} />,
    },
    {
      label: "Informações",
      href: `/infos-estabelecimento?slug=${restaurant.slug}`,
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
      <Separator className="my-4 bg-gray-300" />
    </section>
  );
};

export default BusinessInfo;
