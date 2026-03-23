import React from "react";
import { useTheme } from "../../theme";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaAutocompleteOption, LunaAutocompleteProps } from "./LunaAutocomplete.props";
import "./LunaAutocomplete.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getInitialSelectedValue(value: string | undefined, defaultValue: string | undefined) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof defaultValue === "string") {
    return defaultValue;
  }

  return "";
}

function getSelectedOption(options: LunaAutocompleteOption[], selectedValue: string) {
  return options.find((option) => option.value === selectedValue);
}

function filterOptions(options: LunaAutocompleteOption[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return options;
  }

  return options.filter((option) => option.label.toLowerCase().includes(normalized));
}

function getFirstEnabledOptionIndex(options: LunaAutocompleteOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function getNextEnabledOptionIndex(
  options: LunaAutocompleteOption[],
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

export const LunaAutocomplete = React.forwardRef<HTMLInputElement, LunaAutocompleteProps>(
  function LunaAutocomplete(
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
      noResultsText = "No results",
      onBlur,
      onChange,
      onFocus,
      options,
      placeholder,
      required,
      style,
      value,
      ...inputProps
    },
    ref
  ) {
    const { theme } = useTheme();
    const reactId = React.useId();
    const inputId = id ?? `luna-autocomplete-${reactId.replace(/:/g, "")}`;
    const labelId = `${inputId}-label`;
    const listboxId = `${inputId}-listbox`;
    const messageId = error || helpText ? `${inputId}-message` : undefined;
    const resolvedSize =
      inputSize ??
      ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
    const isInvalid = error !== undefined && error !== null;
    const showExternalLabel = label !== undefined && label !== null && externalLabel;
    const showInsetLabel = label !== undefined && label !== null && !externalLabel;
    const hasPlaceholder = typeof placeholder === "string" && placeholder.length > 0;
    const isControlled = typeof value === "string";
    const [internalSelectedValue, setInternalSelectedValue] = React.useState(
      getInitialSelectedValue(value, defaultValue)
    );
    const selectedValue = isControlled ? String(value ?? "") : internalSelectedValue;
    const selectedOption = getSelectedOption(options, selectedValue);
    const [query, setQuery] = React.useState(selectedOption?.label ?? "");
    const [isOpen, setIsOpen] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const filteredOptions = React.useMemo(() => filterOptions(options, query), [options, query]);
    const [highlightedIndex, setHighlightedIndex] = React.useState(() =>
      getFirstEnabledOptionIndex(filteredOptions)
    );

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    React.useEffect(() => {
      const nextSelectedOption = getSelectedOption(options, selectedValue);
      setQuery(nextSelectedOption?.label ?? "");
    }, [options, selectedValue]);

    React.useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus();
      }
    }, [autoFocus]);

    React.useEffect(() => {
      const nextSelectedIndex = filteredOptions.findIndex(
        (option) => option.value === selectedValue && !option.disabled
      );

      setHighlightedIndex(
        nextSelectedIndex >= 0
          ? nextSelectedIndex
          : getFirstEnabledOptionIndex(filteredOptions)
      );
    }, [filteredOptions, selectedValue]);

    React.useEffect(() => {
      if (!isOpen) {
        return undefined;
      }

      function handlePointerDown(event: MouseEvent) {
        const target = event.target as Node;
        if (!rootRef.current?.contains(target)) {
          setIsOpen(false);
          const nextSelectedOption = getSelectedOption(options, selectedValue);
          setQuery(nextSelectedOption?.label ?? "");
        }
      }

      document.addEventListener("mousedown", handlePointerDown);
      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
      };
    }, [isOpen, options, rootRef, selectedValue]);

    function commitValue(nextValue: string) {
      if (!isControlled) {
        setInternalSelectedValue(nextValue);
      }

      onChange?.(nextValue);
    }

    function commitOption(option: LunaAutocompleteOption) {
      if (option.disabled) {
        return;
      }

      commitValue(option.value);
      setQuery(option.label);
      setIsOpen(false);
    }

    function clearValue() {
      commitValue("");
      setQuery("");
      setIsOpen(false);
      inputRef.current?.focus();
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
      setIsFocused(true);
      setIsOpen(true);
      onFocus?.(event);
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      const nextTarget = event.relatedTarget as Node | null;
      if (!rootRef.current?.contains(nextTarget)) {
        setIsFocused(false);
        setIsOpen(false);
        const nextSelectedOption = getSelectedOption(options, selectedValue);
        setQuery(nextSelectedOption?.label ?? "");
        onBlur?.(event);
      }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextQuery = event.currentTarget.value;
      setQuery(nextQuery);
      setIsOpen(true);

      if (selectedValue) {
        commitValue("");
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          setHighlightedIndex((current) =>
            getNextEnabledOptionIndex(filteredOptions, current < 0 ? -1 : current, 1)
          );
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          setHighlightedIndex((current) =>
            getNextEnabledOptionIndex(
              filteredOptions,
              current < 0 ? filteredOptions.length : current,
              -1
            )
          );
          break;
        }
        case "Enter": {
          if (!isOpen) {
            break;
          }

          event.preventDefault();
          const option = filteredOptions[highlightedIndex];
          if (option) {
            commitOption(option);
          }
          break;
        }
        case "Escape": {
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
            const nextSelectedOption = getSelectedOption(options, selectedValue);
            setQuery(nextSelectedOption?.label ?? "");
          }
          break;
        }
        default:
          break;
      }

      inputProps.onKeyDown?.(event);
    }

    function handleControlMouseDown(event: React.MouseEvent<HTMLDivElement>) {
      if (disabled) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest(".luna-autocomplete__listbox") || target?.closest(".luna-autocomplete__clear")) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
      setIsOpen(true);
    }

    const hasValue = query.length > 0;
    const shouldFloatLabel = showInsetLabel && (isFocused || isOpen || hasValue || hasPlaceholder);
    const activeDescendant =
      isOpen && highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : undefined;

    return (
      <div
        ref={rootRef}
        className={toClassName([
          "luna-autocomplete-field",
          fullWidth && "luna-autocomplete-field--full-width",
          showInsetLabel && "luna-autocomplete-field--inset-label",
          shouldFloatLabel && "luna-autocomplete-field--inset-label-active",
          selectedValue && "luna-autocomplete-field--has-selection",
          query && "luna-autocomplete-field--has-query",
          isOpen && "luna-autocomplete-field--open",
          disabled && "luna-autocomplete-field--disabled",
          isInvalid && "luna-autocomplete-field--invalid",
          className
        ])}
        data-size={resolvedSize}
        style={style}
      >
        {showExternalLabel ? (
          <label htmlFor={inputId} className="luna-autocomplete-field__label">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </label>
        ) : null}
        <div className="luna-autocomplete-field__control" onMouseDown={handleControlMouseDown}>
          {showInsetLabel ? (
            <label
              htmlFor={inputId}
              id={labelId}
              className="luna-autocomplete-field__label luna-autocomplete-field__label--inset"
            >
              <LunaText as="span" variant="caption">
                {label}
              </LunaText>
            </label>
          ) : null}
          <input
            {...inputProps}
            ref={inputRef}
            id={inputId}
            className="luna-autocomplete"
            type="text"
            value={query}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={isInvalid ? true : inputProps["aria-invalid"]}
            aria-describedby={messageId ?? inputProps["aria-describedby"]}
            aria-labelledby={label ? labelId : undefined}
            aria-controls={isOpen ? listboxId : undefined}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-activedescendant={activeDescendant}
            role="combobox"
          />
          {(selectedValue || query) && !disabled ? (
            <button
              type="button"
              className="luna-autocomplete__clear"
              aria-label="Clear value"
              onMouseDown={(event) => event.preventDefault()}
              onClick={clearValue}
            />
          ) : null}
          <input
            type="hidden"
            className="luna-autocomplete__hidden"
            name={name}
            value={selectedValue}
            required={required}
            readOnly
          />
          {isOpen ? (
            <div className="luna-autocomplete__listbox" id={listboxId} role="listbox">
              {filteredOptions.length ? (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      id={`${inputId}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled ? true : undefined}
                      className={toClassName([
                        "luna-autocomplete__option",
                        isSelected && "luna-autocomplete__option--selected",
                        isHighlighted && "luna-autocomplete__option--highlighted",
                        option.disabled && "luna-autocomplete__option--disabled"
                      ])}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => commitOption(option)}
                    >
                      {option.label}
                    </div>
                  );
                })
              ) : (
                <div className="luna-autocomplete__empty">{noResultsText}</div>
              )}
            </div>
          ) : null}
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-autocomplete-field__message luna-autocomplete-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-autocomplete-field__message luna-autocomplete-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
