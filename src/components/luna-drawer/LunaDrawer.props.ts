import type React from "react";

export type LunaDrawerPlacement = "left" | "right" | "top" | "bottom";
export type LunaDrawerDismissReason = "dismiss" | "overlay" | "escape";

export type LunaDrawerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "color"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: LunaDrawerDismissReason) => void;
  placement?: LunaDrawerPlacement;
  size?: string;
  inset?: string;
  padding?: string;
  gap?: string;
  rounded?: boolean;
  dismissible?: boolean;
  dismissLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showOverlay?: boolean;
};
