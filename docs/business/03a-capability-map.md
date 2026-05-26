---
title: Business Capability Map
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

<!-- doc-version: 1.0 | created: 2026-05-24 | l0_axis: capability-domain -->

# clew · Business Capability Map

This document is clew's strategic "what" layer. It answers one question: *what does clew actually do?*, expressed as a stable hierarchy of capabilities independent of the technology, organisation, or processes that realise them.

**Hard scope rule.** This map stops at L0 + L1. Features, functionalities, user stories, and code-organisation hints do **not** belong here; they live in the FBS (Functional Breakdown Structure) once it exists. If a row reads "the system shall…" or names a backend module, it has crossed into FBS territory.

**Methodology and bibliography:** see the [`business-capability-map` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-capability-map). The skill composes TOGAF G189, Cutter Rosetta Stone, SAP Business Architecture, BABOK, Cesar Gonzalez (naming), and Miller (sizing).

**Companion docs (existing):**
- [`docs/VISION.md`](../VISION.md): north star this map operationalises.
- [`docs/business/01a-personas.md`](01a-personas.md): P-01 Ava, the only segment.
- [`docs/business/02a-lean-canvas.md`](02a-lean-canvas.md): the value proposition + unfair advantage these capabilities back.
- [`docs/business/04b-objectives.md`](04b-objectives.md): the KRs each capability serves.
- [`docs/architecture/decisions/adr-0001-metamodel-persistence-layer.md`](../architecture/decisions/adr-0001-metamodel-persistence-layer.md), [`docs/architecture/decisions/adr-0002-artefact-file-binding.md`](../architecture/decisions/adr-0002-artefact-file-binding.md): architecture decisions these capabilities realise.

**Companion docs (not yet existing, soft-links left blank):** value streams, processes, FBS, domain model, quantitative models.

## §L0 axis declaration

**Axis chosen:** capability domain / theme (TOGAF-classic).

**Rationale:** clew is a single product, has one persona (P-01) and no value-streams artefact yet, so product-axis collapses to one item and value-stream-axis is premature. Lifecycle-layer was the alternative but conflates *scope* with *capabilities*. Capability domain produces five natural domains (Authoring, Persistence, Querying + Traceability, Integrity + Audit, Methodology Distillation) drawn directly from VISION, ADR-0001, ADR-0002, and the [wave-1 synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md).

## §Global overview

```
clew
├── C1 · Authoring
│   ├── C1.1 Methodology-mediated artefact creation
│   └── C1.2 Selective context loading
├── C2 · Persistence
│   ├── C2.1 Stable identifier generation
│   ├── C2.2 Schema enforcement
│   ├── C2.3 File binding management
│   └── C2.4 Deterministic structural export
├── C3 · Querying and Traceability
│   ├── C3.1 Ad-hoc cross-artefact query surface
│   └── C3.2 Pre-built traceability views
├── C4 · Integrity and Audit
│   ├── C4.1 Write-time reference validation
│   ├── C4.2 Drift detection
│   ├── C4.3 Audit trail
│   └── C4.4 Schema migration
└── C5 · Methodology Distillation
    ├── C5.1 Skill catalogue management
    ├── C5.2 Per-methodology pattern encoding
    ├── C5.3 Artefact template management
    ├── C5.4 Cross-methodology referencing
    └── C5.5 Methodology canon coverage assessment
```

5 L0, 17 L1. Within TOGAF + Cutter sizing (3 to 8 L0; ≤ 25 L1 total).

## §Capability index

| ID | Name | L0 parent | Strategic Importance | One-line definition |
|---|---|---|---|---|
| C1 | Authoring | (root) | (composite) | Capabilities that mediate the act of creating metamodel artefacts. |
| C1.1 | Methodology-mediated artefact creation | C1 | **Differentiator** | Distills external methodology (BIZBOK, BABOK, Strategyzer, Sommerville, planned DDD / ATDD / BDD / SRE) into an authoring discipline the agent invokes at write time. |
| C1.2 | Selective context loading | C1 | Necessary | Loads exactly the metamodel slice relevant to the current task into the agent session. |
| C2 | Persistence | (root) | (composite) | Capabilities that store and retrieve structured artefacts deterministically. |
| C2.1 | Stable identifier generation | C2 | Necessary | Deterministic, collision-free identifier assignment. Never LLM-generated. |
| C2.2 | Schema enforcement | C2 | Necessary | Write-time validation of typed metamodel constraints (required fields, types, references). |
| C2.3 | File binding management | C2 | Necessary | Maintains the mapping between each persisted artefact and its location in the markdown layer. |
| C2.4 | Deterministic structural export | C2 | Necessary | Byte-identical serialisation of DB state for git-tracked snapshots. |
| C3 | Querying and Traceability | (root) | (composite) | Capabilities for navigating the relationships between artefacts. |
| C3.1 | Ad-hoc cross-artefact query surface | C3 | Necessary | Arbitrary cross-artefact questions answerable in seconds from inside an agent session. |
| C3.2 | Pre-built traceability views | C3 | **Differentiator** | Canonical, named views (the traceability matrix, lineage, impact analysis) that anyone can run deterministically. |
| C4 | Integrity and Audit | (root) | (composite) | Capabilities for detecting and preventing drift between intended and actual state. |
| C4.1 | Write-time reference validation | C4 | **Differentiator** | Rejects writes that would introduce broken references at the moment they are attempted. |
| C4.2 | Drift detection | C4 | Necessary | Detects discrepancies between DB state and the markdown layer; reports orphans and hand-edits. |
| C4.3 | Audit trail | C4 | Commodity | Replayable record of every DB write (create, update, delete) with timestamp and actor. |
| C4.4 | Schema migration | C4 | Commodity | Forward-compatible evolution of the metamodel across clew versions. |
| C5 | Methodology Distillation | (root) | (composite) | Capabilities that encode external bodies of practice as authoring discipline, sustained as a compounding catalogue. |
| C5.1 | Skill catalogue management | C5 | **Differentiator** | Lifecycle of homemade-claude-kit skills: authoring, versioning, distribution, deprecation. |
| C5.2 | Per-methodology pattern encoding | C5 | Necessary | Translates each external body of practice into a structured authoring pattern. |
| C5.3 | Artefact template management | C5 | Necessary | Canonical templates per artefact type (frontmatter, sections, fields, authoring instructions). |
| C5.4 | Cross-methodology referencing | C5 | Necessary | Type-aware references from an artefact in one methodology to an artefact in another. |
| C5.5 | Methodology canon coverage assessment | C5 | Necessary | Audits which methodologies are encoded vs. which lifecycle layers are bare. |

