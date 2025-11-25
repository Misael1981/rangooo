const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Tudo que você precisa em uma{" "}
              <span className="text-orange-500">plataforma só</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Painel de Gestão Inteligente",
                  description:
                    "Controle pedidos, cardápio, finanças e estoque em tempo real",
                },
                {
                  title: "Checkout Otimizado",
                  description:
                    "Experiência de compra que reduz abandonos e aumenta conversão",
                },
                {
                  title: "Relatórios Detalhados",
                  description:
                    "Dados insights sobre vendas, clientes e produtos mais populares",
                },
                {
                  title: "Multiplataforma",
                  description:
                    "Funciona perfeitamente no WhatsApp, site e aplicativo",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <span className="text-sm font-bold text-white">✓</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
              <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
                    <span className="text-2xl text-white">📊</span>
                  </div>
                  <p className="font-semibold text-gray-600">
                    Painel de Controle Demonstrativo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
