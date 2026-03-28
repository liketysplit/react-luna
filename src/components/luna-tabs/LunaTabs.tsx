import React from "react";
import { useTheme } from "../../theme";
import type {
  LunaTabsActivationMode,
  LunaTabsItem,
  LunaTabsOrientation,
  LunaTabsProps
} from "./LunaTabs.props";
import "./LunaTabs.css";

const warnedMessages = new Set<string>();

function warnOnce(message: string) {
  if (!import.meta.env.DEV || warnedMessages.has(message)) {
    return;
  }

  warnedMessages.add(message);
  console.warn(message);
}

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getFirstEnabledValue(items: LunaTabsItem[]) {
  return items.find((item) => !item.disabled)?.value;
}

function resolveSelectableValue(items: LunaTabsItem[], candidate: string | undefined) {
  if (!candidate) {
    return undefined;
  }

  const match = items.find((item) => item.value === candidate);
  if (!match || match.disabled) {
    return undefined;
  }

  return match.value;
}

function findNextEnabledIndex(
  items: LunaTabsItem[],
  startIndex: number,
  direction: 1 | -1
) {
  if (!items.length) {
    return -1;
  }

  let index = startIndex;

  for (let step = 0; step < items.length; step += 1) {
    index = (index + direction + items.length) % items.length;

    if (!items[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getBoundaryEnabledIndex(items: LunaTabsItem[], direction: 1 | -1) {
  if (direction === 1) {
    return items.findIndex((item) => !item.disabled);
  }

  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (!items[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getInitialValue(
  items: LunaTabsItem[],
  value: string | undefined,
  defaultValue: string | undefined
) {
  return (
    resolveSelectableValue(items, value) ??
    resolveSelectableValue(items, defaultValue) ??
    getFirstEnabledValue(items) ??
    ""
  );
}

function getNavigationDirection(
  key: string,
  orientation: LunaTabsOrientation
): 1 | -1 | null {
  if (orientation === "vertical") {
    if (key === "ArrowDown") {
      return 1;
    }

    if (key === "ArrowUp") {
      return -1;
    }

    return null;
  }

  if (key === "ArrowRight") {
    return 1;
  }

  if (key === "ArrowLeft") {
    return -1;
  }

  return null;
}

export const LunaTabs = React.forwardRef<HTMLDivElement, LunaTabsProps>(function LunaTabs(
  {
    activationMode = "automatic",
    className,
    defaultValue,
    fullWidth,
    items,
    onValueChange,
    orientation = "horizontal",
    size,
    style,
    value,
    ...divProps
  },
  ref
) {
  const { theme } = useTheme();
  const reactId = React.useId();
  const listId = `luna-tabs-${reactId.replace(/:/g, "")}-list`;
  const defaultSize = theme.components.tabs?.defaultSize ?? "medium";
  const resolvedSize = size ?? defaultSize;
  const buttonRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const [internalValue, setInternalValue] = React.useState(() =>
    getInitialValue(items, value, defaultValue)
  );
  const selectedValue =
    resolveSelectableValue(items, value) ??
    resolveSelectableValue(items, internalValue) ??
    getFirstEnabledValue(items) ??
    "";
  const [focusValue, setFocusValue] = React.useState(selectedValue);

  React.useEffect(() => {
    const seenValues = new Set<string>();

    for (const item of items) {
      if (seenValues.has(item.value)) {
        warnOnce(`LunaTabs: duplicate item value "${item.value}" was provided.`);
      }

      seenValues.add(item.value);
    }

    if (!getFirstEnabledValue(items)) {
      warnOnce("LunaTabs: at least one enabled item is required to select a panel.");
    }

    if (value !== undefined && !resolveSelectableValue(items, value)) {
      warnOnce("LunaTabs: `value` must match an enabled item.");
    }

    if (defaultValue !== undefined && !resolveSelectableValue(items, defaultValue)) {
      warnOnce("LunaTabs: `defaultValue` must match an enabled item.");
    }
  }, [defaultValue, items, value]);

  React.useEffect(() => {
    if (value !== undefined) {
      return;
    }

    const nextValue =
      resolveSelectableValue(items, internalValue) ?? getFirstEnabledValue(items) ?? "";

    if (nextValue !== internalValue) {
      setInternalValue(nextValue);
    }
  }, [internalValue, items, value]);

  React.useEffect(() => {
    if (!resolveSelectableValue(items, focusValue)) {
      setFocusValue(selectedValue);
    }
  }, [focusValue, items, selectedValue]);

  function setButtonRef(tabValue: string, element: HTMLButtonElement | null) {
    if (element) {
      buttonRefs.current.set(tabValue, element);
      return;
    }

    buttonRefs.current.delete(tabValue);
  }

  function focusTab(tabValue: string) {
    buttonRefs.current.get(tabValue)?.focus();
  }

  function commitValue(nextValue: string) {
    if (!nextValue || nextValue === selectedValue) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function moveFocus(index: number, direction: 1 | -1, mode: LunaTabsActivationMode) {
    const nextIndex = findNextEnabledIndex(items, index, direction);
    const nextItem = nextIndex >= 0 ? items[nextIndex] : undefined;

    if (!nextItem) {
      return;
    }

    setFocusValue(nextItem.value);

    if (mode === "automatic") {
      commitValue(nextItem.value);
    }

    focusTab(nextItem.value);
  }

  function moveToBoundary(direction: 1 | -1, mode: LunaTabsActivationMode) {
    const nextIndex = getBoundaryEnabledIndex(items, direction);
    const nextItem = nextIndex >= 0 ? items[nextIndex] : undefined;

    if (!nextItem) {
      return;
    }

    setFocusValue(nextItem.value);

    if (mode === "automatic") {
      commitValue(nextItem.value);
    }

    focusTab(nextItem.value);
  }

  const resolvedStyle = {
    ["--luna-tabs-current-min-height" as const]: `var(--luna-tabs-size-${resolvedSize}-min-height, var(--luna-tabs-size-medium-min-height, 2.5rem))`,
    ["--luna-tabs-current-padding-x" as const]: `var(--luna-tabs-size-${resolvedSize}-padding-x, var(--luna-tabs-size-medium-padding-x, var(--luna-space-4, 1rem)))`,
    ["--luna-tabs-current-padding-y" as const]: `var(--luna-tabs-size-${resolvedSize}-padding-y, var(--luna-tabs-size-medium-padding-y, var(--luna-space-2, 0.5rem)))`,
    ["--luna-tabs-current-font-size" as const]: `var(--luna-tabs-size-${resolvedSize}-font-size, var(--luna-tabs-size-medium-font-size, 0.875rem))`,
    ["--luna-tabs-current-gap" as const]: `var(--luna-tabs-size-${resolvedSize}-gap, var(--luna-tabs-size-medium-gap, var(--luna-space-2, 0.5rem)))`,
    ...style
  } as React.CSSProperties;

  return (
    <div
      {...divProps}
      ref={ref}
      className={toClassName(["luna-tabs", fullWidth && "luna-tabs--full-width", className])}
      data-orientation={orientation}
      data-size={resolvedSize}
      style={resolvedStyle}
    >
      <div
        id={listId}
        className="luna-tabs__list"
        role="tablist"
        aria-orientation={orientation}
      >
        {items.map((item, index) => {
          const tabId = `${listId}-tab-${index}`;
          const panelId = `${listId}-panel-${index}`;
          const isSelected = item.value === selectedValue;
          const tabIndex = item.value === focusValue || (!focusValue && isSelected) ? 0 : -1;

          return (
            <button
              key={`${item.value}-${index}`}
              ref={(element) => setButtonRef(item.value, element)}
              id={tabId}
              type="button"
              role="tab"
              className="luna-tabs__tab"
              tabIndex={tabIndex}
              aria-controls={panelId}
              aria-selected={isSelected}
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) {
                  return;
                }

                setFocusValue(item.value);
                commitValue(item.value);
              }}
              onFocus={() => {
                if (!item.disabled) {
                  setFocusValue(item.value);
                }
              }}
              onKeyDown={(event) => {
                const direction = getNavigationDirection(event.key, orientation);

                if (direction !== null) {
                  event.preventDefault();
                  moveFocus(index, direction, activationMode);
                  return;
                }

                if (event.key === "Home") {
                  event.preventDefault();
                  moveToBoundary(1, activationMode);
                  return;
                }

                if (event.key === "End") {
                  event.preventDefault();
                  moveToBoundary(-1, activationMode);
                  return;
                }

                if (
                  activationMode === "manual" &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  commitValue(item.value);
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => {
        const panelId = `${listId}-panel-${index}`;
        const tabId = `${listId}-tab-${index}`;
        const isSelected = item.value === selectedValue;

        return (
          <div
            key={`${panelId}-${item.value}`}
            id={panelId}
            role="tabpanel"
            className="luna-tabs__panel"
            aria-labelledby={tabId}
            hidden={!isSelected}
            tabIndex={0}
          >
            {item.panel}
          </div>
        );
      })}
    </div>
  );
});
