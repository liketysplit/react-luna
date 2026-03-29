import type React from "react";

export type LunaSidebarProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  padding?: string;
  gap?: string;
  sticky?: boolean;
  stickyOffset?: string;
};
