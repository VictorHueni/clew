---
title: Metamodel — Dev (Supporting Package)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Dev Package — _supporting_

> Part of [The Metamodel](../README.md) → **Supporting packages**. Prefix `dev-` → _(no doc folder)_;
> exceptions `dev-stack-guide` + `dev-getting-started` → `docs/dev-guides/`.

> **Tooling, not a metamodel artefact.** These skills mint no IDs, hold no typed relationships, and
> appear in no registry. They *execute* and *support* the build rather than define what must be true.

The **developer-workflow execution layer.** Where the metamodel's specs turn into committed code:
isolating workspaces, running the autonomous implementation loop, committing, opening PRs — plus the
project-specific developer reference guides. This is the package that *acts on* the spec layer's
implementation plans.

## Skills

| Skill | Output | What it does |
| :-- | :-- | :-- |
| `dev-agent-config` | `CLAUDE.md` / `AGENTS.md` | Scaffold, review, improve agent-context files — behavioural posture, token-budget discipline, docs-index wiring. |
| `dev-getting-started` | `docs/dev-guides/getting-started.md` | Read real project files (package.json, docker-compose, Makefile, CI) and emit exact run/build/test commands. |
| `dev-stack-guide` | `docs/dev-guides/{tech-slug}.md` (+ `research/`) | Research a stack's latest docs + MCP server; write a guide of patterns, anti-patterns, agent integration. |
| `dev-git-init` | git enforcement stack (hooks, configs) | Scaffold husky/pre-commit + commitlint (Conventional Commits) + gitleaks + `.gitignore`/`.editorconfig` for Node/Python. |
| `dev-git-worktree` | an isolated git worktree | Create an isolated worktree before feature work or executing an implementation plan (safety-checked). |
| `dev-ralph-loop` | committed increments | Execute an implementation plan autonomously — implement → test → commit per increment, repeat (fresh context each). |
| `dev-git-commit` | a git commit | Conventional-commit message analysis, intelligent staging, message generation. |
| `dev-pr` | a pull request | Open a PR following the repo's template and standards. |

## Relation to the metamodel

The only structural touchpoint is **execution**: `dev-ralph-loop` runs the increments of a
`spec-implementation-plan` (`Plan-NNNN`) — it *consumes* a metamodel artefact but produces none. The
guide skills write to `docs/dev-guides/`, which is reference material, not a governed artefact (no
frontmatter-tracked review cadence, no ID, no relationship). Everything here is downstream of the
model and feeds nothing back into it.

## Planned additions

| Planned skill | Adds | Kit issue |
| :-- | :-- | :-- |
| `dev-changelog` | `CHANGELOG.md` per Keep a Changelog | [#18](https://github.com/VictorHueni/homemade-claude-kit/issues/18) |
