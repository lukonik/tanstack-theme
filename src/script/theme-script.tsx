import { memo } from "react";
import { ScriptOnce } from "../ScriptOnce";
import { getStorageScript } from "../storage/storage";
import type { ThemeProviderProps } from "../types";

export const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themes,
    scriptProps,
    storage = "localStorage",
  }: Omit<ThemeProviderProps, "children"> & {
    defaultTheme: string;
  }) => {
    const script = getStorageScript(storage);
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme,
    ]).slice(1, -1);
    return (
      <ScriptOnce
        attributes={scriptProps}
        children={`(${script.toString()})(${scriptArgs})`}
      />
    );
  },
);
