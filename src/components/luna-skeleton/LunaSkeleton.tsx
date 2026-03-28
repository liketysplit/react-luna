import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaSkeletonProps } from "./LunaSkeleton.props";
import "./LunaSkeleton.css";

type SkeletonCssVariable =
  | "--luna-skeleton-current-height"
  | "--luna-skeleton-current-width"
  | "--luna-skeleton-current-radius";

type LunaSkeletonStyle = React.CSSProperties &
  Partial<Record<SkeletonCssVariable, string | number | undefined>>;

type LunaSkeletonItemStyle = React.CSSProperties &
  Partial<Record<"--luna-skeleton-current-width", string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveDimensionValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

function resolveSkeletonHeight(
  size: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!size) {
    return undefined;
  }

  const profile = theme.components.skeleton?.sizes?.[size];
  if (profile?.height) {
    return resolveDimensionValue(profile.height, theme);
  }

  return resolveDimensionValue(size, theme);
}

function resolveRadius(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function normalizeLineCount(value: number | undefined) {
  if (!value || Number.isNaN(value)) {
    return 1;
  }

  return Math.max(1, Math.floor(value));
}

export const LunaSkeleton = React.forwardRef<HTMLElement, LunaSkeletonProps>(
  function LunaSkeleton(
    {
      animation,
      as,
      className,
      decorative = true,
      height,
      inline,
      lastLineWidth,
      lines,
      shape = "text",
      size,
      style,
      width,
      ...props
    },
    ref
  ) {
    const { theme } = useTheme();
    const Component = (as ?? "div") as React.ElementType;
    const resolvedSize = size ?? theme.components.skeleton?.defaultSize ?? "medium";
    const resolvedAnimation =
      animation ?? theme.components.skeleton?.defaultAnimation ?? "wave";
    const resolvedHeight = resolveDimensionValue(height, theme) ?? resolveSkeletonHeight(resolvedSize, theme);
    const resolvedWidth =
      resolveDimensionValue(width, theme) ??
      (shape === "circle" ? resolvedHeight : inline ? undefined : "100%");
    const resolvedLineCount = shape === "text" ? normalizeLineCount(lines) : 1;
    const resolvedLastLineWidth =
      resolvedLineCount > 1
        ? resolveDimensionValue(lastLineWidth, theme) ?? "72%"
        : resolvedWidth;
    const skeletonStyle: LunaSkeletonStyle = {
      ["--luna-skeleton-current-height" as const]: resolvedHeight,
      ["--luna-skeleton-current-width" as const]: resolvedWidth,
      ["--luna-skeleton-current-radius" as const]:
        shape === "pill" || shape === "circle"
          ? resolveRadius("pill", theme)
          : shape === "text"
            ? resolveRadius(theme.components.skeleton?.textRadius, theme)
            : resolveRadius(theme.components.skeleton?.radius, theme),
      ...style
    };

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName(["luna-skeleton", className])}
        data-animation={resolvedAnimation}
        data-inline={inline ? "true" : undefined}
        data-lines={resolvedLineCount > 1 ? String(resolvedLineCount) : undefined}
        data-shape={shape}
        data-size={resolvedSize}
        aria-hidden={decorative ? true : props["aria-hidden"]}
        style={skeletonStyle}
      >
        {Array.from({ length: resolvedLineCount }).map((_, index) => {
          const isLastLine = index === resolvedLineCount - 1;
          return (
            <span
              aria-hidden="true"
              className="luna-skeleton__item"
              data-line={shape === "text" ? String(index + 1) : undefined}
              key={index}
              style={
                shape === "text" && isLastLine
                  ? ({
                      ["--luna-skeleton-current-width" as const]: resolvedLastLineWidth
                    } as LunaSkeletonItemStyle)
                  : undefined
              }
            />
          );
        })}
      </Component>
    );
  }
);
