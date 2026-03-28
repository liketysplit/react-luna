# LunaHoverText

## Purpose

`LunaHoverText` provides an inline way to reveal alternate copy without leaving the text flow or creating a floating surface.

## Distinction From Nearby Primitives

The intended split is:

- `LunaHoverText` swaps copy in place
- `LunaTooltip` describes another element with a floating overlay
- future popover-style primitives can handle larger or interactive content

That boundary matters because hover text should remain typographic and local, not drift into general overlay behavior.

## Design Rules

- keep the primitive inline by default
- make hover and focus produce the same content change when the element is keyboard reachable
- preserve layout stability while copy changes
- let downstream consumers restyle color through inherited styles or token props
- do not add placement, arrows, or floating-surface configuration

## Contract Shape

The primitive only needs:

- one resting copy slot
- one alternate copy slot
- one optional `focusable` escape hatch for keyboard reachability

Anything beyond that starts to overlap with tooltip or popover responsibilities.
