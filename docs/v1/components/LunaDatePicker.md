# LunaDatePicker

`LunaDatePicker` is the date-selection primitive family for `react-luna`.

It supports three modes:
- `simple`
- `picker`
- `range`

## Props

- `mode?: "simple" | "picker" | "range"`
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `buttonPosition?: "pre" | "post"`

Important native date props are also supported through passthrough where they apply, especially:
- `value`
- `defaultValue`
- `min`
- `max`
- `disabled`
- `required`
- `name`
- `autoFocus`

## Contract

- `simple` uses the native date-input path
- `picker` uses a calendar popover for single-date selection
- `range` uses the same calendar surface for start and end selection
- inset label is the default
- `externalLabel` moves the label above the field
- picker and range keep manual `MM/DD/YYYY` entry available
- the attached calendar button can sit on the left or right through `buttonPosition`
- picker panel actions stay internal to the panel footer
- `error` takes precedence over `helpText`

## Behavior

- the attached calendar button opens the calendar in `picker` and `range` modes
- the clear affordance appears when a value exists
- range mode sets `start` first, then `end`
- if the second selected day is before the start, the values swap into chronological order
- once a full range exists, the next day click starts a new range

## Theme Integration

`LunaDatePicker` uses the shared field theme and date-picker tokens for:
- field background and border treatment
- label and support text colors
- calendar surface styling
- selected day treatment
- in-range treatment
- disabled and invalid states
