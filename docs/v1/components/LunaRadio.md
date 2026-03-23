# LunaRadio

`LunaRadio` is the base single-choice selection primitive for `react-luna`.

It owns:
- checked and unchecked state rendering
- label rendering
- description, help, and error text rendering
- theme-aware single-choice control styling

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`

Important native radio props are also supported through passthrough, especially:
- `checked`
- `defaultChecked`
- `disabled`
- `required`
- `name`
- `value`
- `onChange`
- `autoFocus`

## Contract

- uses a native radio input for semantics
- label click behavior stays native through the wrapping label structure
- radio exclusivity remains native through a shared `name`
- `description` sits under the main label
- `error` takes precedence over `helpText`
- invalid state affects border and support text treatment
- radio stays at one medium size in V1 to stay aligned with checkbox and avoid fake variability

## Theme Integration

`LunaRadio` uses the theme provider and reuses the checkbox token family in V1 for:
- unchecked border and background
- checked background and foreground
- hover and focus treatment
- disabled colors
- error colors
- label and description colors
