import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaDrawerDismissReason, LunaDrawerProps } from "./LunaDrawer.props";
import "./LunaDrawer.css";

type DrawerCssVariable =
  | "--luna-drawer-padding"
  | "--luna-drawer-gap"
  | "--luna-drawer-inset"
  | "--luna-drawer-size";

type LunaDrawerStyle = React.CSSProperties &
  Partial<Record<DrawerCssVariable, string | number | undefined>>;

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpacingValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

export const LunaDrawer = React.forwardRef<HTMLDivElement, LunaDrawerProps>(function LunaDrawer(
  {
    children,
    className,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    defaultOpen = false,
    description,
    dismissLabel = "Dismiss drawer",
    dismissible = true,
    footer,
    gap,
    inset,
    onOpenChange,
    open,
    padding,
    placement,
    role,
    rounded,
    showOverlay = true,
    size,
    style,
    title,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const reactId = React.useId();
  const safeId = reactId.replace(/:/g, "");
  const titleId = title ? `luna-drawer-title-${safeId}` : undefined;
  const descriptionId = description ? `luna-drawer-description-${safeId}` : undefined;
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const resolvedPlacement = placement ?? theme.components.drawer?.defaultPlacement ?? "right";
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedInset = resolveSpacingValue(inset, theme);
  const resolvedSize =
    resolveSpacingValue(size, theme) ??
    resolveSpacingValue(theme.components.drawer?.defaultSize, theme) ??
    theme.components.drawer?.defaultSize;

  const closeDrawer = React.useCallback(
    (reason: LunaDrawerDismissReason) => {
      if (!isControlled) {
        setInternalOpen(false);
      }

      onOpenChange?.(false, reason);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer("escape");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDrawer, closeOnEscape, isOpen]);

  if (!isOpen) {
    return null;
  }

  const resolvedStyle: LunaDrawerStyle = {
    ...(resolvedPadding ? { ["--luna-drawer-padding" as const]: resolvedPadding } : {}),
    ...(resolvedGap ? { ["--luna-drawer-gap" as const]: resolvedGap } : {}),
    ...(resolvedInset ? { ["--luna-drawer-inset" as const]: resolvedInset } : {}),
    ...(resolvedSize ? { ["--luna-drawer-size" as const]: resolvedSize } : {}),
    ...style
  };

  return (
    <div
      {...props}
      ref={ref}
      className={toClassName(["luna-drawer", rounded && "luna-drawer--rounded", className])}
      data-overlay={showOverlay ? "true" : "false"}
      data-placement={resolvedPlacement}
      style={resolvedStyle}
    >
      {showOverlay ? (
        <div
          aria-hidden="true"
          className="luna-drawer__backdrop"
          onClick={() => {
            if (closeOnOverlayClick) {
              closeDrawer("overlay");
            }
          }}
        />
      ) : null}
      <div
        className="luna-drawer__panel"
        role={role ?? "dialog"}
        aria-modal={showOverlay ? true : undefined}
        aria-labelledby={props["aria-labelledby"] ?? titleId}
        aria-describedby={props["aria-describedby"] ?? descriptionId}
      >
        {title || description || dismissible ? (
          <div className="luna-drawer__header">
            <div className="luna-drawer__heading">
              {title ? (
                <div id={titleId} className="luna-drawer__title">
                  {title}
                </div>
              ) : null}
              {description ? (
                <div id={descriptionId} className="luna-drawer__description">
                  {description}
                </div>
              ) : null}
            </div>
            {dismissible ? (
              <button
                type="button"
                className="luna-drawer__dismiss"
                aria-label={dismissLabel}
                onClick={() => {
                  closeDrawer("dismiss");
                }}
              >
                <span aria-hidden="true">x</span>
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="luna-drawer__content">{children}</div>
        {footer ? <div className="luna-drawer__footer">{footer}</div> : null}
      </div>
    </div>
  );
});
