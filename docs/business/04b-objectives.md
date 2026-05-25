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

**Upstream gaps to backfill:** BMC value propositions (`VP-NN`) remain undefined; the VPC drill-down is deferred until external interviews surface gaps wave 1 did not catch. Capabilities are defined in [`03a-capability-map.md`](03a-capability-map.md); each OBJ below carries a `Realised by:` line mapping its KRs to L1 capabilities. Value streams are defined in [`04a-value-streams.md`](04a-value-streams.md); VS-1 (Compose Architecture) is fully filled and is wired into the OBJ blocks below. VS-2 (Navigate), VS-3 (Refactor), and VS-4 (Share) are catalogued but not yet stage-decomposed and will further realise OBJ-01 once filled.

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
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) · [VS-1 Compose Architecture](04a-value-streams.md#vs-1--compose-architecture) (filled; primary realisation of KR-01.1 via end-to-end stage flow). [VS-2 Navigate Architecture](04a-value-streams.md#catalogue) and [VS-3 Refactor Architecture](04a-value-streams.md#catalogue) catalogued but not yet stage-decomposed; will further realise KR-01.3 (< 30 s cross-artefact answers) and KR-01.4 (trust the architecture is current) once filled. · [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer)
- **Realised by:** KR-01.1 → [C1.1 Methodology-mediated artefact creation](03a-capability-map.md#c11--methodology-mediated-artefact-creation) + [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) (both consumed by [VS-1.3 Draft](04a-value-streams.md#vs-13--draft-artefact-content) and [VS-1.4 Persist](04a-value-streams.md#vs-14--persist-with-stable-id)). KR-01.2 → [C1.2 Selective context loading](03a-capability-map.md#c12--selective-context-loading) (consumed by [VS-1.2 Load Context](04a-value-streams.md#vs-12--load-methodology-context)). KR-01.3 → [C3.1 Ad-hoc cross-artefact query surface](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) + [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (both serve VS-2 Navigate once its stages are decomposed). KR-01.4 → broader C1 + C3 outcome; no single capability.

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
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) · [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id) (the Critical-pain stage that gates VS-1; KR-02.1 / 02.2 / 02.3 / 02.4 all surface here at write time). [VS-3 Refactor Architecture](04a-value-streams.md#catalogue) catalogued; will further realise KR-02.2 + KR-02.3 once stage-decomposed (the rename / re-tier / retire flow is where write-time integrity prevents post-commit rot). · [VISION North Star](../VISION.md#north-star-metric) · [P-01 §System Needs](01a-personas.md#system-needs) · [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md)
- **Realised by:** KR-02.1 + KR-02.2 + KR-02.3 → [C4.1 Write-time reference validation](03a-capability-map.md#c41--write-time-reference-validation) (the Differentiator capability that makes write-time enforcement structural rather than aspirational; consumed by [VS-1.4 Persist](04a-value-streams.md#vs-14--persist-with-stable-id)), with [C2.2 Schema enforcement](03a-capability-map.md#c22--schema-enforcement) and [C4.2 Drift detection](03a-capability-map.md#c42--drift-detection) as supporting capabilities. KR-02.4 → [C2.4 Deterministic structural export](03a-capability-map.md#c24--deterministic-structural-export) + [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) (both consumed by [VS-1.4 Persist](04a-value-streams.md#vs-14--persist-with-stable-id)).

| ID | Key Result | Baseline | Target | Measurement method | Confidence |
|---|---|---|---|---|---|
| KR-02.1 | Share of artefacts in the metamodel that resolve end-to-end through their declared relationships with zero broken references | undefined (no automated check today) | **100% at write time** (write-time integrity enforcement makes any other target a tolerance for silent rot, which is exactly the anti-pattern the substrate exists to prevent) | Single query against the persistence layer, run on every commit | Tested (N=1, user-stated trust criterion) |
| KR-02.2 | Share of integrity violations that surface at the moment they are introduced, not later | 0% (all drift is currently silent in markdown) | 100% | Per-violation comparison of detection-time vs. introduction-time, logged monthly | Assumed |
| KR-02.3 | Median time from a breaking change to its detection | weeks (until something downstream breaks) | under 1 minute (caught at write-time) | Time-to-detection logged on every integrity failure | Assumed |
| KR-02.4 | Same input produces the same persisted record across separate runs | undefined | 100% on a representative test set | Replay 20 known inputs, diff outputs after each release | Assumed |

### OBJ-03 · Validate the core hypotheses before scaling

- **Perspective:** Learning
- **Timeframe:** clew v1 MVP
- **Owner:** Victor Hueni (founder)
- **Why it matters:** Every artefact in the project today (VISION's audience claim, P-01's frustrations and goals) is assumption-based. Locking in a substrate without validating the underlying hypotheses risks building a tool for a persona that does not exist outside the author's head.
- **Linked from:** [Lean Canvas UVP](02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) · [P-01 §Research Grounding](01a-personas.md#research-grounding) (partially researched, wave 1 complete 2026-05-24, next review 2026-08-22) · [Wave-1 synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md)
- **Realised by:** OBJ-03 is a research / validation objective; its KRs (persona conversion, interview programme, dogfood adoption, frustration labelling) are activities, not capabilities. No `Realised by:` mapping; capabilities serve OBJ-01 and OBJ-02 outcomes that OBJ-03 then validates.

| ID | Key Result | Baseline | Target | Measurement method | Confidence |
|---|---|---|---|---|---|
| KR-03.1 | Personas promoted from proto-persona to research-grounded | 0 | 1 (P-01) | Update P-01's §Research Grounding with method, sample, sources, and validated date | Assumed |
| KR-03.2 | Structured interviews conducted with candidates who match the P-01 profile | 1 of 3 to 5 (wave 1 complete 2026-05-24; founder-as-instance only, external candidates pending) | 3 to 5 (with ≥ 1 non-product role to test the "any builder" generalisation finding from wave 1) | Interview log with date, name, role, summary | Tested (N=1) |
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
| 2026-05-24 | OBJ-02 §Linked from: added [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) and [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md). | ADR-0002 drafted; ADR-0001 was already in the repo and is the parent decision. | OBJ-02 KR-02.1/02.2/02.3 instrumentation hangs off the binding model defined in ADR-0002. |
| 2026-05-24 | Wave-1 synthesis cascade: OBJ-02 KR-02.1 target tightened from ≥ 99% to 100% at write time (per the wave-1 magic-wand finding that any tolerance below 100% is a tolerance for silent rot, which is the exact anti-pattern the substrate exists to prevent); confidence shifted to Tested (N=1, user-stated trust criterion). OBJ-03 KR-03.2 baseline updated from 0 to 1 of 3 to 5 interviews; target sharpened to specify ≥ 1 non-product role for wave 2; confidence Tested (N=1). OBJ-03 §Linked from updated to reflect partial promotion of P-01 from proto-persona to wave-1-complete. | [Wave-1 P-01 validation synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (N=1, founder-as-instance). | Persona, Lean Canvas, and OBJ doc are now mutually consistent on wave-1 status. KR-03.1 (proto-to-research-grounded promotion) NOT updated: persona is "partially researched", not fully "research-grounded"; full promotion requires external N ≥ 3. KR-03.4 (frustrations confirmed/refuted labelling) NOT updated this commit: deferred until wave 2 broadens the labelling base. |
| 2026-05-24 | Capability backlinks wired. §Upstream gaps note added: capabilities now defined in 03a-capability-map.md and each OBJ carries a `Realised by:` line mapping KRs to L1 capabilities. OBJ-01 `Realised by:` added (KR-01.1 → C1.1+C2.1; KR-01.2 → C1.2; KR-01.3 → C3.1+C3.2; KR-01.4 → broader C1+C3 outcome). OBJ-02 `Realised by:` added (KR-02.1+02.2+02.3 → C4.1 with C2.2+C4.2 supporting; KR-02.4 → C2.4+C2.1). OBJ-03 `Realised by:` records that the OKR is a research / validation objective whose KRs are activities rather than capabilities. | [03a-capability-map.md](03a-capability-map.md) committed earlier today. | None outside this commit; backlink wiring only. KR targets and confidence levels unchanged. |
| 2026-05-25 | Value-stream backlinks wired (cascade from [04a-value-streams.md](04a-value-streams.md) VS-1 fill). §Upstream gaps rewritten: value streams no longer marked _TODO_ (VS-1 filled; VS-2/3/4 catalogued). OBJ-01 §Linked from: `VS-_TODO_` replaced with [VS-1 Compose Architecture](04a-value-streams.md#vs-1--compose-architecture) plus a note that VS-2 (Navigate) and VS-3 (Refactor) will further realise KR-01.3 and KR-01.4 once filled; §Realised by gained per-KR VS-1-stage cross-links. OBJ-02 §Linked from: `VS-_TODO_` replaced with [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id) (the Critical-pain stage that gates VS-1; KR-02.1/02.2/02.3/02.4 all surface at write time there); plus a note that VS-3 (Refactor) will further realise KR-02.2 + KR-02.3 once filled; §Realised by gained per-KR VS-1.4 cross-links. Pre-existing Lean Canvas UVP anchor (`#3-unique-value-proposition--confidence-assumed`) updated to the post-wave-1 heading slug (`#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement`) on both OBJ-01 and OBJ-02, since both were touching that line anyway. | [04a-value-streams.md](04a-value-streams.md) VS-1 committed earlier today. | None outside this commit. OBJ-03 §Linked from intentionally left alone (it still references Lean Canvas UVP with the old anchor; not touched by the value-stream cascade and will be fixed in a future link-rot pass). |
