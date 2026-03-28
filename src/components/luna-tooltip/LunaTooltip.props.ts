import type React from "react";

export type LunaTooltipPlacement = "top" | "right" | "bottom" | "left";

export type LunaTooltipProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children" | "content"
> & {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: LunaTooltipPlacement;
  disabled?: boolean;
  offset?: string;
  maxWidth?: string;
};
