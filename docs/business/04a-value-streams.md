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
| VS-2 | Navigate Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | An authoritative cross-artefact answer in seconds, not hours of grep. | C3 (Querying and Traceability) | _TODO_ (queued; not yet stage-decomposed) |
| VS-3 | Refactor Architecture | [P-01 Ava](01a-personas.md#p-01--ava-the-agent-first-product-engineer) | Full downstream impact surfaced before commit; no silent rot afterwards. | C4 (Integrity and Audit) + C2.3 (file binding) | _TODO_ (queued) |
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

## Discipline checks (pass)

Per the [`business-value-stream` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-value-stream) discipline reference:

- **Naming.** Every stream name describes the final value achieved with business-object framing (Compose Architecture, Navigate Architecture, Refactor Architecture, Share Architecture). No internal-lifecycle names (no "design-to-deploy", no "draft-to-persist").
- **One value proposition per stream.** No "AND" in any of the 4 value propositions.
- **Triggering stakeholder is a persona.** All 4 streams trigger from [P-01 Ava](01a-personas.md). No system triggers, no department triggers, no scheduler triggers.
- **Stage count.** VS-1 has 4 stages (Lean). Within the 4 to 10 range.
- **Stage names are value milestones.** Each VS-1 stage names what is "true" after the stage, not the activity that ran (Choose Type, Load Context, Draft, Persist with Stable ID). No "Run X script", no "Submit form", no "Send email".
- **Capabilities soft-linked, never inlined.** Every `Enabling capabilities` row points to an L1 ID in `03a-capability-map.md` with no definition duplication.
- **EA stance preserved.** No cycle-time fields, no value-add classification, no takt-time, no waste analysis (those would be Lean VSM, which belongs in process docs).
- **No customer-journey contamination.** No emotion fields, no channel fields, no touchpoint fields.
- **Pain index honest.** 4-level scale with one-line rationale on every stage; mix of Tested (N=1, from wave-1 evidence) and Assumed (no over-claiming). No "everything is High".

## Open Issues / Next Iterations

- **VS-2 Navigate Architecture** not yet stage-decomposed. Queued for the next iteration. Expected pain anchor: the stage where [C3.2 Pre-built traceability views](03a-capability-map.md#c32--pre-built-traceability-views) delivers the wave-1 trust-threshold demo (the deterministic traceability matrix).
- **VS-3 Refactor Architecture** not yet stage-decomposed. Queued. Expected pain anchor: the rename / re-tier / retire stage, where [C4.1](03a-capability-map.md#c41--write-time-reference-validation) and [C2.3](03a-capability-map.md#c23--file-binding-management) jointly determine whether impact is surfaced before commit (Critical) or after (rot).
- **VS-4 Share Architecture** not yet stage-decomposed. Queued, lowest priority of the three deferred streams: [P-02 (product partner)](01a-personas.md) is currently the only consumer and is Tier-2 / Backlog.
- **Skill-maintainer persona missing.** Until [`01a-personas.md`](01a-personas.md) defines a "skill catalogue maintainer" persona, the "Extend Methodology Catalogue" candidate stream cannot be modelled without violating the persona-trigger discipline.
- **Process doc gap.** Every stage's `Operationalised by processes` row is `_TODO_`. Wiring requires `05a-processes/` artefacts authored via the `business-process` skill. Suggested next sequence after VS-2 / VS-3 / VS-4 fill: process docs for VS-1.2 (Load Context), VS-1.3 (Draft), VS-1.4 (Persist).
- **Pain-index honesty audit.** VS-1.4 Critical, VS-1.3 High, and VS-1.2 Medium are evidence-backed (N=1, wave 1). VS-1.1 Low is Assumed. If wave 2 surfaces that artefact-type selection IS a friction (e.g., the catalogue becomes too large to navigate as more skills ship), revisit VS-1.1.
- **External-validation gap.** All pain ratings are anchored on N=1 (founder-as-instance). Wave-2 interviews should re-test the pain ranking across at least one non-product role (QA, DevOps, SRE) per [OBJ-03 KR-03.2](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling); the ranking may shift materially.

## Changelog

| Date | Change | Evidence | Cascading effects |
|---|---|---|---|
| 2026-05-25 | Scaffold + build catalogue + fill VS-1 in one pass. Catalogue: 4 streams (VS-1 Compose Architecture, VS-2 Navigate Architecture, VS-3 Refactor Architecture, VS-4 Share Architecture), all triggered by [P-01 Ava](01a-personas.md). VS-1 fully filled with 4 Lean stages (Choose Type → Load Context → Draft → Persist with Stable ID); VS-2 / VS-3 / VS-4 catalogue rows only with `_TODO_` decomposition. Fifth candidate ("Extend Methodology Catalogue") deferred pending a skill-maintainer persona. Per-stage pain index: mix of Tested (N=1, wave 1) on stages 1.2 / 1.3 / 1.4 and Assumed on 1.1. Process links `_TODO_` everywhere (no `05a-processes/` artefacts yet). | Drafted from [VISION.md](../VISION.md), [P-01 §Goals + §Key Tasks](01a-personas.md), [03a-capability-map.md](03a-capability-map.md), and the [wave-1 P-01 synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (F1, F2, magic-wand). Per the [`business-value-stream` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-value-stream). | [03a-capability-map.md](03a-capability-map.md): 11 capabilities now have a `Realised in streams:` cousin (C1.1, C1.2, C1.3, C2.1, C2.2, C2.3, C2.4, C4.1, C4.3, C5.1, C5.2, C5.3) → backlink cascade recommended. [`04b-objectives.md`](04b-objectives.md): OBJ-01 / OBJ-02 `VS-_TODO_` slots can now backfill to VS-1. [`02a-lean-canvas.md`](02a-lean-canvas.md): §3 UVP + §5 Channels `VS-_TODO_` slots can now backfill. [`01a-personas.md`](01a-personas.md): P-01 §Key Tasks gains a backlink target (the four streams correspond to four of Ava's five Key Tasks). |
