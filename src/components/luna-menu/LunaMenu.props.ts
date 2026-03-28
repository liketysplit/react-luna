import type React from "react";

export type LunaMenuPlacement = "bottom-start" | "bottom-end";

export type LunaMenuItem = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  shortcut?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: (value: string) => void;
};

export type LunaMenuProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children" | "onSelect"
> & {
  children: React.ReactElement;
  items: LunaMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string, item: LunaMenuItem) => void;
  placement?: LunaMenuPlacement;
  menuLabel?: string;
};
