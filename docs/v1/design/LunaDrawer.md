# LunaDrawer

## Purpose

`LunaDrawer` provides an edge-anchored overlay panel for contextual tasks that should stay connected to the current screen instead of replacing it.

It is the right surface for inspect panels, side settings, and compact workflows that need more room than a tooltip or toast but less context switching than a full page.

## Design Rules

- keep the contract narrower than a full modal framework
- support controlled and uncontrolled visibility
- keep sizing, spacing, and placement theme-driven
- treat backdrop and dismissal behaviors as explicit controls
- allow applications to add focus management above the component instead of forcing one strategy

## Distinction From Other Overlays

The intended split is:

- `LunaTooltip` handles lightweight anchored explanation
- `LunaToast` handles transient feedback
- `LunaDrawer` handles contextual workflow surfaces that slide in from an edge
- `LunaModal` can take the fully interruptive centered-dialog role later

That keeps `LunaDrawer` focused on one edge surface instead of turning it into a universal overlay abstraction.

## Theme Expectations

The drawer theme slice should remain responsible for:
- default padding
- default gap
- default inset
- default size
- default placement
- radius
- shadow
- light and dark panel and backdrop tokens

If future work adds focus trapping, portals, or multi-drawer coordination, that should build on top of this composite instead of inflating the base contract.
