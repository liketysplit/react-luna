# LunaCard

`LunaCard` is the base grouped-content surface primitive for `react-luna`.

It owns:
- card surface rendering
- header region
- body region
- actions region
- per-region alignment
- theme-aware surface styling

Default element:
- `section`

## Props

- `as?: React.ElementType`
- `header?: React.ReactNode`
- `actions?: React.ReactNode`
- `bodyAlign?: "left" | "center" | "right"`
- `actionsAlign?: "left" | "center" | "right"`
- `actionsGap?: string`
- `color?: string`
- `elevated?: boolean`
- `outlined?: boolean`
- `flat?: boolean`
- `interactive?: boolean`
- `rounded?: boolean`
- `padding?: string`
- `gap?: string`

## Contract

- `children` are the body region
- `header` is the header region
- `actions` is the action region
- `body` and `actions` have independent alignment
- simple title and subtitle content should usually be passed through `LunaHeader`
- `actionsGap` controls spacing between action children
- `className` and `style` pass through to the root

## Theme Integration

`LunaCard` consumes the existing `ThemeProvider` for:
- background
- foreground
- border
- shadow
- spacing
- radius

`padding` and `gap` resolve through theme spacing first, then raw CSS values.

## Surface Rules

- `outlined` emphasizes border treatment
- `elevated` strengthens shadow treatment
- `flat` removes shadow
- `interactive` adds hover treatment without changing semantics
- `rounded` is a shape modifier
- if `flat` and `elevated` are both passed, `flat` wins
