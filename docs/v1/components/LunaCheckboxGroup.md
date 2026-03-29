# LunaCheckboxGroup

`LunaCheckboxGroup` is the grouped multi-selection composite built on top of `LunaCheckbox`.

It owns:
- group legend rendering
- optional group description, help text, and error text rendering
- controlled or uncontrolled selected values
- option mapping into native checkbox inputs

## Props

- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `name?: string`
- `options: Array<{ value: string; label: React.ReactNode; description?: React.ReactNode; disabled?: boolean }>`
- `value?: string[]`
- `defaultValue?: string[]`
- `onChange?: (value: string[]) => void`

Important native fieldset props are also supported through passthrough, especially:
- `id`
- `className`
- `style`
- `disabled`
- `aria-*`
- `data-*`

## Contract

- renders a native `fieldset` and `legend` for group semantics
- each option is rendered through `LunaCheckbox`
- each checkbox receives the shared `name` when provided for form submission
- `value` and `defaultValue` represent the selected option values
- `error` takes precedence over `helpText`
- group-level support text sits below the option list
- option-level `description` stays attached to its own checkbox row
- group `disabled` disables every checkbox in the set

## Theme Integration

`LunaCheckboxGroup` reuses the existing checkbox and field supporting-text token families for:
- group label color
- group description color
- help text color
- error text color
- disabled text treatment
