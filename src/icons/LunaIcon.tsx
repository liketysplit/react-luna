import React from "react";
import { iconRegistry } from "./internal/iconRegistry";
import { lunaIconSizeMap } from "./internal/types";
import type { IconName, IconVariant, LunaIconSize, LunaIconSvgProps } from "./internal/types";

export type LunaIconProps = LunaIconSvgProps & {
  name: IconName;
  variant?: IconVariant;
  fallback?: React.ReactNode;
  label?: string;
  size?: LunaIconSize | number;
};

function resolveSize(size: LunaIconSize | number | undefined) {
  if (typeof size === "number") {
    return size;
  }

  return lunaIconSizeMap[size ?? "md"];
}

export function LunaIcon({
  fallback = null,
  label,
  name,
  variant = "outline",
  decorative,
  size,
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
  const resolvedSize = resolveSize(size);

  return (
    <IconComponent
      {...props}
      decorative={resolvedDecorative}
      height={resolvedSize}
      title={resolvedTitle}
      width={resolvedSize}
    />
  );
}
