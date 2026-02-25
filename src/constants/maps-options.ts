export const restaurantCategories = [
  {
    value: "RESTAURANT",
    label: "Restaurantes",
    link: "/restaurantes?category=RESTAURANT",
    background: "#334155",
  },
  {
    value: "PIZZARIA",
    label: "Pizzarias",
    link: "/restaurantes?category=PIZZARIA",
    background: "#111827",
  },
  {
    value: "HAMBURGUERIA",
    label: "Hamburguerias",
    link: "/restaurantes?category=HAMBURGUERIA",
    background: "#92400E",
  },
  {
    value: "SORVETERIA",
    label: "Sorveterias",
    link: "/restaurantes?category=SORVETERIA",
    background: "#DB2777",
  },
  {
    value: "ADEGA",
    label: "Adegas",
    link: "/restaurantes?category=ADEGA",
    background: "#7F1D1D",
  },
];

export const categoriesWithAll = [
  { value: "ALL", label: "Todos", link: "/restaurantes" },
  ...restaurantCategories,
];

export const CATEGORIES_URL = [
  "pizzarias",
  "restaurantes",
  "hamburguerias",
  "sorveterias",
  "adegas",
];

export const METHOD_BASE = {
  DELIVERY: {
    alt: "Entregar",
    buttonText: "Entregar",
  },
  PICKUP: {
    alt: "Pegar no local",
    buttonText: "Pegar no local",
  },
  DINE_IN: {
    alt: "Comer no local",
    buttonText: "Comer no local",
  },
} as const;

export type MethodType = keyof typeof METHOD_BASE;
