# Layout Design

This document defines the shared layout design for:
- `LunaRow`
- `LunaColumn`
- `LunaGrid`

These primitives must be designed together. They are one layout family, not three unrelated components.

## Design Stance

- Favor a system developers already understand.
- Make page composition faster than writing one-off CSS.
- Keep the public API intuitive before making it clever.
- Use a 12-column mental model where width and wrapping matter.
- Keep semantics explicit through `as`, not through layout props.

## Why This Family Exists

The layout primitives exist to reduce CSS pollution and make application layout faster to build.

They should solve:
- consistent spacing
- predictable wrapping
- predictable width allocation
- familiar page layout patterns

They should not solve:
- surface decoration
- text styling
- component-specific internals

That means:
- `LunaText` owns text
- `LunaButton` owns button behavior
- the layout family owns structure

## Core Model

The shared model should be:
- 12-column system
- theme-aware gap values
- `as` for semantic overrides
- native `className` and `style` passthrough

This is the critical split:
- `LunaRow` and `LunaColumn` are the fast common-case layout primitives
- `LunaGrid` is the explicit 12-column layout primitive

## Shared Principles

All layout primitives should:
- default to `div`
- accept `as?: React.ElementType`
- resolve spacing through theme first, then raw CSS values
- keep `className` and `style` passthrough
- avoid breakpoint prop explosions in V1
- avoid utility-class-style prop overload in V1

## Gap Model

All three primitives should support:
- `gap?: string`

Resolution:
1. user theme spacing key
2. base theme spacing key
3. raw CSS value

This keeps the layout family aligned with the existing theme system and lets developers use both token values and direct CSS values where needed.

## LunaRow

Purpose:
- fast horizontal layout
- child grouping
- wrapping rows of content

Default element:
- `div`

Likely implementation:
- `display: flex`
- `flex-direction: row`

Recommended V1 props:
- `as?: React.ElementType`
- `gap?: string`
- `align?: "start" | "center" | "end" | "stretch" | "baseline"`
- `justify?: "start" | "center" | "end" | "between" | "around" | "evenly"`
- `wrap?: boolean`
- `inline?: boolean`
- `colSpan?: number`

Rules:
- `wrap` should default to `true`
- `Row` should not try to become a grid
- `Row` is for common horizontal composition with optional 12-column subdivision through `colSpan`

## LunaColumn

Purpose:
- fast vertical layout
- stacked content sections
- forms and page regions that need consistent spacing

Default element:
- `div`

Likely implementation:
- `display: flex`
- `flex-direction: column`

Recommended V1 props:
- `as?: React.ElementType`
- `gap?: string`
- `align?: "start" | "center" | "end" | "stretch"`
- `justify?: "start" | "center" | "end" | "between" | "around" | "evenly"`
- `inline?: boolean`
- `colSpan?: number`

Rules:
- `Column` should stay very simple
- it is the common vertical grouping primitive with optional 12-column subdivision through `colSpan`

## LunaGrid

Purpose:
- explicit 12-column page and section layout
- predictable width allocation
- predictable wrap points through spans

Default element:
- `div`

Likely implementation:
- CSS grid

Recommended V1 props:
- `as?: React.ElementType`
- `gap?: string`
- `columns?: number`
- `inline?: boolean`

Rules:
- `columns` should default to `12`
- `Grid` is the primitive that owns the 12-column contract
- `Grid` should not require developers to hand-author raw `grid-template-columns` for standard use

## Span Model

If the system is going to be truly useful, the 12-column model needs a span story.

The agreed direction is:
- no dedicated `LunaGridItem` primitive
- any single direct child can participate in the layout model
- `Row` and `Column` should support `colSpan`
- `Grid` should support the same 12-column subdivision model

Meaning:
- the layout family should treat width allocation as a shared 12-column subdivision system
- `colSpan` is the first-class width control prop
- children should not require a separate item wrapper just to take part in the system

This keeps the public API simpler and matches how developers think about subdividing a layout area.

## Child Wrapping Model

The agreed direction is:
- layout primitives accept normal direct children
- the primitive internally iterates over those children
- each direct child is wrapped in a native internal layout item
- the internal wrapper is where `colSpan` and subdivision behavior are applied

Benefits:
- no public item primitive
- simpler authoring
- consistent span handling across `Row`, `Column`, and `Grid`

Tradeoff:
- the rendered DOM includes internal child wrappers

That tradeoff is acceptable because it keeps the public API much clearer.

## Responsive Span Model

`colSpan` should support both:
- a single numeric value
- a responsive object value

Examples:
- `colSpan={6}`
- `colSpan={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}`

Breakpoint keys should be:
- `xs`
- `sm`
- `md`
- `lg`
- `xl`

Rules:
- the numeric form is the default simple path
- the object form is the responsive path
- both should be first-class and supported by default
- the shared 12-column mental model still applies at every breakpoint

Recommended base breakpoint values:
- `xs: 0`
- `sm: 576`
- `md: 768`
- `lg: 992`
- `xl: 1200`

Friendly aliases can also be supported:
- `mobile -> xs`
- `tablet -> md`
- `desktop -> lg`

Rules:
- canonical internal keys should remain `xs`, `sm`, `md`, `lg`, `xl`
- friendly aliases should normalize into the canonical keys
- docs should teach the canonical keys first
- friendly aliases should ship in V1

## Semantics

Default layout semantics should stay generic:
- `div`

Use `as` when semantics matter:
- `section`
- `article`
- `nav`
- `header`
- `footer`
- `main`

Rule:
- layout primitives should never auto-infer document semantics

## Passthrough Boundaries

Layout primitives should allow native passthrough because real page layout often needs edge-case overrides.

Keep:
- `className`
- `style`
- `id`
- `title`
- `role`
- `aria-*`
- `data-*`

But the public API should still cover the common path so users are not forced into custom CSS immediately.

## V1 Non-Goals

- full responsive breakpoint matrix props
- offset helpers
- order helpers
- grow and shrink prop overload
- alignment props per child
- utility-class parity with framework grids

Those are exactly how layout APIs become noisy and hard to learn.

## Recommended Implementation Order

1. Finalize this shared design
2. Decide the span strategy for `LunaGrid`
3. Implement `LunaColumn`
4. Implement `LunaRow`
5. Implement `LunaGrid`

`Column` and `Row` can land before the full span system, but `Grid` should not land before the span direction is clear.

## Open Decisions

- How should alias collisions be resolved if both canonical keys and friendly aliases are provided in the same responsive object?
