# Textarea Design

This document defines the design direction for `LunaTextarea`.

`LunaTextarea` should be the multiline companion to `LunaInput`. It should keep the same field-shell behavior and theme integration while adding textarea-specific sizing and resize controls.

## Design Stance

- Keep it aligned with `LunaInput`.
- Reuse the same label, help text, error, and field state model.
- Drop inline leading and trailing content in V1.
- Add only the textarea-specific sizing controls that materially improve usability.

## Core Contract

Recommended props:
- `label?: React.ReactNode`
- `externalLabel?: boolean`
- `helpText?: React.ReactNode`
- `error?: React.ReactNode`
- `inputSize?: "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `resize?: "none" | "vertical" | "horizontal" | "both"`
- `autoGrow?: boolean`
- `minRows?: number`
- `maxRows?: number`
- `minHeight?: string`
- `height?: string`

Important native textarea props should still surface through passthrough, especially:
- `value`
- `defaultValue`
- `placeholder`
- `name`
- `disabled`
- `readOnly`
- `required`
- `rows`

## Behavior Rules

- inset label is the default when `label` is present
- `externalLabel` opts back to the label-above-field layout
- inset labels rest in the textarea line when empty and float when focused, filled, or when a placeholder is present
- `error` takes precedence over `helpText`
- `resize` defaults to `none`
- `autoGrow` grows with content and should respect `minRows` and `maxRows`
- `minHeight` and `height` are direct style conveniences and should resolve through theme spacing first, then raw CSS values

## Research Notes

Primary references:
- Vuetify `v-textarea` exposes `rows`, `row-height`, and `auto-grow`
- MUI Textarea Autosize emphasizes `minRows` and `maxRows`
- MDN treats `resize` as the correct control for user resizing behavior

The V1 choice here is:
- keep `resize`
- support `autoGrow`
- support `minRows` and `maxRows`
- avoid a dedicated `rowHeight` prop unless a concrete need appears

## Accessibility

- the public ref should point at the native `textarea`
- label association should work the same way as `LunaInput`
- help and error text should connect through `aria-describedby`
- invalid state should use `aria-invalid`
