import QrCodeImage from "@/components/QrCodeImage";
import { getEstablishmentBySlug } from "@/data/get-establishment-by-slug";
import { enumCategoryToRoute } from "@/helpers/enum-category-to-route";
import { notFound, redirect } from "next/navigation";
import AppUI from "./components/AppUI";

const CATEGORIES = [
  "pizzarias",
  "restaurantes",
  "hamburguerias",
  "sorveterias",
  "acai",
  "saudavel",
  "doces",
];

interface PageProps {
  params: Promise<{ categories: string; slug: string }>;
}

export default async function EstabelecimentoPage({ params }: PageProps) {
  const { categories, slug } = await params;

  if (!CATEGORIES.includes(categories)) {
    return notFound();
  }

  const establishment = await getEstablishmentBySlug(slug);

  if (!establishment) {
    return notFound();
  }

  const dbCategoriaSlug = enumCategoryToRoute(establishment.category);

  if (dbCategoriaSlug !== categories) {
    return redirect(`/${dbCategoriaSlug}/${slug}`);
  }

  return (
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto max-w-xl shadow-all-sides">
            <AppUI category={categories} establishment={establishment} />
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}
