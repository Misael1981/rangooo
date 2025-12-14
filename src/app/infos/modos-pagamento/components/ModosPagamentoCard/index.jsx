import Image from "next/image";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { MdOutlinePix } from "react-icons/md";

export const PAYMENT_METHOD_CONFIG = {
  CASH: {
    label: "Dinheiro",
    icon: FaMoneyBillWave,
  },
  PIX: {
    label: "Pix",
    icon: MdOutlinePix,
    iconProps: { className: "text-[#00C2A8]" },
  },
  CREDIT_CARD: {
    label: "Cartão de Crédito",
    icon: FaCreditCard,
  },
  DEBIT_CARD: {
    label: "Cartão de Débito",
    icon: FaCreditCard,
  },
};

const ModosPagamentoCard = ({ paymentMethod }) => {
  const methods = paymentMethod;
  if (!methods.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Formas de pagamento não informadas.
      </p>
    );
  }
  return (
    <section className="p-4">
      <ul className="space-y-6">
        {methods
          .filter((m) => m.isActive)
          .map((method) => {
            const config = PAYMENT_METHOD_CONFIG[method.method];

            if (!config) return null; // método desconhecido, não quebra

            const Icon = config.icon;

            return (
              <li key={method.id}>
                {/* Método */}
                <div className="flex items-center gap-4 text-2xl">
                  <Icon className="h-8 w-8" {...config.iconProps} />
                  <span className="font-bold">{config.label}</span>
                </div>

                {/* Bandeiras (se existirem) */}
                {method.cardBrands?.length > 0 && (
                  <ul className="mt-4 space-y-3 pl-10">
                    {method.cardBrands.map((brand) => (
                      <li
                        key={brand}
                        className="flex items-center gap-3 text-lg"
                      >
                        <Image
                          src={`/images/${brand.toLowerCase()}.svg`}
                          alt={brand}
                          width={32}
                          height={32}
                        />
                        <span>{brand}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default ModosPagamentoCard;
