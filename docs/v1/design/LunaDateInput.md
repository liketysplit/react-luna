# Date Input Design

This document defines the design direction for `LunaDateInput` before implementation.

`LunaDateInput` is the native date-entry fallback for `react-luna`. It stays visually aligned with `LunaInput` and uses the same theme-backed field shell, but it is not the final date experience for the library.

## Design Stance

- Base the component on the `LunaInput` shell and support-text model.
- Keep the primitive narrow and native.
- Use the existing theme provider and input token family.
- Let the browser own calendar behavior in V1.
- Treat this component as groundwork for a future unified `LunaDatePicker`.

## Role In The System

`LunaDateInput` should own:
- date entry through a native date input
- inset or external label rendering
- help and error text rendering
- disabled and invalid visuals
- theme-aware field styling
- a simple mode fallback for environments where the browser picker is acceptable

`LunaDateInput` should not own:
- custom calendar popovers
- range picking
- time selection
- timezone handling

## Base Element Strategy

Visible control:
- native `input type="date"`

Root structure:
- field wrapper
- optional label
- control shell
- native date input
- optional support text block

Rules:
- keep the native date input in the DOM
- reuse the existing input shell model
- do not simulate a custom picker in V1
- do not treat this as the final user-facing date solution

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`

Important native date-input props should still surface through passthrough, especially:
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

## Forward Path

The intended end state is a unified date component:
- `LunaDatePicker`
- `mode="simple" | "picker" | "range"`

That means:
- `simple` can use the native date-input path
- `picker` should provide the full single-date calendar experience
- `range` should use the same calendar system with range selection

This native date input should therefore be treated as supporting groundwork, not the final primary date primitive.

## Label Model

Rules:
- inset label is the default
- `externalLabel` opts back to an outside label
- the inset label should remain floated by default so it does not collide with native date format placeholders
- `error` takes precedence over `helpText`

## State Model

V1 states:
- idle
- filled
- focused
- disabled
- invalid

Rules:
- date input should inherit the same field colors and focus treatment as `LunaInput`
- disabled and invalid treatment should match the field family

## Theme Provider Integration

`LunaDateInput` should use the existing input token family.

Expected theme concerns:
- field background and foreground
- border and hover border
- focus ring
- disabled colors
- error colors
- label and support text colors

## Accessibility

V1 accessibility expectations:
- keep the native date input
- support `aria-invalid`
- label association should work through native label markup
- help and error text should connect through `aria-describedby`

## Storybook Expectations

Stories should explicitly show:
- basic date entry
- inset and external labels
- disabled states
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- native date input semantics
- inset label activation from a filled value
- help and error precedence
- disabled behavior
- invalid state wiring
