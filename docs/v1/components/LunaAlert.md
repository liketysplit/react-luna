# LunaAlert

`LunaAlert` is the inline status and warning surface primitive for `react-luna`.

It owns:
- inline emphasis for status messaging
- tone-driven severity presentation
- optional title and icon regions
- theme-aware spacing and surface styling
- native semantic passthrough

It does not own:
- dismissal logic
- action layouts
- toast or notification orchestration
- application-specific message formatting

## Props

- `as?: React.ElementType`
- `tone?: "neutral" | "info" | "success" | "warning" | "danger"`
- `emphasis?: "soft" | "solid" | "outline"`
- `title?: React.ReactNode`
- `icon?: React.ReactNode`
- `padding?: string`
- `gap?: string`
- `rounded?: boolean`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root, including `role`, `aria-live`, and `aria-atomic`.

## Contract

- default element is `div`
- `tone` controls the semantic color family
- `emphasis` controls surface strength without changing the message structure
- `title` renders a stronger heading line inside the alert
- `children` render the supporting body content
- `icon` is decorative by default and stays out of the accessibility tree
- `className` and `style` pass through to the root

## Theme Integration

`LunaAlert` consumes the existing theme system for:
- default padding
- default gap
- radius
- per-tone surface colors for each emphasis level

Spacing overrides resolve through theme spacing first, then raw CSS values.

## Accessibility Notes

`LunaAlert` does not force live-region behavior.

Use explicit native semantics when the message should be announced:
- `role="status"` for polite updates
- `role="alert"` for urgent interruptions

That keeps the component reusable for both passive inline context and active announcement cases.
