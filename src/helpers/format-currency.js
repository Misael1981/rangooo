export const formatCurrency = (value) => {
  const numberValue = typeof value === "number" ? value : Number(value ?? 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
};
