---
title: Canonical home for artefact-type definitions — semantic in SKILL.md, structural in a new kit rule
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-26
review_interval: 180d
---

# Canonical home for artefact-type definitions — semantic in SKILL.md, structural in a new kit rule

## Context and Problem Statement

The homemade-claude-kit produces 18+ named artefact types (`persona`, `capability`, `value_stream`, `vs_stage`, `objective`, `key_result`, `fbs_functionality`, `epic`, `adr`, `quality_attribute`, `glossary_term`, `bounded_context`, `prd`, `interface_contract`, `cli_surface`, `idea`, `process`, `quantitative_model`, …). Every one is a concept the system reasons about — clew's `ARTEFACT_TYPE_CONFIGS` enumerates them at runtime; `util-metamodel-audit` validates them; agents author them session after session. Yet there is no single place that authoritatively defines what each type IS, what its shape is, where it lives, or which frontmatter fields apply to it.

A read of clew's BC-01 glossary ([02c-glossary.md](../../domain/02c-glossary.md)) surfaces the gap concretely: the glossary defines the meta-concept *Artefact* (`BC-01.GT-01`) and *Artefact type* (`BC-01.GT-02`), but none of the ~10+ concrete types (persona, capability, value_stream, …) carry a glossary entry. The per-type definitions today are scattered across at least four locations:

1. Each skill's `SKILL.md` carries methodology framing for "what a persona / capability / value stream / … is" (Evans-style discipline, anti-patterns, examples).
2. Kit `rules/metamodel.md` carries a table of all types with their IDs, owning skill, and output path (build-order context, not definition).
3. Each instance artefact file (`01a-personas.md` §Persona Template, `04a-value-streams.md` §Value Stream Template) carries a field-level schema fragment.
4. clew's `ARTEFACT_TYPE_CONFIGS` (planned in `schema.py` per ADR-0001/0002) carries the runtime config (`id_format`, `default_path`, `layout`, `parent_type`).

This is the same drift surface [ADR-0005](adr-0005-frontmatter-persistence-policy.md) addressed for supersession, just one layer deeper. ADR-0005's Phase 2 (read-only frontmatter ingestion + per-type drift checks) becomes implementable only when "what frontmatter does each type carry" has a single canonical answer.

Two non-negotiable constraints frame the answer:

- **Preserve the kit's standalone contract.** Any project using the kit — with or without clew-style persistence — must be able to look up "what is a persona, structurally and semantically" from the kit alone. Same constraint as ADR-0005.
- **Preserve the kit's existing layering.** The kit already separates *skills* (how to produce a type, methodology embedded) from *rules* (cross-cutting standards used by every skill). Any new home for per-type definitions must respect that split rather than blur it.

The question this ADR closes: **where should per-artefact-type definitions canonically live, and what shape should they take?**

## Decision Drivers

- **Single source of truth per fact-class.** A definition that lives in two places will drift; the goal is to identify the fact-class and pick exactly one home for it.
- **Preserve the kit's standalone contract** (same as ADR-0005).
- **Preserve the kit's existing layering** — skills own methodology; rules own cross-cutting structure.
- **Avoid duplicating kit-owned definitions inside clew's BC-01 glossary** — clew is a Conformist consumer of kit definitions per [02b-context-map.md](../../domain/02b-context-map.md); restating each type inside BC-01 would re-create the cross-project duplication ADR-0005 just navigated away from.
- **Don't mix build-order with vocabulary in `rules/metamodel.md`.** That file is about *dependencies* between artefacts; widening it into a definition registry mixes two concerns and makes diff churn unmanageable.
- **Enable [ADR-0005](adr-0005-frontmatter-persistence-policy.md) Phase 2.** Per-type frontmatter ingestion needs a single canonical lookup of "what frontmatter does this type carry" — including the per-type `review_interval` default and any type-specific conditionals.
- **Enable test-time drift detection.** clew's `ARTEFACT_TYPE_CONFIGS` should be derivable from (or validatable against) the canonical kit source so config drift becomes a CI failure, not a discovery years later.

