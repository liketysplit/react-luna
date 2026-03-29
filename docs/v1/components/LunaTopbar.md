# LunaTopbar

`LunaTopbar` is the reusable top-level surface for page headers, utility bars, and application chrome.

It owns:
- a themed topbar surface
- start, center, and end layout regions
- responsive region flow for narrower widths
- optional sticky and border treatment

Default element:
- `header`

## Props

- `as?: React.ElementType`
- `start?: React.ReactNode`
- `end?: React.ReactNode`
- `sticky?: boolean`
- `bordered?: boolean`
- `gap?: string`
- `padding?: string`

## Contract

- `children` render in the center region
- `start` renders the leading region
- `end` renders the trailing region
- the component is intentionally compositional, so title blocks, navigation, avatars, and actions should be passed as region content instead of through specialized props
- `bordered` defaults to `true`
- `sticky` defaults to `false`
- `gap` and `padding` resolve through theme spacing first, then raw CSS values
- `className` and `style` pass through to the root

## Theme Integration

`LunaTopbar` consumes the existing `ThemeProvider` for:
- surface background
- foreground
- border
- spacing
- motion-adjacent surface styling through shared CSS custom properties
