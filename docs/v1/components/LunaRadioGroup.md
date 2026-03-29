# LunaRadioGroup

`LunaRadioGroup` is the grouped single-choice selection composite for `react-luna`.

It owns:
- one shared selection value across related `LunaRadio` options
- controlled and uncontrolled selection state
- group-level label, description, help, and error text
- vertical and horizontal option layout

It does not own:
- nested field composition
- async option loading
- custom item rendering outside the built-in radio option shape

## Props

- `items: Array<{ value: string; label: React.ReactNode; description?: React.ReactNode; disabled?: boolean }>`
- `name: string`
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `value?: string`
- `defaultValue?: string`
- `onValueChange?: (value: string) => void`
- `orientation?: "vertical" | "horizontal"`

Native `FieldsetHTMLAttributes<HTMLFieldSetElement>` continue to pass through to the root group, except for `children`, `defaultValue`, and `onChange`.

## Contract

- uses a native `fieldset` and `legend` for group semantics
- builds on `LunaRadio` for each option
- `value` makes the group controlled
- `defaultValue` seeds uncontrolled state
- if neither `value` nor `defaultValue` resolves to an enabled item, the first enabled item is selected when available
- disabled items stay visible but cannot be selected
- `error` takes precedence over `helpText`
- `orientation="horizontal"` changes layout only; selection semantics stay the same
- group-level `disabled` disables every option

## Accessibility Notes

- the rendered group uses native fieldset semantics and exposes a grouped radio control through the browser accessibility tree
- the legend provides the shared group label
- group-level description and support text are attached through `aria-describedby`
- radio exclusivity remains native through the shared `name`

## Theme Integration

`LunaRadioGroup` reuses the existing radio and form-adjacent token families for:
- label and description color
- help and error text treatment
- disabled group text treatment
- layout spacing between the group shell and individual options
