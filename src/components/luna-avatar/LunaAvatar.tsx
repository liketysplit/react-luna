import React from "react";
import { useTheme } from "../../theme";
import { resolveModeTokens, resolveScaleValue, resolveTokenValue } from "../../theme/resolve";
import type { LunaAvatarProps } from "./LunaAvatar.props";
import "./LunaAvatar.css";

type AvatarCssVariable =
  | "--luna-avatar-size"
  | "--luna-avatar-font-size"
  | "--luna-avatar-bg"
  | "--luna-avatar-fg"
  | "--luna-avatar-border"
  | "--luna-avatar-radius"
  | "--luna-avatar-font-weight";

type LunaAvatarStyle = React.CSSProperties &
  Partial<Record<AvatarCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getInitials(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return undefined;
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function resolveAvatarDimensions(
  size: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!size) {
    return undefined;
  }

  const componentSize = theme.components.avatar?.sizes?.[size];
  if (componentSize) {
    return {
      size: resolveScaleValue(theme.spacing, componentSize.size) ?? componentSize.size,
      fontSize:
        resolveScaleValue(theme.typography.sizes, componentSize.fontSize) ?? componentSize.fontSize
    };
  }

  const resolvedSpacing = resolveScaleValue(theme.spacing, size) ?? size;
  return {
    size: resolvedSpacing,
    fontSize: undefined
  };
}

function resolveRadius(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.radii, value) ?? value;
}

function resolveFontWeight(
  value: string | number | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return value;
  }

  return theme.typography.weights[value] ?? value;
}

export const LunaAvatar = React.forwardRef<HTMLElement, LunaAvatarProps>(function LunaAvatar(
  {
    alt,
    as,
    className,
    fallback,
    initials,
    name,
    size,
    src,
    style,
    ...avatarProps
  },
  ref
) {
  const { mode, theme } = useTheme();
  const Component = (as ?? "span") as React.ElementType;
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
  }, [src]);

  const resolvedSize = size ?? theme.components.avatar?.defaultSize ?? "medium";
  const resolvedDimensions = resolveAvatarDimensions(resolvedSize, theme);
  const modeTokens = resolveModeTokens(theme, mode);
  const avatarModeTokens = theme.components.avatar?.modes?.[mode];
  const resolvedRadius = resolveRadius(theme.components.avatar?.radius, theme);
  const resolvedFontWeight = resolveFontWeight(theme.components.avatar?.fontWeight, theme);
  const resolvedInitials = getInitials(initials) ?? getInitials(name);
  const imageAlt = alt ?? name ?? "";
  const accessibleLabel =
    avatarProps["aria-label"] ?? alt ?? name ?? resolvedInitials ?? undefined;
  const shouldRenderImage = Boolean(src && !imageFailed);
  const contentKind = shouldRenderImage
    ? "image"
    : resolvedInitials
      ? "initials"
      : fallback !== undefined && fallback !== null
        ? "fallback"
        : "placeholder";

  const avatarStyle: LunaAvatarStyle = {
    ["--luna-avatar-size" as const]: resolvedDimensions?.size,
    ["--luna-avatar-font-size" as const]:
      resolvedDimensions?.fontSize ?? theme.typography.sizes.sm,
    ["--luna-avatar-bg" as const]:
      avatarModeTokens?.bg ? resolveTokenValue(theme, avatarModeTokens.bg) : modeTokens.surface,
    ["--luna-avatar-fg" as const]:
      avatarModeTokens?.fg ? resolveTokenValue(theme, avatarModeTokens.fg) : modeTokens.foreground,
    ["--luna-avatar-border" as const]:
      avatarModeTokens?.border ? resolveTokenValue(theme, avatarModeTokens.border) : modeTokens.border,
    ["--luna-avatar-radius" as const]: resolvedRadius,
    ["--luna-avatar-font-weight" as const]:
      resolvedFontWeight !== undefined ? String(resolvedFontWeight) : undefined,
    ...style
  };

  return (
    <Component
      {...avatarProps}
      ref={ref}
      className={toClassName(["luna-avatar", className])}
      data-content={contentKind}
      data-size={resolvedSize}
      role={!shouldRenderImage && accessibleLabel ? "img" : avatarProps.role}
      aria-hidden={!shouldRenderImage && !accessibleLabel ? true : avatarProps["aria-hidden"]}
      aria-label={!shouldRenderImage ? accessibleLabel : avatarProps["aria-label"]}
      style={avatarStyle}
    >
      {shouldRenderImage ? (
        <img
          alt={imageAlt}
          className="luna-avatar__image"
          src={src}
          onError={() => setImageFailed(true)}
        />
      ) : resolvedInitials ? (
        <span aria-hidden="true" className="luna-avatar__initials">
          {resolvedInitials}
        </span>
      ) : fallback !== undefined && fallback !== null ? (
        <span aria-hidden="true" className="luna-avatar__fallback">
          {fallback}
        </span>
      ) : (
        <span aria-hidden="true" className="luna-avatar__placeholder">
          <span className="luna-avatar__placeholder-core" />
        </span>
      )}
    </Component>
  );
});
