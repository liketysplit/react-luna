import React from "react";
import { LunaText } from "../luna-text";
import type { LunaSwitchProps } from "./LunaSwitch.props";
import "./LunaSwitch.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LunaSwitch = React.forwardRef<HTMLInputElement, LunaSwitchProps>(function LunaSwitch(
  { checked, className, description, disabled, error, helpText, id, label, ...inputProps },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? `luna-switch-${reactId.replace(/:/g, "")}`;
  const messageId = error || helpText ? `${inputId}-message` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isInvalid = error !== undefined && error !== null;

  return (
    <div
      className={toClassName([
        "luna-switch-field",
        disabled && "luna-switch-field--disabled",
        isInvalid && "luna-switch-field--invalid",
        className
      ])}
    >
      <label htmlFor={inputId} className="luna-switch-field__main">
        <input
          {...inputProps}
          ref={ref}
          id={inputId}
          className="luna-switch"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
          aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
        />
        <span className="luna-switch__track" aria-hidden="true">
          <span className="luna-switch__thumb" />
        </span>
        <span className="luna-switch-field__text">
          {label !== undefined && label !== null ? (
            <LunaText as="span" variant="label" className="luna-switch-field__label">
              {label}
            </LunaText>
          ) : null}
          {description !== undefined && description !== null ? (
            <LunaText
              id={descriptionId}
              as="span"
              variant="body-small"
              className="luna-switch-field__description"
            >
              {description}
            </LunaText>
          ) : null}
        </span>
      </label>
      {isInvalid ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-switch-field__message luna-switch-field__message--error"
        >
          {error}
        </LunaText>
      ) : helpText !== undefined && helpText !== null ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-switch-field__message luna-switch-field__message--help"
        >
          {helpText}
        </LunaText>
      ) : null}
    </div>
  );
});
