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

## Theme

`LunaPanel` now uses component-specific theme variables for its spacing and surface treatment.

The important defaults currently surfaced are:

- `--luna-panel-padding`
- `--luna-panel-gap`
- `--luna-panel-radius`
- `--luna-panel-header-gap`
- `--luna-panel-title-font-size`
- `--luna-panel-title-letter-spacing`
- `--luna-panel-description-font-size`
- `--luna-panel-description-line-height`
- `--luna-panel-bg`
- `--luna-panel-fg`
- `--luna-panel-border`
- `--luna-panel-shadow`
- `--luna-panel-chrome-bg`
- `--luna-panel-emphasis-bg`
- `--luna-panel-title-fg`
- `--luna-panel-description-fg`

These theme defaults keep the current rendered look unchanged while allowing consumers to tune `LunaPanel` through `ThemeProvider`.

## Notes

- `LunaPanel` is intentionally broader than the old wireframe region wrapper concept
- it is not tied to app shell layouts
- it can be reused in both real components and story/demo composition
