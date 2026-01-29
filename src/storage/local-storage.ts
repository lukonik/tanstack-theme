import type { ThemeStorage } from "../types";

export const localStorageAdapter: ThemeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Unsupported
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Unsupported
    }
  },
  subscribe: (key, callback) => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        callback(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  },
};
