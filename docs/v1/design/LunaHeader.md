# Header Design

This document defines the design direction for `LunaHeader` before implementation.

`LunaHeader` should be the reusable title and subtitle content block for the library. It exists so components such as `LunaCard` do not each invent their own header semantics and spacing rules.

## Design Stance

- Keep the primitive narrow and reusable.
- Build it on top of the existing `ThemeProvider`.
- Reuse `LunaText` for typography instead of duplicating text logic.
- Treat it as a content primitive, not a layout system.
- Keep the API simple enough that it can be used by cards, sections, panels, and future composite components.

## Role In The System

`LunaHeader` should own:
- title rendering
- subtitle rendering
- alignment of the header content
- header size selection
- spacing between title and subtitle
- theme-aware default typography choices

`LunaHeader` should not own:
- actions layout
- card surfaces
- section borders or shadows
- generic container layout

This keeps the primitive reusable.

## Base Element

Default element:
- `div`

Support:
- `as?: React.ElementType`

Rules:
- the primitive is a content block, not a document section by default
- `as` should remain available when a semantic heading wrapper is needed

## Core Content Model

V1 should support:
- `title?: React.ReactNode`
- `subtitle?: React.ReactNode`

Rules:
- `title` is the primary content line
- `subtitle` is optional supporting content
- either may be a string or arbitrary React content
- if strings are passed, the primitive should render them through `LunaText`

## Alignment

Recommended prop:
- `align?: "left" | "center" | "right"`

Rules:
- alignment applies to the header content block as a whole
- title and subtitle should move together
- default alignment should be left/start

## Typography Direction

`LunaHeader` should not own a separate typography system.

It should compose `LunaText` with opinionated defaults:
- title should map to a stronger text variant based on `size`
- subtitle should map to a quieter text variant based on `size`
- subtitle should likely use muted text by default

Recommended prop:
- `size?: "sm" | "md" | "lg"`

Recommended defaults:
- `sm` -> title `label`, subtitle `caption`
- `md` -> title `title`, subtitle `body-small`
- `lg` -> title `display`, subtitle `body`

That keeps `LunaHeader` visually consistent with the text system instead of inventing a parallel one.

## Theme Provider Integration

`LunaHeader` should use the existing `ThemeProvider` path indirectly through:
- `LunaText`
- theme spacing tokens
- theme motion tokens if any transitions are ever added later

It may also need a small card-independent theme slice later if repeated header spacing or decorative rules emerge, but V1 should avoid adding theme complexity without proof.

## Spacing

Recommended prop:
- `gap?: string`

Rules:
- `gap` controls spacing between title and subtitle
- it resolves through theme spacing first, then raw CSS values
- a sensible default gap should exist so most uses need no prop

## Passthrough

Keep:
- `className`
- `style`
- `id`
- `title`
- `role`
- `aria-*`
- `data-*`

Rules:
- passthrough should apply to the root only
- this gives the primitive enough flexibility without making it noisy

## Relationship To LunaCard

`LunaCard` should eventually be able to use `LunaHeader` instead of owning title and subtitle display logic itself.

That does not require card to be rewritten immediately, but `LunaHeader` should be designed so that migration is straightforward.

## Recommended Testing Focus

When implemented, tests should cover:
- default root element
- `as` override
- title rendering
- subtitle rendering
- size mapping behavior
- alignment behavior
- spacing token resolution
- `LunaText` composition for string inputs
- passthrough props

## Implementation Order

1. Define the `LunaHeader` prop contract
2. Build the component shell on top of `LunaText`
3. Add Storybook coverage
4. Add unit tests
5. Add the component contract doc under `docs/v1/components`
