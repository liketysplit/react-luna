import React from "react";
import { LunaText } from "../luna-text";
import type { LunaRadioProps } from "./LunaRadio.props";
import "./LunaRadio.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LunaRadio = React.forwardRef<HTMLInputElement, LunaRadioProps>(function LunaRadio(
  { checked, className, description, disabled, error, helpText, id, label, ...inputProps },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? `luna-radio-${reactId.replace(/:/g, "")}`;
  const messageId = error || helpText ? `${inputId}-message` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isInvalid = error !== undefined && error !== null;

  return (
    <div
      className={toClassName([
        "luna-radio-field",
        disabled && "luna-radio-field--disabled",
        isInvalid && "luna-radio-field--invalid",
        className
      ])}
    >
      <label htmlFor={inputId} className="luna-radio-field__main">
        <input
          {...inputProps}
          ref={ref}
          id={inputId}
          className="luna-radio"
          type="radio"
          checked={checked}
          disabled={disabled}
          aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
          aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
        />
        <span className="luna-radio__control" aria-hidden="true" />
        <span className="luna-radio-field__text">
          {label !== undefined && label !== null ? (
            <LunaText as="span" variant="label" className="luna-radio-field__label">
              {label}
            </LunaText>
          ) : null}
          {description !== undefined && description !== null ? (
            <LunaText
              id={descriptionId}
              as="span"
              variant="body-small"
              className="luna-radio-field__description"
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
          className="luna-radio-field__message luna-radio-field__message--error"
        >
          {error}
        </LunaText>
      ) : helpText !== undefined && helpText !== null ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-radio-field__message luna-radio-field__message--help"
        >
          {helpText}
        </LunaText>
      ) : null}
    </div>
  );
});
