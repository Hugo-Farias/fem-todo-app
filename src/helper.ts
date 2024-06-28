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

export const toggleFromList = function (data: dataType, id: number): dataType {
  return data.map((item) => {
    console.log(item.id === id);
    return item.id === id ? { ...item, marked: !item.marked } : item;
  });
};

export const deleteFromList = function (data: dataType, id: number): dataType {
  return data.filter((v) => id !== v.id);
};
