# Date Picker Design

This document defines the design direction for `LunaDatePicker` before implementation.

`LunaDatePicker` should be the real date primitive family for `react-luna`. It should unify native fallback entry, calendar-backed single-date selection, and range selection under one component contract.

## Design Stance

- Use one component with explicit modes instead of separate date-picker and range-picker components.
- Keep the field shell aligned with the input family.
- Let `simple` reuse the native date-input path.
- Let `picker` and `range` share the same calendar surface and interaction model.

## Core Modes

- `mode="simple"`
- `mode="picker"`
- `mode="range"`

Meaning:
- `simple` uses the browser-native date input fallback
- `picker` provides calendar-backed single-date selection
- `range` provides calendar-backed start and end date selection

## Role In The System

`LunaDatePicker` should own:
- date display in a field shell
- calendar popover behavior for picker and range modes
- single-date selection
- range selection
- inset or external label rendering
- help and error text rendering
- disabled and invalid visuals

`LunaDatePicker` should not own:
- time selection
- timezone conversion
- multi-month range comparison in V1
- complex recurrence behavior

## Contract Direction

Common props:
- `mode?: "simple" | "picker" | "range"`
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `buttonPosition?: "pre" | "post"`
- `disabled?: boolean`
- `min?: string`
- `max?: string`

Value direction:
- `simple` and `picker` use a single date string
- `range` uses `{ start?: string; end?: string }`

## Interaction Model

`simple`
- native browser date entry
- inset label stays floated by default

`picker`
- uses the same input-style shell sizing as the field family
- manual `MM/DD/YYYY` entry is still available through the field input
- a small attached calendar button opens the picker panel
- selecting a date commits and closes
- clear affordance appears when there is a value

`range`
- manual `MM/DD/YYYY` start and end entry remain available through the field inputs
- the same attached calendar button opens the range panel
- first selection sets start
- second selection sets end
- if the second selection is before the start, swap them
- once both dates exist, a new day click restarts the range from that date
- clear affordance resets both values
- panel footer owns the built-in `Clear` and `Apply` actions

## Calendar Surface

V1 calendar expectations:
- single visible month
- month navigation
- weekday header
- disabled date blocking via `min` and `max`
- selected day styling
- range preview and in-range styling

## Theme Direction

`LunaDatePicker` should use:
- input token family for field shell and support text
- checkbox and button token family for selected day confidence and focus treatment

## Storybook Expectations

Stories should explicitly show:
- simple mode
- picker mode
- range mode
- dark mode
- disabled state
- help and error states

## Testing Focus

When implemented, tests should cover:
- simple mode native fallback rendering
- picker mode open and select behavior
- range mode start and end selection behavior
- clear behavior
- help and error precedence
