import { dataType, hiddenT } from "./App.tsx";

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

export const addToSet = function (list: dataType, set: hiddenT) {
  list.forEach((v, i) => set.add({ index: i, data: v }));
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
