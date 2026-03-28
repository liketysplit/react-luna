# LunaToast

## Purpose

`LunaToast` provides one transient overlay surface for short-lived status, success, warning, and error feedback without turning the primitive into a notification system.

It should be usable anywhere an interface needs a single overlay message that appears near the viewport edge and then leaves.

## Distinction From Other Feedback Surfaces

The intended split is:

- `LunaAlert` handles inline page-flow messaging
- `LunaToast` handles transient overlay feedback
- `LunaNotification` can grow into broader application-level notification work later

That keeps the toast primitive focused on one overlay message instead of stack layout, queueing, or cross-page message history.

## Design Rules

- keep the contract smaller than a full notification manager
- keep tone and emphasis theme-driven
- allow both controlled and uncontrolled open state
- support optional auto-dismiss without forcing it
- let downstream consumers choose the announcement semantics when a polite status is not enough
- keep placement explicit without assuming a stacking container

## Contract Shape

The primitive uses the same tone and emphasis language as `LunaAlert` so feedback surfaces stay consistent.

Toast-specific controls are:
- visibility through `open` or `defaultOpen`
- time-bound dismissal through `duration`
- viewport anchoring through `placement` and `inset`

This keeps the feedback language aligned while leaving transient behavior explicit.

## Theme Expectations

The toast theme slice should remain responsible for:
- default padding
- default gap
- default inset
- default placement
- default duration
- max width
- radius
- shadow
- light and dark color tokens for every built-in tone and emphasis combination

If future work adds stacking or queue management, that should build on top of this primitive instead of inflating this component into a notification framework.
