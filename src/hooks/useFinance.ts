import { useState } from "react";

import { Finance } from "../types/finance";
import { loadStoredFinances } from "../utils/localStorage";

export const useFinance = () => {
  const [finances, setFinances] = useState<Finance[]>(loadStoredFinances());
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [sortByValue, setSortByValue] = useState<"asc" | "desc" | null>(null);
  const [sortByType, setSortByType] = useState<"asc" | "desc" | null>(null);

  const handleOpenModalEdit = (id: string) => {
    const finance = getFinanceById(id);

    if (finance) {
      setOpenModalEdit(true);
      setSelectedFinance(finance);
    }
  };
  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleDeleteFinance = (id: string) => {
    const updatedFinances = finances.filter((item) => item.id !== id);

    setFinances(updatedFinances);

    localStorage.setItem("finance", JSON.stringify(updatedFinances));
  };

  const handleDeleteAllFinances = () => {
    setFinances([]);
    localStorage.removeItem("finance");
    handleCloseModalDelete();
  };

  const getFinanceById = (id: string) => {
    return finances.find((item) => item.id === id);
  };

  const handleUpdateFinance = (id: string, updatedItem: Partial<Finance>) => {
    const updatedFinances = finances.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedItem,
        };
      }
      return item;
    });

    setFinances(updatedFinances);
    localStorage.setItem("finance", JSON.stringify(updatedFinances));
  };

  const sortFinancesByValue = (finances: Finance[], order: "asc" | "desc") => {
    return finances.sort((a, b) => {
      const valueA = parseFloat(a.value);
      const valueB = parseFloat(b.value);
      return order === "asc" ? valueA - valueB : valueB - valueA;
    });
  };

  const sortFinancesByType = (finances: Finance[], order: "asc" | "desc") => {
    return finances.sort((a, b) => {
      const typeA = a.typeValue.toLowerCase();
      const typeB = b.typeValue.toLowerCase();
      if (order === "asc") {
        return typeA.localeCompare(typeB);
      } else {
        return typeB.localeCompare(typeA);
      }
    });
  };

  const handleSortByValue = () => {
    const newOrder = sortByValue === "asc" ? "desc" : "asc";
    const sortedFinances = sortFinancesByValue([...finances], newOrder);
    setFinances(sortedFinances);
    setSortByValue(newOrder);
    setSortByType(null);
  };

  const handleSortByType = () => {
    const newOrder = sortByType === "asc" ? "desc" : "asc";
    const sortedFinances = sortFinancesByType([...finances], newOrder);
    setFinances(sortedFinances);
    setSortByType(newOrder);
    setSortByValue(null);
  };

  return {
    finances,
    setFinances,
    selectedFinance,
    openModalEdit,
    openModalDelete,
    sortByValue,
    sortByType,
    handleOpenModalEdit,
    handleCloseModalEdit,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteFinance,
    handleDeleteAllFinances,
    handleUpdateFinance,
    handleSortByValue,
    handleSortByType,
  };
};
