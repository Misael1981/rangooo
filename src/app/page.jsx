import HeaderHome from "@/components/HeaderHome";
import HeroSection from "@/components/HeroSection";
import EstablishmentsBrowser from "@/components/EstablishmentsBrowser";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const establishments = await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
      category: true,
      isOpen: true,
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
