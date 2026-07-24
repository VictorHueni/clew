---
type: Architecture Decision Record
title: Schema migration framework — Alembic + SQLAlchemy Core
description: Chooses Alembic + SQLAlchemy Core as the schema migration framework.
tags: [architecture, adr, schema-migration]
timestamp: 2026-06-11T02:53:22Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-11
review_interval: 180d
---

# Schema migration framework — Alembic + SQLAlchemy Core

<!-- Renumbered 2026-07-07 from ADR-0007 → ADR-0012 to resolve a duplicate ADR-0007 (this file
     collided with adr-0007-file-binding-content-hash-strategy). Inbound references in ADR-0004
     updated in the same pass. clew must pass its own referential-integrity rule. -->

> **Adoption deferred (2026-07-07, [ADR-0013](adr-0013-minimal-model-not-repo-native-ea.md)).**
> ADR-0013 (minimal-model / perfect-sync) **amends this ADR's urgency**: the *decision* to use
> Alembic + SQLAlchemy Core at the point migrations become load-bearing stands, but v1
> **defers** it in favour of a hand-rolled `PRAGMA user_version` + numbered-step path (option A
> below). Rationale: a 4-table schema built so new artefact types need no DDL does not warrant a
> full migration framework before the core spine actually churns. **Revisit trigger:** the first
> real change to the three-table spine or `id_sequences` that a hand-rolled step cannot cover
> cleanly, or the v3 Postgres port — whichever comes first.

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) chose CLI + SQLite + YAML export and documented the engine upgrade path **MVP SQLite → v2 MCP → v3 FastAPI + Postgres**. [ADR-0003](adr-0003-schema-design-typed-property-graph.md) chose a typed property graph: three core tables (`artefacts`, `artefact_references`, `file_bindings`) plus an `id_sequences` counter table, with type-specific fields in a JSON `properties` column so that **adding a new artefact type or relationship type requires no DDL**. [ADR-0004](adr-0004-python-typer-duckdb-implementation-stack.md) chose Python + Typer + stdlib `sqlite3` + Pydantic, valuing a zero-non-stdlib-DB-dependency install.

None of these ADRs picked a mechanism for evolving the **core schema itself** — the rare but real changes to the three-table spine, the `id_sequences` table, indexes, or constraints (adding an index, adding a column to `artefact_references`, tightening a CHECK, or the eventual SQLite→Postgres port). ADR-0001 §Negative explicitly lists "Schema design and migration discipline required as the metamodel evolves" as an accepted cost but defers the *how*.

Without a versioned, repeatable migration mechanism:

- schema changes are applied ad hoc and diverge between a developer's DB, CI, and a fresh `pip install` rebuild;
- there is no reversible, audited history of structural change;
- the v3 Postgres port (ADR-0001) becomes a hand-translation exercise instead of re-running dialect-aware migrations.

This ADR closes that gap. It is the formal output of a 2026-06-11 build-vs-buy review that re-examined the persistence decision against the 2026 market (Directus, TerminusDB, Postgres-as-substrate, BaaS, graph DBs, RM/MBSE tools). That review **reconfirmed** ADR-0001's relational, self-owned-core direction: TerminusDB maps to ADR-0001's already-rejected option H (graph database), and Directus maps to its already-rejected options B/C (SaaS / OSS self-hosted tools), while Postgres is already ADR-0001's documented v3 target. This ADR therefore **reaffirms ADR-0001/0003/0004 and changes only the migration mechanism**.

## Decision Drivers

- Core-schema changes are **rare by design** (ADR-0003 removes DDL from the common "new artefact type" path), so the mechanism must be low-friction to *run* even if heavier to *set up*.
- Must apply identically across a developer DB, CI, and a fresh-install rebuild — deterministic, ordered, idempotent.
- Must support the v3 SQLite→Postgres port (ADR-0001) with minimal rework — a dialect-aware tool, not SQLite-only DDL.
- Must be reversible and auditable (upgrade + downgrade history) to match clew's "what must be true, surviving every refactor" promise applied to its own store.
- Must coexist with the snapshot/restore contract (ADR-0003): migrations evolve *structure*; `clew import snapshot` re-materialises *business data* into the current structure.
- Should keep the runtime CRUD hot path fast and simple (ADR-0004); the migration tool must not force a rewrite of the data path.

## Considered Options

- **A.** Hand-rolled `schema_migrations` table + numbered `.sql` files, applied by a small runner in `crud.py`
- **B.** `yoyo-migrations` — lightweight, raw-SQL, DB-agnostic migration library
- **C.** **Alembic + SQLAlchemy Core** — define the core schema as SQLAlchemy `Table` metadata; Alembic manages versioned, reversible, dialect-aware migrations against it
- **D.** No framework — rebuild the DB from the YAML snapshot on every schema change

## Decision Outcome

Chosen option: **C (Alembic + SQLAlchemy Core)**.

The core schema (the three tables from ADR-0003 + `id_sequences` + indexes/constraints) is declared once as **SQLAlchemy Core `Table` metadata**, which becomes the single source of structural truth. **Alembic** generates versioned migration scripts against that metadata (`alembic revision --autogenerate`), applies them (`upgrade`), and reverses them (`downgrade`). Because SQLAlchemy abstracts the SQL dialect, the **same migration history runs on SQLite (v1/v2) and Postgres (v3)** — the engine port becomes "point Alembic at a Postgres URL and run `upgrade head`", not a manual DDL rewrite.

