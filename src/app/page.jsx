import ParallaxSection from "@/components/ParallaxSection";
import HeaderHome from "@/components/HeaderHome";
import HeroSection from "@/components/HeroSection";
import ButtonsType from "@/components/ButtonsType";
import ClientsCards from "@/components/ClientsCards";

const buttons = [
  {
    label: "Todos",
    link: "/restaurantes",
  },
  {
    label: "Restaurantes",
    link: "/restaurantes",
  },
  {
    label: "Pizzarias",
    link: "/pizzarias",
  },
  {
    label: "Hamburguerias",
    link: "/hamburguerias",
  },
  {
    label: "Sorveterias",
    link: "/sorveterias",
  },
];

const clients = [
  {
    name: "Congos Burger",
    image: "/clients/logo-congoBurger.png",
    color: "bg-[#092c48]",
  },
  {
    name: "Pizzaria JK",
    image: "/clients/logo-jk.png",
    color: "bg-[#000000]",
  },
];

export default function Home() {
  return (
    <div className="">
      {/* Hero Section com Parallax */}
      <section className="relative min-h-screen">
        <ParallaxSection
          backgroundImage="/fundo.png"
          height="min-h-screen"
          speed={0.5}
          overlay="bg-black/40"
          className=""
        >
          {/* Conteúdo principal */}
          <div className="flex h-full flex-col items-center justify-center p-4 text-white">
            <HeaderHome />

            <HeroSection />

            {/* CTA Button */}
            <ButtonsType buttons={buttons} />

            <ClientsCards clients={clients} />
          </div>
        </ParallaxSection>
      </section>
    </div>
  );
}
