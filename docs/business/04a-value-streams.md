---
title: Value Streams
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

<!-- doc-version: 1.0 | created: 2026-05-25 -->

# clew · Value Streams

This document is clew's strategic value-flow layer: the catalogue of value streams describing **how value flows** from [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) through stages to the value she receives. Each stage soft-links to the capabilities it consumes (in [`03a-capability-map.md`](03a-capability-map.md)) and the processes that operationalise it (in `05a-processes/`, not yet authored).

> **Methodology:** built from the canonical synthesis of TOGAF Value Streams Guide + BIZBOK + Ulrich/Kuehn practitioner framing + Millett journey-vs-stream distinction. See the [`business-value-stream` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-value-stream) for the full bibliography (single source of truth across every project).
>
> **Stance:** **EA value streams** (strategic, stage-based, capability-consuming). **NOT Lean VSM** (operational cycle-time, waste, takt). Operational concerns belong in process docs, not here.

## Triangulation rule

```
Persona (who)
   │ triggers
   ▼
Value stream (how value flows to that who)
   │ stages consume
   ▼
Capabilities (what abilities)
   │ operationalised by
   ▼
Processes (how it operationally happens)
```

## Companion documents

- Personas: [`01a-personas.md`](01a-personas.md)
- Business Capability Map: [`03a-capability-map.md`](03a-capability-map.md)
- Business Processes: `05a-processes/` (not yet authored; every stage's `Operationalised by processes` row is `_TODO_`)
- Lean Canvas: [`02a-lean-canvas.md`](02a-lean-canvas.md)
- Business Objectives: [`04b-objectives.md`](04b-objectives.md)

## Hard rules

- A value stream describes **what** value flows; the **how** of operational delivery lives in process docs.
- Stages **soft-link** to capabilities by ID. They never inline capability definitions.
- The triggering stakeholder must be a persona ID. No systems, no departments, no schedulers.
- 4 to 10 stages per stream. Fewer than 4 means it is a process. More than 10 means scoping error.
- One value proposition per stream. If "AND" appears in the value proposition, split into two streams.

## Value Stream Template

*Copy this block for each new value stream. Replace `[...]` placeholders. Delete italicised guidance lines before publishing.*

### VS-N · [Value stream name]

*Naming rule (BIZBOK): name the stream after the final value achieved, using business-object framing. Avoid internal-lifecycle naming ("order-to-cash", "hire-to-retire").*

- **Triggering stakeholder:** [Persona ID + name]
- **Value proposition:** [One sentence. One value. No "AND".]
- **Scope anchor:** [Which capability-map L0s the stream consumes]
- **Overall pain index:** [Low / Medium / High / Critical; aggregate of per-stage pain]

**Stage flow:**

```
[P-NN trigger] → VS-N.1 → VS-N.2 → VS-N.3 → VS-N.4 → [Value: {value proposition}]
```

#### VS-N.1 · [Stage name, value milestone, not activity]

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-NN, P-MM] |
| **Entrance criteria** | [2 to 4 bullets] |
| **Exit criteria** | [2 to 4 bullets; the value item produced is the primary exit] |
| **Value items produced** | [1 to 3 incremental items] |
| **Enabling capabilities** | [C-N.M IDs, soft-linked to `03a-capability-map.md`] |
| **Operationalised by processes** | [process-name.md, or `_TODO_`] |
| **Pain point index** | **[Low / Medium / High / Critical]** [one-line rationale: evidence-based, not wishlist] |

*(continue VS-N.2, VS-N.3, ... up to 10 stages max.)*

## Catalogue

*Single canonical table covering every value stream in scope. Each row maps to one full §Value Stream H2 block below, or is queued for a future iteration.*

| VS-ID | Name | Triggering stakeholder | Value proposition | Scope anchor | Overall pain index |
|---|---|---|---|---|---|
| VS-1 | Compose Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | A new typed artefact persisted with stable ID, fillable by the agent from the right context, validated at write time. | C1 (Authoring) + C2 (Persistence) + C4.1 (write-time validation) + C5 (Methodology Distillation) | **Critical** |
| VS-2 | Navigate Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | An authoritative cross-artefact answer in seconds, not hours of grep. | C3 (Querying and Traceability) + C2.1 (stable IDs make joins) + C2.3 (file binding for drill-down) + C1.3 (evidence backing) + C4.2 (drift validation) + C4.3 (audit-trail timestamps) | **Critical** |
| VS-3 | Refactor Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | Full downstream impact surfaced before commit; no silent rot afterwards. | C4 (Integrity and Audit) + C2.3 (file binding) + C3.1 + C3.2 (impact preview via query layer) + C2.1 + C2.2 + C2.4 (write-side substrate) + C4.3 (audit trail) | **Critical** |
| VS-4 | Share Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | A markdown-and-git artefact set any colleague (P-02 product partner or other) can review without authoring tools. | C2.3 + C2.4 + C3.2 | _TODO_ (queued) |

