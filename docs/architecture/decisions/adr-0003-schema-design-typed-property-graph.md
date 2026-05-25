---
title: Schema design — typed property graph over DuckDB
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 90d
---

# Schema design — typed property graph over DuckDB

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) chose DuckDB + CLI as the persistence
engine. This ADR decides **how the schema is designed within that engine** — two orthogonal
concerns in one decision:

1. **Property storage**: how type-specific fields (persona goals, capability definition,
   FBS functionality status, etc.) are stored across 19 artefact types, with more types
   planned as the 52 ⬜ backlog items are implemented.
2. **Relationship storage**: how cross-artefact references (persona TRIGGERS value stream,
   VS stage CONSUMES capability, epic GROUPS FBS functionality, etc.) are stored, traversed,
   and annotated with metadata (role: Differentiator / Necessary).

Both concerns have the same failure mode: a schema design that requires a DDL migration
for every new artefact type or relationship type is not viable at the current cadence of
metamodel evolution.

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

- The traceability matrix (`clew matrix`), lineage view (`clew trace <ID>`), and impact
  analysis (`clew impact <ID>`) are ★ Differentiator functionalities — they require
  uniform multi-hop graph traversal across all relationship types
- Relationships carry metadata; the schema must store it without nullable column sprawl
- Adding a new artefact type or relationship type must not require a DDL migration — the
  metamodel evolves continuously (19 types today, 52 ⬜ backlog items pending)
- The primary consumer of both property reads and traversal queries is an AI agent via
  the CLI; schema consistency and predictability reduce prompt complexity and error surface
- [ADR-0001](adr-0001-metamodel-persistence-layer.md) established DuckDB WITH RECURSIVE
  CTEs as the traversal mechanism; the schema must support them uniformly
- Technical surrogate keys (DB-native auto-increment) must be decoupled from semantic
  business identifiers (P-01, C1.1.F03, VS-1.3); business identifiers are what the agent
  writes in markdown prose and must survive a DB drop-and-restore cycle unchanged

## Considered Options

- **A.** Flat FK columns + per-type tables — one FK column per M:1 relationship; one
  junction table per M:M; one dedicated property table per artefact type
- **B.** Single artefacts table with JSON `properties` column + typed edge table — one
  universal node table with a `properties JSON` column for all type-specific fields; one
  universal `artefact_references` table for all relationships
- **C.** EAV (Entity-Attribute-Value) — all type-specific properties stored as
  `(artefact_pk, key, value)` rows in a single property table; edge table for relationships
- **D.** Hybrid — FK columns for simple M:1 relationships; edge table only for M:M
  relationships with metadata; per-type property tables

## Decision Outcome

Chosen option: **B (single artefacts table with JSON properties + typed edge table)**,
because it is the only option that eliminates DDL migrations for new artefact types and
relationship types, supports uniform recursive CTE traversal, and keeps the schema surface
to two functional tables — while delegating type-specific validation to `schema.py`
Pydantic models, which is where clew's validation contract already lives.

### Schema

```sql
-- Technical surrogate key sequences (DB-native; may reset on DB recreation — intended)
CREATE SEQUENCE artefact_pk_seq START 1;
CREATE SEQUENCE ref_pk_seq      START 1;

-- Business identifier counter table (application-managed; exported in YAML snapshot
-- so business IDs are reproduced identically on DB restore from snapshot)
CREATE TABLE id_sequences (
  artefact_type  VARCHAR  PRIMARY KEY,
  next_val       UINTEGER NOT NULL DEFAULT 1
);

-- Single universal artefact table — no per-type tables
CREATE TABLE artefacts (
  pk             UINTEGER PRIMARY KEY DEFAULT nextval('artefact_pk_seq'),  -- surrogate key
  business_id    VARCHAR  UNIQUE NOT NULL,    -- 'P-01', 'C1.1', 'VS-1.3' — stable semantic key
  artefact_type  VARCHAR  NOT NULL,           -- 'persona', 'capability', 'vs_stage', ...
  name           VARCHAR  NOT NULL,
  status         VARCHAR  DEFAULT 'active',   -- 'active', 'retired', 'superseded'
  created_at     TIMESTAMPTZ DEFAULT now(),
  properties     JSON     NOT NULL DEFAULT '{}' -- all type-specific fields; schema in schema.py
);

-- Typed edge table: all cross-artefact relationships; internal FK joins on surrogate PKs
CREATE TABLE artefact_references (
  pk            UINTEGER PRIMARY KEY DEFAULT nextval('ref_pk_seq'),
  source_pk     UINTEGER NOT NULL REFERENCES artefacts(pk),
  relationship  VARCHAR  NOT NULL,            -- 'TRIGGERS', 'CONSUMES', 'GROUPS', 'REALIZES', 'INFORMS'
  target_pk     UINTEGER NOT NULL REFERENCES artefacts(pk),
  role          VARCHAR,                      -- 'Differentiator', 'Necessary', etc.
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_refs_source ON artefact_references(source_pk, relationship);
CREATE INDEX idx_refs_target ON artefact_references(target_pk, relationship);
```

