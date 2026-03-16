# Change Management

This file defines how repository changes should be initiated, justified, tracked, and closed.

## Core Rule

All meaningful work should be issue-driven.

That means:
- start from an existing GitHub Issue, or
- create a new GitHub Issue before implementation begins

If no issue exists yet, the change must be justified first.

## Required Starting Point

Before implementation, every non-trivial change should have one of these:
- an existing GitHub Issue
- a newly created GitHub Issue based on a justified change request

Examples of non-trivial changes:
- new component work
- bug fixes
- design changes
- theme changes
- release workflow changes
- documentation changes with behavior impact
- test framework changes

Examples of trivial changes that may not need a new issue:
- typo fixes with no behavioral consequence
- obvious local cleanup inside an active issue
- small follow-up adjustments that are clearly part of the current in-progress issue

## Justification Rule

If there is no existing issue, justify the change before implementation.

A valid justification should explain:
- what problem is being solved
- why the work matters now
- whether the change is package-facing, internal, or operational
- what issue should track the work

The default action after justification is:
- create the issue
- attach labels and milestone
- move the issue into the tracking flow

## Story-Driven Work

Treat work as story-driven whenever possible.

A good issue should describe:
- the user or maintainer need
- the expected outcome
- the boundaries of the change
- the definition of done

For component work, the story should naturally lead to:
- implementation
- Storybook coverage
- verification
- unit tests
- public documentation updates
- changeset review if release-facing

## Issue Creation Rule

If the work is justified and no issue exists:
- create the issue before starting the implementation
- assign the appropriate labels
- attach the correct milestone
- add it to the GitHub Project board

## State Flow

Use the GitHub Project board status flow:

`Todo -> In Progress -> Done`

If a richer status flow is adopted later, update `WORKFLOW.md` and the project board together.

## Completion Rule

A change should not be considered complete until:
- the linked issue reflects the completed scope
- Storybook is updated where needed
- tests are updated where needed
- docs are updated where needed
- the issue status is moved to `Done`

## Relationship To Other Files

- `AGENTS.md` defines repository guardrails.
- `WORKFLOW.md` defines delivery and tracking flow.
- `CHANGE_MANAGEMENT.md` defines how work must enter and move through the system.
- GitHub Issues and the GitHub Project board are the operational source of truth.
