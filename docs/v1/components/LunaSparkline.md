# LunaSparkline

`LunaSparkline` is the compact trend primitive for `react-luna`.

It owns:
- one ordered numeric series
- compact line-only trend presentation
- theme-driven tone, size, and stroke treatment
- required accessibility text for non-text trend summaries

It does not own:
- chart axes, legends, or tooltips
- multiple series
- card chrome or dashboard layout
- broad chart configuration

## Props

- `data: number[]`
- `ariaLabel: string`
- `tone?: "neutral" | "positive" | "negative"`
- `size?: string`
- `strokeWidth?: string | number`
- `width?: React.CSSProperties["width"]`
- `height?: React.CSSProperties["height"]`

It also accepts normal SVG attributes for the root element.

## Contract

- `LunaSparkline` always renders an SVG image surface with a required accessible name
- `data` is ordered from oldest to newest
- `tone` defaults through `theme.components.sparkline.defaultTone`
- `size` resolves through `theme.components.sparkline.sizes` first, then theme spacing, then raw CSS values
- `width`, `height`, and `strokeWidth` can override the themed compact defaults directly
- empty data renders an intentionally minimal horizontal placeholder line
- a one-point series renders a stable minimal line instead of failing
- flat and low-variance series stay readable at compact size

## Theme Integration

`LunaSparkline` consumes the existing `ThemeProvider` for:
- default compact size
- default tone
- stroke width
- positive, negative, and neutral stroke colors
- mode-aware empty state stroke color

## Accessibility

- the root SVG uses `role="img"`
- `ariaLabel` is required and becomes the accessible name
- decorative usage should still provide meaningful trend text because the primitive communicates information without visible text

## When To Use It

- use `LunaSparkline` when a card, panel, or summary row needs compact historical context
- use a fuller chart surface when users need scales, comparison, inspection, or multi-series analysis
