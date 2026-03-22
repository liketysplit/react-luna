# LunaText

`LunaText` is the base text primitive for `react-luna`.

It owns:
- typography variants
- semantic text rendering
- mode-aware text color
- muted text
- lightweight text decoration
- common text passthrough

It does not own:
- generic layout
- multi-child spacing
- interactive control behavior

## Contract

`LunaText` renders text with a semantic default of `p`, while allowing semantic overrides through `as`.

Core rules:
- default tag is `p`
- `as` changes semantics without changing the text role of the primitive
- default typography comes from the current theme
- mode-aware text color comes from the active `ThemeProvider`
- `className` and `style` pass through to the root element

## Props

- `as?: React.ElementType`
- `variant?: string`
- `color?: string`
- `muted?: boolean`
- `truncate?: boolean`
- `surface?: boolean`
- `inline?: boolean`
- `align?: "left" | "center" | "right" | "justify"`
- `weight?: string | number`
- `italic?: boolean`
- `underline?: boolean`

## Theme Integration

`LunaText` consumes the existing `ThemeProvider` and uses:
- `theme.typography.fontFamily`
- `theme.typography.sizes`
- `theme.typography.weights`
- `theme.typography.lineHeights`
- mode-aware text tokens from `theme.components.text.modes`

The base theme currently ships these built-in variants:
- `body`
- `body-small`
- `caption`
- `label`
- `title`
- `display`

## Color

`color` accepts:
- raw CSS values such as hex or `var(...)`
- theme custom colors
- theme tokens such as `primary.500`

Rules:
- default color comes from the current mode text foreground
- `muted` switches to the mode-aware muted text token
- explicit `color` overrides the default text color path

## Lightweight Decoration

`LunaText` intentionally supports only lightweight decoration in V1:
- `truncate`
- `surface`
- `italic`
- `underline`
- explicit `weight`
- explicit `align`

This keeps it useful without turning it into a container primitive.

## Passthrough

`LunaText` keeps standard element passthrough for cases where text is content-driven or unusually wide:
- `className`
- `style`
- `title`
- `dir`
- `lang`
- `data-*`
- `aria-*`
- normal native text-element attributes
