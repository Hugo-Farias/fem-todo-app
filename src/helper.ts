import { dataType } from "./App.tsx";

export const storageThemeKey = "darkMode";
export const storageListKey = "list";

// Set value in localStorage
export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get value from localStorage
export const getLocalStorage = <T>(key: string, fallback: T) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }
  return storedValue ? JSON.parse(storedValue) : null;
};

export const addToList = function (list: dataType, value: string): dataType {
  return [{ id: new Date().getTime(), name: value, marked: false }, ...list];
};

export const addToIndex = function (list: dataType, index: number) {
  return list.splice(index, 1);
};

export const toggleFromList = function (list: dataType, id: number): dataType {
  return list.map((item) => {
    return item.id === id ? { ...item, marked: !item.marked } : item;
  });
};

export const deleteFromList = function (list: dataType, id: number): dataType {
  return list.filter((v) => id !== v.id);
};

export const clearList = function (list: dataType): dataType {
  return list.filter((v) => !v.marked);
};
