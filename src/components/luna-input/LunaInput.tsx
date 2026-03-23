import React from "react";
import { useTheme } from "../../theme";
import { LunaText } from "../luna-text";
import type { LunaInputProps } from "./LunaInput.props";
import "./LunaInput.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LunaInput = React.forwardRef<HTMLInputElement, LunaInputProps>(function LunaInput(
  {
    onBlur,
    onChange,
    placeholder,
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
    leading,
    trailing,
    value,
    ...inputProps
  },
  ref
) {
  const { theme } = useTheme();
  const reactId = React.useId();
  const inputId = id ?? `luna-input-${reactId.replace(/:/g, "")}`;
  const messageId = error || helpText ? `${inputId}-message` : undefined;
  const resolvedSize =
    inputSize ??
    ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
  const isInvalid = error !== undefined && error !== null;
  const showExternalLabel = label !== undefined && label !== null && externalLabel;
  const showInsetLabel = label !== undefined && label !== null && !externalLabel;
  const hasPlaceholder = typeof placeholder === "string" && placeholder.length > 0;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(
    value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined
        ? String(defaultValue).length > 0
        : false
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setIsFilled(String(value).length > 0);
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (value === undefined) {
      setIsFilled(event.currentTarget.value.length > 0);
    }

    onChange?.(event);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
    inputProps.onFocus?.(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    if (value === undefined) {
      setIsFilled(event.currentTarget.value.length > 0);
    }
    onBlur?.(event);
  }

  return (
    <div
      className={toClassName([
        "luna-input-field",
        fullWidth && "luna-input-field--full-width",
        showInsetLabel && "luna-input-field--inset-label",
        showInsetLabel &&
          (isFocused || isFilled || hasPlaceholder) &&
          "luna-input-field--inset-label-active",
        disabled && "luna-input-field--disabled",
        isInvalid && "luna-input-field--invalid",
        className
      ])}
      data-size={resolvedSize}
    >
      {showExternalLabel ? (
        <label htmlFor={inputId} className="luna-input-field__label">
          <LunaText as="span" variant="label">
            {label}
          </LunaText>
        </label>
      ) : null}
      <div className="luna-input-field__control">
        {showInsetLabel ? (
          <label htmlFor={inputId} className="luna-input-field__label luna-input-field__label--inset">
            <LunaText as="span" variant="caption">
              {label}
            </LunaText>
          </label>
        ) : null}
        {leading !== undefined && leading !== null ? (
          <div className="luna-input-field__leading">{leading}</div>
        ) : null}
        <div className="luna-input-field__content">
          <input
            {...inputProps}
            id={inputId}
            ref={ref}
            className="luna-input"
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
            aria-describedby={messageId ?? inputProps["aria-describedby"]}
          />
        </div>
        {trailing !== undefined && trailing !== null ? (
          <div className="luna-input-field__trailing">{trailing}</div>
        ) : null}
      </div>
      {isInvalid ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-input-field__message luna-input-field__message--error"
        >
          {error}
        </LunaText>
      ) : helpText !== undefined && helpText !== null ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-input-field__message luna-input-field__message--help"
        >
          {helpText}
        </LunaText>
      ) : null}
    </div>
  );
});
