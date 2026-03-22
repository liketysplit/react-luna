# Card Design

This document defines the design direction for `LunaCard` before implementation.

`LunaCard` should be the base grouped-content surface for `react-luna`. It should be composable, theme-aware, and easy to use without forcing a deep subcomponent tree.

## Design Stance

- Favor one strong surface primitive over a family of card subcomponents in V1.
- Keep the structure explicit and easy to scan.
- Use the existing `ThemeProvider` for all card styling decisions.
- Reuse the good parts of the button contract where they make sense:
  - passthrough
  - theme-driven defaults
  - clear visual treatment rules
- Keep the content model slot-like without requiring React slot machinery.

## Role In The System

`LunaCard` should own:
- grouped-content surface rendering
- title region
- body region
- actions region
- card-level visual treatment
- theme-aware surface styling

`LunaCard` should not own:
- collection/list behavior
- navigation/routing behavior by default
- button semantics
- layout-system replacement

## Base Element

Default element:
- `section`

Support:
- `as?: React.ElementType`

Rules:
- grouped related content should default to a semantic section
- `as` remains the escape hatch when `article`, `div`, or another element is more appropriate

## Content Model

V1 should support three logical regions:
- `title`
- `body`
- `actions`

Public inputs:
- `title?: React.ReactNode`
- `children?: React.ReactNode`
- `actions?: React.ReactNode`

Body rules:
- `children` are the body content
- body always exists if `children` are present

Title rules:
- `title` is the top content region
- if needed later, a subtitle can be added, but it is not required for V1

Actions rules:
- `actions` is the action region for buttons, links, and related controls

This gives the card a slot-like API without introducing dedicated subcomponents immediately.

## Region Alignment

Each logical region should support alignment.

Direction:
- `titleAlign?: "left" | "center" | "right"`
- `bodyAlign?: "left" | "center" | "right"`
- `actionsAlign?: "left" | "center" | "right"`
- `actionsGap?: string`

Rules:
- these control text/content alignment inside their region
- they should not become general layout controls for the whole card
- defaults should come from the normal document flow, which is effectively left/start aligned
- `actionsGap` should control spacing between direct action children and resolve through theme spacing first

## Visual Treatments

Keep the card treatment set simple in V1.

Recommended props:
- `elevated?: boolean`
- `outlined?: boolean`
- `flat?: boolean`
- `interactive?: boolean`
- `rounded?: boolean`

Meaning:
- `elevated` strengthens shadow treatment
- `outlined` emphasizes border treatment
- `flat` removes shadow
- `interactive` adds hover and focus treatment without changing semantics
- `rounded` applies a stronger radius treatment

Rules:
- `outlined` and `flat` can compose
- `elevated` and `flat` conflict, with `flat` winning if both are passed
- `interactive` is behavior styling, not semantic interactivity
- `rounded` is a shape modifier, not a surface family

## Theme Provider Integration

`LunaCard` must use the existing `ThemeProvider` and `useTheme()` path.

It should consume:
- mode-aware surface colors
- mode-aware foreground colors
- border colors
- shadows
- spacing tokens
- radius tokens
- motion tokens

Recommended theme direction:
- `components.card`

Likely theme tokens:
- `defaultPadding`
- `defaultGap`
- `radius`
- `modes.light.bg`
- `modes.light.fg`
- `modes.light.border`
- `modes.light.shadow`
- `modes.light.hoverBorder`
- `modes.light.hoverShadow`
- matching dark-mode tokens

This keeps card behavior aligned with how `LunaButton` and `LunaText` already use the theme provider.

## Color Direction

Keep card color simpler than button color.

Recommended direction:
- `color?: string`

Rules:
- if present, `color` should affect the card surface background intent
- border and foreground should still derive through theme logic
- raw CSS values and theme tokens should both be accepted

This mirrors the practical color strategy we already use in other primitives.

## Spacing And Layout Inside The Card

Recommended props:
- `padding?: string`
- `gap?: string`

Rules:
- `padding` affects the card interior
- `gap` affects spacing between card regions
- both should resolve through theme spacing first, then raw CSS values

This should be enough for V1 without turning the card into a generic layout primitive.

## Native Passthrough

Cross-referencing the button contract, the card should keep the same healthy passthrough stance where it makes sense.

Keep:
- `children?: React.ReactNode`
- `className?: string`
- `style?: React.CSSProperties`
- `id?: string`
- `title?: React.ReactNode | string`
- `tabIndex?: number`
- `role?: string`
- `aria-*`
- `data-*`
- native region/container props appropriate to the chosen element

Rules:
- `className` applies to the root only
- `style` applies to the root only
- passthrough should remain available as the safety valve for edge cases

## Recommended Testing Focus

When implemented, tests should cover:
- default semantic tag
- `as` override
- title, body, and actions region rendering
- region alignment props
- visual treatment conflict handling
- theme-driven default surface behavior
- spacing token resolution
- passthrough props

## Implementation Order

1. Define the `LunaCard` prop contract
2. Add card theme typing and base theme defaults
3. Build the component shell
4. Add Storybook coverage
5. Add unit tests
6. Add the component contract doc under `docs/v1/components`
