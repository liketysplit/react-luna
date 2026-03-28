# LunaModal

`LunaModal` is the focused overlay composite for interrupting the current workflow with one bounded dialog surface.

It owns:
- one modal shell with backdrop
- controlled and uncontrolled visibility
- optional dismiss affordances
- title, description, body, and actions regions
- theme-aware size and spacing

It does not own:
- stacking or queue management
- portal orchestration
- route-aware workflows
- application-specific form or confirmation logic

## Props

- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `actions?: React.ReactNode`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean, reason: "dismiss" | "backdrop" | "escape") => void`
- `dismissible?: boolean`
- `dismissLabel?: string`
- `closeOnEscape?: boolean`
- `closeOnBackdrop?: boolean`
- `inset?: string`
- `padding?: string`
- `gap?: string`
- `size?: "small" | "medium" | "large" | "full" | string`
- `rounded?: boolean`

Native `HTMLAttributes<HTMLDivElement>` continue to pass through to the dialog panel, including `role`, `aria-labelledby`, `aria-describedby`, `className`, and `style`.

## Contract

- the modal renders nothing when closed
- the inner panel defaults to `role="dialog"` and `aria-modal={true}`
- `title` labels the dialog when `aria-labelledby` is not provided manually
- `description` and `children` provide the described content region
- `actions` renders a footer row aligned to the end
- `open` makes the modal controlled
- `defaultOpen` seeds uncontrolled visibility and defaults to `false`
- dismiss button, backdrop click, and `Escape` each report a distinct close reason
- `closeOnBackdrop={false}` and `closeOnEscape={false}` disable those local dismiss paths
- the modal traps page scroll while open and restores the previous body overflow when it closes

## Theme Integration

`LunaModal` consumes the existing theme system for:
- default size
- default padding
- default gap
- default inset
- radius
- per-size max widths
- surface background
- foreground
- border
- backdrop color
- shadow

Spacing overrides resolve through theme spacing first, then raw CSS values.

## Accessibility Notes

- use a clear `title` for the dialog name unless a custom `aria-labelledby` is provided
- keep `description` concise when the body already contains rich content
- leave `dismissible` enabled for most confirmation and review flows unless the dialog must stay pinned until another action resolves it
- focus moves into the modal when it opens and returns to the prior focused element when it closes
