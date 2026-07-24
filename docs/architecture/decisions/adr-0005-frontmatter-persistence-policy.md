---
type: Architecture Decision Record
title: Frontmatter persistence policy — markdown remains source of truth; clew caches a read-only subset
description: Frontmatter persistence policy — markdown remains source of truth while clew caches a read-only subset, with ownership split by field class.
tags: [architecture, adr, frontmatter]
timestamp: 2026-05-26T15:48:42Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-26
review_interval: 180d
---

# Frontmatter persistence policy — markdown remains source of truth; clew caches a read-only subset

## Context and Problem Statement

The homemade-claude-kit `rules/artefact-frontmatter.md` defines a five-field frontmatter contract (`title`, `status`, `owner`, `last_reviewed`, `review_interval`) carried by every markdown artefact under `docs/`, plus two conditional fields (`supersedes`, `superseded_by`) on documents that participate in a supersession chain. Today these fields are hand-authored or skill-emitted at document creation time and remain in markdown only.

clew's persistence layer ([ADR-0001](adr-0001-metamodel-persistence-layer.md)), file-binding model ([ADR-0002](adr-0002-artefact-file-binding.md)), and typed property graph ([ADR-0003](adr-0003-schema-design-typed-property-graph.md)) together give the project a structured artefact store that binds to those markdown files. Two concrete observations follow:

1. **One frontmatter field is already structurally duplicated.** The `supersedes` / `superseded_by` markdown values describe a relationship that ADR-0003 already models as a `SUPERSEDES` edge in `artefact_references`. The same fact lives in two places that can disagree silently.

2. **Other frontmatter fields are queryable but not query-served.** Today, answering "which ADRs are overdue for review?" or "which artefacts are in `draft` status across the repo?" requires `grep` + manual aggregation. Both `util-metamodel-audit` Check 12 (expiry) and Check 17 (frontmatter validity) implement this as filesystem traversal.

The question this ADR closes: **should clew persist frontmatter data alongside the artefacts it already tracks, and if so, who owns each field?**

Two non-negotiable constraints frame the answer:

- **The kit contract must stand alone.** `rules/artefact-frontmatter.md` is a cross-project standard. Projects on any persistence backend (or none) must still be able to use it. Any decision here cannot make the kit's frontmatter rule clew-dependent.
- **The "agent drafts narrative, clew persists structure" invariant from ADR-0002 must hold.** That ADR was explicit: clew does not regenerate markdown narrative from the DB. Inverting the authoring flow (DB first, markdown second) for frontmatter alone would create a hybrid that is hard to reason about.

## Decision Drivers

- **Eliminate the supersession duplication.** The two-places-for-one-fact pattern is real drift risk, not hypothetical.
- **Enable structured queries on frontmatter metadata** without forcing every project to adopt clew.
- **Preserve the kit's standalone contract** — `rules/artefact-frontmatter.md` must remain usable without a clew-style persistence backend.
- **Preserve ADR-0002's invariant** — clew does not own narrative authoring; frontmatter is metadata-on-narrative, not narrative.
- **Distinguish field classes by semantics, not by file location.** Some frontmatter fields are *derived* from DB state (supersession); some are *authored* by humans (review cadence); some are *lifecycle markers* (status). Treating all eight fields identically would force a choice that's wrong for at least one class.
- **Keep the change additive.** clew should not start *rejecting* writes because of frontmatter shape — that's a future decision that needs its own evidence.

## Considered Options

