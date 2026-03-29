# Accessibility

This document defines the current accessibility expectations for `react-luna`, the known constraints in the shipped components, and the places where consumers still need to make explicit product decisions.

It is a library-level guide, not a replacement for component docs. Component-specific details still live in `docs/v1/components/`.

## Baseline Expectations

- prefer native elements and native semantics when the component contract allows it
- make sure every interactive control has an accessible name
- prefer visible labels for fields; if a visible label is not present, provide `aria-label` or `aria-labelledby`
- connect help text, error text, and supporting descriptions through the component's existing `aria-describedby` wiring
- keep keyboard interaction available anywhere pointer interaction is supported
- preserve visible focus treatment when overriding theme tokens
- treat semantic announcement behavior as part of the consumer contract, especially for alerts, notifications, toasts, loading states, and progress

## Known Constraints

- `LunaDrawer` exposes dialog semantics, but it does not trap focus, move focus on open, or restore focus on close
- `LunaTooltip` is descriptive only; it does not support interactive content and only applies `aria-describedby` while visible
- `LunaHoverText` is not a tooltip and should not be used as a substitute for descriptive overlay content
- `LunaButton` loading is presentational only; `loading` does not disable interaction unless `disabled` is also set
- `LunaAlert` and `LunaNotification` do not force live-region behavior; consumers must choose `role` and `aria-live` when announcement matters
- `LunaToast` defaults to polite status semantics, but consumers still decide whether a toast should be announced, dismissed, or coordinated with other messages
- theme overrides are not automatically audited for contrast, focus visibility, or motion comfort; downstream themes remain responsible for those checks

## Component Guidance

### Actions And Triggers

- `LunaButton` keeps native button semantics; icon-only, floating action, or otherwise textless buttons still need an explicit accessible name
- `LunaButton` loading should only be used when leaving the control interactive is intentional
- `LunaMenu` keeps focus on menu actions, restores focus to the trigger on close, and depends on `menuLabel` for the menu surface name
- `LunaTooltip` should only add short descriptive context to a single trigger and should not hold actions, links, or form controls
- `LunaHoverText` should only be used for inline copy swaps where changing visible text is the whole interaction

### Fields And Selection

- field primitives such as `LunaInput`, `LunaSelect`, and `LunaAutocomplete` should keep a visible label whenever possible
- when a field omits `label`, provide `aria-label` or `aria-labelledby` explicitly
- `error` and help text are designed to become the field description; do not duplicate the same guidance in multiple announcement paths
- placeholders are prompts, not labels
- `LunaCheckbox`, `LunaRadio`, and `LunaSwitch` rely on native input semantics and should keep meaningful label content in the wrapper label
- `LunaAutocomplete` and `LunaSelect` are custom field interactions, so option names and empty states should stay concise and unambiguous

### Overlays And Structured Navigation

- `LunaModal` is the most fully managed dialog surface in the library today: it labels the dialog, moves focus into the panel, and restores focus after close
- `LunaDrawer` should be treated as a lighter-weight panel primitive unless the consuming product adds its own focus management
- `LunaTabs` supports automatic and manual keyboard activation; choose manual activation when tab changes trigger expensive content updates or disruptive context shifts
- `LunaAccordion` and `LunaMenu` already wire the expected disclosure and menu semantics; keep heading, section, and trigger copy clear so screen reader navigation stays understandable

### Feedback And Status

- `LunaAlert` fits inline and persistent messaging inside normal document flow; add `role="status"` or `role="alert"` only when the message needs announcement
- `LunaNotification` is durable application-level feedback and follows the same explicit live-region rule
- `LunaToast` defaults to `role="status"` and `aria-live="polite"`; switch to assertive semantics only for genuinely urgent interruptions
- `LunaSpinner` is decorative by default; use `decorative={false}` and a clear `label` when the loading indicator should be announced
- `LunaProgress` already exposes `progressbar` semantics; provide a visible label or description whenever the task context is not obvious from surrounding content

## Theme And Consumer Responsibility

`react-luna` provides accessible defaults where component structure can enforce them, but it does not remove product responsibility.

Consumers remain responsible for:

- choosing meaningful names, descriptions, and message copy
- preserving sufficient contrast when overriding tokens
- keeping focus order coherent in composed layouts
- deciding when motion should be reduced or disabled for their product context
- validating accessibility in the final application flow, not only at the isolated component level
