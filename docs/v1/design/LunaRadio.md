# Radio Design

This document defines the design direction for `LunaRadio` before implementation.

`LunaRadio` should be the mutually exclusive selection primitive for the library. It should stay visually aligned with `LunaCheckbox`, reuse the same theme language, and keep the interaction model narrow.

## Reference Read

The sanity check from Vuetify and Cloudscape points to the same core shape:
- a radio should stay a distinct single-choice control
- radios should be grouped by shared `name`
- label content should be first-class
- disabled and invalid treatment should match the rest of the field family

That matches the direction we should take here.

## Design Stance

- Base the visual and support-text model on `LunaCheckbox`.
- Keep the primitive narrow.
- Use the existing theme provider rather than inventing a separate one-off color path.
- Keep radio distinct from checkbox and switch semantics.

## Role In The System

`LunaRadio` should own:
- checked and unchecked state rendering
- label rendering
- help and error text rendering
- disabled and invalid visuals
- theme-aware single-choice styling

`LunaRadio` should not own:
- full radio-group management in V1
- checkbox-style multiselect behavior
- switch semantics
- segmented-button behavior

## Base Element Strategy

Visible control:
- native `input type="radio"`

Root structure:
- wrapper
- native radio input
- visual circle
- label text block
- optional support text block

Rules:
- keep the native radio in the DOM
- style the visible circle rather than replacing semantics with a button
- clicking the label block should select the radio through native label behavior

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`

Important native radio props should still surface through passthrough, especially:
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

This keeps radio aligned with `LunaCheckbox` and the field-family support text rules without forcing a full field shell.

## State Model

V1 states:
- unchecked
- checked
- focused
- disabled
- invalid

Rules:
- checked state should use the same selected surface family as checkbox
- invalid should affect border and supporting text treatment, not invent a new selected color
- disabled should mute both control and label

## Theme Provider Integration

`LunaRadio` should reuse the checkbox token family in V1 so boolean controls stay visually coherent.

Direction:
- selected color family should harmonize with `LunaButton`
- border, disabled, help, and error treatment should harmonize with `LunaCheckbox` and the field family

Expected theme concerns:
- one medium radio size profile
- checked background and foreground
- unchecked border
- hover border
- focus ring
- disabled colors
- error colors
- label and description colors

## Accessibility

V1 accessibility expectations:
- keep the native radio input
- support `aria-invalid`
- label association should work through native label markup
- help and error text should connect through `aria-describedby`
- radio exclusivity should remain native through shared `name`

## Storybook Expectations

Stories should explicitly show:
- basic unchecked and checked states
- grouped selection behavior
- disabled states
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- native radio semantics
- label click behavior
- shared-name exclusivity in controlled usage
- help and error precedence
- disabled behavior
- invalid state wiring

## Implementation Order

1. Lock this design
2. Build the component
3. Add Storybook coverage
4. Add unit tests
5. Pause for review before adding the component reference doc
