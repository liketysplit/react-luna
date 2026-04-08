# LunaBarChart

`LunaBarChart` is the baseline categorical comparison chart for `react-luna`.

It is responsible for:
- single-series categorical comparison
- finished chart presentation for panels and dashboards
- accessible naming and descriptive support
- theme-driven bar, axis, legend, and surface styling
- defined empty, loading, and error states

It is not responsible for:
- stacked or grouped data
- multi-series comparison
- free-form chart configuration
- interaction-heavy chart behavior

## Contract

`LunaBarChart` keeps a narrow first-pass contract on purpose.

Core rules:
- orientation is vertical only
- `data` stays ordered and single-series
- legend is optional and represents the one visible series
- the chart keeps a framed surface even in empty, loading, and error states
- labels wrap to preserve readability and expose the full value through native title text

## Props

- `data: Array<{ label: string; value: number }>`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `ariaLabel: string`
- `showLegend?: boolean`
- `loading?: boolean`
- `error?: React.ReactNode`
- `emptyState?: React.ReactNode`

Rules:
- `ariaLabel` is required for the chart graphic
- negative and non-finite values are normalized to zero for this baseline surface
- `error` wins over `loading`
- `loading` wins over empty-data rendering
- `showLegend` is off by default because this is a single-series chart

Legend strategy:
- when `showLegend` is enabled, the chart shows one legend item
- the legend label uses the string `title` when available
- otherwise the legend falls back to `Values`

Axis behavior:
- the numeric axis starts at zero
- the top tick rounds to a readable maximum
- the chart uses five horizontal tick lines to keep the baseline consistent across datasets

## Theme Expectations

`LunaBarChart` depends on `theme.components.barChart` for:
- surface background and border
- axis label and grid color
- legend text color
- value label color
- state text color
- bar palette
- chart padding, height, and density

The base theme ships a rotating palette and a panel-ready surface. Downstream themes can replace both without changing the component API.

## State Model

Defined states:
- ready: bars and axis render
- empty: a message explains that no categorical values are available
- loading: skeleton columns preserve the chart footprint
- error: the chart surface shows failure copy without collapsing layout

## Testing Focus

The bar chart should remain covered for:
- normal bar rendering
- empty, loading, and error behavior
- legend fallback behavior
- long-label handling
- accessibility naming and descriptive wiring
- theme token resolution
