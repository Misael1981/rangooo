export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import AppUI from "./components/AppUI";
import { getEstablishmentWelcomeData } from "@/app/actions/get-establishment-welcome-data";

const CATEGORIES = [
  "pizzarias",
  "restaurantes",
  "hamburguerias",
  "sorveterias",
  "acai",
  "saudavel",
  "doces",
];

function enumCategoryToRoute(categoryEnum) {
  const map = {
    RESTAURANT: "restaurantes",
    PIZZARIA: "pizzarias",
    HAMBURGUERIA: "hamburguerias",
    SORVETERIA: "sorveterias",
    ACAI: "acai",
    SAUDAVEL: "saudavel",
    DOCES: "doces",
  };
  return map[categoryEnum] ?? "restaurantes";
}

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
