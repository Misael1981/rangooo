import { Card, CardContent } from "@/components/ui/card";

const OverviewCards = () => {
  const cardsData = [
    {
      title: "Número de estabelecimentos",
      value: "1000",
      description: "Cadastrados na plataforma",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Estabelecimentos pendentes",
      value: "1000",
      description: "Aguardando aprovação",
      color: "bg-amber-50 border-amber-200",
    },
    {
      title: "Total de Usuários",
      value: "1000",
      description: "Usuários ativos",
      color: "bg-green-50 border-green-200",
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Visão Geral</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            className="border-2 border-orange-200 bg-orange-50 transition-shadow duration-300 hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OverviewCards;
