### Page

```
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detectar elementos visíveis para animações
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(prev => ({ ...prev, [index]: isInView }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez no mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section com Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background com efeito parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-smooth"
          style={{
            backgroundImage: 'url(/fundo.png)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Camada de partículas/textura com parallax diferente */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(255,165,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,69,0,0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          {/* Logo com efeito parallax mais lento */}
          <div
            className="mb-8 parallax-smooth"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <Image
              src="/logo-rangooo.png"
              alt="Rangooo Logo"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Título principal */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 parallax-smooth"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Rangooo
          </h1>

          {/* Subtítulo */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl leading-relaxed parallax-smooth"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
            }}
          >
            A plataforma que conecta você aos melhores sabores da sua cidade.
            Descubra, peça e saboreie experiências gastronômicas únicas.
          </p>

          {/* CTA Button */}
          <button
            className="mt-8 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl parallax-smooth"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            Começar Agora
          </button>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Seção de conteúdo com parallax reverso */}
      <section className="relative py-20 px-4 bg-white overflow-hidden">
        {/* Background com parallax reverso */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/logo-rangooo.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold text-gray-800 mb-8 transition-all duration-700 ${
              isVisible[0] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
            data-animate
          >
            Por que escolher o Rangooo?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Entrega Rápida",
                description: "Receba seus pratos favoritos em tempo recorde"
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Qualidade Garantida",
                description: "Parceiros selecionados com os melhores ingredientes"
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                title: "Preços Justos",
                description: "Transparência total sem taxas escondidas"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-500 hover:transform hover:scale-105 ${
                  isVisible[index + 1] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                }`}
                data-animate
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-8">
              Junte-se a milhares de pessoas que já descobriram o sabor da praticidade
            </p>
            <button className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Baixar App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Global

```
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "Inter", sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 20%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 20%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 20%;
    --primary: 42 100% 50%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 20%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 20%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 198 33% 94%;
    --input: 198 33% 94%;
    --ring: 0 0% 20%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Estilos para efeito parallax */
.parallax-smooth {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

.scroll-smooth {
  scroll-behavior: smooth;
}

.bg-parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Animações personalizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Classes de animação */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out forwards;
}

/* Utilitários para parallax */
.parallax-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px;
}

.parallax-element {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.parallax-back {
  transform: translateZ(-1px) scale(2);
}

.parallax-base {
  transform: translateZ(0);
}

/* Estilos para melhorar o efeito parallax */
@layer utilities {
  .parallax-smooth {
    will-change: transform;
    transform: translateZ(0);
  }

  .scroll-smooth {
    scroll-behavior: smooth;
  }
}

/* Otimizações para performance do parallax */
html {
  scroll-behavior: smooth;
}

/* Melhorar a renderização de imagens de fundo */
.bg-parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Animações suaves */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

```

### Componente

```
'use client';

import { useEffect, useState } from 'react';

export default function ParallaxSection({
  children,
  backgroundImage,
  height = 'h-screen',
  speed = 0.5,
  overlay = 'bg-black/40',
  className = ''
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative ${height} overflow-hidden ${className}`}>
      {/* Background com parallax */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-smooth"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${scrollY * speed}px)`,
          }}
        />
      )}

      {/* Overlay */}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}

      {/* Conteúdo */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}
```
