# LunaAlert

## Purpose

`LunaAlert` provides one durable inline surface for status, warning, and error messaging without drifting into application-specific notification logic.

It should be usable anywhere an interface needs a visible inline message that remains part of the normal document flow.

## Design Rules

- keep the contract smaller than a full notification system
- separate severity presentation from announcement semantics
- make tone and emphasis theme-driven so downstream applications can restyle the primitive cleanly
- support title plus body composition without forcing a rigid content model
- avoid embedded action behavior in the primitive itself

## Contract Shape

The primitive uses two visual controls:
- `tone` chooses the message family
- `emphasis` chooses how strong the surface should feel

This keeps severity and weight explicit without creating a long list of one-off variant props.

## Theme Expectations

The alert theme slice should remain responsible for:
- default padding
- default gap
- radius
- light and dark color tokens for every built-in tone and emphasis combination

If future work adds dismissible or actionable alerts, that should build on top of this primitive rather than expanding it into a message system.
