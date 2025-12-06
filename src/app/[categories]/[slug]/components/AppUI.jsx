import PizzariaUI from "./pizzaria/PizzariaUI";
import HamburgueriaUI from "./hamburgueria/HamburgueriaUI";
import SorveteriaUI from "./sorveteria/SorveteriaUI";
import DefaultUI from "./default/DefaultUI";
import RestauranteUI from "./restaurante/RestauranteUI";

const map = {
  pizzarias: PizzariaUI,
  hamburguerias: HamburgueriaUI,
  sorveterias: SorveteriaUI,
  acai: SorveteriaUI,
  saudavel: DefaultUI,
  doces: DefaultUI,
  restaurantes: RestauranteUI,
};

export default function AppUI({ category, establishment }) {
  const SpecificUI = map[category] ?? DefaultUI;
  return <SpecificUI establishment={establishment} />;
}
