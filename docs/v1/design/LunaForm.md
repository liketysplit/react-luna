# LunaForm

`LunaForm` should be the first composite layer above the field primitives in `react-luna`.

It is intentionally narrow in V1.

It should not become:
- a validation framework
- a field registry
- a schema-driven renderer
- a replacement for native form semantics

## Design Goals

- give downstream consumers a durable form shell without forcing a specific data model
- let existing field primitives line up as a coherent stack
- provide a predictable place for introductory content and form actions
- stay themeable through spacing and child component theming instead of one-off visual props

## Region Model

`LunaForm` has three optional regions:

- header
- body
- actions

The body is always the direct composition area for form fields and helper content.

The actions region should stay simple:
- align the group
- control spacing between actions
- preserve native button behavior

## Visual Rules

- the form shell itself should stay visually quiet
- spacing should carry most of the composition work
- stronger surface treatments should belong to parent containers such as `LunaCard` when needed
- a form should be able to live inside cards, drawers, modals, or plain page layouts without fighting them

## Contract Boundaries

`LunaForm` should own:
- semantic root rendering
- vertical region spacing
- action alignment

`LunaForm` should not own:
- field-specific error rendering
- validation state orchestration
- async submission state
- responsive multi-column layout logic

Those can land in later issue-scoped work if needed.
