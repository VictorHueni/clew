---
title: clew CLI — Interface Contract v1
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 90d
---

# clew CLI — Interface Contract v1

Covers `clew` v0.1–v0.3 (MVP scope). This document is the authoritative contract between the CLI and its callers — AI agents (Claude Code via Bash), shell scripts, and human operators. It specifies command signatures, I/O contracts, validation rules, and error behaviour.

**Related ADRs:** [ADR-0001](../decisions/adr-0001-metamodel-persistence-layer.md) · [ADR-0002](../decisions/adr-0002-artefact-file-binding.md) · [ADR-0003](../decisions/adr-0003-schema-design-typed-property-graph.md) · [ADR-0004](../decisions/adr-0004-python-typer-duckdb-implementation-stack.md)

**Domain model:** [Artefact Store](../../domain/07b-models/artefact-store.md)

---

## §0 Traceability

This CLI is the BC-scoped Open Host Service for **BC-01 Artefact Store** ([bounded-contexts.md](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)). It is the only writer to the artefact store (single-writer per repo, per ADR-0001) and the Published Language consumed by AI agents, marimo notebooks (read-only), and shell scripts ([context map](../../domain/02b-context-map.md)).

**Capability consumption (per [03a-capability-map.md](../../business/03a-capability-map.md)):**

| Command group | Capabilities realised |
|---|---|
| `clew new` (creation) | C2.1 Stable identifier generation · C2.2 Schema enforcement · C2.3 File binding management · C4.1 Write-time reference validation (Differentiator) |
| `clew link` (relationships) | C4.1 Write-time reference validation |
| `clew set` (updates) | C2.2 Schema enforcement · C4.3 Audit trail |
| `clew list` / `clew estimate` | C3.1 Ad-hoc cross-artefact query surface · C3.2 Pre-built traceability views (Differentiator, via canonical views) |
| `clew layout` / `clew where` | C2.3 File binding management |
| `clew check` (health) | C4.1 Write-time reference validation · C4.2 Drift detection · C2.3 File binding management |
| `clew export` / `clew import snapshot` | C2.4 Deterministic structural export · C2.1 Stable identifier generation |
| `clew import md` (bootstrap) | C2.3 File binding management · C2.1 Stable identifier generation |

**Domain model anchors:** every command shape derives from BC-01's aggregates (`Artefact`, `Reference`, `FileBinding`, `IdSequence`) and domain events (`ArtefactRegistered`, `ArtefactLinked`, `FileBindingRecorded`, `SnapshotExported`, `SnapshotRestored`). Full mapping: [Artefact Store §Aggregate catalogue](../../domain/07b-models/artefact-store.md#aggregate-catalogue).

**ADR dependencies:** ADR-0001 (persistence layer + single-writer concurrency) · ADR-0002 (file binding model + layout enforcement) · ADR-0003 (typed property graph schema) · ADR-0004 (Python / Typer / SQLite stack).

---

## §1 Overview

### Install

```bash
uvx clew          # ephemeral, no global install required
pip install clew  # persistent install
```

### Global conventions

| Convention | Rule |
|---|---|
| **stdout** | Structured result only. On success, a creation command prints the new business ID (e.g. `P-01`). A query command prints a table or a single value. No progress messages on stdout. |
| **stderr** | All human-readable messages, warnings, and errors. |
| **Exit codes** | `0` = success. `1` = user error (bad input, layout violation, FK violation). `2` = internal error (DB inaccessible, schema mismatch). |
| **DB location** | `docs/clew/clew.db` relative to the repo root (detected via `git rev-parse --show-toplevel`). |
| **Single-writer** | v1 serialises concurrent invocations via an OS flock on the DB file. The second process waits; it does not fail. |

---

## §2 Command catalogue

### Creation group — `clew new`

Registers a new artefact, generates its business ID from the `id_sequences` table, creates a `file_bindings` record if `--file` is provided, and prints the ID to stdout.

#### `clew new persona <name>`

```
clew new persona <name>
  [--role TEXT]
  [--goals TEXT]
  [--pain-points TEXT]
  [--file PATH]           required (layout: single-collection)
```

