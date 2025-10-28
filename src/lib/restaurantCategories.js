export const restaurantCategories = [
  { value: "RESTAURANT", label: "Restaurantes", link: "/restaurantes" },
  { value: "PIZZARIA", label: "Pizzarias", link: "/pizzarias" },
  { value: "HAMBURGUERIA", label: "Hamburguerias", link: "/hamburguerias" },
  { value: "SORVETERIA", label: "Sorveterias", link: "/sorveterias" },
  { value: "ACAI", label: "Açaí", link: "/acai" },
  { value: "SAUDAVEL", label: "Saudável", link: "/saudavel" },
  { value: "DOCES", label: "Doces", link: "/doces" },
];

// Se quiser incluir "Todos" sempre no início:
export const categoriesWithAll = [
  { value: "ALL", label: "Todos", link: "/restaurantes" },
  ...restaurantCategories,
];