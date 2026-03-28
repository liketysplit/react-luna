import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaText } from "../luna-text";
import type {
  LunaAccordionItem,
  LunaAccordionProps,
  LunaAccordionValue
} from "./LunaAccordion.props";
import "./LunaAccordion.css";

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

function clampHeadingLevel(level: number | undefined) {
  if (!level) {
    return 3;
  }

  return Math.min(6, Math.max(2, level)) as 2 | 3 | 4 | 5 | 6;
}

function normalizeValue(value: LunaAccordionValue | undefined, multiple: boolean): string[] {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    const normalized = value.filter((entry) => typeof entry === "string");
    return multiple ? normalized : normalized.slice(0, 1);
  }

  return value ? [value] : [];
}

function toPublicValue(values: string[], multiple: boolean): LunaAccordionValue {
  if (multiple) {
    return values;
  }

  return values[0] ?? null;
}

function nextOpenValues(
  currentValues: string[],
  item: LunaAccordionItem,
  multiple: boolean,
  collapsible: boolean
) {
  if (item.disabled) {
    return currentValues;
  }

  const isOpen = currentValues.includes(item.value);

  if (multiple) {
    if (isOpen) {
      return collapsible ? currentValues.filter((value) => value !== item.value) : currentValues;
    }

    return [...currentValues, item.value];
  }

  if (isOpen) {
    return collapsible ? [] : currentValues;
  }

  return [item.value];
}

export const LunaAccordion = React.forwardRef<HTMLDivElement, LunaAccordionProps>(
  function LunaAccordion(
    {
      className,
      collapsible = true,
      defaultValue,
      gap,
      headingLevel = 3,
      itemGap,
      items,
      multiple = false,
      onValueChange,
      panelPadding,
      rounded,
      style,
      value,
      ...props
    },
    ref
  ) {
    const reactId = React.useId();
    const { theme } = useTheme();
    const resolvedHeadingLevel = clampHeadingLevel(headingLevel);
    const HeadingTag = `h${resolvedHeadingLevel}` as keyof React.JSX.IntrinsicElements;
    const isControlled = value !== undefined;
    const resolvedGap = resolveSpacingValue(gap, theme);
    const resolvedItemGap = resolveSpacingValue(itemGap, theme);
    const resolvedPanelPadding = resolveSpacingValue(panelPadding, theme);
    const [internalValue, setInternalValue] = React.useState<LunaAccordionValue>(() =>
      toPublicValue(normalizeValue(defaultValue, multiple), multiple)
    );
    const openValues = normalizeValue(isControlled ? value : internalValue, multiple);

    React.useEffect(() => {
      if (!isControlled) {
        setInternalValue(toPublicValue(normalizeValue(defaultValue, multiple), multiple));
      }
    }, [defaultValue, isControlled, multiple]);

    const resolvedStyle = {
      ...(resolvedGap ? { ["--luna-accordion-gap" as const]: resolvedGap } : {}),
      ...(resolvedItemGap ? { ["--luna-accordion-item-gap" as const]: resolvedItemGap } : {}),
      ...(resolvedPanelPadding
        ? { ["--luna-accordion-panel-padding" as const]: resolvedPanelPadding }
        : {}),
      ...style
    };

    function handleToggle(item: LunaAccordionItem) {
      const nextValue = toPublicValue(
        nextOpenValues(openValues, item, multiple, collapsible),
        multiple
      );

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    return (
      <div
        {...props}
        ref={ref}
        className={toClassName([
          "luna-accordion",
          rounded && "luna-accordion--rounded",
          className
        ])}
        style={resolvedStyle}
      >
        {items.map((item, index) => {
          const itemId = `${reactId.replace(/:/g, "")}-${item.value || index}`;
          const triggerId = `${itemId}-trigger`;
          const panelId = `${itemId}-panel`;
          const isOpen = openValues.includes(item.value);

          return (
            <div
              key={item.value}
              className="luna-accordion__item"
              data-disabled={item.disabled ? "true" : undefined}
              data-state={isOpen ? "open" : "closed"}
            >
              <HeadingTag className="luna-accordion__heading">
                <button
                  id={triggerId}
                  type="button"
                  className="luna-accordion__trigger"
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  disabled={item.disabled}
                  onClick={() => handleToggle(item)}
                >
                  <span className="luna-accordion__trigger-content">
                    {typeof item.title === "string" ? (
                      <LunaText as="span" variant="label" className="luna-accordion__title">
                        {item.title}
                      </LunaText>
                    ) : (
                      <span className="luna-accordion__title">{item.title}</span>
                    )}
                    {item.description !== undefined && item.description !== null
                      ? typeof item.description === "string"
                        ? (
                          <LunaText
                            as="span"
                            variant="body-small"
                            className="luna-accordion__description"
                          >
                            {item.description}
                          </LunaText>
                        )
                        : (
                          <span className="luna-accordion__description">{item.description}</span>
                        )
                      : null}
                  </span>
                  <span aria-hidden="true" className="luna-accordion__indicator">
                    <svg viewBox="0 0 16 16" width="16" height="16" focusable="false">
                      <path
                        d="M4 6.5 8 10l4-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </span>
                </button>
              </HeadingTag>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="luna-accordion__panel"
                hidden={!isOpen}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
