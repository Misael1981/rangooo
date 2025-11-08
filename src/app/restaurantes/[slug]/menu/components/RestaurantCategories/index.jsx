import { Badge } from "@/components/ui/badge";
import LogoImage from "../../../components/LogoImage";
import { Star } from "lucide-react";
import Link from "next/link";
import { BsCreditCard, BsClock, BsInfoCircle } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";

const RestaurantCategories = ({ restaurant }) => {
  const linksInfos = [
    {
      label: "Pagamentos",
      href: `/restaurantes/${restaurant.slug}/modos-pagamento`,
      icon: <BsCreditCard size={24} />,
    },
    {
      label: "Horários",
      href: `/restaurantes/${restaurant.slug}/horarios`,
      icon: <BsClock size={24} />,
    },
    {
      label: "Informações",
      href: `/restaurantes/${restaurant.slug}/info`,
      icon: <BsInfoCircle size={24} />,
    },
  ];
  return (
    <section className="relative z-50 mt-[-1.5rem] space-y-4 rounded-t-3xl bg-white p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoImage restaurant={restaurant} width={56} height={56} />
            <div>
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
          </div>
          <Badge variant="secondary">
            <Star
              className="mr-1 h-4 w-4 text-yellow-400"
              fill="currentColor"
            />
            <span className="text-base">5.0</span>
          </Badge>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xs text-blue-500">{restaurant.address}</p>
        </div>
      </div>
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

export default RestaurantCategories;
