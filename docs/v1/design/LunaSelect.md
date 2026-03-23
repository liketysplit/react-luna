# Select Design

This document defines the design direction for `LunaSelect`.

`LunaSelect` should be the base single-selection dropdown primitive for `react-luna`. It should stay aligned with the field-shell behavior from `LunaInput` and `LunaTextarea` while keeping the option model intentionally simple.

## Design Stance

- Keep `LunaSelect` narrow.
- Use the same theme-backed field shell as the input primitives.
- Use a fixed option shape instead of a configurable item-mapping system.
- Do not fold multiselect or autocomplete behavior into this primitive.

## Core Contract

Option shape:

```ts
type LunaSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
```

Recommended props:
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `options: LunaSelectOption[]`
- `placeholder?: string`

Important native select props should still surface through passthrough, especially:
- `value`
- `defaultValue`
- `name`
- `disabled`
- `required`
- `autoFocus`

## Behavior Rules

- inset label is the default when `label` is present
- `externalLabel` opts back to the label-above-field layout
- inset labels rest in the field line when empty and float when focused, filled, or when a placeholder is present
- the entire field shell should act as the trigger
- selected values should be clearable from the control itself
- `placeholder` should render as the visible empty prompt
- `error` takes precedence over `helpText`
- no multiselect behavior in this primitive
- no autocomplete or search behavior in this primitive

## Research Notes

Sanity checks:
- Vuetify supports configurable item title and item value mapping, but that is broader than we need for a base select
- Cloudscape’s select guidance reinforces keeping single selection separate from more advanced suggestion-based controls

The V1 choice here is:
- fixed `{ value, label, disabled? }` option shape
- custom single-select behavior with a controlled listbox panel
- separate roadmap items for multiselect and autocomplete

## Accessibility

- the public ref should point at the native `select`
- label association should work the same way as `LunaInput`
- help and error text should connect through `aria-describedby`
- invalid state should use `aria-invalid`
