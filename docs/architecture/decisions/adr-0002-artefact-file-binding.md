---
type: Architecture Decision Record
title: Bind metamodel artefacts to narrative files via a typed layout convention
description: Binds metamodel artefacts to narrative files via a typed layout convention with a schema field, CLI query, and write-time validation.
tags: [architecture, adr, file-binding]
timestamp: 2026-05-24T14:58:13Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-11
review_interval: 90d
---

# Bind metamodel artefacts to narrative files via a typed layout convention

> **Amended (2026-07-24, [ADR-0017](adr-0017-multi-artefact-file-contract.md)).** The §Layout taxonomy table gains `prd` (one-per-artefact, `docs/product-specs/prds/prd-{nnnn}-{slug}.md`) and `user_story` (inherits-from-parent, parent `prd`, ID `PRD-NNNN.US-NN`) rows, and the layout-taxonomy derivation rule — which of the three categories a future type registration takes — is now recorded (ADR-0017 D5). The three-category enum, the anchor convention, and the multi-anchor out-of-scope clause are unchanged; this is the row growth this ADR anticipated.

## Context and Problem Statement

[ADR-0001](adr-0001-metamodel-persistence-layer.md) establishes SQLite as the canonical store, YAML as the deterministic structural export, and markdown as agent-authored narrative referencing CLI-returned IDs. ADR-0001 does **not** say *where* each artefact's narrative lives on disk, nor how the CLI should know whether `clew new <type>` should expect a new file or a new section in an existing file.

The repository today already demonstrates that at least three distinct file-layout patterns coexist in the metamodel:

| File on disk today | Pattern observed |
|---|---|
| `docs/business/01a-personas.md` | Many personas share one file. |
| `docs/business/04b-objectives.md` | Many objectives in one file, with sub-artefacts (KRs) inheriting their parent objective's file. |
| `docs/business/02a-lean-canvas.md` | One canvas per file; many blocks per canvas, each inheriting the canvas's file. |
| `docs/architecture/decisions/adr-NNNN-{slug}.md` | One ADR per file. |
| Future `docs/business/05a-processes/proc-NN-{slug}.md` | One process per file. |
| Future `docs/domain/glossary.md` | Many glossary terms share one file. |

Without a schema-encoded convention:

- The agent **guesses** on `clew new <type> --file <path>` and may put a persona in a process directory by mistake. The CLI has no rule to reject it.
- **Non-Claude-Code agents** (Codex, plain shell scripts, future MCP clients) cannot discover the convention without reading homemade-claude-kit skill prose, which is not part of the metamodel.
- **"Write-time integrity enforcement"** ([OBJ-02 KR-02.2](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it)) cannot be demonstrated against a layout violation because the CLI has no enforceable rule.
- The agent on update has no programmatic way to answer *"where is OBJ-01 documented?"* because `clew where <id>` cannot exist without a stored file binding.
- Sub-artefacts (KRs inside an objective, blocks inside a canvas) have no default location; the agent must repeat `--file` for every child, which is noisy and inconsistent.

A second, narrower problem rides alongside: even if the file is known, navigation requires a **section anchor**. `clew where P-01` returning only `docs/business/01a-personas.md` is half-useful when the file holds twenty personas. The binding must include both file path and section anchor, and the anchor must be deterministically computable from the artefact's identity.

## Decision Drivers

- Every artefact type in the metamodel must have a single, queryable layout convention.
- Both agent and human must discover the convention without reading prose.
- The CLI must enforce the convention at write time, consistent with the OBJ-02 promise.
- Sub-artefacts must inherit their parent's binding by default; explicit overrides should be rare and intentional.
- `clew where <id>` must return file path + section anchor, not just file path.
- The convention must be schema-encoded, not skill-only, so non-Claude agents cannot silently violate it.
- Must not require a separate render step, consistent with [ADR-0001](adr-0001-metamodel-persistence-layer.md)'s "markdown is agent-authored narrative" model.
- The anchor convention should match what GFM autoanchors already produce, so existing markdown files do not need rewriting.

## Considered Options

- **A.** Skill-only convention (status quo). Layout lives in homemade-claude-kit prose; CLI accepts any `--file`.
- **B.** CLI hard-codes per-type defaults in Python source; no schema field, no discovery command.
- **C.** Filename-pattern inference (e.g. `*-personas.md` is parsed as a personas file).
- **D.** Schema field per entity type + `clew layout` query + write-time validation in `clew new`. *(Chosen.)*

## Decision Outcome

Chosen option: **D (schema field + CLI query + write-time validation)**, because it is the only option in which the metamodel itself owns the rule, the agent can verify it programmatically, and the CLI can enforce it deterministically.

### Schema additions

**Artefact type configuration — Python constants in `schema.py`** (not a DB table; see [ADR-0003 §Artefact type configuration](adr-0003-schema-design-typed-property-graph.md) for rationale):