- `--file` must match the configured `default_path` for `persona` (`docs/business/01a-personas.md`). Rejects any other path.
- Returns: `P-{nn}` on stdout (e.g. `P-01`).

#### `clew new capability <name>`

```
clew new capability <name>
  [--parent C-N]          parent capability (L0); required for L1
  [--level 0|1|2]         default 1
  [--definition TEXT]
  [--strategic-importance Differentiator|Necessary|Commodity]
  [--file PATH]           required (layout: single-collection)
```

- `--file` must match `docs/business/03a-capability-map.md`.
- Returns: `C{n}` (L0) or `C{n}.{m}` (L1) on stdout.

#### `clew new functionality <name>`

```
clew new functionality <name>
  --cap C-N.M             parent capability; required
  [--description TEXT]
  [--vs-stage VS-N.M]     soft-link (not a FK)
  [--is-differentiator]
  [--file PATH]           required (layout: single-collection; defaults from capability's file)
```

- Returns: `C{n}.{m}.F{nn}` on stdout (e.g. `C1.2.F03`).

#### `clew new epic <name>`

```
clew new epic <name>
  [--phase N]
  [--value-statement TEXT]
  [--file PATH]           required (layout: single-collection)
```

- `--file` must match `docs/product-specs/08a-delivery-roadmap.md`.
- Returns: `E-{nn}` on stdout.

#### `clew new objective <statement>`

```
clew new objective <statement>
  [--perspective financial|customer|internal|learning]
  [--timeframe TEXT]
  [--owner TEXT]
  [--file PATH]           required (layout: single-collection)
```

- `--file` must match `docs/business/04b-objectives.md`.
- Returns: `OBJ-{nn}` on stdout.

#### `clew new key-result <parent-obj-id> <metric>`

```
clew new key-result <OBJ-NN> <metric>
  --target NUMBER
  [--unit TEXT]
  [--baseline NUMBER]
  [--measurement-method TEXT]
```

- `--file` is **optional**; inherits parent objective's `file_path` from `file_bindings`.
- Returns: `KR-{nn}.{m}` on stdout (e.g. `KR-02.3`).

#### `clew new adr <title>`

```
clew new adr <title>
  [--status draft|active|superseded|deprecated]
  [--supersedes ADR-NNNN]
```

- Generates the file at `docs/architecture/decisions/adr-{nnnn}-{slug}.md` (layout: `one-per-artefact`). Rejects if the file already exists.
- Returns: `ADR-{nnnn}` on stdout (e.g. `ADR-NNNN`).

---

### Relationship group — `clew link`

Creates a typed edge in `artefact_references`. Enforces source/target type constraints from the relationship registry.

```
clew link <source-id> <relationship> <target-id>
  [--role TEXT]           optional annotation (e.g. Differentiator, Necessary)
```

**Allowed relationships and type constraints:**

| `<relationship>` | Source type | Target type | `--role` values |
|---|---|---|---|
| `TRIGGERS` | `persona` | `value_stream` | — |
| `CONSUMES` | `vs_stage` | `capability` | `Differentiator`, `Necessary` |
| `REALIZES` | `fbs_functionality` | `vs_stage` | `Differentiator` |
| `GROUPS` | `epic` | `fbs_functionality` | — |
| `INFORMS` | `objective` | `vs_stage` | — |
| `REFERENCES` | any | any | free text |

- Returns: nothing on stdout (exit 0 on success).
- Error (exit 1): if source or target ID does not exist, or if type constraints are violated.

---

### Update group — `clew set`

Updates a property on an existing artefact record.

```
clew set <id> <field> <value>
```

**Supported fields per type:**

| Type | Field | Allowed values |
|---|---|---|
| `fbs_functionality` | `status` | `planned`, `in-progress`, `done` |
| `fbs_functionality` | `complexity` | `XS`, `S`, `M`, `L`, `XL` |
| `capability` | `strategic-importance` | `Differentiator`, `Necessary`, `Commodity` |
| any | `name` | non-empty string |
| any | `status` | `active`, `retired`, `superseded` |

- Returns: nothing on stdout (exit 0 on success).
- Error (exit 1): unknown field for the artefact type, or invalid value.

