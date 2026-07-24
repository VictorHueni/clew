---
title: clew is the canonical source of truth for metamodel structure & relationships
status: active
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# clew is the canonical source of truth for metamodel structure & relationships

## Context and Problem Statement

[ADR-0006](adr-0006-canonical-home-for-artefact-type-definitions.md) split per-artefact-type
definitions by *fact-class*: **semantic** definitions ("what a good persona *is*", Evans
discipline, anti-patterns, examples) live in each kit `SKILL.md` § `## Canonical definition`;
**structural** definitions (id_format, layout, default_path, frontmatter conditionals) live in
the kit's [`rules/artefact-types-registry.md`](../../../homemade-claude-kit/rules/artefact-types-registry.md).
clew's `ARTEFACT_TYPE_CONFIGS` was to **derive from** that kit registry (ADR-0006 Phase 4), and
[`02b-context-map.md`](../../domain/02b-context-map.md) models clew as a **Conformist consumer** of
the kit.

Two facts have sharpened since ADR-0006 landed:

1. **The metamodel is a tool-agnostic standard.** Which artefact types exist, what their IDs and
   layouts are, which relationships are legal, and how they package up — none of it is
   Claude-specific. Codex, a CI linter, a future MCP client, or a human all need the same
   metamodel, and none of them read `SKILL.md`. The `homemade-claude-kit` is, by name and by
   construction, a **Claude-skills** repo (skills are authored for Claude Code, synced via
   `chezmoi` into `~/.claude/skills/`). Binding the canonical definition of a tool-agnostic
   standard to a Claude-specific authoring repo is the wrong coupling.
2. **clew is the enforcer and the neutral home.** clew already validates every relationship at
   write time (`ALLOWED_RELATIONSHIPS`) and enumerates every type at runtime
   (`ARTEFACT_TYPE_CONFIGS`); per [VISION](../../VISION.md) it is the repo-as-source-of-truth,
   multi-agent (Claude *and* Codex), opinionated-and-complete metamodel layer. The component that
   *enforces* the metamodel is the natural owner of its *definition*. ADR-0006 already conceded
   half of this: the registry's `property_schema_ref` column points **at clew's Pydantic models**,
   not the other way around.

The question this ADR closes: **where does the canonical definition of metamodel *structure and
relationships* live, and in which direction does it flow to the kit?**

## Decision Drivers

- **Tool-agnosticism.** The metamodel must not be hostage to a Claude-specific repo; its home must
  be a neutral, multi-agent artefact.
- **Single source of truth per fact-class** (inherited from ADR-0006) — keep one home per fact, no
  drift, no third copy.
- **The enforcer owns the definition.** clew enforces the metamodel at write time; the definition
  belongs where it is enforced.
- **Preserve skills' semantic authoring.** Skills *need* methodology framing to produce good
  artefacts; that semantic fact-class must stay in `SKILL.md`. This decision must not strip it.
- **Dogfooding.** clew's reason to exist is killing definition drift; it should document the
  metamodel *by being* the metamodel store, exporting every downstream projection.
- **Don't break the kit's standalone authoring loop.** A contributor authoring a persona via the
  kit must still find the methodology in the skill, even offline from clew.

## Considered Options

- **A. Status quo (ADR-0006 as written).** Kit `artefact-types-registry.md` is the structural SoT;
  clew derives. Conformist boundary unchanged.
- **B. Full inversion including semantics.** clew owns *everything* — structure, relationships, and
  the semantic per-type definitions; skills lose their `## Canonical definition`.
- **C. Partition by fact-class, clew as structural + relational SoT (chosen).** clew owns the
  structural and relational metamodel; skills retain semantics; the kit's structural registry and
  the structural sections of `metamodel.md` become **generated projections** of clew, refreshed by a
  `clew metamodel export` step. Keeps ADR-0006's split; flips only the structural derivation
  direction.
- **D. Extract the metamodel to a third, neutral repo** (neither clew nor kit). A standalone
  `metamodel-spec` repo both clew and the kit consume.

## Decision Outcome

**Chosen option: C — partition by fact-class, with clew as the canonical source of truth for the
structural and relational metamodel.** Skills keep semantics; the kit's structural registry and the
structural portions of `rules/metamodel.md` become downstream projections clew emits.

