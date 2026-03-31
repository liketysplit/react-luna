# LunaWireframe

`LunaWireframe` is a structural slot-based layout study for app-shell style pages.

It is intentionally neutral:

- it places content into named regions
- it reflows when regions are omitted
- it can optionally add per-region borders
- it does not inject demo content

## Props

- `appBar?: React.ReactNode`
- `appBarBorder?: boolean`
- `left?: React.ReactNode`
- `leftBorder?: boolean`
- `right?: React.ReactNode`
- `rightBorder?: boolean`
- `centerTop?: React.ReactNode`
- `centerTopBorder?: boolean`
- `centerMiddle: React.ReactNode`
- `centerMiddleBorder?: boolean`
- `centerBottom?: React.ReactNode`
- `centerBottomBorder?: boolean`
- `narrow?: boolean`

## Behavior

- `centerMiddle` is required
- if `left` is absent, the center stack expands left
- if `right` is absent, the center stack expands right
- if both are absent, the center stack becomes the full body width
- if `appBar` is absent, the shell simply renders without a top region
- if border props are `false`, slot content stays flush
- if border props are `true`, the slot gets a bordered inset surface

## Theme

`LunaWireframe` now uses component-specific theme variables for its structural defaults.

The important defaults currently surfaced are:

- `--luna-wireframe-gap`
- `--luna-wireframe-padding`
- `--luna-wireframe-rail-min`
- `--luna-wireframe-rail-max`
- `--luna-wireframe-narrow-max-width`
- `--luna-wireframe-slot-radius`
- `--luna-wireframe-bordered-padding`
- `--luna-wireframe-slot-border`
- `--luna-wireframe-slot-bg`
- `--luna-wireframe-slot-fg`
- `--luna-wireframe-slot-shadow`
- `--luna-wireframe-app-bar-bg`
- `--luna-wireframe-center-top-bg`

These preserve the current wireframe look in the default theme while giving consumers first-class override points through `ThemeProvider`.

## Notes

- `LunaWireframe` does not use `LunaGrid`, `LunaRow`, or `LunaColumn`
- story/demo surfaces for shell examples live outside the component itself
- this component is useful as a structural wireframe and layout study, not as the final themed page-layout contract
- when a page wants directional separators or quiet framed regions inside a slot, prefer composing `LunaPane` inside the slot content instead of expanding `LunaWireframe` into a per-edge border API
