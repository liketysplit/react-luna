# LunaDateInput

`LunaDateInput` is the native date-entry primitive for `react-luna`.

It owns:
- date entry through a native date input
- inset or external label rendering
- help and error text rendering
- theme-aware field styling

## Props

- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`

Important native date-input props are also supported through passthrough, especially:
- `value`
- `defaultValue`
- `min`
- `max`
- `step`
- `disabled`
- `required`
- `name`
- `onChange`
- `autoFocus`

## Contract

- uses a native date input for semantics and browser calendar behavior
- inset label is the default
- `externalLabel` opts back to an outside label
- inset label stays floated by default so it does not collide with native date format placeholders
- `error` takes precedence over `helpText`
- invalid state affects border and support text treatment

## Theme Integration

`LunaDateInput` uses the theme provider and the input token family for:
- field background and foreground
- border, hover, and focus treatment
- disabled colors
- error colors
- label and support text colors
