# LunaTag

`LunaTag` is the compact inline classification primitive for `react-luna`.

It is responsible for:
- short categorical labels
- theme-aware variant surfaces
- semantic inline markup overrides
- compact size scaling

It is not responsible for:
- counts or notification totals
- removal or selection behavior
- application-specific filtering logic

## Contract

`LunaTag` renders an inline element and defaults to `<span>`.

Core rules:
- `children` is the visible content
- `className` and `style` pass through to the root
- `as` changes semantics without changing the visual contract
- `variant` and `size` resolve through theme defaults first
- `color` overrides the visible surface background and border

## Props

- `as?: React.ElementType`
- `variant?: string`
- `size?: string`
- `color?: string`
- `rounded?: boolean`

## Variants

Built-in base theme variants:
- `neutral`
- `primary`
- `success`
- `warning`
- `danger`

Rules:
- `variant` resolves against the active light or dark theme mode
- unknown variants fall back to the current theme surface tokens
- downstream themes can redefine built-in variants or add new named variants

## Size

Built-in base theme sizes:
- `small`
- `medium`
- `large`

Resolution:
1. `size` resolves against `theme.components.tag.sizes`
2. if no named size matches, the value is treated as a raw spacing size
3. if `size` is omitted, the theme default size key is used

## Color

`color` accepts:
- raw CSS colors such as hex, `rgb`, `hsl`, and `var(...)`
- theme custom colors
- theme tokens such as `accent.500`

Rules:
- `color` overrides the tag background and border together
- foreground remains theme-driven unless the consumer overrides it through `style`

## Theme Expectations

`LunaTag` depends on the theme for:
- default variant
- default size
- size profiles
- radius
- font weight
- per-mode variant surface tokens

This keeps the primitive easy to restyle without turning it into a badge or chip system.
