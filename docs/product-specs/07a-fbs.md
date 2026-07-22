---
title: clew — Functional Breakdown Structure
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-05-25 -->

# clew — Functional Breakdown Structure

This document is the functionality registry for clew: a canonical, status-tracked enumeration of what the product does, organised by the capabilities defined in the [Business Capability Map](../business/03a-capability-map.md). Each capability groups the functionalities that realise it; each functionality has a stable ID, a status (✅ Shipped / 🔄 Planned / ⬜ Backlog), and a soft-link to the value-stream stage it primarily supports.

> **Methodology:** built using the canonical synthesis of [BABOK §10.22 Functional Decomposition + NASA FBS doctrine + TOGAF Business Architecture + practitioner guidance](https://github.com/VictorHueni/homemade-claude-kit/tree/main/spec-functional-breakdown-structure/references/methodology-references.md). The full bibliography lives with the [spec-functional-breakdown-structure skill](https://github.com/VictorHueni/homemade-claude-kit/tree/main/spec-functional-breakdown-structure) — single source of truth across every project.

**Scope discipline:**
- FBS is the **functionality registry** — what the product does, status-tracked.
- FBS does NOT define capabilities — see the [BC Map](../business/03a-capability-map.md).
- FBS does NOT contain feature specs / acceptance criteria — see PRDs.
- FBS does NOT contain roadmap timelines / dates / milestones — see the roadmap doc.
- FBS does NOT contain operational metrics / cycle times — see process docs.

**Companion documents:**
- Business Capability Map: [`docs/business/03a-capability-map.md`](../business/03a-capability-map.md)
- Personas: [`docs/business/01a-personas.md`](../business/01a-personas.md)
- Value Streams: [`docs/business/04a-value-streams.md`](../business/04a-value-streams.md)
- Business Objectives: [`docs/business/04b-objectives.md`](../business/04b-objectives.md)
- Lean Canvas: [`docs/business/02a-lean-canvas.md`](../business/02a-lean-canvas.md)

---

## Status legend

| Symbol | Meaning |
|---|---|
| ✅ | **Shipped** — functional in production |
| 🔄 | **Planned** — committed in an active PRD or execution plan |
| ⬜ | **Backlog** — identified, not yet committed |
| ★ | **Differentiator** — anchors its own epic; drives Reliability QA targets |

---

## L0 axis declaration

**Chosen axis:** capability domain / theme *(inherited from BC Map)*

**Rationale:** clew is a single product with one persona (P-01) and no multi-product family; organising by capability domain produces five natural clusters (Authoring, Persistence, Querying and Traceability, Integrity and Audit, Methodology Distillation) drawn directly from VISION, ADR-0001, ADR-0002, and the wave-1 synthesis.

**L0 items:**
- **C1** — Authoring
- **C2** — Persistence
- **C3** — Querying and Traceability
- **C4** — Integrity and Audit
- **C5** — Methodology Distillation

---

## Global overview

```
clew
│
├── C1 · Authoring
│   ├── C1.1 · Methodology-mediated artefact creation  (functionalities: 3 ✅ · 0 🔄 · 0 ⬜)
│   └── C1.2 · Selective context loading  ★Diff       (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│
├── C2 · Persistence
│   ├── C2.1 · Stable identifier generation            (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│   ├── C2.2 · Schema enforcement                      (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│   ├── C2.3 · File binding management                 (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│   └── C2.4 · Deterministic structural export         (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│
├── C3 · Querying and Traceability
│   ├── C3.1 · Ad-hoc cross-artefact query surface     (functionalities: 0 ✅ · 0 🔄 · 3 ⬜)
│   └── C3.2 · Pre-built traceability views            (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│
├── C4 · Integrity and Audit
│   ├── C4.1 · Write-time reference validation         (functionalities: 0 ✅ · 0 🔄 · 3 ⬜)
│   ├── C4.2 · Drift detection                         (functionalities: 0 ✅ · 0 🔄 · 3 ⬜)
│   ├── C4.3 · Audit trail                             (functionalities: 0 ✅ · 0 🔄 · 4 ⬜)
│   └── C4.4 · Schema migration                        (functionalities: 0 ✅ · 0 🔄 · 3 ⬜)
│
└── C5 · Methodology Distillation
    ├── C5.1 · Skill catalogue management              (functionalities: 1 ✅ · 0 🔄 · 2 ⬜)
    ├── C5.2 · Per-methodology pattern encoding        (functionalities: 0 ✅ · 0 🔄 · 5 ⬜)
    ├── C5.3 · Artefact template management            (functionalities: 1 ✅ · 0 🔄 · 2 ⬜)
    ├── C5.4 · Cross-methodology referencing           (functionalities: 0 ✅ · 0 🔄 · 2 ⬜)
    └── C5.5 · Methodology canon coverage assessment   (functionalities: 0 ✅ · 0 🔄 · 2 ⬜)
```

**Total:** 57 functionalities · 5 ✅ shipped · 0 🔄 planned · 52 ⬜ backlog. The 5 shipped functionalities are realised by [`homemade-claude-kit`](https://github.com/VictorHueni/homemade-claude-kit) — no clew CLI code required for them. The remaining ⬜ are the clew CLI build surface.

## Scope discipline (ADR-0013)

[ADR-0013 (minimal-model / perfect-sync, not repo-native EA)](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) descopes and re-weights part of this registry. IDs are never recycled, so affected functionalities are annotated in place rather than deleted:

- **Cut — C3.2.F04 (`clew estimate epic`).** Delivery accounting; contradicts VISION ("not a PM tool"). Removed from the build surface, along with the `complexity` property and `clew set complexity`.
- **Delegated to git — C4.3 Audit trail (F01–F04).** Git on `snapshot/` provides durable who/when/before-after; the DB is gitignored, so a DB-resident audit is non-durable across rebuild. Descoped as clew CLI features.
- **Deferred — C4.4 Schema migration (F01–F03).** Hand-rolled `PRAGMA user_version` for v1; no framework ([ADR-0012](../architecture/decisions/adr-0012-schema-migration-framework.md)/0013).
- **Grown — C1.2 Selective context loading (now Differentiator).** The read-side wedge: `clew context <task>` (F01/F02) is first-class, and **C1.2.F04 `clew guard` (planned)** is added — the change-guardrail, shipped only after the graph is dense + drift-free.
- **Kit scope — C5.** Realised by homemade-claude-kit (BC-02), outside the clew CLI build surface.

*Net functionality count is unchanged at 57 (one added: C1.2.F04 `clew guard`; one cut: C3.2.F04 `clew estimate`).*

**Walking skeleton — the minimal-model / perfect-sync proof.** The v1 slice that proves the category is deliberately small: `init` → **C2.1** ID generation → **C2.2** schema validation → **C2.3** file binding → **C4.1** write-time reference validation → **C3.1** `list` + **C3.2.F01/F02/F03** matrix/trace/impact → **C4.2** `check` → **C2.4** export/import. Nothing in C4.3/C4.4 or the cut estimate view is needed to demonstrate *"when an agent changes the product, clew can tell whether it still respects intent."*

---

## C1 · Authoring

Capabilities that mediate the act of creating metamodel artefacts. The operator (or the agent on their behalf) does authoring; clew makes the authoring structured.

> **Implementation note — C1.1:** [`homemade-claude-kit`](https://github.com/VictorHueni/homemade-claude-kit) is the full implementation of C1.1. The skill invocation pattern (`rules/metamodel.md` trigger words), per-skill `SKILL.md` authoring instructions, embedded `references/template.md` scaffolds, and `rules/artefact-frontmatter.md` schema rules collectively realise every C1.1 functionality. No clew CLI component is needed here. C1.2 (selective context loading) still requires clew-side implementation.

---

### C1.1 · Methodology-mediated artefact creation

Distils external methodology into an authoring discipline the agent invokes at write time.

**BC Map:** [C1.1 in `03a-capability-map.md`](../business/03a-capability-map.md#c11--methodology-mediated-artefact-creation)
**Backend:** [`homemade-claude-kit`](https://github.com/VictorHueni/homemade-claude-kit) — `rules/metamodel.md` (skill trigger words + invocation pattern) · per-skill `SKILL.md` (per-section authoring instructions) · `references/template.md` (embedded scaffolds) · `rules/artefact-frontmatter.md` (schema rules). No clew CLI component.
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C1.1.F01 | ★ Skill selection — identify and propose the matching kit skill for the requested artefact type | ✅ | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) |
| C1.1.F02 | Template scaffolding — generate a new artefact file from the canonical template with metadata and section stubs | ✅ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |
| C1.1.F03 | Schema-aware fill guidance — surface per-field authoring instructions at draft time so the agent fills the right content in the right section | ✅ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |

---

### C1.2 · Selective context loading

Loads exactly the metamodel slice relevant to the current task into the agent session — clew's **read-side differentiator** (elevated to Differentiator 2026-07-07, [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)). This is where "the metamodel becomes the agent's memory" pays off, and where the competition (requirements/spec tools) is weakest. Surfaced as `clew context <task>` and, once the graph is trustworthy, `clew guard`.

**BC Map:** [C1.2 in `03a-capability-map.md`](../business/03a-capability-map.md#c12--selective-context-loading)
**Backend:** `_TODO_` (expected: `clew/context/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C1.2.F01 | ★ Task-scoped slice assembly — load exactly the artefact subset relevant to a task type (e.g. VISION+BMC for orientation, glossary+domain model for PRD authoring, QA attributes for test design) | ⬜ | [VS-1.2](../business/04a-value-streams.md#vs-12--load-methodology-context) |
| C1.2.F02 | Slice composition preview — expose the artefact list and size estimate for a proposed context slice before loading | ⬜ | [VS-1.2](../business/04a-value-streams.md#vs-12--load-methodology-context) |
| C1.2.F03 | Multi-project context isolation — prevent artefacts from one project leaking into another project's loaded context | ⬜ | [VS-1.2](../business/04a-value-streams.md#vs-12--load-methodology-context) |
| C1.2.F04 | ★ Change-guardrail (`clew guard "<change>"`) — given a proposed change, return what it may touch, what it must preserve, and which artefacts must be updated first. **Planned; ships only once the graph is dense + drift-free** — guarding a sparse or stale graph produces confidently-wrong guardrails, worse than none (ADR-0013). | ⬜ | [VS-3.2](../business/04a-value-streams.md#vs-32--preview-downstream-impact) |

---

## C2 · Persistence

Capabilities that store and retrieve structured artefacts deterministically. The artefact store is canonical; the documentation layer is narrative; the snapshot is the deterministic, git-tracked structural export. Per [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md).

---

### C2.1 · Stable identifier generation

Provides deterministic, collision-free identifier assignment for every artefact, generated by the system rather than the agent.

**BC Map:** [C2.1 in `03a-capability-map.md`](../business/03a-capability-map.md#c21--stable-identifier-generation)
**Backend:** `_TODO_` (expected: `clew/db/` or `clew/persistence/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C2.1.F01 | ★ Project initialisation (`clew init`) — bootstrap the project artefact store, initialise identifier sequences for all artefact types, and create the snapshot folder | ⬜ | — |
| C2.1.F02 | ★ Sequential ID assignment — generate the next ID in series for each artefact type (P-NN, C-N.M, VS-N.M, E-NN, etc.) from a system-managed sequence on every `clew new` call | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.1.F03 | LLM-ID rejection — reject any write that supplies an externally generated identifier instead of one issued by the system | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.1.F04 | Cross-project ID namespacing — guarantee ID uniqueness within a project scope; two sibling projects may both have P-01 without collision | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |

---

### C2.2 · Schema enforcement

Provides write-time validation that each new or updated artefact conforms to the typed metamodel.

**BC Map:** [C2.2 in `03a-capability-map.md`](../business/03a-capability-map.md#c22--schema-enforcement)
**Backend:** `_TODO_`
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C2.2.F01 | ★ Required-field validation — reject a write where a required metamodel field is absent or null | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.2.F02 | Type validation — reject a write where a field value does not conform to its declared type | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.2.F03 | Constrained-value validation — reject a write where a field with a fixed value set contains a value outside its declared set | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.2.F04 | Actionable violation message — emit a structured error on schema violation naming the field, the rule broken, and the acceptable values | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |

---

### C2.3 · File binding management

Maintains the mapping between each persisted artefact and its location in the documentation layer. Per [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md).

**BC Map:** [C2.3 in `03a-capability-map.md`](../business/03a-capability-map.md#c23--file-binding-management)
**Backend:** `_TODO_`
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C2.3.F01 | ★ Location recording — record the precise location of each persisted artefact in the documentation layer at write time | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.3.F02 | Fingerprint tracking — record a content fingerprint of each managed artefact section to detect out-of-band hand-edits | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.3.F03 | Layout-rule enforcement — reject a write that would place an artefact in a location not matching the canonical layout rule for that artefact type | ⬜ | [VS-3.3](../business/04a-value-streams.md#vs-33--execute-change-with-integrity) |
| C2.3.F04 | `clew where` — resolve any artefact ID to its location in the documentation layer on demand | ⬜ | [VS-2.3](../business/04a-value-streams.md#vs-23--surface-provenance) |

---

### C2.4 · Deterministic structural export

Produces a deterministic, git-trackable serialisation of the artefact store state such that the same state always produces bit-identical output.

**BC Map:** [C2.4 in `03a-capability-map.md`](../business/03a-capability-map.md#c24--deterministic-structural-export)
**Backend:** `_TODO_` (expected: `clew/export/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C2.4.F01 | ★ Snapshot export (`clew export`) — write all artefacts to versioned, git-tracked snapshot files organised by artefact type | ⬜ | [VS-4.1](../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current) |
| C2.4.F02 | Bit-identical determinism — guarantee the same artefact store state produces identical snapshot output across runs and across machines | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C2.4.F03 | Rebuild from snapshot (`clew import`) — reconstruct the full artefact store from snapshot files to bootstrap a new environment or recover from data loss | ⬜ | [VS-4.2](../business/04a-value-streams.md#vs-42--materialise-self-contained-views) |
| C2.4.F04 | Incremental snapshot update — re-export only the artefact types touched by the last write, not the full store, to keep export time minimal | ⬜ | [VS-3.3](../business/04a-value-streams.md#vs-33--execute-change-with-integrity) |

---

## C3 · Querying and Traceability

Capabilities for navigating the relationships between artefacts. Pre-built views deliver canonical traceability deterministically; the ad-hoc surface supports everything else.

---

### C3.1 · Ad-hoc cross-artefact query surface

Enables arbitrary cross-artefact questions answerable in seconds from inside an agent session.

**BC Map:** [C3.1 in `03a-capability-map.md`](../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface)
**Backend:** `_TODO_` (expected: `clew/query/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C3.1.F01 | Ad-hoc query execution (`clew query`) — execute an ad-hoc structured query against the persisted metamodel and return typed, tabular results | ⬜ | [VS-2.2](../business/04a-value-streams.md#vs-22--resolve-from-canonical-source) |
| C3.1.F02 | `clew list <type>` — enumerate all artefacts of a given type with their IDs, names, and status | ⬜ | [VS-2.1](../business/04a-value-streams.md#vs-21--scope-the-question) |
| C3.1.F03 | Natural-language question routing — accept "which X serves Y?"-style questions and translate them to structured queries without requiring the caller to compose queries | ⬜ | [VS-2.1](../business/04a-value-streams.md#vs-21--scope-the-question) |

---

### C3.2 · Pre-built traceability views

Provides canonical, named views over the artefact graph that anyone can run deterministically without composing queries.

**BC Map:** [C3.2 in `03a-capability-map.md`](../business/03a-capability-map.md#c32--pre-built-traceability-views)
**Backend:** `_TODO_` (expected: `clew/views/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C3.2.F01 | ★ Traceability matrix (`clew matrix`) — render the full cross-artefact relationship matrix (persona × capability × VS stage × FBS × epic) deterministically on demand | ⬜ | [VS-2.2](../business/04a-value-streams.md#vs-22--resolve-from-canonical-source) |
| C3.2.F02 | ★ Lineage view (`clew trace <ID>`) — show the full upstream lineage of any artefact: what personas, capabilities, and value-stream stages trace to it | ⬜ | [VS-2.2](../business/04a-value-streams.md#vs-22--resolve-from-canonical-source) |
| C3.2.F03 | ★ Impact-analysis view (`clew impact <ID>`) — show every artefact that references a given ID and would be affected by a change to it | ⬜ | [VS-3.2](../business/04a-value-streams.md#vs-32--preview-downstream-impact) |
| C3.2.F04 | ~~Effort-rollup view (`clew estimate epic <E-NN>`)~~ — **CUT (ADR-0013): delivery accounting, out of scope** (VISION: not a PM tool). Row kept for ID history; not a build target. The `complexity` property and `clew set complexity` are removed with it. | ⬜ *(cut)* | — |

---

## C4 · Integrity and Audit

Capabilities for detecting and preventing drift between intended and actual state. Write-time enforcement is the headline; drift detection and audit replay are the safety nets.

---

### C4.1 · Write-time reference validation

Rejects writes that would introduce broken references at the moment they are attempted.

**BC Map:** [C4.1 in `03a-capability-map.md`](../business/03a-capability-map.md#c41--write-time-reference-validation)
**Backend:** `_TODO_` (expected: `clew/integrity/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C4.1.F01 | ★ Reference existence check — verify all referenced artefacts exist before accepting any write | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C4.1.F02 | ★ Reference-integrity on retire — reject a retire or delete that would leave dangling references in other artefacts; surface the full referencing set | ⬜ | [VS-3.3](../business/04a-value-streams.md#vs-33--execute-change-with-integrity) |
| C4.1.F03 | Structured violation message — emit a clear error on rejection naming the broken reference, the artefact that owns it, and the path to resolution | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |

---

### C4.2 · Drift detection

Detects discrepancies between the artefact store and the documentation layer.

**BC Map:** [C4.2 in `03a-capability-map.md`](../business/03a-capability-map.md#c42--drift-detection)
**Backend:** `_TODO_`
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C4.2.F01 | ★ Drift scan (`clew check`) — compare recorded artefact fingerprints against the current documentation layer and report every mismatch with location detail | ⬜ | [VS-2.4](../business/04a-value-streams.md#vs-24--validate-against-current-state) |
| C4.2.F02 | Orphan section detection — surface documentation sections that reference identifiers the system does not recognise (content added outside the CLI) | ⬜ | [VS-3.4](../business/04a-value-streams.md#vs-34--confirm-no-drift) |
| C4.2.F03 | Orphan record detection — surface registered artefacts that have no corresponding documentation section (entries without narrative) | ⬜ | [VS-4.1](../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current) |

---

### C4.3 · Audit trail

Records every write to the artefact store with timestamp, actor, and before/after state, replayable in chronological order.

> **Descoped for v1 (ADR-0013): delegated to git.** Git on the `snapshot/` directory already provides a durable, replayable who/when/before-after history. The DB is gitignored and rebuilt from the snapshot, so a DB-resident audit trail is non-durable anyway. F01–F04 below are retained for history but are **not** clew CLI build targets in v1; `clew log` / `clew history` resolve to git.

**BC Map:** [C4.3 in `03a-capability-map.md`](../business/03a-capability-map.md#c43--audit-trail)
**Backend:** `_TODO_` (expected: `clew/audit/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C4.3.F01 | Write-event logging — record every structural change (create, update, delete) with timestamp, actor identity, before-state, and after-state | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C4.3.F02 | `clew log` — display the chronological audit trail for a given artefact or for the full artefact history, with rationale annotations where present | ⬜ | [VS-2.3](../business/04a-value-streams.md#vs-23--surface-provenance) |
| C4.3.F03 | Change-set atomicity logging — record a multi-artefact refactor as a single linked event so the full change-set is replayable or reversible as a unit | ⬜ | [VS-3.3](../business/04a-value-streams.md#vs-33--execute-change-with-integrity) |
| C4.3.F04 | `clew history <ID>` — display the full chronological event log scoped to a single artefact, showing every change in order | ⬜ | [VS-2.3](../business/04a-value-streams.md#vs-23--surface-provenance) |

---

### C4.4 · Schema migration

Manages forward-compatible evolution of the metamodel schema across clew versions.

> **Deferred for v1 (ADR-0013).** The 4-table no-DDL schema ([ADR-0003](../architecture/decisions/adr-0003-schema-design-typed-property-graph.md)) makes core-schema change rare; v1 uses a hand-rolled `PRAGMA user_version` + numbered-step path, not a framework. The Alembic + SQLAlchemy adoption ([ADR-0012](../architecture/decisions/adr-0012-schema-migration-framework.md)) is deferred until the spine actually churns or the v3 Postgres port. F01–F03 below describe the eventual mechanism, not a v1 build target.

**BC Map:** [C4.4 in `03a-capability-map.md`](../business/03a-capability-map.md#c44--schema-migration)
**Backend:** `_TODO_` (expected: `clew/migrations/`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C4.4.F01 | Forward migration application — apply a versioned migration step to evolve the metamodel schema; skip already-applied versions | ⬜ | — |
| C4.4.F02 | Migration version tracking — record applied migration versions in a system-managed registry to prevent double-application | ⬜ | — |
| C4.4.F03 | One-step rollback — reverse the most recently applied migration on failure; log the rollback event in the audit trail | ⬜ | — |

---

## C5 · Methodology Distillation

Capabilities that encode external bodies of practice (BIZBOK, BABOK, Strategyzer, Sommerville; planned DDD, ATDD/BDD, SRE) as authoring discipline, sustained as a compounding catalogue.

> **Implementation note:** [`homemade-claude-kit`](https://github.com/VictorHueni/homemade-claude-kit) is the implementation substrate for the *authoring* side of C5. The kit skills, embedded templates, and schema-aware rules encode each methodology as an authoring discipline agents can invoke without any clew CLI. C5.2 functionalities below represent the *persistence* side — encoding methodologies as typed DB tables — which still requires clew CLI work. C5.1.F01 and C5.3.F01 are already shipped via the kit.

---

### C5.1 · Skill catalogue management

Maintains the lifecycle of homemade-claude-kit skills: authoring, versioning, distribution, deprecation.

**BC Map:** [C5.1 in `03a-capability-map.md`](../business/03a-capability-map.md#c51--skill-catalogue-management)
**Backend:** N/A (homemade-claude-kit repo; `install.sh`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C5.1.F01 | ★ Kit install and update — distribute all kit skills to the local agent environment and keep them current whenever the kit is updated | ✅ | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) |
| C5.1.F02 | Skill inventory listing — list all available skills with name, version, status, and last review date | ⬜ | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) |
| C5.1.F03 | Skill definition validation — verify a skill definition conforms to kit naming conventions, required metadata fields, and category classification rules | ⬜ | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) |

---

### C5.2 · Per-methodology pattern encoding

Translates each external body of practice into a structured authoring pattern: template, fields, validation rules, cross-artefact relationships.

**BC Map:** [C5.2 in `03a-capability-map.md`](../business/03a-capability-map.md#c52--per-methodology-pattern-encoding)
**Backend:** `_TODO_` (expected: `clew/db/schema/` per methodology)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C5.2.F01 | ★ BIZBOK artefact schemas — register persona, capability map, value stream, business process, BMC, and business objective in the metamodel so the system enforces their structure and typed relationships at write time | ⬜ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |
| C5.2.F02 | ★ BABOK artefact schemas — register FBS functionalities (C-N.M.FXX) and quality attributes (QA-XXNN) in the metamodel so the system enforces their structure and identifier conventions at write time | ⬜ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |
| C5.2.F03 | Strategyzer artefact schemas — register Lean Canvas and BMC blocks in the metamodel with typed links to their corresponding persona segment | ⬜ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |
| C5.2.F04 | Sommerville artefact schemas — register PRDs (PRD-NNNN) and implementation plans (Plan-NNNN) in the metamodel with typed links to their governing epics and quality attributes | ⬜ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |
| C5.2.F05 | DDD artefact schemas (planned) — register bounded context, glossary term, aggregate, entity, value object, and domain event in the metamodel under a bounded-context namespace | ⬜ | [VS-1.3](../business/04a-value-streams.md#vs-13--draft-artefact-content) |

---

### C5.3 · Artefact template management

Maintains the canonical template for each artefact type.

**BC Map:** [C5.3 in `03a-capability-map.md`](../business/03a-capability-map.md#c53--artefact-template-management)
**Backend:** N/A (kit-side templates in `homemade-claude-kit/<skill>/references/template.md`)
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C5.3.F01 | Template-per-type shipping — ship a canonical template for each artefact type (required metadata, sections, and authoring instructions) as part of its kit skill | ✅ | [VS-1.1](../business/04a-value-streams.md#vs-11--choose-artefact-type) |
| C5.3.F02 | Template validation — validate a project artefact file against the canonical template for its type: required sections present, metadata fields complete | ⬜ | [VS-1.2](../business/04a-value-streams.md#vs-12--load-methodology-context) |
| C5.3.F03 | Template version upgrade (`clew upgrade-templates`) — update a project's canonical template references to the latest kit version without overwriting authored content | ⬜ | [VS-1.2](../business/04a-value-streams.md#vs-12--load-methodology-context) |

---

### C5.4 · Cross-methodology referencing

Enables an artefact in one methodology to reference an artefact in another by stable ID, with type-aware validation.

**BC Map:** [C5.4 in `03a-capability-map.md`](../business/03a-capability-map.md#c54--cross-methodology-referencing)
**Backend:** `_TODO_`
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C5.4.F01 | Cross-type reference validation — validate that a cross-methodology reference resolves to the correct artefact type (a persona reference must point at a persona; a capability reference at a capability; type mismatch rejected at write time) | ⬜ | [VS-1.4](../business/04a-value-streams.md#vs-14--persist-with-stable-id) |
| C5.4.F02 | Cross-methodology link resolution — resolve a reference from any artefact type to any other artefact type by stable ID in a single lookup across the full metamodel | ⬜ | [VS-3.3](../business/04a-value-streams.md#vs-33--execute-change-with-integrity) |

---

### C5.5 · Methodology canon coverage assessment

Audits which methodologies are encoded vs. which lifecycle layers are bare.

**BC Map:** [C5.5 in `03a-capability-map.md`](../business/03a-capability-map.md#c55--methodology-canon-coverage-assessment)
**Backend:** `_TODO_`
**Frontend:** N/A

| ID | Functionality | Status | VS stage |
|---|---|---|---|
| C5.5.F01 | Lifecycle-layer coverage report — report which lifecycle layers (business architecture / market intelligence / product / domain / QA / ops) have at least one encoded methodology skill | ⬜ | — |
| C5.5.F02 | Coverage-gap flagging — flag layers with no methodology skill and surface candidate methodologies from the literature (DDD for domain, ATDD/BDD for QA, SRE for ops) | ⬜ | — |

---

## Maintenance notes

- **Add a functionality:** insert a new row in the relevant capability table with the next ID in sequence (e.g., if last row is `C1.1.F03`, new row is `C1.1.F04`). Status starts as `⬜`. IDs are never reused or recycled — retired functionalities keep their row with a changelog note.
- **Promote status:** `⬜ → 🔄` when a PRD commits the work; `🔄 → ✅` when the PRD ships. Update the capability's functionality count in the ASCII tree at the top.
- **Retire a functionality:** mark status as `⬜` (revert from 🔄) and add a changelog entry. Don't delete the row — keep history.
- **Add a capability:** don't — add it to the BC Map first, then run the `spec-functional-breakdown-structure` skill in structure mode to import it.
- **Reorganise L0:** don't — change the BC Map's L0 axis first, then regenerate the FBS structure.

---

## Open Items

None at present. *(Functionality-level status is tracked via the ⬜/🔄/✅ column in each capability table above, not as OI rows. Capability-level structural questions live in [`docs/business/03a-capability-map.md` §Open Items](../business/03a-capability-map.md#open-items); delivery sequencing will land in `docs/product-specs/08a-delivery-roadmap.md` once written.)*

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-07 | Scope discipline (ADR-0013) applied. Added §Scope discipline + Walking skeleton. C3.2.F04 (`clew estimate`) **cut** (delivery accounting, out of scope). C4.3 (Audit) delegated to git; C4.4 (Migration) deferred to a hand-rolled v1 path — both retained for history, not build targets. C1.2 elevated to Differentiator (★) and grown with **C1.2.F04 `clew guard`** (planned read-side change-guardrail). Net count unchanged at 57 (one added, one cut). The `complexity` property + `clew set complexity` removed with the estimate cut. | Victor Hueni |
| 2026-05-25 | C1.3 (External evidence integration) retired as a capability. Rationale: citation discipline is a kit methodology concern embedded in `rules/writing-citations.md` and the evidence-production skills (arch-research, business-competitive-landscape, business-quantitative-model, business-research, com-slide-deck). F01 (evidence reference recording), F02 (reference reachability check), and F03 (reference archiving) all removed — none require a clew DB field or CLI command. Total: 60 → 57 functionalities · 55 → 52 ⬜ backlog. C1 now has 2 L1 capabilities (C1.1, C1.2). | Victor Hueni |
| 2026-05-25 | C3.3 (Bidirectional time traceability) retired as a capability. F01 (rationale recording) and F02 (planned-state tagging) removed — both covered by artefact content and kit methodology; no dedicated clew feature needed. F03 (`clew history <ID>`) relocated to C4.3 as C4.3.F04 — conceptually an audit query, not a traceability view. C3 now has 2 L1 capabilities (C3.1, C3.2). Total: 60 functionalities · 5 ✅ · 55 ⬜. | Victor Hueni |
| 2026-05-25 | Technology-stack language removed from all functionality descriptions. Terms replaced: DB → artefact store · markdown layer → documentation layer · YAML / SQL / SHA / Wayback Machine / chezmoi / `~/.claude/skills/` / FK / DB sequence / byte-identical YAML / DuckDB SQL → technology-agnostic equivalents throughout C1–C5. Section sub-headings (C2.3 · C2.4 · C4.2 · C4.3 · C5.3) updated to match. `C5.2.F01–F05` reframed from "encode as typed DB tables with FK relationships" to "register in the metamodel so the system enforces structure at write time." No status changes; no ID changes. | Victor Hueni |
| 2026-05-25 | Kit-realised functionalities marked ✅. C1.1.F01/F02/F03, C5.1.F01, C5.3.F01 promoted from ⬜ to ✅ — all realised by [`homemade-claude-kit`](https://github.com/VictorHueni/homemade-claude-kit) (skill invocation pattern, embedded templates, schema-aware rules). C1.1 backend annotation updated from `_TODO_` to the kit. Implementation notes added to §C1 Authoring and §C5 Methodology Distillation section headers to distinguish authoring-side (kit) from persistence-side (clew CLI TODO). Total: 5 ✅ shipped · 57 ⬜ backlog. | Victor Hueni |
| 2026-05-25 | Initial scaffold + structure + full fill in one pass. All 5 L0 / 19 L1 capabilities imported from [`03a-capability-map.md`](../business/03a-capability-map.md). 62 functionalities enumerated across all capabilities; all ⬜ Backlog (pre-implementation). 16 functionalities marked ★ Differentiator based on capability Strategic Importance ratings in the BC Map (C1.1.F01, C1.2.F01, C2.1.F01, C2.1.F02, C2.2.F01, C2.3.F01, C2.4.F01, C3.2.F01, C3.2.F02, C3.2.F03, C4.1.F01, C4.1.F02, C4.2.F01, C5.1.F01, C5.2.F01, C5.2.F02). VS-stage soft-links wired to all 4 filled value streams in [`04a-value-streams.md`](../business/04a-value-streams.md); C4.4 and C5.5 functionalities carry `—` (internal maintenance, no user-facing VS). | Victor Hueni |
