import React from "react";
import { useTheme } from "../theme";
import { resolveScaleValue } from "../theme/resolve";

export type LunaLayoutBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type LunaLayoutAlias = "mobile" | "tablet" | "desktop";
export type LunaLayoutResponsiveSpan = Partial<
  Record<LunaLayoutBreakpoint | LunaLayoutAlias, number>
>;
export type LunaLayoutSpan = number | LunaLayoutResponsiveSpan | undefined;
export type LunaLayoutAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type LunaLayoutJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

const BREAKPOINTS: LunaLayoutBreakpoint[] = ["xs", "sm", "md", "lg", "xl"];
const ALIAS_MAP: Record<LunaLayoutAlias, LunaLayoutBreakpoint> = {
  mobile: "xs",
  tablet: "md",
  desktop: "lg"
};

const JUSTIFY_MAP: Record<LunaLayoutJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};

const ALIGN_MAP: Record<LunaLayoutAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline"
};

export function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function normalizeGap(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

export function normalizeLayoutSpan(span: LunaLayoutSpan): Record<LunaLayoutBreakpoint, number> {
  if (typeof span === "number") {
    return { xs: span, sm: span, md: span, lg: span, xl: span };
  }

  if (!span) {
    return { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };
  }

  const normalized: Partial<Record<LunaLayoutBreakpoint, number>> = {};

  for (const [key, value] of Object.entries(span)) {
    if (typeof value !== "number") {
      continue;
    }

    const normalizedKey =
      key in ALIAS_MAP ? ALIAS_MAP[key as LunaLayoutAlias] : (key as LunaLayoutBreakpoint);

    if (BREAKPOINTS.includes(normalizedKey)) {
      normalized[normalizedKey] = value;
    }
  }

  let last = normalized.xs ?? 12;
  const resolved: Record<LunaLayoutBreakpoint, number> = {
    xs: last,
    sm: last,
    md: last,
    lg: last,
    xl: last
  };

  for (const key of BREAKPOINTS) {
    if (normalized[key] !== undefined) {
      last = normalized[key] as number;
    }

    resolved[key] = last;
  }

  return resolved;
}

export function getChildSpan(child: React.ReactNode): LunaLayoutSpan {
  if (!React.isValidElement(child)) {
    return undefined;
  }

  const props = child.props as Record<string, unknown>;
  return (props.colSpan ?? props["data-col-span"]) as LunaLayoutSpan;
}

export function stripLayoutChildProps(child: React.ReactNode) {
  if (!React.isValidElement(child)) {
    return child;
  }

  const props = child.props as Record<string, unknown>;
  if (!("colSpan" in props) && !("data-col-span" in props)) {
    return child;
  }

  const nextProps = { ...props };
  delete nextProps.colSpan;
  delete nextProps["data-col-span"];
  return React.cloneElement(child, nextProps);
}

export function buildSpanStyle(span: LunaLayoutSpan): React.CSSProperties {
  const normalized = normalizeLayoutSpan(span);

  return {
    ["--luna-layout-span-xs" as const]: String(normalized.xs),
    ["--luna-layout-span-sm" as const]: String(normalized.sm),
    ["--luna-layout-span-md" as const]: String(normalized.md),
    ["--luna-layout-span-lg" as const]: String(normalized.lg),
    ["--luna-layout-span-xl" as const]: String(normalized.xl)
  } as React.CSSProperties;
}

export function mapAlign(value: LunaLayoutAlign | undefined) {
  if (!value) {
    return undefined;
  }

  return ALIGN_MAP[value];
}

export function mapJustify(value: LunaLayoutJustify | undefined) {
  if (!value) {
    return undefined;
  }

  return JUSTIFY_MAP[value];
}

export function wrapLayoutChildren(children: React.ReactNode, itemClassName: string) {
  return React.Children.map(children, (child, index) => {
    if (child === null || child === undefined || typeof child === "boolean") {
      return child;
    }

    return (
      <div className={itemClassName} style={buildSpanStyle(getChildSpan(child))} key={index}>
        {stripLayoutChildProps(child)}
      </div>
    );
  });
}