---

### Query group

#### `clew list [type]`

```
clew list [persona|capability|functionality|epic|objective|...]
  [--epic E-NN]           filter functionalities by epic
  [--status STATUS]       filter by status field
  [--format table|csv|json]   default: table
```

Prints a table of matching artefact records. With no `type` argument, lists all artefacts.

#### `clew estimate epic <E-NN>`

Rolls up complexity estimates for all functionalities linked to the epic via `GROUPS` edges.

```
clew estimate epic <E-NN>
```

Output (stdout, one line per row):

```
epic    functionalities    XS    S    M    L    XL    best(d)    likely(d)    worst(d)
E-NN    12                 2     4    3    2    1     8          12           18
```

Complexity → day mapping: `XS=0.5d`, `S=1d`, `M=2d`, `L=3d`, `XL=5d`. Best = sum of lower bounds; likely = sum of modal; worst = sum of upper bounds.

#### `clew estimate phase <N>`

Same as `clew estimate epic` but aggregated across all epics in the phase.

#### `clew layout <type>`

Returns the layout rule for an artefact type. Output is machine-parseable.

```
clew layout persona
```

```
type=persona  layout=single-collection  default_path=docs/business/01a-personas.md  parent_type=
```

#### `clew where <id>`

Returns the file path and section anchor for an artefact.

```
clew where P-01
```

```
docs/business/01a-personas.md#p-01--ava-the-agent-first-product-engineer
```

Error (exit 1): if the artefact has no `file_bindings` record (not yet written to markdown).

---

### Health group — `clew check`

Audits DB ↔ file consistency. Prints a report to stdout; exits non-zero if any issues are found.

```
clew check [--path PATH]    scope check to one file; default: all bound files
```

**Reports:**

| Check | Description |
|---|---|
| Orphan in DB | Artefact has a `file_bindings` record but the file does not exist |
| Orphan in file | ID-shaped heading in the file has no matching `artefacts` row |
| Layout violation | Artefact's `file_path` does not conform to its type's `default_path` rule |
| Content drift | `content_hash` differs from the current hash of the artefact's section |

`clew check` updates `content_hash` and `last_seen_at` in `file_bindings` for any section it successfully hashes. It never modifies markdown files.

---

### Snapshot group

#### `clew export`

Serialises the DB to a business-ID-centric YAML snapshot.

```
clew export [--out snapshot/]    default: docs/clew/snapshot/
```

Writes one YAML file per artefact type, plus `id_sequences.yaml` and `file_bindings.yaml`. All records are expressed using `business_id` values; surrogate PKs do not appear.

Output files (in `--out` directory):

```
id_sequences.yaml
artefacts/
  personas.yaml
  capabilities.yaml
  functionalities.yaml
  epics.yaml
  objectives.yaml
  key_results.yaml
  adrs.yaml
  ...
artefact_references.yaml
file_bindings.yaml
```

Returns: nothing on stdout (exit 0 on success). Writes are atomic (temp file + rename).

#### `clew import snapshot`

Restores the DB from a `clew export` snapshot. Destructive — overwrites the current DB.

```
clew import snapshot [--from snapshot/]    default: docs/clew/snapshot/
```

**Restore contract:**
1. Reads all artefact records by `business_id`; inserts with new surrogate PKs.
2. Reads `artefact_references` by `(source_business_id, relationship, target_business_id)`; remaps to new surrogate PKs before inserting.
3. Reads `file_bindings` by `business_id`; remaps `artefact_pk` to new surrogate PKs.
4. Reads `id_sequences`; sets `next_val` per type from the snapshot (not from DB max).

Business IDs are identical to the exported state. Surrogate PKs are regenerated from the DB's sequences (`artefact_pk_seq`, etc.) and bear no relation to the pre-export values.

Returns: nothing on stdout (exit 0 on success).

---

### Migration group

#### `clew import md`

One-time bootstrap: adopts a pre-existing markdown file into the DB.

```
clew import md <path>
  [--dry-run]    preview what would be inserted without writing
```

**Procedure (per matching heading):**

