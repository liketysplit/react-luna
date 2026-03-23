import React from "react";
import { LunaText } from "../luna-text";
import type { LunaCheckboxProps } from "./LunaCheckbox.props";
import "./LunaCheckbox.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LunaCheckbox = React.forwardRef<HTMLInputElement, LunaCheckboxProps>(
  function LunaCheckbox(
    {
      className,
      description,
      disabled,
      error,
      helpText,
      id,
      indeterminate = false,
      label,
      onChange,
      checked,
      ...inputProps
    },
    ref
  ) {
    const reactId = React.useId();
    const inputId = id ?? `luna-checkbox-${reactId.replace(/:/g, "")}`;
    const messageId = error || helpText ? `${inputId}-message` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isInvalid = error !== undefined && error !== null;

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      // Native checkbox behavior clears mixed state on direct user interaction.
      if (inputRef.current) {
        inputRef.current.indeterminate = false;
      }

      onChange?.(event);
    }

    return (
      <div
        className={toClassName([
          "luna-checkbox-field",
          disabled && "luna-checkbox-field--disabled",
          isInvalid && "luna-checkbox-field--invalid",
          className
        ])}
      >
        <label htmlFor={inputId} className="luna-checkbox-field__main">
          <input
            {...inputProps}
            ref={inputRef}
            id={inputId}
            className="luna-checkbox"
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            data-indeterminate={indeterminate ? "true" : "false"}
            aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
            aria-checked={indeterminate ? "mixed" : inputProps["aria-checked"]}
            aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
          />
          <span className="luna-checkbox__box" aria-hidden="true" />
          <span className="luna-checkbox-field__text">
            {label !== undefined && label !== null ? (
              <LunaText as="span" variant="label" className="luna-checkbox-field__label">
                {label}
              </LunaText>
            ) : null}
            {description !== undefined && description !== null ? (
              <LunaText
                id={descriptionId}
                as="span"
                variant="body-small"
                className="luna-checkbox-field__description"
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
            className="luna-checkbox-field__message luna-checkbox-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-checkbox-field__message luna-checkbox-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
