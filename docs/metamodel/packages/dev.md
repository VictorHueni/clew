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

The **developer-workflow plumbing layer.** Git enforcement, conventional commits, pull requests, and
isolated worktrees — plus the project-specific developer reference guides (getting-started, per-stack
guides). The autonomous execution loop and agent-context configuration that used to live here moved to
the [Agent package](agent.md) (`agent-ralph-loop`, `agent-config`); what remains is pure
developer-workflow tooling.

## Skills

| Skill | Output | What it does |
| :-- | :-- | :-- |
| `dev-getting-started` | `docs/dev-guides/getting-started.md` | Read real project files (package.json, docker-compose, Makefile, CI) and emit exact run/build/test commands. |
| `dev-stack-guide` | `docs/dev-guides/{tech-slug}.md` (+ `research/`) | Research a stack's latest docs + MCP server; write a guide of patterns, anti-patterns, agent integration. |
| `dev-git-init` | git enforcement stack (hooks, configs) | Scaffold husky/pre-commit + commitlint (Conventional Commits) + gitleaks + `.gitignore`/`.editorconfig` for Node/Python. |
| `dev-git-worktree` | an isolated git worktree | Create an isolated worktree before feature work or executing an implementation plan (safety-checked). |
| `dev-git-commit` | a git commit | Conventional-commit message analysis, intelligent staging, message generation. |
| `dev-pr` | a pull request | Open a PR following the repo's template and standards. |

## Relation to the metamodel

These skills produce no metamodel artefacts. The guide skills write to `docs/dev-guides/`, which is
reference material, not a governed artefact (no frontmatter-tracked review cadence, no ID, no
relationship); the git skills operate on the repository. The execution touchpoint — running the
increments of a `plan-implementation` (`Plan-NNNN`) — now lives in the [Agent package](agent.md)
(`agent-ralph-loop`). Everything here is downstream of the model and feeds nothing back into it.

## Planned additions

| Planned skill | Adds | Kit issue |
| :-- | :-- | :-- |
| `dev-changelog` | `CHANGELOG.md` per Keep a Changelog | [#18](https://github.com/VictorHueni/homemade-claude-kit/issues/18) |
