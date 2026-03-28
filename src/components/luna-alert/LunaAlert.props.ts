import type React from "react";

export type LunaAlertTone = "neutral" | "info" | "success" | "warning" | "danger";
export type LunaAlertEmphasis = "soft" | "solid" | "outline";

export type LunaAlertProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  tone?: LunaAlertTone;
  emphasis?: LunaAlertEmphasis;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  padding?: string;
  gap?: string;
  rounded?: boolean;
};
