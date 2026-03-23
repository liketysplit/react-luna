# LunaSlider

`LunaSlider` is the range-selection primitive for `react-luna`.

It owns:
- range entry through a native range input
- label rendering
- optional current value rendering
- description, help, and error text rendering
- theme-aware slider styling

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `showValue?: boolean`

Important native range props are also supported through passthrough, especially:
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

- uses a native range input for semantics
- `label` is the primary visible content
- `description` sits under the main label row
- `showValue` renders the current numeric value beside the label
- `error` takes precedence over `helpText`
- invalid state affects support text and focus treatment

## Theme Integration

`LunaSlider` uses the theme provider and the existing checkbox and input token families for:
- active track color
- thumb color
- inactive track color
- hover and focus treatment
- disabled colors
- help and error colors
- label and description colors
