import { Card, CardContent } from "@/components/ui/card";

const features = [
  "Site de delivery completo",
  "Cardápio personalizado",
  "Login simples com redes sociais",
  "Sistema de Pedidos Online",
  "Notificações em Tempo Real",
  "Impressão automática na cozinha",
  "Relatórios Detalhados",
  "Integração com Pagamentos",
  "Painel de Gestão Inteligente",
  "Atendimento ao Cliente 24/7",
  "Ferramentas de Análise de Dados",
];

const Plans = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl p-4 text-center">
        <h2 className="mb-4 text-4xl font-bold text-orange-500 lg:text-5xl">
          Aproveite 7 dias grátis...
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Teste o Rangooo gratuitamente por 7 dias, e veja como ele pode
          simplificar o seu gerenciamento de estabelecimentos.
        </p>
      </div>
      <div className="flex justify-center gap-8">
        <Card className="group relative w-[350px] max-w-[95%] overflow-hidden border-2 border-orange-200 transition-all duration-500 hover:scale-105 hover:border-orange-300 hover:shadow-2xl">
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 transition-transform duration-1000 group-hover:translate-x-[100%]" />

          <CardContent className="relative z-10 p-8">
            {/* Badge de Destaque */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
              MAIS VENDIDO
            </div>

            {/* Título */}
            <h4 className="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
              Tenha sua própria plataforma de delivery
            </h4>

            {/* Descrição */}
            <p className="mb-6 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
              Com menos de R$ 100,00 mensais, aumente seu faturamento ao
              digitalizar todo o atendimento
            </p>

            {/* Preço */}
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 text-center text-white shadow-lg">
              <span className="text-3xl font-bold">R$ 98,00</span>
              <span className="block text-sm text-orange-100">/mês</span>
            </div>

            {/* Título da Lista */}
            <h5 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>O que
              está incluso no plano?
            </h5>

            {/* Lista de Features */}
            <ul className="mb-6 space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 transition-all duration-300 hover:translate-x-2 hover:text-orange-600"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Botão CTA */}
            <button className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-95 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500">
              Começar Agora
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Plans;
