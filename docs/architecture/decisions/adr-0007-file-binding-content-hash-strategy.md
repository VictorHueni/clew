---
type: Architecture Decision Record
title: File-binding content-hash strategy — canonicalised section body via dprint, single hash, four drift categories
description: File-binding content-hash strategy — canonicalise the section body via dprint then SHA-256, with a single hash and four drift categories surfaced by clew check.
tags: [architecture, adr, file-binding]
timestamp: 2026-06-24T16:59:31Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-27
review_interval: 180d
---

# File-binding content-hash strategy — canonicalised section body via dprint, single hash, four drift categories

> **Amended (2026-07-24, [ADR-0013](adr-0013-minimal-model-not-repo-native-ea.md)).**
> ADR-0013 cut the C4.3 audit-trail capability (audit is delegated to git), which this ADR's
> primary decision driver — audit-trail completeness for C4.3 — rested on. The hash strategy
> now stands on drift detection (C4.2) alone. The decision itself (dprint canonicalisation +
> SHA-256, single hash, four drift categories) is unchanged.

> **Amended (2026-07-24, [ADR-0017](adr-0017-multi-artefact-file-contract.md)).** The §Hash scope rule gains a child-exclusion clause: a parent binding's hashed bytes EXCLUDE any child section that carries its own binding — parent hash = the parent's own prose only, so one edit produces one drift row and a parent's `content-drift` means exactly "the parent's own narrative changed". Binding or unbinding a child re-hashes the parent once (its covered byte-range changed). Canonicalisation, the single hash, and the four drift categories are unchanged.

## Context and Problem Statement

[ADR-0002](adr-0002-artefact-file-binding.md) introduces the `file_bindings` table with two drift-detection columns:

```
content_hash     VARCHAR      NULLABLE  # NULL until clew check first hashes the section
last_seen_at     TIMESTAMPTZ  NULLABLE  # NULL until clew check first visits the section
```

ADR-0002 commits to *having* a hash, names the column, and assigns the responsibility of populating it to `clew check`. It does **not** decide:

- **What bytes are hashed** — the whole file? The section body? Headings included? Subsections included?
- **Whether the bytes are normalised before hashing** — raw markdown, or canonicalised through a formatter?
- **How drift surfaces** — is "the prose changed" the same event as "the heading was renamed" as "the file disappeared"?
- **What happens when the hashing rule itself changes** — a formatter swap, a canonicaliser config bump, would invalidate every stored hash; what's the migration path?

This gap is load-bearing for the substrate's stated promise. [C4.2 Drift detection](../../business/03a-capability-map.md#c42--drift-detection) and [GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) both depend on `clew check` producing actionable, low-noise signal. The kit's `util-docs-lint` workflow runs dprint on every PR; if drift detection hashes raw bytes, every CI pass produces drift across every binding, the operator learns to ignore `clew check` output, and the substrate fails by becoming noisy.

A second concern rides alongside: [GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) currently enumerates several detection cases informally in its Anti-patterns section (Orphan in file, Orphan in DB, Content drift, Layout violation) without making them a typed surface. Operators acting on `clew check` output need a stable category vocabulary so different drift kinds can be prioritised differently — a missing file is structurally different from a prose edit, and they warrant different operator responses.

The question this ADR closes: **what is the precise hash strategy that backs `content_hash`, and how do drift categories surface from it?**

Two non-negotiable constraints frame the answer:

