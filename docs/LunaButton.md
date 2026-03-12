# Button Design

This document tracks the current design direction for the `Button` component before implementation. It exists to keep the API discussion stable while the component is built in small steps.

## Design Stance

- Favor clear, expressive intent in the API.
- Avoid React-specific abstraction for its own sake.
- Keep access to theme values open.
- Allow custom colors where useful, including hex values.
- Prefer explicit props over hidden behavior.

## Decisions So Far

### Layout And Positioning

- `absolute?: boolean`
- `fixed?: boolean`
- `top?: boolean | string | number`
- `right?: boolean | string | number`
- `bottom?: boolean | string | number`
- `left?: boolean | string | number`
- `block?: boolean`

### Visual Style

- `color?: string`
- `info?: boolean`
- `flat?: boolean`
- `outline?: boolean`
- `depressed?: boolean`
- `rounded?: boolean`
- `fab?: boolean`
- `icon?: React.ReactNode`
- `iconName?: string`
- `iconDirection?: "left" | "right"`
- `animation?: "ripple" | "bounce"`

### Theme Context

- `light?: boolean`
- `dark?: boolean`

### State

- `disabled?: boolean`
- `loading?: boolean`
- `loadingAnimation?: "loading"`

### Native Button Behavior

- `type?: "button" | "submit" | "reset"`

### Size

- `size?: string`

## Current Intent Notes

### Color

`color` should support:
- theme color names
- theme tokens such as `primary.600`
- custom hex values

Rules:
- `color` controls background color only
- lookup order is hex, then user theme, then base theme
- outline, border, foreground, and related colors are derived from theme logic
- `info` is the exception, where the visible informational treatment uses the provided color

### Positioning

`absolute`, `fixed`, `top`, `bottom`, `left`, and `right` are intentionally supported so buttons can react properly when composed into future container components.

Rules:
- `absolute` means standard CSS absolute positioning
- `fixed` means standard CSS fixed positioning
- if both `absolute` and `fixed` are passed, warn in development and `fixed` wins
- directional props only make sense with `absolute` or `fixed`
- if directional props are passed without `absolute` or `fixed`, warn in development

### Theme Overrides

`light` and `dark` should exist as explicit component-level overrides.

### Loading

`loading` is a first-class state.

Rules:
- `loading` is visual feedback, not disabled behavior
- current loading animation is `loading`
- loading presentation is theme-driven
- `loading` does not suppress interaction
- `loading` and `disabled` can both be true

### Informational Intent

`info` is visual only.

Current direction:
- `info` is colorable
- `info` is styled like an anchor visually
- `info` still behaves like a button
- `info` sizing comes from `size`
- if `color` is not provided, the theme provides the default informational color
- `info` warns and wins over `outline`, `flat`, and `depressed`

### Visual Precedence

Rules:
- `outline`, `flat`, and `depressed` are composable
- if `info` is passed with `outline`, `flat`, or `depressed`, warn in development and `info` wins
- `outline` is the border or visible outline treatment
- `flat` removes background color
- `flat` applies after `color`
- `depressed` removes box shadow
- `outline` is independent from both `color` and `flat`
- buttons have box shadow by default

### Shape And Iconography

Rules:
- `rounded` can apply to all button combinations except `info` and `fab`
- if `fab` and `rounded` are both passed, `fab` wins
- `fab` loses completely to `info`
- `fab` is visual only and does not control positioning
- `fab` treatment is theme-driven with opinionated library defaults
- `icon` is user-supplied icon content
- `iconName` is for library icons
- if both `icon` and `iconName` are passed, use `icon` and warn in development
- `iconDirection` uses `left` or `right`
- `iconDirection` defaults to `right`
- the base theme sets the default icon direction
- the user theme can override the default icon direction
- if no icon is present, `iconDirection` is inert

### Animation

Rules:
- `animation` is a mutually exclusive string prop
- current values are `ripple`, `bounce`, and `wiggle`
- animation does not stack
- `bounce` and `wiggle` currently run as burst animations with an internal pause between cycles

### Size

Use a string size key.

Current direction:
- `x-small`
- `small`
- `medium`
- `large`
- `x-large`

Resolution rules:
- if `size` is passed, resolve that key against the user theme first and then the base theme
- if no size prop is passed, use the user theme default size key
- if the user theme does not define one, use the base theme default size key
- theme controls how each size is styled
- the library ships opinionated default size tokens

Extensibility note:
- this shape leaves room to support custom named sizes later through the same `size` prop

### Layout

Rules:
- `block` fills the available space
- without `block`, button sizing remains content and theme driven

### State

Rules:
- `disabled` means visible but not interactable
- `disabled` changes style as well as interactivity

## React-Level Props

Keep:
- `children?: React.ReactNode`
- `value?: React.ReactNode`
- `className?: string`
- `style?: React.CSSProperties`
- native `onClick`
- native `onFocus`
- native `onBlur`
- native `onMouseEnter`
- native `onMouseLeave`
- native `onKeyDown`
- native `onKeyUp`
- `ref`
- `id?: string`
- `name?: string`
- `form?: string`
- `title?: string`
- `tabIndex?: number`
- `autoFocus?: boolean`
- `role?: string`
- `aria-label?: string`
- `aria-pressed?: boolean`
- standard native passthrough such as `data-testid`

Rules:
- `children` wins over `value`
- `className` applies to the root only
- `style` applies to the root only
- `onClick` remains available unless disabled suppresses interaction

## Open Questions

- Do we ship icons or consume arbitrary icon content?
- Should icon names map to a built-in icon set immediately, or can that wait until later?

## Polish Notes

- `loading` is currently using the orbit-ring treatment that replaced the earlier experimental conic variant.
- `bounce` and `wiggle` are currently driven by internal burst timing rather than a dedicated animation system.
- `bounce` and `wiggle` are usable, but still candidates for future motion polish after more visual review.
- `outline`, `info`, and color interactions should get another visual pass once the broader button surface language settles.

## Todo

- Build a more deliberate animation process for `LunaButton`, especially for burst-style motion where run windows and idle gaps should be modeled cleanly rather than improvised through CSS timing alone.
- Revisit `ripple` so it behaves more like random water drops than a simple centered pulse.

## Build Order

1. Finalize `ButtonProps`
2. Implement the component shell
3. Add styling hooks and theme integration
4. Add Storybook coverage
5. Add tests for baseline behavior
