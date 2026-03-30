import type React from "react";

export type IconVariant = "outline" | "filled";

export type IconName =
  | "menu"
  | "close"
  | "back"
  | "forward"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "add"
  | "remove"
  | "edit"
  | "delete"
  | "save"
  | "download"
  | "upload"
  | "refresh"
  | "search"
  | "filter"
  | "sort"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "loading"
  | "check"
  | "checkbox-checked"
  | "checkbox-unchecked"
  | "checkbox-indeterminate"
  | "radio-checked"
  | "radio-unchecked"
  | "toggle-on"
  | "toggle-off"
  | "show"
  | "hide"
  | "expand"
  | "collapse"
  | "user"
  | "users"
  | "settings"
  | "home"
  | "folder"
  | "file"
  | "calendar"
  | "grid"
  | "list"
  | "more"
  | "more-horizontal"
  | "more-vertical"
  | "play"
  | "pause"
  | "stop"
  | "volume"
  | "mute"
  | "luna-moon"
  | "luna-crescent"
  | "luna-star"
  | "luna-satellite"
  | "luna-rover"
  | "luna-buggy"
  | "luna-phase-new"
  | "luna-phase-waxing-crescent"
  | "luna-phase-first-quarter"
  | "luna-phase-waxing-gibbous"
  | "luna-phase-full"
  | "luna-phase-waning-gibbous"
  | "luna-phase-last-quarter"
  | "luna-phase-waning-crescent";

export const CORE_ICON_NAMES: IconName[] = [
  "menu",
  "close",
  "back",
  "forward",
  "chevron-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "add",
  "remove",
  "edit",
  "delete",
  "save",
  "download",
  "upload",
  "refresh",
  "search",
  "filter",
  "sort",
  "success",
  "warning",
  "error",
  "info",
  "loading",
  "check",
  "checkbox-checked",
  "checkbox-unchecked",
  "checkbox-indeterminate",
  "radio-checked",
  "radio-unchecked",
  "toggle-on",
  "toggle-off",
  "show",
  "hide",
  "expand",
  "collapse",
  "user",
  "users",
  "settings",
  "home",
  "folder",
  "file",
  "calendar",
  "grid",
  "list",
  "more",
  "more-horizontal",
  "more-vertical",
  "play",
  "pause",
  "stop",
  "volume",
  "mute"
];

export const LUNA_ICON_NAMES: IconName[] = [
  "luna-moon",
  "luna-crescent",
  "luna-star",
  "luna-satellite",
  "luna-rover",
  "luna-buggy",
  "luna-phase-new",
  "luna-phase-waxing-crescent",
  "luna-phase-first-quarter",
  "luna-phase-waxing-gibbous",
  "luna-phase-full",
  "luna-phase-waning-gibbous",
  "luna-phase-last-quarter",
  "luna-phase-waning-crescent"
];

export const ICON_NAMES: IconName[] = [...CORE_ICON_NAMES, ...LUNA_ICON_NAMES];

export type LunaIconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const lunaIconSizeMap: Record<LunaIconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

export type LunaIconSvgProps = Omit<React.SVGProps<SVGSVGElement>, "color"> & {
  title?: string;
  decorative?: boolean;
};