1. Walks the file; finds headings whose first token matches a known business ID pattern (`P-NN`, `OBJ-NN`, `KR-NN.M`, `C1.2.F03`, `ADR-NNNN`, etc.).
2. For each match, inserts an `artefacts` row (if not already present) with the parsed `business_id`, `artefact_type`, and `name`; `properties` is set to `{}`.
3. Creates a `file_bindings` row (`file_path`, `section_anchor`, `content_hash = NULL`).
4. After all inserts for the file, advances `id_sequences.next_val` for each artefact type to `max(imported_suffix_for_that_type) + 1`, preventing future `clew new` collisions.

**Report (stdout):**
- Adopted: list of `business_id` values inserted
- Already present: list of IDs already in the DB (skipped)
- Orphans in file: ID-shaped headings with no DB record after the import
- Orphans in DB: artefacts of matching types with no `file_bindings` entry

`clew import md` does not write or modify markdown files.

---

## §4 Validation rules

### Layout enforcement (`clew new`)

| Layout type | `--file` requirement | Rejection condition |
|---|---|---|
| `single-collection` | Required | Path does not match the type's `default_path` |
| `one-per-artefact` | Required | Path does not match the `default_path` template with `{nn}`/`{nnnn}` and `{slug}` interpolated, or the file already exists |
| `inherits-from-parent` | Optional | If provided, path must satisfy the parent's layout constraint; if omitted, the parent's `file_path` is inherited from `file_bindings` |

**Transaction ordering for `one-per-artefact` types:** the CLI pre-reads `id_sequences.next_val` (without incrementing) to compute the tentative path, validates it, then calls `next_business_id()` to atomically increment and write. Under v1's single-writer flock, the pre-read and increment are serialised — no race condition and no rollback required on validation failure.

### FK checks (`clew link`)

Before writing to `artefact_references`:
1. `source_pk` lookup: rejects if `source_id` is not in `artefacts`.
2. `target_pk` lookup: rejects if `target_id` is not in `artefacts`.
3. Type constraint check: rejects if `(source.artefact_type, target.artefact_type)` is not in the allowed set for the relationship (see relationship registry).

### `clew new` FK checks

`clew new key-result <OBJ-NN>` verifies that `OBJ-NN` exists in `artefacts` with `artefact_type = 'objective'` before inserting. `clew new functionality --cap C-N.M` verifies that `C-N.M` exists with `artefact_type = 'capability'`.

---

## §5 Output contract

The CLI separates **structured result** (stdout) from **human-readable narrative** (stderr) so callers — AI agents, shell scripts, CI jobs — can parse stdout without filtering out progress noise. The same separation makes interactive sessions readable.

### Channels

| Channel | Carries | On success | On error |
|---|---|---|---|
| **stdout** | Structured result only: a freshly minted business ID, a query table, a single scalar value. No progress, no logs, no warnings. | One line per result row, no trailing newline noise. | Empty. |
| **stderr** | Progress, warnings, errors, advisory messages. | Optional info messages (e.g. "wrote 12 artefacts to snapshot"). | `Error: <category>: <message>` per §7. |
| **Exit code** | `0` success · `1` user error · `2` internal error. | `0` | `1` or `2` (see §7). |

### Per-command output shapes

| Command | stdout shape |
|---|---|
| `clew new <type> …` | A single line: the minted business ID (e.g. `P-01`, `C1.2.F03`, `ADR-NNNN`). No surrounding noise. |
| `clew link …` / `clew set …` | Empty. Success indicated by exit code `0`. |
| `clew list [type] [--format table\|csv\|json]` | Table by default; CSV (RFC 4180-compliant); or a JSON array of objects (one per row). `--format json` is the canonical shape for callers piping to `jq` or similar. |
| `clew estimate epic <E-NN>` / `clew estimate phase <N>` | One row per rollup, columns: `epic, functionalities, XS, S, M, L, XL, best(d), likely(d), worst(d)`. |
| `clew layout <type>` | One line of `key=value` pairs separated by two spaces, machine-parseable (e.g. `type=persona  layout=single-collection  default_path=docs/business/01a-personas.md  parent_type=`). |
| `clew where <id>` | One line: `<relative-path>#<section-anchor>`. Empty stdout + exit `1` if the artefact has no `file_bindings` record. |
| `clew check [--path]` | A report block per check category (Orphan in DB, Orphan in file, Layout violation, Content drift) with one row per finding. Empty report on a clean run. |
| `clew export` / `clew import snapshot` / `clew import md` | Empty stdout. Progress messages on stderr; final summary line on stderr. |

