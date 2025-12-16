export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import AppUI from "./components/AppUI";
import { getEstablishmentWelcomeData } from "@/app/actions/get-establishment-welcome-data";
import { enumCategoryToRoute } from "@/app/utils/constants";
import QrCode from "@/components/QrCode";

const CATEGORIES = [
  "pizzarias",
  "restaurantes",
  "hamburguerias",
  "sorveterias",
  "acai",
  "saudavel",
  "doces",
];

export default async function EstabelecimentoPage({ params }) {
  const { categories, slug } = await params;

  if (!CATEGORIES.includes(categories)) {
    return redirect("/404");
  }

  const establishment = await getEstablishmentWelcomeData(slug);

  if (!establishment) {
    return redirect("/404");
  }

  const dbCategoriaSlug = enumCategoryToRoute(establishment.category);
  if (dbCategoriaSlug !== categories) {
    return redirect(`/${dbCategoriaSlug}/${slug}`);
  }

  return (
    <div className="relative min-h-screen bg-white sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto max-w-xl shadow-all-sides">
        <AppUI category={categories} establishment={establishment} />
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
