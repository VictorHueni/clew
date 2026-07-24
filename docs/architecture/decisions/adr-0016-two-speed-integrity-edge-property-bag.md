---
type: Architecture Decision Record
title: Two-speed integrity — edge property bag and relationship review lifecycle
description: Adds a JSON property bag to the artefact_references edge table carrying a proposed/validated/rejected review lifecycle, and records the invariant that no LLM-inferred judgment enters the integrity hot path — amending ADR-0003's edge schema.
tags: [architecture, schema, integrity, edge-table, adr]
timestamp: 2026-07-24T17:35:00Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# Two-speed integrity — edge property bag and relationship review lifecycle

## Context and Problem Statement

[ADR-0003 — schema design: typed property graph](adr-0003-schema-design-typed-property-graph.md) gave nodes a `properties` JSON column but specified the `artefact_references` edge table's metadata only loosely (role, and a passing mention of confidence/evidence). Two inputs expose that gap as load-bearing:

1. **The edge-schema gap finding.** The cartography prototype's annex I (external: `swiss-aos-drug-reimbursement-model/docs/architecture/cartography/`, Plans 0138/0139) found in practice that relationships need as much metadata as nodes — who asserted an edge, on what evidence, and whether a human has confirmed it — and that a schema without room for this either loses the provenance or leaks unreviewed assertions into views that read as facts.
2. **The deterministic-guard caveat.** [IDEA-0001](../../discovery/ideation/IDEA-0001-product-architecture-integrity-repositioning.md)'s assessment (filed as OI-0067) warned that `clew guard`'s sample output mixed deterministic graph facts with architectural judgment, and noted that OpenLore ([CO-08](../../business/01b-competitive-landscape/CO-08-openlore.md)) already markets "no LLM in the hot path" — a purity claim clew concedes if LLM-inferred judgment reaches guard/check output.

The two inputs are one problem: **in an agent-operated graph, agents will propose relationships faster than a human can vet them — so where do unvetted edges live, and what may the integrity commands derive from?** The moment to decide is now, while the DDL is unbuilt and the answer costs a design decision instead of a migration. Decided in the [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) (D8); this ADR is the record. **Closes OI-0067** (ledger closure handled in the open-items pass).

## Decision Drivers

- **"Only clew creates facts" must be operational, not rhetorical.** The pitch adopted in [ADR-0014](adr-0014-product-architecture-management-positioning.md) is only honest if there is a mechanical boundary between what an agent may *propose* and what counts as a *fact*.
- **Provenance is a first-class need.** Rejected and inferred edges carry information (why was this considered? why was it wrong?) that deleting destroys; the prototype's annex I hit exactly this.
- **Schema idiom consistency.** ADR-0003's own design — a JSON `properties` column on the node table — is the established idiom; edges should get the same mechanism, not a second pattern.
- **Decide-before-DDL economics.** `artefact_references` has no built DDL yet; fixing the edge schema now is free, retrofitting a lifecycle onto a populated edge table later is a migration plus a data-review debt.
- **Competitive honesty.** OpenLore's "no LLM in the hot path" is prior art; clew must match the purity claim at the product layer, not concede it.

## Considered Options

- **A. Edge property bag + review lifecycle on `artefact_references` (chosen).** One edge table; a JSON property bag mirroring the node idiom; lifecycle state as edge data; integrity commands filter by validation status.
- **B. Validated-only edge table, proposals outside the DB.** Keeps the edge table "pure" by construction, but pushes proposals into a second store (markdown queue, sidecar file) — a second source of truth for relationship candidates, with the provenance of rejected proposals lost or unqueryable.
- **C. Separate proposals table.** Explicit quarantine at the schema level, but two edge stores mean two traversal paths, promotion-by-row-move (losing history), and a second pattern for the same concept — the inconsistency ADR-0003 rejected in its own option D.
- **D. Let LLM-inferred judgment into guard/check output directly.** Maximises apparent helpfulness of `clew guard`, but breaks the core guarantee, makes guard output non-reproducible, and concedes the deterministic purity claim to OpenLore. Rejected on the invariant below.

## Decision Outcome

Chosen option: **A (edge property bag + relationship review lifecycle), with the deterministic-hot-path invariant.**

- **Schema.** `artefact_references` gains a **property bag** (JSON column, mirroring the `artefacts` table's `properties` column per ADR-0003's own design idiom) carrying at minimum:
  - `validation_status`: `proposed | validated | rejected`
  - `confidence`: `stated | inferred`
  - `rationale`: why the edge is asserted
  - `source_doc`: where the assertion comes from
