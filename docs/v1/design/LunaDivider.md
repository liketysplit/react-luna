# Divider Design

This document defines the design direction for `LunaDivider` before implementation.

`LunaDivider` should be the lightweight separation primitive for `react-luna`. It exists to divide content cleanly without turning separators into ad hoc border utilities scattered through component markup.

## Design Stance

- Keep the primitive narrow and obvious.
- Use the existing `ThemeProvider` for color and default spacing.
- Support the common label-in-line case without introducing decorative variants.
- Keep vertical and horizontal use in one component.

## Role In The System

`LunaDivider` should own:
- horizontal and vertical separator rendering
- divider tone
- optional inset behavior
- optional label rendering for horizontal dividers
- theme-aware default spacing and color

`LunaDivider` should not own:
- section headers
- animation
- decorative line patterns
- arbitrary thickness controls in V1

## Base Element

Defaults:
- horizontal: `hr`
- vertical: `div`

Support:
- `as?: React.ElementType`

Rules:
- keep the semantic `hr` default for the common horizontal case
- switch labeled horizontal dividers to `div` because `hr` cannot contain label content
- use `div` for vertical separators because `hr` is not appropriate there
- `as` remains available when a more specific host element is needed

## Core Contract

Recommended props:
- `colSpan?: number | "auto" | responsive span object`
- `orientation?: "horizontal" | "vertical"`
- `tone?: "default" | "muted" | "strong"`
- `inset?: boolean | string`
- `label?: React.ReactNode`
- `labelAlign?: "start" | "center" | "end"`
- `spacing?: string`
- `decorative?: boolean`

Rules:
- `orientation` defaults to `horizontal`
- `tone` is visual emphasis only
- `colSpan` should be available so the divider can behave correctly when used inside the library layout primitives
- `inset={true}` uses the theme default inset
- string inset values resolve through theme spacing first, then raw CSS values
- `label` is supported only for horizontal dividers
- labeled horizontal dividers should render through a non-void element with separator semantics
- `spacing` controls the outer margin around the divider
- `decorative` removes semantic announcement when the divider is presentational only

## Label Behavior

Rules:
- the label sits inside the line
- the label background should read as part of the surrounding surface
- `labelAlign` controls whether the label appears near the start, center, or end of the line
- custom React content should be allowed for the label

`LunaDivider` should not try to become a header component. If richer title and subtitle content is needed, that belongs to `LunaHeader`.

## Theme Provider Integration

`LunaDivider` should use the existing `ThemeProvider` for:
- default divider color
- muted divider color
- strong divider color
- label background and foreground
- default spacing
- default inset

Recommended theme direction:
- `components.divider`

Likely theme tokens:
- `defaultSpacing`
- `defaultInset`
- `modes.light.default`
- `modes.light.muted`
- `modes.light.strong`
- `modes.light.labelBg`
- `modes.light.labelFg`
- matching dark-mode tokens

## Accessibility

Rules:
- horizontal dividers should behave like `hr` by default
- vertical dividers should use `role="separator"` unless marked decorative
- when `decorative` is true, the divider should be hidden from assistive technology
- labeled dividers should expose the label as visible content, not as a fake heading

## Recommended Testing Focus

When implemented, tests should cover:
- default horizontal root semantics
- vertical orientation behavior
- label rendering
- label alignment variables
- spacing and inset token resolution
- decorative accessibility behavior
- tone class application
