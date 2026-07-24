---
type: Glossary Term
title: clew Ubiquitous Language Glossary
description: Ubiquitous-language glossary for clew, defining the domain terms of each bounded context.
tags: [domain, glossary]
timestamp: 2026-05-25T15:11:56Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

<!-- glossary-version: 1.0 | created: 2026-05-25 -->

# clew — Ubiquitous Language Glossary

> **Methodology:** Evans *Domain-Driven Design* (2003) Ch. 2 — Ubiquitous Language +
> Vernon *DDD Distilled* (2016) Ch. 2 — Developing the Ubiquitous Language +
> Fowler UbiquitousLanguage pattern (martinfowler.com).
> Every term in this file IS the identifier in code, tests, events, and conversations.

---

## How to use this glossary

1. **One term per concept per bounded context** — if you find two words for the same thing in the same BC, one of them is wrong and must be deprecated here.
2. **These terms ARE the identifiers in code** — class names, method names, event names, test names, and variable names all use the glossary term exactly as written.
3. **If business and engineering use different words for the same thing, this glossary wins** — escalate disagreements to the team, update here, update in code.
4. **Evolves continuously** — obsolete terms are marked Retired (never deleted); new terms are added here before they appear in code.

---

## Quick index

| Term | BC | ID | Status |
|---|---|---|---|
| [Artefact](#artefact--bc-01gt-01) | BC-01 | BC-01.GT-01 | Active |
| [Artefact type](#artefact-type--bc-01gt-02) | BC-01 | BC-01.GT-02 | Active |
| [Audit trail](#audit-trail--bc-01gt-11) | BC-01 | BC-01.GT-11 | Active |
| [Business ID](#business-id--bc-01gt-03) | BC-01 | BC-01.GT-03 | Active |
| [Cartography export](#cartography-export--bc-01gt-21) | BC-01 | BC-01.GT-21 | Active |
| [Declared absence](#declared-absence--bc-01gt-19) | BC-01 | BC-01.GT-19 | Active |
| [Drift](#drift--bc-01gt-12) | BC-01 | BC-01.GT-12 | Active |
| [Edge proposal](#edge-proposal--bc-01gt-20) | BC-01 | BC-01.GT-20 | Active |
| [Enablement](#enablement--bc-01gt-17) | BC-01 | BC-01.GT-17 | Active |
| [File binding](#file-binding--bc-01gt-07) | BC-01 | BC-01.GT-07 | Active |
| [Layer package](#layer-package--bc-01gt-16) | BC-01 | BC-01.GT-16 | Active |
| [Layout](#layout--bc-01gt-09) | BC-01 | BC-01.GT-09 | Active |
| [Methodology](#methodology--bc-01gt-14) | BC-01 | BC-01.GT-14 | Active (borrowed from upstream kit) |
| [Narrative](#narrative--bc-01gt-05) | BC-01 | BC-01.GT-05 | Active |
| [Relationship](#relationship--bc-01gt-06) | BC-01 | BC-01.GT-06 | Active |
| [Section anchor](#section-anchor--bc-01gt-08) | BC-01 | BC-01.GT-08 | Active |
| [Skill](#skill--bc-01gt-15) | BC-01 | BC-01.GT-15 | Active (homonym warning) |
| [Snapshot](#snapshot--bc-01gt-10) | BC-01 | BC-01.GT-10 | Active |
| [Status](#status--bc-01gt-04) | BC-01 | BC-01.GT-04 | Active |
| [Stub parent](#stub-parent--bc-01gt-18) | BC-01 | BC-01.GT-18 | Active |
| [Traceability view](#traceability-view--bc-01gt-13) | BC-01 | BC-01.GT-13 | Active |

---

## BC-01 Artefact Store

> **Subdomain type:** Core
> **BC reference:** [BC-01 Artefact Store](02b-bounded-contexts.md#bc-01--artefact-store)
> **Owner team:** Single stream-aligned founder squad (v1) — see [02b §Team boundary recommendation](02b-bounded-contexts.md#bc-01--artefact-store)

---

#### Artefact · BC-01.GT-01

**Status:** Active

**Definition:** A named, typed record in clew's metamodel — a persona, capability, value-stream stage, objective, key-result, FBS functionality, epic, ADR, or any other type registered in the artefact-type configuration. Carries one stable Business ID for its entire lifetime and one Status; participates in zero or more Relationships with other artefacts and has at most one File binding to its narrative.

**Example:** "When an Artefact is registered with `clew new persona`, the system mints its Business ID from the per-type counter and the agent then writes the Narrative section referenced by the new File binding."

**Aliases (deprecated):** _(none)_

**Anti-patterns:**
- An Artefact is NOT the markdown file itself — the file is the Narrative; the Artefact is the structured record that the Narrative is bound to.
- An Artefact is NOT a row in an arbitrary database table — only metamodel concepts (registered Artefact types) are Artefacts; raw user data, code, or external API responses are not.
- An Artefact is NOT the same as an aggregate — every clew aggregate happens to wrap exactly one root entity at v1, but the aggregate is a consistency boundary while the Artefact is the record.

**Cross-context:**
- Outside clew's BC, the upstream `homemade-claude-kit` uses "artefact" informally to mean any kit-produced document (a persona doc, an ADR doc, a slide deck). Inside BC-01 the term is precise: only a record registered in the `artefacts` table is an Artefact.

**Code convention:** `Artefact` (entity / class) · `artefact` (local variable) · `ArtefactRegistered` / `ArtefactImported` / `ArtefactLinked` (domain events, past tense) · `ArtefactRepository` (repository interface, if introduced)

**First referenced:** [Capability Map L0 C2 Persistence + ADR-0001 §Context](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### Artefact type · BC-01.GT-02

**Status:** Active

**Definition:** The kind of thing an Artefact is — one of the values registered in `ARTEFACT_TYPE_CONFIGS` (e.g. `persona`, `capability`, `value_stream`, `vs_stage`, `objective`, `key_result`, `fbs_functionality`, `epic`, `adr`, `glossary_term`). Determines which Business ID format applies, which property schema validates the Artefact's payload, and which Layout governs where its Narrative lives on disk.

**Example:** "The Artefact type `persona` uses the `P-{nn}` Business ID format, validates against the `Persona` Pydantic model, and follows the `single-collection` Layout pointing at `docs/business/01a-personas.md`."

**Aliases (deprecated):** _(none)_

**Anti-patterns:**
- An Artefact type is NOT a Python class — types are configuration keys; the Python class that validates a type's properties is a separate concept (the property schema).
- An Artefact type is NOT mutable — once an Artefact is registered as type `persona`, it stays that type for life; changing the type means creating a new Artefact.
- An Artefact type is NOT the same as a Methodology — many types belong to one methodology (BIZBOK has persona + capability + value_stream + …).

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `ArtefactType` (value object) · `artefact_type` (column / field / variable, snake_case) · type values themselves are snake_case lowercase (`persona`, `key_result`, never `Persona` or `KEY_RESULT`)

**First referenced:** [ADR-0001 §Context](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### Business ID · BC-01.GT-03

**Status:** Active

**Definition:** The stable semantic identifier that names an Artefact across its entire lifetime (e.g. `P-01`, `C1.2.F03`, `OBJ-03`, `KR-02.3`, `ADR-0004`). Generated by clew's application layer from a per-type counter at registration time — never by an LLM, never by the database engine. Survives DB drop-and-restore unchanged.

**Example:** "The agent writes `[OBJ-03](04b-objectives.md)` in markdown prose using the Business ID; the surrogate primary key behind the scenes is irrelevant to the agent."

**Aliases (deprecated):** ID (deprecated — bare "ID" is ambiguous between Business ID and surrogate primary key; always use "Business ID" when the stable semantic identifier is meant)

**Anti-patterns:**
- A Business ID is NOT a database primary key — surrogate primary keys are regenerated on every restore from Snapshot; Business IDs are preserved exactly.
- A Business ID is NOT free-form — every type has a strict format (`P-\d{2}`, `KR-\d+\.\d+`, etc.); ad-hoc IDs are rejected at write time.
- A Business ID is NOT assigned by the LLM — the deterministic generation contract is precisely what makes traceability reliable.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `BusinessId` (value object) · `business_id` (column / field / variable, snake_case) · Business ID values are always uppercase prefix + format-specific suffix (`P-01`, not `p-01`); the lowercased form appears only in Section anchors

**First referenced:** [ADR-0001 §Decision Drivers + ADR-0003 §Business identity](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### Status · BC-01.GT-04

**Status:** Active

**Definition:** The lifecycle state of an Artefact — one of `draft` (the default at registration; not yet authoritative), `active`, `superseded` (replaced by another Artefact whose Business ID is recorded), or `deprecated` (no longer in use but preserved for history). The enum is aligned with the kit frontmatter lifecycle per the [artefact-store DDL](07b-models/artefact-store.md#physical-schema) (2026-06-11 changelog row: `artefacts.status` aligned to the authoritative `artefact-frontmatter.md` enum; the former `retired` value maps to `deprecated`). Transitions are one-way: `draft` advances only to `active`, and an artefact cannot return to `active` or `draft` once superseded or deprecated.

**Example:** "When ADR-0001 is replaced by a future `ADR-NNNN`, the operator runs `clew set ADR-0001 status superseded --by ADR-NNNN`; the old ADR's Status moves from `active` to `superseded` and stays there."

**Aliases (deprecated):** State (deprecated — "state" is overloaded; "status" is the canonical term for an artefact's lifecycle position)

**Anti-patterns:**
- Status is NOT a workflow stage (planned / in-progress / done) — those are properties on certain Artefact types (e.g. `fbs_functionality.status`) and live in the Artefact's `properties`, not on the lifecycle Status.
- Status is NOT reversible — `deprecated` and `superseded` are terminal; never write code that promotes a terminal Artefact back to `active` or `draft`.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `Status` is a string-valued enum at the persistence layer (`'draft' | 'active' | 'superseded' | 'deprecated'`, default `'draft'`); the lifecycle is documented in the [Artefact Store domain model §BC-01.AGG-01 Lifecycle states](07b-models/artefact-store.md#artefact--bc-01agg-01)

**First referenced:** [Artefact Store domain model §BC-01.AGG-01](07b-models/artefact-store.md#artefact--bc-01agg-01) · 2026-05-25

---

#### Narrative · BC-01.GT-05

**Status:** Active

**Definition:** The markdown prose section authored by the agent (or the human operator) that describes an Artefact in human-readable form — rationale, context, citations, decisions, examples. Distinct from the structured Artefact record: the Narrative carries the prose; the Artefact carries the identity + relationships + typed properties. Linked by exactly one File binding.

**Example:** "After `clew new persona P-01 Ava` returns, the agent writes the Narrative section under the heading `## P-01 · Ava the agent-first product engineer` in `docs/business/01a-personas.md`."

**Aliases (deprecated):** Markdown · Doc (deprecated — both are ambiguous; "Narrative" specifically means the prose section bound to one Artefact)

**Anti-patterns:**
- A Narrative is NOT the full markdown file — many Artefacts share one file (the `single-collection` Layout); each has its own Narrative section within that file.
- A Narrative is NOT generated from the Artefact record — there is no `clew render` command; the agent authors the Narrative directly ([ADR-0001 §Out of scope](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) sealed this).
- A Narrative is NOT the source of truth for relationships — Relationships live in the artefact store; Narrative may reference them via Business ID but the store is authoritative.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `Narrative` does not surface as a class name (it's a content concept, not a typed record); appears in CLI prose as "the narrative" and in `clew check` output as "narrative section"

**First referenced:** [ADR-0001 §Decision Outcome](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### Relationship · BC-01.GT-06

**Status:** Active

**Definition:** A typed, directed edge from one Artefact to another, drawn from the allowed-relationships registry (`TRIGGERS`, `CONSUMES`, `REALIZES`, `GROUPS`, `INFORMS`, `REFERENCES`). May carry a role annotation (e.g. `Differentiator`, `Necessary` on a `CONSUMES` edge). Type-safety is enforced at write time: the source and target Artefact types must satisfy the registry's constraints for the relationship.

**Example:** "`clew link C1.1 CONSUMES C3.2 --role Differentiator` records a Relationship from value-stream-stage `C1.1` to capability `C3.2`, annotated as a Differentiator-importance consumption."

**Aliases (deprecated):** Reference (deprecated *within BC-01* — "reference" is ambiguous between "a relationship row" and "the action of pointing at"; use Relationship for the noun and "the relationship references" for the verb. Note: the `REFERENCES` keyword is the registry's generic edge type, which is a deliberate carve-out from this deprecation rule) · Link (deprecated — "link" is the verb / CLI command name; the noun is Relationship) · Edge (deprecated in user-facing prose — fine in internal graph-theory discussions but not in domain conversation)

**Anti-patterns:**
- A Relationship is NOT a hyperlink in markdown prose — markdown hyperlinks are presentation; Relationships are typed structural facts in the artefact store.
- A Relationship is NOT a foreign key column — FK columns are the implementation; the Relationship is the domain concept (a typed, annotated, registry-validated fact between two Artefacts).
- A Relationship is NOT mutable — once written, it is either present or deleted; there is no "update this relationship's role". Re-annotating means delete + re-link.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `ArtefactReference` is the entity class name (kept literal because `Relationship` is a reserved word in too many ORMs / SQL dialects to be safe; the glossary term is Relationship but the code aligns to `ArtefactReference` for safety — this is a deliberate divergence) · `relationship` (column / field, the typed label like `TRIGGERS`) · `role` (column / field, the optional annotation) · `ArtefactLinked` (domain event, past tense)

**First referenced:** [ADR-0001 §Decision Drivers + ADR-0003 §Context](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### File binding · BC-01.GT-07

**Status:** Active

**Definition:** The link between one Artefact and the location of its Narrative — a tuple of `file_path` (relative path to a markdown file) and Section anchor (the GFM autoanchor within that file). At most one File binding per Artefact. Also carries an optional `content_hash` and `last_seen_at` populated by Drift detection.

**Example:** "When `clew new persona P-01 Ava --file docs/business/01a-personas.md` succeeds, a File binding is recorded pointing P-01 at that file with Section anchor `p-01--ava-the-agent-first-product-engineer`."

**Aliases (deprecated):** Binding (acceptable shorthand in code; in conversation prefer "File binding" to avoid confusion with parameter binding / data binding in other domains)

**Anti-patterns:**
- A File binding is NOT just the file path — without the Section anchor, `clew where P-01` would only get the operator partway; the binding is the complete `file#anchor` coordinate.
- A File binding is NOT the file itself — many File bindings can point at the same `file_path` (in `single-collection` Layouts); each binding scopes one Artefact's Narrative within that file.
- A File binding is NOT created automatically — it is recorded by `clew new ... --file ...` or `clew import md`; if neither has run, the Artefact has no Narrative location and `clew where` returns a `no-binding` error.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `FileBinding` (entity / class) · `file_binding` (local variable) · `FileBindingRecorded` (domain event, past tense) · the `file_bindings` table is the persistence-layer plural

**First referenced:** [ADR-0002 §Decision Outcome](../architecture/decisions/adr-0002-artefact-file-binding.md) · 2026-05-25

---

#### Section anchor · BC-01.GT-08

**Status:** Active

**Definition:** The GFM-compatible anchor within a markdown file that scopes one Artefact's Narrative. Computed deterministically from the Artefact's Business ID and the heading text under which the Narrative lives, using the formula `{lowercase_business_id}--{gfm_slug_of_heading}`. Identical input always produces identical output across clients.

**Example:** "`P-01` under the heading `## P-01 · Ava the agent-first product engineer` produces the Section anchor `p-01--ava-the-agent-first-product-engineer`, which appears unchanged in any GFM renderer."

**Aliases (deprecated):** Anchor (acceptable shorthand when context makes the meaning unambiguous; in formal prose prefer "Section anchor")

**Anti-patterns:**
- A Section anchor is NOT chosen by the operator — it is derived; choosing it manually risks divergence from GFM autoanchor behaviour, breaking `clew where`.
- A Section anchor is NOT stable across heading renames — if the operator renames the heading text, the derived anchor changes; `clew check` will report Drift in the binding's `content_hash`, and `clew bind --update` is the explicit reconciliation path.
- A Section anchor does NOT include the `#` prefix — the prefix is added when composing `file_path#section_anchor` URLs for display, but the stored value is the bare slug.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `SectionAnchor` (value object, immutable) · `section_anchor` (column / field / variable) · `derive(business_id, heading_text)` is the canonical class method (no `compute`, no `build`)

**First referenced:** [ADR-0002 §Anchor convention](../architecture/decisions/adr-0002-artefact-file-binding.md) · 2026-05-25

---

#### Layout · BC-01.GT-09

**Status:** Active

**Definition:** The per-Artefact-type rule for where the Narrative for an Artefact of that type lives on disk. One of three values: `single-collection` (many Artefacts share one canonical file — e.g. all personas in `01a-personas.md`), `one-per-artefact` (each Artefact gets its own file — e.g. each ADR in `adr-NNNN-{slug}.md`), or `inherits-from-parent` (the Artefact lives in its parent's file — e.g. a Key Result lives in its parent Objective's file).

**Example:** "`clew layout adr` returns `layout=one-per-artefact default_path=docs/architecture/decisions/adr-{nnnn}-{slug}.md parent_type=`, telling the agent that each new ADR creates a new file rather than appending to an existing one."

**Aliases (deprecated):** _(none)_ — the term has been called "file layout" colloquially but the glossary form is the bare "Layout"; the `FileLayout` value-object name in code is a historical artefact

**Anti-patterns:**
- Layout is NOT filesystem layout (directory structure choices) — Layout is the per-type rule mapping an Artefact instance to a file; filesystem layout is the broader convention.
- Layout is NOT enforceable at the markdown level — only at clew's write path (`clew new` rejects layout violations); hand-edits can place an artefact heading in the wrong file and only `clew check` will detect it.
- Layout values are NOT extensible at runtime — the three-value enum is fixed at v0.1 per [ADR-0002 §Negative Consequences](../architecture/decisions/adr-0002-artefact-file-binding.md); adding a fourth requires a `schema.py` code change.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `FileLayout` (value object enum — name kept for code clarity even though glossary says "Layout") · `file_layout` (column / field / variable) · enum values are kebab-case strings (`single-collection`, never `single_collection` or `SINGLE_COLLECTION`)

**First referenced:** [ADR-0002 §Schema additions](../architecture/decisions/adr-0002-artefact-file-binding.md) · 2026-05-25

---

#### Snapshot · BC-01.GT-10

**Status:** Active

**Definition:** A deterministic, git-trackable serialisation of the full artefact-store state — one YAML file per Artefact type plus `id_sequences.yaml`, `artefact_references.yaml`, and `file_bindings.yaml`. All records are expressed via Business IDs only; surrogate primary keys never appear. The same store state always produces byte-identical Snapshot output across runs and across machines.

**Example:** "`clew export` writes the Snapshot to `docs/clew/snapshot/`; committing that directory to git makes the artefact-store state the same kind of versioned artefact as the rest of the docs."

**Aliases (deprecated):** Export (deprecated — "export" is the verb / CLI command name; the noun is Snapshot) · Dump (deprecated — too informal; implies non-deterministic)

**Anti-patterns:**
- A Snapshot is NOT the binary `.db` file — the `.db` is gitignored; the Snapshot is what gets committed.
- A Snapshot is NOT a backup in the operational sense — it is the source of truth that the `.db` can be rebuilt from, not a periodic copy taken for safety.
- A Snapshot is NOT human-edited — `clew import snapshot` is the only supported write path; hand-edits to YAML files cause `clew check` to report Drift on the next run.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `Snapshot` does not surface as a class in v1 (it's a directory full of YAML, not a typed object); the CLI commands are `clew export` and `clew import snapshot` (always two words for the latter to disambiguate from `clew import md`); domain events are `SnapshotExported` and `SnapshotRestored`

**First referenced:** [ADR-0001 §Decision Outcome + Capability C2.4](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) · 2026-05-25

---

#### Audit trail · BC-01.GT-11

**Status:** Active

**Definition:** The chronological record of every structural write to the artefact store — every `register`, every `link`, every `unlink`, every `retire`, every Snapshot operation. Per [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) the Audit trail is **delegated to git**, not modelled in the store: git commit history over the committed `snapshot/` directory provides the durable who/when/before-after record, and each structural write becomes visible as a Snapshot diff. There is no audit table and no dedicated audit CLI command — a DB-resident audit would evaporate on `clew import snapshot` rebuild.

**Example:** "`git log -p docs/clew/snapshot/` returns the chronological Audit trail — every structural write appears as a Snapshot diff in the commit that exported it, with git's author and timestamp as the who/when."

**Aliases (deprecated):** History (deprecated as a noun for the audit data — the underlying concept is "Audit trail") · Log (deprecated — too generic; "the log" in modern engineering usually means stdout/stderr)

**Anti-patterns:**
- An Audit trail is NOT a clew-owned store — there is no `audit_events` table and no replayable event log inside the DB ([ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) cut C4.3; the [capability map §Scope discipline](../business/03a-capability-map.md#scope-discipline-adr-0013) records the delegation); git on `snapshot/` is the mechanism.
- An Audit trail is NOT compliance-grade by default — git history is sufficient for project accountability ("why does this Artefact look like this?") but not SOC2/GDPR; treat that as v3 scope.
- An Audit trail granularity is commit-level, not write-level — structural writes between two Snapshot commits collapse into one diff; changes to Narrative prose are tracked by git on the markdown files themselves, outside this term.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `AuditTrail` does not surface as a class, table, or aggregate in clew (delegation to git per [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)); the trail is read with plain git tooling (`git log` / `git diff` over `snapshot/`)

**First referenced:** [Capability Map C4.3 + Wave-1 synthesis F2](../business/03a-capability-map.md#c43--audit-trail) · 2026-05-25

---

#### Drift · BC-01.GT-12

**Status:** Active

**Definition:** A detected discrepancy between the artefact store and the documentation layer — a File binding whose `content_hash` no longer matches the current section content (hand-edited Narrative), an ID-shaped heading in a markdown file with no corresponding Artefact record (Orphan in file), or an Artefact whose `file_path` does not exist (Orphan in DB). Surfaced by `clew check`; never auto-fixed.

**Example:** "After a contributor renames a heading in `01a-personas.md`, the next `clew check` reports Drift on `P-01`'s File binding — the `content_hash` no longer matches, so the operator either updates the binding via `clew bind --update` or restores the original heading."

**Aliases (deprecated):** Skew (deprecated — uncommon term; "Drift" is the industry standard) · Mismatch (deprecated — too generic)

**Anti-patterns:**
- Drift is NOT a bug to silently auto-correct — the operator must decide whether the markdown changed because the Narrative is now better (update the binding) or because someone made a mistake (restore the heading).
- Drift is NOT detected by file-system watchers — it is detected on-demand by `clew check`; treating it as continuous monitoring requires running `clew check` in CI or a pre-commit hook.
- Drift is NOT the only integrity concern — it is the markdown-side check; the write-time-reference validation ([Capability C4.1](../business/03a-capability-map.md#c41--write-time-reference-validation)) covers the CLI-side check. Both are needed because hand-edits bypass the CLI.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `Drift` is a report concept, not a typed entity; appears in code as `drift_report` (the output of `clew check`); the categories within a drift report (Orphan in file, Orphan in DB, Content drift, Layout violation) each have specific names per the [CLI interface contract `clew check` table](../architecture/interfaces/cli-clew.md)

**First referenced:** [Capability Map C4.2 + ADR-0002](../business/03a-capability-map.md#c42--drift-detection) · 2026-05-25

---

#### Traceability view · BC-01.GT-13

**Status:** Active

**Definition:** A canonical, named query over the artefact graph that produces a deterministic, reproducible answer about how Artefacts relate to each other. Three canonical views exist at v1: the *matrix* (every Artefact crossed with every Artefact it relates to, via every Relationship type), the *lineage* (`clew trace <id>` — the full upstream chain of an Artefact), and the *impact analysis* (`clew impact <id>` — every Artefact that would be affected if the target changed). Distinct from ad-hoc SQL queries.

**Example:** "`clew matrix` renders the full traceability matrix in 200ms — every persona × every value stream × every capability × every FBS functionality × every epic, deterministic to the row order."

**Aliases (deprecated):** _(none)_ — the term is sometimes shortened to "view" in CLI prose; in this glossary the canonical form is always "Traceability view"

**Anti-patterns:**
- A Traceability view is NOT an ad-hoc query — Traceability views ship with clew as named commands; new views require a code change, not configuration (deliberate per [Capability C3.2 §Boundaries](../business/03a-capability-map.md#c32--pre-built-traceability-views)).
- A Traceability view is NOT pre-computed — every invocation runs live against the current store state; cached results would invite Drift between cache and store.
- A Traceability view is NOT a business-intelligence dashboard — it is scoped to the metamodel's relationships, not to general analytics over arbitrary data shapes.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `TraceabilityView` is the abstract concept; each concrete view is its own class / function (`MatrixView`, `LineageView`, `ImpactView`); CLI commands are `clew matrix`, `clew trace <id>`, `clew impact <id>` (always singular noun + business-ID argument for the latter two)

**First referenced:** [Capability Map C3.2 (★ Differentiator) + Wave-1 user trust-threshold quote](../business/03a-capability-map.md#c32--pre-built-traceability-views) · 2026-05-25

---

#### Methodology · BC-01.GT-14

**Status:** Active (borrowed from upstream kit)

**Definition:** An external body of practice — BIZBOK, BABOK, Strategyzer, Sommerville, planned DDD / ATDD / BDD / SRE — encoded by the `homemade-claude-kit` as a structured authoring discipline (templates, fields, validation rules). Per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) the *semantic* Methodology definitions stay kit-side, consumed by agents at authoring time — never by clew at runtime ([context map §skills → semantics → agents](02b-context-map.md#homemade-claude-kit-skills--semantics--agents-orthogonal-to-clew)); the *structural* definitions (artefact types, ID formats, relationships) are clew-owned. Inside BC-01 the term appears only to disambiguate cross-Methodology references (Capability `C5.4`): clew validates that a reference from a Strategyzer artefact to a BIZBOK artefact uses the correct types.

**Example:** "When a Strategyzer Value Proposition cites a BIZBOK persona, the cross-Methodology Relationship `REFERENCES` is validated for type compatibility at write time even though the underlying Methodologies are kit-defined."

**Aliases (deprecated):** Framework (deprecated — "framework" is overloaded with software-framework meaning) · Discipline (deprecated within BC-01 — "discipline" is fine when discussing authoring practice in general but "Methodology" is the canonical noun for BIZBOK/BABOK/etc. specifically)

**Anti-patterns:**
- A Methodology is NOT a clew-owned concept — per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) the kit's skills retain the semantic Methodology definitions, consumed by agents rather than by clew; do not encode Methodology specifics inside the clew CLI source ([context map §skills → semantics → agents](02b-context-map.md#homemade-claude-kit-skills--semantics--agents-orthogonal-to-clew)).
- A Methodology is NOT an Artefact type — Methodologies *group* Artefact types ("BIZBOK contains persona + capability + value_stream + …"); the grouping itself does not surface as a row in the `artefacts` table.

**Cross-context:**
- Inside the kit, Methodology is the central organising concept — every kit skill embodies one Methodology pattern. Within BC-01 the term is borrowed and narrowed to its cross-reference-validation role only.

**Code convention:** `Methodology` does not surface as a class in clew v1 (it's purely a categorisation borrowed from the kit); appears in CLI error messages from `C5.4` cross-Methodology validation (e.g. *"REFERENCES from Strategyzer artefact P-01 to ADR-0002: ADR belongs to Sommerville, not Strategyzer — confirm intent"*)

**First referenced:** [Capability Map L0 C5 + C5.4](../business/03a-capability-map.md#c54--cross-methodology-referencing) · 2026-05-25

---

#### Skill · BC-01.GT-15

**Status:** Active (homonym warning)

**Definition:** Within BC-01, "Skill" refers only to the kit-side package that carries the *semantic* authoring methodology and templates for artefact types. Per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) the *structural* definitions — Artefact types, ID formats, Layouts — are owned by clew and flow clew → kit as a Customer-Supplier / Published Language projection ([context map §the ADR-0008 flip](02b-context-map.md#bc-01--customer-supplier--homemade-claude-kit-structural-registry-the-adr-0008-flip)); only the kit's cross-cutting *doc conventions* still flow kit → clew as Conformist input ([context map §Conformist residual](02b-context-map.md#bc-01--conformist--homemade-claude-kit-conventions-residual)). A Skill is not a domain concept that clew CLI reasons about directly — clew never registers an Artefact of type `skill`, never queries skills, never enforces a constraint on a skill. The term appears in BC-01 vocabulary only to mark a homonym warning so contributors crossing the kit ↔ clew boundary do not import the kit's rich Skill model into clew's prose.

**Example:** "When discussing how `clew new persona` works, do not say 'the Skill validates the input' — say 'clew's `crud.py` validates the input using the property schema, which was authored to match the kit's `business-persona` Skill's template'. The Skill lives in the kit; the validation lives in clew."

**Aliases (deprecated):** _(none)_ — the term is only used in BC-01 to flag the boundary; no aliases necessary

**Anti-patterns:**
- A Skill is NOT a runtime dependency of the clew CLI — the CLI does not invoke kit Skills at runtime, and per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) `ARTEFACT_TYPE_CONFIGS` is clew-owned (the kit's structural registry regenerates from clew, not the other way round).
- A Skill is NOT a clew Artefact type — the kit's Skill concept is rich (`SKILL.md`, `references/`, modes, triggers); none of that surfaces inside BC-01.

**Cross-context:**
- Inside the kit, Skill is the central abstraction — a `~/.claude/skills/<skill-name>/` package with `SKILL.md` + `references/template.md` + optional `discipline.md`. The kit's `domain-bounded-context` / `domain-glossary` / `domain-model` skills themselves are examples. Within BC-01 the term is intentionally narrowed to the boundary-marker role only — see [02b §BC-01 Ubiquitous language scope homonym warning](02b-bounded-contexts.md#bc-01--artefact-store).

**Code convention:** `Skill` does not appear as a class, variable, or string literal in clew CLI source — its presence in clew source would be an architectural smell flagging boundary leakage. Inside the kit it is the central organising concept (`SKILL.md` is the file name convention).

**First referenced:** [02b-bounded-contexts.md §BC-01 Ubiquitous language scope](02b-bounded-contexts.md#bc-01--artefact-store) · 2026-05-25

---

#### Layer package · BC-01.GT-16

**Status:** Active

**Definition:** An opt-in set of Artefact types, Relationships, and checks that a repo enables beyond the mandatory core — the sanctioned growth path for multi-layer coverage (strategy/motivation → business → application → technology → implementation & migration) per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md). The mandatory core never grows; each repo's enforced graph is the core plus exactly the packages (and individual types) it opted into. Everything enabled receives the identical 100% write-time guarantee as the core — the enablement choice prices drift surface, never check honesty.

**Example:** "A repo that enables a technology-layer package's types extends its own enforced graph; a repo that never opts in never carries that drift surface — P-01 Ava never pays for a layer she did not choose."

**Aliases (deprecated):** _(none)_ — "package" alone is acceptable shorthand where the layer context is unambiguous; "module" and "plugin" are wrong (they connote code, not registry data)

**Anti-patterns:**
- A Layer package is NOT a soft tier — there is no enabled-with-warnings mode; enabled types get the same write-time strictness as the core ([ADR-0015 §Decision Outcome](../architecture/decisions/adr-0015-opt-in-layer-packages.md)).
- A Layer package is NOT a schema migration — type-definitions are registry data, not code, per [ADR-0003](../architecture/decisions/adr-0003-schema-design-typed-property-graph.md)'s no-DDL design.
- A Layer package is NOT part of the mandatory model — the minimal spine of [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) is the only model every repo carries.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** `LayerPackage` does not surface as a class at v0.1 — packages are registry data (package definitions under `docs/metamodel/packages/` per [ADR-0015 §Dependent artefacts](../architecture/decisions/adr-0015-opt-in-layer-packages.md)); appears in CLI prose as "package" and in enablement output as the package name

**First referenced:** [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) · 2026-07-24

---

#### Enablement · BC-01.GT-17

**Status:** Active

**Definition:** The per-Artefact-type activation by which a repo extends its enforced graph — users pick and choose individual Artefact types, not whole layers, per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md). clew knows each type's prerequisites (e.g. `fbs` requires `capability`) as a prerequisite DAG persisted in the metamodel registry, and enforces it as guide-and-scaffold: enabling a type auto-enables/scaffolds its prerequisites, minting Stub parents where identity requires them.

**Example:** "Enabling `fbs_functionality` triggers Enablement of its prerequisite `capability`; clew scaffolds the prerequisite rather than rejecting the request, so the graph stays well-formed at every step."

**Aliases (deprecated):** Activation (deprecated — "activation" connotes licensing; "Enablement" is the canonical term for the per-type opt-in) · Install (deprecated — nothing is installed; a registry flag flips)

**Anti-patterns:**
- Enablement is NOT per-layer — the granularity is the individual Artefact type; whole-layer switches were considered and rejected ([ADR-0015 §Considered Options C](../architecture/decisions/adr-0015-opt-in-layer-packages.md)).
- Enablement is NOT a weaker integrity tier — an enabled type gets the identical write-time guarantee as the core ([OBJ-02 KR-02.1](../business/04b-objectives.md)).
- Enablement does NOT bypass prerequisites — the DAG is always honoured; the semantics are guide-and-scaffold, never silent skip and never hard refusal.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** Enablement state is persisted in the artefact store ([ADR-0015 §Dependent artefacts](../architecture/decisions/adr-0015-opt-in-layer-packages.md)); the prerequisite DAG lives in the clew-owned metamodel registry per [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md); appears in CLI prose as "enable"/"enabled type"

**First referenced:** [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) · 2026-07-24

---

#### Stub parent · BC-01.GT-18

**Status:** Active

**Definition:** A parent Artefact minted with a **real Business ID** and `_TODO_` content when identity requires a parent — i.e. when a child carries a parent-scoped Business ID (like `C2.1.F01`) and the parent does not yet exist. Part of [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md)'s guide-and-scaffold semantics: the graph stays well-formed (no dangling reference is ever representable) while the prose debt stays visible.

**Example:** "Registering functionality `C2.1.F01` in a repo without capability `C2.1` mints `C2.1` as a Stub parent — a real, permanent Business ID whose Narrative is `_TODO_` until the operator fills it."

**Aliases (deprecated):** Placeholder (deprecated — a placeholder implies a fake or temporary ID; a Stub parent's Business ID is real and permanent) · Ghost node (deprecated — too informal, and wrongly implies the node is not a first-class Artefact)

**Anti-patterns:**
- A Stub parent is NOT a fake ID — the Business ID is minted from the per-type counter like any other and survives for the Artefact's lifetime; only the content is pending.
- A Stub parent is NOT a Declared absence — a Stub parent is a real node with pending prose; a Declared absence is no node and no edge at all.
- A Stub parent is NOT hidden debt — `clew check` keeps the `_TODO_` content visible; a repo that enables aggressively sees its prose debt, by design ([ADR-0015 §Negative Consequences](../architecture/decisions/adr-0015-opt-in-layer-packages.md)).

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** stub minting is part of the Enablement/registration write path; the stub state is carried by the `_TODO_` content sentinel, not by a dedicated status value — lifecycle Status stays `draft` until the operator fills and promotes the Artefact

**First referenced:** [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) · 2026-07-24

---

#### Declared absence · BC-01.GT-19

**Status:** Active

**Definition:** A `_TODO_` sentinel in a soft-link slot for an unenabled or unfilled target — legal and first-class per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md): **no edge row is persisted**, and `clew check` reports it as info-level "declared absences", never a violation. Distinct from a dangling reference — an edge to a non-existent Business ID — which is never representable and hard-blocked at write time, no exceptions, regardless of what is enabled.

**Example:** "A persona's `Realised by: _TODO_` slot is a Declared absence: `clew check` lists it under info-level declared absences, no Relationship row exists, and nothing blocks — the pending link is honest, not broken."

**Aliases (deprecated):** Soft gap (deprecated — invented shorthand; the canonical term is Declared absence) · Missing link (deprecated — ambiguous with dangling reference, which is a different and hard-blocked concept)

**Anti-patterns:**
- A Declared absence is NOT a dangling reference — the three-way distinction of [ADR-0015 §Decision Outcome](../architecture/decisions/adr-0015-opt-in-layer-packages.md) is load-bearing: declared absence = no edge, info-level; dangling reference = never representable, hard-blocked.
- A Declared absence is NOT an edge with a null target — no Relationship row exists at all; the sentinel lives only in the Narrative slot.
- A Declared absence is NOT a violation — treating info-level declared-absence reports as failures would punish honest partial models and push users back to silent gaps.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** the sentinel literal is `_TODO_` (exact casing and underscores); `clew check` output groups these under "declared absences" at info severity, disjoint from the error-level drift and violation categories

**First referenced:** [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) · 2026-07-24

---

#### Edge proposal · BC-01.GT-20

**Status:** Active

**Definition:** A Relationship row whose property bag carries `validation_status: proposed` — an agent-proposed edge awaiting human review, per [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md). Agents may propose relationships; only a human review flips `proposed → validated`; rejected edges are kept for provenance, never deleted by the lifecycle. Proposals are quarantined from the integrity hot path: `clew guard` and `clew check` derive from validated edges and authored constraints only.

**Example:** "The agent's inferred INFORMS edge lands as an Edge proposal (`validation_status: proposed`, `confidence: inferred`, with `rationale` and `source_doc`); it becomes a fact only when the operator validates it — until then no view that reads facts will show it."

**Aliases (deprecated):** Suggested link (deprecated — "link" is already deprecated for the noun; "Edge proposal" is canonical) · Draft edge (deprecated — "draft" collides with the Artefact lifecycle Status value)

**Anti-patterns:**
- An Edge proposal is NOT a fact — the fact set is exactly the validated + authored subset; a query that forgets to filter `proposed`/`rejected` silently reads non-facts ([ADR-0016 §Negative Consequences](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)).
- An Edge proposal is NOT a separate table — proposals live in `artefact_references` with lifecycle state as edge data; a proposals sidecar was considered and rejected ([ADR-0016 §Considered Options B/C](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)).
- An Edge proposal is NOT deleted on rejection — rejected edges carry provenance (why was this considered? why was it wrong?) and stay queryable.
- An Edge proposal is NOT input to guard/check — no LLM-inferred judgment enters the integrity hot path; LLM output always lands quarantined as a proposal.

**Cross-context:** N/A — concept owned entirely by BC-01.

**Code convention:** property-bag keys on `artefact_references` per [ADR-0016](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md): `validation_status` (`proposed | validated | rejected`), `confidence` (`stated | inferred`), `rationale`, `source_doc`; the review workflow surfaces in the CLI as list/validate/reject commands ([CLI contract](../architecture/interfaces/cli-clew.md))

**First referenced:** [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) · 2026-07-24

---

#### Cartography export · BC-01.GT-21

**Status:** Active

**Definition:** The deterministic projection of the enforced graph into an external view tool (e.g. LikeC4) — `clew export likec4`, the fourth read-side surface joining `context`/`trace`/`impact` per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) (D7). The projection is never a second source of truth: views are regenerated from the store, and ArchiMate is an export-time mapping only, never clew's mandatory ontology.

**Example:** "`clew export likec4` regenerates the cartography views from the current store state; hand-editing a generated view is Drift by definition — the enforced graph remains the only source."

**Aliases (deprecated):** Diagram export (deprecated — undersells the concept; the export is a projection of the whole enforced graph, not a picture) · ArchiMate export (deprecated — names the mapping, not the concept; ArchiMate is one export-time vocabulary, not the ontology)

**Anti-patterns:**
- A Cartography export is NOT a second source of truth — the governing principle lifted from the cartography prototype's ontology ([ADR-0015 §Decision Outcome](../architecture/decisions/adr-0015-opt-in-layer-packages.md)): projection is never a second source of truth.
- A Cartography export is NOT ArchiMate persistence — "just persist the ArchiMate model" requests are the boundary to defend ([ADR-0015 §Negative Consequences](../architecture/decisions/adr-0015-opt-in-layer-packages.md)); clew's store keeps its own type catalogue.
- A Cartography export is NOT a hand-maintained diagram — hand-maintained EA views are exactly the rot failure the enforced graph exists to prevent.

**Cross-context:**
- LikeC4 (and any future view tool) sits outside clew's boundary: "LikeC4 is a view tool; clew is an enforcement substrate — they compose" (cartography prototype, Plan 0138; imported at [`../discovery/cartography-prototype-clew-fit-2026-07-24.md`](../discovery/cartography-prototype-clew-fit-2026-07-24.md)).

**Code convention:** CLI command `clew export likec4` (the `export` verb namespace already carries the Snapshot's `clew export`; the `likec4` argument selects the cartography projection); deterministic output — same store state, byte-identical views

**First referenced:** [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) · 2026-07-24

---

## Cross-context translation matrix

> When the same real-world concept is modelled differently in two or more bounded contexts,
> the translation must be explicit here. Undocumented translations cause integration bugs.

| Real-world concept | BC-01 term (GT-NN) | External kit term | Divergence note |
|---|---|---|---|
| The authoring discipline distilled per body of practice | BC-01.GT-14 Methodology *(borrowed, narrow)* | "Methodology" (broad — central to the kit's purpose) | BC-01 only knows Methodology as a categorisation tag for cross-reference validation; the kit owns the rich Methodology model including templates, modes, and triggers |
| The kit-side package that embodies a Methodology | BC-01.GT-15 Skill *(homonym warning; boundary marker only)* | "Skill" (central abstraction — `SKILL.md` package) | BC-01 must not import kit-Skill semantics into its own prose; the term appears in BC-01 only as a marker to warn contributors of the boundary |
| A markdown document authored by the agent | BC-01.GT-05 Narrative *(precise: a section bound to one Artefact)* | "Artefact" (informal — any kit-produced doc, including slide decks) | Inside BC-01 the precise term for prose is Narrative; the kit's informal usage of "artefact" for any output document is different from BC-01's strict definition of Artefact as a registered metamodel record |

The external kit is not formally modelled as a clew-internal bounded context at v1 (see [02b OI-0018](02b-bounded-contexts.md#open-items)). The matrix above documents the term-level translations across the Conformist boundary for the three terms where divergence matters most.

---

## Open Items

None at present. *(The decision to elevate the kit to BC-02 is tracked in [`02b-bounded-contexts.md` OI-0018](02b-bounded-contexts.md#open-items); the glossary's existence closes OI-0017 in that file in the same commit.)*

---

## Changelog

| Date | Mode | Change summary | Author |
|---|---|---|---|
| 2026-07-24 | Mint (decided ADRs) | Six terms added for BC-01 from the [2026-07-24 grill-me session](../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) decisions: **GT-16 Layer package**, **GT-17 Enablement**, **GT-18 Stub parent**, **GT-19 Declared absence**, **GT-21 Cartography export** per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) (D1/D2/D3/D7), and **GT-20 Edge proposal** per [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) (D8). Quick index extended to 21 terms. | Victor Hueni |
| 2026-07-24 | Cascade (decided ADRs) | Three already-decided changes cascaded in. **GT-04 Status**: enum aligned to the artefact-store DDL / kit frontmatter lifecycle (`draft`/`active`/`superseded`/`deprecated`, default `draft`; `retired` → `deprecated`), per the [artefact-store 2026-06-11 changelog row](07b-models/artefact-store.md#changelog). **GT-11 Audit trail**: redefined as delegated to git per [ADR-0013](../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) (C4.3 cut) — `audit_events` table and `clew log`/`clew history` removed from the definition; term kept because it is referenced elsewhere. **GT-14 Methodology + GT-15 Skill**: rewritten for the [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) flip (structural definitions flow clew → kit as Customer-Supplier / Published Language; doc conventions remain kit → clew Conformist; semantics stay kit-side for agents); three dead `02b-context-map.md#bc-01--conformist--homemade-claude-kit-external-upstream` anchors repointed at the v2.0 context-map headings. | Victor Hueni |
| 2026-05-25 | Scaffold + Seed + Enrich (one pass) | Initial 15 terms minted for BC-01 Artefact Store. Sources: 7 terms from [02b-bounded-contexts.md §BC-01 Ubiquitous language scope](02b-bounded-contexts.md#bc-01--artefact-store) (Artefact, Business ID, Relationship, File binding, Snapshot, Layout, Skill homonym warning); 4 derived from the [Artefact Store domain model](07b-models/artefact-store.md) entities + VOs (Artefact type, Status, Section anchor, plus IdCounter folded into Business ID's code convention); 4 from the [capability map](../business/03a-capability-map.md) BC-01 capabilities (Narrative, Audit trail, Drift, Traceability view); 1 borrowed from upstream kit (Methodology) for cross-reference validation context. All terms passed Evans 4-condition definition quality test. Cross-context matrix populated with 3 entries documenting kit ↔ BC-01 term divergence. | Victor Hueni |