- **Preserve ADR-0002's schema commitment.** `content_hash` and `last_seen_at` are already part of ADR-0002's `file_bindings` table. Any decision here extends that schema additively; it does not rename the column or redirect the persistence target.
- **Serve the dominant goal of the hash.** Per the [previous goal-ranking analysis](#decision-drivers), the hash exists primarily for *audit-trail completeness* — so [C4.3 Audit trail](../../business/03a-capability-map.md#c43--audit-trail) can claim to record meaningful state changes, not just DB-side ones. Secondary goals (trust signal on query results, reconciliation prompt) are nice-to-haves that fall out of the audit-completeness design without driving it.

## Decision Drivers

- **Audit-trail completeness is the primary goal.** Every meaningful narrative edit should leave a trace; the hash is the mechanism that lets `clew log` / `clew history` claim it sees beyond the DB. Formatter-only byte changes are not meaningful edits in this sense.
- **Robustness to formatter passes.** The kit's `util-docs-lint` workflow runs dprint on every PR (formatting), Vale (prose style), and markdown-link-check (links). Hashing raw bytes would put every binding into permanent drift after every CI run.
- **Actionable signal, not noise.** Drift categories should map to distinct operator responses — a missing file needs a restore, a content edit needs a binding refresh, a canonicaliser change needs a one-time bulk reconcile.
- **Distinct structural vs content failure surfaces.** Anchor resolution failure ("the heading was renamed") and content drift ("the prose under the same heading changed") are structurally different events; the audit and the operator both benefit from separating them.
- **Minimal schema delta.** ADR-0002 already added `content_hash` + `last_seen_at`. This ADR should add at most one column, not redesign the table.
- **Forward compatibility on formatter choice.** The formatter ecosystem evolves (prettier strengthened markdown support, biome is gaining ground). A formatter swap five years out should be recognisable as a metamodel migration — a new ADR, not a code change buried in `crud.py`.
- **No new dependency surface in v1.** dprint is already shipped via the kit's `util-docs-lint`; reusing it costs zero net dependency. A bespoke markdown-AST canonicaliser would add a Python parser, more code to maintain, and a second source of truth for "what counts as the same prose."

## Considered Options

- **A. Raw section bytes.** SHA-256 the bytes between the binding's heading and the next same-or-higher heading, with no normalisation.
- **B. Hand-rolled normaliser.** Strip trailing whitespace, normalise EOL (LF), normalise final newline, then SHA-256. No external dependency, partial coverage of formatter noise.
- **C. Canonicalise via dprint, then hash.** Run the section bytes through dprint's markdown formatter (the one bundled in `util-docs-lint`), then SHA-256 the result. Adds a `canonicaliser_version` column to `file_bindings` so config changes are detectable. *(Chosen.)*
- **D. Split into `heading_hash` + `body_hash`.** Two columns, two drift categories. Heading change vs content change separable at the schema level.
- **E. Hash only the heading line (or heading + first paragraph).** Catches the most-common structural drift cheaply; misses prose edits.

## Decision Outcome

**Chosen option: C — canonicalise via dprint, then SHA-256**, with a single hash, the section body scope, and four drift categories surfaced by `clew check`.

Concretely, the decision binds the following:

### Hash scope

A binding's hashed bytes are bounded by **the line after the binding's heading down to (but not including) the next heading at the same level or shallower**. Standard markdown section semantics:

- A binding at `## P-01 · Ava …` includes its `### §Goals` and `### §Frustrations` subsections (they are P-01's narrative).
- A binding at `#### Artefact · BC-01.GT-01` ends at the next `####`, `###`, `##`, or `#`.

The heading line itself is **not** part of the hashed bytes. Heading edits change the [section anchor](../../domain/02c-glossary.md#section-anchor--bc-01gt-08) (derived from heading text via `SectionAnchor.derive(business_id, heading_text)`); they surface through anchor-resolution failure, not through content_hash mismatch.

### Canonicalisation

Section bytes are passed through dprint's markdown formatter before SHA-256, using the dprint config pinned in the kit's `util-docs-lint` workflow. Dprint normalises:

- EOL (LF/CRLF) → LF
- Trailing whitespace per line → stripped
- Final-newline presence → exactly one
- Markdown table cell padding → normalised
- List bullet style → normalised to config default

Dprint does **not** normalise (and these therefore *do* contribute to the hash):

- Word-level prose changes inside paragraphs
- Added/removed paragraphs
- Added/removed lists, tables, or code blocks
- Code-block content (treated as opaque)

### Schema delta on `file_bindings`

ADR-0002's table gains one column:

```
canonicaliser_version  VARCHAR   NULLABLE  # dprint config hash at last successful check();
                                           # NULL until first check()
```

The triple `(content_hash, canonicaliser_version, last_seen_at)` together describe "what the section looked like, under which canonicalisation, at what time."

### Drift categories surfaced by `clew check`

`clew check` produces exactly four drift categories. Each binding row is classified into exactly one of these (or reports OK):

| Category                  | Trigger                                                                                                                                                                                                                | Operator response                                                                                              |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `file-missing`            | `file_path` does not exist on disk                                                                                                                                                                                     | Restore the file from VCS, or `clew rebind <id> --file <new>` if the move is intended                          |
| `anchor-missing`          | File exists but no heading resolves to the stored `section_anchor` (heading was renamed, removed, or the section was moved within the file)                                                                            | `clew rebind <id> --anchor <new>` if the rename is intended; otherwise restore the heading                     |
| `content-drift`           | File and anchor resolve, but the canonicalised SHA-256 of the section body differs from the stored `content_hash`                                                                                                      | Usually `clew bind --update <id>` to accept the edit; revert prose only if the edit was unintended             |
| `canonicaliser-changed`   | `canonicaliser_version` on the binding does not match the current dprint config hash                                                                                                                                   | Once, after a formatter config/version bump: `clew bind --update --all` to rehash every binding under the new canonicaliser |

A binding reports OK iff: file exists AND anchor resolves AND `canonicaliser_version` matches current AND `content_hash` matches the current canonicalised section body.

The categories are mutually exclusive in any single check run, evaluated top-down: `file-missing` short-circuits the others; `anchor-missing` short-circuits content and canonicaliser checks; `canonicaliser-changed` is reported in preference to `content-drift` because rehashing under the new canonicaliser is the only way to know whether the content actually changed or only the normalisation rules did.

### Phased rollout

Phase 1 (this ADR landing — no code yet):

- Document the strategy decision in this ADR.
- ADR-0002 §Schema additions and §Decision Outcome → §Authoring flow gain a forward pointer to this ADR for hash scope and canonicalisation details.
- No schema migration, no `crud.py` change.

Phase 2 (next clew increment, before any drift-detection ships):

- Implement `canonicaliser_version` column in `file_bindings` (additive migration; existing rows get `NULL`).
- Implement the four-category classifier in `clew check`.
- Implement `clew bind --update <id>` and `clew bind --update --all` per the operator-response column.
- Pin the dprint config hash in clew's source so the comparison in the `canonicaliser-changed` category is deterministic.
- Update [07b §AGG-03 FileBinding](../../domain/07b-models/artefact-store.md#filebinding--bc-01agg-03) invariants and `check()` behaviour to reflect the canonicalised hash contract.
- Update [02c §GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) to enumerate the four categories as the canonical vocabulary.

Phase 3 (deferred — depends on Phase 2 operator experience):

- Decide whether `content-drift` produces too much noise in practice and should be split (e.g. structural-change vs prose-only) per the alternative considered in Option D.
- Decide whether to replace dprint canonicalisation with a markdown-AST canonicaliser if formatter coupling becomes a maintenance burden.
- These decisions get their own ADR; this one stays scoped to the v1 choice.

### Rationale

- **A** (raw bytes) is the simplest rule but predictably broken: the kit ships docs-lint in CI, formatter passes will run, and every CI run produces drift on every binding. Operators will learn to ignore `clew check`, which defeats the audit-completeness goal.
- **B** (hand-rolled normaliser) catches the most common formatter noise (EOL, trailing whitespace) but misses table-alignment normalisation, list-bullet normalisation, and any future dprint refinements. We'd be writing a worse dprint, indefinitely.
- **C** (dprint canonicalisation) is the only option that makes the hash invariant under exactly the byte changes that aren't meaningful edits. The dprint dependency already ships with the kit's docs-lint; reusing it costs zero net dependency. The `canonicaliser_version` column makes formatter swaps a recognisable migration rather than silent breakage.
- **D** (split heading_hash + body_hash) adds taxonomy without adding signal. The model already separates "heading changed" (surfaces as `anchor-missing` because anchor is derived from heading text via `SectionAnchor.derive`) from "prose changed" (surfaces as `content-drift`). Adding a heading_hash column would re-encode information the anchor-resolution check already provides.
- **E** (heading-only or heading + first paragraph) catches structural drift cheaply but defeats the primary goal: prose edits become invisible to the audit trail. If the audit can't see narrative changes, the substrate's promise of replayable history is incomplete.

The phased rollout is deliberate. Phase 1 is documentation only (this ADR + a pointer in ADR-0002); Phase 2 is additive (one new column, one new classifier, one CLI flag); Phase 3 only happens if Phase 2 surfaces operator demand. This matches the project's preference for sequential plans and trust-but-verify execution.

## Confirmation

The decision is confirmed when all of the following hold:

- ADR-0002 §Schema additions carries a forward pointer to this ADR for the hash scope and canonicalisation contract.
- [07b §AGG-03 FileBinding](../../domain/07b-models/artefact-store.md#filebinding--bc-01agg-03) invariants explicitly reference the canonicalisation contract; the `check()` behaviour entry pins the four categories.
- [02c §GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) enumerates the four categories as canonical vocabulary; the Anti-patterns section is rewritten to reference them by name.
- [`docs/architecture/interfaces/cli-clew.md`](../interfaces/cli-clew.md) `clew check` command documents the four-category output and `clew bind --update [--all]` flag.
- Phase 2 implementation produces a `clew check` run where a `dprint` upgrade triggers exactly one `canonicaliser-changed` row per binding, resolvable with one `clew bind --update --all` invocation.

## Consequences

**Positive**

- Audit trail records narrative edits semantically — formatter-only byte churn does not pollute the signal.
- Four-category drift surface gives operators distinct, actionable responses; `clew check` becomes high-signal output.
- Schema delta is minimal: one column added to ADR-0002's existing table.
- Reuses the kit's existing dprint dependency; no new third-party tools enter clew's runtime surface.
- Formatter swaps are recognisable as metamodel migrations (new ADR superseding this one), not silent code changes.
- Heading-edit and content-edit drift remain structurally distinct surfaces, served by anchor-resolution and content_hash respectively.

**Negative**

- clew gains a build-time coupling to dprint's normalisation behaviour. A future formatter swap requires a metamodel ADR, not just a `pyproject.toml` bump.
- Formatter config/version changes invalidate all stored `content_hash` values. The `canonicaliser-changed` category and `clew bind --update --all` make this recoverable in one operation, but it is a one-time mass drift event each time the canonicaliser bumps.
- `clew check` runs dprint per section, which adds latency vs raw hashing. At realistic repo sizes (≤1000 bindings) the overhead is sub-second; at much larger scales the per-section cost would need re-evaluation.
- The four-category surface is fixed at v1; adding a fifth category later requires a CLI contract update and likely a new ADR (or a refresh of this one if categories are reorganised wholesale).

**Neutral**

- Operators who hand-edit prose intentionally will see `content-drift` on every meaningful edit. This is the design — the audit trail wants to see the edit — but requires operator readiness to act on (or dismiss with `clew bind --update`) the new signal.
- The split between `content-drift` and `canonicaliser-changed` is currently a category-level discrimination. If formatter config bumps become routine, Phase 3 may revisit whether `canonicaliser-changed` is silently absorbed by a single CLI flag (`clew bind --update --all` becoming `clew check --rehash`) rather than surfaced as its own category.

## Pros and Cons of the Options

### A. Raw section bytes

- ✅ Simplest rule; one-line implementation.
- ❌ Every CI formatter pass produces drift on every binding. Audit-completeness signal collapses into noise.
- ❌ Cross-machine noise (EOL, line endings) trips the hash on environment differences alone.

### B. Hand-rolled whitespace/EOL normaliser

- ✅ No external dependency; pure Python.
- ✅ Catches the most-common formatter noise.
- ❌ Will never catch as much as dprint catches (table alignment, list markers, complex constructs).
- ❌ Becomes a permanent maintenance burden tracking dprint's improvements.

### C. dprint canonicalisation + SHA-256 (chosen)

- ✅ Invariant under formatter passes (the kit's CI behaviour does not produce drift).
- ✅ Cross-machine stable (dprint normalises EOL, whitespace, final newline).
- ✅ Zero net dependency cost (dprint already ships in `util-docs-lint`).
- ✅ Forward-compatible: a formatter swap is a metamodel migration, recognisable as such.
- ❌ Build-time coupling to dprint's normalisation behaviour.
- ❌ Formatter config bumps trigger a one-time mass drift event (mitigated by `clew bind --update --all`).

### D. Split `heading_hash` + `body_hash`

- ✅ Heading vs content drift separable at the schema level.
- ❌ Adds a column whose information is already provided by anchor-resolution checks.
- ❌ Doubles the canonicalisation work per binding without adding net signal.
- ❌ MADR-style supersession is whole-ADR; conflating two sub-decisions in this ADR makes future refinement harder.

### E. Hash only the heading (or heading + first paragraph)

- ✅ Cheapest to compute.
- ✅ Catches the most-common structural drift.
- ❌ Prose edits invisible to the audit trail — defeats the primary goal.
- ❌ Reduces clew's trust-substrate promise to "the heading didn't change."

## Out of scope for this ADR

- Multi-anchor-per-binding (an artefact whose narrative spans multiple non-contiguous sections). Excluded by [ADR-0002 §Out of scope](adr-0002-artefact-file-binding.md#out-of-scope-for-this-adr); this ADR inherits that exclusion.
- DB-to-markdown render of narrative. Excluded by [ADR-0001](adr-0001-metamodel-persistence-layer.md); this ADR inherits that exclusion.
- Frontmatter drift. Covered separately by [ADR-0005](adr-0005-frontmatter-persistence-policy.md); the `last_reviewed` / `status` / `owner` cache lives in its own surface, not in `content_hash`.
- The `clew bind` CLI signature in detail. The flag exists per this ADR; the full subcommand documentation belongs in [`docs/architecture/interfaces/cli-clew.md`](../interfaces/cli-clew.md).

## Related decisions

- Refines: [ADR-0002 Bind metamodel artefacts to narrative files via a typed layout convention](adr-0002-artefact-file-binding.md). ADR-0002 reserved the `content_hash` / `last_seen_at` columns and named `clew check` as the populator; this ADR specifies the hash contents, canonicalisation, schema delta, and the operator-facing drift surface.
- Depends on: [ADR-0001 Persistence layer](adr-0001-metamodel-persistence-layer.md).
- Sibling of: [ADR-0005 Frontmatter persistence policy](adr-0005-frontmatter-persistence-policy.md). Both ADRs add `clew check` modes that compare DB state to markdown state; ADR-0005 covers frontmatter fields, this ADR covers narrative body content.
- Soft-links to: [C4.2 Drift detection](../../business/03a-capability-map.md#c42--drift-detection), [GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12), [VS-3.4 Confirm No Drift](../../business/04a-value-streams.md#vs-34--confirm-no-drift), [VS-4.1 Confirm Snapshot Is Current](../../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current).

## Dependent artefacts

| Concern                                                            | Where it lives                                                                                              |
| :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| Forward pointer from ADR-0002 §Schema additions to this ADR        | [ADR-0002 Schema additions §file_bindings](adr-0002-artefact-file-binding.md#schema-additions) — Phase 1   |
| `canonicaliser_version` column DDL + AGG-03 invariants/`check()` contract | [Artefact Store domain model §AGG-03 FileBinding](../../domain/07b-models/artefact-store.md#filebinding--bc-01agg-03) — Phase 2 |
| Four-category drift vocabulary                                     | [02c-glossary.md §GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) — Phase 2                  |
| `clew check` four-category output contract + `clew bind --update [--all]` | [CLI interface contract](../interfaces/cli-clew.md) — Phase 2                                              |
| `util-metamodel-audit` Check 16 (drift detection) coordination     | `util-metamodel-audit/references/check-catalogue.md` — Phase 2 (kit-side; may defer to `clew check` once stable) |

## Open Items

| OI-ID  | Type           | Summary                                                                                                                                                                                                                          | Source anchor                  | Source heading                                            | Resolution path                                                                                                                                                                                              | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0047 | doc-gap        | ADR-0002 §Schema additions and §Authoring flow still describe `content_hash` without a forward pointer to this ADR. After this ADR lands, add a pointer sentence so readers of ADR-0002 know where the hash strategy is decided. | #decision-outcome              | Decision Outcome — Phase 1                                | Edit [adr-0002 §Schema additions and §Authoring flow](adr-0002-artefact-file-binding.md) to insert a one-sentence forward pointer. Single commit; co-bundled with this ADR's landing.                       | high     | closed | Victor Hueni | 2026-06-15        | Pointer present in ADR-0002 (§Schema additions blockquote, §Authoring flow, §Related decisions) — verified 2026-07-24 |
| OI-0048 | doc-gap        | [07b §AGG-03 FileBinding](../../domain/07b-models/artefact-store.md#filebinding--bc-01agg-03) invariants and `check()` behaviour do not yet reflect the canonicalised-hash contract or the `canonicaliser_version` attribute.   | #decision-outcome              | Decision Outcome — Phase 2                                | Update AGG-03 invariants + entity attribute table + `check()` behaviour + §Physical schema to add `canonicaliser_version`. Single commit; reference this ADR throughout.                                    | high     | open   | Victor Hueni | 2026-06-30        | _TBD_       |
| OI-0049 | doc-gap        | [02c §GT-12 Drift](../../domain/02c-glossary.md#drift--bc-01gt-12) Definition + Anti-patterns reference drift cases informally. Update to enumerate the four canonical categories as the shared vocabulary.                       | #decision-outcome              | Decision Outcome — Phase 2                                | Edit GT-12 Drift: replace informal enumeration with `file-missing` / `anchor-missing` / `content-drift` / `canonicaliser-changed`; rewrite Anti-patterns to reference them by name; add Code convention note. | high     | open   | Victor Hueni | 2026-06-30        | _TBD_       |
| OI-0050 | doc-gap        | [`docs/architecture/interfaces/cli-clew.md`](../interfaces/cli-clew.md) `clew check` command and `clew bind` subcommand still need to document the four-category output and the `--update [--all]` flag.                          | #decision-outcome              | Decision Outcome — Phase 2                                | Update the CLI contract `clew check` section to list the four categories with example output; document `clew bind --update <id>` and `clew bind --update --all` flag semantics. Reference this ADR.          | high     | closed | Victor Hueni | 2026-06-30        | 2026-07-24 CLI contract update — [cli-clew.md](../interfaces/cli-clew.md) `clew check` now lists the four categories and documents `clew bind --update [--all]` |
| OI-0051 | decision-gap   | The dprint coupling is now load-bearing for drift-detection correctness. Document the formatter-swap policy: any future swap (prettier, biome, custom AST canonicaliser) must land as a new ADR superseding this one, not as a routine dependency bump. | #consequences                  | Consequences — Negative                                   | Add an explicit "formatter-swap policy" note to [07b §AGG-03 FileBinding](../../domain/07b-models/artefact-store.md#filebinding--bc-01agg-03) when Phase 2 lands; cross-link this ADR's negative-consequence row. | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0052 | decision-gap   | Phase 3 — does `content-drift` produce too much operator noise after 1–2 months of `clew check` runs against active development? If so, split into structural-change vs prose-only drift (Option D revisited).                  | #decision-outcome              | Decision Outcome — Phase 3                                | After Phase 2 ships, run `clew check` weekly against the active repo; classify each `content-drift` row as "structural" (added/removed paragraphs, lists, tables) vs "prose-only" (word edits within paragraphs); decide whether the split is worth a Phase 3 ADR. | low      | open   | Victor Hueni | 2026-12-31        | _TBD_       |
| OI-0075 | doc-gap        | Naming drift inside the §Drift categories operator-response column: `file-missing` / `anchor-missing` prescribe `clew rebind <id> --file/--anchor`, while `content-drift` / `canonicaliser-changed` prescribe `clew bind --update [--all]` — and `clew rebind` is not documented in [cli-clew.md](../interfaces/cli-clew.md). Decide one reconciliation-command surface and align both documents. | #decision-outcome              | Decision Outcome — the four categories                    | Either fold rebinding into `clew bind --update` variants or document `clew rebind` in the CLI contract; update the operator-response column to the surviving spelling.                                        | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |

## Changelog

| Date | Change | Author |
| :--- | :----- | :----- |
| 2026-05-27 | Initial draft. Closes the hash-strategy gap left by ADR-0002 (which reserved `content_hash` + `last_seen_at` but did not decide their contents or canonicalisation). Decision C (dprint canonicalisation + SHA-256, single hash, four-category drift surface) chosen; phased rollout records three phases (this ADR → schema + classifier + glossary + CLI contract → operator-experience review). Forward-pointer sentence to be added to ADR-0002 in the same commit (OI-0029). | Victor Hueni |
| 2026-07-24 | **Amended by [ADR-0013](adr-0013-minimal-model-not-repo-native-ea.md)** (banner added): C4.3 audit-trail capability cut, audit delegated to git; the hash strategy now stands on drift detection (C4.2) alone, decision unchanged. OI-0047 → `closed` (forward pointer verified present in ADR-0002). OI-0050 → `closed` (CLI contract `clew check` four-category output + `clew bind --update [--all]` documented in [cli-clew.md](../interfaces/cli-clew.md) the same day). | Victor Hueni |
| 2026-07-24 | Open-items renumber (governance sync, no content change): this ADR's rows OI-0029–OI-0034 collided with ledger-owned OI-0029–OI-0033 (canonical since the 2026-05-26 sync) and ADR-0009's OI-0034; renumbered to OI-0047–OI-0052 per the [central ledger](../../../project-control/open-items/open-items.md) mapping. New OI-0075 filed: `clew rebind` vs `clew bind --update` naming drift in the operator-response column. | Victor Hueni |
| 2026-07-24 | **Amended by [ADR-0017](adr-0017-multi-artefact-file-contract.md)** (second banner added): §Hash scope gains the child-exclusion clause — a parent binding's hashed bytes exclude child-bound sections (parent hash = the parent's own prose only), one edit → one drift row; binding or unbinding a child re-hashes the parent once. Canonicalisation, single hash, and four drift categories unchanged. | Victor Hueni |
