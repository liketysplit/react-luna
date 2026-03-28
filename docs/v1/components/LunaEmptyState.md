# LunaEmptyState

`LunaEmptyState` is the standard reusable no-data and first-run composite for `react-luna`.

It owns:
- optional media region for an icon or illustration
- title region
- body region
- action region
- theme-driven framing and spacing

Default element:
- `section`

## Props

- `as?: React.ElementType`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `media?: React.ReactNode`
- `actions?: React.ReactNode`
- `align?: "left" | "center" | "right"`
- `padding?: string`
- `gap?: string`
- `actionsGap?: string`
- `maxWidth?: string`
- `rounded?: boolean`
- `framed?: boolean`

## Contract

- `description` is the simple body prop for common text-only usage
- `children` can replace `description` when richer body content is needed
- `media` accepts either a small icon treatment or a larger illustration
- `actions` accepts one or more call-to-action controls
- `align` drives layout alignment, text alignment, and action alignment together
- `framed` controls whether the component renders its own surface treatment
- `className` and `style` pass through to the root

## Theme Integration

`LunaEmptyState` consumes the existing `ThemeProvider` for:
- surface background
- foreground and muted text color
- border treatment
- spacing
- radius
- max width
- media size and media surface treatment

`padding`, `gap`, `actionsGap`, and `maxWidth` resolve through theme spacing first, then raw CSS values.
