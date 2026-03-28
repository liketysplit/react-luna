import type React from "react";

export type LunaSkeletonAnimation = "pulse" | "wave" | "none";
export type LunaSkeletonShape = "text" | "block" | "pill" | "circle";

export type LunaSkeletonProps = Omit<React.HTMLAttributes<HTMLElement>, "children" | "color"> & {
  as?: React.ElementType;
  shape?: LunaSkeletonShape;
  size?: string;
  width?: string;
  height?: string;
  lines?: number;
  lastLineWidth?: string;
  animation?: LunaSkeletonAnimation;
  inline?: boolean;
  decorative?: boolean;
};
