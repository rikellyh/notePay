import { Finance } from "../types/finance";

export const formatCurrency = (array: Finance[]): string => {
  const totalValue = array.reduce((accumulator, currentValue) => {
    const value = parseFloat(currentValue.value);

    if (currentValue.typeValue === "Entrada") {
      return accumulator + value;
    } else if (currentValue.typeValue === "Saída") {
      return accumulator - value;
    } else {
      return accumulator;
    }
  }, 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalValue);
};
