import HeaderHome from "@/components/HeaderHome";
import HeroSection from "@/components/HeroSection";
import EstablishmentsBrowser from "@/components/EstablishmentsBrowser";
import prisma from "@/lib/prisma";

export default async function Home() {
  // Use o client correto e trate o retorno como array
  const establishments = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
      category: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="flex min-h-screen flex-col gap-6 bg-black/40 p-4 text-white">
        <HeaderHome />

        <HeroSection />

        <div className="container mx-auto max-w-6xl">
          <EstablishmentsBrowser establishments={establishments} />
        </div>
      </div>
    </>
  );
}
