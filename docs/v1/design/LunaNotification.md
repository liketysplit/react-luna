# LunaNotification

## Purpose

`LunaNotification` provides one durable application-level surface for status, warning, and error feedback without turning the primitive into a notification manager.

It should be usable anywhere an interface needs a persistent feedback item that sits above local inline copy and can later participate in a broader notification layout.

## Distinction From Other Feedback Surfaces

The intended split is:

- `LunaAlert` handles inline page-flow messaging
- `LunaNotification` handles persistent application-level feedback
- `LunaToast` remains the transient overlay channel

That keeps global or inbox-style feedback distinct from both inline alerts and time-bound toasts.

## Design Rules

- keep the contract smaller than a full notification center
- keep tone and emphasis theme-driven
- support metadata and action composition without forcing a rigid data model
- allow controlled or uncontrolled dismissal for durable feedback
- preserve native semantic passthrough instead of forcing announcement behavior

## Contract Shape

The primitive uses the same tone and emphasis language as `LunaAlert` and `LunaToast` so feedback surfaces stay consistent.

Notification-specific controls are:
- metadata through `meta`
- optional follow-up content through `action`
- persistent visibility through `open` or `defaultOpen`

This keeps the primitive usable as a single durable notification item while leaving stacking, history, and grouping for future work.

## Theme Expectations

The notification theme slice should remain responsible for:
- default padding
- default gap
- radius
- shadow
- light and dark color tokens for every built-in tone and emphasis combination

If future work adds notification grouping or inbox layouts, that should build on top of this primitive instead of inflating the component into a manager.
