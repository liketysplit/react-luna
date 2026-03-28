import type React from "react";
import type { LunaAlertEmphasis, LunaAlertTone } from "../luna-alert";

export type LunaToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type LunaToastDismissReason = "dismiss" | "timeout";

export type LunaToastProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "color"> & {
  tone?: LunaAlertTone;
  emphasis?: LunaAlertEmphasis;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: LunaToastDismissReason) => void;
  duration?: number;
  pauseOnHover?: boolean;
  dismissible?: boolean;
  dismissLabel?: string;
  placement?: LunaToastPlacement;
  inset?: string;
  padding?: string;
  gap?: string;
  rounded?: boolean;
};
