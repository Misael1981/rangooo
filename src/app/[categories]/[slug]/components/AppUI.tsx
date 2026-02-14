import DefaultUI from "./default/DefaultUI";
import HamburgueriaUI from "./hamburguerias/HamburgueriaUI";
import PizzariaUI from "./pizzarias/PizzariaUI";
import RestauranteUI from "./restaurantes/RestauranteUI";
import SorveteriaUI from "./sorveterias/SorveteriaUI";

import { EstablishmentForCategorieDTO } from "@/dtos/establishment-for-categorie.dto";

const map = {
  pizzarias: PizzariaUI,
  hamburguerias: HamburgueriaUI,
  sorveterias: SorveteriaUI,
  restaurantes: RestauranteUI,
};

type CategoryKeys = keyof typeof map;

type AppUIProps = {
  category: CategoryKeys | string;
  establishment: EstablishmentForCategorieDTO;
};

export default function AppUI({ category, establishment }: AppUIProps) {
  const categoryKey = category as CategoryKeys;

  const SpecificUI = map[categoryKey] ?? DefaultUI;
  return <SpecificUI establishment={establishment} />;
}
