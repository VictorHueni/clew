---
type: Architecture Decision Record
title: Adopt Google OKF v0.1 as the artefact frontmatter interchange baseline (superset)
description: Adopts Google OKF v0.1 as a backward-compatible superset baseline for artefact frontmatter, with type sourced from the registry's okf_type display names.
tags: [architecture, adr, frontmatter, okf]
timestamp: 2026-07-01T19:30:31Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-01
review_interval: 180d
---

# Adopt Google OKF v0.1 as the artefact frontmatter interchange baseline (superset)

## Context and Problem Statement

Google Cloud published the [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) on 2026-06-12: a vendor-neutral, "just files" standard that represents knowledge as a directory of markdown documents with YAML frontmatter, cross-linked by ordinary markdown links into a graph, with two reserved filenames (`index.md`, `log.md`) per directory. Its single hard conformance rule is a non-empty `type` field in every concept document's frontmatter; everything else is soft guidance.

The metamodel's own artefact layer is already shaped almost exactly like an OKF bundle: every artefact under `docs/` is a markdown file carrying the five-field frontmatter contract defined in the kit's `rules/artefact-frontmatter.md` (`title`, `status`, `owner`, `last_reviewed`, `review_interval` + conditional `supersedes`/`superseded_by`), placed in a canonical `docs/` tree, cross-linked by ID + relative path. The metamodel is effectively a *superset* of OKF — it adds ID discipline, a dependency graph, review cadence, and supersession chains that OKF does not mandate. The one thing it does **not** do is serialise a `type` field into frontmatter, even though `rules/artefact-types-registry.md` already defines a canonical snake_case `type` per artefact.

Question this ADR closes: **should the metamodel adopt OKF v0.1 as the interchange baseline for the artefacts it produces, and if so, how — without breaking the standalone frontmatter contract or the persistence policy of [ADR-0005](adr-0005-frontmatter-persistence-policy.md)?**

Two constraints frame the answer:

- **The change must be additive.** [ADR-0005](adr-0005-frontmatter-persistence-policy.md) is explicit that the frontmatter contract stays additive and standalone; adopting OKF cannot rename or remove an existing field, nor make the contract OKF-tool-dependent.
- **clew is the metamodel SoT** ([ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md)) — the decision originates here and propagates to the kit.

## Decision Drivers

