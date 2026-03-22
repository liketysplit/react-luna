import type React from "react";

export type LunaCardAlign = "left" | "center" | "right";

export type LunaCardProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  titleAlign?: LunaCardAlign;
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
