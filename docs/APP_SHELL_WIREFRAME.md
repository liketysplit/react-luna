# LunaAppShell Wireframe

This file records the first visual north star for `LunaAppShell` before a public component contract exists.

The wireframe lives in Storybook:

- `Foundations/LunaAppShellWireframe`

This is intentionally a shell-owned layout study, not a reusable layout primitive and not an implementation of `LunaAppShell` yet.

## Current Story Set

The wireframe currently proves these occupancy states in Storybook:

- `Playground`
- `FullShell`
- `WithoutLeft`
- `WithoutRight`
- `MainOnly`
- `WithoutAppBar`
- `NarrowWireframe`
- `ThinCenterTop`
- `ThinCenterBottom`
- `CenterMiddleOnlyWithSideRails`

## Purpose

The wireframe exists to prove the page model:

- `appBar`
- `left`
- `right`
- `centerTop`
- `centerMiddle`
- `centerBottom`

The goal is to validate:

- named regions
- omission behavior when a region is absent
- a narrow-width reflow direction
- center-stack behavior when `centerTop` or `centerBottom` become thin or disappear
- shell-owned layout rules that do not depend on `LunaRow`, `LunaColumn`, or `LunaGrid`

## Current Direction

The current wireframe treats:

- `appBar` as persistent page chrome
- `left` as navigation or pinned workspace context
- `right` as inspector or utility context
- `centerTop` as summary and page-intro space
- `centerMiddle` as the primary task surface
- `centerBottom` as secondary context such as activity or related work

The current center-stack assumptions are:

- `centerTop` can be a full summary band or a thin menu-bar-like strip
- `centerBottom` can be a full secondary band or a thin footer-like strip
- `centerMiddle` should visually dominate when either neighboring band is thin or absent
- `centerMiddle` should be able to stand on its own with left and right rails still present

## Boundary

This wireframe is not a ship-ready component.

It should be used to decide:

- the final slot-first API
- responsive reflow rules
- which spacing and surface treatments belong to the shell itself

Only after that should `LunaAppShell` be implemented as a public component.

## Design Direction

This wireframe is meant to sell one specific page model:

- one shell owns persistent page chrome
- one center stack owns the primary task surface
- side rails are optional context, not mandatory structure
- top and bottom center bands are supplemental, not equal peers to the main work area

If later stories or implementation work weaken those truths, the wireframe has drifted from its purpose.
