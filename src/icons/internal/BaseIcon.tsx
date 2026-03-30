import * as React from "react";

export type IconVariant = "outline" | "filled";
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export type BaseIconProps = Omit<React.SVGProps<SVGSVGElement>, "color"> & {
  size?: IconSize | number;
  title?: string;
  decorative?: boolean;
};

function resolveSize(size: IconSize | number | undefined) {
  if (typeof size === "number") return size;
  return SIZE_MAP[size ?? "md"];
}

export function OutlineIcon({
  size,
  title,
  decorative = true,
  children,
  ...props
}: React.PropsWithChildren<BaseIconProps>) {
  const resolvedSize = resolveSize(size);

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function FilledIcon({
  size,
  title,
  decorative = true,
  children,
  ...props
}: React.PropsWithChildren<BaseIconProps>) {
  const resolvedSize = resolveSize(size);

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}