## Considered Options

- **A. Status quo.** Definitions remain scattered across `SKILL.md` files, `rules/metamodel.md`, instance artefact files, and runtime config. No single home, no single contract.
- **B. Extend BC-01's glossary** (`docs/domain/02c-glossary.md`) with one `BC-01.GT-NN` entry per artefact type. Each entry defines the type semantically + carries its structural facts.
- **C. Widen `rules/metamodel.md`** by adding columns for semantic definition, structural fields, and frontmatter conditionals to the existing artefact table.
- **D. Single new kit rule** (`rules/artefact-types-registry.md`) carrying both semantic and structural definitions for every type — one canonical file, two fact-classes inside.
- **E. Split by fact-class.**
  - *Semantic / conceptual* ("what IS a persona, when do I use it, what is it NOT, examples, anti-patterns") → a `## Canonical definition` section added to each `SKILL.md` that mints an artefact type. The skill is the canonical methodology source; the definition belongs there.
  - *Structural / technical* (ID format, Layout, default_path, default `review_interval`, applicable frontmatter conditionals, property-schema reference) → a new kit rule, `rules/artefact-types-registry.md`. One canonical table, the single source clew's `ARTEFACT_TYPE_CONFIGS` derives from.

## Decision Outcome

**Chosen option: E — split by fact-class**, with a phased rollout.

The split tracks the *kind of fact* rather than its file location, which produces a stable answer to "who wins on conflict?" per layer without forcing a one-size-fits-all home for two semantically different concerns.

Phase 1 (this ADR landing — no code yet):

- Document the two-layer choice in this ADR and queue the kit-side changes as `OI-001` / `OI-002`.
- Decide the registry's column shape (proposed below) so the kit-side PR has a target.

Phase 2 (next kit-side increment):

- Create `homemade-claude-kit/rules/artefact-types-registry.md` with a single canonical table:

  ```text
  | type | minting skill | id_format | layout | default_path | default review_interval | frontmatter_conditionals | property_schema_ref |
  ```

  Columns:
  - `type` — the snake_case identifier (`persona`, `key_result`, …) used in `ARTEFACT_TYPE_CONFIGS`.
  - `minting skill` — the `name:` slug of the skill that produces it (`business-persona`, …).
  - `id_format` — the canonical regex (`P-\d{2}`, `KR-\d+\.\d+`, …).
  - `layout` — one of `single-collection`, `one-per-artefact`, `inherits-from-parent` per [ADR-0002](adr-0002-artefact-file-binding.md).
  - `default_path` — the canonical output location template.
  - `default review_interval` — per [`rules/artefact-frontmatter.md`](../../../homemade-claude-kit/rules/artefact-frontmatter.md) (30d / 60d / 90d / 180d).
  - `frontmatter_conditionals` — list of any per-type conditional frontmatter fields beyond the universal `supersedes` / `superseded_by` pair (initially empty for most types; may grow).
  - `property_schema_ref` — pointer to the Pydantic property model when clew's Phase 2 lands one (`_TBD_` until then).
- Backfill the table from existing scattered sources (no semantic loss; this is a consolidation pass).

Phase 3 (in parallel, incremental):

- Add a `## Canonical definition` section to each `SKILL.md` that mints an artefact type. One section per skill, written in the existing methodology voice. Format follows the BC-01 glossary template (definition + example + anti-patterns + aliases + code convention) trimmed to what fits a skill file.
- Order: do the four already-used-in-clew skills first (`business-persona`, `business-capability-map`, `business-value-stream`, `arch-adr`), then the rest as each becomes a working concern.

Phase 4 (deferred — depends on ADR-0005 Phase 2):

- clew's `ARTEFACT_TYPE_CONFIGS` is documented as deriving its schema from `rules/artefact-types-registry.md`. A clew test asserts the runtime config matches the kit registry; drift becomes a CI failure.
- `util-metamodel-audit` may add a check verifying every minted artefact type in the audited project has a registry entry (catches "I authored a custom type without registering it" mistakes).

