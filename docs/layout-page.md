### Page

```
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
