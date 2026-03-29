import type { Theme } from "./types";
import { resolveModeTokens, resolveTokenValue, resolveScaleValue } from "./resolve";

function resolveFontWeightValue(theme: Theme, value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return String(theme.typography.weights[value] ?? value);
}

export function buildThemeVars(theme: Theme, mode: "light" | "dark"): Record<string, string> {
  const vars: Record<string, string> = {};
  const modeTokens = resolveModeTokens(theme, mode);

  vars["--luna-background"] = modeTokens.background;
  vars["--luna-foreground"] = modeTokens.foreground;
  vars["--luna-surface"] = modeTokens.surface;
  vars["--luna-border"] = modeTokens.border;
  vars["--luna-muted"] = modeTokens.muted;

  vars["--luna-font-family"] = theme.typography.fontFamily;

  for (const [name, scale] of Object.entries(theme.colors.scale)) {
    for (const [level, value] of Object.entries(scale)) {
      vars[`--luna-color-${name}-${level}`] = value;
    }
  }

  for (const [name, value] of Object.entries(theme.colors.custom)) {
    vars[`--luna-color-${name}`] = resolveTokenValue(theme, value);
  }

  for (const [name, value] of Object.entries(theme.spacing)) {
    vars[`--luna-space-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.radii)) {
    vars[`--luna-radius-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.shadows)) {
    vars[`--luna-shadow-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.motion)) {
    vars[`--luna-motion-${name}`] = value;
  }

  const button = theme.components.button;
  if (button?.defaultSize) {
    vars["--luna-btn-size-default"] = button.defaultSize;
  }
  if (button?.defaultIconDirection) {
    vars["--luna-btn-icon-direction-default"] = button.defaultIconDirection;
  }
  if (button?.radius) {
    vars["--luna-btn-radius"] = resolveScaleValue(theme.radii, button.radius) ?? button.radius;
  }
  if (button?.fontWeight) {
    vars["--luna-btn-font-weight"] = String(button.fontWeight);
  }
  const buttonMode = button?.modes?.[mode];
  if (buttonMode?.bg) {
    vars["--luna-btn-bg-default"] = resolveTokenValue(theme, buttonMode.bg);
  }
  if (buttonMode?.fg) {
    vars["--luna-btn-fg-default"] = resolveTokenValue(theme, buttonMode.fg);
  }
  if (buttonMode?.hoverBg) {
    vars["--luna-btn-hover-bg"] = resolveTokenValue(theme, buttonMode.hoverBg);
  }
  if (buttonMode?.outlineFg) {
    vars["--luna-btn-outline-fg"] = resolveTokenValue(theme, buttonMode.outlineFg);
  }
  if (buttonMode?.outlineBorder) {
    vars["--luna-btn-outline-border"] = resolveTokenValue(theme, buttonMode.outlineBorder);
  }
  if (buttonMode?.outlineHoverBg) {
    vars["--luna-btn-outline-hover-bg"] = resolveTokenValue(theme, buttonMode.outlineHoverBg);
  }
  if (buttonMode?.flatFg) {
    vars["--luna-btn-flat-fg"] = resolveTokenValue(theme, buttonMode.flatFg);
  }
  if (buttonMode?.infoFg) {
    vars["--luna-btn-info-fg"] = resolveTokenValue(theme, buttonMode.infoFg);
  }
  if (buttonMode?.infoHoverFg) {
    vars["--luna-btn-info-hover-fg"] = resolveTokenValue(theme, buttonMode.infoHoverFg);
  }
  if (button?.sizes) {
    for (const [name, profile] of Object.entries(button.sizes)) {
      if (profile.paddingX) {
        vars[`--luna-btn-size-${name}-padding-x`] =
          resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX;
      }
      if (profile.paddingY) {
        vars[`--luna-btn-size-${name}-padding-y`] =
          resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY;
      }
      if (profile.fontSize) {
        vars[`--luna-btn-size-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.minHeight) {
        vars[`--luna-btn-size-${name}-min-height`] =
          resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight;
      }
      if (profile.gap) {
        vars[`--luna-btn-size-${name}-gap`] =
          resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap;
      }
      if (profile.iconSize) {
        vars[`--luna-btn-size-${name}-icon-size`] =
          resolveScaleValue(theme.typography.sizes, profile.iconSize) ?? profile.iconSize;
      }
    }
  }

  const text = theme.components.text;
  if (text?.defaultVariant) {
    vars["--luna-text-variant-default"] = text.defaultVariant;
  }
  const textMode = text?.modes?.[mode];
  if (textMode?.fg) {
    vars["--luna-text-fg"] = resolveTokenValue(theme, textMode.fg);
  }
  if (textMode?.mutedFg) {
    vars["--luna-text-muted-fg"] = resolveTokenValue(theme, textMode.mutedFg);
  }
  if (textMode?.surfaceBg) {
    vars["--luna-text-surface-bg"] = resolveTokenValue(theme, textMode.surfaceBg);
  }
  if (textMode?.surfaceBorder) {
    vars["--luna-text-surface-border"] = resolveTokenValue(theme, textMode.surfaceBorder);
  }
  if (text?.variants) {
    for (const [name, profile] of Object.entries(text.variants)) {
      if (profile.fontSize) {
        vars[`--luna-text-variant-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.fontWeight !== undefined) {
        vars[`--luna-text-variant-${name}-font-weight`] =
          resolveFontWeightValue(theme, profile.fontWeight) ?? String(profile.fontWeight);
      }
      if (profile.lineHeight) {
        vars[`--luna-text-variant-${name}-line-height`] =
          resolveScaleValue(theme.typography.lineHeights, profile.lineHeight) ?? profile.lineHeight;
      }
      if (profile.letterSpacing) {
        vars[`--luna-text-variant-${name}-letter-spacing`] = profile.letterSpacing;
      }
      if (profile.textTransform) {
        vars[`--luna-text-variant-${name}-text-transform`] = profile.textTransform;
      }
    }
  }

  const card = theme.components.card;
  if (card?.defaultPadding) {
    vars["--luna-card-padding-default"] =
      resolveScaleValue(theme.spacing, card.defaultPadding) ?? card.defaultPadding;
  }
  if (card?.defaultGap) {
    vars["--luna-card-gap-default"] =
      resolveScaleValue(theme.spacing, card.defaultGap) ?? card.defaultGap;
  }
  if (card?.radius) {
    vars["--luna-card-radius"] = resolveScaleValue(theme.radii, card.radius) ?? card.radius;
  }
  const cardMode = card?.modes?.[mode];
  if (cardMode?.bg) {
    vars["--luna-card-bg"] = resolveTokenValue(theme, cardMode.bg);
  }
  if (cardMode?.fg) {
    vars["--luna-card-fg"] = resolveTokenValue(theme, cardMode.fg);
  }
  if (cardMode?.border) {
    vars["--luna-card-border"] = resolveTokenValue(theme, cardMode.border);
  }
  if (cardMode?.shadow) {
    vars["--luna-card-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.shadow) ?? resolveTokenValue(theme, cardMode.shadow);
  }
  if (cardMode?.elevatedShadow) {
    vars["--luna-card-elevated-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.elevatedShadow) ??
      resolveTokenValue(theme, cardMode.elevatedShadow);
  }
  if (cardMode?.hoverBorder) {
    vars["--luna-card-hover-border"] = resolveTokenValue(theme, cardMode.hoverBorder);
  }
  if (cardMode?.hoverShadow) {
    vars["--luna-card-hover-shadow"] =
      resolveScaleValue(theme.shadows, cardMode.hoverShadow) ??
      resolveTokenValue(theme, cardMode.hoverShadow);
  }

  const accordion = theme.components.accordion;
  if (accordion?.defaultGap) {
    vars["--luna-accordion-gap-default"] =
      resolveScaleValue(theme.spacing, accordion.defaultGap) ?? accordion.defaultGap;
  }
  if (accordion?.defaultItemGap) {
    vars["--luna-accordion-item-gap-default"] =
      resolveScaleValue(theme.spacing, accordion.defaultItemGap) ?? accordion.defaultItemGap;
  }
  if (accordion?.defaultPanelPadding) {
    vars["--luna-accordion-panel-padding-default"] =
      resolveScaleValue(theme.spacing, accordion.defaultPanelPadding) ??
      accordion.defaultPanelPadding;
  }
  if (accordion?.radius) {
    vars["--luna-accordion-radius"] =
      resolveScaleValue(theme.radii, accordion.radius) ?? accordion.radius;
  }
  const accordionMode = accordion?.modes?.[mode];
  if (accordionMode?.itemBg) {
    vars["--luna-accordion-item-bg"] = resolveTokenValue(theme, accordionMode.itemBg);
  }
  if (accordionMode?.itemBorder) {
    vars["--luna-accordion-item-border"] = resolveTokenValue(theme, accordionMode.itemBorder);
  }
  if (accordionMode?.itemHoverBg) {
    vars["--luna-accordion-item-hover-bg"] = resolveTokenValue(theme, accordionMode.itemHoverBg);
  }
  if (accordionMode?.itemActiveBg) {
    vars["--luna-accordion-item-active-bg"] = resolveTokenValue(theme, accordionMode.itemActiveBg);
  }
  if (accordionMode?.itemFg) {
    vars["--luna-accordion-item-fg"] = resolveTokenValue(theme, accordionMode.itemFg);
  }
  if (accordionMode?.itemMutedFg) {
    vars["--luna-accordion-item-muted-fg"] = resolveTokenValue(theme, accordionMode.itemMutedFg);
  }
  if (accordionMode?.itemIndicatorFg) {
    vars["--luna-accordion-item-indicator-fg"] = resolveTokenValue(
      theme,
      accordionMode.itemIndicatorFg
    );
  }
  if (accordionMode?.panelFg) {
    vars["--luna-accordion-panel-fg"] = resolveTokenValue(theme, accordionMode.panelFg);
  }

  const emptyState = theme.components.emptyState;
  if (emptyState?.defaultPadding) {
    vars["--luna-empty-state-padding-default"] =
      resolveScaleValue(theme.spacing, emptyState.defaultPadding) ?? emptyState.defaultPadding;
  }
  if (emptyState?.defaultGap) {
    vars["--luna-empty-state-gap-default"] =
      resolveScaleValue(theme.spacing, emptyState.defaultGap) ?? emptyState.defaultGap;
  }
  if (emptyState?.defaultActionsGap) {
    vars["--luna-empty-state-actions-gap-default"] =
      resolveScaleValue(theme.spacing, emptyState.defaultActionsGap) ?? emptyState.defaultActionsGap;
  }
  if (emptyState?.maxWidth) {
    vars["--luna-empty-state-max-width"] =
      resolveScaleValue(theme.spacing, emptyState.maxWidth) ?? emptyState.maxWidth;
  }
  if (emptyState?.mediaSize) {
    vars["--luna-empty-state-media-size"] =
      resolveScaleValue(theme.spacing, emptyState.mediaSize) ?? emptyState.mediaSize;
  }
  if (emptyState?.radius) {
    vars["--luna-empty-state-radius"] =
      resolveScaleValue(theme.radii, emptyState.radius) ?? emptyState.radius;
  }
  if (emptyState?.mediaRadius) {
    vars["--luna-empty-state-media-radius"] =
      resolveScaleValue(theme.radii, emptyState.mediaRadius) ?? emptyState.mediaRadius;
  }
  const emptyStateMode = emptyState?.modes?.[mode];
  if (emptyStateMode?.bg) {
    vars["--luna-empty-state-bg"] = resolveTokenValue(theme, emptyStateMode.bg);
  }
  if (emptyStateMode?.fg) {
    vars["--luna-empty-state-fg"] = resolveTokenValue(theme, emptyStateMode.fg);
  }
  if (emptyStateMode?.border) {
    vars["--luna-empty-state-border"] = resolveTokenValue(theme, emptyStateMode.border);
  }
  if (emptyStateMode?.mutedFg) {
    vars["--luna-empty-state-muted-fg"] = resolveTokenValue(theme, emptyStateMode.mutedFg);
  }
  if (emptyStateMode?.mediaBg) {
    vars["--luna-empty-state-media-bg"] = resolveTokenValue(theme, emptyStateMode.mediaBg);
  }
  if (emptyStateMode?.mediaBorder) {
    vars["--luna-empty-state-media-border"] = resolveTokenValue(theme, emptyStateMode.mediaBorder);
  }

  const alert = theme.components.alert;
  if (alert?.defaultPadding) {
    vars["--luna-alert-padding-default"] =
      resolveScaleValue(theme.spacing, alert.defaultPadding) ?? alert.defaultPadding;
  }
  if (alert?.defaultGap) {
    vars["--luna-alert-gap-default"] =
      resolveScaleValue(theme.spacing, alert.defaultGap) ?? alert.defaultGap;
  }
  if (alert?.radius) {
    vars["--luna-alert-radius"] = resolveScaleValue(theme.radii, alert.radius) ?? alert.radius;
  }
  const alertMode = alert?.tones?.[mode];
  if (alertMode) {
    for (const [toneName, emphasisMap] of Object.entries(alertMode)) {
      if (!emphasisMap) {
        continue;
      }

      for (const [emphasisName, surface] of Object.entries(emphasisMap)) {
        if (!surface) {
          continue;
        }

        if (surface.bg) {
          vars[`--luna-alert-${toneName}-${emphasisName}-bg`] = resolveTokenValue(
            theme,
            surface.bg
          );
        }
        if (surface.border) {
          vars[`--luna-alert-${toneName}-${emphasisName}-border`] = resolveTokenValue(
            theme,
            surface.border
          );
        }
        if (surface.fg) {
          vars[`--luna-alert-${toneName}-${emphasisName}-fg`] = resolveTokenValue(
            theme,
            surface.fg
          );
        }
      }
    }
  }

  const badge = theme.components.badge;
  if (badge?.defaultSize) {
    vars["--luna-badge-size-default"] = badge.defaultSize;
  }
  if (badge?.radius) {
    vars["--luna-badge-radius"] = resolveScaleValue(theme.radii, badge.radius) ?? badge.radius;
  }
  if (badge?.fontWeight !== undefined) {
    vars["--luna-badge-font-weight"] =
      resolveFontWeightValue(theme, badge.fontWeight) ?? String(badge.fontWeight);
  }
  const badgeMode = badge?.tones?.[mode];
  if (badgeMode) {
    for (const [toneName, variantMap] of Object.entries(badgeMode)) {
      if (!variantMap) {
        continue;
      }

      for (const [variantName, surface] of Object.entries(variantMap)) {
        if (!surface) {
          continue;
        }

        if (surface.bg) {
          vars[`--luna-badge-${toneName}-${variantName}-bg`] = resolveTokenValue(
            theme,
            surface.bg
          );
        }
        if (surface.border) {
          vars[`--luna-badge-${toneName}-${variantName}-border`] = resolveTokenValue(
            theme,
            surface.border
          );
        }
        if (surface.fg) {
          vars[`--luna-badge-${toneName}-${variantName}-fg`] = resolveTokenValue(
            theme,
            surface.fg
          );
        }
      }
    }
  }

  const toast = theme.components.toast;
  if (toast?.defaultPadding) {
    vars["--luna-toast-padding-default"] =
      resolveScaleValue(theme.spacing, toast.defaultPadding) ?? toast.defaultPadding;
  }
  if (toast?.defaultGap) {
    vars["--luna-toast-gap-default"] =
      resolveScaleValue(theme.spacing, toast.defaultGap) ?? toast.defaultGap;
  }
  if (toast?.defaultInset) {
    vars["--luna-toast-inset-default"] =
      resolveScaleValue(theme.spacing, toast.defaultInset) ?? toast.defaultInset;
  }
  if (toast?.defaultPlacement) {
    vars["--luna-toast-placement-default"] = toast.defaultPlacement;
  }
  if (toast?.radius) {
    vars["--luna-toast-radius"] = resolveScaleValue(theme.radii, toast.radius) ?? toast.radius;
  }
  if (toast?.maxWidth) {
    vars["--luna-toast-max-width"] = resolveScaleValue(theme.spacing, toast.maxWidth) ?? toast.maxWidth;
  }
  if (toast?.shadow) {
    vars["--luna-toast-shadow"] =
      resolveScaleValue(theme.shadows, toast.shadow) ?? resolveTokenValue(theme, toast.shadow);
  }
  const toastMode = toast?.tones?.[mode];
  if (toastMode) {
    for (const [toneName, emphasisMap] of Object.entries(toastMode)) {
      if (!emphasisMap) {
        continue;
      }

      for (const [emphasisName, surface] of Object.entries(emphasisMap)) {
        if (!surface) {
          continue;
        }

        if (surface.bg) {
          vars[`--luna-toast-${toneName}-${emphasisName}-bg`] = resolveTokenValue(
            theme,
            surface.bg
          );
        }
        if (surface.border) {
          vars[`--luna-toast-${toneName}-${emphasisName}-border`] = resolveTokenValue(
            theme,
            surface.border
          );
        }
        if (surface.fg) {
          vars[`--luna-toast-${toneName}-${emphasisName}-fg`] = resolveTokenValue(
            theme,
            surface.fg
          );
        }
      }
    }
  }

  const notification = theme.components.notification;
  if (notification?.defaultPadding) {
    vars["--luna-notification-padding-default"] =
      resolveScaleValue(theme.spacing, notification.defaultPadding) ?? notification.defaultPadding;
  }
  if (notification?.defaultGap) {
    vars["--luna-notification-gap-default"] =
      resolveScaleValue(theme.spacing, notification.defaultGap) ?? notification.defaultGap;
  }
  if (notification?.radius) {
    vars["--luna-notification-radius"] =
      resolveScaleValue(theme.radii, notification.radius) ?? notification.radius;
  }
  if (notification?.shadow) {
    vars["--luna-notification-shadow"] =
      resolveScaleValue(theme.shadows, notification.shadow) ??
      resolveTokenValue(theme, notification.shadow);
  }
  const notificationMode = notification?.tones?.[mode];
  if (notificationMode) {
    for (const [toneName, emphasisMap] of Object.entries(notificationMode)) {
      if (!emphasisMap) {
        continue;
      }

      for (const [emphasisName, surface] of Object.entries(emphasisMap)) {
        if (!surface) {
          continue;
        }

        if (surface.bg) {
          vars[`--luna-notification-${toneName}-${emphasisName}-bg`] = resolveTokenValue(
            theme,
            surface.bg
          );
        }
        if (surface.border) {
          vars[`--luna-notification-${toneName}-${emphasisName}-border`] = resolveTokenValue(
            theme,
            surface.border
          );
        }
        if (surface.fg) {
          vars[`--luna-notification-${toneName}-${emphasisName}-fg`] = resolveTokenValue(
            theme,
            surface.fg
          );
        }
      }
    }
  }

  const drawer = theme.components.drawer;
  if (drawer?.defaultPadding) {
    vars["--luna-drawer-padding-default"] =
      resolveScaleValue(theme.spacing, drawer.defaultPadding) ?? drawer.defaultPadding;
  }
  if (drawer?.defaultGap) {
    vars["--luna-drawer-gap-default"] =
      resolveScaleValue(theme.spacing, drawer.defaultGap) ?? drawer.defaultGap;
  }
  if (drawer?.defaultInset) {
    vars["--luna-drawer-inset-default"] =
      resolveScaleValue(theme.spacing, drawer.defaultInset) ?? drawer.defaultInset;
  }
  if (drawer?.defaultSize) {
    vars["--luna-drawer-size-default"] =
      resolveScaleValue(theme.spacing, drawer.defaultSize) ?? drawer.defaultSize;
  }
  if (drawer?.defaultPlacement) {
    vars["--luna-drawer-placement-default"] = drawer.defaultPlacement;
  }
  if (drawer?.radius) {
    vars["--luna-drawer-radius"] = resolveScaleValue(theme.radii, drawer.radius) ?? drawer.radius;
  }
  if (drawer?.shadow) {
    vars["--luna-drawer-shadow"] =
      resolveScaleValue(theme.shadows, drawer.shadow) ?? resolveTokenValue(theme, drawer.shadow);
  }
  const drawerMode = drawer?.modes?.[mode];
  if (drawerMode?.bg) {
    vars["--luna-drawer-bg"] = resolveTokenValue(theme, drawerMode.bg);
  }
  if (drawerMode?.fg) {
    vars["--luna-drawer-fg"] = resolveTokenValue(theme, drawerMode.fg);
  }
  if (drawerMode?.border) {
    vars["--luna-drawer-border"] = resolveTokenValue(theme, drawerMode.border);
  }
  if (drawerMode?.backdrop) {
    vars["--luna-drawer-backdrop"] = resolveTokenValue(theme, drawerMode.backdrop);
  }

  const modal = theme.components.modal;
  if (modal?.defaultSize) {
    vars["--luna-modal-size-default"] = modal.defaultSize;
  }
  if (modal?.defaultPadding) {
    vars["--luna-modal-padding-default"] =
      resolveScaleValue(theme.spacing, modal.defaultPadding) ?? modal.defaultPadding;
  }
  if (modal?.defaultGap) {
    vars["--luna-modal-gap-default"] =
      resolveScaleValue(theme.spacing, modal.defaultGap) ?? modal.defaultGap;
  }
  if (modal?.defaultInset) {
    vars["--luna-modal-inset-default"] =
      resolveScaleValue(theme.spacing, modal.defaultInset) ?? modal.defaultInset;
  }
  if (modal?.radius) {
    vars["--luna-modal-radius"] = resolveScaleValue(theme.radii, modal.radius) ?? modal.radius;
  }
  if (modal?.sizes) {
    for (const [sizeName, profile] of Object.entries(modal.sizes)) {
      if (!profile) {
        continue;
      }

      if (profile.maxWidth) {
        vars[`--luna-modal-size-${sizeName}-max-width`] =
          resolveScaleValue(theme.spacing, profile.maxWidth) ?? profile.maxWidth;
      }
    }
  }
  const modalMode = modal?.modes?.[mode];
  if (modalMode?.bg) {
    vars["--luna-modal-bg"] = resolveTokenValue(theme, modalMode.bg);
  }
  if (modalMode?.fg) {
    vars["--luna-modal-fg"] = resolveTokenValue(theme, modalMode.fg);
  }
  if (modalMode?.border) {
    vars["--luna-modal-border"] = resolveTokenValue(theme, modalMode.border);
  }
  if (modalMode?.backdrop) {
    vars["--luna-modal-backdrop"] = resolveTokenValue(theme, modalMode.backdrop);
  }
  if (modalMode?.shadow) {
    vars["--luna-modal-shadow"] =
      resolveScaleValue(theme.shadows, modalMode.shadow) ??
      resolveTokenValue(theme, modalMode.shadow);
  }

  const divider = theme.components.divider;
  if (divider?.defaultSpacing) {
    vars["--luna-divider-spacing-default"] =
      resolveScaleValue(theme.spacing, divider.defaultSpacing) ?? divider.defaultSpacing;
  }
  if (divider?.defaultInset) {
    vars["--luna-divider-inset-default"] =
      resolveScaleValue(theme.spacing, divider.defaultInset) ?? divider.defaultInset;
  }
  const dividerMode = divider?.modes?.[mode];
  if (dividerMode?.default) {
    vars["--luna-divider-default"] = resolveTokenValue(theme, dividerMode.default);
  }
  if (dividerMode?.muted) {
    vars["--luna-divider-muted"] = resolveTokenValue(theme, dividerMode.muted);
  }
  if (dividerMode?.strong) {
    vars["--luna-divider-strong"] = resolveTokenValue(theme, dividerMode.strong);
  }
  if (dividerMode?.labelBg) {
    vars["--luna-divider-label-bg"] = resolveTokenValue(theme, dividerMode.labelBg);
  }
  if (dividerMode?.labelFg) {
    vars["--luna-divider-label-fg"] = resolveTokenValue(theme, dividerMode.labelFg);
  }

  const skeleton = theme.components.skeleton;
  if (skeleton?.defaultSize) {
    vars["--luna-skeleton-size-default"] = skeleton.defaultSize;
  }
  if (skeleton?.defaultAnimation) {
    vars["--luna-skeleton-animation-default"] = skeleton.defaultAnimation;
  }
  if (skeleton?.radius) {
    vars["--luna-skeleton-radius"] =
      resolveScaleValue(theme.radii, skeleton.radius) ?? skeleton.radius;
  }
  if (skeleton?.textRadius) {
    vars["--luna-skeleton-text-radius"] =
      resolveScaleValue(theme.radii, skeleton.textRadius) ?? skeleton.textRadius;
  }
  const skeletonMode = skeleton?.modes?.[mode];
  if (skeletonMode?.bg) {
    vars["--luna-skeleton-bg"] = resolveTokenValue(theme, skeletonMode.bg);
  }
  if (skeletonMode?.highlight) {
    vars["--luna-skeleton-highlight"] = resolveTokenValue(theme, skeletonMode.highlight);
  }
  if (skeleton?.sizes) {
    for (const [name, profile] of Object.entries(skeleton.sizes)) {
      if (profile.height) {
        vars[`--luna-skeleton-size-${name}-height`] =
          resolveScaleValue(theme.spacing, profile.height) ?? profile.height;
      }
    }
  }

  const spinner = theme.components.spinner;
  if (spinner?.defaultSize) {
    vars["--luna-spinner-size-default"] = spinner.defaultSize;
  }
  if (spinner?.duration) {
    vars["--luna-spinner-duration"] =
      resolveScaleValue(theme.motion, spinner.duration) ?? spinner.duration;
  }
  if (spinner?.defaultLabel) {
    vars["--luna-spinner-label-default"] = spinner.defaultLabel;
  }
  const spinnerMode = spinner?.modes?.[mode];
  if (spinnerMode?.color) {
    vars["--luna-spinner-color"] = resolveTokenValue(theme, spinnerMode.color);
  }
  if (spinnerMode?.track) {
    vars["--luna-spinner-track"] = resolveTokenValue(theme, spinnerMode.track);
  }
  if (spinner?.sizes) {
    for (const [name, profile] of Object.entries(spinner.sizes)) {
      if (profile.size) {
        vars[`--luna-spinner-size-${name}`] =
          resolveScaleValue(theme.spacing, profile.size) ?? profile.size;
      }
      if (profile.strokeWidth) {
        vars[`--luna-spinner-size-${name}-stroke-width`] =
          resolveScaleValue(theme.spacing, profile.strokeWidth) ?? profile.strokeWidth;
      }
    }
  }

  const tooltip = theme.components.tooltip;
  if (tooltip?.radius) {
    vars["--luna-tooltip-radius"] =
      resolveScaleValue(theme.radii, tooltip.radius) ?? tooltip.radius;
  }
  if (tooltip?.maxWidth) {
    vars["--luna-tooltip-max-width"] =
      resolveScaleValue(theme.spacing, tooltip.maxWidth) ?? tooltip.maxWidth;
  }
  if (tooltip?.offset) {
    vars["--luna-tooltip-offset-default"] =
      resolveScaleValue(theme.spacing, tooltip.offset) ?? tooltip.offset;
  }
  if (tooltip?.paddingX) {
    vars["--luna-tooltip-padding-x"] =
      resolveScaleValue(theme.spacing, tooltip.paddingX) ?? tooltip.paddingX;
  }
  if (tooltip?.paddingY) {
    vars["--luna-tooltip-padding-y"] =
      resolveScaleValue(theme.spacing, tooltip.paddingY) ?? tooltip.paddingY;
  }
  const tooltipMode = tooltip?.modes?.[mode];
  if (tooltipMode?.bg) {
    vars["--luna-tooltip-bg"] = resolveTokenValue(theme, tooltipMode.bg);
  }
  if (tooltipMode?.fg) {
    vars["--luna-tooltip-fg"] = resolveTokenValue(theme, tooltipMode.fg);
  }
  if (tooltipMode?.border) {
    vars["--luna-tooltip-border"] = resolveTokenValue(theme, tooltipMode.border);
  }
  if (tooltipMode?.shadow) {
    vars["--luna-tooltip-shadow"] =
      resolveScaleValue(theme.shadows, tooltipMode.shadow) ??
      resolveTokenValue(theme, tooltipMode.shadow);
  }

  const popover = theme.components.popover;
  if (popover?.radius) {
    vars["--luna-popover-radius"] =
      resolveScaleValue(theme.radii, popover.radius) ?? popover.radius;
  }
  if (popover?.minWidth) {
    vars["--luna-popover-min-width"] =
      resolveScaleValue(theme.spacing, popover.minWidth) ?? popover.minWidth;
  }
  if (popover?.maxWidth) {
    vars["--luna-popover-max-width"] =
      resolveScaleValue(theme.spacing, popover.maxWidth) ?? popover.maxWidth;
  }
  if (popover?.offset) {
    vars["--luna-popover-offset-default"] =
      resolveScaleValue(theme.spacing, popover.offset) ?? popover.offset;
  }
  if (popover?.padding) {
    vars["--luna-popover-padding-default"] =
      resolveScaleValue(theme.spacing, popover.padding) ?? popover.padding;
  }
  if (popover?.arrowSize) {
    vars["--luna-popover-arrow-size"] =
      resolveScaleValue(theme.spacing, popover.arrowSize) ?? popover.arrowSize;
  }
  if (popover?.arrowInset) {
    vars["--luna-popover-arrow-inset"] =
      resolveScaleValue(theme.spacing, popover.arrowInset) ?? popover.arrowInset;
  }
  const popoverMode = popover?.modes?.[mode];
  if (popoverMode?.bg) {
    vars["--luna-popover-bg"] = resolveTokenValue(theme, popoverMode.bg);
  }
  if (popoverMode?.fg) {
    vars["--luna-popover-fg"] = resolveTokenValue(theme, popoverMode.fg);
  }
  if (popoverMode?.border) {
    vars["--luna-popover-border"] = resolveTokenValue(theme, popoverMode.border);
  }
  if (popoverMode?.shadow) {
    vars["--luna-popover-shadow"] =
      resolveScaleValue(theme.shadows, popoverMode.shadow) ??
      resolveTokenValue(theme, popoverMode.shadow);
  }

  const input = theme.components.input;
  if (input?.defaultSize) {
    vars["--luna-input-size-default"] = input.defaultSize;
  }
  if (input?.radius) {
    vars["--luna-input-radius"] = resolveScaleValue(theme.radii, input.radius) ?? input.radius;
  }
  const inputMode = input?.modes?.[mode];
  if (inputMode?.bg) {
    vars["--luna-input-bg"] = resolveTokenValue(theme, inputMode.bg);
  }
  if (inputMode?.fg) {
    vars["--luna-input-fg"] = resolveTokenValue(theme, inputMode.fg);
  }
  if (inputMode?.border) {
    vars["--luna-input-border"] = resolveTokenValue(theme, inputMode.border);
  }
  if (inputMode?.hoverBorder) {
    vars["--luna-input-hover-border"] = resolveTokenValue(theme, inputMode.hoverBorder);
  }
  if (inputMode?.focusBorder) {
    vars["--luna-input-focus-border"] = resolveTokenValue(theme, inputMode.focusBorder);
  }
  if (inputMode?.focusRing) {
    vars["--luna-input-focus-ring"] = inputMode.focusRing;
  }
  if (inputMode?.placeholder) {
    vars["--luna-input-placeholder"] = resolveTokenValue(theme, inputMode.placeholder);
  }
  if (inputMode?.disabledBg) {
    vars["--luna-input-disabled-bg"] = resolveTokenValue(theme, inputMode.disabledBg);
  }
  if (inputMode?.disabledFg) {
    vars["--luna-input-disabled-fg"] = resolveTokenValue(theme, inputMode.disabledFg);
  }
  if (inputMode?.disabledBorder) {
    vars["--luna-input-disabled-border"] = resolveTokenValue(theme, inputMode.disabledBorder);
  }
  if (inputMode?.errorBorder) {
    vars["--luna-input-error-border"] = resolveTokenValue(theme, inputMode.errorBorder);
  }
  if (inputMode?.errorFocusRing) {
    vars["--luna-input-error-focus-ring"] = inputMode.errorFocusRing;
  }
  if (inputMode?.helpFg) {
    vars["--luna-input-help-fg"] = resolveTokenValue(theme, inputMode.helpFg);
  }
  if (inputMode?.errorFg) {
    vars["--luna-input-error-fg"] = resolveTokenValue(theme, inputMode.errorFg);
  }
  if (inputMode?.labelFg) {
    vars["--luna-input-label-fg"] = resolveTokenValue(theme, inputMode.labelFg);
  }
  if (input?.sizes) {
    for (const [name, profile] of Object.entries(input.sizes)) {
      if (profile.minHeight) {
        vars[`--luna-input-size-${name}-min-height`] =
          resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight;
      }
      if (profile.paddingX) {
        vars[`--luna-input-size-${name}-padding-x`] =
          resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX;
      }
      if (profile.paddingY) {
        vars[`--luna-input-size-${name}-padding-y`] =
          resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY;
      }
      if (profile.fontSize) {
        vars[`--luna-input-size-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.gap) {
        vars[`--luna-input-size-${name}-gap`] =
          resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap;
      }
    }
  }

  const tabs = theme.components.tabs;
  if (tabs?.defaultSize) {
    vars["--luna-tabs-size-default"] = tabs.defaultSize;
  }
  if (tabs?.radius) {
    vars["--luna-tabs-radius"] = resolveScaleValue(theme.radii, tabs.radius) ?? tabs.radius;
  }
  if (tabs?.panelRadius) {
    vars["--luna-tabs-panel-radius"] =
      resolveScaleValue(theme.radii, tabs.panelRadius) ?? tabs.panelRadius;
  }
  if (tabs?.gap) {
    vars["--luna-tabs-gap-default"] = resolveScaleValue(theme.spacing, tabs.gap) ?? tabs.gap;
  }
  const tabsMode = tabs?.modes?.[mode];
  if (tabsMode?.listBg) {
    vars["--luna-tabs-list-bg"] = resolveTokenValue(theme, tabsMode.listBg);
  }
  if (tabsMode?.listBorder) {
    vars["--luna-tabs-list-border"] = resolveTokenValue(theme, tabsMode.listBorder);
  }
  if (tabsMode?.tabFg) {
    vars["--luna-tabs-tab-fg"] = resolveTokenValue(theme, tabsMode.tabFg);
  }
  if (tabsMode?.tabMutedFg) {
    vars["--luna-tabs-tab-muted-fg"] = resolveTokenValue(theme, tabsMode.tabMutedFg);
  }
  if (tabsMode?.tabHoverBg) {
    vars["--luna-tabs-tab-hover-bg"] = resolveTokenValue(theme, tabsMode.tabHoverBg);
  }
  if (tabsMode?.tabActiveBg) {
    vars["--luna-tabs-tab-active-bg"] = resolveTokenValue(theme, tabsMode.tabActiveBg);
  }
  if (tabsMode?.tabActiveFg) {
    vars["--luna-tabs-tab-active-fg"] = resolveTokenValue(theme, tabsMode.tabActiveFg);
  }
  if (tabsMode?.tabActiveBorder) {
    vars["--luna-tabs-tab-active-border"] = resolveTokenValue(theme, tabsMode.tabActiveBorder);
  }
  if (tabsMode?.panelBg) {
    vars["--luna-tabs-panel-bg"] = resolveTokenValue(theme, tabsMode.panelBg);
  }
  if (tabsMode?.panelBorder) {
    vars["--luna-tabs-panel-border"] = resolveTokenValue(theme, tabsMode.panelBorder);
  }
  if (tabsMode?.focusRing) {
    vars["--luna-tabs-focus-ring"] = tabsMode.focusRing;
  }
  if (tabs?.sizes) {
    for (const [name, profile] of Object.entries(tabs.sizes)) {
      if (profile.minHeight) {
        vars[`--luna-tabs-size-${name}-min-height`] =
          resolveScaleValue(theme.spacing, profile.minHeight) ?? profile.minHeight;
      }
      if (profile.paddingX) {
        vars[`--luna-tabs-size-${name}-padding-x`] =
          resolveScaleValue(theme.spacing, profile.paddingX) ?? profile.paddingX;
      }
      if (profile.paddingY) {
        vars[`--luna-tabs-size-${name}-padding-y`] =
          resolveScaleValue(theme.spacing, profile.paddingY) ?? profile.paddingY;
      }
      if (profile.fontSize) {
        vars[`--luna-tabs-size-${name}-font-size`] =
          resolveScaleValue(theme.typography.sizes, profile.fontSize) ?? profile.fontSize;
      }
      if (profile.gap) {
        vars[`--luna-tabs-size-${name}-gap`] =
          resolveScaleValue(theme.spacing, profile.gap) ?? profile.gap;
      }
    }
  }

  const checkbox = theme.components.checkbox;
  if (checkbox?.radius) {
    vars["--luna-checkbox-radius"] =
      resolveScaleValue(theme.radii, checkbox.radius) ?? checkbox.radius;
  }
  if (checkbox?.boxSize) {
    vars["--luna-checkbox-current-box-size"] =
      resolveScaleValue(theme.spacing, checkbox.boxSize) ?? checkbox.boxSize;
  }
  if (checkbox?.gap) {
    vars["--luna-checkbox-current-gap"] =
      resolveScaleValue(theme.spacing, checkbox.gap) ?? checkbox.gap;
  }
  if (checkbox?.offsetY) {
    vars["--luna-checkbox-current-offset-y"] =
      resolveScaleValue(theme.spacing, checkbox.offsetY) ?? checkbox.offsetY;
  }
  const checkboxMode = checkbox?.modes?.[mode];
  if (checkboxMode?.bg) {
    vars["--luna-checkbox-bg"] = resolveTokenValue(theme, checkboxMode.bg);
  }
  if (checkboxMode?.border) {
    vars["--luna-checkbox-border"] = resolveTokenValue(theme, checkboxMode.border);
  }
  if (checkboxMode?.hoverBorder) {
    vars["--luna-checkbox-hover-border"] = resolveTokenValue(theme, checkboxMode.hoverBorder);
  }
  if (checkboxMode?.checkedBg) {
    vars["--luna-checkbox-checked-bg"] = resolveTokenValue(theme, checkboxMode.checkedBg);
  }
  if (checkboxMode?.checkedBorder) {
    vars["--luna-checkbox-checked-border"] = resolveTokenValue(theme, checkboxMode.checkedBorder);
  }
  if (checkboxMode?.checkFg) {
    vars["--luna-checkbox-check-fg"] = resolveTokenValue(theme, checkboxMode.checkFg);
  }
  if (checkboxMode?.focusBorder) {
    vars["--luna-checkbox-focus-border"] = resolveTokenValue(theme, checkboxMode.focusBorder);
  }
  if (checkboxMode?.focusRing) {
    vars["--luna-checkbox-focus-ring"] = checkboxMode.focusRing;
  }
  if (checkboxMode?.disabledBg) {
    vars["--luna-checkbox-disabled-bg"] = resolveTokenValue(theme, checkboxMode.disabledBg);
  }
  if (checkboxMode?.disabledBorder) {
    vars["--luna-checkbox-disabled-border"] = resolveTokenValue(theme, checkboxMode.disabledBorder);
  }
  if (checkboxMode?.disabledFg) {
    vars["--luna-checkbox-disabled-fg"] = resolveTokenValue(theme, checkboxMode.disabledFg);
  }
  if (checkboxMode?.errorBorder) {
    vars["--luna-checkbox-error-border"] = resolveTokenValue(theme, checkboxMode.errorBorder);
  }
  if (checkboxMode?.helpFg) {
    vars["--luna-checkbox-help-fg"] = resolveTokenValue(theme, checkboxMode.helpFg);
  }
  if (checkboxMode?.errorFg) {
    vars["--luna-checkbox-error-fg"] = resolveTokenValue(theme, checkboxMode.errorFg);
  }
  if (checkboxMode?.labelFg) {
    vars["--luna-checkbox-label-fg"] = resolveTokenValue(theme, checkboxMode.labelFg);
  }
  if (checkboxMode?.descriptionFg) {
    vars["--luna-checkbox-description-fg"] = resolveTokenValue(theme, checkboxMode.descriptionFg);
  }
  if (checkboxMode?.disabledLabelFg) {
    vars["--luna-checkbox-disabled-label-fg"] = resolveTokenValue(
      theme,
      checkboxMode.disabledLabelFg
    );
  }

  return vars;
}
