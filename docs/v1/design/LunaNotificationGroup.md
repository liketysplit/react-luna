# LunaNotificationGroup

## Purpose

`LunaNotificationGroup` provides one light composite shell for presenting multiple `LunaNotification` items together without turning the library into a notification center.

It should handle grouped presentation only, leaving item behavior to `LunaNotification` and leaving history, filtering, and queue management to future work.

## Design Rules

- keep the contract smaller than a notification inbox
- build on top of `LunaNotification` instead of replacing it
- support optional heading and actions regions without forcing a rigid item schema
- preserve layout flexibility with framed and unframed presentation
- keep spacing theme-aware so downstream consumers can adapt the group to their own surfaces

## Scope Boundaries

`LunaNotificationGroup` should own:
- one container surface
- one optional header with title, description, and actions
- spacing between grouped notification items

`LunaNotificationGroup` should not own:
- fetching or storing notification records
- shared dismiss state
- auto-announcement policy
- sorting, filtering, or pagination

## Contract Shape

The public inputs stay slot-based:
- `title`
- `description`
- `actions`
- `children`

Presentation remains explicit through:
- `framed`
- `rounded`
- `gap`
- `padding`
- `maxWidth`

That keeps the composite useful for sidebars, feeds, and stacked inbox previews without forcing a full subcomponent family immediately.

## Testing Focus

When implemented, tests should cover:
- default root semantics
- named group behavior from the title
- framed and unframed presentation
- grouped notification children rendering
- spacing token resolution through the theme system
