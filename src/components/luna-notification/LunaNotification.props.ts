import type React from "react";
import type { IconName } from "../../icons/internal/types";
import type { LunaAlertEmphasis, LunaAlertTone } from "../luna-alert";

export type LunaNotificationDismissReason = "dismiss";
export type LunaNotificationSize = "sm" | "md" | "lg";

export type LunaNotificationProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "color"> & {
  as?: React.ElementType;
  size?: LunaNotificationSize;
  tone?: LunaAlertTone;
  emphasis?: LunaAlertEmphasis;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  iconName?: IconName;
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
