# LunaTabs

`LunaTabs` is the grouped section-switching composite for `react-luna`.

It owns:
- one tablist with related section triggers
- controlled and uncontrolled active state
- automatic or manual keyboard activation
- horizontal and vertical orientation
- theme-aware list and panel surfaces

It does not own:
- nested routing
- asynchronous data loading
- mobile drawer or carousel behavior
- cross-page navigation state

## Props

- `items: Array<{ value: string; label: React.ReactNode; panel: React.ReactNode; disabled?: boolean }>`
- `value?: string`
- `defaultValue?: string`
- `onValueChange?: (value: string) => void`
- `activationMode?: "automatic" | "manual"`
- `orientation?: "horizontal" | "vertical"`
- `size?: string`
- `fullWidth?: boolean`

Native `HTMLAttributes<HTMLDivElement>` continue to pass through to the root wrapper.

## Contract

- `items` is the full contract surface for tabs and panels in this first version
- `value` makes the component controlled
- `defaultValue` seeds uncontrolled state
- if neither `value` nor `defaultValue` resolves to an enabled item, the first enabled item is selected
- disabled items remain visible but cannot be selected
- `activationMode="automatic"` updates selection during arrow-key navigation
- `activationMode="manual"` moves focus first and only changes selection with `Enter` or `Space`
- `orientation` changes both layout treatment and arrow-key behavior
- `fullWidth` lets each trigger share the available inline space
- `className` and `style` pass through to the root

## Accessibility Notes

- the tablist uses `role="tablist"`
- each trigger uses `role="tab"` and is linked to its panel with `aria-controls`
- each panel uses `role="tabpanel"` and `aria-labelledby`
- keyboard support includes:
  - horizontal `ArrowLeft` and `ArrowRight`
  - vertical `ArrowUp` and `ArrowDown`
  - `Home`
  - `End`
  - `Enter` and `Space` when manual activation is active

## Theme Integration

`LunaTabs` consumes the existing theme system for:
- default size
- list radius
- panel radius
- root gap
- per-size spacing and typography
- list, tab, panel, and focus surface tokens for light and dark modes

Theme overrides live under `theme.components.tabs`.
