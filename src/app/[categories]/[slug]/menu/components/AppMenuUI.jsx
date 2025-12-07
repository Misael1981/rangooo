import DefaultMenuUI from "./default/DefaultMenuUI";
import HamburgueriaMenuUI from "./hamburgueria/HamburgueriaMenuUI";
import PizzariaMenuUI from "./pizzaria/PizzariaMenuUI";

const MENU_MAP = {
  hamburguerias: HamburgueriaMenuUI,
  pizzarias: PizzariaMenuUI,
  // ...
};

export default function AppMenuUI({ category, menuData }) {
  const SpecificMenuUI = MENU_MAP[category] ?? DefaultMenuUI;

  return <SpecificMenuUI menuData={menuData} />;
}
