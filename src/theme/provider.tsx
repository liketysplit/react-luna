import React from "react";
import type { DeepPartial, Theme, ThemeMode } from "./types";
import { lunarTheme } from "./base";
import { deepMerge } from "./merge";
import { buildThemeVars } from "./vars";

export type ThemeProviderProps = {
  children: React.ReactNode;
  mode?: ThemeMode;
  theme?: DeepPartial<Theme>;
  colors?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
};

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  vars: Record<string, string>;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  mode: controlledMode,
  theme,
  colors,
  className,
  style
}: ThemeProviderProps) {
  const [internalMode, setInternalMode] = React.useState<ThemeMode>(
    controlledMode ?? "light"
  );

  React.useEffect(() => {
    if (controlledMode) {
      setInternalMode(controlledMode);
    }
  }, [controlledMode]);

  const mergedTheme = React.useMemo(() => {
    const base = deepMerge(lunarTheme, theme);
    if (!colors || Object.keys(colors).length === 0) {
      return base;
    }

    return {
      ...base,
      colors: {
        ...base.colors,
        custom: {
          ...base.colors.custom,
          ...colors
        }
      }
    };
  }, [theme, colors]);

  const vars = React.useMemo(
    () => buildThemeVars(mergedTheme, internalMode),
    [mergedTheme, internalMode]
  );

  const contextValue = React.useMemo(
    () => ({ theme: mergedTheme, mode: internalMode, vars, setMode: setInternalMode }),
    [mergedTheme, internalMode, vars]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div data-luna-theme data-luna-mode={internalMode} className={className} style={{ ...vars, ...style }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}