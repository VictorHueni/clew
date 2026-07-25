---
type: Handoff
title: "PRD-0001 · Authoring Handoff"
description: "Everything needed to author a complete PRD-0001 for E-01 in a fresh session — required reading tiered by authority, E-01's exact scope, the five decisions that must land during drafting, authoring rules, and the definition of done."
tags: [product-specs, prd-0001, handoff]
timestamp: 2026-07-25T11:26:57Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-25
review_interval: 30d
---

<!-- doc-version: 1.0 | created: 2026-07-25 -->

# PRD-0001 · Authoring Handoff

**What this is.** A briefing for whoever (human or agent, fresh context) authors PRD-0001. It enumerates every input the PRD needs, in tiers by authority, plus the decisions that must be made *while* drafting and the rules that make the output conformant. Read this file first; it is the map, not the territory.

**What this is not.** Not the PRD, and not a metamodel artefact — `Handoff` is working material, deliberately outside the artefact graph (no `handoff` type exists in the registry, by design). The PRD artefact itself must land at its registry path, **`docs/product-specs/prds/prd-0001-{slug}.md`** — *not* in this folder. This folder holds preparation material only, so that `prds/` stays clean for layout enforcement ([C2.3.F03](../07a-fbs.md#c23--file-binding-management)) once clew polices it.

---

## The task in one paragraph

Author **PRD-0001**, the feature spec for **[E-01 · Trustworthy Artefact Persistence](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence)** — clew's write path, 25 FBS functionalities, the walking-skeleton core of v0.1. Use the `product-spec:spec-prd` skill. Stories are **embedded in the PRD file** as `PRD-0001.US-NN` sections per [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) — this is the first live exercise of that contract, so contract fidelity matters as much as content. Each story carries a `Covers: UC-NN` field pointing at the use case it exercises. Acceptance criteria **cite** the CLI contract's sections; they never restate command signatures, output shapes, or error categories. Peer-review or grill the result before locking it.

---

## Hard prerequisites — all met

| Prerequisite | Why it gates the PRD | Evidence |
|---|---|---|
| Epic E-01 exists | `SPECIFIES epic → prd` is 1:1 — a PRD with no epic has nothing to specify | [delivery-roadmap.md](../../plans/delivery-roadmap.md), merge `3d9a430` |
| CLI contract synced with ADR-0016/0017 | Acceptance criteria cite contract sections; drafting against a stale contract would force invented command shapes | [cli-clew.md](../../architecture/interfaces/cli-clew.md) changelog 2026-07-24 |
| Use cases UC-01–UC-05 authored | Stories reference them via `Covers:`; their extension paths are the source of the non-happy-path acceptance criteria | [use-cases/index.md](../use-cases/index.md), commits `658e15a`→`f99e7aa` |
| Multi-artefact file contract decided | Embedded-story IDs, hash exclusion, umbrella frontmatter, parent-scoped sequences | [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) |

---

## Required reading — Tier 1: authority (read fully)

These define what PRD-0001 must be true to. Contradicting any of them is a defect.

| File | What to take from it |
|---|---|
| [`docs/plans/delivery-roadmap.md`](../../plans/delivery-roadmap.md) | §E-01 — the value statement, the exact 25-row FBS scope, the sizing warning (at the 25 upper bound: any new row forces a split), and the MVP thin cut vs Phase-1 completion split |
| [`docs/architecture/interfaces/cli-clew.md`](../../architecture/interfaces/cli-clew.md) | The whole contract. §2 command catalogue (`init`, `new`, `link`, `set`, list/where, `check`, `bind --update`, `export`, `import`), §4 validation rules, §5 output contract + determinism + atomicity, §7 error catalogue. **Cite section anchors; do not restate.** |
| [`docs/product-specs/07a-fbs.md`](../07a-fbs.md) | The 25 rows verbatim (IDs, wording, ★ markers, VS-stage links) and §Scope discipline — what ADR-0013 descoped and must stay out |
| [`docs/product-specs/use-cases/`](../use-cases/) — [UC-01](../use-cases/uc-01-persist-artefact-with-write-time-integrity.md) · [UC-02](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md) · [UC-03](../use-cases/uc-03-detect-and-reconcile-drift.md) · [UC-04](../use-cases/uc-04-link-artefacts-with-typed-relationship.md) · [UC-05](../use-cases/uc-05-rebuild-store-from-snapshot.md) | Behaviour contracts. Their **extensions** are the acceptance-criteria mine: every rejection path a story must assert is already enumerated there. Their guarantees are the invariants the PRD must not weaken |
| [`docs/business/04b-objectives.md`](../../business/04b-objectives.md) | OBJ-01 KR-01.1 (< 5 min first artefact) and OBJ-02 KR-02.1–02.4 (100% write-time store integrity, violations surface at introduction, < 1 min detection, deterministic replay) — the measurable bar. Note KR-02.1's deliberate store-vs-prose split |
| [`docs/VISION.md`](../../VISION.md) | The wedge sentence and the NOT-list. Every scope temptation checks against it (no delivery accounting, no PM features) |

## Required reading — Tier 2: decided constraints (cite, don't restate)

| File | Constrains |
|---|---|
| [ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md) | SQLite WAL, single-writer, DB gitignored and rebuildable |
| [ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md) | File binding model: `file_path` + `section_anchor` (`<lowercase-id>--<slug>` GFM autoanchor), layout enforcement |
| [ADR-0003](../../architecture/decisions/adr-0003-schema-design-typed-property-graph.md) | Typed property graph, no-DDL 4-table schema |
| [ADR-0004](../../architecture/decisions/adr-0004-python-typer-duckdb-implementation-stack.md) | Implementation stack (note: stable filename, superseded storage engine — WAL SQLite per ADR-0001) |
| [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md) | Per-section SHA-256, canonicaliser version, the four drift categories, `bind --update` reconciliation |
| [ADR-0011](../../architecture/decisions/adr-0011-okf-artefact-frontmatter-baseline.md) | OKF-superset frontmatter baseline every generated artefact must carry |
| [ADR-0012](../../architecture/decisions/adr-0012-schema-migration-framework.md) | Migration deferred: hand-rolled `PRAGMA user_version` for v1, `clew migrate` reserved |
| [ADR-0013](../../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) | Minimal model / perfect sync; the integrity boundary (write-time store vs check-time prose); C4.3/C4.4/estimate descoped |
| [ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md) | Edge property bag (`validation_status`/`confidence`/`rationale`/`source_doc`); **no LLM-inferred judgment in the integrity hot path** |
| [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) | Embedded `PRD-0001.US-NN` stories, parent-hash child exclusion, umbrella frontmatter, composite `id_sequences` key, `covers` edge |
| [`docs/domain/07b-models/artefact-store.md`](../../domain/07b-models/artefact-store.md) | Aggregates (`Artefact`, `Reference`, `FileBinding`, `IdSequence`), domain events, the DDL and ID-format rows — the PRD's data vocabulary |
| [`docs/domain/02c-glossary.md`](../../domain/02c-glossary.md) | Ubiquitous language. Use these terms verbatim; do not coin synonyms |
| [`docs/domain/02b-bounded-contexts.md`](../../domain/02b-bounded-contexts.md) | BC-01 Artefact Store as the Open Host Service; CLI is the only writer |
| [`docs/metamodel/relationships.md`](../../metamodel/relationships.md) | Verb catalogue + directions (⚠ = pre-ratification, OI-0074) |
| [`docs/metamodel/packages/product-specs.md`](../../metamodel/packages/product-specs.md) | The `prd` / `user_story` / `use_case` type rows: ID formats, layouts, canonical paths |

## Required reading — Tier 3: context (skim; source of *why*)

| File | Use |
|---|---|
| [`01a-personas.md`](../../business/01a-personas.md) | P-01 Ava — goals, frustrations (ordered), System Needs. Story `As a…` framing comes from here. P-03 Arno is **not** in E-01 scope |
| [`03a-capability-map.md`](../../business/03a-capability-map.md) | C2.x / C4.x definitions and Differentiator ratings behind the 25 rows |
| [`04a-value-streams.md`](../../business/04a-value-streams.md) | VS-1.4 (Critical) and VS-3.3 exit criteria — note VS-3.3's atomicity wording is the subject of OI-0084 below |
| [`02a-lean-canvas.md`](../../business/02a-lean-canvas.md) | UVP wording; the concrete wins the PRD ultimately serves |
| [`research-synthesis-2026-05-24-P-01-validation.md`](../../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) | Wave-1 evidence: F1 traceability gap, F2 determinism gap, the magic-wand quote. The only N=1 evidence base — do not over-claim beyond it |
| [`competitive-landscape-2026-07-21-clew-replacement-scan.md`](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | What competitors already do; keeps the PRD's differentiation honest |
| [`project-control/open-items/open-items.md`](../../../project-control/open-items/open-items.md) | The ledger. Read OI-0074/0076/0084/0085/0086 before drafting; sync any new items after |

## Deliberately out of scope — do not pull in

- **C4.3 audit trail (F01–F04)** and **C4.4 schema migration (F01–F03)** — ADR-0013-descoped; `clew log`/`history` resolve to git.
- **C3.2.F04 `clew estimate`** — cut; delivery accounting contradicts VISION.
- **E-02's read side** (`matrix`/`trace`/`impact`/`query`/`context`) — its own PRD. E-01 includes only `clew list` (C3.1.F02). The MVP thin cut *does* ship three E-02 views, but they are specified in E-02's PRD, not this one.
- **E-04 `clew guard`, E-05 layer packages / proposal review / cartography** — wave-2-gated.
- **`09a-quality-attributes.md`** — does not exist yet. Use OBJ-02's KR targets as the interim quality bar; do not invent QA-XXNN IDs.

---

## E-01 scope — the 25 rows, with the MVP cut marked

`◆` = in the v0.1 walking-skeleton thin cut (14 rows) · plain = Phase-1 completion (11 rows, correctness-hardening).

| ID | Functionality | Cut | Covered by |
|---|---|---|---|
| C2.1.F01 | ★ Project initialisation (`clew init`) | ◆ | UC-01 |
| C2.1.F02 | ★ Sequential ID assignment | ◆ | UC-01 |
| C2.1.F03 | LLM-ID rejection | | UC-01 (ext. 2c) |
| C2.1.F04 | Cross-project ID namespacing | | UC-01 |
| C2.2.F01 | ★ Required-field validation | ◆ | UC-01 (ext. 5a) |
| C2.2.F02 | Type validation | | UC-01 (ext. 5a) |
| C2.2.F03 | Constrained-value validation | | UC-01, UC-02 (ext. 6a) |
| C2.2.F04 | Actionable violation message | | UC-01, UC-02 |
| C2.3.F01 | ★ Location recording | ◆ | UC-01 |
| C2.3.F02 | Fingerprint tracking | ◆ | UC-03 |
| C2.3.F03 | Layout-rule enforcement | | UC-01 (ext. 4a) |
| C2.3.F04 | `clew where` | ◆ | UC-02 (step 2) |
| C2.4.F01 | ★ Snapshot export | ◆ | UC-05 |
| C2.4.F02 | Bit-identical determinism | ◆ | UC-05 (verification variant) |
| C2.4.F03 | Rebuild from snapshot | ◆ | UC-05 |
| C2.4.F04 | Incremental snapshot update | | UC-02 (step 7) |
| C3.1.F02 | `clew list <type>` | ◆ | UC-02 (ext. 2a), UC-04 (ext. 4a1) |
| C4.1.F01 | ★ Reference existence check | ◆ | UC-01 (ext. 6a), UC-04 (ext. 3a) |
| C4.1.F02 | ★ Reference-integrity on retire | ◆ | UC-02 (ext. 6b) |
| C4.1.F03 | Structured violation message | | UC-01, UC-04 |
| C4.2.F01 | ★ Drift scan (`clew check`) | ◆ | UC-03 |
| C4.2.F02 | Orphan section detection | | UC-03 (ext. 4b; home = OI-0076) |
| C4.2.F03 | Orphan record detection | | UC-03 |
| C5.4.F01 | Cross-type reference validation | ◆ | UC-04 (ext. 4b) |
| C5.4.F02 | Cross-methodology link resolution | | UC-04 |

**Story-shaping hint.** Do not write 25 stories. Group by goal — the use cases already are the natural grouping (persist / link / refactor-support / drift / rebuild), with the ★ differentiators as their own stories and the correctness-hardening rows folded into the story whose behaviour they harden. Mark each story's cut membership so the MVP is sliceable.

---

## Five decisions that must land during drafting

These are filed, open, and **block a lockable PRD** — each changes acceptance criteria, and OI-0084(b) would change E-01's scope.

| Item | Decision | Cascade if decided |
|---|---|---|
| **[OI-0084](../../../project-control/open-items/open-items.md)** (high) | Change-set atomicity: (a) sanction sequential per-write transactions with referentially-legal intermediate states and soften [VS-3.3](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity)'s "all-or-nothing" wording, or (b) add a `clew apply <changeset>` surface | (b) adds rows to E-01 and to the CLI contract; either way cascade into VS-3.3 + contract + [UC-02](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md)'s minimal guarantee |
| **[OI-0085](../../../project-control/open-items/open-items.md)** | Duplicate-edge semantics for `clew link`: idempotent no-op vs `duplicate-edge` error | Contract §2 Relationship group + §7; [UC-04](../use-cases/uc-04-link-artefacts-with-typed-relationship.md) ext. 5a |
| **[OI-0086](../../../project-control/open-items/open-items.md)** | Inconsistent-snapshot restore: fail atomically / import valid subset + report / repair path | Contract §Snapshot group + §7; [UC-05](../use-cases/uc-05-rebuild-store-from-snapshot.md) alternate paths |
| **Metamodel source of truth** | Machine-readable type registry for v1: hand-seeded `metamodel.yaml` (lean, recommended) vs store-backed export ([ADR-0008](../../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) chain) | E-03's scope; how `clew layout`/validation read type facts |
| **[OI-0074](../../../project-control/open-items/open-items.md)** (high) | Verb-set ratification (`ALLOWED_RELATIONSHIPS`) — and it must **confirm or amend** the recorded default that a direct `clew link` writes `validation_status = validated`, `confidence = stated` | Contract relationship table (drops ⚠), `artefact-store.md` §Relationship registry, [UC-04](../use-cases/uc-04-link-artefacts-with-typed-relationship.md) |

Ratification (OI-0074) may legitimately land with E-03 instead — but the PRD must then say so explicitly rather than assume the verb set.

---

## Authoring rules — the traps

1. **Cite, never restate.** Acceptance criteria reference contract anchors (e.g. "rejects per §7 `layout-violation`"). Restating signatures creates a second source of truth and guarantees drift.
2. **Story heading form is load-bearing:** `### PRD-0001.US-NN · <Title>` — the `·` separator, not a colon. [ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md)'s anchor derivation needs the `<ID> · <Title>` shape; a colon breaks the GFM autoanchor the binding records.
3. **Umbrella frontmatter:** one OKF block for the PRD; child stories carry no frontmatter of their own ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D3). Per-story `Status:` lines are the sanctioned kit-only degraded mode — the store supersedes them once it exists.
4. **`Covers: UC-NN`** on every story that exercises a use case; omit rather than invent.
5. **Path:** `docs/product-specs/prds/prd-0001-{slug}.md`. The skill's `scripts/get-next-id.py` reads `docs/product-specs/prds` with pattern `^prd-(\d{4})-`.
6. **Never hard-wrap prose** — one line per paragraph, table rows excepted.
7. **Glossary terms verbatim**; new terms get a GT-NN entry, not an ad-hoc synonym.
8. **No scope creep past the PRD's job:** no implementation design (that is `plan-implementation`), no scenarios duplicated from the use cases (link them), no estimates or priorities beyond what the roadmap already fixed.
9. **File new open items to the ledger** (`util-open-items`), and remember `var/` is gitignored — never `git add var/`.
10. **Commit scope** is a capability/product slug, never a plan number; put references in a `Refs:` trailer.

---

## Definition of done

- [ ] PRD at `docs/product-specs/prds/prd-0001-{slug}.md` with conformant OKF frontmatter; §0 traces E-01, P-01, the C-N.M capabilities, and UC-01–UC-05.
- [ ] Every one of the 25 FBS rows is covered by exactly one story, cut membership marked; no descoped row has crept in.
- [ ] Each story: `### PRD-0001.US-NN · Title`, `Covers:` where applicable, acceptance criteria citing contract sections, and at least one **rejection-path** criterion drawn from a use-case extension.
- [ ] Acceptance criteria are measurable against OBJ-01/OBJ-02 KRs where the KR applies (< 5 min first artefact, 100% write-time store integrity, deterministic replay).
- [ ] The five decisions above are either decided-and-recorded (with cascades applied) or explicitly deferred with the deferral stated in the PRD.
- [ ] Ledger synced: new items filed, resolved items closed with tracker refs.
- [ ] `util-metamodel-audit` (full) clean for the new file; report under `var/reports/metamodel-audit/`.
- [ ] Peer-review or grill pass before flipping `status: draft` → `active`.

---

## Provenance

Assembled 2026-07-25 from the working session that produced the delivery roadmap (merge `3d9a430`), the CLI-contract pre-PRD sync (`70718e7`), and use cases UC-01–UC-05 (`658e15a`…`f99e7aa`). Session records for the decisions behind ADR-0014–0017 live in the gitignored `var/reports/grill-me/` on the author's machine — the ADRs themselves are the durable record.