**Scope boundary.** This ADR adopts SQLAlchemy + Alembic for **schema definition and migration only**. The runtime CRUD path **may remain stdlib `sqlite3`** for v1 (preserving ADR-0004's fast, dependency-light hot path), with optional convergence onto SQLAlchemy Core connections at the v3 Postgres port. The new dependencies are thus isolated to the structural concern, not the per-command data path.

A `clew migrate` / `clew db upgrade` command wraps Alembic so agents and CI use the same one-line surface (see Dependent artefacts).

**This amends ADR-0004.** ADR-0004's "zero non-stdlib dependency for the DB driver" positive consequence is now softened: SQLAlchemy (Core) and Alembic enter the dependency set, scoped to schema/migration. The trade is accepted because (a) ADR-0003 makes migrations rare, so the runtime-footprint argument weighs less than the *correctness + portability* of structural change, and (b) Alembic + SQLAlchemy is the standard, dialect-aware path that de-risks the already-planned v3 Postgres move.

### Positive Consequences

- Versioned, ordered, reversible migration history; structural change is audited like code.
- One migration history runs on both SQLite and Postgres → the ADR-0001 v3 port is re-run, not re-authored.
- `--autogenerate` diffs the live DB against the `Table` metadata, reducing hand-written DDL error surface.
- SQLAlchemy `Table` metadata becomes the single source of truth for the physical schema, replacing the hand-maintained DDL block in the domain model with a generated and cross-checked one.
- CI can assert `alembic upgrade head` then `alembic check` (no pending diffs) as a guard against schema drift — clew enforcing its own integrity promise on itself.
- Coexists cleanly with snapshot/restore: business identifiers and records survive a drop-and-rebuild (ADR-0003); migrations move the structure they land in.

### Negative Consequences

- Adds SQLAlchemy + Alembic to the dependency set, **amending ADR-0004**'s minimal-dependency stance (scoped to schema/migration, not necessarily runtime).
- SQLite's limited `ALTER TABLE` means Alembic must use **batch (move-and-copy) migrations** for some changes; this must be configured (`render_as_batch=True`) and is a documented footgun.
- Two potential sources of structural truth (SQLAlchemy metadata vs the domain-model §Physical schema DDL) — resolved by making the metadata canonical and generating/diffing the doc from it, not maintaining both by hand.
- For the JSON-`properties` design most of the schema is stable, so a full migration framework is arguably oversized — accepted in exchange for dialect portability and standardisation.
- `id_sequences` holds application-generated business-ID counters (ADR-0001/0003), which are *data*, not DDL; migrations must seed or alter the table without disturbing existing counters — a documented care-point in the restore path.

## Pros and Cons of the Options

### A. Hand-rolled `schema_migrations` + numbered `.sql` files

#### Positive
- Zero new dependency (fits ADR-0004); full control; trivially inspectable.

#### Negative
- SQLite-only DDL unless hand-ported → the v3 Postgres move becomes manual translation.
- No autogenerate; no downgrade unless hand-written; re-implements a solved problem.
- SQLite batch-`ALTER` handling is hand-rolled.

### B. yoyo-migrations

#### Positive
- Lightweight, raw-SQL, DB-agnostic ordering + rollback; smaller than Alembic; fits ADR-0004's minimal-dep ethos better than option C.

#### Negative
- Raw SQL means SQLite and Postgres dialects diverge in the migration files (no `Table`-metadata abstraction) → the v3 port still hand-translates DDL.
- No autogenerate/diff; no single-source schema metadata to drive `clew` introspection or the schema doc.

### C. Alembic + SQLAlchemy Core (chosen)

See Decision Outcome.

#### Positive
- Dialect-aware (one history, SQLite + Postgres); autogenerate + downgrade; `Table` metadata as the single schema source; CI drift-check; industry standard.

#### Negative
- Heaviest option; pulls SQLAlchemy + Alembic (amends ADR-0004); SQLite batch-mode care required; potential dual-source-of-truth with the DDL doc (mitigated by making metadata canonical).

### D. No framework — rebuild from snapshot

#### Positive
- No migration tooling; leans on the existing snapshot/restore contract.

#### Negative
- The snapshot encodes *business data*, not arbitrary structural transforms (column adds, index changes, constraint tightening); a rebuild applies whatever the *current* DDL is, with no ordered, reversible record of how the structure changed.
- Offers no Postgres-port story; structural history is lost.

## Related decisions

- [ADR-0001 Persistence layer (CLI + SQLite)](adr-0001-metamodel-persistence-layer.md) — **reaffirmed**; this ADR supplies the migration mechanism ADR-0001 §Negative deferred, and realises its v3 SQLite→Postgres upgrade path with a dialect-aware tool.
- [ADR-0003 Schema design — typed property graph](adr-0003-schema-design-typed-property-graph.md) — **reaffirmed**; the JSON-`properties` design keeps migrations rare, scoping this tool to the three-table spine + `id_sequences`.
- [ADR-0004 Implementation stack](adr-0004-python-typer-duckdb-implementation-stack.md) — **amended**; SQLAlchemy Core + Alembic join the dependency set for schema/migration, softening its zero-non-stdlib-DB-dependency consequence (runtime CRUD may remain stdlib `sqlite3`).

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| Physical schema (now SQLAlchemy `Table` metadata; DDL doc generated/cross-checked from it) | [Artefact Store domain model §Physical schema](../../domain/07b-models/artefact-store.md) |
| `clew migrate` / `clew db upgrade` command surface | [CLI interface contract v1](../interfaces/cli-clew.md) |
| Dependency additions (`sqlalchemy`, `alembic`) | `pyproject.toml` (when the package is scaffolded) |
| CI drift guard (`alembic upgrade head` + `alembic check`) | project CI config (when added) |
