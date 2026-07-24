---
type: Epic
title: clew — Delivery Roadmap
description: Epic decomposition of the FBS with a v0.1 walking skeleton, phase plan, and objective traceability — the delivery-planning and product-roadmap layers in one document.
tags: [plans, delivery-roadmap, epics]
timestamp: 2026-07-24T15:11:30Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 60d
---

<!-- doc-version: 1.0 | created: 2026-07-24 -->

# clew — Delivery Roadmap

This document serves two audiences in one artefact. The **product-roadmap layer** (§Walking Skeleton, §Phase Plan) answers "what can [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) and [P-03 Arno](../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder) actually do after each phase ships?" in value-stream language. The **delivery-planning layer** (§Epic Table, §Epics) clusters every [FBS](../product-specs/07a-fbs.md) functionality into E-NN epics with stable IDs, each specified by exactly one PRD (`SPECIFIES prd → epic` is 1:1 per [docs/metamodel/relationships.md](../metamodel/relationships.md)).

> **Methodology:** FDD Phase 3 "Plan by Feature" (De Luca & Coad), walking skeleton (Cockburn/Beck/Patton), epic sizing per Cohn/Leffingwell. Full bibliography with the [`plan-delivery-roadmap` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/main/plugins/product-spec/skills/plan-delivery-roadmap).

**Companion documents:**

- FBS (functionality registry): [`docs/product-specs/07a-fbs.md`](../product-specs/07a-fbs.md)
- Value Streams: [`docs/business/04a-value-streams.md`](../business/04a-value-streams.md)
- Personas: [`docs/business/01a-personas.md`](../business/01a-personas.md)
- Business Objectives: [`docs/business/04b-objectives.md`](../business/04b-objectives.md) (Objective × Epic matrix backfilled from this document)
- Scope decisions: [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) (minimal model / perfect sync) · [ADR-0014](../architecture/decisions/adr-0014-product-architecture-management-positioning.md) (positioning) · [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) (layer packages) · [ADR-0016](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) (edge proposals) · [ADR-0017](../architecture/decisions/adr-0017-multi-artefact-file-contract.md) (multi-artefact files)

