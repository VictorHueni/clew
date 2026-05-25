---
title: Choose Python + Typer + DuckDB + Pydantic as the clew implementation stack
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

# Choose Python + Typer + DuckDB + Pydantic as the clew implementation stack

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) stated "Python-native" as a decision driver and cited marimo as the analysis interface, but never formally chose an implementation language. ADR-0003 referenced Pydantic models and DuckDB Python bindings as assumed tooling. Neither ADR evaluated alternatives or recorded the rationale for these choices. This ADR closes that gap for the four technology choices that underpin the clew package:

1. **Language**: Python vs. other CLI-suitable languages (Go, Rust)
2. **CLI framework**: Typer vs. Click vs. argparse
3. **DB interface**: DuckDB Python client vs. thin SQL-string wrapper
4. **Property validation**: Pydantic v2 vs. attrs vs. plain dataclasses

## Decision Drivers

- marimo (the mandated analysis and notebook interface) is Python-first; any non-Python runtime creates a hard integration seam with the analysis layer
- DuckDB ships a first-class Python client (`duckdb` PyPI package) with full SQL execution, result-set materialisation to pandas/polars, and native JSON support
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

- **G.** DuckDB Python client (`duckdb` package) — call the Python API directly
- **H.** Thin SQL-string layer — wrap raw SQL strings and call via `subprocess` or a minimal driver; language-agnostic

### Property validation (Python only)

- **I.** Pydantic v2
- **J.** attrs
- **K.** Python dataclasses (stdlib)

## Decision Outcome

Chosen options: **A (Python 3.12+)**, **D (Typer)**, **G (DuckDB Python client)**, **I (Pydantic v2)**.

**Python** is the only language with first-class DuckDB and marimo integration. Go and Rust would require a bridge layer (subprocess calls or a separate marimo backend) that adds complexity without any v1-scale benefit — the CLI processes one command at a time, so Go/Rust performance advantages are irrelevant.

**Typer** over Click because Typer is built on Click but adds automatic type inference from Python type hints; command signatures defined as typed functions serve double duty as both CLI parsing and documentation. argparse is rejected for being too verbose and lacking automatic help generation from type hints.

**DuckDB Python client** over a thin SQL-string wrapper because the Python API provides result-set materialisation, parameter binding (preventing injection), and direct access to pandas/polars output — all needed by the marimo analysis layer. A string wrapper adds no benefit and is less safe.

**Pydantic v2** over attrs and dataclasses because: (1) Pydantic v2 validates at assignment time and raises structured `ValidationError` objects, which the CLI surfaces as clear error messages; (2) per-type property schemas defined as Pydantic models integrate naturally with JSON serialisation and DuckDB's `properties JSON` column; (3) attrs and dataclasses require hand-rolled validation. Pydantic v2's performance regression vs. v1 is resolved in v2.x and is negligible at clew's record volumes.

### Positive Consequences

- Single runtime (Python 3.12+) covers CLI, DB access, analysis (marimo), and property validation with no bridging layer
- `uvx clew` / `pip install clew` work from any standard Python environment; no separate build step, no Cargo, no `go build`
- Typer command signatures are self-documenting; `clew --help` output is generated from type annotations without manual docstrings
- Pydantic v2 `ValidationError` messages are structured and CLI-friendly; they propagate directly to stderr without custom formatting code
- DuckDB Python API exposes query results as pandas/polars DataFrames, enabling marimo notebooks to query the DB directly with zero glue code

### Negative Consequences

- Python is slower to start than Go/Rust binaries; each `clew` invocation carries a CPython startup penalty (~50–100ms). Acceptable for single-command agent sessions; may become noticeable in tight shell loops.
- Pydantic v2 is a non-trivial dependency; it pulls in Rust extensions (`pydantic-core`). `pip install clew` on a machine without a pre-built wheel requires a Rust compiler. Mitigated by publishing platform wheels to PyPI.
- Python type system is structural, not nominal; Pydantic validation catches field-level errors but not logic-level invariants (those are enforced in `crud.py`).

## Pros and Cons of the Options

### A. Python 3.12+

#### Positive

- First-class DuckDB and marimo integration
- Typer, Pydantic v2, uvx all native to the ecosystem
- Single runtime for CLI + analysis + validation

#### Negative

- CPython startup latency (~50–100ms per invocation)
- Heavier wheel than a compiled binary

### B. Go

#### Positive

- Fast binary startup; single statically linked executable
- Strong type system; good for CLI tools

#### Negative

- DuckDB Go driver is community-maintained and lags the Python client in features
- No marimo integration; would require a separate Python backend for the analysis layer
- Team capability gap

### C. Rust

#### Positive

- Fastest startup; smallest binary; memory-safe

#### Negative

- DuckDB Rust bindings are less mature than the Python client
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

### G. DuckDB Python client (chosen)

#### Positive

- Official, first-class client; full SQL + parameter binding
- Direct pandas/polars materialisation for marimo
- Supports all DuckDB features (JSON operators, CTEs, sequences)

#### Negative

- Requires `pip install duckdb`; binary wheel dependency

### H. Thin SQL-string wrapper

#### Positive

- Language-agnostic; could be ported to Go/Rust later

#### Negative

- Manual parameter escaping (SQL injection risk)
- No DataFrame materialisation; marimo would need a separate client
- No practical benefit over the Python client

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

- [ADR-0001 Persistence layer](adr-0001-metamodel-persistence-layer.md) — stated "Python-native" as a driver and cited marimo; this ADR formalises that choice.
- [ADR-0003 Schema design](adr-0003-schema-design-typed-property-graph.md) — specified Pydantic models as the property validation layer; this ADR provides the formal decision.
