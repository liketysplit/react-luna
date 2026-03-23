# Autocomplete Design

This document defines the design direction for `LunaAutocomplete` before implementation.

`LunaAutocomplete` should be the base single-selection suggestion field for the library. It should stay aligned with `LunaSelect` at the shell and value-contract level while replacing the closed trigger with a live text input and filtered listbox.

## Design Stance

- Keep the primitive narrow.
- Mirror `LunaSelect` and the other field primitives where possible.
- Use the same theme-backed field contract as `LunaInput`, `LunaTextarea`, and `LunaSelect`.
- Keep autocomplete distinct from multiselect and freeform tagging behavior.
- Treat typed text as a search query, not a committed value, in V1.

## Role In The System

`LunaAutocomplete` should own:
- label rendering
- field shell rendering
- help and error text rendering
- input-driven option filtering
- single selected value management
- clear behavior
- theme-aware field states

`LunaAutocomplete` should not own:
- multi-selection
- freeform custom values
- async loading in V1
- grouped options
- custom option templates in V1

## Base Element Strategy

Visible control:
- text input inside the standard field shell

Hidden form value:
- hidden input that mirrors the selected option value

Rules:
- the public ref should point at the visible text input
- the user types into the visible text input
- the hidden input preserves form submission with the selected option value

## Core Contract

Option shape:

```ts
type LunaAutocompleteOption = {
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
- `options: LunaAutocompleteOption[]`
- `placeholder?: string`
- `value?: string`
- `defaultValue?: string`
- `onChange?: (value: string) => void`
- `noResultsText?: React.ReactNode`

Important passthrough should remain available for the visible input and the root:
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

The label contract should match the other field primitives:
- inset label is the default when `label` is present
- `externalLabel` opts back to the label-above-field layout
- inset labels rest in the field line when empty
- inset labels float when the field is focused, filled, open, or when a placeholder exists

## Value Model

The committed component value is the selected option `value`, not the visible query text.

Rules:
- `value` and `defaultValue` refer to the selected option value
- the visible input text should show the selected option label when idle
- when the user types, the text becomes the active query
- selecting an option commits the option value and restores the input text to the option label
- clearing removes both the selected value and the query text

V1 should not commit arbitrary text that does not map to an option.

## Filtering Model

Default filtering:
- case-insensitive substring match against the option label

Rules:
- disabled options may still appear in filtered results
- if there are no matches, show a simple empty state row
- no custom filter hook in V1

## Interaction Model

Field behavior:
- the entire field shell should focus the input
- focusing the input opens the list when options exist
- typing updates the query and re-filters the list
- clicking outside closes the list
- `Escape` closes the list

Option behavior:
- clicking an option commits it and closes the list
- disabled options remain visible but cannot be committed

Clear behavior:
- when a selection or query exists, show a clear affordance in the field chrome
- clicking clear should remove the selected value and the visible query
- clear should not reopen the list
- disabled fields should not render a clear affordance

## Keyboard Model

V1 keyboard expectations:
- `ArrowDown` and `ArrowUp` move the highlighted option
- `Enter` commits the highlighted option
- `Escape` closes the list

## Theme Provider Integration

`LunaAutocomplete` should use the existing shared field tokens:
- size defaults
- control background and foreground
- border, hover, and focus styling
- disabled styling
- error styling
- label and supporting text colors

It should also follow the same minimum-width behavior as the select family.

## Dark Mode And Disabled Expectations

`LunaAutocomplete` must be visually checked in:
- default light mode
- forced dark mode
- disabled state
- disabled dark mode

The same floating-label mask treatment used by the other field primitives should apply here too.

## Accessibility

V1 accessibility expectations:
- label association should work the same way as `LunaInput`
- help and error text should connect through `aria-describedby`
- invalid state should use `aria-invalid`
- the visible control should expose `aria-expanded`, `aria-controls`, and `aria-activedescendant`
- the option panel should use `role="listbox"`
- each option should use `role="option"` and expose selected state with `aria-selected`

## Storybook Expectations

Stories should explicitly show:
- basic state
- inset versus external label
- size variants
- empty, selected, filtered, and no-results states
- disabled state
- dark mode
- supporting text and error states

## Testing Focus

When implemented, tests should cover:
- inset label default
- external label opt-out
- whole-shell focus behavior
- filtering on input
- option commit behavior
- clear behavior
- disabled behavior
- no-results state
- help and error precedence
- size prop on the field root

## Implementation Order

1. Lock this design
2. Build the component
3. Add Storybook coverage
4. Add unit tests
5. Add the component reference doc under `docs/v1/components`