This **amends ADR-0006 — it does not supersede it.** ADR-0006's semantic/structural split stands
verbatim; what flips is the *home* of the structural fact-class (kit → clew) and the *direction* of
its Phase-4 derivation (clew-derives-from-kit → kit-derives-from-clew).

### The boundary

| Fact-class | Canonical owner (post-ADR) | Mechanism |
| :-- | :-- | :-- |
| **Structural** — types, `id_format`, layout, default_path, packages, frontmatter conditionals | **clew** (`docs/metamodel/` + schema) | kit registry generated from clew |
| **Relational** — allowed edges, cardinality, strength, role vocabulary | **clew** (`ALLOWED_RELATIONSHIPS` + `docs/metamodel/relationships.md`) | kit `metamodel.md` ER generated from clew |
| **Semantic** — what a good persona *is*, Evans discipline, anti-patterns, examples, when-to-use | **kit `SKILL.md`** § `## Canonical definition` | unchanged from ADR-0006 |
| **Build-order narrative & variants** — "how the agent runs the skills", greenfield/brownfield variants | **kit `metamodel.md`** (non-structural sections) | unchanged |

### Phased rollout

- **Phase 1 (this ADR — no code).** Record the decision. Declare clew's `docs/metamodel/` the
  interim hand-authored authority for structure + relationships until a machine-readable spec exists.
- **Phase 2 (docs).** Scaffold `docs/metamodel/`: an `README.md` overview (the build-order flowchart
  + the six packages), one page per package (description + zoom diagram + member artefacts + boundary
  relationships), one page (or catalogue) per artefact type, and `relationships.md` — the relationship
  catalogue **consolidated from** `artefact-store.md` §Relationship registry (which then becomes a
  pointer, not a second copy).
- **Phase 3 (single machine-readable spec).** Promote the SoT from prose to a machine-readable spec
  (a `metamodel.yaml`, or the clew store itself). clew's runtime config and `docs/metamodel/**` both
  generate from it; CI asserts they agree. Resolves the "two clew-side copies drift" risk.
- **Phase 4 (the kit sync step).** Ship `clew metamodel export` emitting the kit's
  `artefact-types-registry.md` rows and the structural blocks of `metamodel.md` (ER + ID conventions +
  canonical paths) **from** clew. The kit's "Maintenance coupling" table becomes a generated diff; a
  kit-side CI check asserts no manual drift from clew's export.

### Rationale

- **A** keeps a tool-agnostic standard owned by a Claude-specific repo — the coupling this ADR
  exists to correct. It also fights the already-clew-ward `property_schema_ref` pointer.
- **B** strips skills of methodology they demonstrably need to author artefacts, and would force
  clew to carry Evans-style prose it neither enforces nor consumes at runtime. Over-reach.
- **C** moves exactly the fact-classes clew *already enforces* (types, relationships) to clew, and
  leaves with the skills exactly the fact-class clew *never touches* (methodology). The cut follows
  enforcement, which is the most stable possible boundary. It is the minimal change that makes the
  metamodel tool-agnostic.
- **D** is the theoretically purest neutral home, but clew *is already* the neutral, multi-agent
  enforcer with a repo and a CLI; standing up a third repo adds a sync hop and a release surface for
  zero benefit over making clew — the enforcer — the owner. Revisit only if a second metamodel
  *enforcer* (not consumer) ever appears.

## Confirmation

Confirmed when all hold:

- `docs/metamodel/` exists with the overview, per-package pages, the artefact catalogue, and
  `relationships.md`; `artefact-store.md` §Relationship registry is reduced to a pointer at it.
- `02b-context-map.md` models the clew↔kit structural relationship as clew-upstream (kit's structural
  registry Conformist/Customer-Supplier downstream of clew), with skills' semantics noted as an
  orthogonal, non-clew dependency.
- ADR-0006 carries a forward-pointer changelog entry noting this amendment.
- A machine-readable metamodel spec (Phase 3) and `clew metamodel export` (Phase 4) are queued as
  Open Items with owners.

## Consequences

**Positive**

