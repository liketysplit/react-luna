# LunaLineChart

`LunaLineChart` is the baseline single-series trend chart for `react-luna`.

It owns:
- ordered single-series line rendering
- readable x and y axis presentation for sparse and moderately dense data
- optional legend and grid treatments
- accessible chart naming and description hooks
- defined empty, loading, and error states inside the same chart shell

It does not own:
- multi-series comparison
- area or mixed-chart rendering
- generic chart-builder configuration
- data fetching or retry orchestration

## Props

- `data: Array<{ label: string; value: number }>`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `ariaLabel?: string`
- `ariaDescription?: string`
- `legendLabel?: React.ReactNode`
- `showLegend?: boolean`
- `showGrid?: boolean`
- `loading?: boolean`
- `error?: React.ReactNode`

## Contract

- `LunaLineChart` renders a single ordered series only
- `data` order is preserved exactly; the component does not sort
- each datum must provide a display `label` and numeric `value`
- `showLegend` reveals a single-series key; the legend label resolves from `legendLabel`, then string `title`, then `Series`
- `showGrid` controls horizontal gridlines only
- point markers render automatically for shorter series and are suppressed for denser ones to avoid clutter
- `loading` wins over data display and keeps the chart footprint stable
- `error` renders an error state shell instead of the chart body
- empty data renders a defined empty state shell
- `className` and `style` pass through to the root container

## Accessibility

- the rendered chart surface uses `role="img"`
- accessible naming should come from `ariaLabel`
- if `ariaLabel` is omitted, a plain string `title` becomes the fallback accessible name
- `ariaDescription` can provide a chart-specific accessible description
- a plain string `description` is also linked to the chart when `ariaDescription` is not provided

## Theme Integration

`LunaLineChart` consumes the existing `ThemeProvider` for:
- chart height, padding, and radius
- surface and border colors
- title, description, axis, and legend text colors
- grid, line, and marker colors
- marker and line sizing
- state background and state border treatment

## State Model

- ready: render the line chart body
- loading: render the loading shell
- empty: render the empty shell when `data.length === 0`
- error: render the error shell when `error` is provided
