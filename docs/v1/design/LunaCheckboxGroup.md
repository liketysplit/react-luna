# Checkbox Group Design

This document defines the design direction for `LunaCheckboxGroup` before implementation.

`LunaCheckboxGroup` should be the grouped multi-selection composite for the library. It should build directly on top of `LunaCheckbox` and stay narrow enough that downstream applications can still compose more specialized selection flows themselves.

## Design Stance

- Keep the composite narrow.
- Reuse `LunaCheckbox` for option rendering instead of creating a second checkbox presentation path.
- Use native `fieldset` and `legend` semantics for the group shell.
- Keep the public API focused on values and options, not per-row render callbacks in V1.
- Keep theme behavior aligned with the existing checkbox and supporting-text token families.

## Role In The System

`LunaCheckboxGroup` should own:
- group legend rendering
- optional group description, help text, and error text rendering
- controlled or uncontrolled selected values
- option mapping into `LunaCheckbox`
- shared disabled and invalid state wiring

`LunaCheckboxGroup` should not own:
- parent-child tree selection logic
- indeterminate group aggregation
- custom option templates
- column layout controls in V1

## Base Element Strategy

Visible structure:
- native `fieldset`
- native `legend`
- stacked checkbox rows rendered by `LunaCheckbox`

Rules:
- the fieldset should carry group-level support text wiring
- the legend should be the visible group label when one is present
- option semantics should remain native checkbox inputs via `LunaCheckbox`

## Core Contract

Option shape:

```ts
type LunaCheckboxGroupOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};
```

Recommended props:
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `name?: string`
- `options: LunaCheckboxGroupOption[]`
- `value?: string[]`
- `defaultValue?: string[]`
- `onChange?: (value: string[]) => void`

Important passthrough should remain available for the fieldset root:
- `id`
- `className`
- `style`
- `disabled`
- `aria-*`
- `data-*`

## State Model

V1 states:
- empty group
- one or many selected values
- disabled group
- invalid group

Rules:
- option selection stays independent because the composite is multi-select
- group `disabled` should disable every option
- option-level `disabled` should still work when the group is otherwise enabled
- invalid should affect group-level support text wiring and visuals without rewriting the checkbox option contract

## Theme Provider Integration

`LunaCheckboxGroup` should not introduce a dedicated theme slice in V1.

Direction:
- reuse checkbox label and description tokens for group heading and copy
- reuse checkbox help and error tokens for group-level support text
- keep spacing on the existing space scale

## Accessibility

V1 accessibility expectations:
- use native `fieldset` and `legend`
- keep native checkbox inputs through `LunaCheckbox`
- connect group description and support text through `aria-describedby`
- set invalid state through `aria-invalid`

## Storybook Expectations

Stories should explicitly show:
- basic unchecked state
- preselected state
- controlled selection
- disabled state
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- fieldset group semantics
- uncontrolled multi-selection
- controlled multi-selection
- `onChange` value updates
- help and error precedence
- disabled behavior

## Implementation Order

1. Lock this design
2. Build the component
3. Add Storybook coverage
4. Add unit tests
5. Add the component reference doc under `docs/v1/components`
