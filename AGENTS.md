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

Plan (Local Tracking)
- Phase 1: Foundation
- [ ] Vite + Vitest setup
- [ ] Storybook setup
- [ ] Theme types and tokens
- [ ] ThemeProvider with light/dark defaults
- [ ] Deep merge for partial theme overrides
- [ ] Custom named colors support
- [ ] CSS variable generation
- [ ] Base styles reset

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
