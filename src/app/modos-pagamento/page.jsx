import Image from "next/image";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { MdOutlinePix } from "react-icons/md";
import HeaderInfosPage from "../../components/HeaderInfosPage";

export default function ModosPagamento() {
  return (
    <div className="w-full">
      <HeaderInfosPage title="Formas de Pagamento" />
      <section className="p-4">
        <ul className="space-y-6">
          <li className="flex items-center gap-4 text-2xl">
            <FaMoneyBillWave className="h-8 w-8" />
            <span className="font-bold">Dinheiro</span>
          </li>
          <li className="flex items-center gap-4 text-2xl">
            <MdOutlinePix
              className="h-8 w-8 text-[#00C2A8]"
              fill="currentColor"
            />
            <span className="font-bold">Pix</span>
          </li>
          <li className="flex items-center gap-4 text-2xl">
            <FaCreditCard className="h-8 w-8" />
            <span className="font-bold">Cartão de Crédito</span>
          </li>
        </ul>
        <ul className="mt-6 space-y-6 pl-8">
          <li className="flex items-center gap-4 text-lg">
            <Image
              src="/images/mastercard.svg"
              alt="Cartão de Crédito"
              width={36}
              height={36}
            />
            <span>Mastercard</span>
          </li>
          <li className="flex items-center gap-4 text-lg">
            <Image
              src="/images/visa.svg"
              alt="Cartão de Crédito"
              width={36}
              height={36}
            />
            <span>Visa</span>
          </li>
          <li className="flex items-center gap-4 text-lg">
            <Image
              src="/images/elo.svg"
              alt="Cartão de Crédito"
              width={36}
              height={36}
            />
            <span>Elo</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
