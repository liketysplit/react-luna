# LunaAutocomplete

`LunaAutocomplete` is the base single-selection suggestion field for `react-luna`.

It owns:
- label rendering
- autocomplete field shell rendering
- help and error text rendering
- input-driven option filtering
- custom single-select autocomplete interaction

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `options: Array<{ value: string; label: string; disabled?: boolean }>`
- `value?: string`
- `defaultValue?: string`
- `onChange?: (value: string) => void`
- `noResultsText?: React.ReactNode`

Important native input props are also supported through passthrough, especially:
- `name`
- `disabled`
- `required`
- `autoFocus`
- `placeholder`

## Contract

- inset label is the default when `label` is present
- `externalLabel` opts back to the classic label-above-field layout
- inset labels rest in the field line when empty and float to the border when focused, filled, open, or when a placeholder is present
- the entire control shell is clickable and focuses the input
- typing filters the option list with case-insensitive substring matching
- selecting an option commits its `value` and restores the visible input text to the option label
- arbitrary typed text is not committed as a value in V1
- selected values and active queries can be cleared from the field chrome
- `error` takes precedence over `helpText`
- `error` sets invalid visuals and `aria-invalid`
- `sm`, `md`, and `lg` align to the button size scale so field and button chrome can sit beside each other cleanly
- the field keeps a stable minimum width so empty and cleared states do not collapse the shell
- `fullWidth` stretches the field to its container

## Theme Integration

`LunaAutocomplete` uses the same theme-backed field tokens as `LunaInput`, `LunaTextarea`, and `LunaSelect` for:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors
