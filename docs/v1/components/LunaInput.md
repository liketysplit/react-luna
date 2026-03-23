# LunaInput

`LunaInput` is the base single-line field primitive for `react-luna`.

It owns:
- label rendering
- control shell rendering
- optional leading and trailing content
- help and error text rendering
- theme-aware field states
- native input passthrough

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `leading?: React.ReactNode`
- `trailing?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`

Important native input props are also supported through passthrough, especially:
- `value`
- `defaultValue`
- `placeholder`
- `type`
- `name`
- `disabled`
- `readOnly`
- `required`
- `autoComplete`

## Contract

- `label` connects to the native input through `htmlFor` and `id`
- inset labels are the default when `label` is present
- `externalLabel` opts back to the classic label-above-field layout
- inset labels rest in the input line when empty and float to the border when focused, filled, or when a placeholder is present
- `error` takes precedence over `helpText`
- `error` sets invalid visuals and `aria-invalid`
- `leading` and `trailing` render inside the control shell
- `inputSize` controls field height, spacing, and font size
- `sm`, `md`, and `lg` align to the button size scale so field and button chrome can sit beside each other cleanly
- `fullWidth` stretches the field to its container
- `className`, `style`, `data-*`, and `aria-*` still pass through the native input contract

## Theme Integration

`LunaInput` consumes the existing `ThemeProvider` for:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors

## Accessibility

- the public ref points at the real native `input`
- if no `label` is provided, callers should use native `aria-label` or `aria-labelledby`
- help and error text connect through `aria-describedby`
