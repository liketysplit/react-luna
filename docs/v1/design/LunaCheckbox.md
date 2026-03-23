# Checkbox Design

This document defines the design direction for `LunaCheckbox` before implementation.

`LunaCheckbox` should be the base boolean selection primitive for the library. It should stay visually aligned with our button and field language while keeping the interaction model narrow and predictable.

## Reference Read

The sanity check from Vuetify and Cloudscape points to the same core shape:
- a checkbox should stay a small, explicit boolean control
- label content should be first-class
- indeterminate should be a state, not a separate component
- checkbox, radio, and toggle should remain distinct primitives

That matches the direction we should take here.

## Design Stance

- Keep the primitive narrow.
- Use the existing theme provider rather than inventing ad hoc colors.
- Borrow color confidence from `LunaButton` and supporting text rules from the field family.
- Keep checkbox, radio, and switch separate.
- Treat indeterminate as an explicit visual and semantic state.

## Role In The System

`LunaCheckbox` should own:
- checked and unchecked state rendering
- indeterminate rendering
- label rendering
- help and error text rendering
- disabled and invalid visuals
- theme-aware boolean control styling

`LunaCheckbox` should not own:
- group behavior
- radio-style exclusivity
- switch or toggle semantics
- parent-child tree selection logic in V1

## Indeterminate Use Case

`indeterminate` exists for partial-selection UI.

Typical use:
- a parent checkbox controls a set of child checkboxes
- all children selected -> checked
- none selected -> unchecked
- some selected -> indeterminate

This is useful, but it is not meant to be the everyday default state for a standalone checkbox.

## Base Element Strategy

Visible control:
- native `input type="checkbox"`

Root structure:
- wrapper
- native checkbox input
- visual box
- label text block
- optional support text block

Rules:
- keep the native checkbox in the DOM
- style the visible box rather than replacing semantics with a button
- clicking the label block should toggle the checkbox through native label behavior

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `indeterminate?: boolean`

Important native checkbox props should still surface through passthrough, especially:
- `checked`
- `defaultChecked`
- `disabled`
- `required`
- `name`
- `value`
- `onChange`
- `autoFocus`

## Label Model

Rules:
- `label` is the primary visible content
- `description` is optional secondary content under the label
- `helpText` and `error` live below the main control row
- `error` takes precedence over `helpText`

This keeps checkbox aligned with the field-family support text rules without forcing a full field shell.

## State Model

V1 states:
- unchecked
- checked
- indeterminate
- focused
- disabled
- invalid

Rules:
- checked and indeterminate should use the same selected surface family
- invalid should affect border and supporting text treatment, not invent a new selection color
- disabled should mute both control and label
- direct user interaction should clear the mixed state and fall back to normal checked behavior unless a parent controller reapplies it

## Theme Provider Integration

`LunaCheckbox` should use the existing theme provider path and add a checkbox component slice if needed.

Direction:
- selected color family should harmonize with `LunaButton`
- border, disabled, help, and error treatment should harmonize with the field family

Expected theme concerns:
- one medium checkbox size profile
- checked background and foreground
- unchecked border
- hover border
- focus ring
- disabled colors
- error colors
- label and description colors

## Accessibility

V1 accessibility expectations:
- keep the native checkbox input
- support `aria-invalid`
- reflect indeterminate with the native property and mixed semantics
- label association should work through native label markup
- help and error text should connect through `aria-describedby`

## Storybook Expectations

Stories should explicitly show:
- basic checked and unchecked states
- indeterminate state
- disabled states
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- native checkbox semantics
- label click behavior
- indeterminate property application
- help and error precedence
- disabled behavior
- invalid state wiring

## Implementation Order

1. Lock this design
2. Build the component
3. Add Storybook coverage
4. Add unit tests
5. Add the component reference doc under `docs/v1/components`
