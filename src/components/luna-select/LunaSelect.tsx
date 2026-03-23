import React from "react";
import { useTheme } from "../../theme";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaSelectOption, LunaSelectProps } from "./LunaSelect.props";
import "./LunaSelect.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getInitialValue(
  value: string | number | readonly string[] | undefined,
  defaultValue: string | number | readonly string[] | undefined
) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof defaultValue === "string") {
    return defaultValue;
  }

  return "";
}

function getSelectedOption(options: LunaSelectOption[], selectedValue: string) {
  return options.find((option) => option.value === selectedValue);
}

function getFirstEnabledOptionIndex(options: LunaSelectOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function getNextEnabledOptionIndex(
  options: LunaSelectOption[],
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

export const LunaSelect = React.forwardRef<HTMLSelectElement, LunaSelectProps>(function LunaSelect(
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
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    options,
    required,
    value,
    autoFocus,
    ...selectProps
  },
  ref
) {
  const { theme } = useTheme();
  const reactId = React.useId();
  const selectId = id ?? `luna-select-${reactId.replace(/:/g, "")}`;
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
  const isControlled = typeof value === "string";
  const [internalValue, setInternalValue] = React.useState(
    getInitialValue(value, defaultValue)
  );
  const selectedValue = isControlled ? String(value ?? "") : internalValue;
  const selectedOption = getSelectedOption(options, selectedValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(() => {
    const selectedIndex = options.findIndex((option) => option.value === selectedValue);
    return selectedIndex >= 0 ? selectedIndex : getFirstEnabledOptionIndex(options);
  });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const hiddenSelectRef = React.useRef<HTMLSelectElement | null>(null);
  const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);

  React.useImperativeHandle(ref, () => hiddenSelectRef.current as HTMLSelectElement, []);

  React.useEffect(() => {
    if (isControlled) {
      const selectedIndex = options.findIndex((option) => option.value === selectedValue);
      setHighlightedIndex(
        selectedIndex >= 0 ? selectedIndex : getFirstEnabledOptionIndex(options)
      );
    }
  }, [isControlled, options, selectedValue]);

  React.useEffect(() => {
    if (autoFocus) {
      triggerRef.current?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

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
  }, [isOpen]);

  function updateValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.value = nextValue;
    }

    if (onChange) {
      const syntheticEvent = {
        target: { value: nextValue, name } as EventTarget & HTMLSelectElement,
        currentTarget: { value: nextValue, name } as EventTarget & HTMLSelectElement
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  }

  function commitOption(option: LunaSelectOption) {
    if (option.disabled) {
      return;
    }

    updateValue(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function clearSelection() {
    updateValue("");
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function openList() {
    if (disabled) {
      return;
    }

    const selectedIndex = options.findIndex((option) => option.value === selectedValue);
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
    if (target?.closest(".luna-select__listbox") || target?.closest(".luna-select__clear")) {
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
          commitOption(option);
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

  const hasSelection = selectedValue.length > 0;
  const shouldFloatLabel = showInsetLabel && (isFocused || isOpen || hasSelection || hasPlaceholder);

  return (
    <div
      ref={rootRef}
      className={toClassName([
        "luna-select-field",
        fullWidth && "luna-select-field--full-width",
        showInsetLabel && "luna-select-field--inset-label",
        shouldFloatLabel && "luna-select-field--inset-label-active",
        hasSelection && "luna-select-field--has-selection",
        isOpen && "luna-select-field--open",
        disabled && "luna-select-field--disabled",
        isInvalid && "luna-select-field--invalid",
        className
      ])}
      data-size={resolvedSize}
    >
      {showExternalLabel ? (
        <div id={labelId} className="luna-select-field__label">
          <LunaText as="span" variant="label">
            {label}
          </LunaText>
        </div>
      ) : null}
      <div className="luna-select-field__control" onMouseDown={handleControlMouseDown}>
        {showInsetLabel ? (
          <div id={labelId} className="luna-select-field__label luna-select-field__label--inset">
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
          className="luna-select"
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
              "luna-select__value",
              !hasSelection && placeholder && "luna-select__value--placeholder"
            ])}
          >
            {hasSelection
              ? selectedOption?.label ?? selectedValue
              : placeholder ?? (showInsetLabel ? "" : "Select an option")}
          </span>
        </button>
        {hasSelection && !disabled ? (
          <button
            type="button"
            className="luna-select__clear"
            aria-label="Clear selection"
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearSelection}
          />
        ) : null}
        <select
          ref={hiddenSelectRef}
          tabIndex={-1}
          aria-hidden="true"
          className="luna-select__native"
          name={name}
          required={required}
          disabled={disabled}
          value={selectedValue}
          onChange={() => {}}
        >
          {placeholder ? (
            <option value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {isOpen ? (
          <div className="luna-select__listbox" id={listboxId} role="listbox" aria-labelledby={labelId}>
            {options.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled ? true : undefined}
                  className={toClassName([
                    "luna-select__option",
                    isSelected && "luna-select__option--selected",
                    isHighlighted && "luna-select__option--highlighted",
                    option.disabled && "luna-select__option--disabled"
                  ])}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => commitOption(option)}
                >
                  {option.label}
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
          className="luna-select-field__message luna-select-field__message--error"
        >
          {error}
        </LunaText>
      ) : helpText !== undefined && helpText !== null ? (
        <LunaText
          id={messageId}
          variant="caption"
          className="luna-select-field__message luna-select-field__message--help"
        >
          {helpText}
        </LunaText>
      ) : null}
    </div>
  );
});