### Rationale

- **A** leaves the drift surface in place. Every new artefact type added to the kit (8.5 CLI surface, 7c interface contract, etc. — all minted in 2026-05-25 / 2026-05-26 commits) re-creates the scattered-definition problem.
- **B** puts kit-owned definitions inside clew's BC-01 glossary, which the [02b context map](../../domain/02b-context-map.md) explicitly designates as Conformist to the kit. Re-stating the kit's definitions in BC-01 prose would create exactly the cross-project duplication ADR-0005 navigated away from for supersession. Also: a project using the kit but not clew would have nowhere to look (the BC-01 glossary is clew-owned).
- **C** widens `rules/metamodel.md` from a build-order rule (its current purpose) into a vocabulary registry. The two concerns have different update cadences (build order changes when a new step lands; vocabulary changes when new fields or anti-patterns surface) and different audiences (build order serves the agent at scaffolding time; vocabulary serves any reader at any time). Mixing them creates diff churn that obscures both.
- **D** is closer to E but treats semantic and structural definitions as one fact-class. They are not: semantic content changes when methodology evolves (rare, deliberate, owned by the skill author); structural content changes when a new artefact type is added or frontmatter conditionals shift (more frequent, mechanical, owned by the kit maintainer). Co-locating them produces a file with two update voices and two review styles.
- **E** is the only option that respects the kit's existing layering AND eliminates the scattered-definition problem AND keeps each fact-class with one canonical owner. Skills own methodology (semantic); rules own cross-cutting structure (structural). Same split the kit already enforces everywhere else.

The phased rollout is deliberate. Phase 1 is documentation only (this ADR, zero code risk). Phase 2 is a kit-side PR (one new file, mechanical backfill from existing sources). Phase 3 is per-skill section additions (can be done incrementally as each skill is otherwise touched). Phase 4 only happens after ADR-0005 Phase 2 lands the frontmatter-ingestion code path.

## Confirmation

The decision is confirmed when all of the following hold:

- `homemade-claude-kit/rules/artefact-types-registry.md` exists with one row per artefact type currently produced by the kit (18+ rows at time of writing).
- Every `SKILL.md` that mints an artefact type carries a `## Canonical definition` section, OR is queued for backfill with an `OI-NNN` row in the kit's own open-items tracking.
- This ADR's `OI-001` (registry file creation) closes with a `Tracker ref` pointing at the kit PR.
- clew's `ARTEFACT_TYPE_CONFIGS` (when implemented) is documented as deriving from the registry, even if the test-time validation lands later (Phase 4).

## Consequences

**Positive**

- Eliminates the scattered-definition problem at the layer where it exists.
- Preserves the kit's standalone contract — definitions read straight from the kit without clew.
- Preserves the kit's existing skill / rule layering.
- ADR-0005 Phase 2 frontmatter ingestion becomes a single lookup (`registry[type].frontmatter_conditionals`).
- clew's `ARTEFACT_TYPE_CONFIGS` gets a derivable specification; CI can catch drift.
- `util-metamodel-audit` can add a "every minted type has a registry entry" check in a future increment.
- BC-01's glossary stays at the meta-level where it belongs — Conformist to kit definitions, not a copy of them.

**Negative**

- Two homes to maintain (skill `## Canonical definition` + registry table). They answer different questions, so they are not duplicates, but a contributor adding a new artefact type now has two places to update.
- Backfill cost: 18+ `SKILL.md` files need a new section. This is one-time, can be done incrementally, but is real effort.
- New kit-side rule means a new kit-side review burden when artefact types are added or restructured.
- Existing scattered definitions (in `rules/metamodel.md` table comments, in instance artefact templates) become outdated copies until they are pruned in a follow-up consolidation pass.

**Neutral**