- **Relationship review lifecycle.** Agents may **propose** relationships; only a **human review** flips `proposed → validated`; **rejected edges are kept for provenance**, never deleted by the lifecycle. This is decided now, while the DDL is unbuilt.
- **Invariant — no LLM-inferred judgment in the integrity hot path.** `clew guard` and `clew check` output derives from **deterministic graph facts and authored constraints only**. LLM output always lands as a **quarantined proposal** (`validation_status: proposed`), never directly as a fact and never in guard/check's derivation set. Architectural judgment is only admissible as *authored constraints stored as artefacts* — reviewed, versioned, deterministic to evaluate.
- **Two-speed integrity, named.** The design gives the graph two speeds on one substrate: the **fast path** — validated edges and authored constraints, from which guard/check derive with full determinism — and the **slow path** — proposals accumulating at agent speed, waiting on human review to become facts. The property bag is what lets both speeds share one edge table without contaminating each other. This is the mechanical form of *"agents write prose, only clew creates facts."*
- **Amendment scope:** this ADR amends [ADR-0003](adr-0003-schema-design-typed-property-graph.md)'s edge table schema only — the property bag replaces the loosely-specified metadata columns as the edge-metadata mechanism, and existing metadata (e.g. the CONSUMES `role`) lives in the same bag. Everything else in ADR-0003 (single node table, JSON node properties, recursive CTE traversal, no-DDL) stands and is strengthened: the edge bag means new edge metadata needs no DDL either.

### Positive Consequences

- "Only clew creates facts" becomes a mechanically checkable property of the schema, not a slogan: the fact set is exactly the validated + authored subset.
- Full provenance: proposed, validated, and rejected edges are all queryable with rationale and source — the review history is in the graph, not lost in chat transcripts.
- Guard/check output is reproducible and defensible — the same graph state always yields the same verdicts, matching (not conceding) OpenLore's purity claim at the product layer.
- Agents can be *aggressive* proposers at zero integrity cost, because proposals are quarantined by construction — the agent-speed/human-speed mismatch becomes a queue, not a corruption vector.
- No DDL for future edge metadata, extending ADR-0003's core win to the edge table.

### Negative Consequences

- Human review is a real bottleneck by design: a heavily agent-worked repo can accumulate a large proposal queue, and the review surface (CLI listing, bulk validate) becomes necessary tooling.
- Every traversal and view must be validation-status-aware; a query that forgets to filter `proposed`/`rejected` silently reads non-facts — the filter discipline belongs in the query layer, not in callers' memory.
- JSON-path access on edge metadata inherits ADR-0003's verbosity trade-off (`json_extract` over column names).
- Keeping rejected edges grows the edge table monotonically; acceptable at repo scale, but pruning policy may eventually be needed.

## Related decisions

- [ADR-0003 — schema design: typed property graph](adr-0003-schema-design-typed-property-graph.md) — **amended** (edge table schema): `artefact_references` gains the JSON property bag and the review-lifecycle keys; the node-side design is unchanged and its idiom is the template.
- [ADR-0014 — Product Architecture Management positioning](adr-0014-product-architecture-management-positioning.md) — companion decision; this ADR operationalises the integrity-layer pitch that ADR-0014 makes public.
- [ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md) — companion decision; its declared-absence and hard-block semantics compose with this lifecycle (a declared absence is *no edge*; a proposal is an *unvalidated edge*; a dangling reference is *never representable*).
- [ADR-0013 — minimal-model / perfect-sync, not repo-native EA](adr-0013-minimal-model-not-repo-native-ea.md) — **reaffirmed**: the deterministic hot path is the "ironclad sync" half of its wedge, made schema-level.
- [IDEA-0001 — Reposition clew as the product-architecture integrity layer](../../discovery/ideation/IDEA-0001-product-architecture-integrity-repositioning.md) — the deterministic-guard rule graduates from its assessment (caveat 3) into this ADR, with OpenLore's "no LLM in the hot path" ([CO-08](../../business/01b-competitive-landscape/CO-08-openlore.md)) credited as prior art.

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| Physical edge DDL (property bag column, lifecycle values) | [Artefact Store model §Physical schema](../../domain/07b-models/artefact-store.md) |
| Guard/check derivation contract (deterministic facts + authored constraints only) | [CLI contract](../interfaces/cli-clew.md) |
| Proposal/review workflow surface (list, validate, reject) | [CLI contract](../interfaces/cli-clew.md) |
| Glossary term (*edge proposal*) | [Glossary](../../domain/02c-glossary.md) |
| Annex I import (edge-schema gap evidence) | `docs/discovery/` (import packet) |
| Decision record (D8 canonical wording) | [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) |
| OI-0067 closure | [Open-items ledger](../../../project-control/open-items/open-items.md) |
