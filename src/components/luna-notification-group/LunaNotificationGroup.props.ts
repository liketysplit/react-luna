import type React from "react";

export type LunaNotificationGroupProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "title" | "color"
> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  gap?: string;
  padding?: string;
  maxWidth?: string;
  rounded?: boolean;
  framed?: boolean;
};
