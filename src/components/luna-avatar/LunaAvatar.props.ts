import type React from "react";

export type LunaAvatarProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "color"
> & {
  as?: React.ElementType;
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  fallback?: React.ReactNode;
  size?: string;
};
