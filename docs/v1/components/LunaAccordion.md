# LunaAccordion

`LunaAccordion` is the grouped disclosure composite for `react-luna`.

It owns:
- repeated trigger and panel rendering
- accessible disclosure semantics
- single or multiple expansion behavior
- controlled and uncontrolled open state
- theme-aware surface styling

It does not own:
- nested navigation trees
- rich layout composition beyond each item panel
- asynchronous loading or data fetching

## Props

- `items: Array<{ value: string; title: React.ReactNode; content: React.ReactNode; description?: React.ReactNode; disabled?: boolean }>`
- `value?: string | string[] | null`
- `defaultValue?: string | string[] | null`
- `onValueChange?: (value: string | string[] | null) => void`
- `multiple?: boolean`
- `collapsible?: boolean`
- `headingLevel?: 2 | 3 | 4 | 5 | 6`
- `gap?: string`
- `itemGap?: string`
- `panelPadding?: string`
- `rounded?: boolean`

## Contract

- `items` is the only required content input in V1
- each item needs a stable `value`
- `title` renders inside the trigger button
- `description` is optional supporting text inside the trigger
- `content` renders inside the associated panel region
- `className`, `style`, `id`, `role`, `aria-*`, and `data-*` pass through to the root

## State Model

- single-expand mode is the default
- `multiple` allows more than one item to stay open
- `collapsible` defaults to `true`
- in single-expand mode, `value` and `defaultValue` use `string | null`
- in multiple mode, `value` and `defaultValue` use `string[]`
- `onValueChange` returns the same shape the current mode expects

## Accessibility

- each item trigger is a native `button`
- each trigger owns `aria-expanded` and `aria-controls`
- each panel uses `role="region"` and `aria-labelledby`
- `headingLevel` controls the semantic wrapper around each trigger
- disabled items remain visible but cannot be toggled

## Theme Integration

`LunaAccordion` consumes the existing `ThemeProvider` for:
- item background
- item border
- hover and open-state surfaces
- foreground and muted foreground
- indicator color
- gap, item gap, and panel padding
- radius

Spacing props resolve through theme spacing first, then raw CSS values.

## Behavior Rules

- clicking a closed item opens it
- clicking an open item closes it only when `collapsible` is `true`
- clicking an item in single-expand mode closes any other open item
- disabled items never change the open-state model

## Testing Focus

The accordion contract should stay covered in unit tests for:
- default and controlled expansion
- single and multiple behavior
- disabled item handling
- semantic heading level rendering
- spacing token resolution
- accessible trigger and panel wiring
