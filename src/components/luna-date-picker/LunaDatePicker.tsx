import React from "react";
import { useTheme } from "../../theme";
import { LunaButton } from "../luna-button";
import { LunaDateInput } from "../luna-date-input";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaDatePickerProps, LunaDateRangeValue } from "./LunaDatePicker.props";
import {
  addMonths,
  buildMonthGrid,
  formatDateValue,
  formatInputDate,
  isInRange,
  isOutsideLimits,
  isSameDay,
  parseInputDate,
  parseDateValue,
  startOfMonth
} from "./dateUtils";
import "./LunaDatePicker.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function weekdayLabels() {
  const formatter = new Intl.DateTimeFormat(undefined, { weekday: "short" });
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(2026, 2, 22 + index))
  );
}

function resolveSingleValue(props: LunaDatePickerProps) {
  if (props.mode === "range") {
    return undefined;
  }

  return props.value;
}

function resolveSingleDefaultValue(props: LunaDatePickerProps) {
  if (props.mode === "range") {
    return undefined;
  }

  return props.defaultValue;
}

function resolveRangeValue(props: LunaDatePickerProps): LunaDateRangeValue | undefined {
  if (props.mode !== "range") {
    return undefined;
  }

  return props.value;
}

function resolveRangeDefaultValue(props: LunaDatePickerProps): LunaDateRangeValue | undefined {
  if (props.mode !== "range") {
    return undefined;
  }

  return props.defaultValue;
}

