# LunaHeader

`LunaHeader` is the reusable title and subtitle content block for `react-luna`.

It owns:
- title rendering
- subtitle rendering
- header content alignment
- spacing between title and subtitle

Default element:
- `div`

## Props

- `as?: React.ElementType`
- `title?: React.ReactNode`
- `subtitle?: React.ReactNode`
- `align?: "left" | "center" | "right"`
- `gap?: string`

## Contract

- string `title` values render through `LunaText` with the `title` variant
- string `subtitle` values render through `LunaText` with muted `body-small` styling
- custom React content is rendered as provided
- `gap` resolves through theme spacing first, then raw CSS values
- `className` and `style` pass through to the root
