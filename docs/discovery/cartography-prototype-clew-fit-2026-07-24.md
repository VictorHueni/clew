---
type: Research Note
title: Cartography Prototype — clew Fit Assessment (imported annex I)
description: External read-only assessment of clew (2026-07-21 state) from the swiss-aos cartography prototype, recommending a Paracel-local build while surfacing the edge-schema gap and multi-layer need that ADR-0015/ADR-0016 resolve.
tags: [discovery, cartography, clew-fit, imported-evidence, layer-packages, edge-schema]
timestamp: 2026-07-24T18:00:00Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 90d
---

> **Provenance.** Imported 2026-07-24 from the `swiss-aos-drug-reimbursement-model` cartography prototype (Plan 0138 annex I); external evidence for [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) / [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) — the original stays canonical in its repo. Content below is unmodified.

# clew fit assessment — Enterprise Cartography engine: build in clew, or Paracel-local?

> Read-only investigation of `/home/slimpunkerz/projects/clew` (branch `docs/minimal-model-positioning`, HEAD `df75cc6`, 2026-07-21). No files in the clew repo were modified. Question: should the Paracel "Enterprise Cartography" engine (ArchiMate-anchored entity+relationship impact graph with an outside-in environment layer) be built as a capability of clew — with other products as consumers — or built locally inside Paracel?

## TL;DR recommendation

**Build the cartography engine Paracel-local, reusing clew's schema *design pattern* (the typed-property-graph) but not clew itself as a dependency or host.** This is not a hybrid where clew persists the graph and Paracel renders it, and it is not "a clew capability with Paracel as consumer." Three findings make that decisive:

