# LunaTooltip

## Purpose

`LunaTooltip` provides short contextual guidance for an existing control without changing that control's semantics or flow position.

It should stay small, descriptive, and easy to theme.

## Design Rules

- keep the primitive descriptive rather than interactive
- make hover and focus behavior consistent so mouse and keyboard users reach the same content
- support the common four-side placement model without growing into general floating-surface logic
- let downstream themes restyle the bubble completely through tokens and CSS variables
- keep the trigger contract strict: one child, one described element

## Boundary

`LunaTooltip` is not the answer for:
- actionable overlay content
- larger teaching callouts
- click-driven disclosure

Those cases belong to future floating-surface primitives such as `LunaPopover`.