**Strategic Importance distribution:** 4 Differentiators · 11 Necessary · 2 Commodity. Healthy spread per Cutter (3 to 6 true Differentiators expected).

## C1 · Authoring

Capabilities that mediate the act of creating metamodel artefacts. The operator (or the agent on their behalf) does authoring; clew makes the authoring structured.

### C1.1 · Methodology-mediated artefact creation

**Definition.** Provides the authoring discipline that turns generic LLM output into a structured artefact matching a typed metamodel slot (persona, capability, BMC block, ADR, value stream, etc.). The skill **is** the methodology distilled into a template, applied at write time, not a PDF the engineer has to remember to consult.

**Business object.** Metamodel artefact.

**Strategic importance.** **Differentiator.** This is the substrate that makes [§3 UVP Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) and [§9 Unfair Advantage](02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1) "Embedded methodology depth" meaningful rather than aspirational. A competitor must internalise four bodies of practitioner literature (BIZBOK, BABOK, Strategyzer, Sommerville; planned DDD / ATDD / BDD / SRE) before shipping a comparable substrate.

**Outcomes.**
- Each artefact has a stable schema and section discipline that the agent can fill against, deterministically across sessions.
- Authoring quality is independent of LLM session memory or operator vigilance.
- The methodology canon evolves in homemade-claude-kit, not in scattered project README files.