- The metamodel becomes a tool-agnostic standard owned by its enforcer, not a Claude-skills repo.
- One canonical home per fact-class survives (ADR-0006's win preserved); the kit registry stops being
  a parallel structural authority and becomes a generated projection.
- clew dogfoods: `clew metamodel export` makes the kit-update step mechanical and CI-checkable,
  retiring the kit's hand-maintained "Maintenance coupling" table.
- Sharpens the VISION position — clew as the opinionated, complete, agent-agnostic metamodel layer.

**Negative**

- A real repositioning: the Conformist boundary in `02b-context-map.md` inverts for the structural
  half and must be rewritten; OI-0018 (elevate kit to BC-02) is reframed by it.
- Until Phase 3, `docs/metamodel/` is hand-authored and could drift from clew's code — mitigated by
  treating the code as authority and keeping the docs thin/generated-soon.
- The kit must adopt a generated `artefact-types-registry.md` and accept clew as its structural
  upstream — a cross-repo workflow change, executed by the same single maintainer (low friction in
  practice, as with the Conformist relationship today).

**Neutral**

- Skills are unaffected day-to-day: they keep authoring `## Canonical definition`. ADR-0006 Phases 2
  and 3 (kit registry creation, SKILL.md backfill) remain valid; only Phase 4's derivation direction
  flips.
- The build-order *narrative* and project variants stay in the kit's `metamodel.md`; only its
  *structural* blocks (ER, ID conventions, canonical paths) become clew-derived.

## Pros and Cons of the Options

### A. Status quo (kit structural SoT)
- ✅ Zero change; ADR-0006 as written.
- ❌ Tool-agnostic standard stays owned by a Claude-specific repo.
- ❌ Contradicts the already-clew-ward `property_schema_ref` direction.

### B. Full inversion including semantics
- ✅ One owner for literally everything.
- ❌ Strips skills of methodology they need to author artefacts.
- ❌ Forces clew to hold prose it never enforces or consumes.

### C. Partition, clew structural+relational SoT (chosen)
- ✅ Boundary follows enforcement — the most stable cut.
- ✅ Preserves ADR-0006's split and the skills' authoring loop.
- ✅ Minimal change that makes the metamodel tool-agnostic; enables `clew metamodel export`.
- ❌ Inverts the context-map structural boundary; cross-repo sync to maintain.

### D. Third neutral repo
- ✅ Purest neutral ownership.
- ❌ clew is already the neutral enforcer; a third repo adds a sync hop and release surface for no gain.
- ❌ Two consumers (clew, kit) of a repo with no enforcer is weaker than the enforcer owning it.

## More Information

- Raised in conversation while reworking the README metamodel diagrams, on the observation that
  "the Claude toolkit is too Claude-oriented" to be the home of a tool-agnostic metamodel.
- The "step to update the artefact registry and the metamodel rules in the kit" the decision calls
  for **is** Phase 4's `clew metamodel export`.
- Phase 3's machine-readable spec is left open (prose-in-`docs/metamodel/` vs. `metamodel.yaml` vs.
  store-backed export) — see Open Items; the choice does not change this ADR's ownership decision.

## Related decisions

- **Amends:** [ADR-0006 Canonical home for artefact-type definitions](adr-0006-canonical-home-for-artefact-type-definitions.md)
  — keeps the semantic/structural split; flips the structural home (kit → clew) and Phase-4
  derivation direction. Does not supersede it.
- **Depends on:** [ADR-0003 Typed property graph](adr-0003-schema-design-typed-property-graph.md)
  (clew already stores/enforces the relationship set), [ADR-0001 Persistence layer](adr-0001-metamodel-persistence-layer.md).
- **Updates:** [`02b-context-map.md`](../../domain/02b-context-map.md) Conformist boundary;
  reframes OI-0018 there.

## Dependent artefacts

| Concern | Where it lives |
| :-- | :-- |
| Canonical structural + relational metamodel (human-readable) | clew `docs/metamodel/**` (Phase 2) |
| Relationship catalogue (single home) | clew `docs/metamodel/relationships.md`; `artefact-store.md` §Relationship registry → pointer |
| Machine-readable SoT | clew `metamodel.yaml` or store export (Phase 3, TBD) |
| Kit structural projection | kit `rules/artefact-types-registry.md` + `metamodel.md` structural blocks, generated by `clew metamodel export` (Phase 4) |
| Context-map boundary | `docs/domain/02b-context-map.md` |
| Per-type semantics | kit `SKILL.md` § `## Canonical definition` (unchanged) |

