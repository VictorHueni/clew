---
title: Schema design — typed property graph
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 90d
---

# Schema design — typed property graph

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) chose CLI + SQLite as the persistence engine. This ADR decides **how the schema is designed within that engine** — two orthogonal concerns in one decision:

1. **Property storage**: how type-specific fields (persona goals, capability definition, FBS functionality status, etc.) are stored across 19 artefact types, with more types planned as the 52 ⬜ backlog items are implemented.
2. **Relationship storage**: how cross-artefact references (persona TRIGGERS value stream, VS stage CONSUMES capability, epic GROUPS FBS functionality, etc.) are stored, traversed, and annotated with metadata (role: Differentiator / Necessary).

Both concerns have the same failure mode: a schema design that requires a DDL migration for every new artefact type or relationship type is not viable at the current cadence of metamodel evolution.

The metamodel's typed relationships carry metadata:

| Relationship | Source type | Target type | Metadata |
|---|---|---|---|
| TRIGGERS | persona | value stream | — |
| CONSUMES | value stream stage | capability | role (Differentiator / Necessary) |
| REALIZES | FBS functionality | value stream stage | role (Differentiator) |
| GROUPS | epic | FBS functionality | — |
| INFORMS | objective | value stream stage | — |
| REFERENCES | any | any | cross-type soft-link |

## Decision Drivers

- The traceability matrix (`clew matrix`), lineage view (`clew trace <ID>`), and impact analysis (`clew impact <ID>`) are ★ Differentiator functionalities — they require uniform multi-hop graph traversal across all relationship types
- Relationships carry metadata; the schema must store it without nullable column sprawl
- Adding a new artefact type or relationship type must not require a DDL migration — the metamodel evolves continuously (19 types today, 52 ⬜ backlog items pending)
- The primary consumer of both property reads and traversal queries is an AI agent via the CLI; schema consistency and predictability reduce prompt complexity and error surface
- [ADR-0001](adr-0001-metamodel-persistence-layer.md) established the engine's `WITH RECURSIVE` CTEs as the traversal mechanism; the schema must support them uniformly
- Technical surrogate keys (DB-native auto-increment) must be decoupled from semantic business identifiers (P-01, C1.1.F03, VS-1.3); business identifiers are what the agent writes in markdown prose and must survive a DB drop-and-restore cycle unchanged

## Considered Options

- **A.** Flat FK columns + per-type tables — one FK column per M:1 relationship; one junction table per M:M; one dedicated property table per artefact type
- **B.** Single artefacts table with JSON `properties` column + typed edge table — one universal node table with a `properties JSON` column for all type-specific fields; one universal `artefact_references` table for all relationships
- **C.** EAV (Entity-Attribute-Value) — all type-specific properties stored as `(artefact_pk, key, value)` rows in a single property table; edge table for relationships
- **D.** Hybrid — FK columns for simple M:1 relationships; edge table only for M:M relationships with metadata; per-type property tables

## Decision Outcome

Chosen option: **B (single artefacts table with JSON properties + typed edge table)**, because it is the only option that eliminates DDL migrations for new artefact types and relationship types, supports uniform recursive CTE traversal, and keeps the schema surface to two functional tables — while delegating type-specific validation to `schema.py` Pydantic models, which is where clew's validation contract already lives.

Three tables implement this design: `artefacts` (universal node registry), `artefact_references` (typed edge table with relationship metadata), and `file_bindings` (artefact-to-file binding, FK on `artefacts(pk)`). Adding a new artefact type requires no DDL — one new Pydantic class in `schema.py` (property schema) + one new `ArtefactTypeConfig` entry (layout config) + one new row in `id_sequences` (ID counter). Full DDL, query patterns, and property schemas are in the [Artefact Store domain model §Physical schema](../../domain/07b-models/artefact-store.md).

### Artefact type configuration (Python constants, not a DB table)

The three fields ADR-0002 calls "artefact type definition" fields — `file_layout`, `default_path`, `parent_type` — are Python constants in `schema.py`, **not rows in the database**. Rationale:

- They are static metadata about artefact *types*, not per-artefact instance data; they change only when a new artefact type is added to the kit, never when artefacts are created.
- A DB table would require a seeding migration for every type, defeating the no-DDL goal.
- `clew layout <type>` introspects `ARTEFACT_TYPE_CONFIGS` at runtime and returns the same structured output an agent would get from a DB query — the programmatic-discovery contract in ADR-0002 is fulfilled without a DB table.

### Positive Consequences

