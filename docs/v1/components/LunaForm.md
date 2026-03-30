# LunaForm

`LunaForm` is the first form composition layer for `react-luna`.

It owns:
- semantic form rendering by default
- optional header region
- stacked body layout for existing field primitives
- optional actions region
- theme-aware region spacing
- native form prop passthrough

Default element:
- `form`

## Props

- `as?: React.ElementType`
- `header?: React.ReactNode`
- `actions?: React.ReactNode`
- `actionsAlign?: "left" | "center" | "right"`
- `actionsGap?: string`
- `gap?: string`

Important native form props are also supported through passthrough, especially:
- `onSubmit`
- `onReset`
- `action`
- `method`
- `noValidate`
- `autoComplete`

## Contract

- `children` are rendered as the body region
- `header` renders above the body region
- `actions` renders below the body region
- `actionsAlign` controls the horizontal alignment of action content
- `actionsGap` controls spacing between action children
- `gap` controls spacing between the top-level regions
- body content is stacked so existing fields compose without extra wrapper markup
- `className`, `style`, `data-*`, and `aria-*` pass through to the root

## Theme Integration

`LunaForm` consumes the existing `ThemeProvider` for:
- spacing token resolution
- text and field colors through its child components

`gap` and `actionsGap` resolve through theme spacing first, then raw CSS values.

## Accessibility

- use the default `form` element unless you have a strong semantic reason to override it
- submit and reset controls should keep their native button semantics
- fields inside `LunaForm` still own their own labels, messages, and error semantics
