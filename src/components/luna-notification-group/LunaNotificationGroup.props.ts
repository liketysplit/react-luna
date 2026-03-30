import type React from "react";
import type { LunaNotificationProps } from "../luna-notification";

export type LunaNotificationGroupOpenChangeReason = "toggle" | "dismiss";

export type LunaNotificationGroupItem = Pick<
  LunaNotificationProps,
  "action" | "emphasis" | "icon" | "meta" | "title" | "tone"
> & {
  body?: React.ReactNode;
};

export type LunaNotificationGroupProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "title" | "color"
> & {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  items: LunaNotificationGroupItem[];
  size?: LunaNotificationProps["size"];
  gap?: string;
  padding?: string;
  maxWidth?: string;
  rounded?: boolean;
  framed?: boolean;
  collapsible?: boolean;
  showExpand?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: LunaNotificationGroupOpenChangeReason) => void;
  dismissible?: boolean;
  showDismissAll?: boolean;
  dismissLabel?: string;
};