- Adding a new artefact type requires no DDL — one new Pydantic class in `schema.py`, one new row in `id_sequences`; the `artefacts` table accepts it immediately
- Adding a new relationship type requires no DDL — one new entry in the `ALLOWED_RELATIONSHIPS` registry in `crud.py`
- Traversal queries use a single, uniform recursive CTE pattern regardless of artefact type
- Edge metadata (role, confidence, evidence_ref) is first-class in `artefact_references`
- Surrogate PKs and business identifiers are fully decoupled: `clew export` + `clew import snapshot` preserves all artefact records, edges, and file bindings exactly — surrogate PKs are regenerated transparently on restore, business IDs never change
- The `properties` JSON text column serialises naturally as a nested YAML object in the snapshot — each artefact is self-contained in the export
- Schema is engine-portable: the same three-table structure works on SQLite (v1/v2) and ports to Postgres (v3) without redesign

### Negative Consequences

- Type-specific field validation (required fields, allowed values per type) is enforced at the `crud.py` + Pydantic layer, not at the DB constraint layer; the DB cannot reject a `properties` blob that violates the persona schema
- JSON path syntax (`json_extract(properties, '$.goals')` or `properties->>'$.goals'` from SQLite 3.38+) is more verbose than column-name references; offset by the query uniformity gained across all types
- Cross-type relationship type-safety is enforced at the application layer, not DB-level
- No in-engine property-graph DSL (the equivalent of Cypher / DuckPGQ); all traversal is recursive CTEs. Acceptable because the metamodel's bounded ≤5-hop depth is trivial for CTEs and no graph algorithms beyond traversal are needed

## Pros and Cons of the Options

### A. Flat FK columns + per-type tables

One FK column per M:1 relationship; one junction table per M:M relationship; one dedicated property table per artefact type (e.g., `personas`, `capabilities`, `fbs_functionalities`).

#### Positive

- Column-level DB constraints for required fields and allowed values (NOT NULL, CHECK)
- Familiar relational pattern; queries read as column names rather than JSON paths

#### Negative

- Every new artefact type requires a new DDL table migration — untenable at 52 ⬜ items
- Every new M:M relationship requires a new junction table migration
- Traversal queries cannot use a uniform CTE pattern; each relationship type is a separate schema join branch
- With 19+ artefact types, the schema sprawls to dozens of tables, making it progressively harder for agents and developers to reason about
- Edge metadata (the Differentiator role) requires nullable columns or a separate metadata table on each junction table — quadratic maintenance burden

### B. Single artefacts table with JSON properties + typed edge table (chosen)

See Decision Outcome above.

### C. EAV (Entity-Attribute-Value)

All type-specific properties stored as `(artefact_pk, key, value TEXT)` rows in a single property table.

#### Positive

- Zero DDL for new artefact types or new properties, like option B
- Fully generic; no Pydantic models needed for the DB layer

#### Negative

- Every property read requires a `WHERE key = 'goals'` filter and a pivot; any multi-field read requires multiple rows or a PIVOT/CASE WHEN expression — queries become unreadable
- No data types beyond TEXT; numeric or boolean properties require application-layer parsing
- `value TEXT` means no DB-level type coercion even at the application boundary
- SQLite's JSON1 functions render EAV unnecessary; a single JSON column gives equivalent DDL-freedom with vastly better query ergonomics

### D. Hybrid (FK columns for simple M:1 + edge table for M:M with metadata)

Simple M:1 relationships use FK columns on per-type tables; complex M:M or metadata-carrying relationships use `artefact_references`.

#### Positive

- Simple M:1 lookups retain direct FK column ergonomics
- DB constraints apply to simple relationships

#### Negative

- Two patterns for the same concept (cross-artefact relationship) creates inconsistency; agents and developers must know which pattern governs each relationship type
- The boundary between "simple M:1" and "M:M with metadata" erodes over time; previously simple relationships gain metadata and require migrations
- Traversal queries cannot use a uniform CTE pattern — they branch by relationship type
- Retains the per-type DDL migration burden for property storage

## Related decisions

- [ADR-0001 Persistence layer (CLI + SQLite)](adr-0001-metamodel-persistence-layer.md) — this ADR defines the schema design within the engine chosen in ADR-0001.
- [ADR-0002 Artefact file binding](adr-0002-artefact-file-binding.md) — the `file_bindings` table uses `artefacts(pk)` as its FK anchor. The `ARTEFACT_TYPE_CONFIGS` dict in `schema.py` holds the per-type layout constants that ADR-0002 exposes via `clew layout <type>`.

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| Physical DDL (all `CREATE TABLE`, sequences, indexes) | [Artefact Store domain model §Physical schema](../../domain/07b-models/artefact-store.md) |
| Property schemas per artefact type (Pydantic models) | [Artefact Store domain model §Property schemas](../../domain/07b-models/artefact-store.md) |
| Relationship type registry + type-safety rules | [Artefact Store domain model §Relationship registry](../../domain/07b-models/artefact-store.md) |
| Business ID generation contract + ID format table | [Artefact Store domain model §Business identity](../../domain/07b-models/artefact-store.md) |
| Snapshot / restore contract (`clew export` / `clew import snapshot`) | [CLI interface contract v1](../../architecture/interface-contracts/clew-cli-v1.md) |
