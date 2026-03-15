import type React from "react";

export type LunaButtonAnimation = string;
export type LunaButtonIconDirection = "left" | "right";
export type LunaButtonLoadingAnimation = "lunar" | "loading-star";

export type LunaButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "size" | "value"
> & {
  absolute?: boolean;
  animation?: LunaButtonAnimation;
  block?: boolean;
  bottom?: boolean | string | number;
  color?: string;
  dark?: boolean;
  depressed?: boolean;
  fixed?: boolean;
  flat?: boolean;
  icon?: React.ReactNode;
  iconDirection?: LunaButtonIconDirection;
  iconName?: string;
  info?: boolean;
  left?: boolean | string | number;
  light?: boolean;
  loading?: boolean;
  loadingAnimation?: LunaButtonLoadingAnimation;
  outline?: boolean;
  right?: boolean | string | number;
  rounded?: boolean;
  size?: string;
  top?: boolean | string | number;
  value?: React.ReactNode;
  fab?: boolean;
};
