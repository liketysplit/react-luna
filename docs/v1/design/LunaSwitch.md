# Switch Design

This document defines the design direction for `LunaSwitch` before implementation.

`LunaSwitch` should be the binary toggle primitive for `react-luna`. It should stay theme-aligned with `LunaCheckbox`, but read clearly as a setting toggle rather than a selection box.

## Design Stance

- Base the semantic model on `LunaCheckbox`.
- Keep the primitive narrow.
- Use the existing theme provider and reuse the checkbox token family in V1.
- Keep switch distinct from checkbox and radio semantics.

## Role In The System

`LunaSwitch` should own:
- on and off state rendering
- label rendering
- description, help, and error text rendering
- disabled and invalid visuals
- theme-aware toggle styling

`LunaSwitch` should not own:
- grouped exclusivity
- checkbox multiselect semantics
- tri-state behavior

## Base Element Strategy

Visible control:
- native `input type="checkbox"`

Root structure:
- wrapper
- native checkbox input
- visual track
- visual thumb
- label text block
- optional support text block

Rules:
- keep the native checkbox in the DOM
- style the visible switch rather than replacing semantics with a button
- clicking the label block should toggle the switch through native label behavior

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`

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

## State Model

V1 states:
- off
- on
- focused
- disabled
- invalid

Rules:
- selected surface colors should harmonize with checkbox and button
- invalid should affect border and support text treatment, not invent a new on-state color
- disabled should mute both control and label

## Theme Provider Integration

`LunaSwitch` should reuse the checkbox token family in V1 so boolean controls stay visually coherent.

Expected theme concerns:
- off track background and border
- on track background and border
- thumb foreground
- hover border
- focus ring
- disabled colors
- error colors
- label and description colors

## Accessibility

V1 accessibility expectations:
- keep the native checkbox input
- support `aria-invalid`
- label association should work through native label markup
- help and error text should connect through `aria-describedby`

## Storybook Expectations

Stories should explicitly show:
- basic off and on states
- disabled states
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- native checkbox semantics
- label click behavior
- help and error precedence
- disabled behavior
- invalid state wiring