**Sequencing honesty (OI-0015 watchpoint).** The E-01 → E-02 → E-03 order inside Phase 1 is **prerequisite-driven**, not pain-driven: nothing queries a store that does not exist, and nothing enforces schemas that are not registered. The N=1 pain ratings in [`04a-value-streams.md`](../business/04a-value-streams.md) *corroborate* this order (VS-1.4, VS-2.2, VS-3.2 are all Critical) but are not its deciding factor, so the [OI-0015 confidence-cliff trigger](../business/04a-value-streams.md#open-items) does not fire on Phase 1. Where pain ratings *would* be the deciding factor — the relative priority of E-04 vs E-05 inside Phase 2 — this roadmap deliberately defers the decision to the wave-2 interviews ([OBJ-03 KR-03.2](../business/04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)), consistent with the trigger.

---

## Walking Skeleton — MVP (v0.1)

**Hypothesis to validate:** *"When an agent changes the product, clew can tell whether it still respects intent"* ([FBS §Scope discipline](../product-specs/07a-fbs.md#scope-discipline-adr-0013)) — i.e. a typed, write-time-enforced artefact graph beats prose + LLM memory for keeping product intent coherent at agent-speed.

**Value stream delivered end-to-end:** [VS-1 · Compose Architecture](../business/04a-value-streams.md#vs-1--compose-architecture) — Pain: **Critical**. Stages VS-1.1 (Choose Type), VS-1.2 (Load Context, methodology-template half), and VS-1.3 (Draft) are already covered by the 5 kit-shipped ✅ functionalities (C1.1.F01–F03, C5.1.F01, C5.3.F01); the skeleton builds the missing VS-1.4 (Persist with Stable ID). Thin slices of [VS-2](../business/04a-value-streams.md#vs-2--navigate-architecture) (list/where/matrix/trace/check) and [VS-3](../business/04a-value-streams.md#vs-3--refactor-architecture) (impact preview, retire integrity) are deliberately included — the hypothesis is about *changes*, so persist-only would not test it.

| Epic | MVP functionalities (thin cut) | Deferred to Phase 1 completion |
|---|---|---|
| [E-01](#e-01--trustworthy-artefact-persistence) | C2.1.F01 · C2.1.F02 · C2.2.F01 · C2.3.F01 · C2.3.F02 · C2.3.F04 · C2.4.F01 · C2.4.F02 · C2.4.F03 · C3.1.F02 · C4.1.F01 · C4.1.F02 · C4.2.F01 · C5.4.F01 | LLM-ID rejection + namespacing (C2.1.F03/F04), full type/enum validation + actionable messages (C2.2.F02–F04), layout-rule enforcement (C2.3.F03), incremental export (C2.4.F04), structured violation messages (C4.1.F03), orphan detection (C4.2.F02/F03), cross-type link resolution (C5.4.F02) — correctness-hardening, not journey-blocking |
| [E-02](#e-02--deterministic-architecture-answers) | C3.2.F01 · C3.2.F02 · C3.2.F03 | Task-scoped context slices (C1.2.F01–F03) and ad-hoc query + NL routing (C3.1.F01/F03) — the canonical views answer the wave-1 trust-threshold questions first |
| [E-03](#e-03--core-methodology-schema-coverage) | C5.2.F01 · C5.2.F02 · C5.2.F04 | Strategyzer schemas (C5.2.F03) — the Lean Canvas joins the enforced graph at Phase 1, not v0.1 |

**Coverage check (target VS):** VS-1.1 ✔ (C1.1.F01/C5.1.F01, shipped) · VS-1.2 ✔ (C5.3.F01 shipped; the selective-slice half, C1.2, is explicitly Phase 1) · VS-1.3 ✔ (C1.1.F02/F03, shipped) · VS-1.4 ✔ (E-01 MVP cut). No broken stage.

**After v0.1 ships, Ava can:**

1. `clew init` an artefact store in any repo and mint personas, capabilities, objectives, FBS rows, PRDs, and embedded user stories with system-issued stable IDs (never LLM-invented) — the [ADR-0017](../architecture/decisions/adr-0017-multi-artefact-file-contract.md) `PRD-NNNN.US-NN` contract included.
2. Link artefacts with typed, type-checked edges and have any write that would break a reference **rejected at write time**, including retires that would leave dangling references.
3. Ask `clew list` / `clew where` and render the traceability matrix, lineage trace, and impact view deterministically — same DB state, same answer, every session.
4. Hand-edit markdown and have `clew check` surface every store↔prose drift by section hash ([ADR-0007](../architecture/decisions/adr-0007-section-content-hashing.md), with the ADR-0017 parent-hash child exclusion).
5. `clew export` a deterministic, git-diffable snapshot and rebuild the store from it (`clew import`) on any machine.

**After v0.1 ships, Ava cannot yet:**

- Load a task-scoped context slice (`clew context <task>`) → Phase 1 (E-02 complete)
- Ask ad-hoc / natural-language cross-artefact questions (`clew query`) → Phase 1 (E-02 complete)
- Rely on layout-rule enforcement, orphan detection, or LLM-ID rejection as guardrails against every bypass path → Phase 1 (E-01 complete)
- Get a pre-change guardrail verdict (`clew guard`) → Phase 2, wave-2-gated (E-04)
- Enable opt-in layer packages, review agent-proposed edges, or export cartography views (P-03 Arno's surface) → Phase 2, wave-2-gated (E-05)

---

## Phase Plan

| Phase | Epics | Value streams fully operational | Goal |
|---|---|---|---|
| **MVP (v0.1)** | E-01 (partial) · E-02 (partial) · E-03 (partial) | VS-1 (thin slice; VS-2/VS-3 thin slices included) | After v0.1, [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) can compose, link, and refactor typed artefacts with write-time integrity and deterministic traceability answers, without trusting the agent to hold the graph in its head. Dogfood corpus: this repo ([KR-01.1](../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) < 5 min first artefact · KR-01.3 < 30 s answers · [KR-02.1](../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) 100% write-time integrity · KR-02.4 deterministic replay). |
| **Phase 1 (v1.0)** | E-01 · E-02 · E-03 complete | VS-1 · VS-2 · VS-3 (VS-4 operational with the [OI-0014](../business/04a-value-streams.md#open-items) materialisation caveat) | After Phase 1, Ava runs every daily journey — compose, navigate, refactor, share — on the enforced graph without re-deriving context the agent has lost, and the full mandatory core (BIZBOK + BABOK + Strategyzer + Sommerville types) is write-time enforceable. The [OBJ-01/OBJ-02](../business/04b-objectives.md) KR set is measured here; the v1 OKR set expires when this phase ships. |
| **Phase 2 (wave-2 gated)** | + E-04 · E-05 | + P-03 streams (not yet modelled — part of the gate work) | After Phase 2, [P-03 Arno](../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder) can enable exactly the layer packages a repo needs under identical write-time strictness, quarantine agent-proposed edges until validated, and regenerate cartography views from the enforced graph — and Ava gets the `clew guard` pre-change verdict once the graph is dense and drift-free. **Gate:** wave-2 interviews (≥1 external P-01 + ≥1 external P-03, [OI-0015/OI-0016](../business/04a-value-streams.md#open-items)) + [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) sequencing + [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)'s dense-and-drift-free precondition for guard. |
| **Phase 3** | + E-06 | (no new streams; VS-1.1/VS-1.2 hardening) | After Phase 3, the methodology catalogue maintains itself honestly: skill inventory and validation, template upgrades without content loss, and coverage-gap reporting across lifecycle layers. |

---

## Epic Table

| ID | Epic name | VS anchor | Pain | Personas | Capabilities | FBS rows | Phase | PRD | Status |
|---|---|---|---|---|---|---|---|---|---|
| E-01 | Trustworthy Artefact Persistence | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) | Critical | [P-01](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) | [C2.1–C2.4](../business/03a-capability-map.md#c2--persistence) · [C4.1, C4.2](../business/03a-capability-map.md#c4--integrity-and-audit) · [C5.4](../business/03a-capability-map.md#c54--cross-methodology-referencing) · [C3.1](../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) (list only) | 25 | 1 | PRD-0001 *(next action)* | ⬜ |
| E-02 | Deterministic Architecture Answers | [VS-2.2](../business/04a-value-streams.md#vs-22--resolve-from-canonical-source) | Critical | [P-01](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) | [C3.1, C3.2](../business/03a-capability-map.md#c3--querying-and-traceability) · [C1.2](../business/03a-capability-map.md#c12--selective-context-loading) | 8 | 1 | _TODO_ | ⬜ |
| E-03 | Core Methodology Schema Coverage | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) | High | [P-01](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) | [C5.2](../business/03a-capability-map.md#c52--per-methodology-pattern-encoding) | 4 | 1 | _TODO_ | ⬜ |
| E-04 | Change Guardrail | [VS-3.2](../business/04a-value-streams.md#vs-32--preview-downstream-impact) | Critical *(gated)* | [P-01](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) | [C1.2](../business/03a-capability-map.md#c12--selective-context-loading) | 1 | 2 | _TODO_ | ⬜ |
| E-05 | Opt-in Layer Packages | — *(P-03 streams not yet modelled)* | — *(gated)* | [P-03](../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder) | [C5.2](../business/03a-capability-map.md#c52--per-methodology-pattern-encoding) *(+ scope pending [OI-0078/OI-0079/OI-0081](../../project-control/open-items/open-items.md))* | 1 (+ _TODO_) | 2 | _TODO_ | ⬜ |
| E-06 | Methodology Catalogue Upkeep | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) | Low–Medium | [P-01](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) *(maintainer persona pending, [OI-0011](../business/04a-value-streams.md#open-items))* | [C5.1](../business/03a-capability-map.md#c51--skill-catalogue-management) · [C5.3](../business/03a-capability-map.md#c53--artefact-template-management) · [C5.5](../business/03a-capability-map.md#c55--methodology-canon-coverage-assessment) | 6 | 3 | _TODO_ | ⬜ |

**Coverage accounting (all 58 FBS rows):** 45 rows land in the six epics above · 5 rows are ✅ shipped via [homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit) (C1.1.F01–F03, C5.1.F01, C5.3.F01 — no epic needed) · 7 rows are ADR-0013-descoped and belong to **no** epic by design (C4.3.F01–F04 audit trail delegated to git · C4.4.F01–F03 schema migration deferred to a hand-rolled `PRAGMA user_version` path) · 1 row is cut (C3.2.F04 `clew estimate`, retained for ID history). 45 + 5 + 7 + 1 = 58 ✔ — every active backlog row appears in exactly one epic.

**★ anchoring note.** The FBS's 16 differentiators do not get 16 epics; they cluster into the epics they collectively anchor: the write-side ★ set (C2.1.F01/F02, C2.2.F01, C2.3.F01, C2.4.F01, C4.1.F01/F02, C4.2.F01) **is** E-01's identity, the read-side ★ set (C1.2.F01, C3.2.F01/F02/F03) is E-02's, the schema ★ set (C5.2.F01/F02) is E-03's, and C1.2.F04 anchors E-04 alone. No ★ is buried in a secondary epic.

---

## Epics

### E-01 · Trustworthy Artefact Persistence

**Value statement:** When this epic ships, [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) can persist, link, and refactor typed artefacts knowing every reference is validated at write time, every section is drift-detectable, and the whole store rebuilds deterministically from git.
**Objective:** [OBJ-02 · The architectural substrate is trustworthy enough that agents depend on it](../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (KR-02.1–02.4) · [OBJ-01](../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (KR-01.1)
**VS anchor:** [VS-1.4 · Persist with Stable ID](../business/04a-value-streams.md#vs-14--persist-with-stable-id) — Pain: **Critical** (plus [VS-3.3 Execute Change with Integrity](../business/04a-value-streams.md#vs-33--execute-change-with-integrity), High)
**Personas:** [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) (P-03 inherits the core unchanged)
**Capabilities:** [C2.1](../business/03a-capability-map.md#c21--stable-identifier-generation) · [C2.2](../business/03a-capability-map.md#c22--schema-enforcement) · [C2.3](../business/03a-capability-map.md#c23--file-binding-management) · [C2.4](../business/03a-capability-map.md#c24--deterministic-structural-export) · [C4.1](../business/03a-capability-map.md#c41--write-time-reference-validation) · [C4.2](../business/03a-capability-map.md#c42--drift-detection) · [C5.4](../business/03a-capability-map.md#c54--cross-methodology-referencing) · [C3.1](../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) (F02 only)
**Phase:** 1 — CLI surface: `init` · `new` · `link` · `set` · `list` · `where` · `check` · `export` · `import` (per [cli-clew.md](../architecture/interfaces/cli-clew.md)), on SQLite WAL ([ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md)), no-DDL typed property graph ([ADR-0003](../architecture/decisions/adr-0003-schema-design-typed-property-graph.md)), section hashing incl. the [ADR-0017](../architecture/decisions/adr-0017-multi-artefact-file-contract.md) parent-hash child exclusion and composite `id_sequences` key
**PRD:** PRD-0001 *(planned — the next artefact on the critical path)*
**Quality attributes in scope:** *(no `09a-quality-attributes.md` yet — OBJ-02 KR targets serve as the interim quality bar)*
**Sizing:** 25 functionalities — **at the upper bound** of the 5–25 range. Deliberate: the write path is one coherent trust boundary and splitting it would ship a half-trustworthy store. Any new row forces a split; PRD-0001 will slice it via embedded `PRD-0001.US-NN` stories (ADR-0017).

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C2.1.F01 | ★ Project initialisation (`clew init`) | ⬜ |
| C2.1.F02 | ★ Sequential ID assignment | ⬜ |
| C2.1.F03 | LLM-ID rejection | ⬜ |
| C2.1.F04 | Cross-project ID namespacing | ⬜ |
| C2.2.F01 | ★ Required-field validation | ⬜ |
| C2.2.F02 | Type validation | ⬜ |
| C2.2.F03 | Constrained-value validation | ⬜ |
| C2.2.F04 | Actionable violation message | ⬜ |
| C2.3.F01 | ★ Location recording | ⬜ |
| C2.3.F02 | Fingerprint tracking | ⬜ |
| C2.3.F03 | Layout-rule enforcement | ⬜ |
| C2.3.F04 | `clew where` | ⬜ |
| C2.4.F01 | ★ Snapshot export (`clew export`) | ⬜ |
| C2.4.F02 | Bit-identical determinism | ⬜ |
| C2.4.F03 | Rebuild from snapshot (`clew import`) | ⬜ |
| C2.4.F04 | Incremental snapshot update | ⬜ |
| C3.1.F02 | `clew list <type>` | ⬜ |
| C4.1.F01 | ★ Reference existence check | ⬜ |
| C4.1.F02 | ★ Reference-integrity on retire | ⬜ |
| C4.1.F03 | Structured violation message | ⬜ |
| C4.2.F01 | ★ Drift scan (`clew check`) | ⬜ |
| C4.2.F02 | Orphan section detection | ⬜ |
| C4.2.F03 | Orphan record detection | ⬜ |
| C5.4.F01 | Cross-type reference validation | ⬜ |
| C5.4.F02 | Cross-methodology link resolution | ⬜ |

---

### E-02 · Deterministic Architecture Answers

**Value statement:** When this epic ships, [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) can get an authoritative cross-artefact answer — matrix, lineage, impact, ad-hoc, or task-scoped context slice — in seconds, deterministically, instead of grep-and-read or LLM-as-join-engine.
**Objective:** [OBJ-01 · Ava ships coherent product thinking at agent-speed](../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (KR-01.2, KR-01.3, KR-01.4 read-side)
**VS anchor:** [VS-2.2 · Resolve from Canonical Source](../business/04a-value-streams.md#vs-22--resolve-from-canonical-source) — Pain: **Critical** (plus [VS-3.2 Preview Downstream Impact](../business/04a-value-streams.md#vs-32--preview-downstream-impact), Critical — the impact view is VS-2 turned forward into a planned change)
**Personas:** [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer)
**Capabilities:** [C3.1](../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) · [C3.2](../business/03a-capability-map.md#c32--pre-built-traceability-views) · [C1.2](../business/03a-capability-map.md#c12--selective-context-loading)
**Phase:** 1 — CLI surface: `matrix` · `trace` · `impact` · `query` · `context`
**PRD:** _TODO_
**Quality attributes in scope:** *(no `09a-quality-attributes.md` yet — KR-01.3's < 30 s answer time is the interim bar)*
**Sizing:** 8 functionalities — within range.

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C1.2.F01 | ★ Task-scoped slice assembly (`clew context <task>`) | ⬜ |
| C1.2.F02 | Slice composition preview | ⬜ |
| C1.2.F03 | Multi-project context isolation | ⬜ |
| C3.1.F01 | Ad-hoc query execution (`clew query`) | ⬜ |
| C3.1.F03 | Natural-language question routing | ⬜ |
| C3.2.F01 | ★ Traceability matrix (`clew matrix`) | ⬜ |
| C3.2.F02 | ★ Lineage view (`clew trace <ID>`) | ⬜ |
| C3.2.F03 | ★ Impact-analysis view (`clew impact <ID>`) | ⬜ |

---

### E-03 · Core Methodology Schema Coverage

**Value statement:** When this epic ships, [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) can persist every mandatory-core artefact type — BIZBOK (persona, capability, value stream, process, BMC, objective), BABOK (FBS, quality attributes), Strategyzer (Lean Canvas), Sommerville (PRD, implementation plan) — under the same write-time enforcement, making this repo fully dogfoodable.
**Objective:** [OBJ-01](../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (KR-01.1) · [OBJ-02](../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (KR-02.1 — coverage widens what "100%" quantifies over)
**VS anchor:** [VS-1.3 · Draft Artefact Content](../business/04a-value-streams.md#vs-13--draft-artefact-content) — Pain: **High**
**Personas:** [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer)
**Capabilities:** [C5.2](../business/03a-capability-map.md#c52--per-methodology-pattern-encoding)
**Phase:** 1
**PRD:** _TODO_
**Quality attributes in scope:** *(none yet)*
**Sizing:** 4 functionalities — **below range**, deliberately kept separate: this is data-authoring (type definitions, property schemas, relationship verbs), not mechanism, and it carries two open decisions that must not be buried inside E-01's PRD — the machine-readable metamodel source of truth (hand-seeded `metamodel.yaml` vs store-backed, [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) chain) and the [OI-0074](../metamodel/relationships.md#open-items) relationship-verb ratification (`ALLOWED_RELATIONSHIPS`).

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C5.2.F01 | ★ BIZBOK artefact schemas | ⬜ |
| C5.2.F02 | ★ BABOK artefact schemas | ⬜ |
| C5.2.F03 | Strategyzer artefact schemas | ⬜ |
| C5.2.F04 | Sommerville artefact schemas | ⬜ |

*(C5.2.F05 DDD artefact schemas belongs to [E-05](#e-05--opt-in-layer-packages): the domain layer is the natural first opt-in layer package per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md), not part of the mandatory core.)*

---

### E-04 · Change Guardrail

**Value statement:** When this epic ships, [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) can ask `clew guard "<change>"` before any refactor and get a deterministic verdict on what it may touch, what it must preserve, and which artefacts must be updated first.
**Objective:** [OBJ-01](../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (KR-01.4) · [OBJ-02](../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (KR-02.2 forward-looking dimension) — *the v1 OKR set will have expired by Phase 2; successor KRs to be minted at the gate*
**VS anchor:** [VS-3.2 · Preview Downstream Impact](../business/04a-value-streams.md#vs-32--preview-downstream-impact) — Pain: **Critical**, but **gated**
**Personas:** [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer)
**Capabilities:** [C1.2](../business/03a-capability-map.md#c12--selective-context-loading)
**Phase:** 2 — **double-gated:** ships only once the graph is dense and drift-free ([ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md): guarding a sparse graph produces confidently-wrong guardrails, worse than none) **and** wave-2 confirms the priority ranking. Brownfield adoption tooling (binding pre-existing docs at scale, `bind --update` per [cli-clew.md](../architecture/interfaces/cli-clew.md)) rides the same gate; its FBS rows are not yet minted.
**PRD:** _TODO_
**Sizing:** 1 functionality — **below range**, deliberately: a single ★ whose scope will grow at gate time; do not pad it forward.

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C1.2.F04 | ★ Change-guardrail (`clew guard "<change>"`) | ⬜ |

---

### E-05 · Opt-in Layer Packages

**Value statement:** When this epic ships, [P-03 Arno](../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder) can enable exactly the artefact types a repo's model needs — prerequisites scaffolded, stub parents and declared absences legal — with every enabled type under the identical 100% write-time guarantee, agent-proposed edges quarantined until validated, and cartography views regenerated from the enforced graph.
**Objective:** — *(no P-03 objective exists yet: the current OKR set is scoped to clew v1 MVP and predates [ADR-0014](../architecture/decisions/adr-0014-product-architecture-management-positioning.md)/[ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md); minting one is part of the Phase-2 gate work)*
**VS anchor:** — *(all four modelled value streams trigger from P-01; P-03's streams are not yet modelled and are part of the gate work)*
**Personas:** [P-03 Arno](../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder)
**Capabilities:** [C5.2](../business/03a-capability-map.md#c52--per-methodology-pattern-encoding) today; the enablement mechanism, edge-proposal lifecycle ([ADR-0016](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)), and cartography export ([ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) D7) have **no capability-map or FBS rows yet** — tracked as [OI-0078](../../project-control/open-items/open-items.md) (registry `package`/`requires` fields), [OI-0079](../../project-control/open-items/open-items.md) (cartography export absent from C3/FBS), and [OI-0081](#open-items) (enablement + proposal-review functionalities absent from BC map/FBS)
**Phase:** 2 — **gated** per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) sequencing: layer-package content reaches the public roadmap only after a second external P-03 instance validates the need (wave-2, ≥1 P-03 interview). Evidence base today: N=1 founder-as-instance + the [cartography prototype](../discovery/cartography-prototype-clew-fit-2026-07-24.md).
**PRD:** _TODO_
**Sizing:** 1 committed functionality (+ scope _TODO_ pending OI-0078/OI-0079/OI-0081) — scoping this epic *is* the gate work.

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C5.2.F05 | DDD artefact schemas (first layer package) | ⬜ |
| _TODO_ | Enablement mechanism (`clew enable <type>` + prerequisite DAG + stub parents + declared absences) — FBS rows pending [OI-0081](#open-items) | — |
| _TODO_ | Edge-proposal review lifecycle (propose → validate/reject, ADR-0016) — FBS rows pending [OI-0081](#open-items) | — |
| _TODO_ | Cartography export (`clew export likec4`) — FBS rows pending [OI-0079](../../project-control/open-items/open-items.md) | — |

---

### E-06 · Methodology Catalogue Upkeep

**Value statement:** When this epic ships, the methodology catalogue sustains itself: skills are inventoried and validated, project templates upgrade without overwriting authored content, and bare lifecycle layers are flagged with candidate methodologies.
**Objective:** — *(catalogue upkeep serves OBJ-01 indirectly; no KR measures it, and the triggering "skill catalogue maintainer" persona is itself pending — [OI-0011](../business/04a-value-streams.md#open-items))*
**VS anchor:** [VS-1.1 · Choose Artefact Type](../business/04a-value-streams.md#vs-11--choose-artefact-type) / [VS-1.2 · Load Methodology Context](../business/04a-value-streams.md#vs-12--load-methodology-context) — Pain: **Low–Medium**
**Personas:** [P-01 Ava](../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) as consumer; maintainer persona pending
**Capabilities:** [C5.1](../business/03a-capability-map.md#c51--skill-catalogue-management) · [C5.3](../business/03a-capability-map.md#c53--artefact-template-management) · [C5.5](../business/03a-capability-map.md#c55--methodology-canon-coverage-assessment)
**Phase:** 3 — mixed surface: C5.1/C5.5 are kit-side (homemade-claude-kit repo), C5.3.F02/F03 are clew CLI (`clew upgrade-templates`); the split lands in this epic's PRD.
**PRD:** _TODO_
**Sizing:** 6 functionalities — within range.

**FBS scope:**

| ID | Functionality | Status |
|---|---|---|
| C5.1.F02 | Skill inventory listing | ⬜ |
| C5.1.F03 | Skill definition validation | ⬜ |
| C5.3.F02 | Template validation | ⬜ |
| C5.3.F03 | Template version upgrade (`clew upgrade-templates`) | ⬜ |
| C5.5.F01 | Lifecycle-layer coverage report | ⬜ |
| C5.5.F02 | Coverage-gap flagging | ⬜ |

---

## Descoped rows (no epic, by design)

Per [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) and the [FBS §Scope discipline](../product-specs/07a-fbs.md#scope-discipline-adr-0013): **C4.3.F01–F04** (audit trail — delegated to git on `snapshot/`; `clew log`/`clew history` resolve to git) · **C4.4.F01–F03** (schema migration — hand-rolled `PRAGMA user_version` path for v1, framework deferred per [ADR-0012](../architecture/decisions/adr-0012-schema-migration-framework.md)) · **C3.2.F04** (`clew estimate` — cut; delivery accounting contradicts VISION). These rows keep their IDs in the FBS and re-enter epic planning only via a superseding ADR.

---

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0081 | doc-gap | E-05's non-schema scope has no BC-map or FBS rows: the enablement mechanism (`clew enable <type>`, prerequisite DAG, stub parents, declared absences per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md)) and the edge-proposal review lifecycle (propose → validate/reject per [ADR-0016](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)) exist only as ADR content, so the epic cannot be sized or PRD'd. Companion to [OI-0079](../../project-control/open-items/open-items.md) (cartography export gap) and sequenced with [OI-0078](../../project-control/open-items/open-items.md) (registry `package`/`requires` fields). | #e-05--opt-in-layer-packages | E-05 · Opt-in Layer Packages | Extend `03a-capability-map.md` (new L1s or grow C5.2/C4.1) then mirror new C-N.M.FXX rows in `07a-fbs.md` via the FBS maintenance rule (BC Map first); backfill E-05's FBS scope table. Do at Phase-2 gate time, not before (ADR-0015 sequencing). | medium | open | Victor Hueni | 2026-09-30 | _TBD_ |

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-24 | Initial generation via `plan-delivery-roadmap`. Six epics minted (E-01–E-06) covering all 45 in-scope backlog FBS rows (+ 5 kit-shipped, 7 ADR-0013-descoped, 1 cut = 58 accounted). Walking skeleton (v0.1) defined as a thin horizontal cut across E-01/E-02/E-03 validating VS-1 end-to-end with VS-2/VS-3 thin slices. Phase plan: MVP → Phase 1 (v1.0, OKR measurement point) → Phase 2 (wave-2-gated: E-04 guard + E-05 layer packages) → Phase 3 (E-06 catalogue upkeep). E-01 = PRD-0001 target. OI-0081 filed (E-05 enablement/proposal functionalities absent from BC map/FBS). Objective × Epic matrix backfilled in [04b-objectives.md](../business/04b-objectives.md) in the same pass. | Victor Hueni |
