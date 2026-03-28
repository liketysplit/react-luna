import type React from "react";

export type LunaModalDismissReason = "dismiss" | "backdrop" | "escape";
export type LunaModalSize = "small" | "medium" | "large" | "full";

export type LunaModalProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: LunaModalDismissReason) => void;
  dismissible?: boolean;
  dismissLabel?: string;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  inset?: string;
  padding?: string;
  gap?: string;
  size?: LunaModalSize | string;
  rounded?: boolean;
};
