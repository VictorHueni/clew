---
title: Choose Python + Typer + SQLite + Pydantic as the clew implementation stack
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

<!-- ADR filename retains the original `-duckdb-` slug for stable cross-references; the title reflects the current chosen stack after the ADR-0001 SQLite cascade. -->

# Choose Python + Typer + SQLite + Pydantic as the clew implementation stack

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) stated "Python-native" as a decision driver and cited marimo as the analysis interface, but never formally chose an implementation language. ADR-0003 referenced Pydantic models and DB Python bindings as assumed tooling. Neither ADR evaluated alternatives or recorded the rationale for these choices. This ADR closes that gap for the four technology choices that underpin the clew package:

1. **Language**: Python vs. other CLI-suitable languages (Go, Rust)
2. **CLI framework**: Typer vs. Click vs. argparse
3. **DB interface**: Python stdlib `sqlite3` vs. third-party clients (DuckDB) vs. thin SQL-string wrapper
4. **Property validation**: Pydantic v2 vs. attrs vs. plain dataclasses

## Decision Drivers

- ADR-0001 chose SQLite as the persistence engine; the Python stdlib ships a first-class `sqlite3` driver, eliminating one non-stdlib binary wheel from `pip install clew`
- marimo (the analysis and notebook interface) is Python-first; any non-Python runtime creates a hard integration seam with the analysis layer
- The agent writing to `clew` (Claude Code via Bash) does not care what language the CLI is written in — it only cares about stdin/stdout contracts
- The team is Python-fluent; Go and Rust would introduce a capability gap for future contributors (including AI agents generating patches)
- Schema evolution in the clew metamodel is expected to be frequent; the validation layer must support incremental addition of per-type property fields without structural overhaul
- Installability must be single-line (`uvx clew` or `pip install clew`); the package must not require a build toolchain beyond a standard Python environment

## Considered Options

### Language

- **A.** Python 3.12+
- **B.** Go
- **C.** Rust

### CLI framework (Python only)

- **D.** Typer
- **E.** Click
- **F.** argparse

### DB interface (Python only)

- **G.** Python stdlib `sqlite3` module — call the stdlib API directly
- **H.** Thin SQL-string layer — wrap raw SQL strings and call via `subprocess` or a minimal driver; language-agnostic
- **L.** DuckDB Python client (`duckdb` package) — call the third-party Python API *(was chosen in an earlier draft; rejected after the ADR-0001 cascade)*

### Property validation (Python only)

- **I.** Pydantic v2
- **J.** attrs
- **K.** Python dataclasses (stdlib)

## Decision Outcome

Chosen options: **A (Python 3.12+)**, **D (Typer)**, **G (stdlib `sqlite3`)**, **I (Pydantic v2)**.

**Python** is the only language with first-class marimo integration and a stdlib SQL driver (`sqlite3`). Go and Rust would require a bridge layer (subprocess calls or a separate marimo backend) that adds complexity without any v1-scale benefit — the CLI processes one command at a time, so Go/Rust performance advantages are irrelevant.

**Typer** over Click because Typer is built on Click but adds automatic type inference from Python type hints; command signatures defined as typed functions serve double duty as both CLI parsing and documentation. argparse is rejected for being too verbose and lacking automatic help generation from type hints.

**Python stdlib `sqlite3`** over a third-party client or a thin SQL-string wrapper because it ships in CPython, requires no pip dependency for the DB driver, supports parameter binding (preventing injection), and exposes a cursor API that pandas (`pd.read_sql`) and Polars (`pl.read_database`) consume directly — sufficient for the marimo analysis layer. A string wrapper adds no benefit and is less safe.

**Pydantic v2** over attrs and dataclasses because: (1) Pydantic v2 validates at assignment time and raises structured `ValidationError` objects, which the CLI surfaces as clear error messages; (2) per-type property schemas defined as Pydantic models integrate naturally with JSON serialisation and the `properties` JSON text column; (3) attrs and dataclasses require hand-rolled validation. Pydantic v2's performance regression vs. v1 is resolved in v2.x and is negligible at clew's record volumes.

### Positive Consequences

- Single runtime (Python 3.12+) covers CLI, DB access, analysis (marimo), and property validation with no bridging layer
- `uvx clew` / `pip install clew` work from any standard Python environment; no separate build step, no Cargo, no `go build`, no third-party DB binary wheel
- Typer command signatures are self-documenting; `clew --help` output is generated from type annotations without manual docstrings
- Pydantic v2 `ValidationError` messages are structured and CLI-friendly; they propagate directly to stderr without custom formatting code
- stdlib `sqlite3` opens a connection in microseconds with WAL mode enabled by a single `PRAGMA`, satisfying ADR-0001's single-writer concurrency model with no external coordination
- Marimo notebooks query the DB via `pandas.read_sql(query, sqlite3.connect(...))` — one line of glue, zero pip dependencies beyond pandas itself

### Negative Consequences

- Python is slower to start than Go/Rust binaries; each `clew` invocation carries a CPython startup penalty (~50–100ms). Acceptable for single-command agent sessions; may become noticeable in tight shell loops.
- Pydantic v2 is a non-trivial dependency; it pulls in Rust extensions (`pydantic-core`). `pip install clew` on a machine without a pre-built wheel requires a Rust compiler. Mitigated by publishing platform wheels to PyPI.
- Python type system is structural, not nominal; Pydantic validation catches field-level errors but not logic-level invariants (those are enforced in `crud.py`).
- stdlib `sqlite3` defaults `PRAGMA foreign_keys = OFF` for legacy reasons; the CLI's connection factory must set it explicitly per connection (one-line workaround, documented in the CLI interface contract).
- DataFrame interop is via `pandas.read_sql` (row-by-row materialisation) rather than the zero-copy Arrow path some third-party clients offer; functionally fine at clew's scale, idiomatically less elegant.

