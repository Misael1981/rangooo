import EstablishmentsBrowser from "@/components/EstablishmentsBrowser";
import HeaderHome from "@/components/HeaderHome";
import HeroSection from "@/components/HeroSection";
import UserSheet from "@/components/UserSheet";
import { getEstablishmentsForHomepage } from "@/data/get-establishments-for-homepage";
import { getUserById } from "@/data/get-user-by-id";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();
  const establishment = await getEstablishmentsForHomepage();

  const userId = session?.user?.id ?? null;
  const user = userId ? await getUserById(userId) : null;

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat" />
      <div className="flex min-h-screen flex-col gap-6 bg-black/40 p-4 text-white">
        <HeaderHome />
        <UserSheet user={user} />
        <HeroSection />
        <div className="container mx-auto max-w-6xl">
          <EstablishmentsBrowser establishments={establishment} />
        </div>
      </div>
    </>
  );
}
