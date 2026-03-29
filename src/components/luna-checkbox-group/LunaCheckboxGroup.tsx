import React from "react";
import { LunaCheckbox } from "../luna-checkbox";
import { LunaText } from "../luna-text";
import type { LunaCheckboxGroupOption, LunaCheckboxGroupProps } from "./LunaCheckboxGroup.props";
import "./LunaCheckboxGroup.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function normalizeValues(values: readonly string[] | undefined) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.map(String);
}

function sanitizeIdPart(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

export const LunaCheckboxGroup = React.forwardRef<HTMLFieldSetElement, LunaCheckboxGroupProps>(
  function LunaCheckboxGroup(
    {
      className,
      defaultValue,
      description,
      disabled,
      error,
      helpText,
      id,
      label,
      name,
      onChange,
      options,
      style,
      value,
      ...fieldsetProps
    },
    ref
  ) {
    const reactId = React.useId();
    const fieldsetId = id ?? `luna-checkbox-group-${reactId.replace(/:/g, "")}`;
    const descriptionId = description ? `${fieldsetId}-description` : undefined;
    const messageId = error || helpText ? `${fieldsetId}-message` : undefined;
    const isInvalid = error !== undefined && error !== null;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(() => normalizeValues(defaultValue));
    const selectedValues = isControlled ? normalizeValues(value) : internalValue;
    const selectedValueSet = new Set(selectedValues);

    function updateValue(nextValue: string[]) {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    }

    function handleOptionChange(option: LunaCheckboxGroupOption, checked: boolean) {
      if (option.disabled || disabled) {
        return;
      }

      const nextValue = checked
        ? [...selectedValues.filter((entry) => entry !== option.value), option.value]
        : selectedValues.filter((entry) => entry !== option.value);

      updateValue(nextValue);
    }

    return (
      <fieldset
        {...fieldsetProps}
        ref={ref}
        id={fieldsetId}
        className={toClassName([
          "luna-checkbox-group",
          disabled && "luna-checkbox-group--disabled",
          isInvalid && "luna-checkbox-group--invalid",
          className
        ])}
        style={style}
        disabled={disabled}
        aria-invalid={isInvalid ? true : fieldsetProps["aria-invalid"]}
        aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
      >
        {label !== undefined && label !== null ? (
          <legend className="luna-checkbox-group__legend">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </legend>
        ) : null}
        {description !== undefined && description !== null ? (
          <LunaText
            id={descriptionId}
            as="p"
            variant="body-small"
            className="luna-checkbox-group__description"
          >
            {description}
          </LunaText>
        ) : null}
        <div className="luna-checkbox-group__options">
          {options.map((option, index) => {
            const optionId = `${fieldsetId}-option-${sanitizeIdPart(option.value || String(index))}`;

            return (
              <LunaCheckbox
                key={`${option.value}-${index}`}
                id={optionId}
                name={name}
                value={option.value}
                label={option.label}
                description={option.description}
                disabled={disabled || option.disabled}
                checked={selectedValueSet.has(option.value)}
                onChange={(event) => {
                  handleOptionChange(option, event.currentTarget.checked);
                }}
              />
            );
          })}
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-checkbox-group__message luna-checkbox-group__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-checkbox-group__message luna-checkbox-group__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </fieldset>
    );
  }
);
