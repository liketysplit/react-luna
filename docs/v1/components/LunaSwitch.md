# LunaSwitch

`LunaSwitch` is the binary toggle primitive for `react-luna`.

It owns:
- on and off state rendering
- label rendering
- description, help, and error text rendering
- theme-aware toggle styling

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`

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
- `description` sits under the main label
- `error` takes precedence over `helpText`
- invalid state affects border and support text treatment
- switch stays at one medium size in V1 to stay aligned with checkbox

## Theme Integration

`LunaSwitch` uses the theme provider and reuses the checkbox token family in V1 for:
- off track background and border
- on track background and border
- thumb foreground
- hover and focus treatment
- disabled colors
- error colors
- label and description colors