```
file_layout    Literal['single-collection', 'one-per-artefact', 'inherits-from-parent']
default_path   str | None   # template: {nn}/{nnnn} (zero-padded counter), {slug}, {parent_path}
                            # None when file_layout = 'inherits-from-parent'
parent_type    str | None   # required when file_layout = 'inherits-from-parent'
```

**Per-artefact file binding — `file_bindings` table** (defined in [ADR-0003](adr-0003-schema-design-typed-property-graph.md); FK on `artefacts(pk)`):

```
file_path        VARCHAR                # path captured at clew new time
section_anchor   VARCHAR                # derived: {lowercase_id}--{gfm_slug_of_heading}
content_hash     VARCHAR      NULLABLE  # NULL until clew check first hashes the section
last_seen_at     TIMESTAMPTZ  NULLABLE  # NULL until clew check first visits the section
```

`clew where <id>` queries this table. One row per artefact; created at `clew new` time with `content_hash = NULL`.

> **Hash scope and canonicalisation:** the exact bytes covered by `content_hash`, the canonicalisation rule applied before hashing, the additional `canonicaliser_version` column, and the four drift categories surfaced by `clew check` are decided in [ADR-0007 File-binding content-hash strategy](adr-0007-file-binding-content-hash-strategy.md). This ADR reserves the column; ADR-0007 specifies its contents.

### CLI surface

```
clew layout <type>                       # returns layout, default_path, parent_type
clew new <type> --file <path> ...        # validates path; rejects layout mismatch
clew where <id>                          # returns file_path#section_anchor
clew check                               # reports orphans, drift, layout violations
```

For `inherits-from-parent` types, `--file` is optional; when omitted, the CLI looks up the parent's `file_path` and uses it. Explicit override is allowed but rare (e.g. splitting one large objective into its own file as a refactor).

### Anchor convention

Section anchor = `<lowercase-id>--<slug-of-heading>`.

Examples:
- `P-01` in `01a-personas.md` with heading "P-01 · Ava the agent-first product engineer" → `p-01--ava-the-agent-first-product-engineer`.
- `OBJ-03` in `04b-objectives.md` with heading "OBJ-03 · Validate the core hypotheses before scaling" → `obj-03--validate-the-core-hypotheses-before-scaling`.

This matches GFM autoanchor behaviour exactly, so existing markdown files in the repo do not need rewriting and `clew where` works against them as soon as bindings are recorded.

### Authoring flow

```
AGENT (Claude / Codex)
  ├── (optional) clew layout persona → "single-collection / docs/business/01a-personas.md"
  ├── clew new persona "Ava" --role "..." --file docs/business/01a-personas.md
  │     ├── CLI validates: layout = single-collection, --file is the configured collection path → OK
  │     ├── CLI computes section_anchor = "p-01--ava-the-agent-first-product-engineer"
  │     ├── CLI stores: P-01, file_path, section_anchor, content_hash=NULL (no section yet)
  │     └── CLI returns: P-01
  ├── writes markdown section in the file under heading "P-01 · Ava the agent-first product engineer"
  └── clew check → updates content_hash for the new section (per [ADR-0007](adr-0007-file-binding-content-hash-strategy.md): dprint-canonicalised section body)
```

For sub-artefacts:

```
clew new key-result OBJ-03 "interviews conducted" --target 5
  ├── CLI looks up OBJ-03 → file_path = docs/business/04b-objectives.md
  ├── CLI inherits the binding for KR-03.2
  └── CLI returns: KR-03.2
```

### Layout taxonomy at MVP scope

The three categories cover every artefact type observed in the repo today. The complete enum is fixed at v0.1:

| Type | Layout | Default path template | Parent |
|---|---|---|---|
| persona | single-collection | `docs/business/01a-personas.md` | (none) |
| objective | single-collection | `docs/business/04b-objectives.md` | (none) |
| key-result | inherits-from-parent | (inherits objective) | objective |
| canvas | one-per-artefact | `docs/business/02a-{slug}.md` | (none) |
| bmc-block | inherits-from-parent | (inherits canvas) | canvas |
| capability | single-collection | `docs/business/03a-capability-map.md` | (none) |
| value-stream | single-collection | `docs/business/04a-value-streams.md` | (none) |
| process | one-per-artefact | `docs/business/05a-processes/proc-{nn}-{slug}.md` | (none) |
| bounded-context | single-collection | `docs/domain/02b-bounded-contexts.md` | (none) |
| glossary-term | single-collection | `docs/domain/02c-glossary.md` | (none) |
| adr | one-per-artefact | `docs/architecture/decisions/adr-{nnnn}-{slug}.md` | (none) |

The table grows as v0.3 introduces remaining artefact types (FBS, PRDs, quality attributes, epics, quantitative models). The enum stays stable; only rows are added.

> **Correction (2026-06-11):** the `bounded-context` and `glossary-term` rows were corrected to match repository reality and `homemade-claude-kit/rules/metamodel.md` canonical paths — both are **single-collection** single files (`02b-bounded-contexts.md`, `02c-glossary.md`), not `one-per-artefact` under `contexts/` or a `glossary.md`. Discrepancy surfaced while building `rules/artefact-types-registry.md` (clew ADR-0006).

