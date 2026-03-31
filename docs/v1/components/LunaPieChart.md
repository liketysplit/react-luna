# LunaPieChart

`LunaPieChart` is a first-pass categorical proportion chart for `react-luna`.

It is responsible for:
- showing how ordered categories contribute to a whole
- keeping the readable breakdown in a required legend
- exposing a narrow, themeable chart surface that fits dashboard and panel layouts
- defining loading, empty, and error states

It is not responsible for:
- donut presentation
- multi-series charting
- generic chart-builder configuration
- advanced label placement systems

## Contract

`LunaPieChart` intentionally stays narrow.

Core rules:
- `data` is ordered categorical input for one series only
- `ariaLabel` is required so the chart always has an accessible name
- the visible breakdown is legend-first by design
- empty state is inferred when there are no positive values to plot
- `loading` and `error` switch the surface into defined non-data states

Intentional choice:
- this first pass keeps labels in the legend instead of on the slices so the chart remains readable at panel size and narrow widths

## Props

- `ariaLabel: string`
- `data: Array<{ id?: string; label: string; value: number; color?: string }>`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `loading?: boolean`
- `error?: React.ReactNode`
- `empty?: React.ReactNode`
- `showLegend?: boolean`
- `size?: string`

### Data

Rules:
- `data` order is preserved in both the slices and the legend
- non-positive and non-finite values are treated as zero
- the chart uses positive values only when calculating the whole
- zero-value categories still stay visible in the legend so the ordered key remains stable

### Accessibility

Rules:
- `ariaLabel` names the chart graphic directly
- visible `description` is linked into the chart accessibility description when present
- the component also emits a hidden textual summary of the total and category breakdown

This keeps the chart understandable even when the visual pie alone would not be enough.

### Legend

Rules:
- the default presentation is legend-forward
- `showLegend` defaults to `true`
- when `showLegend` is set to `false`, the legend remains in the DOM but becomes visually hidden

The baseline recommendation is still to leave the visible legend on.

### Size

- `size?: string`

Built-in size keys:
- `small`
- `medium`
- `large`

Theme size profiles control:
- chart diameter
- content gap
- legend gap
- legend swatch size
- minimum surface height

## States

`LunaPieChart` defines these states:
- ready
- loading
- empty
- error

Priority:
1. `loading`
2. `error`
3. empty inferred from data
4. ready

## Theme Expectations

`LunaPieChart` depends on the theme for:
- default size key
- size profiles
- slice palette
- surface background, border, and shadow
- chart track and slice separators
- title, description, legend, and state text colors

Downstream themes should be able to reshape the chart’s palette and chrome without changing the component contract.

## Testing Focus

The chart contract should stay covered in unit tests for:
- normal data rendering
- empty state behavior
- legend presence
- accessibility naming and description wiring
- theme-driven sizing and surface token resolution