Two functional tables. Adding a new artefact type = one new Pydantic class in `schema.py`
+ one new row in `id_sequences`. No DDL.

### Traversal pattern (recursive CTE)

Every traversal query — impact analysis, lineage, traceability matrix path — uses the
same pattern over `artefact_references`:

```sql
-- Resolve input business ID to surrogate PK once at query entry; traverse on integer PKs
WITH RECURSIVE impact(pk, business_id, artefact_type, relationship, depth) AS (
  SELECT a.pk, a.business_id, a.artefact_type, r.relationship, 1
  FROM   artefact_references r
  JOIN   artefacts a ON a.pk = r.source_pk
  WHERE  r.target_pk = (SELECT pk FROM artefacts WHERE business_id = ?)
  UNION ALL
  SELECT a.pk, a.business_id, a.artefact_type, r.relationship, i.depth + 1
  FROM   artefact_references r
  JOIN   artefacts a ON a.pk = r.source_pk
  JOIN   impact i    ON r.target_pk = i.pk
  WHERE  i.depth < 10          -- guard; max real depth ≤ 5
)
-- Output is business IDs only; surrogate PKs are internal to the traversal
SELECT business_id, artefact_type, relationship, depth FROM impact ORDER BY depth;
```

### Positive Consequences

- Adding a new artefact type requires no DDL — one new Pydantic class in `schema.py`,
  one new row in `id_sequences`; the `artefacts` table accepts it immediately
- Adding a new relationship type requires no DDL — one new entry in the
  `ALLOWED_RELATIONSHIPS` registry in `crud.py`
- Traversal queries use a single, uniform recursive CTE pattern regardless of artefact type
- Edge metadata (role, confidence, evidence_ref) is first-class in `artefact_references`
- DuckPGQ property graph extension can be layered over the two tables in v2 with zero
  schema changes
- Surrogate PKs and business identifiers are fully decoupled: drop-and-restore preserves
  all business IDs exactly while surrogate PKs are silently regenerated
- The `properties` JSON column serialises naturally as a nested YAML object in the
  snapshot — each artefact is self-contained in the export

### Negative Consequences

- Type-specific field validation (required fields, allowed values per type) is enforced
  at the `crud.py` + Pydantic layer, not at the DB constraint layer; the DB cannot reject
  a `properties` blob that violates the persona schema
- JSON path syntax in DuckDB queries (`properties->>'goals'`) is slightly more verbose
  than column-name references; offset by the query uniformity gained across all types
- Cross-type relationship type-safety is enforced at the application layer, not DB-level

## Pros and Cons of the Options

### A. Flat FK columns + per-type tables

One FK column per M:1 relationship; one junction table per M:M relationship; one dedicated
property table per artefact type (e.g., `personas`, `capabilities`, `fbs_functionalities`).

#### Positive

- Column-level DB constraints for required fields and allowed values (NOT NULL, CHECK)
- Familiar relational pattern; queries read as column names rather than JSON paths

#### Negative

