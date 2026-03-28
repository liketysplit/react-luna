import type React from "react";

export type LunaTagProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  variant?: string;
  size?: string;
  color?: string;
  rounded?: boolean;
};
