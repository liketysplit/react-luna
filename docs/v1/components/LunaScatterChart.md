# LunaScatterChart

`LunaScatterChart` is the baseline single-series relationship chart for `react-luna`.

It owns:
- paired numeric x and y values only
- a framed scatter chart surface for panels and dashboards
- readable built-in numeric axes
- an optional legend for the lone series
- defined empty, loading, and error states

Default root element:
- `section`

## Props

- `data: LunaScatterChartDatum[]`
- `ariaLabel: string`
- `ariaDescription?: string`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `showLegend?: boolean`
- `showGrid?: boolean`
- `height?: React.CSSProperties["height"]`
- `loading?: boolean`
- `error?: React.ReactNode`
- `emptyState?: React.ReactNode`

`LunaScatterChartDatum` supports:
- `id?: string`
- `label?: string`
- `x: number`
- `y: number`

## Contract

- the chart stays single-series and does not expose multi-series configuration
- `data` accepts only paired numeric values so the axis behavior stays disciplined
- legend treatment is optional and resolves to a single keyed series label with point count
- axis labels are derived from built-in numeric formatting instead of consumer formatting hooks
- `description` is visible copy, while `ariaDescription` adds extra assistive context when needed
- `loading`, `error`, and `emptyState` keep the chart container stable rather than collapsing the surface

## Theme Integration

`LunaScatterChart` uses theme tokens for:
- surface background, border, and shadow
- plot background treatment
- axis text, axis line, and grid line color
- legend text treatment
- point palette
- point size
- padding, gaps, radius, and chart height
