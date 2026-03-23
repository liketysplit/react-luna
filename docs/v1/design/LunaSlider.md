# Slider Design

This document defines the design direction for `LunaSlider` before implementation.

`LunaSlider` should be the range-selection primitive for `react-luna`. It should stay visually aligned with the field family and draw its selected-state confidence from the checkbox and button color system.

## Design Stance

- Keep the primitive narrow and native.
- Use the existing theme provider and reuse checkbox and input token families in V1.
- Keep value display and support text explicit.

## Role In The System

`LunaSlider` should own:
- range entry through a native range input
- label rendering
- optional current value rendering
- help and error text rendering
- disabled and invalid visuals
- theme-aware slider styling

`LunaSlider` should not own:
- multi-thumb ranges
- custom marks in V1
- vertical orientation
- histogram or chart overlays

## Base Element Strategy

Visible control:
- native `input type="range"`

Root structure:
- field wrapper
- main label row
- optional description
- range input
- optional support text block

Rules:
- keep the native range input in the DOM
- style the track and thumb through CSS
- let the browser handle pointer and keyboard range semantics

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `description?: React.ReactNode`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `showValue?: boolean`

Important native range props should still surface through passthrough, especially:
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

## Label Model

Rules:
- `label` is the primary visible content
- `description` is optional secondary content under the main label row
- `showValue` renders the current numeric value beside the label
- `error` takes precedence over `helpText`

## State Model

V1 states:
- idle
- active
- focused
- disabled
- invalid

Rules:
- active track and thumb should harmonize with checkbox and button selected colors
- invalid should affect support text and focus treatment, not force a new thumb color
- disabled should mute the control and text

## Theme Provider Integration

`LunaSlider` should use the checkbox token family for active colors and the input token family for support and invalid text treatment.

Expected theme concerns:
- active track color
- thumb color
- inactive track color
- hover and focus treatment
- disabled colors
- error and help colors
- label and description colors

## Accessibility

V1 accessibility expectations:
- keep the native range input
- support `aria-invalid`
- label association should work through native label markup
- help and error text should connect through `aria-describedby`

## Storybook Expectations

Stories should explicitly show:
- basic range entry
- value display
- disabled states
- help and error states
- dark mode

## Testing Focus

When implemented, tests should cover:
- native range input semantics
- value display
- help and error precedence
- disabled behavior
- invalid state wiring
