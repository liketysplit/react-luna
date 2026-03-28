import type React from "react";
import type { LunaAlertEmphasis, LunaAlertTone } from "../luna-alert";

export type LunaNotificationDismissReason = "dismiss";

export type LunaNotificationProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  tone?: LunaAlertTone;
  emphasis?: LunaAlertEmphasis;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: LunaNotificationDismissReason) => void;
  dismissible?: boolean;
  dismissLabel?: string;
  padding?: string;
  gap?: string;
  rounded?: boolean;
};
