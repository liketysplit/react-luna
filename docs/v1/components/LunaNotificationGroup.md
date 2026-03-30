# LunaNotificationGroup

`LunaNotificationGroup` is the grouped presentation composite for arranging multiple `LunaNotification` items under one shared heading or action surface.

It owns:
- grouped presentation and internal rendering for grouped notification items
- per-item dismissal within the grouped surface
- optional title, description, and actions regions
- framed or unframed shared-surface styling
- optional expand/collapse behavior for multi-item feeds
- optional group-level dismissal
- theme-aware spacing overrides

It does not own:
- queue management
- notification history or inbox logic
- shared dismissal orchestration outside the current rendered group

## Props

- `as?: React.ElementType`
- `title?: React.ReactNode`
- `description?: React.ReactNode`
- `actions?: React.ReactNode`
- `items: LunaNotificationGroupItem[]`
- `size?: "sm" | "md" | "lg"`
- `gap?: string`
- `padding?: string`
- `maxWidth?: string`
- `rounded?: boolean`
- `framed?: boolean`
- `collapsible?: boolean`
- `showExpand?: boolean`
- `open?: boolean`
- `defaultOpen?: boolean`
- `onOpenChange?: (open: boolean, reason: "toggle" | "dismiss") => void`
- `dismissible?: boolean`
- `showDismissAll?: boolean`
- `dismissLabel?: string`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root, including `role`, `aria-label`, `aria-labelledby`, `className`, and `style`.

## Contract

- default element is `section`
- `title` labels the group automatically when `aria-labelledby` is not provided manually
- `description` provides supporting copy above the grouped notifications
- `actions` renders an optional trailing header region
- `items` is the public data/slot contract for grouped notification content
- `size` is a group-level contract applied uniformly to the internal notifications rendered by the group
- notification items are rendered internally by the group instead of being nested as public children
- internal notification items are always individually dismissible inside the group
- `framed` defaults to `true` so the group can present one shared container
- framed groups should read as one durable feed surface, not just a box around unrelated cards
- `collapsible` defaults to `true` so grouped notifications can collapse into a stacked preview
- `showExpand` controls whether the expand/collapse affordance is visible when collapse behavior is enabled
- collapsed groups should preview multiple items like a paper stack, with the most recent item on top
- the group renders at most three visual items at a time, even when more items are supplied
- collapsed previews still render internal notifications, so single-item dismiss remains available there
- `open` makes the group controlled
- `defaultOpen` seeds uncontrolled expansion and defaults to `true`
- `onOpenChange` reports group toggle and dismiss events
- `dismissible` adds a group-level close control for the whole stack
- `showDismissAll` controls whether the dismiss-all affordance is visible when dismissal is enabled
- `rounded` increases the group corner radius
- `gap`, `padding`, and `maxWidth` resolve through theme spacing first, then raw CSS values

## Accessibility Notes

- use `aria-label` or `aria-labelledby` when the group needs an explicit accessible name
- keep announcement behavior on individual `LunaNotification` items rather than assigning one live region to the full group
- prefer `framed={false}` when the surrounding layout already provides the needed visual container

## Current Hardening Gaps

- narrow-width responsive behavior is not finalized yet; gutter collapse, rail visibility, and stacked-preview degradation should be handled in a dedicated hardening pass
- collapsed-stack behavior is tuned for desktop-first review right now and still needs a project-wide breakpoint policy
- control-lane sizing and alignment should eventually be normalized alongside the rest of the feedback-system responsive contracts
