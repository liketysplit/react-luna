# LunaPanel

`LunaPanel` is a reusable labeled surface.

It is intended for:

- title + description + body groupings
- inspector panels
- section panels
- wireframe/demo surfaces
- simple bounded content regions

## Props

- `as?: React.ElementType`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `tone?: "default" | "chrome" | "emphasis"`
- `width?: React.CSSProperties["width"]`
- `height?: React.CSSProperties["height"]`
- `minWidth?: React.CSSProperties["minWidth"]`
- `maxWidth?: React.CSSProperties["maxWidth"]`
- `minHeight?: React.CSSProperties["minHeight"]`
- `maxHeight?: React.CSSProperties["maxHeight"]`
- `children?: React.ReactNode`

It also accepts normal HTML attributes for the chosen element.

## Behavior

- `title` and `description` are optional
- if neither is provided, the header is omitted
- if `children` is provided, it renders inside the panel body
- size props are passed through directly as CSS values
- any valid CSS size value can be used, such as `px`, `%`, `rem`, `vh`, or `auto`

## Tones

- `default`: neutral surface
- `chrome`: stronger chrome/header treatment
- `emphasis`: slightly more prominent surface

## Notes

- `LunaPanel` is intentionally broader than the old wireframe region wrapper concept
- it is not tied to app shell layouts
- it can be reused in both real components and story/demo composition
