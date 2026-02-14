export const stepFields = [
  ["name", "phone"],
  ["street", "number", "neighborhood", "city", "state", "complement"],
  ["areaType", "reference"],
] as const;

export const steps = [
  { title: "Seus dados", description: "Precisamos te conhecer melhor." },
  { title: "Endereço", description: "Onde você costuma receber pedidos?" },
  { title: "Referência", description: "Alguma observação opcional." },
];
