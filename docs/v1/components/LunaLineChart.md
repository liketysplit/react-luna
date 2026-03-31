# LunaLineChart

`LunaLineChart` is a presentation primitive for single-series trend and time-series views.

It is intended for:

- dashboard trend panels
- reporting surfaces
- compact status overviews that still need axes
- pairing with `LunaPanel` or future dashboard layouts

It is not intended to be a general charting framework.

## Props

- `ariaLabel: string`
- `ariaDescription?: string`
- `data: Array<{ x: string | number | Date; y: number }>`
- `emptyTitle?: React.ReactNode`
- `emptyDescription?: React.ReactNode`
- `error?: React.ReactNode`
- `errorTitle?: React.ReactNode`
- `errorDescription?: React.ReactNode`
- `formatXAxisLabel?: (value, context) => string`
- `formatYAxisLabel?: (value) => string`
- `height?: React.CSSProperties["height"]`
- `loading?: boolean`
- `loadingLabel?: string`
- `showGridLines?: boolean`
- `showMarkers?: boolean`

It also accepts normal `div` HTML attributes.

## Behavior

- only one ordered series is supported in the first pass
- the component does not include an internal title or header
- loading, empty, and error states are handled inside the chart surface
- invalid `y` values are ignored before plotting
- x-axis labels are sampled automatically for dense series
- markers are optional and should be used selectively on denser data

## Accessibility

- `ariaLabel` is required so the chart always exposes a readable name
- `ariaDescription` is the place for a short trend summary or contextual explanation
- the component exposes itself as a grouped line chart surface instead of relying on raw SVG semantics
- loading state sets `aria-busy`

## Theme

`LunaLineChart` exposes component theme variables for:

- `--luna-line-chart-bg`
- `--luna-line-chart-border`
- `--luna-line-chart-axis-text`
- `--luna-line-chart-axis-line`
- `--luna-line-chart-grid`
- `--luna-line-chart-line`
- `--luna-line-chart-marker-fill`
- `--luna-line-chart-marker-stroke`
- `--luna-line-chart-empty-bg`

The default theme also provides sizing controls for height, padding, label spacing, stroke width, and marker size.

## First-Pass Limits

- single-series only
- no mixed chart modes
- no chart header API
- no chart builder or plugin abstraction
- no zooming, panning, or tooltip system

This keeps the primitive aligned with the issue scope and leaves broader chart-system work for later phases.
