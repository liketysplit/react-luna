# react-luna AGENTS

Context
react-luna is a public React UI library intended to be self-sufficient and reusable across personal applications. The visual language is Lunar with a default light and dark theme.

Constraints
- React only for UI, no third-party UI component libraries.
- Keep dependencies minimal and focused on dev and testing.
- Provide a theme system that can be overridden by downstream projects.

Tooling
- Use Storybook for component exploration and configuration.

Licensing
All rights reserved. No forks or resale rights are granted.

Workflow
- Work in small steps.
- Pause for verification before proceeding to the next step.
- Commit each completed step with a clear message.
- Confirm results together before expanding scope.
- Never abbreviate; spell out words to keep communication clear.

Tracking And Delivery
- `WORKFLOW.md` is the source of truth for delivery order, completion rules, release flow, and tracking design.
- `PLAN.md` is a temporary migration file for turning roadmap items into GitHub Issues.
- `docs/` contains project-level and component-level reference material.
- `CHANGELOG.md` contains release-facing history only.

Phase Snapshot
- Foundation is complete.
- Current focus is Primitives, beginning with `LunaButton`.
- Long-term roadmap and issue migration live in `PLAN.md`.
