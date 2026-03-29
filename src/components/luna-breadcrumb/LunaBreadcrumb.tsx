import React from "react";
import { useTheme } from "../../theme";
import type { LunaBreadcrumbItem, LunaBreadcrumbProps } from "./LunaBreadcrumb.props";
import "./LunaBreadcrumb.css";

type DisplayItem =
  | { kind: "item"; item: LunaBreadcrumbItem; index: number }
  | { kind: "ellipsis"; key: string };

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getCurrentIndex(items: LunaBreadcrumbItem[]) {
  const explicitIndex = items.findIndex((item) => item.current);

  if (explicitIndex >= 0) {
    return explicitIndex;
  }

  return items.length > 0 ? items.length - 1 : -1;
}

function buildDisplayItems(items: LunaBreadcrumbItem[], currentIndex: number, maxItems?: number) {
  if (!Number.isFinite(maxItems) || maxItems === undefined) {
    return items.map<DisplayItem>((item, index) => ({ kind: "item", item, index }));
  }

  const resolvedMaxItems = Math.trunc(maxItems);

  if (resolvedMaxItems < 3 || items.length <= resolvedMaxItems) {
    return items.map<DisplayItem>((item, index) => ({ kind: "item", item, index }));
  }

  const middleSlots = resolvedMaxItems - 2;
  const middleStart = 1;
  const middleEnd = items.length - 2;
  const centeredStart = currentIndex - Math.floor((middleSlots - 1) / 2);
  const start = clamp(centeredStart, middleStart, middleEnd - middleSlots + 1);
  const end = start + middleSlots - 1;
  const displayItems: DisplayItem[] = [{ kind: "item", item: items[0], index: 0 }];

  if (start > middleStart) {
    displayItems.push({ kind: "ellipsis", key: "start" });
  }

  for (let index = start; index <= end; index += 1) {
    displayItems.push({ kind: "item", item: items[index], index });
  }

  if (end < middleEnd) {
    displayItems.push({ kind: "ellipsis", key: "end" });
  }

  displayItems.push({
    kind: "item",
    item: items[items.length - 1],
    index: items.length - 1
  });

  return displayItems;
}

function getItemKey(item: LunaBreadcrumbItem, index: number) {
  if (item.key !== undefined && item.key !== null) {
    return item.key;
  }

  return `breadcrumb-item-${index}`;
}

export const LunaBreadcrumb = React.forwardRef<HTMLElement, LunaBreadcrumbProps>(
  function LunaBreadcrumb(
    {
      ariaLabel = "Breadcrumb",
      className,
      collapseLabel = "Collapsed breadcrumb items",
      items,
      maxItems,
      separator = "/",
      size,
      style,
      ...props
    },
    ref
  ) {
    const { theme } = useTheme();

    if (items.length === 0) {
      return null;
    }

    const currentIndex = getCurrentIndex(items);
    const displayItems = buildDisplayItems(items, currentIndex, maxItems);
    const resolvedSize = size ?? theme.components.breadcrumb?.defaultSize ?? "md";

    return (
      <nav
        {...props}
        ref={ref}
        className={toClassName(["luna-breadcrumb", className])}
        aria-label={ariaLabel}
        data-size={resolvedSize}
        style={style}
      >
        <ol className="luna-breadcrumb__list">
          {displayItems.map((entry, displayIndex) => {
            if (entry.kind === "ellipsis") {
              return (
                <li className="luna-breadcrumb__entry" key={`ellipsis-${entry.key}`}>
                  <span className="luna-breadcrumb__separator" aria-hidden="true">
                    {separator}
                  </span>
                  <span className="luna-breadcrumb__ellipsis" aria-label={collapseLabel} role="img">
                    …
                  </span>
                </li>
              );
            }

            const { item, index } = entry;
            const isCurrent = index === currentIndex;
            const isInteractive = !item.disabled && !isCurrent && (Boolean(item.href) || Boolean(item.onClick));
            const commonProps = {
              className: toClassName([
                "luna-breadcrumb__item",
                isCurrent && "luna-breadcrumb__item--current",
                item.disabled && "luna-breadcrumb__item--disabled"
              ]),
              "aria-current": isCurrent ? ("page" as const) : undefined,
              "aria-label": item.ariaLabel
            };

            return (
              <li className="luna-breadcrumb__entry" key={getItemKey(item, index)}>
                {displayIndex > 0 ? (
                  <span className="luna-breadcrumb__separator" aria-hidden="true">
                    {separator}
                  </span>
                ) : null}
                {isInteractive && item.href ? (
                  <a
                    {...commonProps}
                    href={item.href}
                    onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
                    target={item.target}
                    rel={item.rel}
                  >
                    {item.label}
                  </a>
                ) : isInteractive ? (
                  <button
                    {...commonProps}
                    type="button"
                    onClick={item.onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span {...commonProps}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
