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

Standard Delivery Flow
- Build each feature in this order unless there is a clear reason not to:
- implementation
- Storybook coverage
- visual verification
- unit tests
- public documentation updates
- release metadata updates when the change affects the published package
- Do not treat a component as complete until Storybook, tests, and public documentation are updated.
- Prefer shipping one coherent vertical slice at a time instead of partially touching many layers.

Release And Versioning Flow
- Use Changesets for package versioning.
- Add a changeset for any merged change that should affect the published package.
- Do not add a release-trigger-only changeset just to exercise the pipeline without explicit user approval first.
- Keep `CHANGELOG.md` consumer-facing and release-oriented.
- Storybook is the primary public component documentation surface.
- Keep deeper design process notes in `docs/`, but ensure consumer-facing behavior is reflected in Storybook and release notes.
- Review the expiry date of publish-related secrets every 60 days and rotate them before they lapse.
- Publish secret review tracker:
- last reviewed: `2026-03-15`
- review again by: `2026-05-14`
- Before calling a component ready for release, verify:
- `npm run build`
- `npm test`
- relevant Storybook stories for the changed component

Plan (Local Tracking)
- Phase 1: Foundation
- [x] Vite + Vitest setup
- [x] Storybook setup
- [x] Theme types and tokens
- [x] ThemeProvider with light/dark defaults
- [x] Deep merge for partial theme overrides
- [x] Custom named colors support
- [x] CSS variable generation
- [x] Base styles reset

- Phase 2: Primitives
- [ ] Button
- [ ] Text
- [ ] Box
- [ ] Stack
- [ ] Card
- [ ] Divider
- [ ] Input
- [ ] Textarea
- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] Badge
- [ ] Tag
- [ ] Tooltip
- [ ] Toast

- Phase 3: Composites
- [ ] Modal
- [ ] Drawer
- [ ] Tabs
- [ ] Accordion
- [ ] Table
- [ ] Pagination
- [ ] Breadcrumb
- [ ] Sidebar
- [ ] Topbar
- [ ] Menu

- Phase 4: Documentation
- [ ] Storybook docs for each component
- [ ] Theming guide
- [ ] Accessibility notes

- Phase 5: Hardening
- [ ] Unit tests (Vitest)
- [ ] Interaction tests (where needed)
- [ ] Package export structure and versioning
