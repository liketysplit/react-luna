# LunaTextarea

`LunaTextarea` is the multiline text field primitive for `react-luna`.

It owns:
- label rendering
- multiline field shell rendering
- help and error text rendering
- theme-aware field states
- native textarea passthrough
- resize and autosize behavior

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `resize?: "none" | "vertical" | "horizontal" | "both"`
- `autoGrow?: boolean`
- `minRows?: number`
- `maxRows?: number`
- `minHeight?: string`
- `height?: string`

Important native textarea props are also supported through passthrough, especially:
- `value`
- `defaultValue`
- `placeholder`
- `name`
- `disabled`
- `readOnly`
- `required`
- `rows`

## Contract

- inset labels are the default when `label` is present
- `externalLabel` opts back to the classic label-above-field layout
- inset labels rest in the textarea line when empty and float to the border when focused, filled, or when a placeholder is present
- `resize` defaults to `none`
- `autoGrow` grows with content and respects `minRows` and `maxRows`
- `minHeight` and `height` are direct style conveniences
- `error` takes precedence over `helpText`
- `error` sets invalid visuals and `aria-invalid`

## Theme Integration

`LunaTextarea` uses the same theme-backed field tokens as `LunaInput` for:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors
