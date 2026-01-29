import {
  localStorageScript,
  sessionStorageScript,
  cookieStorageScript,
} from "tanstack-theme";
import type { BuiltInStorage, ThemeStorage } from "../types";
import { localStorageAdapter } from "./local-storage";
import { sessionStorageAdapter } from "./session-storage";
import { cookieStorageAdapter } from "./cookie-storage";

export const isBuiltInStorage = (
  storage: BuiltInStorage | ThemeStorage | undefined,
): storage is BuiltInStorage => {
  return (
    storage === undefined ||
    storage === "localStorage" ||
    storage === "sessionStorage" ||
    storage === "cookie"
  );
};

export const getStorageAdapter = (
  storage: BuiltInStorage | ThemeStorage = "localStorage",
): ThemeStorage => {
  if (!isBuiltInStorage(storage)) {
    return storage;
  }
  switch (storage) {
    case "sessionStorage":
      return sessionStorageAdapter;
    case "cookie":
      return cookieStorageAdapter;
    case "localStorage":
    default:
      return localStorageAdapter;
  }
};

export const getStorageScript = (
  storage: BuiltInStorage | ThemeStorage | undefined,
) => {
  const type = isBuiltInStorage(storage) ? storage : undefined;
  switch (type) {
    case "sessionStorage":
      return sessionStorageScript;
    case "cookie":
      return cookieStorageScript;
    case "localStorage":
    case undefined:
    default:
      return localStorageScript;
  }
};
