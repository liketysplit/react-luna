# LunaTabs

## Purpose

`LunaTabs` provides one composite for switching between related content regions without changing route or page context.

It should stay focused on short-range section changes where the user benefits from keeping the surrounding frame stable.

## Design Rules

- keep the first version item-driven instead of introducing a broader compound API
- keep selection logic usable in both controlled and uncontrolled flows
- keep keyboard behavior explicit and accessible
- keep the surface themeable enough that downstream projects can restyle the list and panel treatment
- keep the composite scoped to one tablist and its panels instead of mixing in routing or data concerns

## Contract Shape

The initial contract uses `items` as the source of truth for:
- trigger label
- stable value
- disabled state
- panel content

That keeps setup straightforward while leaving room for a future lower-level composition API if real downstream use proves it is needed.

## Interaction Direction

Two activation patterns matter:

- automatic activation for fast inspection of adjacent sections
- manual activation when users need to move focus without changing the visible panel immediately

Both should remain available because different composites need different tradeoffs between speed and stability.

## Theme Expectations

The tabs theme slice should remain responsible for:
- default size
- list and panel radii
- root spacing
- per-size spacing and text scale
- list background and border
- inactive, hover, and active tab colors
- panel background and border
- focus ring treatment

That keeps the composite visually adaptable without turning its public API into a long list of style props.
