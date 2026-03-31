# react-luna AGENTS

Start here.

This file is the entry point for agent guidance in `react-luna`.

## Use The Right Guide

Read these files in this order:

1. `AGENTS.md`
2. `AGENTS-CONTRIBUTION.md`
3. `AGENTS-USE.md`
4. `WORKFLOW.md`
5. the relevant component or theme docs under `docs/`

## What Each File Is For

- `AGENTS-CONTRIBUTION.md`
  Repository constraints, delivery expectations, workflow rules, tracking rules, and north-star guidance.

- `AGENTS-USE.md`
  Package usage guidance, component selection guidance, layout guidance, and how to build pages correctly with `LunaApp` and `LunaWireframe`.

## Routing Rules

Use `AGENTS-CONTRIBUTION.md` when the task is about:

- implementing or changing components
- changing tests or Storybook
- updating docs
- release or changeset work
- repository workflow or contribution behavior

Use `AGENTS-USE.md` when the task is about:

- how a consumer should install or use the package
- which component should be used for a specific UI need
- page composition
- app shell structure
- `ThemeProvider`, `LunaApp`, `LunaWireframe`, or `LunaPane`
- choosing between similar components
- reviewing whether a page is composed in a Luna-native way

Use both files when the task affects both repository behavior and package usage guidance.