- `## Canonical definition` becomes a required section for any new skill that mints an artefact type. The kit's `skill-creation-sync.md` rule will need an update to enforce this — caught by `OI-004` below.
- The registry's `frontmatter_conditionals` column is mostly empty today (only `supersedes` / `superseded_by` apply, and they are universal per [`rules/artefact-frontmatter.md`](../../../homemade-claude-kit/rules/artefact-frontmatter.md)). The column exists for future expansion (e.g. an ADR-specific `decision_date`, a PRD-specific `linked_epic`); the empty state today is correct, not a placeholder.

## Pros and Cons of the Options

### A. Status quo

- ✅ Zero migration cost.
- ❌ Drift surface remains. Every new artefact type re-creates the four-locations-of-truth problem.
- ❌ ADR-0005 Phase 2 cannot ship without a per-type frontmatter lookup, and the lookup has nowhere to live.

### B. Extend BC-01 glossary with per-type entries

- ✅ Familiar location (clew already has a glossary).
- ❌ Cross-project duplication: a project using the kit but not clew has nowhere to look.
- ❌ Violates the [02b context-map](../../domain/02b-context-map.md) Conformist boundary by importing kit-owned definitions into BC-01's vocabulary.
- ❌ The same drift trap ADR-0005 sidestepped: definitions in both kit and clew can disagree silently.

### C. Widen `rules/metamodel.md`

- ✅ One file, kit-internal, no new structure.
- ❌ Mixes build-order with vocabulary. Different audiences, different update cadences, different review styles.
- ❌ Diff churn obscures both concerns.

### D. Single new kit rule with both fact-classes

- ✅ One file is simpler than two.
- ❌ Co-locates two fact-classes with different update cadences and different reviewer audiences.
- ❌ Forces a file format that has to support both Evans-style prose AND tabular structural data; either format compromises the other.
- ❌ Breaks the kit's existing skill / rule layering (which already enforces this exact split for everything else).

### E. Split by fact-class (chosen)

- ✅ Respects kit's existing skill / rule layering.
- ✅ One canonical owner per fact-class.
- ✅ Skill files already carry methodology framing; adding `## Canonical definition` is a promotion of existing prose into a stable location, not new content.
- ✅ Structural registry is small and tabular; easy to grep, easy to diff, easy to derive runtime config from.
- ❌ Two homes to maintain (but they are not duplicates — different questions, different update cadences).
- ❌ Backfill cost across 18+ skills.

## More Information

- This ADR was raised in conversation immediately after [ADR-0005](adr-0005-frontmatter-persistence-policy.md) landed, prompted by an observation that BC-01's glossary defines the meta-concept of "Artefact type" but no specific artefact types. The two ADRs together address the symmetrical "where does cross-project structure live" question: ADR-0005 covers per-artefact metadata (frontmatter), this ADR covers per-type definitions.
- The registry's column shape is recorded in §Decision Outcome Phase 2 as a *proposal*; Phase 2 implementation may refine column names or split a column (e.g. separate `id_format` regex from a `id_format_human` template). Refinements that do not change the two-layer split do not require a new ADR.
- The kit's existing `rules/skill-creation-sync.md` already prescribes a §"What this skill does" section per `SKILL.md`. The `## Canonical definition` section added by Phase 3 is a *sibling* of that section, not a replacement — methodology framing and ubiquitous-language definition serve different readers.

## Related decisions

