# LunaPane

`LunaPane` is a minimal structural surface.

It is intended to be visually absent by default and only show itself when border edges are requested.

Use it for:

- dividers between regions
- hard edge boundaries
- simple framed content
- structural wrapping where `LunaPanel` would be too opinionated

## Props

- `as?: React.ElementType`
- `children?: React.ReactNode`
- `border?: boolean`
- `borderTop?: boolean`
- `borderRight?: boolean`
- `borderBottom?: boolean`
- `borderLeft?: boolean`
- `borderStyle?: React.CSSProperties["borderStyle"]`
- `borderWidth?: React.CSSProperties["borderWidth"]`
- `radius?: React.CSSProperties["borderRadius"]`
- `width?: React.CSSProperties["width"]`
- `minWidth?: React.CSSProperties["minWidth"]`
- `maxWidth?: React.CSSProperties["maxWidth"]`
- `height?: React.CSSProperties["height"]`
- `minHeight?: React.CSSProperties["minHeight"]`
- `maxHeight?: React.CSSProperties["maxHeight"]`

It also accepts normal HTML attributes for the chosen element.

## Behavior

- `LunaPane` has no default padding
- `LunaPane` has no default margin
- `LunaPane` has no default background
- `LunaPane` has no default shadow
- `border` applies a full border
- side-specific border props apply only those edges
- `borderStyle`, `borderWidth`, and `radius` are passed through directly as CSS values

## Notes

- `LunaPane` is not a panel
- `LunaPane` is not a layout primitive
- `LunaPane` is the quiet boundary helper that sits between `LunaWireframe` and `LunaPanel`

## Storybook Coverage

Current `LunaPane` stories focus on:

- `Playground`
- `EdgeDirections`
- `ThicknessAndStyle`
- `InsideWireframe`
- `InsideApp`

Those stories are intended to show:

- single-edge separators
- full-border framing
- thickness and style variation
- `LunaPane` as a quiet boundary inside `LunaWireframe`
- `LunaPane` as a quiet boundary inside routed pages hosted by `LunaApp`
