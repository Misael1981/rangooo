export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import AppUI from "./components/AppUI";
import { getEstablishmentWelcomeData } from "@/app/actions/get-establishment-welcome-data";
import { enumCategoryToRoute } from "@/app/utils/constants";

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

  return <AppUI category={categories} establishment={establishment} />;
}
