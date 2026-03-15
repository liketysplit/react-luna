@liketysplit/react-luna

Statement
@liketysplit/react-luna is a self-sufficient React component library designed to be a durable foundation for personal applications. It targets a clean, lunar aesthetic with a default light and dark theme that can be overridden at the project level after installation.

Goals
- Provide a complete set of reusable UI primitives and layouts.
- Keep the library independent from third-party UI frameworks.
- Ship a default Lunar theme with light and dark variants.
- Allow downstream projects to override theme tokens and component styling.

Non-goals
- Depending on external UI component libraries.

Design Approach
- Theme tokens first, component styles derived from tokens.
- Accessible defaults and consistent spacing/typography scales.
- Clear layering of primitives, composites, and templates.

Tooling
- React for component implementation.
- Storybook for interactive component exploration and configuration.
- Changesets for package versioning and release notes.

Release Flow
- Add a changeset with `npm run changeset` for any package change that should affect the published version.
- Merge to `main`.
- GitHub Actions opens or updates a release pull request with version bumps and changelog updates.
- Merging that release pull request publishes the package to npm.

Publishing Prerequisites
- `NPM_TOKEN` must be set in GitHub Actions secrets.
- The repository release workflow publishes from `main`.

Licensing
All rights reserved.
