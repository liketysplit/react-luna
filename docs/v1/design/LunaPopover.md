# LunaPopover

## Purpose

`LunaPopover` is the reusable anchored surface for richer floating content that still belongs to a nearby trigger.

It fills the gap between:
- `LunaTooltip`, which stays descriptive and non-interactive
- `LunaMenu`, which is opinionated around action-list semantics
- `LunaModal`, which takes over a larger dialog flow

## Design Rules

- keep the trigger contract strict: one trigger, one anchored surface
- treat the component as non-modal by default so surrounding layout and focus order remain intact
- support interactive content without turning the primitive into a full overlay system
- keep placement simple and predictable instead of promising collision handling the library does not manage yet
- make the surface fully themeable through tokens rather than style props that leak product-specific decisions

## Boundary

`LunaPopover` is not the answer for:
- hierarchical menus
- teaching tours or viewport-aware callouts
- modal workflows
- screen-level overlay orchestration

When the content is purely descriptive, stay with `LunaTooltip`.
When the content is action-list navigation, stay with `LunaMenu`.
