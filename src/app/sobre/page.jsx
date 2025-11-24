// app/para-estabelecimentos/page.jsx

import Link from "next/link";
import AboutHeader from "./components/AboutHeader";

export default function ParaEstabelecimentosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <AboutHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-purple-600">
        <div className="absolute inset-0 bg-black/40" />
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20">
          <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
            {/* Conteúdo Principal */}
            <div className="text-white">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                <span className="text-sm">Plataforma de Delivery Completa</span>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
                Aumente suas{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  vendas
                </span>{" "}
                com nossa tecnologia
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-white/90">
                O <strong>Rangooo</strong> oferece uma experiência única para
                cada tipo de estabelecimento. Hamburguerias, pizzarias e
                restaurantes com funcionalidades específicas para aumentar a
                conversão.
              </p>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/cadastro-estabelecimento"
                  className="transform rounded-xl bg-white px-8 py-4 text-center text-lg font-bold text-orange-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                >
                  Começar Agora - Grátis
                </Link>
                <Link
                  href="#planos"
                  className="rounded-xl border-2 border-white px-8 py-4 text-center text-lg font-bold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Ver Planos
                </Link>
              </div>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>Configuração em 5 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>Suporte especializado</span>
                </div>
              </div>
            </div>
            {/* Mockup/Ilustração */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
                <div className="rounded-2xl bg-white p-6 shadow-2xl">
                  <div className="mb-4 flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                    <div className="h-20 rounded-lg bg-gradient-to-r from-orange-100 to-red-100"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 rounded bg-orange-500"></div>
                      <div className="h-8 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Elementos flutuantes */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-yellow-400/20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-400/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
              Feito para <span className="text-orange-500">crescer</span> seu
              negócio
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Tecnologia que entende as necessidades específicas do seu tipo de
              estabelecimento
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🍔",
                title: "Hamburguerias",
                features: [
                  "Montador visual de hambúrguer",
                  "Combos personalizáveis",
                  "Gestão de ingredientes",
                  "Promoções especiais",
                ],
                color: "from-orange-400 to-red-500",
              },
              {
                icon: "🍕",
                title: "Pizzarias",
                features: [
                  "Montador de pizza redonda",
                  "Sistema meia-meia",
                  "Seleção de bordas",
                  "Gestão de sabores",
                ],
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: "🍽️",
                title: "Restaurantes",
                features: [
                  "Cardápio por cursos",
                  "Sugestões do chef",
                  "Sistema de reservas",
                  "Experiência premium",
                ],
                color: "from-purple-400 to-pink-500",
              },
            ].map((tipo, index) => (
              <div
                key={tipo.title}
                className="group relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:border-orange-300 hover:shadow-xl"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${tipo.color} mb-6 text-2xl text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {tipo.icon}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {tipo.title}
                </h3>

                <ul className="space-y-3">
                  {tipo.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <Link
                    href={`/cadastro-${tipo.title.toLowerCase()}`}
                    className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
                  >
                    Saiba mais →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="bg-gray-50 py-20">
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

      {/* CTA Final */}
      <section
        id="planos"
        className="bg-gradient-to-r from-orange-500 to-red-500 py-20"
      >
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            Pronto para revolucionar seu negócio?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Junte-se a centenas de estabelecimentos que já aumentaram suas
            vendas com o Rangooo
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/cadastro-estabelecimento"
              className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-2xl transition-all duration-300 hover:bg-gray-100"
            >
              Testar Grátis por 7 Dias
            </Link>
            <Link
              href="/contato"
              className="rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white/10"
            >
              Falar com Especialista
            </Link>
          </div>

          <p className="mt-6 text-white/80">
            Sem compromisso, sem cartão de crédito
          </p>
        </div>
      </section>
    </div>
  );
}
