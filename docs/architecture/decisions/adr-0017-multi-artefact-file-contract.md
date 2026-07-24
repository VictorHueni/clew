---
type: Architecture Decision Record
title: Multi-artefact file contract — user_story type, child hash exclusion, umbrella frontmatter, parent-scoped minting
description: Completes the multi-artefact file contract — mints the PRD-scoped user_story type, excludes child-bound sections from the parent's content hash, fixes umbrella frontmatter for mixed files, and makes parent-scoped ID formats mintable via an id_sequences composite key — amending ADR-0002's layout table and ADR-0007's hash-scope rule.
tags: [architecture, adr, file-binding, product-specs]
timestamp: 2026-07-24T18:10:00Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# Multi-artefact file contract — user_story type, child hash exclusion, umbrella frontmatter, parent-scoped minting

## Context and Problem Statement

Files holding N identified artefacts are already the decided default: [ADR-0002 — artefact file binding](adr-0002-artefact-file-binding.md) fixed the three-category layout enum, and its `single-collection` and `inherits-from-parent` categories both put many bound artefacts in one file. What ADR-0002 and [ADR-0007 — content-hash strategy](adr-0007-file-binding-content-hash-strategy.md) never decided are four sub-contracts that only bite once a file mixes a long-form parent with identified children:

1. **Story types.** PRDs need delivery-slice children (user stories) with stable IDs, but no `prd` or `user_story` row exists in ADR-0002's layout table and no story ID format exists in the artefact store.
2. **Parent-scoped minting.** The `id_sequences` PK is `artefact_type` alone, so parent-scoped formats (`KR-NN.M`, `C-N.M.FXX`, `BC-NN.GT-NN`, and any future `PRD-NNNN.US-NN`) are declared in the ID-format table but unmintable (filed as OI-0068).
3. **Nested hashing.** ADR-0007's hash scope covers a binding's heading down to the next same-or-higher heading — so a child section bound inside its parent's span is hashed twice, and one story edit produces two drift rows.
4. **Umbrella frontmatter.** [ADR-0011 — OKF frontmatter baseline](adr-0011-okf-artefact-frontmatter-baseline.md) mandates one frontmatter block per file, but a mixed file (a PRD containing US children) has no rule for which artefact the block describes or where per-artefact lifecycle `status` lives.

The gap blocks **PRD-0001**: the first PRD must itself be authored as a PRD file with embedded user stories under this contract — the contract has to exist before the artefact that dogfoods it. Decided in the [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-25-multi-artefact-contract.md) (D1–D6); this ADR is the record. **Closes OI-0070 and OI-0068** (ledger closures handled in the open-items pass).

## Decision Drivers

- **PRD-0001 is blocked on this contract**, and the dogfood requirement is strict: the first PRD is authored under the contract, not grandfathered around it.
- **Traceability requirement.** Implementation-plan increments and tests must reference stable story IDs; anonymous prose sections cannot anchor a trace.
- **ADR-0015 pick-and-choose.** [ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md) makes enablement per-artefact-type; `spec-prd` must work without `spec-use-case`, so any story↔use-case bridge must be relational, never typological.
- **One edit → one drift row.** ADR-0007's actionable-signal driver extends to nested bindings: a single story edit that produces both a child and a parent drift row teaches the operator to ignore `clew check`.
- **Parent-scoped formats already exist on paper.** `KR-NN.M`, `C-N.M.FXX`, `BC-NN.GT-NN` are in the artefact store's ID-format table today; the minting gap (OI-0068) is a standing contradiction this decision must not widen.
- **Umbrella precedent.** ADR-0011 collection files already carry one frontmatter block describing the file, not each bound artefact; the mixed-file rule should extend that precedent, not invent a second one.

## Considered Options

**Story representation (Q1):**