- Every new artefact type requires a new DDL table migration — untenable at 52 ⬜ items
- Every new M:M relationship requires a new junction table migration
- Traversal queries cannot use a uniform CTE pattern; each relationship type is a separate
  schema join branch
- With 19+ artefact types, the schema sprawls to dozens of tables, making it progressively
  harder for agents and developers to reason about
- Edge metadata (the Differentiator role) requires nullable columns or a separate metadata
  table on each junction table — quadratic maintenance burden

### B. Single artefacts table with JSON properties + typed edge table (chosen)

See Decision Outcome above.

### C. EAV (Entity-Attribute-Value)

All type-specific properties stored as `(artefact_pk, key, value TEXT)` rows in a single
property table.

#### Positive

- Zero DDL for new artefact types or new properties, like option B
- Fully generic; no Pydantic models needed for the DB layer

#### Negative

- Every property read requires a `WHERE key = 'goals'` filter and a pivot; any multi-field
  read requires multiple rows or a PIVOT/CASE WHEN expression — queries become unreadable
- No data types beyond TEXT; numeric or boolean properties require application-layer parsing
- `value TEXT` means no DB-level type coercion even at the application boundary
- DuckDB's JSON support is first-class and renders EAV unnecessary; JSON gives equivalent
  DDL-freedom with vastly better query ergonomics

### D. Hybrid (FK columns for simple M:1 + edge table for M:M with metadata)

Simple M:1 relationships use FK columns on per-type tables; complex M:M or
metadata-carrying relationships use `artefact_references`.

#### Positive

- Simple M:1 lookups retain direct FK column ergonomics
- DB constraints apply to simple relationships

#### Negative

- Two patterns for the same concept (cross-artefact relationship) creates inconsistency;
  agents and developers must know which pattern governs each relationship type
- The boundary between "simple M:1" and "M:M with metadata" erodes over time; previously
  simple relationships gain metadata and require migrations
- Traversal queries cannot use a uniform CTE pattern — they branch by relationship type
- Retains the per-type DDL migration burden for property storage

## Implementation Notes

### Pydantic property schema registry (`schema.py`)

Type-specific field schemas are defined as Pydantic models — one per artefact type. Adding
a new type is one new class; no DDL required:

```python
from pydantic import BaseModel
from typing import Literal

class PersonaProperties(BaseModel):
    goals:       str | None = None
    pain_points: str | None = None

class CapabilityProperties(BaseModel):
    strategic_importance: Literal['Differentiator', 'Necessary', 'Commodity'] | None = None
    definition:           str | None = None
    outcomes:             str | None = None

class FbsFunctionalityProperties(BaseModel):
    description: str | None = None
    vs_stage:    str | None = None   # soft-link; not a FK — resolved at query time
    is_differentiator: bool = False

ARTEFACT_SCHEMAS: dict[str, type[BaseModel]] = {
    'persona':            PersonaProperties,
    'capability':         CapabilityProperties,
    'fbs_functionality':  FbsFunctionalityProperties,
    # one entry per type; new types extend this dict — zero DDL
}
```

`crud.py` validates the incoming properties dict against `ARTEFACT_SCHEMAS[artefact_type]`
before serialising to JSON and writing to `artefacts.properties`. Unknown types receive a
validation error naming the unrecognised type and listing the known types.

### Querying type-specific properties

DuckDB JSON operators make property queries concise enough for agent-generated SQL:

```sql
-- All Differentiator capabilities
SELECT business_id, name, properties->>'strategic_importance' AS importance
FROM   artefacts
WHERE  artefact_type = 'capability'
  AND  properties->>'strategic_importance' = 'Differentiator';

-- All shipped FBS functionalities with their VS-stage soft-links
SELECT business_id, name,
       (properties->>'vs_stage')         AS vs_stage,
       (properties->>'is_differentiator') AS differentiator
FROM   artefacts
WHERE  artefact_type = 'fbs_functionality'
  AND  status = 'active';
```

### Relationship type registry

Canonical relationship types, enforced by `crud.py` at write time:

