# LunaSidebar

## Purpose

`LunaSidebar` provides one persistent side-surface for supporting page context without turning that surface into a route-aware application shell.

It is the right place for:
- grouped navigation links
- filters and secondary controls
- pinned status, metadata, or utility actions

## Design Rules

- keep the contract narrower than a full layout shell
- let `LunaHeader`, `LunaButton`, `LunaMenu`, and layout primitives compose inside it
- make width and spacing theme-driven
- allow sticky behavior without forcing it
- keep responsive page rearrangement in application code

## Distinction From Neighboring Components

The intended split is:

- `LunaCard` handles general-purpose grouped surfaces
- `LunaDrawer` handles temporary edge overlays
- `LunaSidebar` handles persistent secondary structure inside the normal page flow

That keeps `LunaSidebar` focused on structural persistence instead of overlay behavior or route orchestration.

## Theme Expectations

The sidebar theme slice should remain responsible for:
- default width
- default padding
- default gap
- default sticky offset
- radius
- shadow
- light and dark surface tokens

Future work can build navigation patterns on top of the sidebar, but the base contract should stay content-agnostic and easy to override.
