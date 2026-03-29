import type React from "react";

export type LunaTopbarProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  start?: React.ReactNode;
  end?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  gap?: string;
  padding?: string;
};
