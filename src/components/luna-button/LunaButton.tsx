import React from "react";
import { LunaIcon } from "../../icons/LunaIcon";
import type { IconName } from "../../icons/internal";
import { useTheme } from "../../theme";
import { resolveTokenValue } from "../../theme/resolve";
import type { LunaButtonProps } from "./LunaButton.props";
import "./LunaButton.css";

const warnedMessages = new Set<string>();
const LEGACY_ANIMATION_MAP: Record<string, string> = {
  bounce: "bounce 3s infinite",
  wiggle: "wiggle 4s infinite",
  pulse: "pulse 2s infinite"
};

function warnOnce(message: string) {
  if (!import.meta.env.DEV || warnedMessages.has(message)) {
    return;
  }

  warnedMessages.add(message);
  console.warn(message);
}

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function hasDirectionalValue(value: boolean | string | number | undefined) {
  return value !== undefined && value !== false;
}

function resolveButtonColor(value: string | undefined, theme: ReturnType<typeof useTheme>["theme"]) {
  if (!value) {
    return undefined;
  }

  return resolveTokenValue(theme, value);
}

function resolveAnimation(animation: string | undefined) {
  if (!animation) {
    return undefined;
  }

  const legacyAnimation = LEGACY_ANIMATION_MAP[animation];
  const animationValue = (legacyAnimation ?? animation).trim();
  const [name, ...rest] = animationValue.split(/\s+/);

  if (!name) {
    return undefined;
  }

  if (rest.length < 2) {
    warnOnce(
      "LunaButton: `animation` should follow \"<name> <duration> <iterationCount>\"."
    );
    return undefined;
  }

  const keyframesName =
    name === "lunarPulse" ? "luna-button-lunar-pulse" : `luna-button-${name}`;

  return [keyframesName, ...rest].join(" ");
}

export const LunaButton = React.forwardRef<HTMLButtonElement, LunaButtonProps>(
  function LunaButton(
    {
      absolute,
      animation,
      block,
      bottom,
      children,
      className,
      color,
      dark,
      depressed,
      disabled,
      fab,
      fixed,
      flat,
      icon,
      iconDirection,
      iconName,
      info,
      left,
      light,
      loading,
      loadingAnimation = "lunar",
      outline,
      right,
      rounded,
      size,
      style,
      top,
      type = "button",
      value,
      ...buttonProps
    },
    ref
  ) {
    const { theme } = useTheme();
    const resolvedSize = size ?? theme.components.button?.defaultSize ?? "medium";
    const resolvedIconDirection =
      iconDirection ?? theme.components.button?.defaultIconDirection ?? "right";
    const resolvedColor = resolveButtonColor(color, theme);
    const resolvedAnimation = resolveAnimation(animation);

    if (absolute && fixed) {
      warnOnce("LunaButton: `fixed` overrides `absolute` when both are provided.");
    }

    if (
      (hasDirectionalValue(top) ||
        hasDirectionalValue(right) ||
        hasDirectionalValue(bottom) ||
        hasDirectionalValue(left)) &&
      !absolute &&
      !fixed
    ) {
      warnOnce(
        "LunaButton: `top`, `right`, `bottom`, and `left` require `absolute` or `fixed`."
      );
    }

    if (icon && iconName) {
      warnOnce("LunaButton: `icon` overrides `iconName` when both are provided.");
    }

    if (info && (outline || flat || depressed)) {
      warnOnce(
        "LunaButton: `info` overrides `outline`, `flat`, and `depressed` when combined."
      );
    }

    if (fab && rounded) {
      warnOnce("LunaButton: `fab` overrides `rounded` when both are provided.");
    }

    const content = children ?? value;
    const resolvedIcon =
      icon ??
      (iconName ? (
        <LunaIcon
          name={iconName as IconName}
          size="md"
          label={typeof content === "string" ? `${content} icon` : `${iconName} icon`}
        />
      ) : null);
    const hasContent = content !== undefined && content !== null && content !== false;
    const renderLeadingIcon = resolvedIcon && resolvedIconDirection === "left";
    const renderTrailingIcon = resolvedIcon && resolvedIconDirection === "right";
    const rootClassName = toClassName([
      "luna-button",
      fixed && "luna-button--fixed",
      !fixed && absolute && "luna-button--absolute",
      block && "luna-button--block",
      info && "luna-button--info",
      !info && outline && "luna-button--outline",
      !info && flat && "luna-button--flat",
      !info && depressed && "luna-button--depressed",
      !info && !fab && rounded && "luna-button--rounded",
      !info && fab && "luna-button--fab",
      light && "luna-button--light",
      dark && "luna-button--dark",
      className
    ]);
    const resolvedStyle = {
      ...(resolvedAnimation ? { animation: resolvedAnimation } : {}),
      ...(resolvedColor
        ? info
          ? { ["--luna-btn-info-color" as const]: resolvedColor }
          : { ["--luna-btn-bg" as const]: resolvedColor }
        : {}),
      ...style
    };

    return (
      <button
        {...buttonProps}
        ref={ref}
        type={type}
        className={rootClassName}
        aria-busy={loading ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-icon-direction={resolvedIconDirection}
        data-loading={loading ? "true" : undefined}
        data-loading-animation={loading ? loadingAnimation : undefined}
        data-size={resolvedSize}
        disabled={disabled}
        style={resolvedStyle}
      >
        {renderLeadingIcon ? <span className="luna-button__icon">{resolvedIcon}</span> : null}
        {hasContent ? <span className="luna-button__content">{content}</span> : null}
        {loading ? (
          <span aria-hidden="true" className="luna-button__loader">
            {loadingAnimation === "loading-star" ? (
              <span className="luna-button__loader-star" />
            ) : (
              <span className="luna-button__loader-phases">
                <span className="luna-button__moon luna-button__moon--new" />
                <span className="luna-button__moon luna-button__moon--waxing" />
                <span className="luna-button__moon luna-button__moon--full" />
                <span className="luna-button__moon luna-button__moon--waning" />
                <span className="luna-button__moon luna-button__moon--faint" />
              </span>
            )}
          </span>
        ) : null}
        {renderTrailingIcon ? <span className="luna-button__icon">{resolvedIcon}</span> : null}
      </button>
    );
  }
);
