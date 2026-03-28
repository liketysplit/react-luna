import type React from "react";

export type LunaTabsActivationMode = "automatic" | "manual";
export type LunaTabsOrientation = "horizontal" | "vertical";

export type LunaTabsItem = {
  value: string;
  label: React.ReactNode;
  panel: React.ReactNode;
  disabled?: boolean;
};

export type LunaTabsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> & {
  items: LunaTabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activationMode?: LunaTabsActivationMode;
  orientation?: LunaTabsOrientation;
  size?: string;
  fullWidth?: boolean;
};
