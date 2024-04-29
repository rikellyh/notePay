export const loadStoredFinances = () => {
  const storedFinances = localStorage.getItem("finance");
  return storedFinances ? JSON.parse(storedFinances) : [];
};
