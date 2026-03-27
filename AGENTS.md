# react-luna AGENTS

Context
react-luna is a public React UI library intended to be self-sufficient and reusable across personal applications. The visual language is Lunar with a default light and dark theme.

Constraints
- React only for UI, no third-party UI component libraries.
- Keep dependencies minimal and focused on dev and testing.
- Provide a theme system that can be overridden by downstream projects.
- Do not mention third-party design systems, component libraries, or external design products anywhere in the codebase, docs, stories, tests, or comments.
- Keep all shipped design language and rationale distinct to react-luna, even when outside sanity checks are used during development.
- Keep repository-facing rationale local to react-luna. External reference work belongs in private process and skill guidance, not in the repo.

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
- Default delivery slice for meaningful component work is implementation, Storybook, tests, and docs together unless explicitly scoped otherwise.

Tracking And Delivery
- `WORKFLOW.md` is the source of truth for delivery order, completion rules, release flow, and tracking design.
- `CHANGE_MANAGEMENT.md` is the source of truth for how work must be justified, created, and tracked before implementation.
- `PLAN.md` is a temporary migration file for turning roadmap items into GitHub Issues.
- `docs/` contains project-level and component-level reference material.
- `CHANGELOG.md` contains release-facing history only.
- GitHub Issues are now the active task backlog.
- GitHub Milestones group work by project phase.
- GitHub Project board: `react-luna`
- Project URL: `https://github.com/users/liketysplit/projects/3`
- Default rule: work should be issue-driven.
- If there is no existing issue for non-trivial work, the change must be justified and a new issue must be created before implementation begins.

Phase Snapshot
- Foundation is complete.
- Current focus is Primitives, beginning with `LunaButton`.
- Long-term roadmap and issue migration live in `PLAN.md`.

North Star
- `LunaButton` is the baseline primitive for hardened contract quality.
- Themeability is first-class.
- Downstream consumers should be able to make the library feel like their own without fighting the system.
