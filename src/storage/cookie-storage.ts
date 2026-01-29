import type { ThemeStorage } from "../types";

const isServer = typeof window === "undefined";

export const cookieStorageAdapter: ThemeStorage = {
  getItem: (key) => {
    if (isServer) return null;
    const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    return match?.[2] ?? null;
  },
  setItem: (key, value) => {
    if (isServer) return;
    document.cookie = `${key}=${value};path=/;max-age=31536000;SameSite=Lax`;
  },
  removeItem: (key) => {
    if (isServer) return;
    document.cookie = `${key}=;path=/;max-age=0`;
  },
};