### Positive Consequences

- Write-time integrity enforcement gains a concrete first demo: `clew new persona --file docs/business/05a-processes/foo.md` is rejected with a clear message.
- Any agent with shell access can discover layout via `clew layout <type>`; the rule is not gated by which skill is loaded.
- `clew where <id>` returns a navigable `file#anchor` target, useful inside agent sessions and CLI scripts alike.
- Sub-artefact binding is automatic; the agent does not repeat `--file` for every KR or BMC block.
- Schema is the single source of truth; homemade-claude-kit skills *describe* what the schema enforces, not duplicate it.
- Anchor convention matches GFM autoanchors, so today's hand-written markdown is `clew where`-compatible immediately after migration.

### Negative Consequences

- The three-category enum is fixed at v0.1; a fourth category emerging in v0.3+ requires a `schema.py` code change (adding to the `FileLayout` literal type and updating `ARTEFACT_TYPE_CONFIGS`).
- Default-path templates are a small interpolation language (`{nn}`, `{slug}`, `{parent_path}`) to maintain.
- Existing files (authored before clew existed) need a one-time `clew import md` pass to populate `file_path`, `section_anchor`, and `content_hash` retroactively.
- Anchor convention is GFM-coupled; non-GFM renderers (or future custom renderers) may produce different anchors, breaking `clew where` navigation outside the repo's primary toolchain.

## Pros and Cons of the Options

### A. Skill-only convention (status quo)

#### Positive

- Zero schema change.
- Convention can evolve in prose without code changes.
- Lowest implementation cost.

#### Negative

- Convention is invisible to any agent that did not load the relevant skill.
- CLI cannot enforce; layout violations are silent until a future reader notices.
- `clew where <id>` cannot exist without a stored binding.
- Sub-artefact inheritance has no programmatic basis.

### B. CLI hard-coded per-type defaults

#### Positive

- No schema change.
- CLI enforces deterministically.
- Cheap to ship for the MVP set of types.

#### Negative

- Convention is hidden in Python source; agents and users cannot inspect it without reading code.
- Adding a new artefact type in v0.3 requires editing CLI code, not just schema config.
- Discovery requires `clew --help` walking, not a typed query.
- The rule and the schema are decoupled, which is the same fork problem as option A in different clothing.

### C. Filename-pattern inference

#### Positive

- No schema change.
- Looks magical when it works.

#### Negative

- Brittle: `01a-personas.md` matches by happy filename; `personas.md` or `team-personas.md` would not.
- Encodes intent in filenames, which are presentation concerns, not metamodel concerns.
- Ambiguous: how does the CLI know `docs/business/05a-processes/proc-01-onboarding.md` is a process and not a generic markdown file?
- Hostile to rename: changing a filename silently changes the inferred type.

### D. Schema field + CLI query + write-time validation (chosen)

See *Decision Outcome* above.

#### Positive

- Convention lives in the metamodel; non-Claude agents discover it via the CLI.
- Write-time enforcement is deterministic and demonstrable.
- `clew where`, `clew layout`, and sub-artefact inheritance all fall out of one schema addition.
- Anchor convention is part of the same decision, so binding is end-to-end (file path + anchor) from day one.

#### Negative

- Schema discipline required from v0.1; the enum is a commitment.
- Default-path interpolation needs a small grammar.
- Initial migration of existing files is required (one-time `clew import md`).

## Out of scope for this ADR

- `clew render` and any form of DB-to-markdown generation. ADR-0001's "markdown is agent-authored narrative" stands; this ADR only adds a binding, not a rendering pipeline.
- Multi-anchor-per-file artefacts (an artefact whose narrative spans multiple non-contiguous sections). Not observed in the repo; deferred until a real case appears.
- Custom anchor schemes for non-GFM renderers. The convention is GFM-coupled by intent.

## Related decisions

- Depends on: [ADR-0001 Introduce a persistence layer for the strategic-architecture metamodel](adr-0001-metamodel-persistence-layer.md).
- Refined by: [ADR-0007 File-binding content-hash strategy](adr-0007-file-binding-content-hash-strategy.md). ADR-0007 specifies the contents of `content_hash`, the canonicalisation rule, the additional `canonicaliser_version` column, and the four drift categories surfaced by `clew check`.
- Linked from: [Lean Canvas §4 Solution](../../business/02a-lean-canvas.md#4-solution--confidence-assumed-solution-details-still-in-design-foundational-bullet-tested-n1) (first concrete demo of OBJ-02 KR-02.2), [OBJ-02 §Linked from](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it).

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| `file_bindings` DDL + `ArtefactTypeConfig` dataclass | [Artefact Store domain model §Physical schema](../../domain/07b-models/artefact-store.md) |
| Validation rules + transaction ordering for `clew new` | [CLI interface contract v1](../../architecture/interfaces/cli-clew.md) |
| Markdown migration procedure (`clew import md`) | [CLI interface contract v1](../../architecture/interfaces/cli-clew.md) |