1. **clew has no code.** It is a design-phase repo — 13 ADRs, a domain model, a capability map, a CLI contract — but zero implementation. There is no `pyproject.toml`, no `schema.py`, no `crud.py`, no `.db`, no `snapshot/`, no CLI. "Reuse clew" today can only mean "reuse clew's design," which you can do without adopting clew.
2. **clew has explicitly, recently, and with citation decided NOT to be this.** [ADR-0013](https://github.com/VictorHueni/clew/blob/main/docs/architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) (2026-07-07, `active`) rules "repo-native enterprise architecture / Ardoq-for-agents" out of scope and pins clew to a *minimal* model. VISION.md §What We Are NOT now states verbatim: *"Not an enterprise-architecture modelling platform (Ardoq, BiZZdesign, LeanIX)."* The cartography is precisely the ArchiMate-grade "EA feature programme" that ADR-0013 names and cuts. Building it in clew re-opens the positioning clew just closed.
3. **The two graphs are different truths, not one truth stored twice.** clew's node ontology is *documentation-artefact* types (persona, capability, value_stream, epic, PRD, ADR). The cartography's ontology is *ArchiMate enterprise + environment entities* (business/app/tech elements, regulatory drivers, tariff regimes, competitors, systems) and their real-world dependency edges. Same graph *mechanism*, entirely different *type catalogue* and different questions. So a Paracel-local cartography does **not** create a second copy of clew's source of truth — it is a different source of truth. The founder's "don't maintain two sources of truth" concern does not actually bite here.

The reusable asset is clew's **ADR-0003 typed-property-graph pattern**, which is an excellent, directly-portable design for the cartography — and which Paracel's existing Postgres + SQLAlchemy + FastAPI + Nuxt stack can implement natively today, with no wait on clew shipping.

---

## 1. What clew IS, concretely

| Attribute                | Finding                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**              | "AI-native product intelligence CLI" — the structured, enforced knowledge layer AI agents use to persist and query a product's strategic-architecture metamodel (personas → capability map → value streams → objectives → domain model → FBS → epics → PRDs → plans). Positioned as *"the product-intent contract an agent must satisfy before it changes code — only clew creates facts."* |
| **Maturity**             | **Early design phase — no implementation.** README §Status: *"No CLI yet: the commands shown are the target shape, not the current state."* Business + spec + domain + architecture layers are *documented*; code is not written. `find` for `*.py / *.sql / pyproject.toml / clew.db` returns nothing but one slide `script.js`. There is no `docs/clew/` DB or snapshot directory yet.    |
| **Intended tech stack**  | Python 3.12+ · Typer (CLI) · **stdlib `sqlite3`** (v1) · Pydantic v2 (property validation) · marimo (read-only analysis notebooks). Java was reconsidered (ADR-0004, 2026-06-11) and rejected; Python reaffirmed for marimo + agent-ecosystem fit.                                                                                                                                          |
| **Form factor**          | A **CLI** (agents call `clew …` via Bash and get deterministic IDs back), wrapping a `crud.py` core over a local SQLite file. Upgrade path is explicit and staged: **v1 CLI → v2 MCP server (same core) → v3 FastAPI + Postgres (multi-user).** MCP and HTTP do **not** exist yet.                                                                                                          |
| **Install/run (target)** | `uvx clew` / `pip install clew`. DB at `docs/clew/clew.db` (located via `git rev-parse --show-toplevel`); git-tracked YAML `snapshot/` is the durable form, the `.db` is disposable.                                                                                                                                                                                                        |
| **Instancing**           | **One instance per repo/product.** DB path is repo-root-relative; single-writer per repo; cross-machine / multi-user concurrency explicitly out of scope until v3. It is **not** a multi-product service.                                                                                                                                                                                   |

## 2. Persistence & data model

**Yes, there is a database design** — SQLite (v1), Postgres at v3 — specified in [ADR-0003](https://github.com/VictorHueni/clew/blob/main/docs/architecture/decisions/adr-0003-schema-design-typed-property-graph.md) and the [BC-01 Artefact Store domain model](https://github.com/VictorHueni/clew/blob/main/docs/domain/07b-models/artefact-store.md). It is a **typed property graph**, and it *is* an actual graph (nodes + typed edges), not just entity records. Four tables:

| Table                 | Role                                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `artefacts`           | Universal node registry. Columns: `pk` (surrogate), `business_id` (stable semantic key, e.g. `P-01`), `artefact_type`, `name`, `status`, `created_at`, **`properties` (JSON blob, type-specific fields)**. No per-type tables — `artefact_type` is a column. |
| `artefact_references` | **Typed directed edge table.** Columns: `source_pk`, `relationship`, `target_pk`, **`role`** (single optional annotation), `created_at`. Validated at write time against an `ALLOWED_RELATIONSHIPS` registry (source/target type-pair enforced).             |
| `file_bindings`       | Binds an artefact to its markdown `file_path` + `section_anchor`; `content_hash` for drift detection.                                                                                                                                                        |
| `id_sequences`        | Per-type business-ID counter (application-generated, never LLM-generated).                                                                                                                                                                                   |

**Entity types modelled (v1 "self-dogfooding spine," 11 types):** `persona`, `capability`, `value_stream`, `vs_stage`, `objective`, `key_result`, `fbs_functionality`, `epic`, `bounded_context`, `glossary_term`, `adr`. Deferred to v2: `process`, `canvas`, `quantitative_model`, `prd`, `implementation_plan`, `use_case`, `interface_contract`, `cli_command`, domain sub-types, `idea`, `competitor`.

**Edge/relationship types modelled:** ~43 typed relationships in the registry (`TRIGGERS`, `CONSUMES`, `REALIZES`, `GROUPS`, `INFORMS`, `MEASURES`, `SCOPES`, `MODELS`, `EXPOSES`, … + a generic `REFERENCES any→any`). Each edge carries **one** `role` string (e.g. `Differentiator`, `Necessary`).

**Typed layers / ArchiMate?** **No.** The type catalogue is documentation-artefact types, not ArchiMate business/application/technology-layer elements. There is no `archimate_type`, no layer concept, no environment/outside-in modelling. Competitors (`competitor`/`CO-NN`) exist in the *registry* but are v2-deferred and are still doc artefacts, not ArchiMate stakeholders/drivers.

**Impact traversal?** Designed. The domain model §Graph traversal pattern specifies a single `WITH RECURSIVE` CTE over `artefact_references` (depth-guarded at 10; real depth ≤5) that powers `clew impact` / `clew trace` / `clew matrix`. **These are designed but not given CLI command signatures in the v1 interface contract yet** (the v1 Query group is `clew list`, `clew context`, planned `clew guard`, `clew layout`, `clew where`). ADR-0001's example shows `clew impact X → { affected: [...] }` as target shape.

## 3. Query & output surface

- **Ad-hoc query (C3.1):** SQL surface over the store; "which capabilities serve P-01?" answered in-session.
- **Pre-built traceability views (C3.2, a stated Differentiator):** canonical matrix / lineage / impact views over the edge graph — dependency/impact traversal is a *first-class design goal*.
- **`clew context <task>` (C1.2, Differentiator):** assembles the relevant metamodel slice into an agent's context, token-costed. This is clew's headline read-side wedge.
- **`clew guard` (planned v0.2):** change-guardrail ("what does this change touch / must update first"). Not built; deliberately gated behind a dense, drift-free graph.
- **Graph visualisation:** **none.** Read-only analysis is marimo notebooks (roadmap/Gantt/KR-coverage), not a filterable node-edge graph view. No diagram/viz output of the graph exists or is planned in-scope.
- **MCP / agent interface:** target for **v2**; not built. v1's agent surface is the CLI via Bash (stdout = structured result, stderr = human text).
- **Markdown import/export:** `clew import md` adopts ID-headed markdown into the store; `clew export` emits deterministic YAML `snapshot/`. It reconciles *with* a product's `docs/` (binds to file sections, detects drift) — it does not generate the prose; agents author prose referencing clew-minted IDs.

## 4. Extensibility

**Adding new node *types* and *relationship* types is cheap by design — no DDL.** ADR-0003's whole point: a new artefact type = one Pydantic class + one `ARTEFACT_TYPE_CONFIGS` entry + one `id_sequences` row; a new edge type = one `ALLOWED_RELATIONSHIPS` entry. So `archimate_type` as a closed enum, env-layer node types (regulatory driver, tariff regime, external network as Driver/Constraint/Stakeholder), and cross-layer `influence` edges would all slot into the node/edge model **without schema migration** — *if the ontology decision (adopt ArchiMate) were acceptable*, which per ADR-0013/VISION it is deliberately **not** for clew.

**But two concrete schema gaps for the cartography's edge semantics:**

- **Edges have no property bag — only a single `role` text column.** Nodes carry a `properties` JSON; edges do not. The cartography needs **per-edge `validation_status` (proposed|validated|rejected) + `confidence` (stated|inferred)**. clew's physical DDL cannot hold these without either two new edge columns (a DDL change — the one thing the design avoids) or overloading the single `role` string. (ADR-0003 prose aspirationally lists "role, confidence, evidence_ref" as edge metadata, but the actual DDL in the domain model only has `role`.) This is a real "gap in the DB the owner suspects."
- **`env_subtype` as a node property** is fine — it lands in `properties` JSON with no DDL. Only the edge-metadata gap is structural.

**Multi-product?** clew is architected as **one-instance-per-repo, single-writer, local-first, no-SaaS** (VISION §What We Are NOT; ADR-0001 concurrency model). "One cartography engine serving many products as consumers" is the multi-tenant shape clew explicitly defers to v3 and disowns as a platform. A shared cross-product cartography contradicts clew's core architecture as currently specified.

## 5. Relationship to the kit metamodel

[ADR-0008](https://github.com/VictorHueni/clew/blob/main/docs/architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) (`active`) makes clew the **canonical source of truth for the *structural + relational* metamodel** (which artefact types exist, their IDs/layouts, which edges are legal), with the homemade-claude-kit's registry becoming a *generated projection* of clew (via a future `clew metamodel export`, not yet built). Skills keep only the *semantic* fact-class ("what a good persona is"). So clew is intended to be a **parallel structured store** that a product's `docs/` reconciles against: kit skills author markdown prose; clew persists the structured records/edges and binds them to file sections; `clew check` detects prose↔store drift. clew ingests ID-headed markdown (`import md`) and enforces references, but does not generate the narrative.

This matters for the cartography question: clew's canonical role is over the **metamodel of documentation artefacts**, not over a product's real-world entity/environment graph. The cartography is orthogonal to what ADR-0008 makes clew canonical for.

## 6. The gaps — what clew already provides vs. what the cartography needs

| Cartography need                                                                                                     | clew status                                                                                                                         | Verdict                                  |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| (a) Shared entity+relationship **schema**                                                                            | Typed-property-graph design (ADR-0003): universal node table + typed edge table. **Ontology is doc-artefact types, not ArchiMate.** | **Pattern reusable; ontology absent.**   |
| (b) **Persistence** with stable IDs as node keys                                                                     | `id_sequences` app-generated stable `business_id`; snapshot/restore preserves them. **Designed, not implemented.**                  | **Design reusable; no running store.**   |
| (c) Deterministic **impact traversal** ("blast radius", "what depends on X", "what does regulation Y affect")        | Recursive-CTE impact/trace/matrix design over `artefact_references`. **Designed; CLI commands not yet specified/implemented.**      | **Directly the right pattern; unbuilt.** |
| (d) Referential-integrity **validation**                                                                             | Write-time FK + type-pair enforcement (`ALLOWED_RELATIONSHIPS`) is a stated Differentiator (C4.1). **Designed, not implemented.**   | **Reusable design; unbuilt.**            |
| (e) Filterable **graph visualisation**                                                                               | **None.** marimo notebooks only; no node-edge viz, in-scope or planned.                                                             | **Full gap.**                            |
| (f) **Agent-consumable query surface** (MCP/CLI)                                                                     | CLI is v1 (unbuilt); MCP is v2 (unbuilt).                                                                                           | **Roadmapped, unbuilt.**                 |
| **`archimate_type` closed enum + layers**                                                                            | Absent; adding it is the EA-model expansion ADR-0013 forbids for clew.                                                              | **Gap + positioning conflict.**          |
| **Outside-in env entities** (regulatory drivers, tariff regimes, external networks as Driver/Constraint/Stakeholder) | Absent. Would slot into node model with no DDL, but is out-of-scope EA breadth for clew.                                            | **Gap + positioning conflict.**          |
| **Cross-layer `influence` edges**                                                                                    | New edge type = one registry entry (cheap) — but see edge-metadata gap.                                                             | **Mechanism present.**                   |
| **Per-edge `validation_status` + `confidence`**                                                                      | Edges carry only one `role` string; no edge property bag.                                                                           | **Structural schema gap.**               |

**Summary:** clew already provides (as *design*, not code) exactly the right *substrate mechanics* — universal node table, typed edges, write-time referential integrity, recursive-CTE impact traversal, stable IDs, deterministic export. clew does **not** provide: any implementation at all; the ArchiMate ontology / layers / env entities; per-edge validation_status+confidence (edges lack a property bag); graph visualisation; a multi-product / shared-service deployment shape; and it has an *active positioning decision against* becoming this kind of tool.

---

## Recommendation & reasoning (for a solo founder who values reuse and one source of truth)

**Build Paracel-local. Borrow clew's ADR-0003 typed-property-graph design; do not host the cartography in clew or make clew a Paracel dependency.**

Why this is the reuse-maximising choice despite the instinct to consolidate into clew:

1. **There is nothing to reuse in clew yet except a design** — and a design is copyable into Paracel for free. Waiting for clew to build a CLI, then an MCP, then v3 Postgres/multi-user, to host a cartography that Paracel needs now, couples a live product need to an unstarted side project's roadmap.
2. **You would be fighting your own ADR.** clew's ADR-0013 and VISION were *just* (2026-07-07) sharpened to exclude ArchiMate/EA modelling, because every added artefact type is drift surface and because the EA breadth widens clew's persona↔rigor gap. Bolting an enterprise cartography onto clew silently re-expands the exact scope that ADR was written to fence. That is the opposite of "one clean source of truth."
3. **It is not actually two-sources-of-one-truth.** clew's truth = your *product-intent documentation* (personas→PRDs→plans). The cartography's truth = your *enterprise + environment entity graph* (regulations, tariff regimes, competitors, systems, org units and their influence/dependency edges). Different ontology, different questions, different consumers. Keeping them separate creates two graphs of two truths, not two copies of one — so the "no duplicate source of truth" principle is *satisfied*, not violated, by separation.
4. **Paracel's stack already is clew's v3 target.** Paracel runs Postgres + SQLAlchemy + Alembic + FastAPI + a Nuxt frontend. clew's own endgame (v3) is Postgres + FastAPI. You can implement the *exact* typed-property-graph pattern natively in Paracel — a `cartography/` feature package: two tables (`carto_entities` with `archimate_type` + `env_subtype` in JSONB; `carto_edges` with `relationship` + `validation_status` + `confidence` + `influence` semantics in JSONB), recursive-CTE blast-radius queries as SQL views/functions, write-time referential-integrity checks, and a filterable graph view in the existing Nuxt app. This closes clew's two hardest gaps for free: **edge property bag** (Postgres JSONB on edges gives you validation_status/confidence with no DDL pain) and **visualisation** (you already have a frontend; clew has none and none planned).
5. **Multi-product consumption is a non-starter in clew as specified** (single-writer, per-repo, no-SaaS to v3). If a genuine cross-product cartography ever matters, that is a dedicated service — again clew-v3-shaped and years out — not something to force now.

**What to lift from clew verbatim** (the high-value, low-cost reuse):

- The **two-table typed-property-graph** (universal entity table + typed edge table; type is a column, not a schema) with **no-DDL type addition via a registry** — so your `archimate_type` closed enum and env-layer types are Pydantic + registry entries, not migrations.
- **Application-generated stable IDs** as node keys (never LLM-minted), surviving rebuild — directly satisfies your "stable IDs as node keys" requirement.
- **Write-time referential-integrity + type-pair edge validation** (`ALLOWED_RELATIONSHIPS`-style registry) — your referential-integrity validation need.
- **Recursive-CTE impact traversal** as the blast-radius / "what depends on X" / "what does regulation Y affect" engine.
- The **deterministic export → git** discipline if you want git-diffable graph snapshots.

**One thing to add that clew lacks by design:** a **per-edge property bag** carrying `validation_status` (proposed|validated|rejected) and `confidence` (stated|inferred). In Postgres, make it a JSONB column on the edge table (or explicit columns) from day one — this is the concrete "gap in the DB" and it is trivial to fix on your own stack, structurally awkward on clew's.

**When to revisit a hybrid:** only if (a) clew ships real code *and* a v3 multi-product Postgres service, and (b) you find yourself wanting the cartography to reference clew's product-intent artefacts (e.g. an `influence` edge from a regulatory driver to a specific PRD). At that point a *cross-graph reference* (clew business_id as a foreign entity in the cartography, or vice-versa) is the clean integration — not merging the two ontologies into one store. Until then, Paracel-local with clew's pattern is strictly better: it ships now, on a stack you already run, without violating clew's positioning, and without inventing a shared service you don't yet need.

---

## Open Items

None at present. *(The annex's two clew-directed findings — the per-edge property bag / `validation_status` + `confidence` schema gap, and the multi-layer ontology need in tension with ADR-0013's scope — were resolved into [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) and [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) respectively; the read-side visualisation gap it notes is answered by ADR-0015's cartography-export surface. Its build recommendation — Paracel-local, reusing the ADR-0003 pattern — is external to clew and requires no clew-side action; the "when to revisit a hybrid" conditions are a note for that repo, not an open item here.)*
