import type React from "react";

export type LunaHoverTextProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  hoverContent: React.ReactNode;
  disabled?: boolean;
  focusable?: boolean;
  color?: string;
  hoverColor?: string;
};
