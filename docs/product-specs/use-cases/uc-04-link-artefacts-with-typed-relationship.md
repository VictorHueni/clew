---
type: Use Case
title: "UC-04 — Link two artefacts with a typed, validated relationship"
description: "Ava (via her agent) asserts a typed relationship between two persisted artefacts; the system refuses anything dangling, type-invalid, or cardinality-breaking, and records the accepted edge as an authored fact with provenance."
tags: [product-specs, use-case, cross-referencing]
timestamp: 2026-07-25T08:19:14Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-25
review_interval: 180d
---

# UC-04 — Link two artefacts with a typed, validated relationship

> Methodology: the kit's `spec-use-case/references/methodology.md` (Cockburn fully-dressed format, deliberately short — the goal is narrow but the refusal behaviour is the product). Command signatures, the relationship table, and the error catalogue live in the [CLI contract](../../architecture/interfaces/cli-clew.md) and are cited, never restated.

| Field | Value |
|---|---|
| **Scope** | system — the clew CLI + artefact store ([BC-01](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)) |
| **Level** | user-goal 🌊 — standalone when wiring or re-wiring existing artefacts (P-01 [§Key Tasks](../../business/01a-personas.md#key-tasks) #2: "connect artefacts" is its own sitting, e.g. wiring an epic to its 25 functionalities). The same behaviour also runs as a *step inside* [UC-01](uc-01-persist-artefact-with-write-time-integrity.md)/[UC-02](uc-02-refactor-artefact-with-foreseen-impact.md) — kept sea-level because it carries standalone value, not only reuse |
| **Primary Actor** | [P-01 Ava](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) — the agent executes at her direction; the direction is what makes the edge an *authored* fact |
| **Supporting Actors** | none (local-first) |
| **Realises** | [C5.4.F01, C5.4.F02](../07a-fbs.md#c54--cross-methodology-referencing) · [C4.1.F01, C4.1.F03](../07a-fbs.md#c41--write-time-reference-validation) |

## Stakeholders and Interests

- **P-01 Ava** — the relationship she means is the relationship recorded: right endpoints, right verb, right direction; never a paraphrase living only in prose.
- **The executing agent** — the allowed-verb and type-constraint rules are enforced, not memorised; a wrong guess produces a correcting error, not a corrupt graph.
- **Every read surface and future write** — `impact`/`trace`/`matrix` results and retire refusals are only as complete as the edge set; a missing or mistyped edge here is an invisible hole in every downstream answer ([UC-02](uc-02-refactor-artefact-with-foreseen-impact.md)'s foresight depends on this use case's discipline).
- **The substrate ([OBJ-02](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it))** — the fact set stays exactly the validated + authored subset ([ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)); agent speed never contaminates it.

## Preconditions

- The store is initialised; both intended endpoints are persisted facts ([UC-01](uc-01-persist-artefact-with-write-time-integrity.md) completed for each).

## Guarantees

- **Minimal guarantees** (hold even on failure):
  - No edge is written on any rejection — a dangling, type-invalid, or cardinality-breaking edge is **never representable**, not even transiently.
  - Every rejection names the violated constraint and the resolution path ([§7](../../architecture/interfaces/cli-clew.md#7-error-contract)).
- **Success guarantees**:
  - The edge exists as an authored fact — `validation_status = validated`, `confidence = stated`, with any rationale and source captured in the property bag ([§2 Relationship group](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link), [ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)).
  - The edge is immediately visible to every read surface and enforced by every future write (it will appear in impact sets and back retire refusals from this moment on).

## Trigger

Ava decides two persisted artefacts stand in a typed relationship — an epic groups a functionality, a persona triggers a value stream, an epic is specified by a PRD.

## Main Success Scenario

1. Ava names the relationship: source artefact, verb, target artefact — optionally with a role, a rationale, and a source document.
2. The agent submits it through the relationship surface ([§2](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link)).
3. The system verifies both endpoints exist in the store.
4. The system verifies the verb is known, the source/target types are allowed for it, and its cardinality constraints still hold.
5. The system records the edge atomically as an authored fact with its provenance fields.
6. The relationship now answers for itself everywhere: in lineage and impact views, in the matrix, and as a guard against retiring either endpoint unnoticed.

## Extensions

- **2a.** No store exists: as [UC-01 extension 2a](uc-01-persist-artefact-with-write-time-integrity.md#extensions) — initialise, resume.
- **2b.** The store is locked: as [UC-01 extension 3a](uc-01-persist-artefact-with-write-time-integrity.md#extensions) — serialised wait, then proceed.
- **3a.** An endpoint identifier does not exist (`unknown-id`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **3a1.** A typo or paraphrased ID: the agent corrects it and resumes at 2.
  - **3a2.** The endpoint genuinely is not persisted yet: run [UC-01](uc-01-persist-artefact-with-write-time-integrity.md) for it first, then resume. The prose habit of "linking" to something that does not exist is precisely what this refusal kills.
- **4a.** The verb is unknown (`unknown-relationship`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **4a1.** The rejection lists the known verbs; the agent picks the right one and resumes at 2.
  - **4a2.** The relationship Ava means genuinely has no verb: a new verb is a **metamodel change** — routed through the [relationship catalogue](../../metamodel/relationships.md) and the [OI-0074](../../../project-control/open-items/open-items.md) ratification discipline, never invented ad hoc at link time. Meanwhile the generic `REFERENCES` verb is the sanctioned escape hatch if the connection must be recorded today.
- **4b.** The endpoint types are disallowed for the verb (`type-constraint`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **4b1.** The rejection names expected vs actual; Ava decides whether the verb, the direction, or an endpoint is wrong; correct and resume at 2.
- **4c.** The verb's cardinality is already saturated (`cardinality-violation`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) — e.g. `SPECIFIES` is 1:1 and the epic already has a PRD):
  - **4c1.** The rejection names the existing edge. If the intent is *replacement*, that is a refactor — re-pointing via [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md) with its impact preview — not a second link.
- **5a.** An identical edge already exists:
  - **5a1.** Behaviour is an open contract decision — idempotent no-op vs `duplicate-edge` error ([OI-0085](../../../project-control/open-items/open-items.md), to be decided in PRD-0001 and recorded in the contract). Either way the graph ends in the same state; only the exit signal differs.
- **5b.** The edge is the agent's own *inference*, not Ava's direction (the agent noticed a plausible connection while reading):
  - **5b1.** It must **not** be linked as a fact — authored means operator-directed. In v1 the agent surfaces the suggestion to Ava; if she confirms, it *becomes* stated and proceeds at 2. The quarantined-proposal lifecycle (`--propose`, review) is the reserved E-05 surface for exactly this ([ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)); until it ships, unconfirmed inferences stay in prose.

## Related Information

- **Value-stream stages:** [VS-1.3](../../business/04a-value-streams.md#vs-13--draft-artefact-content) (relationships identified) → [VS-1.4](../../business/04a-value-streams.md#vs-14--persist-with-stable-id) (validated at persist); re-wiring is [VS-3.3](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity) territory.
- **Epic / PRD:** [E-01](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence); grounds PRD-0001 stories via `Covers: UC-04`.
- **Open decisions touching this contract:** [OI-0074](../../../project-control/open-items/open-items.md) (verb-set ratification — the allowed table is pre-ratification) · [OI-0085](../../../project-control/open-items/open-items.md) (duplicate-edge semantics).
- **Frequency:** constant — every persist with references runs steps 3–5 implicitly; standalone wiring sessions (epic↔functionality, PRD↔epic) run it in bulk.
- **Siblings:** [UC-01](uc-01-persist-artefact-with-write-time-integrity.md) · [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md) · [UC-03](uc-03-detect-and-reconcile-drift.md) · UC-05 rebuild (planned).

## Use-Case 2.0 Slices

_Populated by the `slice` mode. The basic flow is the first slice; each alternative flow becomes a further slice. Every slice needs a test case._

| Slice | Narrative | Test case(s) | Status |
|---|---|---|---|
| UC-04.S1 | Basic flow (main success scenario) | _TBD (with PRD-0001)_ | ⬜ |
