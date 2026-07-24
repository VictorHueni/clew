---
title: Metamodel — Relationship Catalogue
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Relationship Catalogue

> Part of [The Metamodel](README.md). The canonical list of every **typed edge** the metamodel
> allows — the human-readable form of clew's `ALLOWED_RELATIONSHIPS`, validated at write time before
> any `artefact_references` row is written.

> **Source of truth (transitional).** Per
> [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) this
> page is the canonical home for the relationship vocabulary. An identical transcription currently
> also lives in [`artefact-store.md` §Relationship registry](../domain/07b-models/artefact-store.md#relationship-registry);
> that copy will be reduced to a pointer here (OI-0055) — **not done yet**, so for now treat this page
> and that registry as the same list. Eventually both, plus clew's runtime config, generate from one
> machine-readable spec.

## How to read

- **Verb** — the relationship type clew stores in `artefact_references.relationship` (e.g. `TRIGGERS`).
- **Source → Target** — the directed edge in clew's snake_case artefact types. The edge means *Source
  relates to Target*; the FK lives on neither endpoint as a column — it is a row in `artefact_references`.
- **Card.** — cardinality: `1:1`, `1:N`, `N:1`, `N:M`, `N:0..1`.
- **Strength** — `hard` = a structural metamodel dependency, type-pair enforced, part of end-to-end
  traceability (solid edge on the diagrams); `soft` = advisory enrichment or a generic cross-link
  (dashed / lowercase on the diagrams), type-pair advisory.
- **Role** — optional edge annotation vocabulary (e.g. `Differentiator` on a `CONSUMES` edge).
- **⚠** — verb/direction introduced in the first full transcription of the metamodel ER; **propose
  only** — ratify the exact name + direction against clew's `ALLOWED_RELATIONSHIPS` (`crud.py`) when
  that lands. The six un-marked verbs (`TRIGGERS`, `CONSUMES`, `REALIZES`, `GROUPS`, `INFORMS`,
  `REFERENCES`) are the established baseline.

**Totals:** 42 typed relationships + 1 generic catch-all — 23 `hard`, 20 `soft`.

For the **per-package** view (each package's incoming/outgoing edges, grouped), see the boundary
table on each [package page](packages/). This catalogue is the flat master list.

## The catalogue

| Verb | Source → Target | Card. | Strength | Role | Meaning |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `TRIGGERS` | `persona` → `value_stream` | 1:N | hard | — | Persona triggers a value stream |
| `SEGMENTS` ⚠ | `persona` → `canvas` | N:M | hard | Customer Segment | Persona populates a BMC/Lean Customer-Segment block |
| `RESOURCES` ⚠ | `capability` → `canvas` | N:M | soft | Key Resources | Capability appears as a BMC Key Resource |
| `CONSUMES` | `vs_stage` → `capability` | N:M | hard | `Differentiator`, `Necessary` | VS stage consumes a capability |
| `OPERATIONALISES` ⚠ | `process` → `vs_stage` | N:1 | hard | — | Process operationalises a VS stage |
| `QUANTIFIES` ⚠ | `quantitative_model` → `canvas` | N:M | hard | Revenue, Cost | Model quantifies BMC Revenue/Cost |
| `TARGETS` ⚠ | `competitor` → `persona` | N:M | soft | ICP | Competitor's ICP maps to a persona |
| `POSITIONS_AGAINST` ⚠ | `competitor` → `canvas` | N:M | soft | Value Proposition | Competitive positioning informs the BMC/Lean VP block |
| `COMPETES_ON` ⚠ | `competitor` → `capability` | N:M | soft | Value-curve axis | Competitor rated against a capability on the value curve |
| `BENCHMARKS` ⚠ | `competitor` → `quantitative_model` | N:M | soft | pricing, market size | Competitor pricing / market-sizing data feeds a model |
| `MEASURES` ⚠ | `objective` → `key_result` | 1:N | hard | — | Objective measured by its key results |
| `INFORMS` | `objective` → `vs_stage` | N:M | soft | — | Objective informs a VS stage (pain-index link) |
| `ADDRESSES` ⚠ | `objective` → `persona` | N:M | soft | — | Objective serves a persona's outcomes |
| `SERVES` ⚠ | `epic` → `objective` | N:M | soft | — | Epic serves an objective (Objective×Epic matrix) |
| `GROUPS_INTO` ⚠ | `capability` → `bounded_context` | N:1 | hard | — | Capabilities group into a bounded context |
| `GROUNDS_BC` ⚠ | `persona` → `bounded_context` | N:M | soft | ubiquitous language | Persona grounds a BC's language |
| `SIGNALS` ⚠ | `vs_stage` → `bounded_context` | N:M | soft | boundary signal | VS-stage boundary signals a BC boundary |
| `SCOPES` ⚠ | `bounded_context` → `glossary_term` | 1:N | hard | — | BC scopes its glossary terms |
| `MODELS` ⚠ | `bounded_context` → `domain_model` | 1:1 | hard | — | One domain model per BC |
| `EMITS` ⚠ | `aggregate` → `domain_event` | 1:N | hard | — | Aggregate produces domain events |
| `NAMES` ⚠ | `glossary_term` → `aggregate` | N:M | soft | — | Entity/aggregate names match glossary terms |
| `INHERITS` ⚠ | `fbs_functionality` → `capability` | N:1 | hard | — | FBS inherits L0/L1 (also encoded in `C-N.M.FXX`) |
| `REALIZES` | `fbs_functionality` → `vs_stage` | N:M | hard | `Differentiator` | Functionality realises a VS stage |
| `BECOMES` ⚠ | `fbs_functionality` → `aggregate` | N:M | hard | — | Functionalities become domain aggregates/entities |
| `GROUPS` | `epic` → `fbs_functionality` | 1:N | hard | — | Epic groups FBS functionalities |
| `ACTOR_OF` ⚠ | `persona` → `use_case` | 1:N | hard | — | Persona is a use case's primary actor |
| `COVERS` ⚠ | `use_case` → `fbs_functionality` | N:M | hard | — | Use case covers (realises) functionalities |
| `SPECIFIES` ⚠ | `epic` → `prd` | 1:1 | hard | — | One PRD per epic |
| `GROUNDS` ⚠ | `use_case` → `prd` | 1:N | hard | — | Use case grounds PRD acceptance criteria |
| `CONSTRAINS` ⚠ | `quality_attribute` → `prd` | 1:N | hard | — | QA appears in PRD acceptance criteria |
| `GROUNDS_QA` ⚠ | `persona` → `quality_attribute` | N:M | soft | IC, PE | Persona grounds IC/PE quality attributes |
| `DRIVES` ⚠ | `fbs_functionality` → `quality_attribute` | N:M | soft | `Differentiator` | Differentiator FBS drives Reliability QAs |
| `DETAILS` ⚠ | `prd` → `implementation_plan` | 1:1 | hard | — | One implementation plan per PRD |
| `REFERENCES_DM` ⚠ | `prd` → `aggregate` | N:M | soft | — | PRD references AGG/EVT IDs |
| `EXPOSES` ⚠ | `domain_model` → `interface_contract` | N:M | hard | — | Aggregates/events become contract resources |
| `CONTAINS` ⚠ | `cli_surface` → `cli_command` | 1:N | hard | — | CLI surface contains commands |
| `MAPS_TO` ⚠ | `cli_command` → `fbs_functionality` | N:M | hard | — | Command maps to a functionality |
| `WRAPS` ⚠ | `cli_command` → `interface_contract` | N:M | soft | — | Command wraps CTR calls |
| `DECIDES` ⚠ | `adr` → `quality_attribute` | N:M | soft | — | ADR decision informs QA (Security/Flexibility) |
| `DECIDES` ⚠ | `adr` → `prd` | N:M | soft | — | ADR decision informs PRD architecture |
| `GOVERNS` ⚠ | `adr` → `interface_contract` | N:M | soft | versioning, auth | ADR governs contract versioning/auth |
| `GRADUATES_TO` ⚠ | `idea` → `persona` / `objective` / `canvas` / `process` / `research` / `adr` / `fbs_functionality` / `prd` | N:0..1 | soft | — | One-way; target carries **no** back-FK (recorded in target body text). `research` is a graduation target only, not a persisted entity — here it means Discovery's ID-less `research` notes, distinct from the Architecture package's `research` type, which does mint `Research-NNNN` |
| `REFERENCES` | `any` → `any` | N:M | soft | (free text) | Generic catch-all cross-link; no type constraint |

## Flagged judgment calls

Carried over from the source transcription — resolve when clew's `ALLOWED_RELATIONSHIPS` is authored:

1. **⚠ verbs are proposals.** Only the six baseline verbs are ratified; every ⚠ row is a best-effort
   transcription of the metamodel ER and must be confirmed (verb name + direction) in `crud.py`.
2. **Granularity.** This catalogue uses clew's fine-grained types (`vs_stage`, `aggregate`,
   `domain_event`, `key_result`, `cli_command`) where the entity-level ER drew the parent
   (`value_stream`, `domain_model`); edges are mapped to the granular type.
3. **`GRADUATES_TO` is asymmetric** — the ID lives only on `idea.target_id`; the target carries no
   `IDEA_NNNN` FK column (`N:0..1`).
4. **`DECIDES` has two type-pairs** (`adr→quality_attribute`, `adr→prd`); `crud.py` must allow
   multiple `(source,target)` pairs per verb.
5. **`vision` edges omitted.** `vision` is a singleton with no minted ID; its "audience scope /
   operationalised by" links are advisory and stated in `VISION.md` prose, not enforced here.
6. **v1 scope.** Edges touching types not yet in clew's persisted set (`competitor`, `use_case`,
   `interface_contract`, `cli_surface`/`cli_command`, the domain sub-types) are inert until those
   types are added to the property schemas.

