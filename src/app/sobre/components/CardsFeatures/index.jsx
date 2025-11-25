import { Card, CardContent } from "@/components/ui/card";
import { FaRobot } from "react-icons/fa";
import { FcSmartphoneTablet, FcPrint } from "react-icons/fc";
import { MdLoyalty } from "react-icons/md";

const itemsCard = [
  {
    id: 1,
    icon: <FaRobot className="h-12 w-12" />,
    title: "Chatbot no Whatsapp",
    description:
      "Responda pedidos automaticamente e ganhe tempo com um atendimento rápido e direto no Whatsapp do seu estabelecimento.",
  },
  {
    id: 2,
    icon: <FcSmartphoneTablet className="h-12 w-12" />,
    title: "Cardápio Digital",
    description:
      "Cardápio online para seus clientes acessarem por QR Code ou link. Atualize preços e itens em tempo real, sem problemas.",
  },
  {
    id: 3,
    icon: <FcPrint className="h-12 w-12" />,
    title: "Impressão automática na cozinha",
    description:
      "Assim que confirmado, o pedido é impresso cozinha, gerando o ticket com itens, observações e número.",
  },
  {
    id: 4,
    icon: <MdLoyalty className="h-12 w-12" />,
    title: "Fidelidade e CRM básico",
    description:
      "Histórico de compra, preferências e contatos para campanhas. Atendimento mais pessoal e recorrência maior.",
  },
];

const CardsFeatures = () => {
  return (
    <div className="bg-[#f97316] p-4 pb-10 text-white">
      <h3 className="mb-6 text-center text-2xl font-bold">
        Algumas das funcionalidades do nosso sistema
      </h3>
      <div className="flex flex-nowrap gap-4 overflow-x-auto py-4 lg:justify-center [&::-webkit-scrollbar]:hidden">
        {itemsCard.map((item) => (
          <Card
            key={item.id}
            className="group w-[300px] min-w-[300px] shrink-0 bg-transparent text-white shadow-lg transition-all duration-500 hover:scale-105 hover:border-orange-300 hover:shadow-xl"
          >
            <CardContent className="space-y-4 p-6">
              {item.icon}
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-lg opacity-80">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardsFeatures;
