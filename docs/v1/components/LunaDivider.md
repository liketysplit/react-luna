# LunaDivider

`LunaDivider` is the separation primitive for `react-luna`.

It owns:
- horizontal and vertical separator rendering
- divider tone
- optional inset behavior
- optional horizontal labels
- theme-aware default spacing and color

Default elements:
- horizontal: `hr`
- vertical: `div`

## Props

- `as?: React.ElementType`
- `colSpan?: number | "auto" | responsive span object`
- `orientation?: "horizontal" | "vertical"`
- `tone?: "default" | "muted" | "strong"`
- `inset?: boolean | string`
- `label?: React.ReactNode`
- `labelAlign?: "start" | "center" | "end"`
- `spacing?: string`
- `decorative?: boolean`

## Contract

- `orientation` defaults to `horizontal`
- `tone` defaults to `default`
- `colSpan` is available so the divider can participate cleanly inside `LunaRow`, `LunaColumn`, and `LunaGrid`
- `inset={true}` uses the theme default inset
- string inset and spacing values resolve through theme spacing first, then raw CSS values
- `label` is intended for horizontal dividers
- labeled horizontal dividers render through a normal element instead of `hr`
- `labelAlign` positions labeled dividers at the start, center, or end
- `decorative` hides the divider from assistive technology when it is purely visual
- `className` and `style` pass through to the root

## Theme Integration

`LunaDivider` consumes the existing `ThemeProvider` for:
- default divider color
- muted divider color
- strong divider color
- label background and foreground
- default spacing
- default inset

## Accessibility

- horizontal dividers use `hr` semantics by default
- labeled horizontal dividers use `role="separator"` with `aria-orientation="horizontal"`
- vertical dividers use `role="separator"` with `aria-orientation="vertical"`
- decorative dividers are hidden from assistive technology
