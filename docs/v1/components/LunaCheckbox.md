# LunaCheckbox

`LunaCheckbox` is the base boolean selection primitive for `react-luna`.

It owns:
- checked and unchecked state rendering
- indeterminate rendering
- label rendering
- description, help, and error text rendering
- theme-aware boolean control styling

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `indeterminate?: boolean`

Important native checkbox props are also supported through passthrough, especially:
- `checked`
- `defaultChecked`
- `disabled`
- `required`
- `name`
- `value`
- `onChange`
- `autoFocus`

## Contract

- uses a native checkbox input for semantics
- label click behavior stays native through the wrapping label structure
- `indeterminate` is a first-class visual and semantic state
- `indeterminate` is intended for partial-selection or parent-child selection UIs
- `description` sits under the main label
- `error` takes precedence over `helpText`
- invalid state affects border and support text treatment
- checkbox stays at one medium size in V1 to avoid fake variability
- direct user interaction clears the mixed state unless a parent controller reapplies it

## Theme Integration

`LunaCheckbox` uses the theme provider and a dedicated checkbox theme slice for:
- unchecked border and background
- checked background and foreground
- hover and focus treatment
- disabled colors
- error colors
- label and description colors
