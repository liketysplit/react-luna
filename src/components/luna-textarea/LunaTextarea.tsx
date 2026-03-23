import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import { useParentBackgroundVar } from "../useParentBackgroundVar";
import type { LunaTextareaProps } from "./LunaTextarea.props";
import "./LunaTextarea.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function resolveSpacingValue(
  value: string | undefined,
  theme: ReturnType<typeof useTheme>["theme"]
) {
  if (!value) {
    return undefined;
  }

  return resolveScaleValue(theme.spacing, value) ?? value;
}

export const LunaTextarea = React.forwardRef<HTMLTextAreaElement, LunaTextareaProps>(
  function LunaTextarea(
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
      maxRows,
      minHeight,
      minRows,
      height,
      onBlur,
      onChange,
      placeholder,
      resize = "none",
      rows,
      value,
      autoGrow,
      style,
      ...textareaProps
    },
    ref
  ) {
    const { theme } = useTheme();
    const reactId = React.useId();
    const textareaId = id ?? `luna-textarea-${reactId.replace(/:/g, "")}`;
    const messageId = error || helpText ? `${textareaId}-message` : undefined;
    const resolvedSize =
      inputSize ??
      ((theme.components.input?.defaultSize as "sm" | "md" | "lg" | undefined) ?? "md");
    const isInvalid = error !== undefined && error !== null;
    const showExternalLabel = label !== undefined && label !== null && externalLabel;
    const showInsetLabel = label !== undefined && label !== null && !externalLabel;
    const hasPlaceholder = typeof placeholder === "string" && placeholder.length > 0;
    const rootRef = useParentBackgroundVar<HTMLDivElement>([theme]);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isFilled, setIsFilled] = React.useState(
      value !== undefined
        ? String(value).length > 0
        : defaultValue !== undefined
          ? String(defaultValue).length > 0
          : false
    );
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);

    React.useEffect(() => {
      if (value !== undefined) {
        setIsFilled(String(value).length > 0);
      }
    }, [value]);

    const resizeTextarea = React.useCallback(() => {
      const element = textareaRef.current;

      if (!autoGrow || !element) {
        return;
      }

      element.style.height = "auto";
      const computed = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(computed.lineHeight || "0") || 24;
      const borderBox =
        Number.parseFloat(computed.borderTopWidth || "0") +
        Number.parseFloat(computed.borderBottomWidth || "0");
      const paddingBox =
        Number.parseFloat(computed.paddingTop || "0") +
        Number.parseFloat(computed.paddingBottom || "0");
      const minHeightFromRows = minRows ? lineHeight * minRows + borderBox + paddingBox : 0;
      const maxHeightFromRows = maxRows ? lineHeight * maxRows + borderBox + paddingBox : undefined;
      const nextHeight = Math.max(element.scrollHeight, minHeightFromRows || 0);

      element.style.height = `${maxHeightFromRows ? Math.min(nextHeight, maxHeightFromRows) : nextHeight}px`;
    }, [autoGrow, maxRows, minRows]);

    React.useLayoutEffect(() => {
      resizeTextarea();
    }, [resizeTextarea, value, defaultValue]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      if (value === undefined) {
        setIsFilled(event.currentTarget.value.length > 0);
      }

      onChange?.(event);
      if (autoGrow) {
        resizeTextarea();
      }
    }

    function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(true);
      textareaProps.onFocus?.(event);
    }

    function handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(false);
      if (value === undefined) {
        setIsFilled(event.currentTarget.value.length > 0);
      }
      onBlur?.(event);
    }

    const resolvedStyle = {
      ...(minHeight ? { ["--luna-textarea-min-height" as const]: resolveSpacingValue(minHeight, theme) } : {}),
      ...(height ? { ["--luna-textarea-height" as const]: resolveSpacingValue(height, theme) } : {}),
      ["--luna-textarea-resize" as const]: resize,
      ...style
    };

    const effectiveRows = rows ?? minRows ?? 3;

    return (
      <div
        ref={rootRef}
        className={toClassName([
          "luna-textarea-field",
          fullWidth && "luna-textarea-field--full-width",
          showInsetLabel && "luna-textarea-field--inset-label",
          showInsetLabel &&
            (isFocused || isFilled || hasPlaceholder) &&
            "luna-textarea-field--inset-label-active",
          disabled && "luna-textarea-field--disabled",
          isInvalid && "luna-textarea-field--invalid",
          className
        ])}
        data-size={resolvedSize}
      >
        {showExternalLabel ? (
          <label htmlFor={textareaId} className="luna-textarea-field__label">
            <LunaText as="span" variant="label">
              {label}
            </LunaText>
          </label>
        ) : null}
        <div className="luna-textarea-field__control" style={resolvedStyle}>
          {showInsetLabel ? (
            <label
              htmlFor={textareaId}
              className="luna-textarea-field__label luna-textarea-field__label--inset"
            >
              <LunaText as="span" variant="caption">
                {label}
              </LunaText>
            </label>
          ) : null}
          <textarea
            {...textareaProps}
            id={textareaId}
            ref={textareaRef}
            className="luna-textarea"
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            rows={effectiveRows}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={isInvalid ? true : textareaProps["aria-invalid"]}
            aria-describedby={messageId ?? textareaProps["aria-describedby"]}
            style={{
              minHeight: "var(--luna-textarea-min-height, auto)",
              height: autoGrow ? undefined : "var(--luna-textarea-height, auto)"
            }}
          />
        </div>
        {isInvalid ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-textarea-field__message luna-textarea-field__message--error"
          >
            {error}
          </LunaText>
        ) : helpText !== undefined && helpText !== null ? (
          <LunaText
            id={messageId}
            variant="caption"
            className="luna-textarea-field__message luna-textarea-field__message--help"
          >
            {helpText}
          </LunaText>
        ) : null}
      </div>
    );
  }
);
