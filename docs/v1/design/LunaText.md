# Text Design

This document defines the design direction for `LunaText` before implementation.

`LunaText` is the base text primitive for `react-luna`. It should solve typography first, while absorbing only the light decoration needs that are actually useful in application code.

## Design Stance

- Favor real text semantics over generic wrappers.
- Consume the existing `ThemeProvider` instead of creating a text-specific context.
- Keep the API narrow enough that `LunaText` does not become a container garbage drawer.
- Allow passthrough for edge cases where text content is unusually wide or content-driven.
- Keep decoration optional and secondary to typography.

## Role In The System

`LunaText` should own:
- font family
- font size
- font weight
- line height
- text color
- text alignment
- lightweight text decoration or surface treatment when justified

`LunaText` should not own:
- multi-child layout
- generic container layout
- button-like interactivity
- form control behavior

This means `LunaText` replaces the need for a separate `LunaBox` only at the lightweight decoration level, not as a general-purpose layout primitive.

## Theme Provider Integration

`LunaText` should be built directly on the current `ThemeProvider` and `useTheme()` path.

It should consume:
- `theme.typography.fontFamily`
- `theme.typography.sizes`
- `theme.typography.weights`
- `theme.typography.lineHeights`
- mode-aware foreground and muted values from the active theme mode
- custom colors already made available through `ThemeProvider colors`

Rules:
- no separate text-provider layer
- no text-specific theme root
- the active theme mode should control default text color behavior automatically
- user theme overrides should flow through the existing theme merge path

This keeps `LunaText` aligned with how `LunaButton` already works.

## Semantic HTML

Default element:
- `p`

Support:
- `as?: React.ElementType`

Common overrides that should remain natural:
- `span`
- `strong`
- `em`
- `small`
- `label`
- `h1` through `h6`

Rules:
- the default tag should be a real text element, not a generic `div`
- `as` should remain the escape hatch for semantics
- `LunaText` should not auto-infer semantics from style props

## Core Typography Direction

`LunaText` should likely resolve through explicit named text variants rather than raw style-only props first.

Probable direction:
- `variant?: string`

Candidate built-ins:
- `body`
- `body-small`
- `caption`
- `label`
- `title`
- `display`

That variant layer should map into theme typography values rather than hardcoded CSS in the component.

Additional control props can still exist when justified, but variant should stay the primary entry point.

## Color Direction

`LunaText` should support:
- mode-aware default foreground
- muted text treatment
- theme token colors
- raw CSS color values when explicitly passed

Probable prop shape:
- `color?: string`
- `muted?: boolean`

Rules:
- default color comes from the active theme mode foreground
- muted should resolve from mode-aware muted tokens
- explicit `color` should override the default text color path
- downstream custom colors from `ThemeProvider colors` should work automatically

## Lightweight Decoration

This is the part being absorbed from the old `LunaBox` idea.

The goal is not to turn `LunaText` into a general container. The goal is to support the lightweight treatments people actually use around text.

Reasonable candidates:
- `truncate?: boolean`
- `underline?: boolean`
- `italic?: boolean`
- `weight?: string | number`
- `align?: "left" | "center" | "right" | "justify"`
- `inline?: boolean`
- `surface?: boolean`

Meaning:
- `truncate` handles the very common single-line text overflow case
- `surface` would be the strongest decoration prop and should stay lightweight if it exists at all

Guardrail:
- no padding, radius, shadow, border, or layout API explosion unless a repeated real use case proves it necessary

## Passthrough And Wide Text

This is where pragmatism matters.

Text content can be:
- CMS-driven
- user-generated
- unbounded in width
- embedded in narrow layouts

So `LunaText` should preserve native passthrough:
- `className`
- `style`
- native text element attributes
- `title`
- `dir`
- `lang`
- `data-*`
- `aria-*`

That passthrough is the safety valve for unusual width, wrapping, or text-rendering edge cases without bloating the public API immediately.

The component should own the common path, not every path.

## Likely Non-Goals For V1

- rich text rendering
- markdown rendering
- multi-paragraph content normalization
- list styling
- anchor behavior
- heading system abstraction beyond `as`

Those can come later if there is a real use case.

## Initial Testing Focus

When `LunaText` is implemented, tests should cover:
- default semantic tag
- `as` override
- theme-driven default typography
- mode-aware foreground behavior
- explicit color override
- muted text behavior
- passthrough props
- truncation behavior if included in V1

## Implementation Order

1. Define the `LunaText` prop contract
2. Add any required text theme typing
3. Build the component shell
4. Add Storybook coverage
5. Add unit tests
6. Write the component contract doc under `docs/v1/components`
