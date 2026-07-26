---
type: Use Case
title: "UC-02 — Refactor an artefact with foreseen impact"
description: "Ava (via her agent) changes an existing artefact — rename, re-tier, re-link, retire, restructure — with the full downstream blast radius surfaced before anything is committed, every step integrity-validated, and the propagation confirmed afterwards."
tags: [product-specs, use-case, reference-validation]
timestamp: 2026-07-25T07:26:05Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-25
review_interval: 180d
---

# UC-02 — Refactor an artefact with foreseen impact

> Methodology: the kit's `spec-use-case/references/methodology.md` (Cockburn fully-dressed format). This file is the behavioural contract; command signatures, output shapes, and the error catalogue live in the [CLI contract](../../architecture/interfaces/cli-clew.md) and are cited, never restated.

| Field | Value |
|---|---|
| **Scope** | system — the clew CLI + artefact store ([BC-01](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)); narrative rewrites touch the documentation layer only through recorded bindings |
| **Level** | user-goal 🌊 (one sitting: from "this must change" to "the change propagated as foreseen", minutes) |
| **Primary Actor** | [P-01 Ava](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) — the agent executes on her behalf; Ava owns the change decision and the accept/abort call |
| **Supporting Actors** | none (local-first) |
| **Realises** | [C4.1.F01–F03](../07a-fbs.md#c41--write-time-reference-validation) · [C3.2.F03](../07a-fbs.md#c32--pre-built-traceability-views) · [C3.1.F02](../07a-fbs.md#c31--ad-hoc-cross-artefact-query-surface) · [C2.2.F03, C2.2.F04](../07a-fbs.md#c22--schema-enforcement) · [C2.3.F01, C2.3.F02](../07a-fbs.md#c23--file-binding-management) · [C2.1.F02](../07a-fbs.md#c21--stable-identifier-generation) (identity preserved, never recycled) · [C2.4.F02, C2.4.F04](../07a-fbs.md#c24--deterministic-structural-export) · [C4.2.F01](../07a-fbs.md#c42--drift-detection) |

## Stakeholders and Interests

- **P-01 Ava** — she sees the *complete* blast radius before committing, not after something downstream breaks; today's blind-refactor reality ("commit a rename, discover 17 stale references weeks later") is her third-ranked frustration.
- **The executing agent** — a mechanical impact list to work through instead of grepping and guessing; every rejection names what to fix ([P-01 §System Needs](../../business/01a-personas.md#system-needs)).
- **Future readers (humans and agents)** — references written against the old state either still resolve or were consciously re-pointed in this refactor; retired identifiers are never resurrected with a different meaning.
- **The substrate ([OBJ-02](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it))** — violations surface at the moment they would be introduced, never later (KR-02.2, KR-02.3); the store is never in a referentially broken state, even mid-refactor.

## Preconditions

- The artefact store is initialised and the target artefact is a persisted fact ([UC-01](uc-01-persist-artefact-with-write-time-integrity.md) completed for it).
- The store and documentation layer are drift-free for the artefacts in play — or the drift is surfaced and resolved first (extension 3a).

## Guarantees

- **Minimal guarantees** (hold even on failure or interruption):
  - No individual write partially persists; each rejected step names the rule broken and the path to resolution ([CLI contract §5 Atomicity, §7](../../architecture/interfaces/cli-clew.md#5-output-contract)).
  - **Every intermediate state of the store is referentially legal** — at no point during the refactor does a dangling or type-invalid reference exist, because every step is validated at write time and retires are refused while references remain. An interrupted refactor leaves a *legal but semantically incomplete* state, never a broken one (see extension 7a and [OI-0084](../../../project-control/open-items/open-items.md)).
  - Identifiers survive every outcome: preserved through renames, never recycled after retires — a reference written before the refactor never silently changes meaning.
- **Success guarantees**:
  - The target reflects its intended new state, and every referencing artefact in the accepted impact set has been updated in the same sitting.
  - File bindings are rewritten for every touched section; snapshots are regenerated for every affected type ([C2.4](../07a-fbs.md#c24--deterministic-structural-export)).
  - The impact view, re-run, returns the predicted post-change state, and the drift scan is clean — the refactor propagated exactly as foreseen ([VS-3.4](../../business/04a-value-streams.md#vs-34--confirm-no-drift)'s trust certificate).

## Trigger

Ava decides an existing artefact must change: a rename, a re-tier, a retire, a re-link, or a restructure ([VS-3.1](../../business/04a-value-streams.md#vs-31--identify-the-change)'s change classification).

## Main Success Scenario

1. Ava identifies the change: the target artefact, the kind of change, and the intended new state.
2. The agent locates the target and confirms its current state ([§2 query group](../../architecture/interfaces/cli-clew.md#2-command-catalogue)).
3. The agent requests the impact view for the target; the system returns every artefact referencing it — direct and transitive — and the file bindings that would need rewriting, derived from validated edges only ([§2 `clew impact`](../../architecture/interfaces/cli-clew.md#2-command-catalogue), [ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)).
4. Ava reviews the impact set and accepts the change.
5. The agent submits the change as a sequence of update, relationship, and (where applicable) retire steps, ordered so prerequisites land first ([§2 `clew set` / `clew link`](../../architecture/interfaces/cli-clew.md#2-command-catalogue)).
6. The system validates each step at write time — schema rules for the new values, reference existence and type constraints across the store as it now stands — refusing any step that would leave a dangling or type-invalid reference ([§4](../../architecture/interfaces/cli-clew.md#4-validation-rules)).
7. The system applies each validated step in its own serialised transaction, preserving identifiers, rewriting the affected file bindings, and regenerating snapshots for the touched types.
8. The agent updates the narrative sections the impact view flagged, in the same session.
9. The agent re-runs the drift scan and the original impact view; the system confirms store↔prose agreement and the predicted new state — the cascade propagated as foreseen.

## Extensions

- **2a.** The target identifier does not exist (`unknown-id`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **2a1.** The agent enumerates candidates ([§2 `clew list`](../../architecture/interfaces/cli-clew.md#2-command-catalogue)); Ava picks the real target; resume at 2.
- **3a.** The impact view or a pre-change drift scan reveals existing store↔prose drift on artefacts in play:
  - **3a1.** The drift is reconciled first (UC-03, planned — [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md)'s categories); previewing impact over a stale substrate would make the foresight untrustworthy. Resume at 3.
- **3b.** The store is locked by another writer (`db-locked`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **3b1.** As [UC-01 extension 3a](uc-01-persist-artefact-with-write-time-integrity.md#extensions): the engine serialises within the busy-timeout, or the agent retries after the competing write.
- **4a.** Ava rejects the impact — the blast radius is larger than the change is worth, or it reveals the change is wrongly framed:
  - **4a1.** She reformulates (a narrower change; back to 1) or abandons; the store is unchanged. The preview cost her a query, not a broken repo.
- **6a.** A step's new value violates schema rules (`unknown-field` / invalid value, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **6a1.** The rejection names the field and acceptable values; the agent corrects the step and resumes at 6.
- **6b.** A retire step is refused because references to the target remain ([C4.1.F02](../07a-fbs.md#c41--write-time-reference-validation)):
  - **6b1.** The refusal surfaces the full referencing set. The agent re-points or updates each referencing artefact first — the impact list from step 3 is exactly this work list — then retries the retire. The system never accepts the dangling state in the meantime.
- **6c.** A re-link step targets an artefact of a disallowed type (`type-constraint`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **6c1.** The rejection names expected vs actual types; Ava decides whether the target or the relationship is wrong; the agent corrects and resumes at 6.
- **7a.** The refactor is interrupted mid-sequence (session dies, machine loss):
  - **7a1.** The store is referentially legal but semantically incomplete (minimal guarantee). On resume, the agent re-runs the impact view against current state, computes the remaining delta, and continues at 5. All-or-nothing change-set atomicity — one surface, one transaction — was considered and **rejected for v1**: the per-step guarantee above is the contract, and there is no `apply <changeset>` surface to resume into ([PRD-0001 §8-D1](../prds/prd-0001-trustworthy-artefact-persistence.md#8--open-questions), closing [OI-0084](../../../project-control/open-items/open-items.md)).
- **8a.** Some flagged narrative sections are not updated in the sitting:
  - **8a1.** The facts stand; the gaps surface as `content-drift` / `anchor-missing` at the next check (UC-03, planned). The refactor is store-complete but prose-pending — visible, not silent.
- **9a.** The re-run impact view does not match the predicted state:
  - **9a1.** The agent diffs prediction against actual, applies the remaining delta (back to 5 for the residue), and re-confirms. The discrepancy is mechanical to enumerate precisely because both views are deterministic.

## Technology and Data Variations

- Step 3: for non-canonical refactor shapes, the ad-hoc query surface ([C3.1](../07a-fbs.md#c31--ad-hoc-cross-artefact-query-surface)) can supplement the canonical impact view; the acceptance gate at step 4 is unchanged.
- Step 5: the same sequence may be driven interactively (Ava reviewing each step) or scripted end-to-end by the agent after the single accept at step 4 — the validation behaviour is identical.

## Related Information

- **Value-stream stage:** [VS-3 · Refactor Architecture](../../business/04a-value-streams.md#vs-3--refactor-architecture) end-to-end; the value-gating stage is [VS-3.2 Preview Downstream Impact](../../business/04a-value-streams.md#vs-32--preview-downstream-impact) (Critical — the wave-1 magic-wand finding applied to changes).
- **Epics / PRDs:** execution steps ground [E-01](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence) (PRD-0001, planned); the impact preview grounds [E-02](../../plans/delivery-roadmap.md#e-02--deterministic-architecture-answers) (PRD, planned). A use case is a behaviour contract, not epic-scoped — each PRD's stories cover their epic's slice via `Covers: UC-02`.
- **Decided (2026-07-26):** [OI-0084](../../../project-control/open-items/open-items.md) resolved in favour of **per-step referential legality** — this contract's v1 baseline, unchanged. No all-or-nothing change-set surface ships in v1 ([PRD-0001 §8-D1](../prds/prd-0001-trustworthy-artefact-persistence.md#8--open-questions)); [VS-3.3](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity)'s aspirational "applied atomically across all affected artefacts" wording was softened to match this use case rather than the reverse.
- **Frequency:** weekly at least — every pivot, rename, or persona/capability re-tier (P-01 Scenario 1 is exactly this use case).
- **Siblings:** [UC-01](uc-01-persist-artefact-with-write-time-integrity.md) persist · UC-03 drift reconcile (planned) · UC-04 link (planned) · UC-05 rebuild (planned).

## Use-Case 2.0 Slices

_Populated by the `slice` mode. The basic flow is the first slice; each alternative flow becomes a further slice. Every slice needs a test case._

| Slice | Narrative | Test case(s) | Status |
|---|---|---|---|
| UC-02.S1 | Basic flow (main success scenario) | _TBD (with PRD-0001 / E-02 PRD)_ | ⬜ |
