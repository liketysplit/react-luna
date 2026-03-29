# LunaSidebar

`LunaSidebar` is the persistent side-surface composite for secondary page structure in `react-luna`.

It owns:
- one sidebar surface with optional header and footer regions
- theme-driven width and spacing
- optional sticky positioning relative to the viewport

It does not own:
- navigation state
- route awareness
- active-link styling rules
- responsive page-shell orchestration

Default element:
- `aside`

## Props

- `as?: React.ElementType`
- `header?: React.ReactNode`
- `footer?: React.ReactNode`
- `width?: string`
- `padding?: string`
- `gap?: string`
- `sticky?: boolean`
- `stickyOffset?: string`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root. Use `aria-label` or `aria-labelledby` when the sidebar provides navigation or landmark semantics that need a specific announcement.

## Contract

- the default root element is `aside`
- `header` renders above the body region without forcing title or action prop shapes
- `children` render in the main content region
- `footer` renders below the body region with a subtle divider
- `width`, `padding`, `gap`, and `stickyOffset` resolve through theme spacing first, then raw CSS values
- `sticky` enables `position: sticky` on the root and uses the resolved sticky offset
- `className` and `style` pass through to the root

## Theme Integration

`LunaSidebar` consumes the existing theme system for:
- default width
- default padding
- default gap
- default sticky offset
- radius
- shadow
- light and dark surface tokens

## Accessibility Notes

`LunaSidebar` is a structural composite, not a navigation manager.

Consumers remain responsible for:
- choosing the correct landmark element with `as`
- providing `aria-label` or `aria-labelledby` when needed
- marking active links or actions inside the sidebar