- Depends on: [ADR-0001 Persistence layer](adr-0001-metamodel-persistence-layer.md), [ADR-0002 Artefact file binding](adr-0002-artefact-file-binding.md) (Layout is a registry column).
- Sibling of: [ADR-0005 Frontmatter persistence policy](adr-0005-frontmatter-persistence-policy.md) (same architectural question one layer up).
- Soft-links to: kit-side `rules/metamodel.md` (the build-order rule the registry sits alongside) and `rules/artefact-frontmatter.md` (whose universal fields the registry's `frontmatter_conditionals` column extends).

## Dependent artefacts

| Concern | Where it lives |
| :-- | :-- |
| The canonical per-type structural registry | Kit-side `rules/artefact-types-registry.md` (new file; Phase 2) |
| Per-type semantic definitions | Each kit `SKILL.md` § `## Canonical definition` (Phase 3 backfill) |
| Skill creation discipline (require `## Canonical definition`) | Kit-side `rules/skill-creation-sync.md` (follow-up update) |
| Runtime config derivation | clew `schema.py` `ARTEFACT_TYPE_CONFIGS` (Phase 4) |
| Drift check (every minted type has a registry entry) | `util-metamodel-audit/references/check-catalogue.md` (Phase 4, optional) |

## Open Items

| OI-ID  | Type           | Summary                                                                                                                                                                                                                                                                | Source anchor                | Source heading                                              | Resolution path                                                                                                                                                                                                                                | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-001 | doc-gap        | Create `homemade-claude-kit/rules/artefact-types-registry.md` with the canonical table per the Phase 2 column shape proposed in §Decision Outcome. Backfill all current artefact types from `rules/metamodel.md` + `ARTEFACT_TYPE_CONFIGS` sources.                | #decision-outcome            | Decision Outcome — Phase 2                                  | Open a kit-side PR creating the file with full backfill in one pass. Phase 2 closes when the file is on `main`.                                                                                                                                  | high     | open   | Victor Hueni | 2026-07-15        | _TBD_       |
| OI-002 | doc-gap        | Backfill `## Canonical definition` section in each `SKILL.md` that mints an artefact type (~18 skills). Start with the four already in clew's working set: `business-persona`, `business-capability-map`, `business-value-stream`, `arch-adr`.                      | #decision-outcome            | Decision Outcome — Phase 3                                  | Incremental — backfill one skill per kit commit (sized for review). Order by clew usage frequency. Each backfill cites this ADR in the changelog.                                                                                              | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-003 | decision-gap   | Phase 4 — should clew's `ARTEFACT_TYPE_CONFIGS` import from `rules/artefact-types-registry.md` at build time (YAML / TOML parser shipping in clew), or should it be a separate copy validated against the kit at CI time?                                          | #decision-outcome            | Decision Outcome — Phase 4                                  | Defer until ADR-0005 Phase 2 ingests frontmatter; revisit once the frontmatter-cache schema is set, since the same file-parser code can be reused.                                                                                              | low      | open   | Victor Hueni | 2026-12-31        | _TBD_       |
| OI-004 | doc-gap        | Update kit-side `rules/skill-creation-sync.md` to declare `## Canonical definition` a required section for any skill that mints an artefact type. Without this, new skills will land without the section and Phase 3 backfill will be perpetual.                  | #consequences                | Consequences — Neutral                                      | Kit-side PR adding the requirement to the skill template + the conformance checklist in §6 of `rules/skill-creation-sync.md`. Bundle with the OI-001 PR for atomic kit-side review.                                                              | medium   | open   | Victor Hueni | 2026-07-15        | _TBD_       |
| OI-005 | doc-gap        | BC-01's glossary entry `Artefact type` (`BC-01.GT-02`) currently enumerates type values inline (`persona`, `capability`, `value_stream`, …). After OI-001 closes, update the glossary entry to reference the kit registry as the canonical enumeration source.   | #considered-options-b        | Considered Options — B                                      | Edit `docs/domain/02c-glossary.md` `BC-01.GT-02` definition + `## Cross-context translation matrix` to point at the registry. Single commit; chains off OI-001 closure.                                                                          | medium   | open   | Victor Hueni | 2026-08-15        | _TBD_       |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-05-26 | Initial draft. Raised in conversation following ADR-0005 landing, prompted by an observation that BC-01's glossary defines the meta-concept *Artefact type* without per-type definitions. Decision E (split by fact-class) chosen; phased rollout records four phases (this ADR → kit registry → SKILL.md backfill → clew derivation). | Victor Hueni |
