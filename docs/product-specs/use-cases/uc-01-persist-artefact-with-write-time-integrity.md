---
type: Use Case
title: "UC-01 — Persist a new artefact with write-time integrity"
description: "Ava (via her agent) turns a drafted artefact into a persisted, typed fact with a system-issued stable ID, with every reference validated at write time and no partial write ever surviving failure."
tags: [product-specs, use-case, id-generation]
timestamp: 2026-07-24T19:46:08Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# UC-01 — Persist a new artefact with write-time integrity

> Methodology: the kit's `spec-use-case/references/methodology.md` (Cockburn fully-dressed format). This file is the behavioural contract; command signatures, output shapes, and the error catalogue live in the [CLI contract](../../architecture/interfaces/cli-clew.md) and are cited, never restated.

| Field | Value |
|---|---|
| **Scope** | system — the clew CLI + artefact store ([BC-01](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)); the documentation layer is touched only through bindings |
| **Level** | user-goal 🌊 (one sitting: from drafted content to a referenceable fact, minutes) |
| **Primary Actor** | [P-01 Ava](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) — the agent executes on her behalf; Ava owns the goal |
| **Supporting Actors** | none (local-first: no external service participates, per P-01 §System Needs) |
| **Realises** | [C2.1.F02, C2.1.F03](../07a-fbs.md#c21--stable-identifier-generation) · [C2.2.F01–F04](../07a-fbs.md#c22--schema-enforcement) · [C2.3.F01, C2.3.F02, C2.3.F03](../07a-fbs.md#c23--file-binding-management) · [C4.1.F01, C4.1.F03](../07a-fbs.md#c41--write-time-reference-validation) · [C5.4.F01](../07a-fbs.md#c54--cross-methodology-referencing) |

## Stakeholders and Interests

- **P-01 Ava** — the drafted thinking becomes a referenceable fact she can build on next session; nothing she persists can silently break what already exists.
- **The executing agent** — every rejection is structured and actionable enough to self-correct without guesswork ([P-01 §System Needs](../../business/01a-personas.md#system-needs): immediate feedback on broken links; scriptable end-to-end).
- **Future readers (humans and agents)** — every persisted fact is reachable by a stable identifier that never changes and is never reused, so references written today still resolve after any refactor.
- **The substrate itself ([OBJ-02](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it))** — 100% reference integrity between artefact records at write time (KR-02.1); the same input always produces the same persisted record (KR-02.4). Any tolerance below 100% here is a tolerance for silent rot.

## Preconditions

- The artefact store is initialised for this repo (else extension 2a).
- The artefact body is drafted and schema-conformant in intent, with cross-artefact reference targets identified by ID ([VS-1.3](../../business/04a-value-streams.md#vs-13--draft-artefact-content) exit criteria).

## Guarantees

- **Minimal guarantees** (hold even on failure):
  - No partial write ever persists — on any rejection or internal error, the store is unchanged and no identifier has been consumed ([CLI contract §5 Atomicity](../../architecture/interfaces/cli-clew.md#5-output-contract), §4 transaction ordering).
  - Every rejection names the rule broken and the path to resolution ([§7 error contract](../../architecture/interfaces/cli-clew.md#7-error-contract)); the structured-output channel stays clean for the agent to parse.
  - A dangling reference is never representable in the store — not on success, not on failure ([ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) composition note).
- **Success guarantees**:
  - The artefact exists as a typed record with a system-issued stable identifier, printed for the caller; the identifier is never reused, even if the artefact is later retired.
  - Every reference declared at persist time resolves to an existing artefact of an allowed type — the store-side 100% ([§5 integrity boundary](../../architecture/interfaces/cli-clew.md#5-output-contract)).
  - The artefact's location in the documentation layer is recorded as a file binding (path + section anchor, hash pending first `clew check`), so the fact is drillable to its narrative ([ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md)).

## Trigger

Ava decides a drafted artefact (a persona, capability, objective, PRD, embedded user story, …) should become a persisted fact of the architecture.

## Main Success Scenario

1. Ava directs the agent to persist the drafted artefact as a chosen registered type.
2. The agent submits the artefact — type, properties, declared references, target file — through the CLI's creation surface ([§2 Creation group](../../architecture/interfaces/cli-clew.md#2-command-catalogue)).
3. The system opens a single write transaction, serialised against any concurrent writer ([§1 conventions](../../architecture/interfaces/cli-clew.md#1-overview), [ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md)).
4. The system validates the target file location against the type's canonical layout rule ([§4](../../architecture/interfaces/cli-clew.md#4-validation-rules)).
5. The system validates the properties against the type's schema — required fields, types, constrained values.
6. The system validates every declared reference: the target exists, and its type is allowed for that relationship.
7. The system mints the next stable identifier from the type's system-managed sequence and records the file binding for the artefact's section ([§4 transaction ordering](../../architecture/interfaces/cli-clew.md#4-validation-rules), [ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md) anchor derivation).
8. The system commits the transaction atomically and returns the minted identifier to the caller ([§5 output contract](../../architecture/interfaces/cli-clew.md#5-output-contract)).
9. The agent writes the narrative section under the identifier-titled heading in the bound file; store↔prose reconciliation is deliberately deferred to check-time ([§5 integrity boundary](../../architecture/interfaces/cli-clew.md#5-output-contract) — see UC-03, planned).

## Extensions

- **2a.** No artefact store exists in this repo (`not-initialised`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **2a1.** The agent initialises the store ([§2 Bootstrap group](../../architecture/interfaces/cli-clew.md#2-command-catalogue)) and resumes at step 2.
- **2b.** The requested type is not registered in the metamodel:
  - **2b1.** The system rejects the write; the agent discovers the registered types and their layout rules (`clew layout`, [§2](../../architecture/interfaces/cli-clew.md#2-command-catalogue)).
  - **2b2.** Ava either picks a registered type or — for types belonging to a not-yet-enabled layer package — defers to package enablement ([ADR-0015](../../architecture/decisions/adr-0015-opt-in-layer-packages.md); enablement surface pending [OI-0081](../../../project-control/open-items/open-items.md)). Use case ends unfulfilled; store unchanged.
- **2c.** The submission supplies a pre-chosen identifier instead of letting the system mint one:
  - **2c1.** The system rejects it — identifiers are system-issued only, never caller-invented ([C2.1.F03](../07a-fbs.md#c21--stable-identifier-generation); *agents write prose, only clew creates facts*). The agent resubmits without the identifier; resume at 2.
- **3a.** Another writer holds the store (`db-locked`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **3a1.** The engine serialises the request within the bounded busy-timeout; the invocation waits, then proceeds at 4.
  - **3a2.** The timeout is exceeded: the invocation fails as an internal error, store unchanged; the agent retries after the competing write completes.
- **4a.** The target file violates the type's layout rule (`layout-violation`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **4a1.** The rejection names the required location; the agent corrects the target and resumes at 2.
- **4b.** The type is one-file-per-artefact and the computed file already exists (`file-exists`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **4b1.** The agent checks whether the artefact was already persisted in a prior session (`clew list` / `clew where`); if so, the goal is already met — use case ends.
  - **4b2.** Otherwise Ava re-titles the artefact so the derived location is free; resume at 2.
- **5a.** A property violates the schema — required field absent, wrong type, or value outside its constrained set:
  - **5a1.** The system rejects with the field, the rule broken, and the acceptable values ([C2.2.F04](../07a-fbs.md#c22--schema-enforcement)); the agent repairs the draft and resumes at 2.
- **6a.** A declared reference targets an identifier that does not exist (`unknown-id`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **6a1.** The reference is a typo or a paraphrased ID: the agent corrects it to the real identifier and resumes at 2.
  - **6a2.** The target genuinely does not exist yet: Ava persists the prerequisite artefact first (running this use case for it — as a stub with `_TODO_` content where the prerequisite scaffolding of [ADR-0015](../../architecture/decisions/adr-0015-opt-in-layer-packages.md) applies), then resumes at 2. The system never accepts the dangling reference in the meantime.
- **6b.** A declared reference resolves, but to an artefact of a disallowed type (`type-constraint`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **6b1.** The rejection names the expected and actual types; Ava decides whether the target or the relationship is wrong; the agent corrects and resumes at 2.
- **7a.** The type inherits its location from a parent (e.g. an embedded user story) and the declared parent is missing or of the wrong type ([§2 `clew new user-story`](../../architecture/interfaces/cli-clew.md#2-command-catalogue), [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md)):
  - **7a1.** The system rejects the child mint; Ava persists the parent first (this use case, for the parent type), then resumes at 2. The parent-scoped identifier sequence is created lazily on the first successful child mint — no separate setup step exists or is needed.
- **8a.** An internal error occurs before commit:
  - **8a1.** The transaction rolls back; the store is byte-identical to its pre-invocation state and no identifier was consumed ([§5 Atomicity](../../architecture/interfaces/cli-clew.md#5-output-contract)). The agent surfaces the failure to Ava and retries once the cause (e.g. storage) is resolved.
- **9a.** The narrative section is never written, or is written under a heading that does not derive to the recorded anchor:
  - **9a1.** The fact stands (the store-side guarantee is already met); the gap surfaces as `anchor-missing` or `content-drift` at the next check, whose detection and reconciliation is its own goal — UC-03 (planned), per [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md).

## Technology and Data Variations

- Step 2: the submission may come from Ava typing the invocation herself or from the agent scripting it inside a session — the contract is identical (the CLI is the only writer, [BC-01 Open Host Service](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)).
- Step 7: for parent-scoped child types, the identifier is minted from the composite parent-scoped sequence ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D4) — numbering restarts per parent; behaviour is otherwise unchanged.

## Related Information

- **Value-stream stage:** [VS-1.4 · Persist with Stable ID](../../business/04a-value-streams.md#vs-14--persist-with-stable-id) — Critical pain; this use case is the mechanical form of the wave-1 magic-wand finding.
- **Epic / PRD:** [E-01 · Trustworthy Artefact Persistence](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence); grounds PRD-0001 (planned) — stories reference this use case via `Covers: UC-01`.
- **Frequency:** many times per working session (every artefact mint in every agent session).
- **Sibling goals (planned):** UC-02 refactor-with-foreseen-impact · UC-03 detect-and-reconcile-drift · UC-04 link-artefacts · UC-05 rebuild-from-snapshot.

## Use-Case 2.0 Slices

_Populated by the `slice` mode. The basic flow is the first slice; each alternative flow becomes a further slice. Every slice needs a test case._

| Slice | Narrative | Test case(s) | Status |
|---|---|---|---|
| UC-01.S1 | Basic flow (main success scenario) | _TBD (with PRD-0001)_ | ⬜ |