- **Zero-cost interoperability.** OKF is emerging as an interchange lingua franca (Google's Knowledge Catalog, the reference graph visualiser, OKF-speaking agents). Conformance costs one frontmatter field the registry already taxonomises.
- **Preserve the superset.** IDs, the dependency graph, review cadence, and supersession must survive — OKF forbids consumers rejecting unknown fields, so they remain valid OKF *extension* fields.
- **Keep the contract additive and standalone** (per ADR-0005): no field renamed or removed; usable without any OKF tooling.
- **`type` must be a stable, curated value, not LLM-inferred** — it is both an identifier and, per OKF, a presentation label, so it needs a single canonical source.
- **Anchor to an external standard** rather than a bespoke convention, future-proofing the metamodel.

## Considered Options

- **A. Do nothing.** Keep the bespoke five-field contract. Costs nothing but forgoes interoperability and an external anchor; the metamodel stays OKF-shaped by accident, not by contract.
- **B. Backward-compatible superset (chosen).** Add the six OKF fields (`type` required, `title`, `description`, `resource`, `tags`, `timestamp`) ahead of the existing lifecycle fields, adopt the `index.md`/`log.md` reserved files, and source the `type` display name from the registry. Nothing removed; every existing guarantee kept as an OKF extension.
- **C. Full remap to OKF's exact vocabulary.** Rename `last_reviewed` → `timestamp`, drop kit-specific fields, converge on OKF's names only. Maximal purity, but breaks the standalone contract, discards review-cadence semantics, and violates ADR-0005's additive constraint.
- **D. `type` as snake_case machine key** (`prd`, `persona`). Valid OKF (any short string), but against OKF's idiom — its own examples use human-readable Title Case (`BigQuery Table`), because `type` doubles as the presentation label a consumer renders.

## Decision Outcome

**Chosen: B — a backward-compatible OKF superset**, scoped to the artefacts the metamodel *generates* (`docs/**`).

1. **Frontmatter becomes an OKF superset.** The six OKF fields precede the existing lifecycle fields:

   ```yaml
   type | title | description | resource (omit when no external asset) | tags | timestamp
   status | owner | last_reviewed | review_interval | (supersedes | superseded_by)
   ```

   The lifecycle fields remain valid OKF **extension** fields (OKF consumers must not reject unknown keys). **No existing field is renamed or removed** — the ADR-0005 additive constraint holds.

2. **`type` carries a curated OKF display name**, not a machine key and not an LLM guess. The canonical mapping lives in `rules/artefact-types-registry.md` as an `okf_type` column (Title Case, e.g. `prd` → `Product Requirements Document`, `bounded_context` → `Bounded Context`); the snake_case `type` stays the internal key. This exercises [ADR-0006](adr-0006-canonical-home-for-artefact-type-definitions.md) — the registry is the canonical home for type definitions, now including their OKF display name.

3. **Reserved files `index.md` + `log.md` are adopted** per directory. Both are frontmatter-free directory aids, **not** concept documents; the bundle-root `docs/index.md` carries only `okf_version: "0.1"`. The prior frontmatter-bearing `INDEX.md` navigation hub migrates to a frontmatter-free `index.md`.

4. **Field classification under ADR-0005's model** (closing part of ADR-0005 §OI-0023). The new fields split cleanly by semantic class:
   - *Type-derived / structural* — `type` (a projection of the artefact's registered `okf_type`) and `timestamp` (last-change, derivable from git/DB). Like `supersedes`, these have a better primary representation than hand-authoring; a persistence backend can project them.
   - *Authored* — `description`, `resource`, `tags` are human-curated (markdown-as-source), joining the authored-cadence class.

**Conformance is deliberately loose** (matching OKF): the only hard rule is a non-empty, registered `type`; missing optional fields, unknown types, and broken links are tolerated. The kit's `util-metamodel-audit` Check 17 enforces the stricter superset (`type` required + validated against the `okf_type` enum, root `index.md` + `okf_version`, plus a stale-index freshness sub-check), while remaining report-only.

**Scope boundary:** this covers the artefacts the metamodel *generates*. Whether the kit's own `skills/` + `rules/`, and clew's own `docs/`, are themselves published as OKF bundles is a separate decision (see §Open Items). arc42 section documents take a single umbrella `type: Architecture Documentation` (KISS). Per-instance explosion of `single-collection` artefacts is deferred.

## Consequences

**Positive** — every generated `docs/` tree is now a conformant OKF bundle, ingestible by OKF consumers, while keeping IDs, the DAG, review cadence, and supersession as extension fields; `type` is anchored to a curated registry value; two OKF reserved-file generators (`util-docs-index`, `util-docs-log`) give the kit deterministic index/log materialisation.

**Negative / cascade** — as the SoT change this propagated to the kit (already merged, see §Open Items): the frontmatter rule + type registry rewritten, `type` serialised across ~45 producer skills, audit + migration + scaffold updated, the `INDEX.md`→`index.md` sweep, and arc42 typing.

**clew-side consequence (future)** — when clew implements the Phase 2 frontmatter ingestion of [ADR-0005](adr-0005-frontmatter-persistence-policy.md), `clew import md` must parse the OKF superset (not just the five fields), and the file-binding model of [ADR-0002](adr-0002-artefact-file-binding.md) must treat `index.md`/`log.md` as **reserved, non-artefact** files (skipped by import, excluded from the artefact graph). `type` and `timestamp` become the DB-derivable fields under ADR-0005's field-class model.

## Related decisions

- **Exercises** [ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md) — clew defines the metamodel; the kit conforms downstream.
- **Extends (does not supersede)** [ADR-0005](adr-0005-frontmatter-persistence-policy.md) — changes the field *set* the persistence policy applies to and classifies the new fields per its two-class model (partially closing its OI-0023). ADR-0005's ownership/sync decision stands.
- **Exercises** [ADR-0006](adr-0006-canonical-home-for-artefact-type-definitions.md) — the artefact-type registry is the canonical home for the new `okf_type` display names.
- **Same SoT→kit pattern as** [ADR-0009](adr-0009-plan-package-split-from-product-specs.md) and [ADR-0010](adr-0010-agent-package-agent-centric-development-cycle.md) — decision originates in clew, cascaded to the kit by manual PR.

## Open Items

| OI-ID  | Type           | Summary                                                                                                          | Source anchor        | Source heading    | Resolution path                                                                                                          | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0038 | execution-item | Kit cascade — OKF superset frontmatter, `okf_type` mapping, audit/migration/scaffold updates, `INDEX.md`→`index.md`, producer rollout, arc42 typing, `util-docs-index` + `util-docs-log`. | #decision-outcome    | Decision Outcome  | Kit-side PR (manual, ahead of `clew metamodel export`).                                                                 | high     | closed | Victor Hueni | 2026-07-01        | [kit PR #56](https://github.com/VictorHueni/homemade-claude-kit/pull/56) merged (`2796762`) |
| OI-0039 | execution-item | clew ingestion — teach `clew import md` (ADR-0005 Phase 2) to parse the OKF superset, and the ADR-0002 binding to treat `index.md`/`log.md` as reserved non-artefact files. | #consequences        | Consequences      | Fold into the ADR-0005 Phase 2 increment; add the reserved-file skip to the import path.                                | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0040 | decision-gap   | Should clew's own `docs/` and the kit's own `skills/`/`rules/` be published as OKF bundles (self-adoption), or does OKF stay scoped to generated product artefacts? | #decision-outcome    | Decision Outcome — Scope boundary | Decide alongside kit issue [#53](https://github.com/VictorHueni/homemade-claude-kit/issues/53) (kit-self bundle); if yes, mint a follow-up.                     | low      | open   | Victor Hueni | 2026-12-31        | kit [#53](https://github.com/VictorHueni/homemade-claude-kit/issues/53) |
| OI-0041 | decision-gap   | Per-instance explosion of `single-collection` artefacts (one file per minted ID) so every ID is an addressable OKF node.                                              | #decision-outcome — Scope boundary | Decision Outcome | Deferred; decide if the graph richness justifies the churn.                                                             | low      | open   | Victor Hueni | 2026-12-31        | kit [#54](https://github.com/VictorHueni/homemade-claude-kit/issues/54) |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-07-01 | Initial mint, minted `active` — the decision is made and its kit cascade already merged (kit PR #56, `2796762`). Adopt OKF v0.1 as a backward-compatible frontmatter superset for generated artefacts; `type` carries a curated `okf_type` display name from the registry; adopt `index.md`/`log.md` reserved files; classify the new fields under ADR-0005's model. Extends ADR-0005, exercises ADR-0006 + ADR-0008. clew ingestion (OI-0039) and self-adoption (OI-0040) left open. | Victor Hueni |
