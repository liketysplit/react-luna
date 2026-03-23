# Multiselect Design

This document defines the design direction for `LunaMultiselect` before implementation.

`LunaMultiselect` should be the base multi-selection dropdown primitive for the library. It should stay visually and behaviorally aligned with `LunaSelect` while changing only the selection model and the closed-field summary.

## Design Stance

- Keep the primitive narrow.
- Mirror the `LunaSelect` shell and state model as closely as possible.
- Use the same theme-backed field contract as `LunaInput`, `LunaTextarea`, and `LunaSelect`.
- Keep multiselect distinct from autocomplete and tagging behavior.
- Keep the public API simple enough that downstream applications do not need custom CSS for common multi-selection cases.

## Role In The System

`LunaMultiselect` should own:
- label rendering
- field shell rendering
- help and error text rendering
- custom multi-select interaction
- selection summary rendering in the closed field
- clear-all behavior
- theme-aware field states

`LunaMultiselect` should not own:
- freeform text input
- option filtering
- async suggestion loading
- chip layout inside the field
- custom option templates in V1

## Base Element Strategy

Visible trigger:
- button-like field shell, matching `LunaSelect`

Hidden native element:
- `select multiple`

Rules:
- the public ref should point to the hidden native `select`
- the visible control owns the interaction model
- the hidden `select` preserves form compatibility and native value semantics

## Core Contract

Option shape:

```ts
type LunaMultiselectOption = {
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
- `options: LunaMultiselectOption[]`
- `placeholder?: string`
- `value?: string[]`
- `defaultValue?: string[]`
- `onChange?: (value: string[]) => void`

Important passthrough should remain available for the hidden native select and the root:
- `name`
- `disabled`
- `required`
- `autoFocus`
- `className`
- `style`
- `id`
- `aria-*`
- `data-*`

## Label Model

The label contract should match `LunaSelect` exactly:
- inset label is the default when `label` is present
- `externalLabel` opts back to the label-above-field layout
- inset labels rest in the field line when empty
- inset labels float when the field is focused, filled, open, or when a placeholder exists

This keeps the field family coherent.

## Closed Field Display

The closed field should not render chips in V1.

Display rules:
- no selection -> show `placeholder`
- one selection -> show the selected label
- multiple selections -> show the first selected label plus `(+N)`

Example:
- `Moon phase`
- `Moon phase (+3)`

Reasoning:
- chips become noisy with long option names
- a summary string is more stable across narrow widths
- the first selected label still gives the user a concrete anchor

## Interaction Model

Field behavior:
- the entire field shell should act as the trigger
- clicking the shell opens or closes the list
- clicking outside closes the list
- `Escape` closes the list

Option behavior:
- clicking an option toggles its selected state
- toggling should not close the list
- disabled options remain visible but cannot be toggled

Clear behavior:
- when values exist, show a clear-all affordance in the field chrome
- clicking clear should remove all selections
- clear should not open the list
- disabled fields should not render a clear affordance

## Keyboard Model

V1 keyboard expectations:
- `ArrowDown` and `ArrowUp` move the highlighted option
- `Enter` and `Space` toggle the highlighted option
- `Escape` closes the list

This should match the select trigger model where practical.

## Theme Provider Integration

`LunaMultiselect` should use the existing shared field tokens through the current theme provider path:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors

It should not create a separate multiselect-specific theme slice in V1.

## Dark Mode And Disabled Expectations

`LunaMultiselect` must be visually checked in:
- default light mode
- forced dark mode
- disabled state
- disabled dark mode

The same floating-label mask treatment used by the other field primitives should apply here too.

## Accessibility

V1 accessibility expectations:
- label association should work the same way as `LunaSelect`
- help and error text should connect through `aria-describedby`
- invalid state should use `aria-invalid`
- the option panel should use `role="listbox"` with `aria-multiselectable="true"`
- each option should use `role="option"` and expose selected state with `aria-selected`

## Storybook Expectations

Stories should explicitly show:
- basic state
- inset versus external label
- size variants
- empty, one selected, and many selected states
- disabled state
- dark mode
- supporting text and error states

## Testing Focus

When implemented, tests should cover:
- inset label default
- external label opt-out
- whole-shell click opening
- toggle behavior without auto-closing
- summary rendering for multiple values
- clear-all behavior
- disabled behavior
- help and error precedence
- size prop on the field root

## Implementation Order

1. Lock this design
2. Build the component
3. Add Storybook coverage
4. Add unit tests
5. Add the component reference doc under `docs/v1/components`
