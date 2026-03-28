# LunaTag

## Purpose

`LunaTag` provides one durable inline surface for labeling status, grouping, or metadata without turning that label into a counter, filter control, or removable chip.

## Distinction From Nearby Primitives

The intended split is:

- `LunaTag` handles compact inline labels
- `LunaBadge` can carry its own nearby notification or count-oriented role
- richer removable or selectable chip behavior should be its own future primitive

That keeps the tag contract compact and prevents interaction behaviors from leaking into a simple labeling surface.

## Design Rules

- keep the contract semantic and inline by default
- make variants mode-aware so light and dark themes remain balanced
- let downstream themes replace variant surfaces without rewriting the component
- keep size control compact and token-driven
- do not add removal, selection, or icon-system behavior in this primitive

## Contract Shape

The primitive uses two visible controls:

- `variant` chooses the theme surface family
- `size` chooses the compact scale

That is enough for a reusable label primitive without pulling in badge or chip responsibilities.

## Theme Expectations

The tag theme slice should remain responsible for:

- default variant
- default size
- radius
- font weight
- size profiles
- light and dark surface tokens for each named variant
