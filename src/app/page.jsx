import HeaderHome from "@/components/HeaderHome";
import HeroSection from "@/components/HeroSection";
import ButtonsType from "@/components/ButtonsType";
import ClientsCards from "@/components/ClientsCards";
import { db } from "@/lib/prisma";

const clients = [
  {
    name: "Congos Burger",
    image: "/clients/logo-congoBurger-Photoroom.png",
    color: "bg-[#092c48]",
  },
  {
    name: "Pizzaria JK",
    image: "/clients/logo_jk.svg",
    color: "bg-[#000000]",
  },
];

export default async function Home() {
  const establishments = await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="flex h-full flex-col items-center justify-center gap-6 bg-black/40 p-4 text-white">
        <HeaderHome />

        <HeroSection />

        <div className="container mx-auto max-w-6xl">
          <ButtonsType />
        </div>
        <ClientsCards clients={establishments} />
      </div>
    </>
  );
}
