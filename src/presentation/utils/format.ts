export const formatCurrency = (value: number | undefined) => {
  if (value === undefined) return "N/A";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};