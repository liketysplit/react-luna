import type React from "react";

export type LunaHeaderAlign = "left" | "center" | "right";

export type LunaHeaderProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: LunaHeaderAlign;
  gap?: string;
};
