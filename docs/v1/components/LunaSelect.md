# LunaSelect

`LunaSelect` is the base single-selection dropdown primitive for `react-luna`.

It owns:
- label rendering
- select field shell rendering
- help and error text rendering
- theme-aware field states
- custom single-select interaction

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `options: Array<{ value: string; label: string; disabled?: boolean }>`
- `placeholder?: string`

Important native select props are also supported through passthrough, especially:
- `value`
- `defaultValue`
- `name`
- `disabled`
- `required`
- `autoFocus`

## Contract

- inset label is the default when `label` is present
- `externalLabel` opts back to the classic label-above-field layout
- inset labels rest in the field line when empty and float to the border when focused, filled, or when a placeholder is present
- the entire control shell is clickable
- selected values can be cleared from the field chrome
- `placeholder` provides the empty-state visible prompt
- `error` takes precedence over `helpText`
- `error` sets invalid visuals and `aria-invalid`
- `sm`, `md`, and `lg` align to the button size scale so field and button chrome can sit beside each other cleanly
- `fullWidth` stretches the field to its container

## Theme Integration

`LunaSelect` uses the same theme-backed field tokens as `LunaInput` and `LunaTextarea` for:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors
