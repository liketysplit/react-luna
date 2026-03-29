import React from "react";
import { LunaText } from "../luna-text";
import { LunaRadio } from "../luna-radio";
import type { LunaRadioGroupProps } from "./LunaRadioGroup.props";
import "./LunaRadioGroup.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getInitialValue(
  items: LunaRadioGroupProps["items"],
  value: string | undefined,
  defaultValue: string | undefined
) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof defaultValue === "string") {
    return defaultValue;
  }

  return items.find((item) => !item.disabled)?.value ?? "";
}

function isSelectableValue(items: LunaRadioGroupProps["items"], candidate: string | undefined) {
  if (!candidate) {
    return false;
  }

  return items.some((item) => item.value === candidate && !item.disabled);
}

export const LunaRadioGroup = React.forwardRef<HTMLFieldSetElement, LunaRadioGroupProps>(
  function LunaRadioGroup(
    {
      className,
      defaultValue,
      description,
      disabled,
      error,
      helpText,
      id,
      items,
      label,
      name,
      onValueChange,
      orientation = "vertical",
      required,
      style,
      value,
      ...fieldsetProps
    },
    ref
  ) {
    const reactId = React.useId();
    const groupId = id ?? `luna-radio-group-${reactId.replace(/:/g, "")}`;
    const descriptionId = description ? `${groupId}-description` : undefined;
    const messageId = error || helpText ? `${groupId}-message` : undefined;
    const isInvalid = error !== undefined && error !== null;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(() =>
      getInitialValue(items, value, defaultValue)
    );

    React.useEffect(() => {
      if (isControlled) {
        return;
      }

      if (isSelectableValue(items, internalValue)) {
        return;
      }

      setInternalValue(getInitialValue(items, undefined, defaultValue));
    }, [defaultValue, internalValue, isControlled, items]);

    const selectedValue = isControlled
      ? isSelectableValue(items, value) ? value : ""
      : isSelectableValue(items, internalValue) ? internalValue : "";

    function commitValue(nextValue: string) {
      if (!isSelectableValue(items, nextValue) || nextValue === selectedValue) {
        return;
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    return (
      <fieldset
        {...fieldsetProps}
        ref={ref}
        id={groupId}
        className={toClassName([
          "luna-radio-group",
          orientation === "horizontal" && "luna-radio-group--horizontal",
          disabled && "luna-radio-group--disabled",
          isInvalid && "luna-radio-group--invalid",
          className
        ])}
        style={style}
        disabled={disabled}
        aria-invalid={isInvalid ? true : fieldsetProps["aria-invalid"]}
        aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
      >
        {label !== undefined && label !== null ? (
          <LunaText as="legend" variant="label" className="luna-radio-group__label">
            {label}
          </LunaText>
        ) : null}
        {description !== undefined && description !== null ? (
          <LunaText
            id={descriptionId}
            variant="body-small"
            className="luna-radio-group__description"
          >
            {description}
          </LunaText>
        ) : null}
        <div className="luna-radio-group__items">
          {items.map((item) => (
            <LunaRadio
              key={item.value}
              name={name}
              value={item.value}
              label={item.label}
              description={item.description}
              checked={selectedValue === item.value}
              disabled={disabled || item.disabled}
              required={required}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  commitValue(item.value);
                }
              }}
            />
          ))}
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-radio-group__message luna-radio-group__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-radio-group__message luna-radio-group__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </fieldset>
    );
  }
);