- **A. Status quo.** Markdown frontmatter is hand- or skill-authored; clew ignores it entirely. `util-metamodel-audit` Checks 12 + 17 remain grep-based.
- **B. Markdown is source of truth; DB caches a subset (read-only).** clew parses frontmatter on `clew import md` and `clew check`, caches the values in `artefacts.properties` or a dedicated `frontmatter` table, and reports drift between the cache and the live markdown. clew never writes frontmatter.
- **C. DB is source of truth; clew owns and regenerates the frontmatter block.** User updates fields via `clew set last_reviewed ADR-0001 2026-08-15`. clew rewrites the markdown frontmatter on every write. Hand-edits become drift events `clew check` flags.
- **D. Split ownership by field class.**
  - *Structural-relationship fields* (`supersedes`, `superseded_by`): DB-as-source. Treated as projections of `SUPERSEDES` edges in `artefact_references`. Drift between an edge and the rendered markdown value is the only legal conflict, and the edge wins.
  - *Authored-cadence fields* (`last_reviewed`, `owner`, `title`): markdown-as-source. clew may read and cache for query purposes but never writes.
  - *Lifecycle-state fields* (`status`, `review_interval`): markdown-as-source today. Revisit when there is evidence a write-back path is needed.

## Decision Outcome

**Chosen option: D — Split ownership by field class**, with a phased rollout.

The split tracks the *semantic class* of each field rather than its file location, which gives a stable answer to "who wins on conflict?" per field without forcing a one-size-fits-all sync direction.

Phase 1 (this ADR, no code yet):

- Recognise that the `SUPERSEDES` edge in `artefact_references` (per [ADR-0003 §Relationship registry](adr-0003-schema-design-typed-property-graph.md)) is the *primary* representation of supersession.
- The markdown `supersedes` / `superseded_by` frontmatter fields are *projections* of that edge, not independent state.
- Update `rules/artefact-frontmatter.md` (kit-side, follow-up) to note this projection rule so the contract remains accurate for any project that adopts clew-style persistence.

Phase 2 (next clew increment, target: before Step 8 Delivery Roadmap):

- `clew import md` extracts the five required frontmatter fields per artefact at import time and persists them in a new `frontmatter` column on `artefacts` (or a dedicated table, TBD at schema-design time).
- `clew check` adds two new drift checks:
  - **Supersession projection drift.** Every `SUPERSEDES` edge must have matching markdown frontmatter on both endpoints (`status: superseded` + `superseded_by:` on the source; `supersedes:` on the target); any markdown `supersedes:` / `superseded_by:` value with no matching edge is flagged.
  - **Stale `last_reviewed`.** Comparing `last_reviewed + review_interval` against today, emit a row per overdue artefact. Re-implements `util-metamodel-audit` Check 12 as a `clew check` mode.
- clew remains read-only on the markdown side throughout Phase 2.

Phase 3 (deferred, requires a separate ADR):

- Decision on whether to add a write-back command family (e.g. `clew frontmatter set <id> <field> <value>` that rewrites the markdown block).
- Decision on whether `clew set status <ADR-id> superseded --by <ADR-id>` should *also* write the rendered frontmatter values, bidirectionally.
- These are write-side concerns and depend on whether Phase 2's read-only ingestion uncovers enough operator friction to justify them.

### Rationale

- **Option A** does not address the supersession duplication that ADR-0003 already created. The drift risk is real and surfaceable, but the audit detects it only as a grep, not as a structural mismatch — and the kit's frontmatter rule cannot describe SUPERSEDES because the kit is generic. Doing nothing leaves the contradiction in place.
- **Option B** treats `last_reviewed` and `supersedes` the same way — both go into a cache, both get drift-checked against markdown. This is internally consistent but misses the structural-relationship signal: SUPERSEDES has a *better* primary representation than frontmatter, while `last_reviewed` does not.
- **Option C** inverts the authoring flow for frontmatter alone, creating an awkward hybrid where the body of an artefact is markdown-as-source but its first 7 lines are DB-as-source. It also makes the kit's `rules/artefact-frontmatter.md` clew-dependent for any project that adopts clew, breaking the kit's standalone contract.
- **Option D** is the only choice that respects all three constraints: it eliminates the duplication where it exists (supersession), enables queries where they have unique value (`last_reviewed` cadence), and preserves the kit's standalone contract for projects that don't use clew.

