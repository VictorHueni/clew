---
title: Business Objectives
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 60d
---

<!-- doc-version: 1.0 | created: 2026-05-24 | timeframe: clew v1 MVP -->

# clew · Business Objectives

This document defines the outcomes clew v1 MVP must achieve. Objectives are qualitative, inspiring, and time-bounded; Key Results are measurable state changes (never feature deliveries). The discipline follows Doerr's OKR framework, BABOK v3 §1.3, Adzic's outcome-over-output rule, and Kaplan & Norton's Balanced Scorecard perspectives.

Methodology and bibliography: see the [`business-objective` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-objective).

**Scope:** clew v1 MVP. The OKR set expires when v1 ships.

**Companion docs:**
- [`docs/VISION.md`](../VISION.md): the north star these objectives operationalise.
- [`docs/business/01a-personas.md`](01a-personas.md): the personas whose outcomes these objectives serve.

**Upstream gaps to backfill:** BMC value propositions (`VP-NN`) and value streams (`VS-N.M`) are not yet defined. Soft-link slots referencing them are marked `_TODO_` and should be wired up when those artefacts land.

## Confidence Legend

| Level | Meaning |
|---|---|
| Assumed | Hypothesis from author judgement. No external evidence yet. |
| Tested | Probed with at least one structured interview, prototype, or measurement. |
| Validated | Confirmed across multiple independent sources or in real-world use. |

## Objectives

### OBJ-01 · Ava ships coherent product thinking at agent-speed

- **Perspective:** Customer
- **Timeframe:** clew v1 MVP
- **Owner:** Victor Hueni (founder)
- **Why it matters:** P-01 Ava's bottleneck is keeping the *why* and the *who-for* coherent across artefacts as the agent moves fast. This objective is her core win and the proof clew earns daily use.
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) · VS-_TODO_ · [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer)

| ID | Key Result | Baseline | Target | Measurement method | Confidence |
|---|---|---|---|---|---|
| KR-01.1 | Time from a blank project to the first persona persisted with a stable identifier | ~30 min in a markdown-only flow | < 5 min | Manual timing across 3 fresh-project trials | Assumed |
| KR-01.2 | Share of authoring sessions that complete without manually re-deriving context the agent has lost | undefined (not currently measured) | ≥ 80% | Self-reported at end of session, sampled weekly for 4 weeks | Assumed |
| KR-01.3 | Cross-artefact question ("which X serves Y?") answer time, from inside an agent session | 20+ min of grep-and-read | < 30 s | Stopwatch on 5 representative questions, monthly | Assumed |
| KR-01.4 | Ava's qualitative score on "I trust the architecture to be current" after 4 weeks of use | undefined (no interviews yet) | ≥ 4 / 5 | Structured interview question, repeated quarterly | Assumed |

### OBJ-02 · The architectural substrate is trustworthy enough that agents depend on it

- **Perspective:** Process
- **Timeframe:** clew v1 MVP
- **Owner:** Victor Hueni (founder)
- **Why it matters:** VISION's North Star ("end-to-end traceability across the architecture") is the system-level outcome. This objective makes it measurable and breaks it into observable behaviours.
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) · VS-_TODO_ · [VISION North Star](../VISION.md#north-star-metric) · [P-01 §System Needs](01a-personas.md#system-needs)

| ID | Key Result | Baseline | Target | Measurement method | Confidence |
|---|---|---|---|---|---|
| KR-02.1 | Share of artefacts in the metamodel that resolve end-to-end through their declared relationships with zero broken references | undefined (no automated check today) | ≥ 99% at any moment | Single query against the persistence layer, run on every commit | Assumed |
| KR-02.2 | Share of integrity violations that surface at the moment they are introduced, not later | 0% (all drift is currently silent in markdown) | 100% | Per-violation comparison of detection-time vs. introduction-time, logged monthly | Assumed |
| KR-02.3 | Median time from a breaking change to its detection | weeks (until something downstream breaks) | under 1 minute (caught at write-time) | Time-to-detection logged on every integrity failure | Assumed |
| KR-02.4 | Same input produces the same persisted record across separate runs | undefined | 100% on a representative test set | Replay 20 known inputs, diff outputs after each release | Assumed |

### OBJ-03 · Validate the core hypotheses before scaling

- **Perspective:** Learning
- **Timeframe:** clew v1 MVP
- **Owner:** Victor Hueni (founder)
- **Why it matters:** Every artefact in the project today (VISION's audience claim, P-01's frustrations and goals) is assumption-based. Locking in a substrate without validating the underlying hypotheses risks building a tool for a persona that does not exist outside the author's head.
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) · [P-01 §Research Grounding](01a-personas.md#research-grounding) (proto, next review 2026-08-22)

| ID | Key Result | Baseline | Target | Measurement method | Confidence |
|---|---|---|---|---|---|
| KR-03.1 | Personas promoted from proto-persona to research-grounded | 0 | 1 (P-01) | Update P-01's §Research Grounding with method, sample, sources, and validated date | Assumed |
| KR-03.2 | Structured interviews conducted with candidates who match the P-01 profile | 0 | 3 to 5 | Interview log with date, name, role, summary | Assumed |
| KR-03.3 | Independent agent-first product engineers actively using clew on their own project | 0 | ≥ 5 | Self-reported via outreach or a public project list | Assumed |
| KR-03.4 | Share of P-01's stated frustrations confirmed (or refuted) by interview evidence | 0% (all assumed) | 100% labelled (confirmed / refuted / unclear) | Per-frustration tag added to P-01's §Research Grounding | Assumed |

## Objective × Epic Traceability Matrix

| Epic | Name | Objective | KRs served |
|---|---|---|---|
| _TODO_ | (no epics defined yet; delivery roadmap pending) | | |

## Changelog

| Date | Change | Evidence | Effects |
|---|---|---|---|
| 2026-05-24 | Scaffold + fill: OBJ-01 (Customer), OBJ-02 (Process), OBJ-03 (Learning) added. All KRs marked Assumed; no Tested or Validated yet. | Drafted from VISION.md and P-01 (Ava). | VISION.md Linked Artefacts should be backfilled to reference OBJ-01/02/03. |
| 2026-05-24 | Linked-from slots: VP-_TODO_ replaced with [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) on all three objectives. | Lean Canvas v1 scaffolded. | None; VS-_TODO_ still outstanding until value-streams artefact lands. |
