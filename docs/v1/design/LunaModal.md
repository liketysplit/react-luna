# LunaModal

## Purpose

`LunaModal` provides one bounded overlay surface for focused review, confirmation, and interruption states where inline content is not strong enough.

It should give `react-luna` one durable modal shell without turning this first composite into a full overlay framework.

## Design Rules

- keep the contract small and explicit
- keep title, description, body, and actions as the only built-in regions
- support controlled and uncontrolled visibility
- keep dismiss behavior reason-aware so downstream state can react cleanly
- preserve themeability for shell size, spacing, surface, backdrop, and shadow
- avoid portal and stacking abstractions in V1

## Scope Boundaries

`LunaModal` should own:
- one modal backdrop
- one dialog panel
- local close affordances
- scroll-safe body content inside the shell
- focus entry and focus return

`LunaModal` should not own:
- nested modal orchestration
- app-wide overlay management
- route interception
- form submission policies

## Contract Shape

The public inputs should stay slot-like:
- `title`
- `description`
- `children`
- `actions`

Behavior should remain explicit through:
- `open`
- `defaultOpen`
- `onOpenChange`
- `dismissible`
- `closeOnBackdrop`
- `closeOnEscape`

That keeps the modal composable without introducing a deep subcomponent family immediately.

## Theme Expectations

The modal theme slice should remain responsible for:
- default size
- default padding
- default gap
- default inset
- radius
- size max widths
- light and dark surface colors
- light and dark foreground colors
- light and dark border colors
- light and dark backdrop colors
- shadow

This keeps downstream customization at the shell level instead of forcing consumers to override one-off selectors.

## Testing Focus

When implemented, tests should cover:
- default dialog semantics
- controlled and uncontrolled visibility
- dismiss reasons
- disabled dismiss paths
- focus handoff on open and close
- theme token resolution for spacing and size
