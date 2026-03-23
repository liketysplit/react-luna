# Input Design

This document defines the design direction for `LunaInput` before implementation.

`LunaInput` should be the base single-line text field primitive for `react-luna`. It should handle the common field wrapper concerns while preserving the native input model.

## Design Stance

- Keep the primitive focused on single-line input.
- Use the existing `ThemeProvider` for all visual states.
- Preserve native `input` behavior and passthrough strongly.
- Build label, help text, and error handling into the primitive so callers do not repeat field wrappers everywhere.

## Role In The System

`LunaInput` should own:
- label rendering
- control shell rendering
- optional leading and trailing content
- help text and error text rendering
- theme-aware field states
- native input passthrough

`LunaInput` should not own:
- textarea behavior
- select behavior
- formatting and masking
- async validation
- password visibility toggles

## Base Element

The primitive should render a normal native `input` inside a field wrapper.

Rules:
- the public ref should point at the real `input`
- native input props should pass through directly
- the wrapper exists only to support label, shell, and supporting text

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `leading?: React.ReactNode`
- `trailing?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`

Native props should still surface through inherited input attributes, especially:
- `value`
- `defaultValue`
- `placeholder`
- `type`
- `name`
- `disabled`
- `readOnly`
- `required`
- `autoComplete`

Rules:
- `error` should set invalid visuals and `aria-invalid`
- `error` should take precedence over `helpText` visually
- inset labels should be the default label presentation
- `externalLabel` should keep the label outside the control shell when needed
- inset labels should rest in the input line when empty and float to the border when focused, filled, or when a placeholder is present
- `leading` and `trailing` live inside the control shell
- `inputSize` controls field height, padding, and font size
- `fullWidth` should make the field stretch to its container

## State Model

`LunaInput` should visually support:
- idle
- hover
- focus
- filled
- disabled
- invalid

Rules:
- state styling should come from theme tokens
- invalid state should override normal focus styling
- filled is derived from input value presence, not passed as a prop

## Theme Provider Integration

`LunaInput` should use a `components.input` theme slice.

Likely theme tokens:
- `defaultSize`
- `radius`
- size profiles for `sm`, `md`, `lg`
- mode-aware `bg`
- `fg`
- `border`
- `hoverBorder`
- `focusBorder`
- `focusRing`
- `placeholder`
- `disabledBg`
- `disabledFg`
- `disabledBorder`
- `errorBorder`
- `errorFocusRing`
- `helpFg`
- `errorFg`
- `labelFg`

## Accessibility

Rules:
- if `label` exists, it should connect to the input through `htmlFor` and `id`
- if `label` does not exist, callers should still be able to use native `aria-label` and `aria-labelledby`
- help and error text should connect through `aria-describedby`
- invalid state should use `aria-invalid`

## Recommended Testing Focus

When implemented, tests should cover:
- label and input association
- native passthrough for `value`, `defaultValue`, and `placeholder`
- help and error text behavior
- invalid accessibility behavior
- leading and trailing rendering
- size class resolution
- full width behavior
