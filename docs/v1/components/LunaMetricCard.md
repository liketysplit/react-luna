# LunaMetricCard

`LunaMetricCard` is the focused KPI presentation surface for `react-luna`.

It is intended for:

- primary metric summaries
- dashboard KPI bands
- app shell overview sections
- compact metric callouts that may optionally pair with a small trend visual

It is not intended for:

- generic grouped content
- arbitrary widget composition
- replacing `LunaPanel` or `LunaCard`

## Props

- `as?: React.ElementType`
- `label: React.ReactNode`
- `value: React.ReactNode`
- `delta?: React.ReactNode`
- `trend?: "up" | "down" | "neutral"`
- `meta?: React.ReactNode`
- `tone?: "default" | "info" | "success" | "warning" | "danger"`
- `visual?: React.ReactNode`

It also accepts normal HTML attributes for the chosen element.

## Behavior

- `label` and `value` are required
- the root is a named region by default, using both the label and value for its accessible name
- `delta` is optional and can render with or without `meta`
- `trend` controls the delta emphasis color and status text when delta is present
- if no `delta` and no `meta` are provided, the footer region is omitted
- `visual` is an optional compact slot for embedded trend content such as a sparkline or simple bars
- the layout compresses by wrapping the visual slot beneath the metric content when width is constrained

## When To Use It

Use `LunaMetricCard` when the surface is primarily about one metric.

Choose `LunaCard` when the surface needs broader grouped content, actions, or a reusable body shell.

Choose `LunaPanel` when the surface is more about labeled content structure than KPI emphasis.

## Theme

`LunaMetricCard` exposes component-specific theme variables for:

- `--luna-metric-card-padding`
- `--luna-metric-card-gap`
- `--luna-metric-card-radius`
- `--luna-metric-card-header-gap`
- `--luna-metric-card-footer-gap`
- `--luna-metric-card-label-font-size`
- `--luna-metric-card-label-letter-spacing`
- `--luna-metric-card-value-font-size`
- `--luna-metric-card-value-line-height`
- `--luna-metric-card-delta-font-size`
- `--luna-metric-card-meta-font-size`
- `--luna-metric-card-visual-min-width`
- `--luna-metric-card-bg`
- `--luna-metric-card-border`
- `--luna-metric-card-shadow`
- `--luna-metric-card-label-fg`
- `--luna-metric-card-value-fg`
- `--luna-metric-card-meta-fg`
- `--luna-metric-card-visual-bg`
- `--luna-metric-card-trend-up-fg`
- `--luna-metric-card-trend-down-fg`
- `--luna-metric-card-trend-neutral-fg`

Tone accents are also themeable through:

- `--luna-metric-card-tone-default`
- `--luna-metric-card-tone-info`
- `--luna-metric-card-tone-success`
- `--luna-metric-card-tone-warning`
- `--luna-metric-card-tone-danger`