**Boundaries.**
- Does NOT decide which artefacts to author (that is product, persona, and value-stream design work).
- Does NOT validate factual content (that is research, e.g., the wave-1 interview).
- Does NOT generate code or UI; only structured artefacts in the metamodel.

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§3 Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement), [§4 Foundational](02a-lean-canvas.md#4-solution--confidence-assumed-solution-details-still-in-design-foundational-bullet-tested-n1), [§9 Embedded methodology depth](02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1). Wave-1 evidence: [synthesis H2](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) ("I like the fact that the skills embedded some methodology references"). Realised in streams: [VS-1.3 Draft Artefact Content](04a-value-streams.md#vs-13--draft-artefact-content) (Differentiator role), [VS-4.4 Provide Reader Orientation](04a-value-streams.md#vs-44--provide-reader-orientation) (the orientation doc is itself a methodology-mediated artefact).

### C1.2 · Selective context loading

**Definition.** Enables an agent session to receive exactly the metamodel slice relevant to the current task: VISION + BMC for orientation, glossary + domain model for PRD authoring, test strategy for QA, runbook context for ops. Operator chooses the slice; clew assembles it.

**Business object.** Agent context window.

**Strategic importance.** Necessary. Maps to [P-01 §Goal 5](01a-personas.md#goals) (Tested wave 1: *"the real advantage is I can pick and choose the level of context I would give my agent depending on the work I need to do"*). Also a precondition for the local-first token-economics differentiator: smaller context = lower per-session API cost.

**Outcomes.**
- Agent boots with the right context for the current task type, not the entire repo.
- Token consumption per session scales with task scope, not project size.
- Cross-task switching does not require full reload.

**Boundaries.**
- Does NOT decide WHEN to switch contexts (operator and skill judgement).
- Does NOT compress or paraphrase context (delivers structured artefacts verbatim; summarisation is the agent's job).

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§9 Local-first token economics](02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1). Wave-1 evidence: [synthesis H2 selective-compositional-context finding](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md). Realised in streams: [VS-1.2 Load Methodology Context](04a-value-streams.md#vs-12--load-methodology-context).

## C2 · Persistence

Capabilities that store and retrieve structured artefacts deterministically. The DB is canonical; the markdown is narrative; the YAML snapshot is the deterministic git-tracked structural export. Per [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md).

### C2.1 · Stable identifier generation

**Definition.** Provides deterministic, collision-free identifier assignment for every artefact, generated by a database sequence rather than the LLM.

**Business object.** Artefact identifier.

**Strategic importance.** Necessary. Foundational for everything in C3, C4, C5; without deterministic IDs, no traceability matrix exists. Per [ADR-0001 motivation](../architecture/decisions/adr-0001-metamodel-persistence-layer.md): *"LLM output is non-deterministic. IDs generated by an LLM have no collision guarantee, no referential integrity check, and can silently drift across sessions."*

**Outcomes.**
- Same input produces the same identifier across runs and across machines.
- No collision between independently-created artefacts within a project.
- Cross-artefact references resolve by exact identifier match, not paraphrase.

**Boundaries.**
- Does NOT mint identifiers for non-metamodel objects (raw files, code, etc.).
- Does NOT decide which artefacts to create (operator and skill judgement).

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md). Wave-1 evidence: [synthesis F2 finding](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (*"no confidence in the integrity check and audit I need to do on the documentation if I rely solely on llm. determinism is key here."*, the F2 verbatim user quote at synthesis line 48). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id), [VS-2.2 Resolve from Canonical Source](04a-value-streams.md#vs-22--resolve-from-canonical-source) (deterministic IDs are what makes the joins reliable), [VS-3.2 Preview Downstream Impact](04a-value-streams.md#vs-32--preview-downstream-impact) (without stable IDs the impact set is incomplete by construction), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (IDs preserved through rename, never recycled on retire).

### C2.2 · Schema enforcement

**Definition.** Provides write-time validation that each new or updated artefact conforms to the typed metamodel: required fields present, types correct, referential structure intact.

**Business object.** Artefact record.

**Strategic importance.** Necessary. Turns the metamodel from a prose convention into an enforced contract. Per [ADR-0001 decision driver](../architecture/decisions/adr-0001-metamodel-persistence-layer.md): *"Must enforce ID relationships (FK semantics between artefact types)."*

**Outcomes.**
- Malformed artefacts are rejected at write time, not committed and discovered later.
- The DB shape is a real contract the agent must satisfy, not an aspiration.
- Operators get clear, actionable error messages on violation.

**Boundaries.**
- Does NOT enforce content quality (that's the methodology skill's job).
- Does NOT migrate schemas when the metamodel evolves (that's C4.4).

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (schema enforced across the full change-set, not just per-artefact).

### C2.3 · File binding management

**Definition.** Maintains the mapping between each persisted artefact and its location in the markdown layer (file path + section anchor), with content-hash tracking for drift detection. Per [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md).

**Business object.** File binding.

**Strategic importance.** Necessary. Without it, the DB and markdown can silently diverge; `clew where` and `clew check` cannot exist.

**Outcomes.**
- Every artefact has a known file + section-anchor location.
- Layout violations (a persona attempted in a process file, etc.) are rejected at write time.
- Hand-edits to managed sections are detectable for reconciliation.

**Boundaries.**
- Does NOT regenerate markdown from the DB (explicitly out of scope per ADR-0002).
- Does NOT manage Git operations or version control.

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id), [VS-2.3 Surface Provenance](04a-value-streams.md#vs-23--surface-provenance) (file binding provides the drill-down link from a query result row to its narrative), [VS-3.2 Preview Downstream Impact](04a-value-streams.md#vs-32--preview-downstream-impact) (binding records reveal which markdown sections will be rewritten), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (bindings rewritten for every section touched), [VS-4.2 Materialise Self-Contained Views](04a-value-streams.md#vs-42--materialise-self-contained-views) (relative-path bindings resolve in plain markdown viewers without clew), [VS-4.4 Provide Reader Orientation](04a-value-streams.md#vs-44--provide-reader-orientation) (cross-links from the entry-point doc).

### C2.4 · Deterministic structural export

**Definition.** Produces a deterministic, git-friendly serialisation of the DB state (one structural snapshot file per artefact type) such that the same DB state always produces byte-identical export.

**Business object.** Snapshot file.

**Strategic importance.** Necessary. Maps to [OBJ-02 KR-02.4](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (100% determinism on representative test set). The git-readability promise depends on this.

**Outcomes.**
- Snapshot diffs in version control reflect actual structural changes, not serialisation noise.
- Repository can be reconstructed from snapshot (DB rebuild on import).
- Backup and audit-trail use the same artefact.

**Boundaries.**
- Does NOT export narrative markdown (that's not derived from the DB; agents author it directly).
- Does NOT translate between snapshot formats (single canonical format per ADR-0001).

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md). OBJ KRs: [OBJ-02 KR-02.4](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (snapshots regenerated for every affected artefact), [VS-4.1 Confirm Snapshot Is Current](04a-value-streams.md#vs-41--confirm-snapshot-is-current) (byte-identical snapshot makes the share reproducible), [VS-4.2 Materialise Self-Contained Views](04a-value-streams.md#vs-42--materialise-self-contained-views) (the snapshot mechanism that captures the full set for sharing).

## C3 · Querying and Traceability

Capabilities for navigating the relationships between artefacts. Pre-built views deliver canonical traceability deterministically; the ad-hoc surface supports anything else.

### C3.1 · Ad-hoc cross-artefact query surface

**Definition.** Enables an agent session or human to ask arbitrary cross-artefact questions ("which capabilities serve P-01?", "which KRs roll up to OBJ-02?") and receive answers in seconds.

**Business object.** Query result.

**Strategic importance.** Necessary. Maps to [OBJ-01 KR-01.3](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (< 30 second cross-artefact answer time). The user-visible demo of C3.2 is built on this.

**Outcomes.**
- Cross-artefact questions resolve in the same agent session, not via grep across multiple files.
- Operator does not need to read multiple files manually to triangulate an answer.
- SQL surface is available for power-user analytics directly against the artefact store.

**Boundaries.**
- Does NOT generate the answer in natural language (it returns structured results; narrative phrasing is the agent's job).
- Does NOT pre-cache answers (queries run live against current DB state).

**Soft-links.** Personas served: [P-01](01a-personas.md). OBJ KRs: [OBJ-01 KR-01.3](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed). Lean Canvas: [§3 Concrete win 1](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement). Realised in streams: [VS-2.1 Scope the Question](04a-value-streams.md#vs-21--scope-the-question) (discoverable surface), [VS-2.2 Resolve from Canonical Source](04a-value-streams.md#vs-22--resolve-from-canonical-source) (the SQL execution path for ad-hoc questions), [VS-3.1 Identify the Change](04a-value-streams.md#vs-31--identify-the-change) (look up the target artefact), [VS-3.2 Preview Downstream Impact](04a-value-streams.md#vs-32--preview-downstream-impact) (custom impact queries for non-canonical refactor shapes).

### C3.2 · Pre-built traceability views

**Definition.** Provides canonical, named views over the artefact graph (the traceability matrix, lineage views, impact analysis) that anyone can run deterministically, without composing queries.

**Business object.** Traceability view.

**Strategic importance.** **Differentiator.** Per the [wave-1 synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md), this is the user-stated trust threshold: *"I think that I can built the traceability matrix consistently and deterministically."* The README headline candidate and the singular adoption pivot.

**Outcomes.**
- Traceability matrix generation is a one-command operation, deterministic across runs.
- Impact analysis on rename or refactor is a mechanical query, not an investigation.
- Audit of "which X serves which Y" is a query result with provenance, not a research project.

**Boundaries.**
- Does NOT include views that go beyond the metamodel (no business-intelligence dashboards).
- Does NOT generate views interactively at runtime (canonical views ship with clew; new views require a code change, not configuration).

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§3 Concrete win 1](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) (the user-visible demo). Wave-1 evidence: [synthesis trust-threshold finding](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md). Realised in streams: [VS-2.1 Scope the Question](04a-value-streams.md#vs-21--scope-the-question) (discoverable catalogue of canonical views), [VS-2.2 Resolve from Canonical Source](04a-value-streams.md#vs-22--resolve-from-canonical-source) (Differentiator role; the wave-1 trust threshold delivered deterministically), [VS-2.4 Validate Against Current State](04a-value-streams.md#vs-24--validate-against-current-state) (re-run to re-confirm), [VS-3.1 Identify the Change](04a-value-streams.md#vs-31--identify-the-change) (see what the target is currently part of), [VS-3.2 Preview Downstream Impact](04a-value-streams.md#vs-32--preview-downstream-impact) (Differentiator role at this stage too; the impact-analysis canonical view is the magic-wand applied to changes), [VS-3.4 Confirm No Drift](04a-value-streams.md#vs-34--confirm-no-drift) (re-run the impact view to confirm the cascade propagated as predicted), [VS-4.2 Materialise Self-Contained Views](04a-value-streams.md#vs-42--materialise-self-contained-views) (views materialised as static markdown rather than executed on demand, for reader self-sufficiency), [VS-4.4 Provide Reader Orientation](04a-value-streams.md#vs-44--provide-reader-orientation) (canonical views serve as cross-cutting tables of contents).

## C4 · Integrity and Audit

Capabilities for detecting and preventing drift between intended and actual state. Write-time enforcement is the headline; drift detection and audit replay are the safety nets.

### C4.1 · Write-time reference validation

**Definition.** Rejects writes that would introduce broken references (dangling foreign keys, missing required relationships) at the moment they are attempted, with clear error messages.

**Business object.** Reference integrity check.

**Strategic importance.** **Differentiator.** Per the [wave-1 synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md), this is the user-stated magic wand: *"a mechanism on place that can make 100% sure that all internal reference are up to date at all time."* Maps directly to [OBJ-02 KR-02.1](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (tightened to 100% at write time after wave 1).

**Outcomes.**
- Drift is structurally impossible (not just statistically rare).
- The DB is the source of truth at every instant, not eventually.
- Operators get clear, actionable error messages on rejection, with the path to fix.

**Boundaries.**
- Does NOT detect violations introduced via hand-edits to markdown bypassing the CLI (that's C4.2).
- Does NOT enforce semantic correctness (a persona pointing at the wrong capability is still valid if the ID exists).

**Soft-links.** Personas served: [P-01](01a-personas.md). OBJ KRs: [OBJ-02 KR-02.1](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it). Lean Canvas: [§3 Concrete win 2](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement). ADRs: [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md) (first concrete demo). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id) (Differentiator role; the user-stated trust threshold), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (Differentiator role at this stage too; integrity enforced atomically across the full change-set, not just one new write at a time).

### C4.2 · Drift detection

**Definition.** Detects discrepancies between DB state and the markdown layer (content-hash drift, missing files, orphan sections, hand-edits) and reports them via `clew check`.

**Business object.** Drift report.

**Strategic importance.** Necessary. Defends against the case where someone edits markdown directly without going through the CLI; complements C4.1 for the bypass path.

**Outcomes.**
- Orphan markdown sections (referencing IDs the DB does not know) are surfaced.
- Orphan DB records (no markdown narrative) are surfaced.
- Hand-edits to managed sections are flagged for reconciliation.

**Boundaries.**
- Does NOT auto-fix drift (reports it; reconciliation is operator and agent work).
- Does NOT continuously monitor (runs on demand via `clew check`; CI integration is optional).

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md). Realised in streams: [VS-2.4 Validate Against Current State](04a-value-streams.md#vs-24--validate-against-current-state) (the substrate-level validation that catches drift introduced via hand-edits bypassing the CLI; pairs with C4.1's CLI-path write-time enforcement), [VS-3.4 Confirm No Drift](04a-value-streams.md#vs-34--confirm-no-drift) (post-refactor drift check; confirms the atomic change-set executed at VS-3.3 propagated cleanly with no orphans introduced), [VS-4.1 Confirm Snapshot Is Current](04a-value-streams.md#vs-41--confirm-snapshot-is-current) (pre-publish drift check ensures the shared snapshot reflects actual current state, not stale state).

### C4.3 · Audit trail

**Definition.** Records every write to the DB (create, update, delete) with timestamp, actor, and before/after state, replayable in chronological order.

**Business object.** Audit-trail record.

**Strategic importance.** Commodity. DB-level audit trails are well-understood engineering; the value is its existence, not its design. Nothing differentiating about clew's implementation specifically.

**Outcomes.**
- Every state change is reconstructable from the audit log.
- "Why is this artefact in its current state?" answers in a DB query rather than an investigation.
- Replay enables debugging and regression analysis.

**Boundaries.**
- Does NOT track changes to narrative markdown (only DB structural state).
- Does NOT do compliance-grade audit (not SOC2 / GDPR by default; sufficient for project-level accountability).

**Soft-links.** Personas served: [P-01](01a-personas.md). Wave-1 evidence: [synthesis F2 finding](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (*"determinism is key here… an audit trail anyone can replay"*). Realised in streams: [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id), [VS-2.3 Surface Provenance](04a-value-streams.md#vs-23--surface-provenance) (audit-trail timestamps surface as the "when last changed" column on every query result row), [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (the change-set recorded as one replayable event so the refactor can be replayed or rolled back as a unit).

### C4.4 · Schema migration

**Definition.** Manages forward-compatible evolution of the metamodel schema: adding entity types, adding fields, renaming relationships, deprecating items, without breaking existing projects.

**Business object.** Schema migration script.

**Strategic importance.** Commodity. A well-known engineering pattern; clew's instance is necessary but not differentiating.

**Outcomes.**
- clew v0.1 → v0.2 (and later) upgrades existing projects in place.
- Migration steps are versioned and reviewable in the project repo.
- Rollback is supported for at least one prior version.

**Boundaries.**
- Does NOT change project data semantically (only the schema; data migrations are operator-authorised).
- Does NOT support arbitrary downgrades (one-step rollback only).

**Soft-links.** Personas served: [P-01](01a-personas.md). ADRs: [ADR-0001 §Upgrade path](../architecture/decisions/adr-0001-metamodel-persistence-layer.md).

## C5 · Methodology Distillation

Capabilities that encode external bodies of practice (BIZBOK, BABOK, Strategyzer, Sommerville; planned DDD, ATDD / BDD, SRE) as authoring discipline, sustained as a compounding catalogue.

### C5.1 · Skill catalogue management

**Definition.** Maintains the lifecycle of homemade-claude-kit skills (authoring, versioning, distribution, deprecation) that encode methodology as Claude skills.

**Business object.** Skill artefact.

**Strategic importance.** **Differentiator.** Per [§9 UA Compounding skill catalogue](02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1): every skill shipped strengthens clew and raises the cost-to-fork over time. The catalogue is a moat that grows with use.

**Outcomes.**
- New methodologies (DDD, ATDD / BDD, SRE planned) can be added without changing clew core.
- Skills version independently of clew releases.
- Quality discipline (skill template, testing, review) gates the catalogue's growth.

**Boundaries.**
- Does NOT host or distribute non-methodology skills (general-purpose Claude skills live elsewhere).
- Does NOT enforce which skills a project uses (operator choice).

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§9 Compounding skill catalogue](02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1). Realised in streams: [VS-1.1 Choose Artefact Type](04a-value-streams.md#vs-11--choose-artefact-type).

### C5.2 · Per-methodology pattern encoding

**Definition.** Translates each external body of practice (BIZBOK, BABOK, Strategyzer, Sommerville; planned DDD / ATDD / BDD / SRE) into a structured authoring pattern: template, fields, validation rules, cross-artefact relationships.

**Business object.** Methodology pattern.

**Strategic importance.** Necessary. Required to deliver the C5.1 catalogue; the work of internalising each framework is necessary but not by itself differentiating (the differentiation is the cumulative depth, captured by C5.1).

**Outcomes.**
- Each methodology's deliverables become typed artefacts in the metamodel.
- Cross-methodology coherence (e.g., a BMC block linking to a value stream) is mechanically achievable.
- Updates to the methodology canon (new BIZBOK edition, etc.) propagate via skill update.

**Boundaries.**
- Does NOT re-derive methodology (uses canonical sources as-is, with citation).
- Does NOT mix methodologies inside a single artefact (each artefact follows one methodology).

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§3 Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement). Realised in streams: [VS-1.3 Draft Artefact Content](04a-value-streams.md#vs-13--draft-artefact-content).

### C5.3 · Artefact template management

**Definition.** Maintains the canonical template for each artefact type (persona, capability map, ADR, Lean Canvas, objectives, etc.) with frontmatter, section order, required fields, and authoring instructions.

**Business object.** Template.

**Strategic importance.** Necessary. Templates are the operator-facing surface of the methodology encoding; consistency across projects depends on them.

**Outcomes.**
- Every new project scaffolds against the same template set.
- Template updates propagate across projects via versioning.
- Operators see the same artefact structure regardless of which skill is invoked.

**Boundaries.**
- Does NOT enforce template usage outside the skill catalogue.
- Does NOT modify templates per project (project-specific deviations live in narrative, not template structure).

**Soft-links.** Personas served: [P-01](01a-personas.md). Realised in streams: [VS-1.1 Choose Artefact Type](04a-value-streams.md#vs-11--choose-artefact-type), [VS-1.2 Load Methodology Context](04a-value-streams.md#vs-12--load-methodology-context).

### C5.4 · Cross-methodology referencing

**Definition.** Enables an artefact in one methodology (e.g., a BMC block) to reference an artefact in another methodology (e.g., a value stream from Strategyzer) by stable ID, with type-aware validation.

**Business object.** Cross-methodology link.

**Strategic importance.** Necessary. The multi-role alignment promise in [§3 UVP Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) depends on this; without cross-methodology referencing, BIZBOK and Strategyzer artefacts live in silos even when both are typed.

**Outcomes.**
- A persona (BIZBOK) can be referenced from a value stream (Strategyzer) without translation.
- Type compatibility is checked at write time (a "persona" reference cannot accidentally point at an "ADR").
- Cross-methodology queries (e.g., "which Strategyzer VPs serve which BIZBOK personas") are first-class.

**Boundaries.**
- Does NOT translate semantic meaning between methodologies (a "persona" in BIZBOK and a "user role" in Sommerville are not auto-equated).
- Does NOT model methodologies that are not in the C5.1 catalogue.

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§3 Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement).

### C5.5 · Methodology canon coverage assessment

**Definition.** Audits which methodologies are encoded in the C5.1 catalogue vs. which lifecycle layers are bare. Surfaces gaps before the "any builder using agents" promise meets a QA engineer or SRE looking for their methodology and finding none.

**Business object.** Coverage-gap report.

**Strategic importance.** Necessary. Per the [wave-1 closing gaps #5](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): the lifecycle expansion to QA + ops implies DDD, ATDD / BDD, SRE coverage is needed. This capability makes the gap visible rather than discovered when adoption fails.

**Outcomes.**
- The catalogue's coverage is mappable against lifecycle layers (business / market / product / domain / QA / ops).
- New methodology candidates can be prioritised against actual coverage gaps.
- The "any builder" UVP claim can be substantiated layer-by-layer.

**Boundaries.**
- Does NOT pick which methodology to add (strategic prioritisation; not a clew decision).
- Does NOT score methodology *quality*, only presence/absence in the catalogue.

**Soft-links.** Personas served: [P-01](01a-personas.md). Lean Canvas: [§3 Concrete win 3](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement). Wave-1 evidence: [synthesis open question #3 + closing gap #5](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md).

## Discipline checks (pass)

Per the [`business-capability-map` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-capability-map):

- **Noun test:** every L0 and L1 capability name is a noun phrase, not a verb phrase.
- **Technology-independence test:** no capability name contains a vendor, system, or tool (DuckDB, YAML, GFM, MCP, Claude all kept out of capability *names*; some appear in *definitions* as implementation hints, which is allowed).
- **Anti-overlap test:** each capability appears once; the closest pair (C2.2 schema enforcement vs. C4.1 write-time reference validation) is disambiguated by scope (schema covers required fields and types; write-time reference validation is the FK-specific subset, called out for adoption reasons).
- **Sizing:** 5 L0 (within 3 to 8); 17 L1 total (≤ 25); per-L0 L1 counts: 2 / 4 / 2 / 4 / 5 (2 for C1 and C3 are below the 5-to-12 recommended floor but defensible: C1's authoring scope is intentionally narrow — citation discipline is embedded in kit skills via `rules/writing-citations.md`, not a clew infrastructure concern; C3 collapses two tightly-related navigation modes; `clew history` was folded into C4.3 rather than inflating C3).
- **Differentiator distribution:** 4 Differentiators (within Cutter's 3 to 6 recommended range).

## Open Items

| OI-ID  | Type           | Summary                                                                                                                                                                                                                                                                            | Source anchor                  | Source heading                  | Resolution path                                                                                                                                                                                              | Priority | Status      | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------- | :----------- | :---------------- | :---------- |
| OI-0006 | decision-gap   | C1 and C3 each have only 2 L1 capabilities (below the 5-to-12 recommended floor). C1 reduced from 3 to 2 when C1.3 (External evidence integration) was retired — citation discipline lives in kit skills via `rules/writing-citations.md`. C3 reduced from 3 to 2 when C3.3 (Bidirectional time traceability) was retired — history-query folded into C4.3; rationale-recording covered by artefact content. | #discipline-checks-pass        | Discipline checks (pass)        | Reconsider both if wave-2 interviews surface latent capabilities not yet modelled. No action unless wave-2 surfaces evidence; intentionally narrow scope is defensible per skill discipline.                  | low      | open        | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0007 | decision-gap   | C5.1 Skill catalogue management vs C5.3 Artefact template management boundary is real but subtle — skills govern lifecycle, templates govern content within skills. Risk: maintainers conflate them in practice.                                                                   | #c5--methodology-distillation  | C5 · Methodology Distillation   | Review if maintainers conflate them after 2-3 months of clew authoring; tighten definitions or merge if the boundary does not carry its weight.                                                              | low      | open        | Victor Hueni | 2026-08-31        | _TBD_       |
| OI-0008 | doc-gap        | Maturity ratings not assessed. Skipped intentionally for v1 — most capabilities are pre-implementation (Initial or Developing).                                                                                                                                                    | #capability-index              | §Capability index               | Revisit after v0.1 ships; add a `Maturity:` field per L1 row in the §Capability index.                                                                                                                       | low      | open        | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0009 | doc-gap        | Soft-link gaps closed at the L1 level for value streams (14 of 17 L1 capabilities carry a `Realised in streams:` link). Processes, FBS, and domain model soft-links still pending. C4.4, C5.4, C5.5 confirmed clew-internal maintenance — structural absence from any VS, not a documentation gap. | #capability-index              | §Capability index               | Backfill `Operationalised by processes` (when `05a-processes/` lands) and FBS soft-links (when `07a-fbs.md` matures). No action needed on C4.4 / C5.4 / C5.5.                                                | medium   | in-progress | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0010 | decision-gap   | L0 axis (capability domain) is the most consequential choice; lifecycle-layer remains a real alternative. If wave-2 surfaces that "any builder" reaches for clew by lifecycle layer (QA-only, ops-only) rather than by capability domain, re-pick the axis.                         | #l0-axis-declaration           | §L0 axis declaration            | Re-pick L0 axis if wave-2 signal surfaces lifecycle-layer-first navigation behaviour from ≥2 interviewees; cascade re-axis through value streams + FBS.                                                       | medium   | open        | Victor Hueni | 2026-08-31        | _TBD_       |

## Changelog

| Date | Change | Evidence | Cascading effects |
|---|---|---|---|
| 2026-05-25 | C1.3 (External evidence integration) retired. Rationale: citation discipline is embedded in kit skills via `rules/writing-citations.md` (inline links in markdown artefacts, bibliography.yaml in slide decks) and realised by the evidence-production skills (arch-research, business-competitive-landscape, business-quantitative-model, business-research, com-slide-deck). No clew DB field or CLI command is needed. L1 count: 18 → 17. Strategic Importance distribution: 12 Necessary → 11 Necessary. | C1.3 scope review. | [07a-fbs.md](../product-specs/07a-fbs.md): C1.3 section removed (F01/F02/F03 retired), counts updated 60 → 57. [04a-value-streams.md](04a-value-streams.md): C1.3 backlinks removed from VS-1.2 enabling capabilities + exit criteria, VS-1.3 enabling capabilities, VS-2 scope anchor, VS-2.3 enabling capabilities + exit criteria. Pre-existing C3.3 orphan reference in VS-2.3 cleaned up in same pass. |
| 2026-05-25 | C3.3 (Bidirectional time traceability) retired. Rationale: artefact content and kit methodology already carry the "why backward" intent; "what next forward" is covered by epics (C3.2 impact view + delivery roadmap); `clew history` (C3.3.F03) folded into C4.3 as C4.3.F04 — it is an audit query, not a traceability view. L1 count: 19 → 18. Strategic Importance distribution: 13 Necessary → 12 Necessary. Soft-link count: 16 of 19 → 15 of 18. Discipline checks + Open Issues updated accordingly. | FBS redesign session. | [07a-fbs.md](../product-specs/07a-fbs.md): C3.3 section removed, C4.3.F04 added, counts updated. No cascade to value streams (C3.3's VS-2.3 backlink is simply removed). |
| 2026-05-24 | Scaffold + structure + fill in one pass. 5 L0 (Authoring · Persistence · Querying and Traceability · Integrity and Audit · Methodology Distillation), 19 L1 capabilities. 4 Differentiators (C1.1 methodology-mediated artefact creation, C3.2 pre-built traceability views, C4.1 write-time reference validation, C5.1 skill catalogue management), 13 Necessary, 2 Commodity. Strategic Importance assigned now per [wave-1 synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) signal. | Drafted hybrid (top-down framework cross-validated against VISION, P-01, Lean Canvas, OBJ-01/02/03, ADR-0001, ADR-0002, wave-1 synthesis). | [VISION.md](../VISION.md), [Lean Canvas](02a-lean-canvas.md), [OBJ doc](04b-objectives.md), [persona](01a-personas.md), [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md), [ADR-0002](../architecture/decisions/adr-0002-artefact-file-binding.md): existing soft-link slots filled. Value streams / processes / FBS / domain model: still _TODO_ (no artefact to soft-link to yet). |
| 2026-05-25 | Value-stream backlinks wired (cascade from [04a-value-streams.md](04a-value-streams.md) VS-1 fill). 12 L1 capabilities now carry a `Realised in streams:` soft-link to the VS-1 stage that consumes them: VS-1.1 ← C5.1, C5.3; VS-1.2 ← C5.3, C1.2, C1.3; VS-1.3 ← C1.1 (Differentiator role flagged), C1.3, C5.2; VS-1.4 ← C2.1, C2.2, C2.3, C2.4, C4.1 (Differentiator role flagged), C4.3. §Open Issues §Soft-link gaps updated: 12 capabilities now wired; 7 remaining (C3.1, C3.2, C3.3, C4.2, C4.4, C5.4, C5.5) await VS-2 / VS-3 / VS-4 stage decomposition. | [04a-value-streams.md VS-1](04a-value-streams.md#vs-1--compose-architecture). Cascade companion to today's value-streams commit. | None outside this commit. The 7 unwired capabilities will gain backlinks when VS-2 / VS-3 / VS-4 are filled. |
| 2026-05-25 | Value-stream backlinks wired (cascade from [04a-value-streams.md](04a-value-streams.md) VS-4 fill). 5 capabilities gain additional VS-4 backlinks appended to existing soft-links (no first-time backlinks; VS-4 is value-flow reuse of substrate already in place): C1.1 ← VS-4.4 (orientation doc is itself a methodology-mediated artefact); C2.3 ← VS-4.2 (relative-path bindings resolve in plain markdown viewers) + VS-4.4 (cross-links from entry-point); C2.4 ← VS-4.1 (byte-identical snapshot makes the share reproducible) + VS-4.2 (the snapshot mechanism); C3.2 ← VS-4.2 (views materialised as static markdown for reader self-sufficiency) + VS-4.4 (canonical views as cross-cutting tables of contents); C4.2 ← VS-4.1 (pre-publish drift check ensures shared snapshot reflects current state). §Open Issues §Soft-link gaps re-written: the count stays at 16 of 19, and the remaining 3 (C4.4, C5.4, C5.5) are now **confirmed** clew-internal maintenance capabilities that do not land in user-facing value streams (their absence from any VS is a structural truth, not a documentation gap). All 4 streams now filled; the value-stream-to-capability backlink question is closed at the L1 level. | [04a-value-streams.md VS-4](04a-value-streams.md#vs-4--share-architecture). Cascade companion to today's VS-4 fill. | None outside this commit. With all 4 VS filled and 16 of 19 capabilities wired, this closes the cross-artefact wiring loop for the business layer. |
| 2026-05-25 | Value-stream backlinks wired (cascade from [04a-value-streams.md](04a-value-streams.md) VS-3 fill). 9 capabilities gain an additional VS-3 backlink appended to existing soft-links (no first-time backlinks; all consumed capabilities were already wired from VS-1 / VS-2): C2.1 ← VS-3.2 + VS-3.3; C2.2 ← VS-3.3; C2.3 ← VS-3.2 + VS-3.3; C2.4 ← VS-3.3; C3.1 ← VS-3.1 + VS-3.2; C3.2 ← VS-3.1 + VS-3.2 (Differentiator role flagged at stage 2, the magic-wand applied to changes) + VS-3.4; C4.1 ← VS-3.3 (Differentiator role flagged, integrity across the full change-set); C4.2 ← VS-3.4; C4.3 ← VS-3.3. §Open Issues §Soft-link gaps updated: VS-3 added 0 new wired capabilities (the count stays at 16 of 19). VS-3 is value-flow reuse of substrate already in place. | [04a-value-streams.md VS-3](04a-value-streams.md#vs-3--refactor-architecture). Cascade companion to today's VS-3 fill. | None outside this commit. |
| 2026-05-25 | Value-stream backlinks wired (cascade from [04a-value-streams.md](04a-value-streams.md) VS-2 fill). 4 capabilities gain their first `Realised in streams:` soft-link via VS-2 stages: C3.1 ← VS-2.1 + VS-2.2; C3.2 ← VS-2.1 + VS-2.2 (Differentiator role flagged, the wave-1 trust threshold) + VS-2.4; C3.3 ← VS-2.3; C4.2 ← VS-2.4. 4 capabilities gain an additional VS-2 backlink appended to their existing VS-1 link: C1.3 ← VS-2.3 added; C2.1 ← VS-2.2 added (deterministic IDs make joins reliable); C2.3 ← VS-2.3 added (drill-down link from query row to narrative); C4.3 ← VS-2.3 added (timestamps surface on every result row). §Open Issues §Soft-link gaps updated: 16 of 19 capabilities now wired; 3 remaining (C4.4, C5.4, C5.5) await VS-3/VS-4 decomposition (with the caveat that C4.4 + C5.5 may legitimately never land in a user-facing stream as they are clew-internal maintenance capabilities). | [04a-value-streams.md VS-2](04a-value-streams.md#vs-2--navigate-architecture). Cascade companion to today's VS-2 fill. | None outside this commit. |
