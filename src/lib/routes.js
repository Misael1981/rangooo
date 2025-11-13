export function segmentForCategory(category) {
  const key = String(category || "").toLowerCase();
  const map = {
    pizzaria: "pizzarias",
    pizzarias: "pizzarias",
    hamburgueria: "hamburguerias",
    hamburguerias: "hamburguerias",
    restaurante: "restaurantes",
    restaurantes: "restaurantes",
    // adicione outros tipos aqui
  };
  return map[key] || category;
}
