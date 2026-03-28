import React from "react";
import type { LunaMenuItem, LunaMenuProps } from "./LunaMenu.props";
import "./LunaMenu.css";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function composeEventHandlers<EventType extends React.SyntheticEvent>(
  originalHandler: ((event: EventType) => void) | undefined,
  nextHandler: (event: EventType) => void
) {
  return (event: EventType) => {
    originalHandler?.(event);

    if (!event.defaultPrevented) {
      nextHandler(event);
    }
  };
}

function assignRef<ValueType>(
  ref: React.ForwardedRef<ValueType> | React.Ref<ValueType> | undefined,
  value: ValueType | null
) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref && "current" in ref) {
    (ref as React.MutableRefObject<ValueType | null>).current = value;
  }
}

function getFirstEnabledItemIndex(items: LunaMenuItem[]) {
  return items.findIndex((item) => !item.disabled);
}

function getLastEnabledItemIndex(items: LunaMenuItem[]) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (!items[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getNextEnabledItemIndex(
  items: LunaMenuItem[],
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

export const LunaMenu = React.forwardRef<HTMLSpanElement, LunaMenuProps>(function LunaMenu(
  {
    children,
    className,
    defaultOpen = false,
    items,
    menuLabel = "Menu",
    onOpenChange,
    onSelect,
    open,
    placement = "bottom-start",
    ...props
  },
  ref
) {
  const rootRef = React.useRef<HTMLSpanElement | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const reactId = React.useId();
  const menuId = `luna-menu-${reactId.replace(/:/g, "")}`;
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? Boolean(open) : internalOpen;
  const [highlightedIndex, setHighlightedIndex] = React.useState(() =>
    getFirstEnabledItemIndex(items)
  );

  const child = React.Children.only(children) as React.ReactElement<any>;

  if (!React.isValidElement(child)) {
    throw new Error("LunaMenu expects a single React element child.");
  }

  const childProps = child.props as {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    ["aria-disabled"]?: boolean | "true" | "false";
  };
  const childIsDisabled =
    childProps.disabled === true ||
    childProps["aria-disabled"] === true ||
    childProps["aria-disabled"] === "true";

  function setMenuOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    if (nextOpen !== isOpen) {
      onOpenChange?.(nextOpen);
    }
  }

  function openMenu(targetIndex: number) {
    if (childIsDisabled) {
      return;
    }

    setHighlightedIndex(targetIndex);
    setMenuOpen(true);
  }

  function closeMenu({ restoreFocus = false }: { restoreFocus?: boolean } = {}) {
    setMenuOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }

  function selectItem(item: LunaMenuItem) {
    if (item.disabled) {
      return;
    }

    closeMenu({ restoreFocus: true });
    item.onSelect?.(item.value);
    onSelect?.(item.value, item);
  }

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const fallbackIndex = getFirstEnabledItemIndex(items);
    const nextIndex =
      highlightedIndex >= 0 && !items[highlightedIndex]?.disabled
        ? highlightedIndex
        : fallbackIndex;

    setHighlightedIndex(nextIndex);

    if (nextIndex >= 0) {
      itemRefs.current[nextIndex]?.focus();
    }
  }, [highlightedIndex, isOpen, items]);

  const firstEnabledIndex = getFirstEnabledItemIndex(items);
  const lastEnabledIndex = getLastEnabledItemIndex(items);

  const trigger = React.cloneElement(child, {
    "aria-controls": isOpen ? menuId : undefined,
    "aria-expanded": isOpen ? true : undefined,
    "aria-haspopup": "menu",
    onClick: composeEventHandlers(childProps.onClick, (event: React.MouseEvent<HTMLElement>) => {
      triggerRef.current = event.currentTarget;

      if (isOpen) {
        closeMenu();
        return;
      }

      openMenu(firstEnabledIndex);
    }),
    onKeyDown: composeEventHandlers(childProps.onKeyDown, (event: React.KeyboardEvent<HTMLElement>) => {
      triggerRef.current = event.currentTarget;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          openMenu(firstEnabledIndex);
          break;
        case "ArrowUp":
          event.preventDefault();
          openMenu(lastEnabledIndex);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (isOpen) {
            closeMenu();
            return;
          }
          openMenu(firstEnabledIndex);
          break;
        case "Escape":
          if (isOpen) {
            event.preventDefault();
            closeMenu();
          }
          break;
        default:
          break;
      }
    })
  } as Record<string, unknown>);

  return (
    <span
      {...props}
      ref={(value) => {
        rootRef.current = value;
        assignRef(ref, value);
      }}
      className={toClassName(["luna-menu", className])}
      data-open={isOpen ? "true" : "false"}
      data-placement={placement}
    >
      {trigger}
      {isOpen ? (
        <div id={menuId} className="luna-menu__surface" role="menu" aria-label={menuLabel}>
          {items.map((item, index) => (
            <button
              key={item.value}
              ref={(value) => {
                itemRefs.current[index] = value;
              }}
              type="button"
              role="menuitem"
              className={toClassName([
                "luna-menu__item",
                item.destructive && "luna-menu__item--destructive"
              ])}
              data-highlighted={highlightedIndex === index ? "true" : "false"}
              disabled={item.disabled}
              tabIndex={highlightedIndex === index ? 0 : -1}
              onMouseEnter={() => {
                if (!item.disabled) {
                  setHighlightedIndex(index);
                }
              }}
              onClick={() => {
                selectItem(item);
              }}
              onKeyDown={(event) => {
                switch (event.key) {
                  case "ArrowDown":
                    event.preventDefault();
                    setHighlightedIndex((current) =>
                      getNextEnabledItemIndex(items, current < 0 ? -1 : current, 1)
                    );
                    break;
                  case "ArrowUp":
                    event.preventDefault();
                    setHighlightedIndex((current) =>
                      getNextEnabledItemIndex(
                        items,
                        current < 0 ? items.length : current,
                        -1
                      )
                    );
                    break;
                  case "Home":
                    event.preventDefault();
                    setHighlightedIndex(firstEnabledIndex);
                    break;
                  case "End":
                    event.preventDefault();
                    setHighlightedIndex(lastEnabledIndex);
                    break;
                  case "Escape":
                    event.preventDefault();
                    closeMenu({ restoreFocus: true });
                    break;
                  case "Tab":
                    closeMenu();
                    break;
                  default:
                    break;
                }
              }}
            >
              <span className="luna-menu__body">
                <span className="luna-menu__label">{item.label}</span>
                {item.description ? (
                  <span className="luna-menu__description">{item.description}</span>
                ) : null}
              </span>
              {item.shortcut ? (
                <span className="luna-menu__shortcut" aria-hidden="true">
                  {item.shortcut}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
});
