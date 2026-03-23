import React from "react";
import { LunaText } from "../luna-text";
import type { LunaSliderProps } from "./LunaSlider.props";
import "./LunaSlider.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clampPercent(value: number, min: number, max: number) {
  if (max <= min) {
    return 0;
  }

  return ((value - min) / (max - min)) * 100;
}

export const LunaSlider = React.forwardRef<HTMLInputElement, LunaSliderProps>(function LunaSlider(
  {
    className,
    defaultValue,
    description,
    disabled,
    error,
    helpText,
    id,
    label,
    max = 100,
    min = 0,
    onChange,
    showValue = true,
    step,
    value,
    ...inputProps
  },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? `luna-slider-${reactId.replace(/:/g, "")}`;
  const messageId = error || helpText ? `${inputId}-message` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isInvalid = error !== undefined && error !== null;
  const initialValue =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
        ? Number(defaultValue)
        : Number(min);
  const [currentValue, setCurrentValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(Number(value));
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (value === undefined) {
      setCurrentValue(Number(event.currentTarget.value));
    }

    onChange?.(event);
  }

  const percent = clampPercent(currentValue, Number(min), Number(max));

  return (
    <div
      className={toClassName([
        "luna-slider-field",
        disabled && "luna-slider-field--disabled",
        isInvalid && "luna-slider-field--invalid",
        className
      ])}
      style={{ ["--luna-slider-percent" as string]: `${percent}%` }}
    >
      {(label !== undefined && label !== null) || showValue ? (
        <div className="luna-slider-field__header">
          {label !== undefined && label !== null ? (
            <label htmlFor={inputId} className="luna-slider-field__label">
              <LunaText as="span" variant="label">
                {label}
              </LunaText>
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <LunaText as="span" variant="caption" className="luna-slider-field__value">
              {currentValue}
            </LunaText>
          ) : null}
        </div>
      ) : null}
      {description !== undefined && description !== null ? (
        <LunaText id={descriptionId} variant="body-small" className="luna-slider-field__description">
          {description}
        </LunaText>
      ) : null}
      <input
        {...inputProps}
        id={inputId}
        ref={ref}
        className="luna-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
        aria-describedby={[descriptionId, messageId, inputProps["aria-describedby"]]
          .filter(Boolean)
          .join(" ") || undefined}
      />
      {isInvalid ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-slider-field__message luna-slider-field__message--error"
        >
          {error}
        </LunaText>
      ) : helpText !== undefined && helpText !== null ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-slider-field__message luna-slider-field__message--help"
        >
          {helpText}
        </LunaText>
      ) : null}
    </div>
  );
});