### Determinism guarantees

- Same DB state + same command + same flags → byte-identical stdout (modulo timestamps in `clew list` rows, which surface from the audit trail and are themselves deterministic per row).
- `clew export` produces byte-identical YAML files for the same DB state, per [C2.4 Deterministic structural export](../../business/03a-capability-map.md#c24--deterministic-structural-export). This is the substrate that makes git-diff of snapshots meaningful.
- No locale-dependent formatting on stdout (numbers use `.` decimal separator, dates use ISO 8601).

### Atomicity

- Snapshot writes (`clew export`) are atomic: each YAML file is written to a temp path and renamed in place; partial snapshots never leave the temp directory.
- DB writes (`clew new`, `clew link`, `clew set`, `clew import …`) are wrapped in a single transaction per invocation; on internal error (exit `2`) the DB is unchanged.

### Colour and TTY

stderr human-readable messages may use ANSI colour when attached to a TTY; colour is suppressed when stderr is not a TTY. stdout is **always** plain text — no colour escape codes — so structured pipelines see clean output regardless of TTY attachment.

---

## §7 Error contract

All errors are written to **stderr**. stdout is empty on error. Exit code is `1` (user error) or `2` (internal error).

### Error message format

```
Error: <category>: <human-readable message>
  <optional detail line>
```

### Common errors

| Exit | Category | Example message |
|---|---|---|
| 1 | `layout-violation` | `persona '--file docs/business/05a-processes/foo.md' does not match required path docs/business/01a-personas.md` |
| 1 | `file-exists` | `adr 'docs/architecture/decisions/adr-0005-my-title.md' already exists` |
| 1 | `unknown-id` | `source 'P-NN' not found in artefacts` |
| 1 | `type-constraint` | `TRIGGERS requires source type persona, got capability (P-01 is a capability)` |
| 1 | `unknown-relationship` | `'DRIVES' is not a known relationship type; known: TRIGGERS, CONSUMES, REALIZES, GROUPS, INFORMS, REFERENCES` |
| 1 | `unknown-field` | `field 'priority' is not settable on persona; settable fields: name, status` |
| 1 | `no-binding` | `P-01 has no file binding; run 'clew new persona … --file <path>' or 'clew import md <path>' first` |
| 2 | `db-locked` | `DB is locked by another process (PID 12345); retrying…` |
| 2 | `schema-mismatch` | `DB schema version 0.0 is older than clew 0.1; run 'clew migrate'` |

---

## Open Items

None at present.

## Changelog

| Date | Change | Evidence | Cascading effects |
|---|---|---|---|
| 2026-05-26 | File renamed `clew-cli-v1.md` → `cli-clew.md` and moved from `docs/architecture/interface-contracts/` to canonical `docs/architecture/interfaces/`. Headings aligned to the `arch-cli-contract` template: added §0 Traceability (capability + domain-model + ADR provenance), renamed §Command reference → §2 Command catalogue, renumbered §Validation rules → §4, added §5 Output contract (channels + per-command output shapes + determinism + atomicity + colour), renumbered §Error contract → §7. §Changelog added. | Metamodel audit 2026-05-26 (§2 + §9 findings); `rules/metamodel.md` Step 8.5 canonical path. | Cross-references in [ADR-0001](../decisions/adr-0001-metamodel-persistence-layer.md), [ADR-0002](../decisions/adr-0002-artefact-file-binding.md), [ADR-0003](../decisions/adr-0003-schema-design-typed-property-graph.md), [02b-bounded-contexts.md](../../domain/02b-bounded-contexts.md), [02b-context-map.md](../../domain/02b-context-map.md), [02c-glossary.md](../../domain/02c-glossary.md) updated to the new path in the same pass. |