export const LunaDatePicker = React.forwardRef<HTMLInputElement, LunaDatePickerProps>(
  function LunaDatePicker(props, ref) {
    const {
      className,
      disabled,
      error,
      externalLabel = false,
      fullWidth,
      helpText,
      id,
      inputSize,
      label,
      max,
      min,
      mode = "simple",
      buttonPosition = "post"
    } = props;

    if (mode === "simple") {
      const simpleProps = props as Extract<LunaDatePickerProps, { mode?: "simple" | "picker" }>;
      const {
        defaultValue: simpleDefaultValue,
        onChange: simpleOnChange,
        value: simpleValue,
        ...simpleNativeProps
      } = simpleProps;

      return (
        <LunaDateInput
          {...simpleNativeProps}
          ref={ref}
          id={id}
          className={className}
          disabled={disabled}
          error={error}
          externalLabel={externalLabel}
          fullWidth={fullWidth}
          helpText={helpText}
          inputSize={inputSize}
          label={label}
          min={typeof min === "string" ? min : undefined}
          max={typeof max === "string" ? max : undefined}
          value={simpleValue}
          defaultValue={simpleDefaultValue}
          onChange={(event) => simpleOnChange?.(event.currentTarget.value)}
        />
      );
    }

    const { theme } = useTheme();
    const reactId = React.useId();
    const fieldId = id ?? `luna-date-picker-${reactId.replace(/:/g, "")}`;
    const labelId = `${fieldId}-label`;
    const valueId = `${fieldId}-value`;
    const panelId = `${fieldId}-panel`;
    const messageId = error || helpText ? `${fieldId}-message` : undefined;
    const resolvedSize =
      inputSize ??
      ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
    const isInvalid = error !== undefined && error !== null;
    const showExternalLabel = label !== undefined && label !== null && externalLabel;
    const showInsetLabel = label !== undefined && label !== null && !externalLabel;
    const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);
    const primaryInputRef = React.useRef<HTMLInputElement | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const singleValue = resolveSingleValue(props);
    const singleDefaultValue = resolveSingleDefaultValue(props);
    const rangeValue = resolveRangeValue(props);
    const rangeDefaultValue = resolveRangeDefaultValue(props);
    const isRangeMode = mode === "range";
    const isControlled = isRangeMode ? rangeValue !== undefined : singleValue !== undefined;

    const [internalSingleValue, setInternalSingleValue] = React.useState(singleDefaultValue ?? "");
    const [internalRangeValue, setInternalRangeValue] = React.useState<LunaDateRangeValue>(
      rangeDefaultValue ?? {}
    );

    const selectedSingleValue = isControlled ? singleValue ?? "" : internalSingleValue;
    const selectedRangeValue = isControlled ? rangeValue ?? {} : internalRangeValue;
    const [singleDraft, setSingleDraft] = React.useState(formatInputDate(selectedSingleValue));
    const [rangeStartDraft, setRangeStartDraft] = React.useState(
      formatInputDate(selectedRangeValue.start)
    );
    const [rangeEndDraft, setRangeEndDraft] = React.useState(
      formatInputDate(selectedRangeValue.end)
    );

    const selectedDate = React.useMemo(
      () => parseDateValue(selectedSingleValue),
      [selectedSingleValue]
    );
    const rangeStart = React.useMemo(
      () => parseDateValue(selectedRangeValue.start),
      [selectedRangeValue.start]
    );
    const rangeEnd = React.useMemo(
      () => parseDateValue(selectedRangeValue.end),
      [selectedRangeValue.end]
    );

    const initialVisibleDate = rangeStart ?? selectedDate ?? startOfMonth(new Date());
    const [visibleMonth, setVisibleMonth] = React.useState(startOfMonth(initialVisibleDate));

    React.useEffect(() => {
      const nextVisibleDate = isRangeMode
        ? rangeStart ?? rangeEnd
        : selectedDate;

      if (nextVisibleDate) {
        setVisibleMonth(startOfMonth(nextVisibleDate));
      }
    }, [isRangeMode, selectedRangeValue.end, selectedRangeValue.start, selectedSingleValue]);

    React.useEffect(() => {
      setSingleDraft(formatInputDate(selectedSingleValue));
    }, [selectedSingleValue]);

    React.useEffect(() => {
      setRangeStartDraft(formatInputDate(selectedRangeValue.start));
    }, [selectedRangeValue.start]);

    React.useEffect(() => {
      setRangeEndDraft(formatInputDate(selectedRangeValue.end));
    }, [selectedRangeValue.end]);

    React.useImperativeHandle(ref, () => primaryInputRef.current as HTMLInputElement, []);

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
    }, [isOpen, rootRef]);

    function commitSingleValue(nextValue: string) {
      if (!isControlled) {
        setInternalSingleValue(nextValue);
      }

      setSingleDraft(formatInputDate(nextValue));
      (props as Extract<LunaDatePickerProps, { mode?: "simple" | "picker" }>).onChange?.(nextValue);
    }

    function commitRangeValue(nextValue: LunaDateRangeValue) {
      if (!isControlled) {
        setInternalRangeValue(nextValue);
      }

      setRangeStartDraft(formatInputDate(nextValue.start));
      setRangeEndDraft(formatInputDate(nextValue.end));
      (props as Extract<LunaDatePickerProps, { mode: "range" }>).onChange?.(nextValue);
    }

    function handleDaySelect(nextDate: Date) {
      const nextValue = formatDateValue(nextDate);

      if (isRangeMode) {
        if (!selectedRangeValue.start || (selectedRangeValue.start && selectedRangeValue.end)) {
          commitRangeValue({ start: nextValue, end: undefined });
          return;
        }

        const currentStart = parseDateValue(selectedRangeValue.start);
        if (!currentStart) {
          commitRangeValue({ start: nextValue, end: undefined });
          return;
        }

        if (nextDate.getTime() < currentStart.getTime()) {
          commitRangeValue({ start: nextValue, end: selectedRangeValue.start });
        } else {
          commitRangeValue({ start: selectedRangeValue.start, end: nextValue });
        }

        return;
      }

      commitSingleValue(nextValue);
    }

    function clearValue() {
      if (isRangeMode) {
        commitRangeValue({ start: undefined, end: undefined });
      } else {
        commitSingleValue("");
      }

      primaryInputRef.current?.focus();
    }

    function closePanel() {
      setIsOpen(false);
      primaryInputRef.current?.focus();
    }

    function handleCalendarButtonKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "Enter":
        case " ": {
          event.preventDefault();
          setIsOpen(true);
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

    function handleSingleInputBlur() {
      const parsedValue = parseInputDate(singleDraft);
      if (parsedValue === null) {
        setSingleDraft(formatInputDate(selectedSingleValue));
        return;
      }

      commitSingleValue(parsedValue);
    }

    function handleRangeStartBlur() {
      const parsedValue = parseInputDate(rangeStartDraft);
      if (parsedValue === null) {
        setRangeStartDraft(formatInputDate(selectedRangeValue.start));
        return;
      }

      commitRangeValue({
        start: parsedValue || undefined,
        end: selectedRangeValue.end
      });
    }

    function handleRangeEndBlur() {
      const parsedValue = parseInputDate(rangeEndDraft);
      if (parsedValue === null) {
        setRangeEndDraft(formatInputDate(selectedRangeValue.end));
        return;
      }

      commitRangeValue({
        start: selectedRangeValue.start,
        end: parsedValue || undefined
      });
    }

    function handleFieldBlur(event: React.FocusEvent<HTMLDivElement>) {
      const nextTarget = event.relatedTarget as Node | null;
      if (!rootRef.current?.contains(nextTarget)) {
        setIsOpen(false);
      }
    }

    const hasValue = isRangeMode
      ? Boolean(selectedRangeValue.start || selectedRangeValue.end)
      : selectedSingleValue.length > 0;
    const shouldFloatLabel = showInsetLabel;
    const monthGrid = buildMonthGrid(visibleMonth);
    const monthLabel = visibleMonth.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric"
    });
    const minValue = typeof min === "string" ? min : undefined;
    const maxValue = typeof max === "string" ? max : undefined;

    return (
      <div
        ref={rootRef}
        className={toClassName([
          "luna-date-picker-field",
          fullWidth && "luna-date-picker-field--full-width",
          showInsetLabel && "luna-date-picker-field--inset-label",
          shouldFloatLabel && "luna-date-picker-field--inset-label-active",
          hasValue && "luna-date-picker-field--has-value",
          isOpen && "luna-date-picker-field--open",
          disabled && "luna-date-picker-field--disabled",
          isInvalid && "luna-date-picker-field--invalid",
          className
        ])}
        data-size={resolvedSize}
        onBlurCapture={handleFieldBlur}
      >
        {showExternalLabel ? (
          <div id={labelId} className="luna-date-picker-field__label">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </div>
        ) : null}
        <div
          className={toClassName([
            "luna-date-picker-field__control",
            buttonPosition === "pre" && "luna-date-picker-field__control--button-pre",
            buttonPosition === "post" && "luna-date-picker-field__control--button-post"
          ])}
        >
          {showInsetLabel ? (
            <div id={labelId} className="luna-date-picker-field__label luna-date-picker-field__label--inset">
              <LunaText as="span" variant="caption">
                {label}
              </LunaText>
            </div>
          ) : null}
          <div
            className={toClassName([
              "luna-date-picker__input-group",
              isRangeMode
                ? "luna-date-picker__input-group--range"
                : "luna-date-picker__input-group--single"
            ])}
          >
            {isRangeMode ? (
              <>
                <div
                  className={toClassName([
                    "luna-date-picker__input-rail",
                    "luna-date-picker__input-rail--range-start",
                    selectedRangeValue.start
                      ? "luna-date-picker__input-rail--filled"
                      : "luna-date-picker__input-rail--empty"
                  ])}
                >
                  <input
                    id={fieldId}
                    ref={primaryInputRef}
                    className={toClassName([
                      "luna-date-picker__input",
                      "luna-date-picker__input--range-start",
                      selectedRangeValue.start
                        ? "luna-date-picker__input--filled"
                        : "luna-date-picker__input--empty"
                    ])}
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/DD/YYYY"
                    value={rangeStartDraft}
                    disabled={disabled}
                    aria-invalid={isInvalid ? true : undefined}
                    aria-describedby={messageId}
                    aria-labelledby={label ? `${labelId} ${valueId}` : valueId}
                    onChange={(event) => setRangeStartDraft(event.currentTarget.value)}
                    onBlur={handleRangeStartBlur}
                  />
                </div>
                <span id={valueId} className="luna-date-picker__range-separator">
                  to
                </span>
                <div
                  className={toClassName([
                    "luna-date-picker__input-rail",
                    "luna-date-picker__input-rail--range-end",
                    selectedRangeValue.end
                      ? "luna-date-picker__input-rail--filled"
                      : "luna-date-picker__input-rail--empty"
                  ])}
                >
                  <input
                    className={toClassName([
                      "luna-date-picker__input",
                      "luna-date-picker__input--range-end",
                      selectedRangeValue.end
                        ? "luna-date-picker__input--filled"
                        : "luna-date-picker__input--empty"
                    ])}
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/DD/YYYY"
                    value={rangeEndDraft}
                    disabled={disabled}
                    aria-invalid={isInvalid ? true : undefined}
                    aria-describedby={messageId}
                    aria-label="End date"
                    onChange={(event) => setRangeEndDraft(event.currentTarget.value)}
                    onBlur={handleRangeEndBlur}
                  />
                </div>
              </>
            ) : (
              <div
                className={toClassName([
                  "luna-date-picker__input-rail",
                  "luna-date-picker__input-rail--single",
                  selectedSingleValue
                    ? "luna-date-picker__input-rail--filled"
                    : "luna-date-picker__input-rail--empty"
                ])}
              >
                <input
                  id={fieldId}
                  ref={primaryInputRef}
                  className={toClassName([
                    "luna-date-picker__input",
                    "luna-date-picker__input--single",
                    selectedSingleValue
                      ? "luna-date-picker__input--filled"
                      : "luna-date-picker__input--empty"
                  ])}
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/DD/YYYY"
                  value={singleDraft}
                  disabled={disabled}
                  aria-invalid={isInvalid ? true : undefined}
                  aria-describedby={messageId}
                  aria-labelledby={label ? `${labelId} ${valueId}` : valueId}
                  onChange={(event) => setSingleDraft(event.currentTarget.value)}
                  onBlur={handleSingleInputBlur}
                />
              </div>
            )}
          </div>
          {hasValue && !disabled ? (
            <button
              type="button"
              className="luna-date-picker__clear"
              aria-label="Clear value"
              onMouseDown={(event) => event.preventDefault()}
              onClick={clearValue}
            />
          ) : null}
          <button
            type="button"
            className="luna-date-picker__calendar-button"
            disabled={disabled}
            aria-label="Open calendar"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls={isOpen ? panelId : undefined}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setIsOpen((current) => !current)}
            onKeyDown={handleCalendarButtonKeyDown}
          >
            <span className="luna-date-picker__calendar-icon" aria-hidden="true" />
          </button>
          {isOpen ? (
            <div className="luna-date-picker__panel" id={panelId} role="dialog" aria-labelledby={labelId}>
              <div className="luna-date-picker__calendar-header">
                <button
                  type="button"
                  className="luna-date-picker__month-nav"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                >
                  Prev
                </button>
                <LunaText as="span" variant="label" className="luna-date-picker__month-label">
                  {monthLabel}
                </LunaText>
                <button
                  type="button"
                  className="luna-date-picker__month-nav"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                >
                  Next
                </button>
              </div>
              <div className="luna-date-picker__weekday-row">
                {weekdayLabels().map((weekday) => (
                  <LunaText
                    key={weekday}
                    as="span"
                    variant="caption"
                    className="luna-date-picker__weekday"
                  >
                    {weekday}
                  </LunaText>
                ))}
              </div>
              <div className="luna-date-picker__month-grid">
                {monthGrid.map((cell) => {
                  const cellDate = cell.date;
                  const isSelectedStart = isSameDay(cellDate, rangeStart);
                  const isSelectedEnd = isSameDay(cellDate, rangeEnd);
                  const isSelectedSingle = !isRangeMode && isSameDay(cellDate, selectedDate);
                  const inRange = isRangeMode && isInRange(cellDate, rangeStart, rangeEnd);
                  const isDisabledDate = isOutsideLimits(cellDate, minValue, maxValue);

                  return (
                    <button
                      key={cell.value}
                      type="button"
                      className={toClassName([
                        "luna-date-picker__day",
                        !cell.inMonth && "luna-date-picker__day--outside-month",
                        (isSelectedSingle || isSelectedStart || isSelectedEnd) &&
                          "luna-date-picker__day--selected",
                        inRange && "luna-date-picker__day--in-range"
                      ])}
                      disabled={isDisabledDate}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleDaySelect(cellDate)}
                      aria-pressed={
                        isSelectedSingle || isSelectedStart || isSelectedEnd ? true : undefined
                      }
                      data-day-value={cell.value}
                      data-selected={isSelectedSingle || isSelectedStart || isSelectedEnd ? "true" : undefined}
                      data-in-range={inRange ? "true" : undefined}
                      data-selected-single={isSelectedSingle ? "true" : undefined}
                      data-selected-start={isSelectedStart ? "true" : undefined}
                      data-selected-end={isSelectedEnd ? "true" : undefined}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
              <div className="luna-date-picker__actions">
                <div className="luna-date-picker__actions-pre">
                  <LunaButton
                    flat
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={clearValue}
                  >
                    Clear
                  </LunaButton>
                </div>
                <div className="luna-date-picker__actions-post">
                  <LunaButton
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={closePanel}
                  >
                    {isRangeMode ? "Apply" : "Done"}
                  </LunaButton>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-date-picker-field__message luna-date-picker-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-date-picker-field__message luna-date-picker-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
