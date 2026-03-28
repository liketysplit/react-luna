# Accordion Design

This document defines the design direction for `LunaAccordion` before implementation.

`LunaAccordion` should be the grouped disclosure composite for `react-luna`. It should stay easy to theme, preserve native button semantics, and keep the content model explicit.

## Design Stance

- Favor one clear prop-driven accordion over a compound subcomponent family in V1.
- Keep item structure explicit and serializable through an `items` array.
- Treat open-state control as part of the public contract.
- Keep the default behavior useful for settings panels, checklists, and grouped details.

## Role In The System

`LunaAccordion` should own:
- trigger and panel pairing
- expansion state behavior
- semantic heading wrappers
- item-level surface styling
- theme-aware spacing and radius

`LunaAccordion` should not own:
- page layout
- tree navigation
- async data orchestration
- virtualized collections

## Content Model

V1 should support a simple repeated item shape:
- `value`
- `title`
- `description`
- `content`
- `disabled`

Rules:
- `value` identifies the item in the open-state model
- `title` is required and should stay concise
- `description` is optional supporting context in the trigger row
- `content` is the revealed panel body

## Open State

Recommended props:
- `value?: string | string[] | null`
- `defaultValue?: string | string[] | null`
- `onValueChange?: (value: string | string[] | null) => void`
- `multiple?: boolean`
- `collapsible?: boolean`

Rules:
- single-expand mode should be the default
- multiple mode should support any number of open items
- `collapsible` should default to `true`
- controlled and uncontrolled usage should both work

## Accessibility

- each trigger should be a native `button`
- each panel should be labelled by its trigger
- each trigger should sit inside a semantic heading wrapper
- heading level should be configurable without exposing custom heading markup

## Theme Provider Integration

`LunaAccordion` must use the existing `ThemeProvider` and `useTheme()` path.

Recommended theme direction:
- `components.accordion`

Likely theme tokens:
- `defaultGap`
- `defaultItemGap`
- `defaultPanelPadding`
- `radius`
- light and dark mode item surface tokens

## Recommended Testing Focus

When implemented, tests should cover:
- default open state
- controlled open state
- single and multiple expansion behavior
- non-collapsible behavior
- disabled item behavior
- heading-level output
- spacing token resolution

## Implementation Order

1. Define the `LunaAccordion` item and state contract
2. Add accordion theme typing and base theme defaults
3. Build the component shell
4. Add Storybook coverage
5. Add unit tests
6. Add the component contract doc under `docs/v1/components`