## Pros and Cons of the Options

### A. Python 3.12+

#### Positive

- First-class marimo integration
- Typer, Pydantic v2, uvx all native to the ecosystem
- Stdlib `sqlite3` driver — no extra dependency for the DB layer
- Single runtime for CLI + analysis + validation

#### Negative

- CPython startup latency (~50–100ms per invocation)
- Heavier wheel than a compiled binary

### B. Go

#### Positive

- Fast binary startup; single statically linked executable
- Strong type system; good for CLI tools
- Excellent SQLite story (`modernc.org/sqlite` is pure-Go, CGO-free)

#### Negative

- No marimo integration; would require a separate Python backend for the analysis layer
- Team capability gap

### C. Rust

#### Positive

- Fastest startup; smallest binary; memory-safe
- Mature SQLite bindings (`rusqlite`)

#### Negative

- No marimo integration; same split-runtime problem as Go
- Highest ramp-up cost; CLIs in Rust are more verbose

### D. Typer

#### Positive

- Automatic CLI generation from Python type hints
- Built on Click; inherits Click's battle-tested argument parsing
- `--help` output generated without manual documentation

#### Negative

- Adds Click as a transitive dependency

### E. Click

#### Positive

- Mature; widely used; decorator-based

#### Negative

- More verbose than Typer for typed CLIs; no automatic type inference

### F. argparse

#### Positive

- Stdlib; zero dependencies

#### Negative

- Verbose; no automatic help from type hints; less ergonomic for sub-command CLIs

### G. Python stdlib `sqlite3` module (chosen)

#### Positive

- Ships in CPython — zero pip dependency for the DB driver
- DB-API 2.0 compliant; parameter binding prevents SQL injection
- Supports all SQLite features needed by clew: JSON1 functions, `WITH RECURSIVE` CTEs, `RETURNING` clause (Python 3.10+), FK enforcement (`PRAGMA foreign_keys = ON`), WAL mode
- Consumed directly by pandas (`pd.read_sql`), Polars (`pl.read_database`), and marimo

#### Negative

- `PRAGMA foreign_keys = ON` must be set per connection (SQLite default is OFF; one-line workaround in the connection factory)
- Row-by-row materialisation to DataFrames; no zero-copy Arrow path (irrelevant at clew's record volumes)

### H. Thin SQL-string wrapper

#### Positive

- Language-agnostic; could be ported to Go/Rust later

#### Negative

- Manual parameter escaping (SQL injection risk)
- No DataFrame materialisation; marimo would need a separate client
- No practical benefit over the stdlib `sqlite3` module

### L. DuckDB Python client (rejected after ADR-0001 cascade)

Was chosen in the earlier draft of this ADR, before ADR-0001 reconsidered the engine choice and selected SQLite. Documented here for traceability.

#### Positive

- Official, first-class Python client with zero-copy Arrow / pandas / polars materialisation
- All DuckDB features (DuckPGQ property-graph extension, VSS vector-search extension) directly accessible

#### Negative

- Adds a binary-wheel pip dependency (`duckdb`) where the Python stdlib already covers the entire need via `sqlite3`
- DuckDB's columnar storage carries per-row INSERT overhead; clew's write pattern is single-row CLI commands (OLTP shape), which is SQLite's design centre
- DuckPGQ and VSS were v2 nice-to-haves, never load-bearing for the metamodel's bounded ≤5-hop traversal; rejecting them costs nothing at v1/v2 scope

### I. Pydantic v2 (chosen)

#### Positive

- Structured `ValidationError` with field-level messages
- Integrates naturally with JSON serialisation
- Type coercion and validation at model construction time

#### Negative

- `pydantic-core` Rust extension; wheel required
- Heavier than attrs or dataclasses for simple structs

### J. attrs

#### Positive

- Lightweight; stdlib-compatible
- Good for value objects with custom validators

#### Negative

- Validation is hand-rolled; no built-in JSON serialisation

### K. Python dataclasses

#### Positive

- Stdlib; zero dependencies
- Sufficient for simple structs

#### Negative

- No built-in validation; all field checks require manual `__post_init__` code
- JSON serialisation requires additional library (`dacite`, `cattrs`, or custom)

## Related decisions

- [ADR-0001 Persistence layer (CLI + SQLite)](adr-0001-metamodel-persistence-layer.md) — chose SQLite as the storage engine; this ADR's DB-interface choice (stdlib `sqlite3`) is the cascade.
- [ADR-0003 Schema design — typed property graph](adr-0003-schema-design-typed-property-graph.md) — specified Pydantic models as the property validation layer; this ADR provides the formal decision.
- [ADR-0007 Schema migration framework (Alembic + SQLAlchemy)](adr-0007-schema-migration-framework.md) — **amends** this ADR: SQLAlchemy Core + Alembic are added for schema definition + migrations, softening the "zero non-stdlib DB dependency" consequence (the runtime CRUD path may remain stdlib `sqlite3`).
