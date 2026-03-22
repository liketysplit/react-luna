import type React from "react";

export type LunaCardAlign = "left" | "center" | "right";

export type LunaCardProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  header?: React.ReactNode;
  actions?: React.ReactNode;
  bodyAlign?: LunaCardAlign;
  actionsAlign?: LunaCardAlign;
  actionsGap?: string;
  color?: string;
  elevated?: boolean;
  outlined?: boolean;
  flat?: boolean;
  interactive?: boolean;
  rounded?: boolean;
  padding?: string;
  gap?: string;
};
