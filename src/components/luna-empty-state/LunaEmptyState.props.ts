import type React from "react";

export type LunaEmptyStateAlign = "left" | "center" | "right";

export type LunaEmptyStateProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  align?: LunaEmptyStateAlign;
  padding?: string;
  gap?: string;
  actionsGap?: string;
  maxWidth?: string;
  rounded?: boolean;
  framed?: boolean;
};
