# Progress Design

This document records the initial design direction for `LunaProgress`.

## Design Stance

- keep the contract small and reusable
- support determinate and indeterminate work without splitting the primitive
- keep sizing, tone, radius, and motion theme-driven
- avoid baking workflow-specific copy or controls into the primitive
- preserve room for downstream theme overrides without changing the API

## Decisions So Far

- render a semantic `progressbar`
- use `value`, `min`, and `max` for determinate progress
- use `indeterminate` as the explicit non-numeric mode switch
- support `label`, `description`, and visible value text
- use `size` and `tone` as the public styling hooks

## Current Intent Notes

### Progress Model

- determinate mode is the default
- values clamp into the provided range
- indeterminate mode suppresses numeric progress semantics

### Visual Model

- the track and fill remain simple, durable primitives
- the track color follows the current theme mode
- the fill color follows the selected theme tone
- motion stays theme-driven and only appears in indeterminate mode

### Text

- `label` is the primary visible identifier
- `description` gives supporting context without changing progress semantics
- `showValue` reveals the default percentage label
- `valueLabel` allows task-specific value text such as completed batches or files

## Build Order

1. define the progress props
2. implement the semantic shell and indicator
3. wire theme size, tone, and motion tokens
4. add Storybook coverage
5. add tests and public docs
