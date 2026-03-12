import React from "react";
import { useTheme } from "../../theme";
import type { LunaButtonProps } from "./LunaButton.props";
import "./LunaButton.css";

const warnedMessages = new Set<string>();

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

export const LunaButton = React.forwardRef<HTMLButtonElement, LunaButtonProps>(
  function LunaButton(
    {
      absolute,
      animation,
      block,
      bottom,
      children,
      className,
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

    const resolvedIcon = icon ?? (iconName ? <span>{iconName}</span> : null);
    const content = children ?? value;
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

    return (
      <button
        {...buttonProps}
        ref={ref}
        type={type}
        className={rootClassName}
        data-animation={animation}
        data-disabled={disabled ? "true" : undefined}
        data-icon-direction={resolvedIconDirection}
        data-loading={loading ? "true" : undefined}
        data-size={resolvedSize}
        disabled={disabled}
        style={style}
      >
        {renderLeadingIcon ? <span className="luna-button__icon">{resolvedIcon}</span> : null}
        <span className="luna-button__content">{content}</span>
        {loading ? <span aria-hidden="true" className="luna-button__loader" /> : null}
        {renderTrailingIcon ? <span className="luna-button__icon">{resolvedIcon}</span> : null}
      </button>
    );
  }
);
