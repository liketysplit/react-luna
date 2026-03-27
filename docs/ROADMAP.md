# Roadmap

This document records the current release-shape roadmap for `react-luna`.

It is not the active issue backlog. GitHub Issues and milestones still track concrete work items.

This file exists to preserve the product and release north star behind that work.

## Current Release Model

### `0.0.x` Build The Base

The early `0.0.x` line is for building the full component base needed by the library.

The intent is not to publish a tiny partial library and call that `v1`.

The intent is to make sure the needed components exist before or as the library approaches its first meaningful stable shape.

This phase is about:

- building the required primitives
- building the required composites
- establishing the base theme and token model
- shaping durable component contracts
- getting Storybook, tests, and docs in place as components land

### `0.x.x` Hardening Pass

The broader `0.x.x` period is for hardening.

This is where the library should prove that the base is durable rather than merely present.

This phase is about:

- tightening component contracts
- validating themeability
- improving documentation quality
- expanding tests and interaction coverage
- correcting export and packaging edges
- fixing design and API weak spots before `1.0`

### `1.1.x` Eat Our Own Pie

After the library has a stable `1.0` shape, the next step is to build a real application with it and use that experience to find flaws.

This is the "eat our own pie" phase.

The goal is to discover:

- weak contracts
- missing components
- awkward theming gaps
- friction in real application workflows
- Storybook or docs gaps that only show up during actual use

This phase is about correcting the library based on real consumer experience, not theoretical completeness.

## North Stars

- `LunaButton` is the baseline primitive contract example.
- Themeability is first-class.
- Consumers should be able to make the library feel like their own.
- Storybook, tests, and docs should stay aligned with meaningful component changes.
- The library should become stable by surviving real application use, not just isolated component work.

## Relationship To Issues

Use GitHub Issues and milestones for concrete execution.

Use this roadmap for:

- release-shape decisions
- scope cuts
- priority arguments
- deciding whether a task belongs in base-build, hardening, or app-driven correction
