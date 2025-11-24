import Link from "next/link";

const HeroSectionAbout = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 pb-20">
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
              O <strong>Rangooo</strong> oferece uma experiência única para cada
              tipo de estabelecimento. Hamburguerias, pizzarias e restaurantes
              com funcionalidades específicas para aumentar a conversão.
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
  );
};

export default HeroSectionAbout;
