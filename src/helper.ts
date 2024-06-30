import { dataType } from "./App.tsx";

export const storageThemeKey = "darkMode";

// Set value in localStorage
export const setLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get value from localStorage
export const getLocalStorage = (key: string, fallback: boolean) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }
  return storedValue ? JSON.parse(storedValue) : null;
};

export const addToList = function (list: dataType, value: string): dataType {
  return [{ id: new Date().getTime(), name: value, marked: false }, ...list];
};

export const toggleFromList = function (list: dataType, id: number): dataType {
  return list.map((item) => {
    return item.id === id ? { ...item, marked: !item.marked } : item;
  });
};

export const deleteFromList = function (list: dataType, id: number): dataType {
  return list.filter((v) => id !== v.id);
};
