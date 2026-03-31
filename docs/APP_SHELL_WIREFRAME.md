# LunaWireframe

This file records the current wireframe boundary for the app-shell layout study.

The real component lives at:

- `src/components/luna-app-shell-wireframe/LunaWireframe.tsx`

Storybook currently exposes:

- `Components/LunaWireframe`

## Purpose

`LunaWireframe` is a structural wireframe component.

It exists to prove the page model:

- `appBar`
- `left`
- `right`
- `centerTop`
- `centerMiddle`
- `centerBottom`

The goal is still to validate:

- named regions
- omission behavior when a region is absent
- narrow-width reflow
- center-stack behavior when `centerTop` or `centerBottom` become thin or disappear
- shell-owned layout rules that do not depend on `LunaRow`, `LunaColumn`, or `LunaGrid`

## Component Boundary

`LunaWireframe` now owns only:

- shell layout
- slot layout
- omission reflow
- optional per-slot borders

It does not own:

- demo labels
- detail text
- fake blocks
- faux content surfaces
- story-only annotations
- outer shell chrome such as a forced border, background, radius, or shadow

That story/demo content lives only in Storybook support files.

## Current Props

`LunaWireframe` currently supports:

- `appBar`
- `appBarBorder`
- `left`
- `leftBorder`
- `right`
- `rightBorder`
- `centerTop`
- `centerTopBorder`
- `centerMiddle`
- `centerMiddleBorder`
- `centerBottom`
- `centerBottomBorder`
- `narrow`

All border props default to `false`.

This means:

- unbordered slots stay flush and respect user-provided layout intent
- bordered slots opt into panel-like inset treatment

## Current Story Set

The wireframe currently proves these states:

- `Playground`
- `TextOnly`
- `TextOnlyBorderComparison`
- `FullShell`
- `WithoutLeft`
- `WithoutRight`
- `MainOnly`
- `WithoutAppBar`
- `NarrowWireframe`
- `ThinCenterTop`
- `ThinCenterBottom`
- `CenterMiddleOnlyWithSideRails`

## Direction

The current wireframe still sells the same page model:

- one shell owns persistent page chrome
- one center stack owns the primary task surface
- side rails are optional context, not mandatory structure
- top and bottom center bands are supplemental, not equal peers to the main work area

If future work makes `LunaWireframe` start acting like a themed panel or demo artifact again, the boundary has drifted.
