# Plan

This file is temporary.

Purpose:
- preserve the current roadmap while issue tracking is being set up
- provide issue-ready work items that can be moved into GitHub Issues
- be deleted once the issues and project board are in place

## Migration Rule

- Use this file only as a staging area for issue creation.
- Once an item becomes a GitHub Issue, remove it from this file.
- Once all items are represented in GitHub Issues, delete this file.

## Phase 2: Primitives

- `LunaButton`
  - polish visual treatments across states and modes
  - finalize icon strategy
  - expand test coverage
  - expand public documentation

- `LunaText`
- `LunaBox`
- `LunaStack`
- `LunaCard`
- `LunaDivider`
- `LunaInput`
- `LunaTextarea`
- `LunaSelect`
- `LunaCheckbox`
- `LunaSwitch`
- `LunaBadge`
- `LunaTag`
- `LunaTooltip`
- `LunaToast`

## Phase 3: Composites

- `LunaModal`
- `LunaDrawer`
- `LunaTabs`
- `LunaAccordion`
- `LunaTable`
- `LunaPagination`
- `LunaBreadcrumb`
- `LunaSidebar`
- `LunaTopbar`
- `LunaMenu`

## Phase 4: Documentation

- Storybook docs for each component
- Theming guide
- Accessibility notes
- Project-level docs structure review
- Separate hosted docs and live demo project planning

## Phase 5: Hardening

- expand unit test coverage across primitives
- add interaction tests where needed
- verify final package export structure
- verify release/versioning workflow over multiple releases
- review npm trusted publishing later if desired

## Near-Term Issue Candidates

- convert current primitive roadmap into GitHub Issues
- set up GitHub labels for domain, type, and priority
- set up GitHub milestones for project phases
- set up GitHub Project board with workflow states
- reduce overlap between `AGENTS.md` and `WORKFLOW.md`
- decide whether to keep a high-level phase summary in `AGENTS.md` once GitHub tracking is live