## Open Items

| OI-ID  | Type           | Summary                                                                                                   | Source anchor         | Source heading                  | Resolution path                                                                                                   | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :-------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0055 | doc-gap        | Scaffold `docs/metamodel/` (overview + per-package pages + artefact catalogue + `relationships.md`) and reduce `artefact-store.md` §Relationship registry to a pointer. | #decision-outcome     | Decision Outcome — Phase 2      | Build the section; Domain package page first as the template, then the other five.                                | high     | open   | Victor Hueni | 2026-08-15        | _TBD_       |
| OI-0056 | decision-gap   | Phase 3 — pick the machine-readable SoT: prose-only, a `metamodel.yaml`, or a store-backed export that clew code + docs both generate from. | #decision-outcome     | Decision Outcome — Phase 3      | Decide once `docs/metamodel/` shape is real and `schema.py` lands; the same spec feeds runtime config + docs.      | medium   | open   | Victor Hueni | 2026-11-30        | _TBD_       |
| OI-0057 | execution-item | Phase 4 — build `clew metamodel export` emitting kit `artefact-types-registry.md` + `metamodel.md` structural blocks; add a kit-side CI drift check. | #decision-outcome     | Decision Outcome — Phase 4      | Open a PRD/plan once the spec (OI-0056) is chosen; retires the kit's manual "Maintenance coupling" table.          | medium   | open   | Victor Hueni | 2026-12-31        | _TBD_       |
| OI-0058 | doc-gap        | Rewrite `02b-context-map.md` clew↔kit boundary as partitioned (clew upstream for structure; skills semantics orthogonal); reframe OI-0018. | #consequences         | Consequences — Negative         | Edit the context map + bounded-context OI-0018 in one pass once this ADR is `active`.                              | medium   | closed | Victor Hueni | 2026-06-27        | 2026-06-27 — `02b-context-map.md` rewritten to v2.0 (partitioned: Customer-Supplier clew→kit structure · Conformist kit→clew conventions · skills→agents semantics); `02b-bounded-contexts.md` §Integration interfaces bullet flipped to "Supplies (Customer-Supplier)" + conventions-only Conformist. Done ahead of ADR `active` per direct request. |
| OI-0059 | doc-gap        | Add a forward-pointer note to ADR-0006 recording this amendment (structural home + Phase-4 direction). | #decision-outcome     | Decision Outcome                | One changelog line in ADR-0006 referencing ADR-0008.                                                              | low      | closed | Victor Hueni | 2026-06-27        | This change — ADR-0006 changelog updated in the same commit as ADR-0008 creation |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-06-27 | Initial draft. Amends ADR-0006: clew becomes the canonical source of truth for the structural + relational metamodel (skills retain semantics); kit registry + `metamodel.md` structural blocks become generated projections via a future `clew metamodel export`. Motivated by the metamodel being a tool-agnostic standard wrongly coupled to a Claude-specific skills repo. Four-phase rollout (this ADR → `docs/metamodel/` → machine-readable spec → kit export). | Victor Hueni |
| 2026-06-27 | Activated (`draft → active`). Phases 1–2 in place (`docs/metamodel/` authored) and the SoT pattern exercised twice — ADR-0009 (`plan-` split) and ADR-0010 (`agent-` package) — with kit PRs #51/#52 merged. Phases 3–4 (machine-readable spec, `clew metamodel export`) remain future work. | Victor Hueni |
| 2026-07-24 | Open-items renumber (governance sync, no content change): this ADR's rows OI-0029–OI-0033 collided with ledger-owned OI-0029–OI-0033 (canonical since the 2026-05-26 sync); renumbered to OI-0055–OI-0059 per the [central ledger](../../../project-control/open-items/open-items.md) mapping. Cross-references in `docs/metamodel/README.md`, `docs/metamodel/relationships.md`, and `02b-context-map.md` updated in the same pass. | Victor Hueni |