The phased rollout is deliberate: Phase 1 is a documentation decision with no code impact; Phase 2 is additive (read-only ingestion + new drift checks) and can ship behind a flag if needed; Phase 3 only happens if Phase 2 uncovers operator demand. This matches the project's preference for sequential plans and trust-but-verify execution.

## Confirmation

The decision is confirmed when all of the following hold:

- The kit's `rules/artefact-frontmatter.md` carries a note (or a companion subsection) declaring `supersedes` / `superseded_by` as *projections* of a typed relationship in projects that adopt a structured persistence backend.
- The clew domain model ([Artefact Store](../../domain/07b-models/artefact-store.md)) extends `Artefact` with a frontmatter property class (or adds a `Frontmatter` value object) describing the five always-present fields + the supersession projection rule.
- `clew check` exposes the two new drift modes (supersession projection, stale review) and `util-metamodel-audit` Check 12 / Check 17 can defer to them as the canonical implementation.

## Consequences

**Positive**

- Eliminates the supersession duplication: one structural fact (the edge) with one rendered view (the frontmatter line).
- Enables "which ADRs are overdue?" as a `clew` query rather than a grep across the repo.
- Preserves the kit's standalone contract — projects without clew use the frontmatter rule unchanged.
- Preserves ADR-0002's "agent drafts, clew persists" flow — clew is still a read-only consumer of frontmatter content under D.
- `util-metamodel-audit` Check 12 + Check 17 can be re-implemented as `clew check` modes (faster, structured output, deterministic across runs).
- The phased rollout means a Phase 1 commit ships as a documentation update with zero code risk.

**Negative**

- Adds a small parsing burden to `clew import md` and `clew check` (Phase 2).
- Introduces a frontmatter-cache concept that needs its own schema, migration story, and `clew check` mode (Phase 2).
- Doesn't solve the "I want to mark this ADR superseded from CLI" use case today; that lives in Phase 3.
- Operators who hand-edit frontmatter will see new drift signals once Phase 2 ships; this is design intent but requires readiness to act on the new check output.

**Neutral**

- Drift detection becomes louder when frontmatter goes stale; the new signal is the entire point but requires operator follow-through.
- The boundary between "structural-relationship fields" and "authored-cadence fields" is currently a list of two classes; if the kit adds new conditional frontmatter fields, this ADR needs a refresh to classify them.

## Pros and Cons of the Options

### A. Status quo

- ✅ Zero code change. Zero new schema.
- ✅ Kit contract stays exactly as written.
- ❌ Supersession duplication remains unaddressed.
- ❌ Frontmatter queries remain grep-based.
- ❌ Drift between edge and frontmatter value remains invisible.

### B. Markdown-as-source for everything; DB caches subset

- ✅ Single sync direction (markdown → DB) — easy to reason about.
- ✅ Preserves authoring flow.
- ✅ Preserves kit contract.
- ❌ Treats SUPERSEDES the same as `last_reviewed`, despite SUPERSEDES already having a structural representation in the DB. Two-fact / one-fact distinction is lost.
- ❌ When the edge and the markdown frontmatter disagree, B has no opinion on who wins.

### C. DB-as-source everywhere; clew regenerates frontmatter

- ✅ Eliminates duplication structurally — only one place can write frontmatter.
- ❌ Inverts authoring flow for frontmatter only; awkward boundary.
- ❌ Breaks the kit's standalone contract for any project adopting clew-style persistence.
- ❌ Hand-edits to frontmatter become first-class drift events that must be reconciled on every `clew check`.

### D. Split ownership by field class (chosen)

- ✅ Eliminates duplication exactly where duplication is real (supersession).
- ✅ Preserves authoring flow for human-curated cadence fields.
- ✅ Preserves kit standalone contract.
- ✅ Phased rollout lets Phase 1 land as a documentation decision with zero code risk.
- ❌ Introduces a two-class field model that needs maintenance if the kit adds new conditional fields.
- ❌ Phase 3 (bidirectional write-back) is explicitly deferred, so the "mark superseded from CLI" use case remains unsolved until then.