| Relationship | Source type(s) | Target type(s) | Role values |
|---|---|---|---|
| TRIGGERS | persona | value_stream | — |
| CONSUMES | vs_stage | capability | Differentiator, Necessary |
| REALIZES | fbs_functionality | vs_stage | Differentiator |
| GROUPS | epic | fbs_functionality | — |
| INFORMS | objective | vs_stage | — |
| REFERENCES | any | any | (free text; soft cross-link) |

New relationship types are added to this registry in `crud.py`; no DDL migration needed.

### Type-safety enforcement (`crud.py`)

`crud.py` validates source and target artefact types before writing to `artefact_references`:

```python
ALLOWED_RELATIONSHIPS = {
    "TRIGGERS":   ({"persona"},           {"value_stream"}),
    "CONSUMES":   ({"vs_stage"},          {"capability"}),
    "REALIZES":   ({"fbs_functionality"}, {"vs_stage"}),
    "GROUPS":     ({"epic"},              {"fbs_functionality"}),
    "INFORMS":    ({"objective"},         {"vs_stage"}),
    "REFERENCES": (None, None),  # None = any type permitted
}
```

If source or target type is not in the allowed set, the write is rejected with a structured
error naming the relationship, the actual types, and the allowed types.

### Business identifier generation (`id_gen.py`)

Business identifiers are generated exclusively by `id_gen.py` (application layer) — never
by the DB engine and never by the agent. The `id_sequences` table persists per-type counter
state so business IDs are reproducible on DB restore:

```python
def next_business_id(conn, artefact_type: str, parent_business_id: str | None = None) -> str:
    """Atomically increment the per-type counter; return the next business ID."""
    val = conn.execute(
        "UPDATE id_sequences SET next_val = next_val + 1 "
        "WHERE artefact_type = ? RETURNING next_val - 1",
        [artefact_type]
    ).fetchone()[0]

    match artefact_type:
        case "persona":           return f"P-{val:02d}"
        case "epic":              return f"E-{val:02d}"
        case "objective":         return f"OBJ-{val:02d}"
        case "key_result":        return f"KR-{parent_business_id}.{val}"
        case "vs_stage":          return f"{parent_business_id}.{val}"       # VS-1 → VS-1.1
        case "fbs_functionality": return f"{parent_business_id}.F{val:02d}"  # C1.1 → C1.1.F01
```

**Snapshot and restore contract:**

- `clew export` serialises the `id_sequences` table alongside all artefact records in the
  YAML snapshot — counter state is part of the snapshot, not a DB-only concern.
- `clew import` (DB restore from snapshot) writes artefacts with their existing
  `business_id` values; business IDs are stable across restores. Surrogate PKs are
  regenerated from scratch; FK references within the restored DB are resolved by business ID
  during import, then remapped to the new surrogate PKs before writing.
- The YAML snapshot is **business-ID-centric**: cross-artefact relationships are expressed
  as `(source_business_id, relationship, target_business_id)` tuples. Surrogate PKs do not
  appear in the snapshot and are never hand-edited.

### DuckPGQ upgrade path (v2)

The `artefacts` table maps to a PGQ vertex table; `artefact_references` maps to a PGQ
edge table. The v2 upgrade is a DuckDB extension load + a `CREATE PROPERTY GRAPH`
declaration — no data migration, no schema change:

```sql
-- v2 addition only — no schema change to existing tables
CREATE PROPERTY GRAPH clew_graph
  VERTEX TABLES (artefacts LABEL artefact_type)
  EDGE TABLES (
    artefact_references
      SOURCE KEY (source_pk) REFERENCES artefacts(pk)
      DESTINATION KEY (target_pk) REFERENCES artefacts(pk)
      LABEL relationship
  );
```

### Related decisions

- [ADR-0001 Persistence layer (DuckDB + CLI)](adr-0001-metamodel-persistence-layer.md) —
  this ADR defines the schema design within the engine chosen in ADR-0001; the graph
  traversal strategy note in ADR-0001 §Implementation Notes is the direct precursor.
- [ADR-0002 Artefact file binding](adr-0002-artefact-file-binding.md) — the `file_bindings`
  table uses `artefacts(pk)` as its FK anchor; the universal node registry introduced here
  is the FK target.
