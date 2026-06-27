---
title: clew Bounded Context Map
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

<!-- bc-map-version: 1.0 | created: 2026-05-25 -->

# clew — Bounded Context Map

This document catalogues the bounded contexts for clew: the named islands of consistent domain meaning, their subdomain classification, the capabilities they own, and the teams that should own them.

> **Methodology:** built using the canonical synthesis of [Evans DDD (2003) Chapter 14 + Vernon DDD Distilled (2016) Chapters 3–4 + Nick Tune Architecture Modernization (2024)](https://github.com/VictorHueni/homemade-claude-kit/tree/main/domain-bounded-context/references/methodology-references.md). The full bibliography lives with the skill that generated this doc — single source of truth across every project.

**Scope discipline:**
- A bounded context is where the domain model is consistent — where words have one precise meaning and one team is responsible for that meaning.
- Subdomain types: **Core** (competitive advantage; build and protect) · **Supporting** (enables Core; build or buy) · **Generic** (commodity; buy SaaS/OSS).
- See [02b-context-map.md](02b-context-map.md) for the integration pattern between this context and the external upstream `homemade-claude-kit`.

**Companion documents:**
- Capability map: [`../business/03a-capability-map.md`](../business/03a-capability-map.md)
- Context map: [`02b-context-map.md`](02b-context-map.md)
- Domain glossary: [`02c-glossary.md`](02c-glossary.md)
- Personas: [`../business/01a-personas.md`](../business/01a-personas.md)
- Value streams: [`../business/04a-value-streams.md`](../business/04a-value-streams.md)

---

## Subdomain catalogue

| BC-NN | Name | Subdomain type | Strategic rationale | Team owner | Capabilities (C-N.M) |
|---|---|---|---|---|---|
| BC-01 | Artefact Store | **Core** | clew's competitive differentiator vs. status-quo markdown: deterministic ID generation + write-time FK enforcement + canonical traceability views. Any tool can store text; only this context guarantees integrity across a heterogeneous typed artefact graph. | Single stream-aligned founder squad (v1); platform team split candidate at v3 | C1.2, C2.1, C2.2, C2.3, C2.4, C3.1, C3.2, C4.1, C4.2, C4.3, C4.4, C5.4 (12 L1) |

**Capability assignment check:** the capability map has 17 L1 capabilities; 12 are assigned to BC-01 (above) and 5 (C1.1, C5.1, C5.2, C5.3, C5.5) sit outside clew's bounded context — they are realised by the external upstream `homemade-claude-kit` and consumed by clew via the Conformist relationship documented in [02b-context-map.md](02b-context-map.md). No clew-internal capability is unassigned or double-assigned.

---

## Bounded context definitions

### BC-01 · Artefact Store

**Responsibility:** clew's persistence and integrity engine. Registers metamodel artefacts with deterministic, application-managed business IDs; enforces typed cross-artefact relationships at write time; binds each artefact to its narrative markdown section; exposes traceability views over the artefact graph; and serialises the full store state to a deterministic, git-tracked YAML snapshot for durability and rebuild.

**Subdomain type:** **Core**
**Rationale:** clew's stated differentiator (the wave-1 user-validated "magic wand" — *"100% sure that all internal reference are up to date at all time"*) and its README-headline trust threshold (*"the traceability matrix consistently and deterministically"*) both live entirely inside this context. The integrity guarantee is the product.

**Capabilities owned** *(each appears in exactly one BC):*

- [C1.2 Selective context loading](../business/03a-capability-map.md#c12--selective-context-loading) — assemble the artefact slice an agent session needs
- [C2.1 Stable identifier generation](../business/03a-capability-map.md#c21--stable-identifier-generation) — deterministic business IDs from `id_sequences`
- [C2.2 Schema enforcement](../business/03a-capability-map.md#c22--schema-enforcement) — write-time validation of typed metamodel constraints
- [C2.3 File binding management](../business/03a-capability-map.md#c23--file-binding-management) — artefact ↔ markdown section mapping
- [C2.4 Deterministic structural export](../business/03a-capability-map.md#c24--deterministic-structural-export) — byte-identical YAML snapshot per DB state
- [C3.1 Ad-hoc cross-artefact query surface](../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) — arbitrary SQL / parameterised queries
- [C3.2 Pre-built traceability views](../business/03a-capability-map.md#c32--pre-built-traceability-views) — `clew matrix`, `clew trace`, `clew impact` (★ Differentiator)
- [C4.1 Write-time reference validation](../business/03a-capability-map.md#c41--write-time-reference-validation) — FK enforcement at command time (★ Differentiator)
- [C4.2 Drift detection](../business/03a-capability-map.md#c42--drift-detection) — `clew check` reconciles store ↔ markdown
- [C4.3 Audit trail](../business/03a-capability-map.md#c43--audit-trail) — replayable record of every write
- [C4.4 Schema migration](../business/03a-capability-map.md#c44--schema-migration) — forward-compatible metamodel evolution
- [C5.4 Cross-methodology referencing](../business/03a-capability-map.md#c54--cross-methodology-referencing) — type-aware refs between artefacts of different methodologies *(enforced in this BC; the underlying methodology encodings come from the external upstream kit)*

**Capabilities outside this BC** *(realised by external upstream — see [02b-context-map.md](02b-context-map.md)):* C1.1 Methodology-mediated artefact creation, C5.1 Skill catalogue management, C5.2 Per-methodology pattern encoding, C5.3 Artefact template management, C5.5 Methodology canon coverage assessment.

**Ubiquitous language scope** *(terms whose definition is specific to this context; cross-context homonyms with the external kit are called out):*

- [*Artefact* · BC-01.GT-01](02c-glossary.md#artefact--bc-01gt-01) — a named, typed record in the metamodel (persona, capability, epic, ADR, …). Distinct from a raw markdown file or filesystem entry.
- [*Business ID* · BC-01.GT-03](02c-glossary.md#business-id--bc-01gt-03) — the stable semantic identifier (e.g. `P-01`, `C1.2.F03`, `OBJ-03`) that agents write in markdown prose and that survives DB drop-and-restore. Distinct from the internal surrogate `pk` used for joins.
- [*Relationship* · BC-01.GT-06](02c-glossary.md#relationship--bc-01gt-06) — a typed directed edge between two artefacts (TRIGGERS, CONSUMES, GROUPS, …). Distinct from a generic markdown hyperlink and distinct from a database FK column.
- [*File binding* · BC-01.GT-07](02c-glossary.md#file-binding--bc-01gt-07) — the link between one artefact record and one markdown file section (`file_path` + `section_anchor`). Distinct from a filesystem path or directory.
- [*Snapshot* · BC-01.GT-10](02c-glossary.md#snapshot--bc-01gt-10) — the deterministic YAML export of the full store state. Distinct from the binary `.db` file (which is gitignored).
- [*Layout* · BC-01.GT-09](02c-glossary.md#layout--bc-01gt-09) — the per-artefact-type rule for where its narrative lives on disk (`single-collection`, `one-per-artefact`, `inherits-from-parent`). Distinct from filesystem layout or markdown formatting.
- [*Skill* · BC-01.GT-15](02c-glossary.md#skill--bc-01gt-15) *(homonym warning)* — in BC-01 not a domain concept; appears only as the upstream Conformist source that defines artefact-type schemas. *Inside the kit's own scope, "skill" is the central abstraction; do not confuse the two usages.*

*(Eight further BC-01 terms — [Artefact type · GT-02](02c-glossary.md#artefact-type--bc-01gt-02), [Status · GT-04](02c-glossary.md#status--bc-01gt-04), [Narrative · GT-05](02c-glossary.md#narrative--bc-01gt-05), [Section anchor · GT-08](02c-glossary.md#section-anchor--bc-01gt-08), [Audit trail · GT-11](02c-glossary.md#audit-trail--bc-01gt-11), [Drift · GT-12](02c-glossary.md#drift--bc-01gt-12), [Traceability view · GT-13](02c-glossary.md#traceability-view--bc-01gt-13), and [Methodology · GT-14](02c-glossary.md#methodology--bc-01gt-14) — are documented in the full glossary; the seven above are the minimum subset that a contributor needs to read this BC catalogue entry without ambiguity.)*

**Canonical data owned** *(no other context writes this data; others may read it via the CLI):*

- `artefacts` table — all registered metamodel records (business_id, type, name, status, properties JSON)
- `artefact_references` table — all typed directed edges between artefacts
- `file_bindings` table — all artefact-to-narrative location mappings (file path + section anchor + content hash)
- `id_sequences` table — application-managed business-ID counters per artefact type

**Integration interfaces** *(how other contexts use this one):*

- **Publishes (Open Host Service):** the `clew` CLI v1 contract — every command, its arguments, exit codes, and stdout/stderr structure are the Published Language. See [CLI interface contract v1](../architecture/interfaces/cli-clew.md).
- **Publishes (events):** domain events `ArtefactRegistered`, `ArtefactImported`, `ArtefactLinked`, `FileBindingRecorded`, `SnapshotExported`, `SnapshotRestored` — recorded in the audit trail at v1; v2 (MCP) may surface them on a wire protocol.
- **Exposes (read-only query):** SQL surface via stdlib `sqlite3` — read-only for marimo notebooks; the CLI is the only writer (single-writer per repo, per [ADR-0001](../architecture/decisions/adr-0001-metamodel-persistence-layer.md)).
- **Supplies (Customer-Supplier, upstream):** per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md), clew is the **source of truth for metamodel structure & relationships** — artefact-type schemas, ID format patterns, layout, packages, and `ALLOWED_RELATIONSHIPS`. The `homemade-claude-kit` structural registry (`artefact-types-registry.md` + `metamodel.md` structural blocks) is a generated projection of clew. See [02b-context-map.md §BC-01 → Customer-Supplier → kit structural registry](02b-context-map.md#bc-01--customer-supplier--homemade-claude-kit-structural-registry-the-adr-0008-flip).
- **Consumes (Conformist, conventions only):** clew still adopts the kit's cross-cutting *doc conventions* (frontmatter schema, open-items governance, citation discipline) as-is — the residual of the pre-ADR-0008 relationship, now scoped to conventions, not metamodel structure. The kit's **skills** retain the *semantic* definitions (authoring methodology), consumed by agents, not by clew.

**Team boundary recommendation:**

- **Team Topologies type:** stream-aligned (single team owns the full vertical from persistence → CLI → snapshot)
- **Cognitive load:** small (1 contributor at v1 founder scale; CLI is one cohesive codebase with no internal seam justifying split)
- **Conway's Law alignment:** trivial at v1 — single contributor, single BC. If clew evolves to v3 (HTTP API + multi-user per [ADR-0001 Upgrade path](../architecture/decisions/adr-0001-metamodel-persistence-layer.md#upgrade-path)), splitting the CLI from the HTTP API may justify a platform team for the shared `crud.py` core. Not relevant before then.

---

## Open Items

| OI-ID  | Type           | Summary                                                                                                   | Source anchor             | Source heading                  | Resolution path                                                                                                            | Priority | Status | Owner   | Due / Review date | Tracker ref |
| :----- | :------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :------ | :---------------- | :---------- |
| OI-0017 | doc-gap        | `02c-glossary.md` for BC-01 does not exist yet; the `Ubiquitous language scope` section above references it via `_TODO_` per-term anchors. | #ubiquitous-language-scope | Ubiquitous language scope       | Run the `domain-glossary` skill against BC-01 to mint `GT-NN` terms (artefact, business ID, artefact type, relationship, file binding, section anchor, snapshot, layout, …); then replace the `02c-glossary.md` link in §Companion documents with the live file and add per-term anchors. | high     | closed | victor  | 2026-05-25        | 2026-05-25 commit on main — `02c-glossary.md` created with 15 BC-01 terms; §Companion documents pending-annotation removed; §Ubiquitous language scope per-term anchors wired to live GT-NN entries |
| OI-0018 | decision-gap   | Whether to elevate the external `homemade-claude-kit` to its own modelled BC-02 (Supporting) if/when its scope or consumer count grows beyond clew alone. | #subdomain-catalogue      | Subdomain catalogue             | Re-evaluate at the first of: (a) second downstream consumer of the kit is documented, (b) kit's per-skill artefact count exceeds the 17 currently mapped, (c) Conformist relationship starts producing friction (kit drift breaks clew). | low      | open   | victor  | 2026-12-01        | _TBD_       |

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-05-25 | Initial 39-line draft under DuckDB (single-BC, capability list as verbose descriptions, no team-owner column, no context map file). | Victor Hueni |
| 2026-05-25 | Template alignment pass (`domain-bounded-context` skill v1.0): methodology pointer + scope discipline + companion documents headers added; subdomain catalogue table extended with Team owner + Capabilities (C-N.M) columns; BC-01 per-context block restructured to template format (Responsibility, Subdomain type + Rationale, Capabilities owned with explicit C-N.M links and external-scope partition, Ubiquitous language scope with per-term scoped definitions and one homonym warning, Canonical data owned, Integration interfaces with Conformist upstream call-out, Team boundary recommendation); companion `02b-context-map.md` created in same commit modelling the external Conformist relationship with `homemade-claude-kit`; Open Items populated per open-items-governance schema. | Victor Hueni |
| 2026-05-25 | Glossary cascade: `02c-glossary.md` authored in same commit (15 BC-01 terms); §Companion documents pending-annotation removed; §Ubiquitous language scope per-term anchors wired to live `02c-glossary.md#{term}--bc-01gt-{nn}` slugs (7 anchored inline, 8 cross-linked in a footer paragraph); OI-0017 closed with tracker-ref text identifying the same commit. | Victor Hueni |
