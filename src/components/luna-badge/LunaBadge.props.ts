import type React from "react";

export type LunaBadgeTone = "neutral" | "info" | "success" | "warning" | "danger";
export type LunaBadgeVariant = "soft" | "solid" | "outline";

export type LunaBadgeProps = Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
  as?: React.ElementType;
  tone?: LunaBadgeTone;
  variant?: LunaBadgeVariant;
  size?: string;
  rounded?: boolean;
};
