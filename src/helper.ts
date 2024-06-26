export const storageDark = "darkMode";

// Set value in localStorage
export const setLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get darkmode value from localStorage
export const getLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return storedValue ? JSON.parse(storedValue) : null;
};
