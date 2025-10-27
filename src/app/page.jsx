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
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="flex h-full flex-col items-center justify-center gap-6 bg-black/40 p-4 text-white">
        <HeaderHome />

        <HeroSection />

        <ButtonsType buttons={buttons} />
        <ClientsCards clients={clients} />
      </div>
    </>
  );
}
