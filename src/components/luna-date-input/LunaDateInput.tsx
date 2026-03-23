import React from "react";
import { useTheme } from "../../theme";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaDateInputProps } from "./LunaDateInput.props";
import "./LunaDateInput.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LunaDateInput = React.forwardRef<HTMLInputElement, LunaDateInputProps>(
  function LunaDateInput(
    {
      className,
      defaultValue,
      disabled,
      error,
      externalLabel = false,
      fullWidth,
      helpText,
      id,
      inputSize,
      label,
      onBlur,
      onChange,
      value,
      ...inputProps
    },
    ref
  ) {
    const { theme } = useTheme();
    const reactId = React.useId();
    const inputId = id ?? `luna-date-input-${reactId.replace(/:/g, "")}`;
    const messageId = error || helpText ? `${inputId}-message` : undefined;
    const resolvedSize =
      inputSize ??
      ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
    const isInvalid = error !== undefined && error !== null;
    const showExternalLabel = label !== undefined && label !== null && externalLabel;
    const showInsetLabel = label !== undefined && label !== null && !externalLabel;
    const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(event);
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      onBlur?.(event);
    }

    return (
      <div
        ref={rootRef}
        className={toClassName([
          "luna-date-input-field",
          fullWidth && "luna-date-input-field--full-width",
          showInsetLabel && "luna-date-input-field--inset-label",
          showInsetLabel && "luna-date-input-field--inset-label-active",
          disabled && "luna-date-input-field--disabled",
          isInvalid && "luna-date-input-field--invalid",
          className
        ])}
        data-size={resolvedSize}
      >
        {showExternalLabel ? (
          <label htmlFor={inputId} className="luna-date-input-field__label">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </label>
        ) : null}
        <div className="luna-date-input-field__control">
          {showInsetLabel ? (
            <label
              htmlFor={inputId}
              className="luna-date-input-field__label luna-date-input-field__label--inset"
            >
              <LunaText as="span" variant="caption">
                {label}
              </LunaText>
            </label>
          ) : null}
          <div className="luna-date-input-field__content">
            <input
              {...inputProps}
              id={inputId}
              ref={ref}
              className="luna-date-input"
              type="date"
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
              onFocus={inputProps.onFocus}
              onBlur={handleBlur}
              aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
              aria-describedby={messageId ?? inputProps["aria-describedby"]}
            />
          </div>
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-date-input-field__message luna-date-input-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-date-input-field__message luna-date-input-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