*Full provenance and the property-schema scope notes live in
[`artefact-store.md`](../domain/07b-models/artefact-store.md#registry-open-items--flagged-judgment-calls).*

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0074 | decision-gap | Relationship-catalogue ratification debt: 37 ⚠ proposed verbs; hard edges on ID-less endpoints (`SEGMENTS` / `OPERATIONALISES` / `QUANTIFIES` touch `canvas` blocks and `process`, which mint no enforceable IDs); 1:N side-binding semantics unstated (which endpoint carries the constraint); the `REALIZES`/"realise" verb overload across catalogue and prose; the canvas block-ID pattern `[A-Z]{2}-NN` collides with other two-letter ID families (`CO-NN`, `GT-NN`, …); and mixed-case `Plan-`/`Research-` ID formats sit beside all-caps families. All to ratify in one pass when `ALLOWED_RELATIONSHIPS` (`crud.py`) is authored. 2026-07-24: [ADR-0016](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) now decides the edge-metadata shape the ratification must target — a JSON property bag on `artefact_references` carrying the proposed/validated/rejected review lifecycle. | #flagged-judgment-calls | Flagged judgment calls | Author `ALLOWED_RELATIONSHIPS`; ratify or amend every ⚠ verb + direction, decide the ID-less-endpoint and side-binding rules, resolve the block-ID collision and ID-case conventions; update this catalogue and `artefact-store.md` §Relationship registry together, targeting ADR-0016's property-bag edge schema. | high | open | Victor Hueni | 2026-10-31 | _TBD_ |
| OI-0078 | execution-item | Extend the metamodel registry with layer-package + prerequisite-DAG fields — per-type `package` and `requires` — clew-side first, then sync the kit projection per the [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) chain. Required by [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md)'s guide-and-scaffold enablement mechanism: per-type opt-in needs package membership and prerequisites persisted as registry data, not prose. | #the-catalogue | The catalogue | Add `package` + `requires` fields to the clew-owned registry (`docs/metamodel/` packages pages + this catalogue's per-type data); then sync the kit projection (`artefact-types-registry.yaml`) per the ADR-0008 ownership chain. | high | open | Victor Hueni | 2026-09-30 | _TBD_ |
