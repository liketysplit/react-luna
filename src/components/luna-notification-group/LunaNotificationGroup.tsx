import React from "react";
import { LunaIcon } from "../../icons";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import { LunaNotification } from "../luna-notification";
import { LunaText } from "../luna-text";
import type { LunaNotificationGroupProps } from "./LunaNotificationGroup.props";
import "./LunaNotificationGroup.css";

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

export const LunaNotificationGroup = React.forwardRef<HTMLElement, LunaNotificationGroupProps>(
  function LunaNotificationGroup(
    {
      actions,
      as,
      className,
      collapsible = true,
      defaultOpen = true,
      description,
      dismissible,
      dismissLabel = "Dismiss notification group",
      framed = true,
      gap,
      maxWidth,
      onOpenChange,
      open,
      items,
      padding,
      rounded,
      showDismissAll,
      showExpand,
      size = "md",
      style,
      title,
      ...props
    },
    ref
  ) {
    const { theme } = useTheme();
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [dismissed, setDismissed] = React.useState(false);
    const [dismissedItems, setDismissedItems] = React.useState<Set<number>>(() => new Set());
    const topItemRef = React.useRef<HTMLElement | null>(null);
    const [topItemHeight, setTopItemHeight] = React.useState<number | undefined>(undefined);
    const Component = (as ?? "section") as React.ElementType;
    const reactId = React.useId();
    const baseId = reactId.replace(/:/g, "");
    const titleId = title ? `luna-notification-group-title-${baseId}` : undefined;
    const itemsId = `luna-notification-group-items-${baseId}`;
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const resolvedGap = resolveSpacingValue(gap, theme);
    const resolvedPadding = resolveSpacingValue(padding, theme);
    const resolvedMaxWidth = resolveSpacingValue(maxWidth, theme);
    const resolvedControlRailWidth =
      theme.components.notificationGroup?.defaultControlRailWidth ?? "7.5%";
    const resolvedLeadingRailWidth = "12.5%";
    const visibleItems = items
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => !dismissedItems.has(index));
    const hasBody = visibleItems.length > 0;
    const canExpand = (showExpand ?? collapsible) && collapsible && hasBody;
    const canDismissAll = (showDismissAll ?? dismissible) && dismissible;
    const hasRightRail = Boolean(actions) || canDismissAll;
    const orderedItems = visibleItems.slice().reverse().slice(0, 3);
    const previewItems = orderedItems.slice(0, 3);
    const topItem = orderedItems[0];
    const remainingItems = orderedItems.slice(1);
    const resolvedStyle = {
      ...(resolvedGap ? { ["--luna-notification-group-gap" as const]: resolvedGap } : {}),
      ...(resolvedPadding ? { ["--luna-notification-group-padding" as const]: resolvedPadding } : {}),
      ...(resolvedMaxWidth
        ? { ["--luna-notification-group-max-width" as const]: resolvedMaxWidth }
        : {}),
      ["--luna-notification-group-leading-width" as const]:
        canExpand ? resolvedLeadingRailWidth : "0%",
      ["--luna-notification-group-trailing-width" as const]:
        hasRightRail ? resolvedControlRailWidth : "0%",
      ...(topItemHeight
        ? { ["--luna-notification-group-top-item-height" as const]: `${topItemHeight}px` }
        : {}),
      ...style
    };

    React.useLayoutEffect(() => {
      const node = topItemRef.current;
      if (!node) {
        setTopItemHeight(undefined);
        return undefined;
      }

      const update = () => {
        setTopItemHeight(node.getBoundingClientRect().height);
      };

      update();

      if (typeof ResizeObserver === "undefined") {
        return undefined;
      }

      const observer = new ResizeObserver(() => {
        update();
      });

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }, [isOpen, size, visibleItems.length]);

    if (dismissed || !hasBody) {
      return null;
    }

    const toggleGroup = () => {
      const nextOpen = !isOpen;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen, "toggle");
    };

    const dismissGroup = () => {
      setDismissed(true);
      onOpenChange?.(false, "dismiss");
    };

    const dismissItem = (index: number) => {
      setDismissedItems((current) => {
        const next = new Set(current);
        next.add(index);
        return next;
      });
    };

    const hasHeaderCopy = title || description;

    return (
      <Component
        {...props}
        ref={ref}
        className={toClassName([
          "luna-notification-group",
          framed && "luna-notification-group--framed",
          rounded && "luna-notification-group--rounded",
          collapsible && "luna-notification-group--collapsible",
          !isOpen && "luna-notification-group--collapsed",
          !hasBody && "luna-notification-group--header-only",
          className
        ])}
        data-size={size}
        aria-labelledby={props["aria-labelledby"] ?? titleId}
        style={resolvedStyle}
      >
        {(hasBody || hasHeaderCopy || canExpand || hasRightRail) ? (
          <div className="luna-notification-group__shell">
            <div className="luna-notification-group__main">
              {hasHeaderCopy ? (
                <div className="luna-notification-group__header-copy">
                  {title !== undefined && title !== null
                    ? typeof title === "string"
                      ? (
                        <LunaText
                          as="h2"
                          variant="label"
                          className="luna-notification-group__title"
                          id={titleId}
                        >
                          {title}
                        </LunaText>
                      )
                      : (
                        <div className="luna-notification-group__title" id={titleId}>
                          {title}
                        </div>
                      )
                    : null}
                  {description !== undefined && description !== null
                    ? typeof description === "string"
                      ? (
                        <LunaText
                          variant="body-small"
                          muted
                          className="luna-notification-group__description"
                        >
                          {description}
                        </LunaText>
                      )
                      : (
                        <div className="luna-notification-group__description">{description}</div>
                      )
                    : null}
                </div>
              ) : null}
              {topItem && !isOpen ? (
                <div className="luna-notification-group__top-row luna-notification-group__top-row--stacked">
                  <div className="luna-notification-group__leading-slot">
                    <div className="luna-notification-group__control-rail">
                      {canExpand ? (
                        <button
                          type="button"
                          className="luna-notification-group__toggle"
                          aria-controls={itemsId}
                          aria-expanded={isOpen}
                          aria-label={isOpen ? "Collapse notification group" : "Expand notification group"}
                          onClick={toggleGroup}
                        >
                          <LunaIcon
                            aria-hidden="true"
                            className="luna-notification-group__toggle-glyph"
                            name={isOpen ? "chevron-down" : "chevron-right"}
                            variant="outline"
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="luna-notification-group__top-content">
                    <div className="luna-notification-group__stack-preview" id={itemsId}>
                      {previewItems[0] ? (
                        <LunaNotification
                          key={`preview-front-${previewItems[0].index}`}
                          action={previewItems[0].item.action}
                          className="luna-notification-group__stack-front"
                          dismissible
                          emphasis={previewItems[0].item.emphasis}
                          icon={previewItems[0].item.icon}
                          iconName={previewItems[0].item.iconName}
                          meta={previewItems[0].item.meta}
                          onOpenChange={(nextOpen, reason) => {
                            if (!nextOpen && reason === "dismiss") {
                              dismissItem(previewItems[0].index);
                            }
                          }}
                          ref={topItemRef}
                          size={size}
                          title={previewItems[0].item.title}
                          tone={previewItems[0].item.tone}
                        >
                          {previewItems[0].item.body}
                        </LunaNotification>
                      ) : null}
                      {previewItems.slice(1).map(({ item, index: itemIndex }, index) => (
                        <LunaNotification
                          key={`preview-${itemIndex}`}
                          action={item.action}
                          className="luna-notification-group__stack-item"
                          dismissible
                          emphasis={item.emphasis}
                          icon={item.icon}
                          iconName={item.iconName}
                          meta={item.meta}
                          onOpenChange={(nextOpen, reason) => {
                            if (!nextOpen && reason === "dismiss") {
                              dismissItem(itemIndex);
                            }
                          }}
                          size={size}
                          style={
                            {
                              ["--luna-notification-group-stack-index" as const]: String(index + 1),
                              ["--luna-notification-group-stack-shrink" as const]:
                                `${(index + 1) * 0.875}rem`
                            } as React.CSSProperties
                          }
                          title={item.title}
                          tone={item.tone}
                        >
                          {item.body}
                        </LunaNotification>
                      ))}
                    </div>
                  </div>
                  <div className="luna-notification-group__trailing-slot">
                    <div className="luna-notification-group__control-rail luna-notification-group__control-rail--end">
                      {hasRightRail ? (
                        <div className="luna-notification-group__actions">
                          {actions}
                          {canDismissAll ? (
                            <button
                              type="button"
                              className="luna-notification-group__dismiss"
                              aria-label={dismissLabel}
                              onClick={dismissGroup}
                            >
                              <LunaIcon name="close" variant="outline" aria-hidden="true" />
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
              {hasBody && isOpen ? (
                <div className="luna-notification-group__items" id={itemsId}>
                  {topItem ? (
                    <div className="luna-notification-group__top-row">
                      <div className="luna-notification-group__leading-slot">
                        <div className="luna-notification-group__control-rail">
                          {canExpand ? (
                            <button
                              type="button"
                              className="luna-notification-group__toggle"
                              aria-controls={itemsId}
                              aria-expanded={isOpen}
                              aria-label={isOpen ? "Collapse notification group" : "Expand notification group"}
                              onClick={toggleGroup}
                            >
                              <LunaIcon
                                aria-hidden="true"
                                className="luna-notification-group__toggle-glyph"
                                name={isOpen ? "chevron-down" : "chevron-right"}
                                variant="outline"
                              />
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <div className="luna-notification-group__top-content">
                        <LunaNotification
                          key={`top-${topItem.index}`}
                          action={topItem.item.action}
                          dismissible
                          emphasis={topItem.item.emphasis}
                          icon={topItem.item.icon}
                          iconName={topItem.item.iconName}
                          meta={topItem.item.meta}
                          onOpenChange={(nextOpen, reason) => {
                            if (!nextOpen && reason === "dismiss") {
                              dismissItem(topItem.index);
                            }
                          }}
                          ref={topItemRef}
                          size={size}
                          title={topItem.item.title}
                          tone={topItem.item.tone}
                        >
                          {topItem.item.body}
                        </LunaNotification>
                      </div>
                      <div className="luna-notification-group__trailing-slot">
                        <div className="luna-notification-group__control-rail luna-notification-group__control-rail--end">
                          {hasRightRail ? (
                            <div className="luna-notification-group__actions">
                              {actions}
                              {canDismissAll ? (
                                <button
                                  type="button"
                                  className="luna-notification-group__dismiss"
                                  aria-label={dismissLabel}
                                  onClick={dismissGroup}
                                >
                                  <LunaIcon name="close" variant="outline" aria-hidden="true" />
                                </button>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {remainingItems.length > 0 ? (
                    <div className="luna-notification-group__remaining-items">
                      {remainingItems.map(({ item, index: itemIndex }) => (
                        <div className="luna-notification-group__item-row" key={`item-${itemIndex}`}>
                          <div className="luna-notification-group__leading-slot" aria-hidden="true" />
                          <div className="luna-notification-group__top-content">
                            <LunaNotification
                              key={`item-${itemIndex}`}
                              action={item.action}
                              dismissible
                              emphasis={item.emphasis}
                              icon={item.icon}
                              iconName={item.iconName}
                              meta={item.meta}
                              onOpenChange={(nextOpen, reason) => {
                                if (!nextOpen && reason === "dismiss") {
                                  dismissItem(itemIndex);
                                }
                              }}
                              size={size}
                              title={item.title}
                              tone={item.tone}
                            >
                              {item.body}
                            </LunaNotification>
                          </div>
                          <div className="luna-notification-group__trailing-slot" aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Component>
    );
  }
);