## More Information

- This ADR follows directly from an audit-driven conversation on 2026-05-26 that surfaced the duplication risk. The audit itself ([2026-05-26 stack audit](../../../var/reports/metamodel-audit/stack-audit-2026-05-26.md)) flagged frontmatter validity (Check 17) as zero findings and stack progress as 11/16, but did not surface this design question — it was raised separately after the audit landed.
- Phase 2 implementation will require an additional ADR or a documented schema migration once the storage shape is chosen (one `frontmatter` column on `artefacts` vs a dedicated table). That decision is intentionally deferred until the data-shape question is informed by the parsing implementation rather than guessed up front.

## Related decisions

- Depends on: [ADR-0001 Persistence layer](adr-0001-metamodel-persistence-layer.md), [ADR-0002 Artefact file binding](adr-0002-artefact-file-binding.md), [ADR-0003 Typed property graph](adr-0003-schema-design-typed-property-graph.md) (`SUPERSEDES` edge already in schema).
- Soft-links to: kit-side `rules/artefact-frontmatter.md` (the contract this ADR refines).

## Dependent artefacts

| Concern | Where it lives |
| :-- | :-- |
| Frontmatter projection rule for `supersedes` / `superseded_by` | Kit-side `rules/artefact-frontmatter.md` (follow-up; tracked in §Open Items below) |
| `Frontmatter` value object or property class on `Artefact` | [Artefact Store domain model](../../domain/07b-models/artefact-store.md) — Phase 2 |
| `clew check` drift modes (supersession projection + stale review) | [CLI interface contract](../interfaces/cli-clew.md) §2 + §5 — Phase 2 |
| Audit deferral (Check 12 + Check 17 → `clew check`) | `util-metamodel-audit/references/check-catalogue.md` — Phase 2 |

## Open Items

| OI-ID  | Type           | Summary                                                                                                                                                                                                       | Source anchor                  | Source heading                                                | Resolution path                                                                                                                                                                                | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0021 | doc-gap        | Kit-side `rules/artefact-frontmatter.md` needs a note declaring `supersedes` / `superseded_by` as projections of a typed relationship in projects that adopt a structured persistence backend.                | #decision-outcome              | Decision Outcome — Phase 1                                    | Open a PR on `homemade-claude-kit` adding the projection-rule paragraph; cross-link this ADR. Phase 1 closes when the kit rule reflects the projection semantics.                              | high     | open   | Victor Hueni | 2026-07-15        | _TBD_       |
| OI-0022 | decision-gap   | Phase 3 write-back semantics: should `clew set status <ADR> superseded --by <ADR>` also rewrite the rendered markdown frontmatter? Or should it remain read-only with a separate `clew frontmatter` command?  | #decision-outcome              | Decision Outcome — Phase 3                                    | Defer until Phase 2 ships and operator demand surfaces; if surfaced, open a follow-up ADR with the bidirectional-write decision and conflict-resolution policy.                                | low      | open   | Victor Hueni | 2026-12-31        | _TBD_       |
| OI-0023 | doc-gap        | The two-class field model (`structural-relationship` vs `authored-cadence`) currently enumerates only `supersedes`/`superseded_by` (Class A) and `last_reviewed`/`owner`/`title` (Class B). New kit-conditional fields need explicit classification when added. | #considered-options-d          | Considered Options — D. Split ownership by field class        | When the kit adds a new conditional frontmatter field, update this ADR's §Decision Outcome with the new field's class assignment; or supersede this ADR if the model needs restructuring.    | low      | open   | Victor Hueni | 2026-12-31        | _TBD_       |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-05-26 | Initial draft. Phase 1 (this ADR landing) declares the supersession-projection rule; Phase 2 (clew increment) implements read-only frontmatter ingestion + two new `clew check` drift modes; Phase 3 (bidirectional write-back) deferred to a future ADR. Raised after the 2026-05-26 metamodel audit landed but the audit itself did not surface this design question. | Victor Hueni |
