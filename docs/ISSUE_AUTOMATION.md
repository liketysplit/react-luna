# Issue Automation

This document defines the first-pass automation model for turning selected `react-luna` issues into draft pull requests with Codex.

The goal is to reduce manual execution overhead without letting the repository turn into an uncontrolled autopilot system.

## Core Model

Issues do not become code automatically just because they exist.

An issue becomes automation-eligible only when it is explicitly marked ready for Codex execution.

The intended flow is:

1. an issue is prepared well enough to execute
2. the issue is marked for Codex pickup
3. a local worker runs Codex with the right repository context and skill stack
4. Codex creates a branch, implements the issue, and opens a draft pull request
5. the pull request is reviewed visually and technically before merge

## Why This Exists

The repository is now issue-driven and has custom Codex skills that encode local expectations.

Automation should use those skills and the repository guardrails instead of bypassing them.

This system exists to:

- keep issue-driven work moving
- preserve the `react-luna` north stars during automation
- create reviewable draft pull requests instead of silent direct changes
- keep human review in the loop

## Eligibility Rules

An issue should only be picked up automatically when:

- the issue is open
- the issue belongs to an allowed repo such as `react-luna`
- the issue has a clear title and useful body
- the issue has the correct milestone and labels
- the issue is explicitly marked with an automation label such as `codex-ready`
- the issue is not marked with an exclusion label such as `no-codex`

## Recommended Labels

Use labels like:

- `codex-ready`
- `codex-running`
- `codex-retry`
- `codex-blocked`
- `codex-review`
- `no-codex`
- `codex-refine`
- `tracker`
- `build-fail`
- `test-fail`
- `storybook-fail`
- `runtime-fail`
- `env-fail`
- `spec-fail`

These labels are operational labels. They do not replace the existing domain and phase labels.

Recommended meaning:

- `tracker`: root issue that should be cut into execution issues
- `codex-refine`: execution issue that still needs a local shaping pass
- `codex-ready`: execution issue that is ready for automation
- `codex-retry`: execution issue that failed in a repairable way and should be retried automatically up to a capped limit
- `codex-blocked`: execution issue that needs human help or environment repair before automation should continue
- `no-codex`: issue that should stay out of automation

Failure reason labels should be used alongside the state labels:

- `build-fail`
- `test-fail`
- `storybook-fail`
- `runtime-fail`
- `env-fail`
- `spec-fail`

## Issue Templates

Automation works better when issues are shaped consistently.

Use the repository issue templates for:

- Codex-ready component work
- Codex-ready hardening or docs work

The issue should already answer:

- why this exists
- what the contract or scope is
- what outputs are required
- what done looks like

If an issue does not answer those cleanly, it is usually not ready for `codex-ready`.

## Root Issue Pattern

Use root issues to track a broader slice of work.

Root issues should:

- carry the `tracker` label
- usually carry `no-codex`
- collect child execution issues
- preserve intent, scope, and north star

Execution issues should be cut from the root issue and move through:

- `codex-refine`
- then `codex-ready`

This keeps automation focused on small, reviewable slices instead of broad planning issues.

## Trigger Model

Preferred trigger model:

- GitHub webhook on issue labeling and issue edits

Safety net:

- periodic poll, for example once an hour, to catch missed webhook events

The poller should be conservative and only act on issues that already satisfy the eligibility rules.

## Worker Model

The worker should run in a local or controlled environment that can access:

- the repository checkout
- the installed custom Codex skills under `~/.codex/skills`
- the local documentation and BookStack guidance when needed
- GitHub CLI or equivalent API credentials for branch and pull request operations

This matters because the local skill system is part of the execution quality.

## Default Skill Routing

For `react-luna`, the automation should default to:

- `react-luna`

That skill already bundles the normal expectations around:

- repository docs
- local durable notes
- `LunaButton` as the baseline contract example
- themeability as first-class
- tests and Storybook as default outputs

Supporting skills may still be used during execution, but the worker should not require the issue body to restate them every time.

## Pull Request Rules

The worker should:

- create a dedicated branch per issue
- keep one issue per branch
- open a draft pull request only
- link the issue in the branch and pull request
- include a short change summary
- include what was tested
- include whether Storybook and docs were updated
- stop and mark the issue blocked if the problem is underspecified

The worker should not:

- merge automatically
- rewrite unrelated files casually
- pick up multiple unrelated issues in one run

## Verification Expectations

Before opening the draft pull request, the worker should try to:

- run relevant tests
- run relevant typechecks
- confirm Storybook or story files were added or updated when meaningful
- confirm docs changed when the public contract changed

If verification cannot run cleanly, that should be stated in the pull request and issue comment.

## Failure States

If the worker cannot proceed, it should:

- classify the failure
- use `codex-retry` for repairable execution misses
- use `codex-blocked` for real human-needed failures
- leave a short issue comment explaining why
- avoid opening a fake-progress pull request

Common retry reasons:

- build failure
- test failure
- Storybook build failure
- runtime failure inside the repo workflow

Common blocked reasons:

- issue too vague
- contract ambiguity
- missing labels or milestone
- dependency on another issue
- missing tool or auth
- broken environment that the worker cannot repair safely

The retry loop should be capped.

The default recommendation is:

- one immediate repair attempt inside the current run
- one or two future scheduled retries at most
- then move to `codex-blocked` if the issue still fails

## Recommended Issue Shape

To make automation reliable, issues should say:

- what to build or change
- whether the work is primitive, composite, docs, theme, hardening, or release-related
- expected outputs such as implementation, tests, Storybook, and docs
- important contract or non-goal notes

For `react-luna`, this means the issue body should usually be good enough that Codex does not need a second manual translation pass before starting.

## Initial Scope Recommendation

Start narrow.

Good first automation targets:

- well-scoped primitive issues
- docs issues
- hardening issues with clear acceptance criteria

Do not start with:

- broad multi-component epics
- workflow migration issues
- ambiguous design problems with no clear acceptance criteria

## Initial Sequence

Recommended rollout:

1. add the operational labels
2. update issue templates to support Codex-ready work
3. build the webhook plus poll worker
4. allow only `react-luna`
5. limit automation to `codex-ready`
6. produce draft pull requests only
7. review the first few runs manually and tighten the process
