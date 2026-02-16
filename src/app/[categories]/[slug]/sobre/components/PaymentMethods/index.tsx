import { Banknote, CreditCard, Landmark, Wallet } from "lucide-react";
import { MdPix } from "react-icons/md";

type PaymentMethodsProps = {
  methods: string[];
};

const paymentConfig: Record<
  string,
  { label: string; Icon: React.ElementType; color: string }
> = {
  CASH: {
    label: "Dinheiro",
    Icon: Banknote,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  CREDIT_CARD: {
    label: "Cartão de Crédito",
    Icon: CreditCard,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  DEBIT_CARD: {
    label: "Cartão de Débito",
    Icon: Landmark,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  PIX: {
    label: "Pix",
    Icon: MdPix,
    color: "text-cyan-600 bg-cyan-50 border-cyan-100",
  },
};

const PaymentMethods = ({ methods }: PaymentMethodsProps) => {
  if (!methods?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
        <Wallet className="mb-2 h-8 w-8 opacity-20" />
        <p className="text-sm">Nenhum método de pagamento informado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {methods.map((method) => {
        const config = paymentConfig[method];
        if (!config) return null;

        const { label, Icon, color } = config;

        return (
          <div
            key={method}
            className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:shadow-sm ${color}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {label}
              </span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">
                Aceito no estabelecimento
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethods;
