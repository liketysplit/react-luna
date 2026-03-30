import React from "react";
import { iconRegistry } from "./internal/iconRegistry";
import type { BaseIconProps, IconVariant } from "./internal/BaseIcon";
import type { IconName } from "./internal/types";

export type LunaIconProps = BaseIconProps & {
  name: IconName;
  variant?: IconVariant;
  fallback?: React.ReactNode;
  label?: string;
};

export function LunaIcon({
  fallback = null,
  label,
  name,
  variant = "outline",
  decorative,
  title,
  ...props
}: LunaIconProps) {
  const entry = iconRegistry[name];

  if (!entry) {
    return <>{fallback}</>;
  }

  const IconComponent = entry[variant];
  const resolvedTitle = title ?? label;
  const resolvedDecorative = decorative ?? (resolvedTitle ? false : true);

  return <IconComponent {...props} decorative={resolvedDecorative} title={resolvedTitle} />;
}
