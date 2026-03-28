# Empty State Design

This document defines the design direction for `LunaEmptyState` before implementation.

`LunaEmptyState` should be the standard composite for no-data and first-run moments in `react-luna`. It should prevent one-off page-level empty states while staying flexible enough for different downstream product tones.

## Design Stance

- Favor one durable composite over several narrow empty-state variants in V1.
- Keep the content model slot-like and easy to scan.
- Let theme tokens own framing, spacing, and media treatment.
- Support both icon-scale and illustration-scale media without hard-coding either approach into the API.

## Role In The System

`LunaEmptyState` should own:
- optional media treatment
- title and body content
- primary action area
- theme-driven framing
- alignment across content and actions

`LunaEmptyState` should not own:
- data fetching
- routing behavior
- page layout composition beyond its own block
- specialized onboarding workflows

## Base Element

Default element:
- `section`

Support:
- `as?: React.ElementType`

Rules:
- related no-data guidance should default to a semantic section
- `as` remains the escape hatch for `article`, `div`, or another element when needed

## Content Model

V1 should support four logical regions:
- `media`
- `title`
- `body`
- `actions`

Public inputs:
- `media?: React.ReactNode`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `children?: React.ReactNode`
- `actions?: React.ReactNode`

Rules:
- `description` is the direct path for common short body copy
- `children` can replace `description` when richer body content is needed
- `media` must accept either an icon or an illustration
- `actions` should allow one or more controls without prescribing button semantics

## Alignment

Recommended prop:
- `align?: "left" | "center" | "right"`

Rules:
- a single alignment prop should keep title, body, and actions visually coherent
- center alignment should be the default for standalone empty-state use
- left and right alignment remain available for denser embedded layouts

## Surface And Layout

Recommended props:
- `framed?: boolean`
- `rounded?: boolean`
- `padding?: string`
- `gap?: string`
- `actionsGap?: string`
- `maxWidth?: string`

Rules:
- framed should default on so the component can stand alone
- framed false should support placement inside an existing parent surface
- spacing and width must resolve through theme scales first
- the component should size itself as a content block rather than forcing full-width layout

## Theme Provider Integration

`LunaEmptyState` must use the existing `ThemeProvider` and `useTheme()` path.

Recommended theme direction:
- `components.emptyState`

Likely theme tokens:
- `defaultPadding`
- `defaultGap`
- `defaultActionsGap`
- `maxWidth`
- `mediaSize`
- `radius`
- `mediaRadius`
- mode-aware `bg`
- mode-aware `fg`
- mode-aware `mutedFg`
- mode-aware `border`
- mode-aware `mediaBg`
- mode-aware `mediaBorder`

## Recommended Testing Focus

When implemented, tests should cover:
- default semantic tag
- `as` override
- media, body, and actions rendering
- alignment behavior
- theme-driven spacing and width tokens
- body fallback from `children`
- root passthrough behavior