- **A. `user_story` as a new PRD-scoped artefact type (chosen).** IDs, inheritance, and drift detection identical to the OBJ→KR pattern.
- **B. No IDs — plain markdown sections inside the PRD.** Rejected: fails the traceability requirement; increments and tests would reference headings that rename silently.
- **C. Stories are use-case slices (`use_case` children).** Rejected: couples every PRD to the use-case corpus, breaking ADR-0015 pick-and-choose for repos that enable `prd` without `use_case`.

**Nested hash scope (Q2):**

- **A. Parent hash excludes child-bound sections (chosen).** Parent hash = the parent's own prose only.
- **B. Keep the overlap, suppress parent rows at report time.** Rejected: distinguishing parent-own drift from child-caused drift at report time secretly requires computing the excluded hash anyway, while the stored overlapping hashes keep churning in snapshot diffs.

The remaining sub-contracts (Q3.1–Q3.4: umbrella frontmatter, composite key, taxonomy rationale, renames/collisions) had one coherent design each; the session confirmed them without a named rejected alternative.

## Decision Outcome

Chosen: **`user_story` as a PRD-scoped type with child hash exclusion, umbrella frontmatter, and composite-key minting** — the six decisions below, in the session record's canonical wording.

- **D1 — `user_story` is a new PRD-scoped artefact type.** ID `PRD-NNNN.US-NN`, layout `inherits-from-parent` (the OBJ→KR pattern); `prd` itself is `one-per-artefact` (`docs/product-specs/prds/prd-NNNN-{slug}.md`, or the registry's canonical path). Stories are delivery slices: born and retired with their PRD, referenced by implementation-plan increments and tests. They are NOT use-case slices: the bridge to `use_case` is an optional soft edge (`covers`, a declared absence when use cases aren't enabled per [ADR-0015](adr-0015-opt-in-layer-packages.md)) — relational, never typological, so `spec-prd` works without `spec-use-case`. ADR-0002's layout table gains the two rows accordingly.
- **D2 — Hash exclusion (amends [ADR-0007](adr-0007-file-binding-content-hash-strategy.md)'s scope rule).** A parent binding's hashed bytes EXCLUDE any child section that carries its own binding: parent hash = the parent's own prose only. One edit → one drift row; a parent's `content-drift` means exactly "the parent's own narrative changed". Binding or unbinding a child re-hashes the parent once (its covered byte-range changed). OBJ/KR inherits the fix with zero extra work.
- **D3 — Umbrella frontmatter.** One frontmatter block per file; `type:` = the file-defining artefact (a PRD file says the PRD's okf_type even though it contains US children; collection files already work this way). Per-artefact lifecycle `status` lives in the store only, written via `clew set`; file-level frontmatter `status` describes the file's primary artefact, nothing else.
- **D4 — `id_sequences` composite key (closes OI-0068).** The PK becomes `(artefact_type, parent_business_id)`, with `parent_business_id = ''` for root types. This is what makes parent-scoped formats (`KR-NN.M`, `C-N.M.FXX`, `PRD-NNNN.US-NN`, `BC-NN.GT-NN`) mintable.
- **D5 — Layout-taxonomy rationale, now recorded (amends [ADR-0002](adr-0002-artefact-file-binding.md), which fixed the enum without recording the derivation rule).** `single-collection` = homogeneous catalogues whose value comes from side-by-side comparison (personas, capabilities, objectives, glossary index). `one-per-artefact` = long-form documents read alone (ADRs, PRDs, competitor profiles, implementation plans). `inherits-from-parent` = children meaningless outside their parent's context (KRs, user stories, glossary terms, vs_stages). This is the derivation rule for every future type registration.
- **D6 — Renames and collisions.** Heading renames remain `anchor-missing` drift, repaired via `clew bind --update` ([ADR-0007](adr-0007-file-binding-content-hash-strategy.md)'s reconciliation path, unchanged). Anchor collisions between bound sections are structurally impossible: the anchor embeds the globally-unique business ID (ADR-0002's `<lowercase-id>--<slug>` convention).

### Positive Consequences

- **PRD-0001 is unblocked** — and is authored as the contract's own first dogfood: a `prd` file with bound `user_story` children.
- **One drift row per edit.** `clew check` output stays high-signal on mixed files; the parent's `content-drift` is now an exact statement about the parent's own prose.
- **Every parent-scoped format becomes mintable** — `KR-NN.M`, `C-N.M.FXX`, `PRD-NNNN.US-NN`, `BC-NN.GT-NN` — closing the standing contradiction between the ID-format table and the `id_sequences` DDL.
- **The layout taxonomy is now a derivation rule, not a lookup table** — future type registrations (including ADR-0015 layer-package types) classify themselves against D5 instead of arguing from precedent.
- **Frontmatter stays one-block-per-file** — the mixed-file rule extends ADR-0011's collection precedent instead of forking it.

### Negative Consequences

- **The section-extent rule is more complex.** A parent's hashed span is no longer a contiguous byte range; the hasher must subtract every child-bound sub-range, and the extent computation must stay deterministic across canonicaliser runs.
- **Child bind/unbind re-hashes the parent.** Structurally correct (the parent's covered byte-range changed) but a second-order effect operators must learn: adding a story to a PRD touches the PRD's binding row too.
- **`user_story` adds one type to the product-specs package** — more drift surface for repos that enable it. It is NOT in the mandatory v1 spine until the mandatory type list says so, consistent with [ADR-0015](adr-0015-opt-in-layer-packages.md): the enablement choice prices the drift surface.

## Related decisions

- [ADR-0002 — artefact file binding](adr-0002-artefact-file-binding.md) — **amended**: the §Layout taxonomy table gains the `prd` (one-per-artefact) and `user_story` (inherits-from-parent, parent `prd`) rows, and the layout-taxonomy derivation rule (D5) is now recorded. The three-category enum, the anchor convention, and the multi-anchor out-of-scope clause are unchanged.
- [ADR-0007 — file-binding content-hash strategy](adr-0007-file-binding-content-hash-strategy.md) — **amended**: the §Hash scope rule gains the child-exclusion clause (D2); child bind/unbind re-hashes the parent. Canonicalisation, single hash, and the four drift categories are unchanged.
- [ADR-0011 — OKF artefact frontmatter baseline](adr-0011-okf-artefact-frontmatter-baseline.md) — **consistent**: D3's umbrella rule extends its one-block-per-file collection precedent to mixed files.
- [ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md) — **consistent**: `user_story` honours pick-and-choose (the `covers` soft edge is a declared absence when `use_case` is unenabled), and the type stays off the mandatory spine.
- [ADR-0016 — two-speed integrity: edge property bag](adr-0016-two-speed-integrity-edge-property-bag.md) — **consistent**: the `covers` edge rides the `artefact_references` property bag and its review lifecycle; its verb registration joins OI-0074's ratification set as a ⚠ proposal.
- Closes **OI-0070** (multi-artefact file contract) and **OI-0068** (`id_sequences` composite key) — [open-items ledger](../../../project-control/open-items/open-items.md).

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| `prd` + `user_story` type rows (package registry) | [Product-specs package](../../metamodel/packages/product-specs.md) |
| ID-format table, property schemas, `id_sequences` composite-key DDL | [Artefact Store model](../../domain/07b-models/artefact-store.md) |
| `covers` (`user_story → use_case`) ⚠ proposal into the ratification set (OI-0074) | [Relationships catalogue](../../metamodel/relationships.md) |
| Kit registry projection of the new type rows (follow-up OI; clew-side first per [ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md)) | `homemade-claude-kit` metamodel skill `references/artefact-types-registry.yaml` |
| `spec-prd` authoring flow (embedded US, `covers` declared absence) | `homemade-claude-kit` `spec-prd` skill (kit-side decision) |
| Decision record (D1–D6 canonical wording) | [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-25-multi-artefact-contract.md) |
| OI-0070 + OI-0068 closure | [Open-items ledger](../../../project-control/open-items/open-items.md) |
