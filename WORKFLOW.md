# Workflow

This file defines how work should be tracked and moved through the repository. It exists to separate delivery flow and project tracking from component code and design notes.

## Purpose

- Keep task tracking out of source files.
- Make project state easy to understand from git and GitHub.
- Standardize how features move from idea to release.
- Keep process rules stable even as components evolve.

## Source Of Truth

- `AGENTS.md` defines execution constraints, collaboration rules, and repository guardrails.
- `WORKFLOW.md` defines how work is tracked and completed.
- `docs/` contains project-level and component-level reference documentation.
- `CHANGELOG.md` contains release-facing history only.
- GitHub Issues should be the source of truth for active and planned work once issue tracking is in place.
- GitHub Projects should be the source of truth for status once project tracking is in place.

## Tracking Model

Use one issue per coherent work item.

Examples:
- add `LunaButton` loading state
- add `LunaText` primitive
- fix release workflow npm authentication
- document theme overrides

Do not use markdown checklists in repo files as the long-term home for active work tracking once a task is promoted into active planning.

## Work Types

Use these work types for issues:
- `feature`
- `bug`
- `docs`
- `release`
- `refactor`
- `design`

## Suggested Labels

Use labels that describe both domain and work shape.

Domain labels:
- `primitive`
- `composite`
- `theme`
- `storybook`
- `tests`
- `docs`
- `release`

Work-shape labels:
- `feature`
- `bug`
- `refactor`
- `design`
- `maintenance`

Priority labels if needed:
- `priority:high`
- `priority:medium`
- `priority:low`

## Suggested Milestones

Use milestones for larger project phases.

Examples:
- `Phase 2 Primitives`
- `Phase 3 Composites`
- `Phase 4 Documentation`
- `Phase 5 Hardening`

## Status Flow

Use this status flow:

`Backlog -> Ready -> In Progress -> Verify -> Done`

Status meanings:
- `Backlog`: captured but not ready to start
- `Ready`: scoped well enough to begin
- `In Progress`: actively being worked on
- `Verify`: implemented and waiting on review, testing, or visual confirmation
- `Done`: verified and merged

## Definition Of Done

A task is not done until the relevant items below are complete:
- implementation is complete
- Storybook coverage exists or was updated
- visual verification happened if the change affects UI
- unit tests were added or updated when appropriate
- public documentation was updated when behavior changed
- a changeset was added when the published package should release the change

## Delivery Order

Default delivery order for component work:
1. implementation
2. Storybook coverage
3. visual verification
4. unit tests
5. public documentation updates
6. release metadata updates when needed

## Release Rules

Add a changeset when:
- the published package behavior changes
- a new component or primitive is added
- public API changes
- bug fixes should appear in release notes

Do not add a changeset when:
- the change is local-only experimentation
- the change is intentionally not meant for release
- the change only affects internal notes with no package-facing consequence

Do not add a release-trigger-only changeset without explicit approval.

## Git Conventions

- Keep commits scoped to one coherent change.
- Reference the related issue number in commit messages or pull requests once issue tracking is active.
- Prefer one vertical slice at a time instead of partial work across many unrelated areas.
- Keep docs and tests in the same change when they are part of the feature being completed.

## Future GitHub Integration

Planned end state:
- GitHub Issues track all active and planned work
- GitHub Projects tracks status
- Storybook documents live component behavior
- `docs/` holds canonical written reference material
- Changesets controls package versioning and release notes

## Operational Reminders

- Review publish-related secret expiry every 60 days.
- Last reviewed: `2026-03-15`
- Review again by: `2026-05-14`
