export const restaurantCategories = [
  {
    value: "RESTAURANT",
    label: "Restaurantes",
    link: "/restaurantes?category=RESTAURANT",
  },
  {
    value: "PIZZARIA",
    label: "Pizzarias",
    link: "/restaurantes?category=PIZZARIA",
  },
  {
    value: "HAMBURGUERIA",
    label: "Hamburguerias",
    link: "/restaurantes?category=HAMBURGUERIA",
  },
  {
    value: "SORVETERIA",
    label: "Sorveterias",
    link: "/restaurantes?category=SORVETERIA",
  },
  { value: "ACAI", label: "Açaí", link: "/restaurantes?category=ACAI" },
  {
    value: "SAUDAVEL",
    label: "Saudável",
    link: "/restaurantes?category=SAUDAVEL",
  },
  { value: "DOCES", label: "Doces", link: "/restaurantes?category=DOCES" },
];

// Se quiser incluir "Todos" sempre no início:
export const categoriesWithAll = [
  { value: "ALL", label: "Todos", link: "/restaurantes" },
  ...restaurantCategories,
];
