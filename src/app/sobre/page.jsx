"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detectar elementos visíveis para animações
      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible((prev) => ({ ...prev, [index]: isInView }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Executar uma vez no mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section com Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background com efeito parallax */}
        <div
          className="parallax-smooth absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/fundo.png)",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Camada de partículas/textura com parallax diferente */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,165,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,69,0,0.3) 0%, transparent 50%)",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        {/* Conteúdo principal */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-white">
          {/* Logo com efeito parallax mais lento */}
          <div
            className="parallax-smooth mb-8"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <Image
              src="/logo-rangooo.png"
              alt="Rangooo Logo"
              width={200}
              height={200}
              className="h-32 w-32 object-contain drop-shadow-2xl md:h-48 md:w-48"
            />
          </div>

          {/* Título principal */}
          <h1
            className="parallax-smooth mb-6 text-center text-4xl font-bold md:text-6xl lg:text-7xl"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Rangooo
          </h1>

          {/* Subtítulo */}
          <p
            className="parallax-smooth max-w-3xl text-center text-lg leading-relaxed md:text-xl lg:text-2xl"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
            }}
          >
            A plataforma que conecta você aos melhores sabores da sua cidade.
            Descubra, peça e saboreie experiências gastronômicas únicas.
          </p>

          {/* CTA Button */}
          <button
            className="parallax-smooth mt-8 transform rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-600"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            Começar Agora
          </button>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Seção de conteúdo com parallax reverso */}
      <section className="relative overflow-hidden bg-white px-4 py-20">
        {/* Background com parallax reverso */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url(/logo-rangooo.png)",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2
            className={`mb-8 text-3xl font-bold text-gray-800 transition-all duration-700 md:text-4xl ${
              isVisible[0] ? "animate-fade-in-up" : "translate-y-8 opacity-0"
            }`}
            data-animate
          >
            Por que escolher o Rangooo?
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Entrega Rápida",
                description: "Receba seus pratos favoritos em tempo recorde",
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Qualidade Garantida",
                description:
                  "Parceiros selecionados com os melhores ingredientes",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                title: "Preços Justos",
                description: "Transparência total sem taxas escondidas",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-lg bg-gray-50 p-6 transition-all duration-500 hover:scale-105 hover:transform hover:bg-gray-100 ${
                  isVisible[index + 1]
                    ? "animate-fade-in-up"
                    : "translate-y-8 opacity-0"
                }`}
                data-animate
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção adicional com parallax horizontal */}
      <section className="relative h-96 overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
        <div
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{
            transform: `translateX(${scrollY * 0.1}px)`,
          }}
        >
          <div className="text-center">
            <h3 className="mb-4 text-3xl font-bold md:text-4xl">
              Pronto para começar?
            </h3>
            <p className="mb-8 text-xl">
              Junte-se a milhares de pessoas que já descobriram o sabor da
              praticidade
            </p>
            <button className="transform rounded-full bg-white px-8 py-4 font-semibold text-orange-500 transition-all duration-300 hover:scale-105 hover:bg-gray-100">
              Baixar App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
