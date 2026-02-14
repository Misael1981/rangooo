import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import DefaultMenuUI from "../default/DefaultMenuUI";
import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto";

const MENU_MAP = {
  hamburguerias: dynamic(() => import("../hamburguerias/HamburgueriaMenuUI"), {
    loading: () => (
      <Loader2 className="animate-spin mx-auto mt-20 text-orange-500" />
    ),
  }),
  pizzarias: dynamic(() => import("../pizzarias/PizzariaMenuUI"), {
    loading: () => (
      <Loader2 className="animate-spin mx-auto mt-20 text-red-500" />
    ),
  }),
  default: dynamic(() => import("../default/DefaultMenuUI")),
};

type AppMenuUIProps = {
  category: string;
  establishment: EstablishmentMenuDataDTO;
};

const AppMenuUI = ({ category, establishment }: AppMenuUIProps) => {
  const categoryKey = category as keyof typeof MENU_MAP;
  const SpecificMenuUI = MENU_MAP[categoryKey] ?? DefaultMenuUI;

  return <SpecificMenuUI establishment={establishment} />;
};

export default AppMenuUI;
