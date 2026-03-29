import type React from "react";

export type LunaPopoverPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type LunaPopoverProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children" | "content"
> & {
  children: React.ReactElement;
  content: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: LunaPopoverPlacement;
  disabled?: boolean;
  surfaceLabel?: string;
  showArrow?: boolean;
  offset?: string;
  padding?: string;
  minWidth?: string;
  maxWidth?: string;
};
