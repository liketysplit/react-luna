# LunaProgress

`LunaProgress` is the standard progress primitive for `react-luna`.

It owns:
- determinate and indeterminate progress presentation
- theme-driven track sizing, tone, radius, and motion
- visible label, description, and value text hooks
- accessible `progressbar` semantics

It does not own:
- task orchestration
- cancellation or retry controls
- application-specific status layouts

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `value?: number`
- `min?: number`
- `max?: number`
- `indeterminate?: boolean`
- `size?: string`
- `tone?: string`
- `showValue?: boolean`
- `valueLabel?: React.ReactNode`

## Contract

- `LunaProgress` renders a themed container with an internal element using `role="progressbar"`
- `indeterminate` defaults to `false`
- determinate mode uses `value`, `min`, and `max`, clamping `value` into the provided range
- indeterminate mode omits numeric progress attributes and animates the indicator instead
- `size` resolves through `theme.components.progress.sizes` first, then theme spacing, then raw CSS values
- `tone` resolves through `theme.components.progress.tones`
- `showValue` formats the current determinate progress as a percentage when `valueLabel` is not provided
- `valueLabel` overrides the default visible percentage text
- `className` and `style` pass through to the root

## Theme Integration

`LunaProgress` consumes the existing `ThemeProvider` for:
- default progress size
- default tone
- track radius
- indeterminate animation duration
- size profiles
- mode-aware track and text colors
- tone-specific fill and glow colors

## Accessibility

- the progress indicator uses `role="progressbar"`
- determinate mode sets `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- indeterminate mode omits numeric value attributes
- visible labels are linked with `aria-labelledby`
- visible descriptions are linked with `aria-describedby`