**Sizing check:** 4 streams. Within BIZBOK's 3 to 10 healthy range for a single-product scope.

**Deferred fifth candidate.** "Extend Methodology Catalogue" (the value would be a new methodology added to the homemade-claude-kit catalogue; the maintainer triggers) is deliberately not modelled. It requires a "skill-maintainer" persona that does not exist in [`01a-personas.md`](01a-personas.md) yet; triggering from "the system" or an unmodelled role would violate the persona-trigger discipline (anti-pattern #5 in the skill's value-stream-discipline reference). Add the persona first, then add the stream.

## VS-1 · Compose Architecture

- **Triggering stakeholder:** [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer)
- **Value proposition:** A new typed artefact persisted with stable ID, fillable by the agent from the right context, validated at write time.
- **Scope anchor:** C1 (Authoring) + C2 (Persistence) + C4.1 (write-time validation) + C5 (Methodology Distillation)
- **Overall pain index:** **Critical**. Aggregate inherits the highest per-stage pain because VS-1.4 Persist gates the value proposition: if write-time integrity fails, the persisted artefact is not trustworthy and the rest of the substrate fails with it. Per-stage breakdown: VS-1.1 Low, VS-1.2 Medium, VS-1.3 High, VS-1.4 Critical.

**Stage flow:**

```
[P-01 trigger] → VS-1.1 Choose Type → VS-1.2 Load Context → VS-1.3 Draft → VS-1.4 Persist → [Value: persisted typed artefact with stable ID]
```

### VS-1.1 · Choose Artefact Type

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (decides). The agent participates as a recommender. |
| **Entrance criteria** | Ava has a new product or architecture concern requiring a persisted artefact (a persona to define, an ADR to author, a capability to add, etc.). · Project has clew initialised, or is about to be. · The homemade-claude-kit skill catalogue is reachable. |
| **Exit criteria** | The artefact type is identified (persona, capability, ADR, BMC block, value stream, etc.). · The matching skill in homemade-claude-kit is identified for invocation. |
| **Value items produced** | Artefact-type decision · skill identifier |
| **Enabling capabilities** | [C5.1 Skill catalogue management](03a-capability-map.md#c51--skill-catalogue-management) (the discoverable inventory of skills) · [C5.3 Artefact template management](03a-capability-map.md#c53--artefact-template-management) (templates make types discoverable by example) |
| **Operationalised by processes** | _TODO_ (expected at `05a-processes/proc-NN-choose-artefact-type.md` once authored) |
| **Pain point index** | **Low**. Ava can pick the right artefact and skill manually today; the wave-1 interview did not flag this as a friction point. *(Assumed; not directly tested in wave 1.)* |

### VS-1.2 · Load Methodology Context

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (selects scope). The agent loads context on her behalf. |
| **Entrance criteria** | Artefact type and skill are selected (VS-1.1 done). · Existing project state is on disk (clew DB + markdown). |
| **Exit criteria** | The agent session has loaded the methodology template (frontmatter, sections, fields, authoring instructions). · The agent session has loaded the relevant existing-artefact slice (e.g., existing personas if a new capability is being authored). · External evidence sources are reachable for the agent (URLs, archived snapshots) where the artefact requires them. |
| **Value items produced** | Typed template loaded into context · scoped existing-artefact context loaded · evidence sources reachable |
| **Enabling capabilities** | [C5.3 Artefact template management](03a-capability-map.md#c53--artefact-template-management) (the template) · [C1.2 Selective context loading](03a-capability-map.md#c12--selective-context-loading) (the scoped slice) · [C1.3 External evidence integration](03a-capability-map.md#c13--external-evidence-integration) (the evidence path) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Medium**. Wave-1 evidence: [P-01 §Goal 5](01a-personas.md#goals) (Tested N=1) explicitly calls out selective compositional context as the advantage Ava is reaching for: *"the real advantage is I can pick and choose the level of context I would give my agent depending on the work I need to do."* Without it, agent sessions either load too much (token-expensive, slow) or too little (drafts drift). *(Tested · N=1, founder-as-instance.)* |

### VS-1.3 · Draft Artefact Content

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (provides seed input, reviews and redirects). The agent drafts. |
| **Entrance criteria** | Methodology template, context slice, and evidence sources are loaded (VS-1.2 done). · Ava has provided the seed input (the thing to author). |
| **Exit criteria** | The artefact body is drafted conforming to the schema: all required fields present, all section ordering correct. · Evidence references are inline where the methodology demands them. · Cross-artefact relationships are identified (target IDs collected for validation in VS-1.4). |
| **Value items produced** | Draft artefact (in-memory, schema-conformant) · cited evidence references · identified cross-artefact relationships |
| **Enabling capabilities** | [C1.1 Methodology-mediated artefact creation](03a-capability-map.md#c11--methodology-mediated-artefact-creation) (the authoring discipline; Differentiator) · [C1.3 External evidence integration](03a-capability-map.md#c13--external-evidence-integration) (citations) · [C5.2 Per-methodology pattern encoding](03a-capability-map.md#c52--per-methodology-pattern-encoding) (the pattern the template embodies) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **High**. Wave-1 findings [F1 traceability-graph gap and F2 determinism gap](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): without methodology mediation, drafts drift in structure across sessions, IDs are guessed by the LLM, cross-references are paraphrased rather than typed. This is the stage where the LLM most reliably introduces silent inconsistency. clew's authoring discipline (C1.1) exists to remove this friction. *(Tested · N=1.)* |

### VS-1.4 · Persist with Stable ID

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (issues the commit). The agent writes via the clew CLI. |
| **Entrance criteria** | Draft artefact exists and conforms to the schema (VS-1.3 done). · Cross-artefact references are identified with target IDs. |
| **Exit criteria** | Schema validation passes (required fields, types). · Reference integrity validation passes (all foreign-key targets exist). · Stable identifier is assigned (database sequence, never LLM). · File binding is recorded (path + section anchor + content hash). · Deterministic snapshot is written (git-friendly). · The artefact is now referenceable by its stable ID from any other artefact in the project. |
| **Value items produced** | Persisted typed artefact in the DB · stable identifier · file-binding record · snapshot entry · audit-trail record |
| **Enabling capabilities** | [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) · [C2.2 Schema enforcement](03a-capability-map.md#c22--schema-enforcement) · [C2.3 File binding management](03a-capability-map.md#c23--file-binding-management) · [C2.4 Deterministic structural export](03a-capability-map.md#c24--deterministic-structural-export) · [C4.1 Write-time reference validation](03a-capability-map.md#c41--write-time-reference-validation) (Differentiator) · [C4.3 Audit trail](03a-capability-map.md#c43--audit-trail) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Critical**. Wave-1 [F2 magic-wand finding](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): *"a mechanism on place that can make 100% sure that all internal reference are up to date at all time."* Without write-time integrity enforcement, drift starts the moment the artefact is committed and compounds silently. This is the user-stated trust threshold and the gate on the entire value proposition. Maps to [OBJ-02 KR-02.1](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (100% at write time). *(Tested · N=1.)* |

## VS-2 · Navigate Architecture

- **Triggering stakeholder:** [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer)
- **Value proposition:** An authoritative cross-artefact answer in seconds, not hours of grep.
- **Scope anchor:** C3 (Querying and Traceability) + C2.1 (stable IDs make the joins deterministic) + C2.3 (file binding for drill-down to narrative) + C1.3 (evidence backing) + C4.2 (drift validation) + C4.3 (audit-trail timestamps)
- **Overall pain index:** **Critical**. Inherits from VS-2.2 Resolve from Canonical Source: that stage is the user-stated wave-1 trust threshold. Without canonical traceability views generated deterministically, the LLM-as-join-engine fallback today is non-deterministic, slow, and untrusted. Per-stage breakdown: VS-2.1 Low, VS-2.2 Critical, VS-2.3 Medium, VS-2.4 High.

**Stage flow:**

```
[P-01 trigger] → VS-2.1 Scope → VS-2.2 Resolve → VS-2.3 Surface Provenance → VS-2.4 Validate → [Value: drift-validated authoritative answer]
```

### VS-2.1 · Scope the Question

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (poses, refines). The agent may help classify the question and propose canonical views. |
| **Entrance criteria** | Ava has a cross-artefact question (e.g., "which capabilities serve P-01?", "if I rename Z, what breaks?", "what is the median artefact age?"). · Project is in a queryable state (DB exists, snapshots present). |
| **Exit criteria** | Question is classified as canonical-view-eligible OR ad-hoc-query. · The relevant artefact types and relationship pattern are identified. · A canonical view name is selected (for view-eligible questions) OR the ad-hoc query scope is defined. |
| **Value items produced** | Question classification · canonical-view selection OR ad-hoc query scope |
| **Enabling capabilities** | [C3.1 Ad-hoc cross-artefact query surface](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) · [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (provides the discoverable catalogue of canonical views) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Low**. Wave 1 did not flag question-framing as a friction point; the canonical-view catalogue is currently small enough to be memorable. Re-evaluate when the catalogue grows past memorable size or when wave-2 interviews surface mis-classification problems. *(Assumed; not directly tested in wave 1.)* |

### VS-2.2 · Resolve from Canonical Source

| Field | Value |
|---|---|
| **Participating stakeholders** | The agent (executes). [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (reviews). |
| **Entrance criteria** | Query is scoped (VS-2.1 done). · DB is reachable. · Canonical view definition exists (for view-eligible questions) OR the ad-hoc query can be composed against the persisted schema. |
| **Exit criteria** | Query executes against the live DB and returns a structural result (typed rows, not paraphrased prose). · Result is deterministic: same input + same DB state produces the same output across runs and across sessions. · Result includes typed identifiers, never LLM-paraphrased references. |
| **Value items produced** | Deterministic query result · execution timestamp · DB-state hash (so the result is reproducible later) |
| **Enabling capabilities** | [C3.1 Ad-hoc cross-artefact query surface](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) · [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (Differentiator; the wave-1 trust threshold) · [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) (without deterministic IDs, joins are non-deterministic) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Critical**. Wave-1 trust-threshold finding [(synthesis)](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): *"I think that I can built the traceability matrix consistently and deterministically."* Without canonical views and stable IDs, this stage today is the LLM-as-join-engine fallback (non-deterministic across sessions, slow, untrusted). This is the gate on VS-2's value proposition; clew's existence is justified by removing this pain. Maps to [OBJ-01 KR-01.3](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (< 30 s cross-artefact answer time) and [Lean Canvas §3 Concrete win 1](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement). *(Tested · N=1.)* |

### VS-2.3 · Surface Provenance

| Field | Value |
|---|---|
| **Participating stakeholders** | The agent (assembles provenance). [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (reads, drills in). |
| **Entrance criteria** | Structural result returned (VS-2.2 done). |
| **Exit criteria** | Each row in the result carries: its source artefact ID(s); its file binding (path + section anchor) so the operator can drill into the narrative; the evidence references backing the artefact (where applicable); the audit-trail timestamp of last change; the bidirectional-time-traceability tags (rationale backward + planned state forward) where C3.3 applies. |
| **Value items produced** | Provenance-annotated result · drillable file-binding links · evidence cites · audit timestamps · rationale / planned-state tags |
| **Enabling capabilities** | [C2.3 File binding management](03a-capability-map.md#c23--file-binding-management) (the drill-down link to narrative) · [C3.3 Bidirectional time traceability](03a-capability-map.md#c33--bidirectional-time-traceability) (the "why backward + what next forward" lineage) · [C1.3 External evidence integration](03a-capability-map.md#c13--external-evidence-integration) (the evidence cite per row) · [C4.3 Audit trail](03a-capability-map.md#c43--audit-trail) (the "when last changed" timestamp) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Medium**. Wave-1 finding: bidirectional time traceability (*"you will always know why things have been done and what is ahead for your product"*) is the kind of provenance the user wants. Today it is mostly absent because the LLM paraphrases relationships instead of citing typed references. Stage delivers it mechanically. *(Tested · N=1.)* |

### VS-2.4 · Validate Against Current State

| Field | Value |
|---|---|
| **Participating stakeholders** | The agent (runs drift check). [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (commits to the next action). |
| **Entrance criteria** | Provenance-annotated result in hand (VS-2.3 done). |
| **Exit criteria** | Drift check passes for every artefact touched by the result: DB state matches markdown-layer content hash. · No orphan markdown sections found (referencing IDs the DB does not know). · No orphan DB records found (without a narrative). · Operator now has an authoritative answer that is reproducible (VS-2.2), traceable (VS-2.3), and proven against current state (VS-2.4). |
| **Value items produced** | Drift-validated answer · drift-check pass record (the trust certificate) |
| **Enabling capabilities** | [C4.2 Drift detection](03a-capability-map.md#c42--drift-detection) (the substrate-level validation) · [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (re-runnable to re-confirm against current state) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **High**. Wave-1 F2 finding [(synthesis)](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): without integrity guarantees, the operator must manually re-verify before acting on the answer. Drift detection at this stage is what turns "I have an answer" into "I trust this answer enough to act on it." Note: [C4.1 Write-time reference validation](03a-capability-map.md#c41--write-time-reference-validation) (Differentiator, consumed by VS-1.4) prevents drift introduced via the CLI; [C4.2 Drift detection](03a-capability-map.md#c42--drift-detection) catches drift introduced via hand-edits bypassing the CLI. Both are needed for the substrate to be self-consistent. *(Tested · N=1.)* |

## VS-3 · Refactor Architecture

- **Triggering stakeholder:** [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer)
- **Value proposition:** Full downstream impact surfaced before commit; no silent rot afterwards.
- **Scope anchor:** C4 (Integrity and Audit) + C2.3 (file binding) + C3.1 + C3.2 (impact preview via query layer) + C2.1 + C2.2 + C2.4 (write-side substrate) + C4.3 (audit trail)
- **Overall pain index:** **Critical**. Inherits from VS-3.2 Preview Downstream Impact, which is where the wave-1 magic-wand finding ("100% sure that all internal reference are up to date at all time") applies to *changes* rather than to *creation*. Without complete impact preview, refactors today are blind: the operator commits and discovers breakage afterwards (if at all). Per-stage breakdown: VS-3.1 Low, VS-3.2 Critical, VS-3.3 High, VS-3.4 Medium.

**Stage flow:**

```
[P-01 trigger] → VS-3.1 Identify the Change → VS-3.2 Preview Downstream Impact → VS-3.3 Execute Change with Integrity → VS-3.4 Confirm No Drift → [Value: refactor applied with full impact foreseen, no silent rot]
```

### VS-3.1 · Identify the Change

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (decides). The agent may help locate the target artefact and propose the change semantics. |
| **Entrance criteria** | Ava has a need to modify an existing artefact (rename, re-tier, retire, re-link, restructure). · Target artefact exists in the persisted state (created via VS-1). |
| **Exit criteria** | Change is classified (rename / re-tier / retire / re-link / restructure). · Target artefact ID(s) are identified. · Proposed new state is specified (new name, new tier, removal marker, new soft-link target, etc.). |
| **Value items produced** | Change classification · target artefact ID(s) · proposed new state |
| **Enabling capabilities** | [C3.1 Ad-hoc cross-artefact query surface](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) (look up the target artefact) · [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (see what the target is currently part of) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Low**. Wave 1 did not flag change-identification as a friction point; the operator typically knows what they want to change. Re-evaluate if wave 2 surfaces that the artefact set grows large enough that locating the right target becomes painful. *(Assumed; not directly tested in wave 1.)* |

### VS-3.2 · Preview Downstream Impact

| Field | Value |
|---|---|
| **Participating stakeholders** | The agent (runs the impact view). [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (reviews, accepts or aborts). |
| **Entrance criteria** | Change identified (VS-3.1 done). · DB and snapshots are current (drift-free at preview time). |
| **Exit criteria** | Complete impact set is surfaced: every artefact referencing the target ID; every file binding that will be rewritten; every audit-trail entry that will be appended; every projected cascading effect (transitive references). · Risk classification is computed: does this change break references? introduce orphans? require a schema-level migration? · Operator has accepted the impact (proceed) or aborted (reformulate change). |
| **Value items produced** | Impact-set list (artefacts touched + file bindings affected) · cascading-effect projection · risk classification · accept/abort decision |
| **Enabling capabilities** | [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (Differentiator role at this stage; the impact-analysis canonical view turns the magic-wand into a mechanical preview) · [C3.1 Ad-hoc cross-artefact query surface](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) (custom impact queries for non-canonical refactor shapes) · [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) (without stable IDs the impact set is incomplete by construction) · [C2.3 File binding management](03a-capability-map.md#c23--file-binding-management) (binding records reveal which markdown sections will be rewritten) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Critical**. Wave-1 [F2 magic-wand finding](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) applied to *changes* rather than to *creation*: without a complete impact preview, refactors today are blind. The operator commits a rename and discovers afterwards (if at all) that 17 references are now stale. This is the value-gating stage of VS-3 and the realisation of [Lean Canvas §3 Concrete win 2](02a-lean-canvas.md#3-unique-value-proposition--confidence-tested-n1-founder-as-instance-with-refinement) ("rename catches drift at write-time"). Maps to [OBJ-01 KR-01.4](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (trust the architecture is current) and [OBJ-02 KR-02.2](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it). *(Tested · N=1.)* |

### VS-3.3 · Execute Change with Integrity

| Field | Value |
|---|---|
| **Participating stakeholders** | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (commits). The agent writes the change-set atomically via the clew CLI. |
| **Entrance criteria** | Impact previewed and accepted (VS-3.2 done). |
| **Exit criteria** | Change is applied atomically across all affected artefacts (all-or-nothing; no partial writes). · New state passes schema validation. · New state passes reference integrity validation across the full change-set, not just per-artefact. · File bindings are updated for every rewritten section (path + section anchor + new content hash). · Audit trail records the change-set as a single linked event (so the refactor is replayable as a unit). · Deterministic snapshots are regenerated for every affected artefact. |
| **Value items produced** | Applied change-set · updated audit-trail event · regenerated snapshots · preserved referential integrity across the substrate |
| **Enabling capabilities** | [C4.1 Write-time reference validation](03a-capability-map.md#c41--write-time-reference-validation) (Differentiator role at this stage; enforces integrity across the full change-set atomically) · [C2.1 Stable identifier generation](03a-capability-map.md#c21--stable-identifier-generation) (IDs preserved through rename; never recycled on retire) · [C2.2 Schema enforcement](03a-capability-map.md#c22--schema-enforcement) · [C2.3 File binding management](03a-capability-map.md#c23--file-binding-management) (bindings rewritten for every section touched) · [C2.4 Deterministic structural export](03a-capability-map.md#c24--deterministic-structural-export) (snapshots regenerated) · [C4.3 Audit trail](03a-capability-map.md#c43--audit-trail) (the change-set recorded as one replayable event) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **High**. Wave-1 [F2 finding](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md): without atomic + integrity-validated execution across the full change-set, partial refactors leave the substrate inconsistent (some files updated, some not; some IDs preserved, some lost). C4.1's write-time validation must hold across N affected artefacts in one transaction, not just one new write at a time. *(Tested · N=1.)* |

### VS-3.4 · Confirm No Drift

| Field | Value |
|---|---|
| **Participating stakeholders** | The agent (runs the post-commit drift check). [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) (reviews). |
| **Entrance criteria** | Change executed atomically (VS-3.3 done). |
| **Exit criteria** | Drift check passes for every artefact in the change-set: DB state matches markdown content hash. · No orphan markdown sections (referencing IDs the DB no longer knows). · No orphan DB records (artefacts without narrative bindings). · The original impact-preview view from VS-3.2 re-runs and now returns the new expected state (confirming the change propagated as predicted). |
| **Value items produced** | Drift-check pass record · re-run impact view confirming the new state · refactor trust certificate |
| **Enabling capabilities** | [C4.2 Drift detection](03a-capability-map.md#c42--drift-detection) (substrate-level validation) · [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) (re-run the VS-3.2 impact view against the new state to confirm the cascade propagated as predicted) |
| **Operationalised by processes** | _TODO_ |
| **Pain point index** | **Medium**. Sub-Critical because C4.1 at VS-3.3 has already enforced integrity across the change-set; this stage confirms it stuck and that no out-of-band drift was introduced between commit and audit. Stage delivers the "no silent rot afterwards" half of the value proposition (VS-3.2 delivers the "full downstream impact surfaced before commit" half). *(Tested · N=1.)* |

## Discipline checks (pass)

Per the [`business-value-stream` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-value-stream) discipline reference:

- **Naming.** Every stream name describes the final value achieved with business-object framing (Compose Architecture, Navigate Architecture, Refactor Architecture, Share Architecture). No internal-lifecycle names (no "design-to-deploy", no "draft-to-persist").
- **One value proposition per stream.** No "AND" in any of the 4 value propositions.
- **Triggering stakeholder is a persona.** All 4 streams trigger from [P-01 Ava](01a-personas.md). No system triggers, no department triggers, no scheduler triggers.
- **Stage count.** VS-1, VS-2, and VS-3 each have 4 stages (Lean). Within the 4 to 10 range.
- **Stage names are value milestones.** Each filled-stream stage names what is "true" after the stage, not the activity that ran: VS-1 (Choose Type, Load Context, Draft, Persist with Stable ID); VS-2 (Scope, Resolve, Surface Provenance, Validate); VS-3 (Identify the Change, Preview Downstream Impact, Execute Change with Integrity, Confirm No Drift). No "Run X script", no "Submit form", no "Send email".
- **Capabilities soft-linked, never inlined.** Every `Enabling capabilities` row points to an L1 ID in `03a-capability-map.md` with no definition duplication.
- **EA stance preserved.** No cycle-time fields, no value-add classification, no takt-time, no waste analysis (those would be Lean VSM, which belongs in process docs).
- **No customer-journey contamination.** No emotion fields, no channel fields, no touchpoint fields.
- **Pain index honest.** 4-level scale with one-line rationale on every stage; mix of Tested (N=1, from wave-1 evidence) and Assumed (no over-claiming). No "everything is High".

## Open Issues / Next Iterations

- **VS-4 Share Architecture** not yet stage-decomposed. Queued, lowest expected pain of the four streams: [P-02 (product partner)](01a-personas.md) is currently the only consumer and is Tier-2 / Backlog, and wave-1 did not surface a sharing pain point because Ava is currently the sole developer and user.
- **Skill-maintainer persona missing.** Until [`01a-personas.md`](01a-personas.md) defines a "skill catalogue maintainer" persona, the "Extend Methodology Catalogue" candidate stream cannot be modelled without violating the persona-trigger discipline.
- **Process doc gap.** Every stage's `Operationalised by processes` row is `_TODO_`. Wiring requires `05a-processes/` artefacts authored via the `business-process` skill. Suggested next sequence after VS-2 / VS-3 / VS-4 fill: process docs for VS-1.2 (Load Context), VS-1.3 (Draft), VS-1.4 (Persist).
- **Pain-index honesty audit.** VS-1.4 Critical, VS-1.3 High, and VS-1.2 Medium are evidence-backed (N=1, wave 1). VS-1.1 Low is Assumed. If wave 2 surfaces that artefact-type selection IS a friction (e.g., the catalogue becomes too large to navigate as more skills ship), revisit VS-1.1.
- **External-validation gap.** All pain ratings are anchored on N=1 (founder-as-instance). Wave-2 interviews should re-test the pain ranking across at least one non-product role (QA, DevOps, SRE) per [OBJ-03 KR-03.2](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling); the ranking may shift materially.

## Changelog

| Date | Change | Evidence | Cascading effects |
|---|---|---|---|
| 2026-05-25 | Fill VS-3 Refactor Architecture (4 Lean stages: Identify the Change → Preview Downstream Impact → Execute Change with Integrity → Confirm No Drift). Overall pain index **Critical** (inherits from VS-3.2 Preview Downstream Impact, where the wave-1 magic-wand finding applies to changes rather than to creation). Per-stage pain: VS-3.1 Low (Assumed), VS-3.2 Critical (Tested · N=1, the value-gating stage), VS-3.3 High (Tested · N=1, F2 finding applied to atomic execution across N affected artefacts), VS-3.4 Medium (Tested · N=1, post-commit confirmation). Catalogue row updated: scope anchor extended beyond C4 + C2.3 to include C3.1 + C3.2 (impact preview uses the query layer; VS-3.2 is VS-2 turned forward into a planned change) + C2.1 + C2.2 + C2.4 + C4.3 (write-side substrate); pain index now Critical. §Discipline checks updated to cover VS-1 + VS-2 + VS-3. §Open Issues: VS-3 removed from queue. Differentiator-role flags applied at C3.2 (VS-3.2) and C4.1 (VS-3.3) to mark stages where their Differentiator value is realised. | Drafted from VS-1 + VS-2 patterns + wave-1 magic-wand finding turned forward into a change-foreseeing application + F2 finding applied to atomic multi-artefact execution + Lean Canvas §3 Concrete win 2 ("rename catches drift at write-time"). | [03a-capability-map.md](03a-capability-map.md): 9 capabilities gain additional VS-3 backlinks appended to existing soft-links (C2.1, C2.2, C2.3, C2.4, C3.1, C3.2, C4.1, C4.2, C4.3). No new first-time backlinks (all consumed capabilities already wired from VS-1 / VS-2). [04b-objectives.md](04b-objectives.md): OBJ-01 KR-01.4 fully realised via VS-3.2 + VS-3.4; OBJ-02 KR-02.2 (substrate-under-change) realised. [02a-lean-canvas.md](02a-lean-canvas.md): §3 Concrete win 2 promoted from "partially realised at VS-1.4" to "fully realised at VS-3.2 + VS-3.3". [01a-personas.md](01a-personas.md): P-01 §Key Tasks bullet 4 (refactor with confidence) promoted from catalogued to filled. Cascade companion commits to follow. |
| 2026-05-25 | Fill VS-2 Navigate Architecture (4 Lean stages: Scope the Question → Resolve from Canonical Source → Surface Provenance → Validate Against Current State). Overall pain index **Critical** (inherits from VS-2.2 Resolve, the wave-1 trust-threshold stage). Per-stage pain: VS-2.1 Low (Assumed), VS-2.2 Critical (Tested · N=1, user trust threshold), VS-2.3 Medium (Tested · N=1, bidirectional time traceability), VS-2.4 High (Tested · N=1, F2 integrity finding). Catalogue row updated: scope anchor extended beyond C3 to include cross-cutting capabilities (C2.1 + C2.3 + C1.3 + C4.2 + C4.3); pain index now Critical. §Discipline checks updated to cover VS-1 + VS-2. §Open Issues: VS-2 removed from queue; VS-3 noted as natural next decomposition because its impact-preview stage essentially runs VS-2 forward into a planned change. | Drafted from VS-1 patterns + wave-1 trust-threshold finding (canonical traceability matrix as deterministic value) + F2 integrity finding (drift validation makes the answer trustworthy) + C3.3 bidirectional time traceability for the provenance stage. | [03a-capability-map.md](03a-capability-map.md): 8 capabilities now reachable from VS-2 stages (4 first-time backlinks: C3.1, C3.2, C3.3, C4.2; 4 additional backlinks: C1.3, C2.1, C2.3, C4.3 already wired from VS-1 stages). Cascade follow-up: capability-map, objectives, lean-canvas, personas updates in companion commits. |
| 2026-05-25 | Scaffold + build catalogue + fill VS-1 in one pass. Catalogue: 4 streams (VS-1 Compose Architecture, VS-2 Navigate Architecture, VS-3 Refactor Architecture, VS-4 Share Architecture), all triggered by [P-01 Ava](01a-personas.md). VS-1 fully filled with 4 Lean stages (Choose Type → Load Context → Draft → Persist with Stable ID); VS-2 / VS-3 / VS-4 catalogue rows only with `_TODO_` decomposition. Fifth candidate ("Extend Methodology Catalogue") deferred pending a skill-maintainer persona. Per-stage pain index: mix of Tested (N=1, wave 1) on stages 1.2 / 1.3 / 1.4 and Assumed on 1.1. Process links `_TODO_` everywhere (no `05a-processes/` artefacts yet). | Drafted from [VISION.md](../VISION.md), [P-01 §Goals + §Key Tasks](01a-personas.md), [03a-capability-map.md](03a-capability-map.md), and the [wave-1 P-01 synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (F1, F2, magic-wand). Per the [`business-value-stream` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-value-stream). | [03a-capability-map.md](03a-capability-map.md): 12 capabilities now have a `Realised in streams:` cousin (C1.1, C1.2, C1.3, C2.1, C2.2, C2.3, C2.4, C4.1, C4.3, C5.1, C5.2, C5.3) → backlink cascade recommended. [`04b-objectives.md`](04b-objectives.md): OBJ-01 / OBJ-02 `VS-_TODO_` slots can now backfill to VS-1. [`02a-lean-canvas.md`](02a-lean-canvas.md): §3 UVP + §5 Channels `VS-_TODO_` slots can now backfill. [`01a-personas.md`](01a-personas.md): P-01 §Key Tasks gains a backlink target (the four streams correspond to four of Ava's five Key Tasks). |
