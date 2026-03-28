import React from "react";
import { useTheme } from "../../theme";
import { resolveScaleValue } from "../../theme/resolve";
import type { LunaModalDismissReason, LunaModalProps } from "./LunaModal.props";
import "./LunaModal.css";

type ModalCssVariable =
  | "--luna-modal-padding"
  | "--luna-modal-gap"
  | "--luna-modal-inset";

type LunaModalStyle = React.CSSProperties &
  Partial<Record<ModalCssVariable, string | number | undefined>>;

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

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");
}

export const LunaModal = React.forwardRef<HTMLDivElement, LunaModalProps>(function LunaModal(
  {
    actions,
    children,
    className,
    closeOnBackdrop = true,
    closeOnEscape = true,
    defaultOpen = false,
    description,
    dismissible = true,
    dismissLabel = "Close dialog",
    gap,
    inset,
    onOpenChange,
    open,
    padding,
    rounded,
    size,
    style,
    title,
    ...props
  },
  ref
) {
  const { theme } = useTheme();
  const reactId = React.useId();
  const baseId = reactId.replace(/:/g, "");
  const titleId = title ? `luna-modal-title-${baseId}` : undefined;
  const descriptionTextId = description ? `luna-modal-description-text-${baseId}` : undefined;
  const bodyId = children !== undefined && children !== null ? `luna-modal-body-${baseId}` : undefined;
  const describedBy =
    props["aria-describedby"] ??
    ([descriptionTextId, bodyId].filter(Boolean).join(" ") || undefined);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const resolvedSize = size ?? theme.components.modal?.defaultSize ?? "medium";
  const resolvedPadding = resolveSpacingValue(padding, theme);
  const resolvedGap = resolveSpacingValue(gap, theme);
  const resolvedInset = resolveSpacingValue(inset, theme);
  const resolvedStyle: LunaModalStyle = {
    ...(resolvedPadding ? { ["--luna-modal-padding" as const]: resolvedPadding } : {}),
    ...(resolvedGap ? { ["--luna-modal-gap" as const]: resolvedGap } : {}),
    ...(resolvedInset ? { ["--luna-modal-inset" as const]: resolvedInset } : {}),
    ...style
  };

  React.useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, []);

  const closeModal = React.useCallback(
    (reason: LunaModalDismissReason) => {
      if (!isControlled) {
        setInternalOpen(false);
      }

      onOpenChange?.(false, reason);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const frameId = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const [firstFocusable] = getFocusableElements(panel);
      (firstFocusable ?? panel).focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="luna-modal" data-open="true">
      <div
        aria-hidden="true"
        className="luna-modal__backdrop"
        onClick={() => {
          if (closeOnBackdrop) {
            closeModal("backdrop");
          }
        }}
      />
      <div className="luna-modal__viewport">
        <div
          {...props}
          ref={panelRef}
          className={toClassName([
            "luna-modal__panel",
            rounded && "luna-modal__panel--rounded",
            className
          ])}
          data-size={resolvedSize}
          role={props.role ?? "dialog"}
          aria-modal={props["aria-modal"] ?? true}
          aria-labelledby={props["aria-labelledby"] ?? titleId}
          aria-describedby={describedBy}
          tabIndex={props.tabIndex ?? -1}
          style={resolvedStyle}
          onKeyDown={(event) => {
            props.onKeyDown?.(event);

            if (!event.defaultPrevented && event.key === "Escape" && closeOnEscape) {
              event.stopPropagation();
              closeModal("escape");
            }
          }}
        >
          {(title || description || dismissible) ? (
            <div className="luna-modal__header">
              <div className="luna-modal__header-copy">
                {title ? (
                  <div className="luna-modal__title" id={titleId}>
                    {title}
                  </div>
                ) : null}
                {description ? (
                  <div className="luna-modal__description" id={descriptionTextId}>
                    {description}
                  </div>
                ) : null}
              </div>
              {dismissible ? (
                <button
                  type="button"
                  className="luna-modal__dismiss"
                  aria-label={dismissLabel}
                  onClick={() => {
                    closeModal("dismiss");
                  }}
                >
                  <span aria-hidden="true">x</span>
                </button>
              ) : null}
            </div>
          ) : null}
          {children !== undefined && children !== null ? (
            <div className="luna-modal__body" id={bodyId}>
              {children}
            </div>
          ) : null}
          {actions ? <div className="luna-modal__actions">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
});
