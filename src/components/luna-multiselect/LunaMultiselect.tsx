import React from "react";
import { useTheme } from "../../theme";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaMultiselectOption, LunaMultiselectProps } from "./LunaMultiselect.props";
import "./LunaMultiselect.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function normalizeValues(
  value: readonly string[] | undefined,
  defaultValue: readonly string[] | undefined
) {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue.map(String);
  }

  return [];
}

function getFirstEnabledOptionIndex(options: LunaMultiselectOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function getNextEnabledOptionIndex(
  options: LunaMultiselectOption[],
  startIndex: number,
  direction: 1 | -1
) {
  if (!options.length) {
    return -1;
  }

  let index = startIndex;

  for (let step = 0; step < options.length; step += 1) {
    index = (index + direction + options.length) % options.length;

    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getDisplayValue(options: LunaMultiselectOption[], selectedValues: string[], placeholder?: string) {
  if (!selectedValues.length) {
    return placeholder ?? "";
  }

  const firstLabel =
    options.find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];

  if (selectedValues.length === 1) {
    return firstLabel;
  }

  return `${firstLabel} (+${selectedValues.length - 1})`;
}

export const LunaMultiselect = React.forwardRef<HTMLSelectElement, LunaMultiselectProps>(
  function LunaMultiselect(
    {
      autoFocus,
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
      name,
      onBlur,
      onFocus,
      onChange,
      options,
      placeholder,
      required,
      style,
      value,
      ...selectProps
    },
    ref
  ) {
    const { theme } = useTheme();
    const reactId = React.useId();
    const selectId = id ?? `luna-multiselect-${reactId.replace(/:/g, "")}`;
    const labelId = `${selectId}-label`;
    const valueId = `${selectId}-value`;
    const listboxId = `${selectId}-listbox`;
    const messageId = error || helpText ? `${selectId}-message` : undefined;
    const resolvedSize =
      inputSize ??
      ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
    const isInvalid = error !== undefined && error !== null;
    const showExternalLabel = label !== undefined && label !== null && externalLabel;
    const showInsetLabel = label !== undefined && label !== null && !externalLabel;
    const hasPlaceholder = typeof placeholder === "string" && placeholder.length > 0;
    const isControlled = Array.isArray(value);
    const [internalValue, setInternalValue] = React.useState(() =>
      normalizeValues(value, defaultValue)
    );
    const selectedValues = isControlled ? normalizeValues(value, defaultValue) : internalValue;
    const [isOpen, setIsOpen] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [lockedWidth, setLockedWidth] = React.useState<number | null>(null);
    const [highlightedIndex, setHighlightedIndex] = React.useState(() => {
      const selectedIndex = options.findIndex((option) => selectedValues.includes(option.value));
      return selectedIndex >= 0 ? selectedIndex : getFirstEnabledOptionIndex(options);
    });
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const hiddenSelectRef = React.useRef<HTMLSelectElement | null>(null);
    const controlRef = React.useRef<HTMLDivElement | null>(null);
    const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);

    React.useImperativeHandle(ref, () => hiddenSelectRef.current as HTMLSelectElement, []);

    React.useEffect(() => {
      if (isControlled) {
        const nextValues = normalizeValues(value, defaultValue);
        const selectedIndex = options.findIndex((option) => nextValues.includes(option.value));
        setHighlightedIndex(
          selectedIndex >= 0 ? selectedIndex : getFirstEnabledOptionIndex(options)
        );
      }
    }, [defaultValue, isControlled, options, value]);

    React.useEffect(() => {
      if (!hiddenSelectRef.current) {
        return;
      }

      const nextValues = new Set(selectedValues);
      for (const option of hiddenSelectRef.current.options) {
        option.selected = nextValues.has(option.value);
      }
    }, [selectedValues]);

    React.useEffect(() => {
      if (autoFocus) {
        triggerRef.current?.focus();
      }
    }, [autoFocus]);

    React.useEffect(() => {
      if (!isOpen) {
        setLockedWidth(null);
        return undefined;
      }

      setLockedWidth(controlRef.current?.offsetWidth ?? null);

      function handlePointerDown(event: MouseEvent) {
        const target = event.target as Node;

        if (!rootRef.current?.contains(target)) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handlePointerDown);
      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
      };
    }, [isOpen, rootRef]);

    function updateValue(nextValue: string[]) {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    }

    function toggleOption(option: LunaMultiselectOption) {
      if (option.disabled) {
        return;
      }

      const isSelected = selectedValues.includes(option.value);
      const nextValue = isSelected
        ? selectedValues.filter((entry) => entry !== option.value)
        : [...selectedValues, option.value];

      updateValue(nextValue);
      triggerRef.current?.focus();
    }

    function clearSelection() {
      updateValue([]);
      setIsOpen(false);
      triggerRef.current?.focus();
    }

    function openList() {
      if (disabled) {
        return;
      }

      const selectedIndex = options.findIndex((option) => selectedValues.includes(option.value));
      setHighlightedIndex(
        selectedIndex >= 0 ? selectedIndex : getFirstEnabledOptionIndex(options)
      );
      setIsOpen(true);
    }

    function toggleList() {
      if (isOpen) {
        setIsOpen(false);
        return;
      }

      openList();
    }

    function handleControlMouseDown(event: React.MouseEvent<HTMLDivElement>) {
      if (disabled) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target?.closest(".luna-multiselect__listbox") ||
        target?.closest(".luna-multiselect__clear")
      ) {
        return;
      }

      event.preventDefault();
      triggerRef.current?.focus();
      toggleList();
    }

    function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) {
            openList();
            return;
          }
          setHighlightedIndex((current) =>
            getNextEnabledOptionIndex(options, current < 0 ? -1 : current, 1)
          );
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!isOpen) {
            openList();
            return;
          }
          setHighlightedIndex((current) =>
            getNextEnabledOptionIndex(options, current < 0 ? options.length : current, -1)
          );
          break;
        }
        case "Enter":
        case " ": {
          event.preventDefault();
          if (!isOpen) {
            openList();
            return;
          }

          const option = options[highlightedIndex];
          if (option) {
            toggleOption(option);
          }
          break;
        }
        case "Escape": {
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
          }
          break;
        }
        default:
          break;
      }
    }

    function handleTriggerFocus(event: React.FocusEvent<HTMLButtonElement>) {
      setIsFocused(true);
      onFocus?.(event as unknown as React.FocusEvent<HTMLSelectElement>);
    }

    function handleTriggerBlur(event: React.FocusEvent<HTMLButtonElement>) {
      const nextTarget = event.relatedTarget as Node | null;
      if (!rootRef.current?.contains(nextTarget)) {
        setIsFocused(false);
        setIsOpen(false);
        onBlur?.(event as unknown as React.FocusEvent<HTMLSelectElement>);
      }
    }

    const hasSelection = selectedValues.length > 0;
    const shouldFloatLabel =
      showInsetLabel && (isFocused || isOpen || hasSelection || hasPlaceholder);
    const visibleValue = getDisplayValue(options, selectedValues, placeholder);

    return (
      <div
        ref={rootRef}
        className={toClassName([
          "luna-multiselect-field",
          fullWidth && "luna-multiselect-field--full-width",
          showInsetLabel && "luna-multiselect-field--inset-label",
          shouldFloatLabel && "luna-multiselect-field--inset-label-active",
          hasSelection && "luna-multiselect-field--has-selection",
          isOpen && "luna-multiselect-field--open",
          disabled && "luna-multiselect-field--disabled",
          isInvalid && "luna-multiselect-field--invalid",
          className
        ])}
        data-size={resolvedSize}
        style={{
          ...style,
          ...(lockedWidth ? { width: `${lockedWidth}px` } : null)
        }}
      >
        {showExternalLabel ? (
          <div id={labelId} className="luna-multiselect-field__label">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </div>
        ) : null}
        <div
          ref={controlRef}
          className="luna-multiselect-field__control"
          onMouseDown={handleControlMouseDown}
        >
          {showInsetLabel ? (
            <div
              id={labelId}
              className="luna-multiselect-field__label luna-multiselect-field__label--inset"
            >
              <LunaText as="span" variant="caption">
                {label}
              </LunaText>
            </div>
          ) : null}
          <button
            {...(selectProps as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">)}
            ref={triggerRef}
            id={selectId}
            type="button"
            className="luna-multiselect"
            disabled={disabled}
            aria-invalid={isInvalid ? true : selectProps["aria-invalid"]}
            aria-describedby={messageId ?? selectProps["aria-describedby"]}
            aria-labelledby={label ? `${labelId} ${valueId}` : valueId}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listboxId : undefined}
            onKeyDown={handleTriggerKeyDown}
            onFocus={handleTriggerFocus}
            onBlur={handleTriggerBlur}
          >
            <span
              id={valueId}
              className={toClassName([
                "luna-multiselect__value",
                !hasSelection && placeholder && "luna-multiselect__value--placeholder"
              ])}
            >
              {visibleValue}
            </span>
          </button>
          {hasSelection && !disabled ? (
            <button
              type="button"
              className="luna-multiselect__clear"
              aria-label="Clear selection"
              onMouseDown={(event) => event.preventDefault()}
              onClick={clearSelection}
            />
          ) : null}
          <select
            ref={hiddenSelectRef}
            tabIndex={-1}
            aria-hidden="true"
            className="luna-multiselect__native"
            name={name}
            required={required}
            disabled={disabled}
            multiple
            value={selectedValues}
            onChange={() => {}}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {isOpen ? (
            <div
              className="luna-multiselect__listbox"
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              aria-multiselectable="true"
            >
              {options.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                const isHighlighted = index === highlightedIndex;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled ? true : undefined}
                    className={toClassName([
                      "luna-multiselect__option",
                      isSelected && "luna-multiselect__option--selected",
                      isHighlighted && "luna-multiselect__option--highlighted",
                      option.disabled && "luna-multiselect__option--disabled"
                    ])}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => toggleOption(option)}
                  >
                    <span className="luna-multiselect__option-label">{option.label}</span>
                    <span className="luna-multiselect__option-indicator" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-multiselect-field__message luna-multiselect-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-multiselect-field__message luna-multiselect-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
