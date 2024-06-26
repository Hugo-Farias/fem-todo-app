import { dataType } from "./App.tsx";

export const storageThemeKey = "darkMode";

// Set value in localStorage
export const setLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get darkmode value from localStorage
export const getLocalStorage = (key: string, fallback: boolean) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }
  return storedValue ? JSON.parse(storedValue) : null;
};

export const deleteFromList = function (list: dataType, id: number) {
  return list.filter((v) => id !== v.id);
};
