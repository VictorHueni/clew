---
title: Metamodel — Agent (Supporting Package)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Agent Package — _supporting_

> Part of [The Metamodel](../README.md) → **Supporting packages**. Prefix `agent-` → _(no doc folder)_.

> **Tooling, not a metamodel artefact.** These skills mint no IDs, hold no typed relationships, and
> appear in no registry. They orchestrate *how the agent builds*, not *what the product is*.

The **Agent-Centric Development Cycle** — the loop that wraps agent code-generation, framed on
SonarSource's [AC-DC](https://www.sonarsource.com/blog/the-future-is-ac-dc-the-agent-centric-development-cycle/)
**Guide → Verify → Solve**:

- **Guide** — give the agent the right context, standards, and guardrails before it works.
- **Verify** — check the specs and the agent's work, in two loops: *inner* (course-correct while
  reasoning) and *outer* (validate completed work).
- **Solve** — execute autonomously, increment by increment.

These four skills were regrouped out of `dev-`/`spec-` (clew
[ADR-0010](../../architecture/decisions/adr-0010-agent-package-agent-centric-development-cycle.md))
because their prefixes no longer matched their nature — `agent-ralph-loop` was already categorised
`execution`, and the review skills are *methods*, not product-spec artefacts.

## Skills

| Skill | AC-DC pillar | Output | What it does |
| :-- | :-- | :-- | :-- |
| `agent-config` | **Guide** | `CLAUDE.md` / `AGENTS.md` | Scaffold, review, improve agent-context files — behavioural posture, token-budget discipline, docs-index wiring. Three modes: scaffold, review, improve. |
| `agent-grill-me` | **Verify** · inner loop | ADRs (via `arch-adr`) | Live Socratic stress-test of a PRD / implementation plan, one question at a time; enforces domain vocabulary against the glossary; surfaces *thinking* gaps under questioning. |
| `agent-peer-review` | **Verify** · outer loop | ranked findings (interactive) | Static critical review of PRDs / plans → findings ranked by severity (critical / major / normal / low) with concrete remediation; surfaces *mechanical* gaps automatically. |
| `agent-ralph-loop` | **Solve** | committed increments | Execute an implementation plan autonomously — implement → test → commit per increment, repeat (fresh context each pass). |

## Relation to the metamodel

These skills produce no metamodel artefacts and hold no typed relationships. Their touchpoints are by
*reference*, not ownership:

- `agent-grill-me` and `agent-peer-review` **read** a `prd` (`PRD-NNNN`) or `implementation_plan`
  (`Plan-NNNN`) to interrogate it; `agent-grill-me` *crystallises* decisions into `adr` (`ADR-NNNN`)
  via `arch-adr`, but the ADR is owned by the Architecture package, not minted here.
- `agent-ralph-loop` **consumes** a `plan-implementation` (`Plan-NNNN`) and turns its increments into
  committed code.

Distinct from the [Quality Assurance](quality-assurance.md) package (`qa-`): `agent-` Verify checks
the **specs and the agent's work in-cycle**, before/while building; `qa-` produces the **tests** that
verify the shipped product's `QA-XXNN` quality requirements. Different fact-class, different stage.

## Planned additions

| Planned skill | Adds | Status |
| :-- | :-- | :-- |
| _none tracked yet_ | — | The four-skill cycle is complete; eval-harness / self-repair extensions would be raised as kit issues if needed. |
