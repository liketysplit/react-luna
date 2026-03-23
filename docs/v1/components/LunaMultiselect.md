# LunaMultiselect

`LunaMultiselect` is the base multi-selection dropdown primitive for `react-luna`.

It owns:
- label rendering
- multiselect field shell rendering
- help and error text rendering
- theme-aware field states
- custom multi-select interaction

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `options: Array<{ value: string; label: string; disabled?: boolean }>`
- `placeholder?: string`
- `value?: string[]`
- `defaultValue?: string[]`
- `onChange?: (value: string[]) => void`

Important native select props are also supported through passthrough, especially:
- `name`
- `disabled`
- `required`
- `autoFocus`

## Contract

- inset label is the default when `label` is present
- `externalLabel` opts back to the classic label-above-field layout
- inset labels rest in the field line when empty and float to the border when focused, filled, open, or when a placeholder is present
- the entire control shell is clickable
- option clicks toggle values without closing the list
- selected values can be cleared from the field chrome
- the closed field shows the first selected label and summarizes additional values as `(+N)`
- `placeholder` provides the empty-state visible prompt
- `error` takes precedence over `helpText`
- `error` sets invalid visuals and `aria-invalid`
- `sm`, `md`, and `lg` align to the button size scale so field and button chrome can sit beside each other cleanly
- the field keeps a stable minimum width so empty and cleared states do not collapse the shell
- `fullWidth` stretches the field to its container

## Theme Integration

`LunaMultiselect` uses the same theme-backed field tokens as `LunaInput`, `LunaTextarea`, and `LunaSelect` for:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors
