---
type: Product Requirements Document
title: "PRD-0001 — Trustworthy Artefact Persistence"
description: "Feature spec for E-01: clew's write path — system-issued identifiers, write-time schema and reference validation, file bindings with drift detection, and a deterministic snapshot the store rebuilds from. Eleven embedded user stories covering all 25 E-01 FBS functionalities."
tags: [product-specs, prd, persistence, integrity]
timestamp: 2026-07-26T08:09:25Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-26
review_interval: 30d
---

<!-- doc-version: 1.0 | created: 2026-07-26 -->

# PRD-0001 — Trustworthy Artefact Persistence

**Status:** draft

This PRD specifies [E-01 · Trustworthy Artefact Persistence](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence) — clew's write path and the walking-skeleton core of v0.1. It is also the first artefact authored under the [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) multi-artefact file contract: the eleven `PRD-0001.US-NN` stories below are bound `user_story` children of this file, not prose sections.

**Reading contract.** Acceptance criteria **cite** the [CLI contract](../../architecture/interfaces/cli-clew.md) by section; they never restate command signatures, output shapes, or error categories. Behavioural scenarios live in the [use cases](../use-cases/) and are referenced through each story's `Covers:` field, never duplicated here. Where a criterion says "per §7 `unknown-id`", the contract is authoritative and this PRD follows it.

---

## §0 · Architecture Traceability

**PRD-ID:** PRD-0001
**Status:** draft

| Field | Value |
|---|---|
| **Vision** | [clew — Product Architecture Management](../../VISION.md) — *"the product-intent contract an agent must satisfy before it changes code"* |
| **Epic specified** | [E-01 · Trustworthy Artefact Persistence](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence) (`SPECIFIES epic → prd`, 1:1) |
| **Personas served** | [P-01 · Ava, the agent-first product engineer](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) — sole persona in scope. [P-03 Arno](../../business/01a-personas.md#p-03--arno-the-ai-augmented-architect-builder) inherits the core unchanged and is **not** specified here |
| **Capabilities covered** | [C2.1 Stable identifier generation](../../business/03a-capability-map.md#c21--stable-identifier-generation) · [C2.2 Schema enforcement](../../business/03a-capability-map.md#c22--schema-enforcement) · [C2.3 File binding management](../../business/03a-capability-map.md#c23--file-binding-management) · [C2.4 Deterministic structural export](../../business/03a-capability-map.md#c24--deterministic-structural-export) · [C4.1 Write-time reference validation](../../business/03a-capability-map.md#c41--write-time-reference-validation) · [C4.2 Drift detection](../../business/03a-capability-map.md#c42--drift-detection) · [C5.4 Cross-methodology referencing](../../business/03a-capability-map.md#c54--cross-methodology-referencing) · [C3.1](../../business/03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface) (F02 only) |
| **Primary value stream** | [VS-1.4 · Persist with Stable ID](../../business/04a-value-streams.md#vs-14--persist-with-stable-id) — Pain: **Critical** — plus [VS-3.3 Execute Change with Integrity](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity) (High) and [VS-2.4](../../business/04a-value-streams.md#vs-24--validate-against-current-state) / [VS-4.1](../../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current) |
| **Objective** | [OBJ-02 · The architectural substrate is trustworthy enough that agents depend on it](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it) (primary — KR-02.1–02.4) · [OBJ-01](../../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (KR-01.1) |
| **Use cases delivered** | [UC-01 Persist with write-time integrity](../use-cases/uc-01-persist-artefact-with-write-time-integrity.md) · [UC-02 Refactor with foreseen impact](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md) (execution half; the impact preview is E-02) · [UC-03 Detect and reconcile drift](../use-cases/uc-03-detect-and-reconcile-drift.md) · [UC-04 Link with a typed relationship](../use-cases/uc-04-link-artefacts-with-typed-relationship.md) · [UC-05 Rebuild from snapshot](../use-cases/uc-05-rebuild-store-from-snapshot.md) |
| **Interface contract** | [cli-clew.md](../../architecture/interfaces/cli-clew.md) — the authoritative command, output, and error contract this PRD cites throughout |
| **Domain model** | [BC-01 Artefact Store](../../domain/07b-models/artefact-store.md) — aggregates `Artefact`, `Reference`, `FileBinding`, `IdSequence`; vocabulary per [the glossary](../../domain/02c-glossary.md) |
| **Quality attributes** | *(none — `09a-quality-attributes.md` does not exist yet. OBJ-02's KR targets are the interim quality bar; no `QA-XXNN` IDs are invented here.)* |

### FBS functionalities delivered by this PRD

All 25 E-01 rows, each covered by exactly one story. `◆` = v0.1 walking-skeleton thin cut (14 rows) · plain = Phase-1 completion (11 rows, correctness-hardening).

| FBS ID | Functionality | Cut | Story | Status before | Status after |
|---|---|---|---|---|---|
| C2.1.F01 | ★ Project initialisation (`clew init`) | ◆ | [US-01](#prd-0001us-01--initialise-an-artefact-store-in-a-repo) | ⬜ | 🔄 |
| C2.1.F02 | ★ Sequential ID assignment | ◆ | [US-02](#prd-0001us-02--mint-a-system-issued-stable-identifier) | ⬜ | 🔄 |
| C2.1.F03 | LLM-ID rejection | | [US-02](#prd-0001us-02--mint-a-system-issued-stable-identifier) | ⬜ | 🔄 |
| C2.1.F04 | Cross-project ID namespacing | | [US-02](#prd-0001us-02--mint-a-system-issued-stable-identifier) | ⬜ | 🔄 |
| C2.2.F01 | ★ Required-field validation | ◆ | [US-03](#prd-0001us-03--reject-a-schema-violating-write-with-an-actionable-message) | ⬜ | 🔄 |
| C2.2.F02 | Type validation | | [US-03](#prd-0001us-03--reject-a-schema-violating-write-with-an-actionable-message) | ⬜ | 🔄 |
| C2.2.F03 | Constrained-value validation | | [US-03](#prd-0001us-03--reject-a-schema-violating-write-with-an-actionable-message) | ⬜ | 🔄 |
| C2.2.F04 | Actionable violation message | | [US-03](#prd-0001us-03--reject-a-schema-violating-write-with-an-actionable-message) | ⬜ | 🔄 |
| C2.3.F01 | ★ Location recording | ◆ | [US-04](#prd-0001us-04--record-where-the-artefact-lives-and-refuse-the-wrong-place) | ⬜ | 🔄 |
| C2.3.F03 | Layout-rule enforcement | | [US-04](#prd-0001us-04--record-where-the-artefact-lives-and-refuse-the-wrong-place) | ⬜ | 🔄 |
| C2.3.F04 | `clew where` | ◆ | [US-05](#prd-0001us-05--resolve-an-identifier-to-its-location-and-enumerate-a-type) | ⬜ | 🔄 |
| C3.1.F02 | `clew list <type>` | ◆ | [US-05](#prd-0001us-05--resolve-an-identifier-to-its-location-and-enumerate-a-type) | ⬜ | 🔄 |
| C4.1.F01 | ★ Reference existence check | ◆ | [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle) | ⬜ | 🔄 |
| C4.1.F03 | Structured violation message | | [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle) | ⬜ | 🔄 |
| C5.4.F01 | Cross-type reference validation | ◆ | [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle) | ⬜ | 🔄 |
| C5.4.F02 | Cross-methodology link resolution | | [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle) | ⬜ | 🔄 |
| C4.1.F02 | ★ Reference-integrity on retire | ◆ | [US-07](#prd-0001us-07--refuse-a-retire-that-would-strand-references) | ⬜ | 🔄 |
| C2.3.F02 | Fingerprint tracking | ◆ | [US-08](#prd-0001us-08--detect-drift-between-store-and-prose-by-section-fingerprint) | ⬜ | 🔄 |
| C4.2.F01 | ★ Drift scan (`clew check`) | ◆ | [US-08](#prd-0001us-08--detect-drift-between-store-and-prose-by-section-fingerprint) | ⬜ | 🔄 |
| C4.2.F02 | Orphan section detection | | [US-09](#prd-0001us-09--surface-artefacts-and-sections-that-lost-their-counterpart) | ⬜ | 🔄 |
| C4.2.F03 | Orphan record detection | | [US-09](#prd-0001us-09--surface-artefacts-and-sections-that-lost-their-counterpart) | ⬜ | 🔄 |
| C2.4.F01 | ★ Snapshot export (`clew export`) | ◆ | [US-10](#prd-0001us-10--export-a-deterministic-git-diffable-snapshot) | ⬜ | 🔄 |
| C2.4.F02 | Bit-identical determinism | ◆ | [US-10](#prd-0001us-10--export-a-deterministic-git-diffable-snapshot) | ⬜ | 🔄 |
| C2.4.F04 | Incremental snapshot update | | [US-10](#prd-0001us-10--export-a-deterministic-git-diffable-snapshot) | ⬜ | 🔄 |
| C2.4.F03 | ★ Rebuild from snapshot (`clew import`) | ◆ | [US-11](#prd-0001us-11--rebuild-the-store-from-the-snapshot-on-any-machine) | ⬜ | 🔄 |

**Coverage check:** 25 rows · 25 story assignments · no row assigned twice · no descoped row present. The eight write-side ★ differentiators (C2.1.F01/F02, C2.2.F01, C2.3.F01, C2.4.F01, C4.1.F01/F02, C4.2.F01) each anchor a story rather than riding along in one.

---

## 1 · Problem Statement

[P-01 Ava](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) authors product thinking through agents, many times per working session. The agent writes prose fluently and holds structure badly: it renumbers items while editing an artefact, paraphrases canonical identifiers instead of reusing them, and links to artefacts that do not exist. Nothing in a markdown repo refuses any of it, so a broken reference is not an error — it is a sentence that reads fine. Ava's top three frustrations are exactly this failure in three forms: no traceability that comes from the documents themselves, no confidence in integrity when relying on the LLM, and a rename whose blast radius surfaces as dead links weeks later ([wave-1 synthesis](../../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md), N=1, founder-as-instance).

The cost compounds silently and is measured in this very repo: the C3.3 capability retirement left orphan references that survived **two months and two repair passes** ([OI-0073](../../../project-control/open-items/open-items.md) is still open). That is the baseline — weeks of detection latency on a change the author made deliberately and thought they had propagated. Every session that starts on a substrate whose coherence is unverifiable spends its first minutes re-deriving context, and every session that ends without verification adds to the rot.

Without E-01 there is no substrate at all: nothing queries a store that does not exist, and nothing enforces a schema that is not registered. This PRD is the write path — the point at which *agents write prose, only clew creates facts* stops being a slogan and becomes a refusal.

---

## 2 · Goals

1. **Reference integrity between artefact records is 100% at write time, not aspirationally.** A dangling or type-invalid reference is never representable in the store — not on success, not transiently mid-refactor, not through a snapshot restore ([KR-02.1](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it), store-side). Success = the store-side query finds zero broken references on every commit.
2. **Collapse detection latency from weeks to the moment of introduction.** Store-side violations are refused at the write that would introduce them (KR-02.2 = 100%, KR-02.3 median < 1 minute); prose↔store divergence — a distinct, check-time guarantee — is surfaced by a single scan whose findings are classified, located, and actionable.
3. **Reduce [VS-1.4 Persist with Stable ID](../../business/04a-value-streams.md#vs-14--persist-with-stable-id) from a Critical-pain manual step to a sub-5-minute path from blank repo to first persisted artefact** ([KR-01.1](../../business/04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed): ~30 min → < 5 min), measured across three fresh-project trials.
4. **The same input produces the same persisted record, and the same store produces the same bytes.** Export is bit-identical across runs and machines, so a snapshot diff in code review is a real change and never noise ([KR-02.4](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it): 100% on a representative set).
5. **A lost database is an inconvenience, not an incident.** The store rebuilds from the git-tracked snapshot with identical business identifiers, relationships, and bindings — the property that lets the database be gitignored at all ([ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md)).

---

## 3 · Non-Goals

1. **No read-side traceability views.** `clew matrix`, `clew trace`, `clew impact`, `clew query`, and `clew context` belong to [E-02](../../plans/delivery-roadmap.md#e-02--deterministic-architecture-answers) and its own PRD. E-01 ships exactly one query surface — `clew list <type>` (C3.1.F02) — plus `clew where`. The v0.1 walking skeleton *does* ship three E-02 views; they are specified there, not here. **Consequence for [UC-02](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md):** this PRD covers the refactor's *execution* half (steps 5–8 and their rejection paths); the impact preview that gates it (step 3) is E-02's.
2. **No audit trail and no migration framework.** C4.3.F01–F04 are delegated to git on `snapshot/`, and C4.4.F01–F03 are deferred to a hand-rolled `PRAGMA user_version` path ([ADR-0012](../../architecture/decisions/adr-0012-schema-migration-framework.md), [ADR-0013](../../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)). `clew log` / `clew history` resolve to git; `clew migrate` stays a reserved surface. A DB-resident audit trail would be non-durable across the rebuild this PRD is built around.
3. **No delivery accounting.** C3.2.F04 (`clew estimate`) is cut and the `complexity` field with it. Effort rollups, sprint state, and ticket lifecycle contradict [VISION](../../VISION.md)'s NOT-list; clew manages *what must be true*, not *what's in progress*.
4. **No change-guardrail and no layer packages.** C1.2.F04 (`clew guard`) is [E-04](../../plans/delivery-roadmap.md#e-04--change-guardrail) and wave-2-gated — guarding a sparse graph produces confidently-wrong guardrails, worse than none. Layer-package enablement, agent-proposed-edge review (`clew link --propose`, `clew review`), and cartography export are [E-05](../../plans/delivery-roadmap.md#e-05--opt-in-layer-packages), also gated.
5. **No write-time guarantee across the markdown boundary.** Reference integrity between artefact records is enforced at write; prose↔store agreement is a check-time guarantee, because the narrative is authored as a separate step after the identifier is minted ([§5 integrity boundary](../../architecture/interfaces/cli-clew.md#5-output-contract), [ADR-0013](../../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)). This PRD must not be written as though it closes that gap — US-08 and US-09 make the gap *visible*, which is the honest guarantee.
6. **No markdown authoring or rewriting.** No command in this PRD writes or modifies a markdown file. The narrative is Ava's and her agent's to write; clew records where it lives and whether it still matches.

---

## 4 · User Stories

Eleven stories, grouped by goal rather than by FBS row. Each carries its FBS refs, its cut membership, and a `Covers:` field naming the use case whose scenario grounds its criteria. Every story asserts at least one **rejection path** drawn from a use-case extension — the refusals are the product.

**Cut key:** `◆ MVP` = every row in the v0.1 thin cut · `◆ MVP + Phase 1` = mixed (thin-cut rows ship in v0.1, the rest harden in Phase 1) · `Phase 1` = correctness-hardening only.

---

### PRD-0001.US-01 · Initialise an artefact store in a repo

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-01 · UC-05
**FBS refs:** C2.1.F01 ★
**Cut:** ◆ MVP

**Description:**
As an agent-first product engineer (P-01), I want to bootstrap an artefact store in a repo in one command, so that the very first artefact I mint gets a system-issued identifier instead of one the agent invented — and so that a fresh clone has somewhere to restore into.

**Acceptance Criteria:**

- [ ] Initialisation creates the store, the identifier sequences, and the snapshot directory at the locations fixed by [§1 conventions](../../architecture/interfaces/cli-clew.md#1-overview) and [§2 Bootstrap group](../../architecture/interfaces/cli-clew.md#bootstrap-group--clew-init); the repo root is resolved from git, not from the working directory.
- [ ] Sequences are seeded with one row per registered artefact type at `parent_business_id = ''`; parent-scoped rows for `inherits-from-parent` types are **not** pre-seeded and are created lazily on the first child mint for a given parent ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D4, [§2 Bootstrap group](../../architecture/interfaces/cli-clew.md#bootstrap-group--clew-init)).
- [ ] **Rejection path (UC-01 ext. 2a inverse):** initialising over an existing store exits `1` with `already-initialised` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) — a deliberate wrong-repo guard, **not** an idempotent no-op. The existing store is untouched.
- [ ] The documented recovery from an intact snapshot is the forced re-initialise plus restore pair ([§2 Bootstrap group](../../architecture/interfaces/cli-clew.md#bootstrap-group--clew-init), [UC-05 alternate paths](../use-cases/uc-05-rebuild-store-from-snapshot.md)); forcing drops the store but leaves snapshot files untouched.
- [ ] **Rejection path (UC-01 ext. 2a):** every other command run before initialisation exits `1` with `not-initialised` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract), naming initialisation as the resolution — the agent can self-correct without asking Ava.
- [ ] stdout is empty; the summary goes to stderr, per [§5 per-command output shapes](../../architecture/interfaces/cli-clew.md#5-output-contract).
- [ ] **KR-01.1 gate:** initialisation plus the first persona mint completes in **under 5 minutes** from a blank repo, measured across three fresh-project trials.

---

### PRD-0001.US-02 · Mint a system-issued stable identifier

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-01
**FBS refs:** C2.1.F02 ★ · C2.1.F03 · C2.1.F04
**Cut:** ◆ MVP (C2.1.F02) + Phase 1 (C2.1.F03, C2.1.F04)

**Description:**
As an agent-first product engineer (P-01), I want every artefact's identifier issued by the system from a managed sequence — and any caller-supplied identifier refused — so that the agent can never renumber, paraphrase, or invent an identifier that other artefacts already reference.

**Acceptance Criteria:**

- [ ] A successful creation prints exactly the minted business ID on stdout and nothing else, in the type's declared format ([§5 per-command output shapes](../../architecture/interfaces/cli-clew.md#5-output-contract), [§2 Creation group](../../architecture/interfaces/cli-clew.md#creation-group--clew-new)).
- [ ] Identifiers are drawn from the type's system-managed sequence and are **never reused**, including after the artefact is retired — a reference written before a retire never silently changes meaning ([UC-01 success guarantees](../use-cases/uc-01-persist-artefact-with-write-time-integrity.md#guarantees)).
- [ ] Parent-scoped types mint from the composite `(artefact_type, parent_business_id)` sequence so numbering restarts per parent ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D4); the sequence row is created lazily on the first child mint, with no separate setup step.
- [ ] **Rejection path (UC-01 ext. 7a):** a child mint whose declared parent is absent or of the wrong type is refused; no identifier is consumed and no partial record survives.
- [ ] **Rejection path (UC-01 ext. 2c) — C2.1.F03:** a submission that supplies a pre-chosen identifier is refused rather than honoured. Identifiers are system-issued only; the rejection states this so the agent resubmits without one.
- [ ] **C2.1.F04:** identifier uniqueness holds within a project scope — two sibling repos may each hold `P-01` with no collision and no shared state between them; the store is resolved per repo root ([§1](../../architecture/interfaces/cli-clew.md#1-overview)).
- [ ] **Atomicity (UC-01 ext. 8a, KR-02.4):** on any rejection or internal error, no identifier has been consumed and the store is byte-identical to its pre-invocation state ([§5 Atomicity](../../architecture/interfaces/cli-clew.md#5-output-contract)). Re-running the same rejected input yields the same identifier the first successful run would have.
- [ ] **Concurrency (UC-01 ext. 3a):** a competing writer causes the invocation to *wait* within the bounded busy-timeout and then proceed, not to fail; the pre-read and increment happen inside one write transaction, so no two artefacts of a type ever receive the same number ([§4 transaction ordering](../../architecture/interfaces/cli-clew.md#4-validation-rules), [ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md)).

---

### PRD-0001.US-03 · Reject a schema-violating write with an actionable message

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-01 · UC-02
**FBS refs:** C2.2.F01 ★ · C2.2.F02 · C2.2.F03 · C2.2.F04
**Cut:** ◆ MVP (C2.2.F01) + Phase 1 (C2.2.F02–F04)

**Description:**
As an agent-first product engineer (P-01), I want a write that breaks the type's schema refused with the field, the rule, and the acceptable values named, so that the agent repairs the draft itself instead of persisting a malformed record or asking me what went wrong.

**Acceptance Criteria:**

- [ ] **C2.2.F01:** a write missing a required field for its type is refused; the record is not created and no identifier is consumed.
- [ ] **C2.2.F02:** a write whose field value does not conform to the field's declared type is refused.
- [ ] **C2.2.F03:** a write whose field carries a value outside its declared constrained set is refused — including updates, where the settable fields and their allowed values are those fixed by [§2 Update group](../../architecture/interfaces/cli-clew.md#update-group--clew-set).
- [ ] **Rejection path (UC-01 ext. 5a, UC-02 ext. 6a) — C2.2.F04:** every schema rejection names the field, the rule broken, and the acceptable values, in the `Error: <category>: <message>` shape of [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) — e.g. the `unknown-field` category lists the settable fields for the type. A rejection that names only "invalid input" fails this criterion.
- [ ] Rejections go to **stderr** with exit `1`; stdout stays empty so the agent's parse of the structured channel is never polluted by an error ([§5 channels](../../architecture/interfaces/cli-clew.md#5-output-contract)).
- [ ] Type facts driving validation — required fields, declared types, constrained sets, `id_format`, `layout`, `default_path` — are read from the **hand-seeded `metamodel.yaml`** registry (see §6); a type absent from the registry is refused rather than accepted with no validation (UC-01 ext. 2b).
- [ ] **KR-02.2 / KR-02.3:** the violation surfaces at the moment of the attempted write, not at a later scan — detection latency is the invocation's own duration, well under the 1-minute median target.

---

### PRD-0001.US-04 · Record where the artefact lives, and refuse the wrong place

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-01
**FBS refs:** C2.3.F01 ★ · C2.3.F03
**Cut:** ◆ MVP (C2.3.F01) + Phase 1 (C2.3.F03)

**Description:**
As an agent-first product engineer (P-01), I want each persisted artefact bound to its precise location in the documentation layer, and a write into a non-canonical location refused, so that every fact is drillable to its narrative and the repo's layout cannot drift one file at a time.

**Acceptance Criteria:**

- [ ] **C2.3.F01:** a successful creation records a file binding — file path plus section anchor — for the artefact, with the content fingerprint pending its first scan ([ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md), [UC-01 success guarantees](../use-cases/uc-01-persist-artefact-with-write-time-integrity.md#guarantees)).
- [ ] The section anchor is derived as `<lowercase-id>--<slug>` from the artefact's `<ID> · <Title>` heading ([ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md)); anchor collisions between bound sections are structurally impossible because the anchor embeds the globally-unique business ID ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D6).
- [ ] Binding follows the type's layout category — `single-collection`, `one-per-artefact`, or `inherits-from-parent` — with the `--file` requirement and inheritance behaviour per [§4 layout enforcement](../../architecture/interfaces/cli-clew.md#4-validation-rules). A child type with no explicit file inherits its parent's path from the parent's binding.
- [ ] **Rejection path (UC-01 ext. 4a) — C2.3.F03:** a write whose target location does not match the type's canonical layout rule is refused with `layout-violation` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract), and the message names the **required** location, not merely that the given one is wrong.
- [ ] **Rejection path (UC-01 ext. 4b):** for a `one-per-artefact` type whose derived file already exists, the write is refused with `file-exists` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract); no identifier is consumed and the existing file is not touched.
- [ ] Layout conformance is enforced **at write time only** and is never reported as a drift category by the scan ([§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check)).
- [ ] No command in this story writes or modifies a markdown file; only the binding record is written.

---

### PRD-0001.US-05 · Resolve an identifier to its location, and enumerate a type

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-02 · UC-04
**FBS refs:** C2.3.F04 · C3.1.F02
**Cut:** ◆ MVP

**Description:**
As an agent-first product engineer (P-01), I want to resolve any identifier to its file and section and to list every artefact of a type, so that the agent can find the real target before a refactor instead of grepping for a name it half-remembers.

**Acceptance Criteria:**

- [ ] **C2.3.F04 (UC-02 step 2):** resolving an identifier prints one line of `<relative-path>#<section-anchor>` on stdout, per [§2](../../architecture/interfaces/cli-clew.md#clew-where-id) and [§5](../../architecture/interfaces/cli-clew.md#5-output-contract).
- [ ] **Rejection path:** an artefact with no file binding exits `1` with `no-binding` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract), stdout empty, and the message names the paths to a binding (create with a file, or adopt an existing markdown file).
- [ ] **C3.1.F02 (UC-02 ext. 2a, UC-04 ext. 3a1):** listing a type enumerates its artefacts with identifiers, names, and status; with no type argument it lists all artefacts ([§2 Query group](../../architecture/interfaces/cli-clew.md#clew-list-type)). This is the surface the agent uses to recover from a mistyped identifier without guessing.
- [ ] Table, CSV, and JSON output shapes conform to [§5](../../architecture/interfaces/cli-clew.md#5-output-contract); JSON is a flat array of one object per row, so the agent can pipe it without a parser of its own.
- [ ] **Determinism:** the same store state and the same invocation produce byte-identical stdout, with no locale-dependent number or date formatting ([§5 determinism guarantees](../../architecture/interfaces/cli-clew.md#5-output-contract)).
- [ ] stdout carries no colour escape codes regardless of TTY attachment ([§5 colour and TTY](../../architecture/interfaces/cli-clew.md#5-output-contract)) — a structured pipeline sees clean text.
- [ ] **Scope boundary:** this story ships `list` and `where` only. Matrix, lineage, impact, ad-hoc query, and context assembly are E-02 and must not appear here.

---

### PRD-0001.US-06 · Assert a typed relationship that cannot dangle

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-04 · UC-01
**FBS refs:** C4.1.F01 ★ · C4.1.F03 · C5.4.F01 · C5.4.F02
**Cut:** ◆ MVP (C4.1.F01, C5.4.F01) + Phase 1 (C4.1.F03, C5.4.F02)

**Description:**
As an agent-first product engineer (P-01), I want a relationship between two artefacts refused unless both endpoints exist and their types are allowed for the verb, so that the graph the agent builds is the graph I meant — and a link to something that does not exist stops being a sentence that reads fine.

**Acceptance Criteria:**

- [ ] **C4.1.F01 (UC-04 step 3, UC-01 step 6):** both endpoints are verified to exist before the edge is written; a reference to a non-existent identifier is refused with `unknown-id` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) (UC-01 ext. 6a, UC-04 ext. 3a).
- [ ] **C5.4.F01 (UC-01 ext. 6b, UC-04 ext. 4b):** the source and target types are checked against the allowed set for the verb; a type mismatch is refused with `type-constraint` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract), naming **expected vs actual** so Ava can decide whether the verb, the direction, or an endpoint is wrong.
- [ ] **Rejection path (UC-04 ext. 4a):** an unknown verb is refused with `unknown-relationship` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) and the message **lists the known verbs**. A new verb is a metamodel change routed through the [relationship catalogue](../../metamodel/relationships.md), never invented at link time; `REFERENCES` is the sanctioned escape hatch meanwhile.
- [ ] **Rejection path (UC-04 ext. 4c):** a verb whose cardinality is already saturated is refused with `cardinality-violation` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract), naming the existing edge — e.g. `SPECIFIES` is 1:1 and the epic already holds a PRD.
- [ ] **Duplicate edges are an idempotent no-op** (decides [OI-0085](../../../project-control/open-items/open-items.md), §8-D2): re-asserting an identical `(source, verb, target)` exits `0`, writes no second edge, and notes the no-op on stderr. Bulk wiring scripts and agent retries are therefore safe to re-run — P-01's "scriptable end-to-end" System Need. Cascade: contract [§2 Relationship group](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link) and [UC-04 ext. 5a](../use-cases/uc-04-link-artefacts-with-typed-relationship.md#extensions).
- [ ] **C4.1.F03:** every rejection in this story names the broken reference, the artefact that owns it, and the path to resolution — structured enough that the agent self-corrects without escalating to Ava.
- [ ] **C5.4.F02:** a reference resolves from any artefact type to any other by stable identifier in a single lookup across the full metamodel, with no per-methodology special-casing.
- [ ] A directly asserted edge is recorded as an **authored fact** — `validation_status = validated`, `confidence = stated` — with any rationale and source document captured in the property bag ([§2 Relationship group](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link), [ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)). See §8-D5 on the ratification status of this default.
- [ ] **Negative criterion (UC-04 ext. 5b, [ADR-0016](../../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md)):** no LLM-inferred edge enters the store as a fact in v1. There is **no** `--propose` flag and **no** review surface in E-01; an agent's unconfirmed inference stays in prose until Ava directs the link, at which point it is authored like any other.
- [ ] **Atomicity (UC-04 minimal guarantees):** on any rejection no edge is written — a dangling, type-invalid, or cardinality-breaking edge is never representable, not even transiently.

---

### PRD-0001.US-07 · Refuse a retire that would strand references

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-02
**FBS refs:** C4.1.F02 ★
**Cut:** ◆ MVP

**Description:**
As an agent-first product engineer (P-01), I want a retire refused while anything still references the artefact, with the full referencing set surfaced, so that a Friday-afternoon pivot cannot leave three downstream artefacts pointing at something that no longer means what they think.

**Acceptance Criteria:**

- [ ] **Rejection path (UC-02 ext. 6b) — C4.1.F02:** a retire or delete that would leave dangling references is refused; the store is unchanged and the artefact keeps its current status.
- [ ] The refusal **surfaces the full referencing set**, not just a count and not just the first offender — that list is exactly the work list the agent then works through.
- [ ] After every referencing artefact has been re-pointed or updated, the same retire succeeds with no other change to the request.
- [ ] Retiring never recycles the identifier: the retired business ID is not reissued to a later artefact of that type (UC-02 minimal guarantees; see also US-02).
- [ ] Status transitions use the values fixed by [§2 Update group](../../architecture/interfaces/cli-clew.md#update-group--clew-set); a value outside that set is refused per US-03's constrained-value criterion.
- [ ] **Change-set atomicity (decides [OI-0084](../../../project-control/open-items/open-items.md), §8-D1):** a multi-artefact refactor is a **sequence of per-invocation transactions**, each validated at write time. Every intermediate state is **referentially legal** — never dangling, never type-invalid — though it may be semantically incomplete. There is no all-or-nothing change-set surface in v1 and no `clew apply`.
- [ ] **Interruption (UC-02 ext. 7a):** an interrupted refactor leaves a legal-but-incomplete store, never a broken one. On resume the remaining delta is recomputable from current state, and no repair or rollback command is needed.
- [ ] Cascade recorded: [VS-3.3](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity)'s "all-or-nothing across all affected artefacts" exit criterion is softened to per-step legality; [UC-02's minimal guarantee](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md#guarantees) already encodes this baseline and needs no change.

---

### PRD-0001.US-08 · Detect drift between store and prose by section fingerprint

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-03
**FBS refs:** C2.3.F02 · C4.2.F01 ★
**Cut:** ◆ MVP

**Description:**
As an agent-first product engineer (P-01), I want one scan that tells me whether the prose still matches the facts — with every mismatch classified and located — so that "I have an answer" becomes "I trust this answer enough to act on it", and a hand-edit stops being invisible.

**Acceptance Criteria:**

- [ ] **C2.3.F02:** each bound section carries a content fingerprint — content hash, canonicaliser version, last-seen timestamp — populated on its first successful scan rather than reported as drift ([§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check), [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md)). A first run is a baseline, not a drift report.
- [ ] **C4.2.F01 (UC-03 step 3):** every finding is classified into **exactly one** of the four canonical categories — `file-missing`, `anchor-missing`, `content-drift`, `canonicaliser-changed` — with file and section detail ([§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check), [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md)). Nothing is reported as an unclassified "mismatch".
- [ ] **Umbrella files ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D2):** a parent binding's hash **excludes** every child-bound section. Editing one embedded story flags `content-drift` on that story **only** — never on its parent PRD. **This PRD is the test fixture**: it is a `prd` file with eleven bound `user_story` children, so one edit here must produce exactly one drift row.
- [ ] Binding or unbinding a child re-hashes the parent exactly once, because the parent's covered byte range changed ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D2 negative consequence).
- [ ] **The scan never modifies markdown** and never mutates store facts — detection is strictly read-only (UC-03 minimal guarantees, [§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check)).
- [ ] Reconciliation is a separate, deliberate act: re-hashing a binding accepts the new prose and refreshes the fingerprint triple, per-ID or in bulk after a canonicaliser bump ([§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check), UC-03 steps 5 and ext. 3d).
- [ ] **Negative criterion (UC-03 ext. 4a):** drift is never suppressed without an explicit acceptance. A finding left unreconciled **reappears on every subsequent run** — abandoning the sitting leaves the drift visible, not resolved. Nothing in this story silently re-hashes on the operator's behalf, because re-hashing over damage would launder it into accepted state.
- [ ] The scan exits non-zero when findings exist, so it works unattended as a CI gate; the triage verdicts stay human-owned (UC-03 variations).
- [ ] Scoping the scan to a single file yields the same classification over a smaller surface ([§Health group](../../architecture/interfaces/cli-clew.md#health-group--clew-check)).
- [ ] **KR-02.3:** a repo-wide scan surfaces drift introduced since the last run in **under 1 minute** on this repo's corpus — against a baseline of weeks.

---

### PRD-0001.US-09 · Surface artefacts and sections that lost their counterpart

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-03
**FBS refs:** C4.2.F02 · C4.2.F03
**Cut:** Phase 1

**Description:**
As an agent-first product engineer (P-01), I want registered artefacts with no narrative and ID-shaped headings with no record both surfaced, so that the two ways an artefact can half-exist stop hiding in the gap between the store and the prose.

**Acceptance Criteria:**

- [ ] **C4.2.F03 — orphan record:** a registered artefact with no corresponding documentation section is surfaced with its identifier and type. A fact with no narrative is a real gap, not a clean state.
- [ ] **Rejection path (UC-03 ext. 4b) — C4.2.F02, orphan section:** a documentation section whose heading carries an ID-shaped token the store does not recognise is surfaced with its file and heading. This is the hand-minted-identifier case: prose cannot create facts, so the heading is **reported and refused as a fact**, never adopted silently into the store.
- [ ] Neither check writes markdown, and neither deletes a store record to "match" the prose (UC-03 ext. 3c2).
- [ ] Orphan findings are **distinct from** the four drift categories of US-08 and never collapse into them — a `content-drift` row and an orphan row answer different questions.
- [ ] **Open — surfacing home ([OI-0076](../../../project-control/open-items/open-items.md), §8-D4):** whether the orphan-section check lives in the adoption report only or becomes a fifth scan category is **undecided and deliberately deferred**. This story specifies the *behaviour and output content*; the command that hosts it is settled when OI-0076 closes. Both rows are Phase-1, so the deferral does not block the v0.1 thin cut.
- [ ] The resolution for an orphan section is routed through the write path — the artefact is persisted (US-02) or the prose is corrected — never absorbed by re-hashing (UC-03 ext. 4b1).

---

### PRD-0001.US-10 · Export a deterministic, git-diffable snapshot

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-05 · UC-02
**FBS refs:** C2.4.F01 ★ · C2.4.F02 · C2.4.F04
**Cut:** ◆ MVP (C2.4.F01, C2.4.F02) + Phase 1 (C2.4.F04)

**Description:**
As an agent-first product engineer (P-01), I want the store serialised to a git-tracked snapshot whose bytes depend only on the store's state, so that a diff in code review is a real change and never noise — and so the database can be gitignored at all.

**Acceptance Criteria:**

- [ ] **C2.4.F01:** export writes one file per artefact type plus the sequence and binding files, into the snapshot directory, with every record expressed by **business ID** — surrogate keys never appear ([§Snapshot group](../../architecture/interfaces/cli-clew.md#clew-export)).
- [ ] **C2.4.F02 (KR-02.4):** the same store state produces **byte-identical** output across repeated runs **and across machines** ([§5 determinism guarantees](../../architecture/interfaces/cli-clew.md#5-output-contract), [C2.4](../../business/03a-capability-map.md#c24--deterministic-structural-export)). Record and key ordering are stable and independent of insertion order; no timestamps, hostnames, paths, or locale-dependent formatting leak into the bytes.
- [ ] **Verification variant (UC-05):** export → rebuild into a scratch store → re-export yields two byte-identical snapshots. This is how KR-02.4's determinism target is actually measured, and it belongs in the dogfood loop rather than in a recovery emergency.
- [ ] **Negative criterion — atomicity (UC-05 verification variant):** each file is written to a temp path and renamed into place; a partial snapshot **never** appears in the snapshot directory, even on interruption ([§5 Atomicity](../../architecture/interfaces/cli-clew.md#5-output-contract)). A half-written snapshot would be indistinguishable from an inconsistent one and would trip US-11's restore refusal on the next rebuild.
- [ ] stdout is empty; progress and the final summary go to stderr ([§5 per-command output shapes](../../architecture/interfaces/cli-clew.md#5-output-contract)).
- [ ] **C2.4.F04 (UC-02 step 7):** an incremental export re-writes only the artefact types touched by the last write. Its output is **byte-identical to what a full export would have produced** for those files, and untouched files are left with identical bytes — the incremental path must never become a second serialiser with its own drift.
- [ ] The snapshot is the durable, git-tracked structural truth; the database is gitignored and rebuildable ([ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md)). Git on the snapshot directory is also what supplies the who/when/before-after history this PRD does not build (§3-2).

---

### PRD-0001.US-11 · Rebuild the store from the snapshot on any machine

**Persona:** P-01 · Agent-first product engineer
**Status:** pending
**Covers:** UC-05
**FBS refs:** C2.4.F03 ★
**Cut:** ◆ MVP

**Description:**
As an agent-first product engineer (P-01), I want the store reconstructed from the git-tracked snapshot with identical business identifiers, relationships, and bindings, so that a fresh clone, a second machine, or a lost database is an inconvenience rather than an incident.

**Acceptance Criteria:**

- [ ] **C2.4.F03:** the restore follows the four-step contract of [§Snapshot group](../../architecture/interfaces/cli-clew.md#clew-import-snapshot) — records by business ID under fresh surrogate keys, references remapped, bindings remapped, sequences set from the snapshot.
- [ ] **Sequences come from the snapshot, not from the restored maximum.** The next mint continues the real series rather than reusing a number a retired artefact once held (UC-05 main scenario) — the property that makes US-02's never-reuse guarantee survive a rebuild.
- [ ] Post-restore, every business identifier, relationship, and file binding that existed at export time exists again; only the invisible surrogate keys differ.
- [ ] **Round-trip equivalence:** exporting the restored store yields bytes identical to the snapshot it was restored from (with US-10's determinism criterion, this is KR-02.4's measurement).
- [ ] The restore is **destructive** and overwrites the current store; the documented sequence when local state matters is export → forced re-initialise → restore ([§Snapshot group](../../architecture/interfaces/cli-clew.md#clew-import-snapshot), UC-05 alternate paths).
- [ ] **Rejection path — inconsistent snapshot (decides [OI-0086](../../../project-control/open-items/open-items.md), §8-D3):** the restore **validates the whole snapshot before writing anything** and, on any inconsistency, **fails atomically** with the offending records named — leaving the store exactly as it was. Detected inconsistencies include at minimum an edge whose endpoint record is absent and a duplicate business identifier. A partially-seeded store is never produced, and no graph that write-time validation would have refused is ever admitted through the restore path. Cascade: contract [§Snapshot group](../../architecture/interfaces/cli-clew.md#clew-import-snapshot) and [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) gain the failure category; [UC-05's alternate path](../use-cases/uc-05-rebuild-store-from-snapshot.md) is settled from undecided to fail-atomically.
- [ ] **Negative criterion:** the restore never repairs, never drops, and never partially imports. Repair is a git operation on the snapshot, followed by a retry — this keeps [KR-02.1](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it)'s 100% claim closed at the back door.
- [ ] **Rejection path (UC-05 alternate):** restoring with no store initialised exits `1` with `not-initialised` per [§7](../../architecture/interfaces/cli-clew.md#7-error-contract); initialising first is sufficient, since the restore sets the sequences itself.
- [ ] **Snapshot older than the markdown (UC-05 alternate):** the restore succeeds and the gap surfaces as drift on the next scan (US-08), where it is triaged as structural intent to re-apply through the write path — never absorbed by re-hashing.

---

## 5 · Design Considerations

The delivered surface is a CLI and nothing else — no GUI, no daemon, no web view. [BC-01 Artefact Store](../../domain/02b-bounded-contexts.md#bc-01--artefact-store) exposes it as the Open Host Service and the CLI is its **only writer** ([ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md), single-writer per repo).

The interaction design constraint that matters is that **the primary caller is an agent, not a human at a prompt**. That drives three properties already fixed by [§5 of the contract](../../architecture/interfaces/cli-clew.md#5-output-contract) and asserted across the stories above: stdout carries the structured result only, stderr carries everything human-readable, and stdout never carries colour. Every command completes without an interactive confirmation step — P-01's "scriptable end-to-end" System Need — which is why the destructive operations (forced re-initialise, restore) are guarded by explicit flags rather than by prompts.

The error catalogue is the primary user interface of this PRD. Ava rarely reads a success; she reads refusals, and so does her agent. A rejection is well-designed when the agent can self-correct from it alone: the category identifies the rule, the message names the offending value, and the detail line names the resolution.

Rendered artefacts, cartography views, and any read-side presentation are out of scope (§3-1, §3-4).

---

## 6 · Technical Considerations

- **Storage and concurrency.** SQLite in WAL mode; the second writer waits within a bounded busy-timeout rather than failing ([ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md), [§1](../../architecture/interfaces/cli-clew.md#1-overview)). The database is gitignored and rebuildable — US-11 is what licenses that choice.
- **Schema.** The no-DDL 4-table typed property graph ([ADR-0003](../../architecture/decisions/adr-0003-schema-design-typed-property-graph.md)), amended by [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D4's composite `id_sequences` key. Adding an artefact type requires no migration, which is the premise behind deferring the migration framework (§3-2).
- **Implementation stack.** Python + Typer ([ADR-0004](../../architecture/decisions/adr-0004-python-typer-duckdb-implementation-stack.md) — note the stable filename: the storage engine is WAL SQLite per ADR-0001, superseding that ADR's DuckDB reference).
- **Type-fact source (decided — §8-D5).** Validation and layout enforcement read type facts from a **hand-seeded, git-tracked `metamodel.yaml`**, mirroring the shape of the kit's existing `artefact-types-registry.yaml`. This avoids the bootstrap paradox of a store that must be seeded with its own metamodel before it can validate anything, and it ships in v0.1. The store-backed export path of the [ADR-0008](../../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) chain remains the intended end state and is [E-03](../../plans/delivery-roadmap.md#e-03--core-methodology-schema-coverage)'s decision to execute; until it lands, the two registries are kept in sync by hand and that sync cost is accepted.
- **Hashing and canonicalisation.** Per-section SHA-256 over canonicalised content with a recorded canonicaliser version ([ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md)). The child-exclusion rule ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D2) makes a parent's hashed span non-contiguous — the extent computation must subtract every child-bound sub-range and stay deterministic across canonicaliser runs, which is the one genuinely fiddly piece of US-08.
- **Frontmatter.** Every generated artefact carries the OKF-superset baseline ([ADR-0011](../../architecture/decisions/adr-0011-okf-artefact-frontmatter-baseline.md)); mixed files carry **one** block describing the file's primary artefact, and per-artefact lifecycle status lives in the store ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D3). The per-story `Status:` lines in §4 are the sanctioned kit-only degraded mode and are superseded by the store once it exists.
- **Performance context.** Ava runs these commands inside an agent session many times per sitting; every interaction must return fast enough not to break flow (P-01 §System Needs). The scan is the only command whose cost scales with corpus size, and KR-02.3's sub-minute target is its bar.
- **Local-first, no network.** No login, no external service, no telemetry — the repo is the source of truth. This is both a persona requirement and a unit-economics property: a context fetch is a file read, not a metered API roundtrip.

---

## 7 · Success Metrics

E-01 is measured against the [OBJ-01/OBJ-02](../../business/04b-objectives.md) KRs; no new metrics are invented here. Measurement runs on this repo as the dogfood corpus.

### 7.1 Leading indicators

| Metric | Baseline | Success | Stretch | Method | Window |
|---|---|---|---|---|---|
| Time from blank repo to first artefact persisted with a stable ID (**KR-01.1**) | ~30 min, markdown-only | < 5 min | < 2 min | Manual timing, 3 fresh-project trials | At v0.1 |
| Store-side reference integrity (**KR-02.1**) | undefined (no automated check) | **100%** — zero broken references on every commit | — | Single store query per commit | Continuous from v0.1 |
| Violations surfacing at introduction rather than later (**KR-02.2**) | 0% (all drift silent) | 100% for store-side violations | — | Per-violation detection-time vs introduction-time | Monthly |
| Median time from a breaking change to detection (**KR-02.3**) | weeks | < 1 min | seconds (write-time refusal) | Logged on every integrity failure | Monthly |
| Deterministic replay (**KR-02.4**) | undefined | 100% on a representative set | — | Export → rebuild → re-export byte comparison (US-10); replay 20 known inputs and diff | Each release |

### 7.2 Lagging indicators

| Metric | Baseline | Success | Method | Window |
|---|---|---|---|---|
| "I trust the architecture to be current" (**KR-01.4**, partial — E-01 supplies the write-side and drift half) | undefined | ≥ 4 / 5 | Structured interview question | After 4 weeks of use |
| Orphan references surviving a deliberate refactor | 2 months, 2 repair passes (the C3.3 retirement, [OI-0073](../../../project-control/open-items/open-items.md)) | 0 surviving past the sitting | Re-run the scan after each refactor | Per refactor |
| Sessions completing without manually re-deriving lost context (**KR-01.2**, partial) | undefined | ≥ 80% | Self-reported, sampled weekly | 4 weeks |

### 7.3 Measurement honesty

KR-01.1 and KR-02.3 are timed by the author on the author's repo — **N=1, founder-as-instance**, the only evidence base wave 1 produced. They are honest measurements of whether the mechanism works and dishonest as evidence that the *pain* generalises; that question belongs to [OBJ-03](../../business/04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)'s wave-2 interviews and gates E-04/E-05, not E-01. KR-02.1's 100% quantifies over the artefact types registered at the time of measurement; [E-03](../../plans/delivery-roadmap.md#e-03--core-methodology-schema-coverage) widens that set without changing the target.

---

## 8 · Open Questions

### Decisions taken during drafting

Four of the five decisions the [authoring handoff](prd-0001-trustworthy-artefact-persistence/handoff.md) flagged as blocking are **decided here**; the fifth is explicitly deferred. Each decision's cascade is listed so the downstream edits can be executed as one pass.

- **D1 · Change-set atomicity — decided: sequential per-write transactions ([OI-0084](../../../project-control/open-items/open-items.md), option (a)).** A multi-artefact refactor is a sequence of validated writes whose intermediate states are referentially legal but may be semantically incomplete. No `clew apply <changeset>` surface in v1. *Rationale:* option (b) would add rows to an epic already at the 25-row upper bound, forcing a split of a trust boundary that only works whole — and the per-step guarantee already delivers the property that matters, which is that no intermediate state is ever *broken*. *Asserted by:* [US-07](#prd-0001us-07--refuse-a-retire-that-would-strand-references). *Cascade:* soften [VS-3.3](../../business/04a-value-streams.md#vs-33--execute-change-with-integrity)'s "all-or-nothing" exit criterion to per-step legality; [UC-02's minimal guarantee](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md#guarantees) already matches and needs no edit; CLI contract needs no new surface.
- **D2 · Duplicate-edge semantics — decided: idempotent no-op ([OI-0085](../../../project-control/open-items/open-items.md)).** Re-asserting an identical edge exits `0` and writes nothing. *Rationale:* the graph end-state is identical either way, so the tiebreaker is which exit signal serves the caller — and the caller is an agent re-running a bulk wiring script. *Asserted by:* [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle). *Cascade:* CLI contract [§2 Relationship group](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link) states the no-op (no new §7 category needed); [UC-04 ext. 5a](../use-cases/uc-04-link-artefacts-with-typed-relationship.md#extensions) resolves from open to no-op.
- **D3 · Inconsistent-snapshot restore — decided: fail atomically, offenders named ([OI-0086](../../../project-control/open-items/open-items.md)).** Validate the whole snapshot before writing; abort intact on any inconsistency. *Rationale:* a partial import seeds a graph that write-time validation would have refused, which breaks KR-02.1's 100% claim through the back door — and the report-and-continue variant only holds if the operator reads the report. Repair is a git operation. *Asserted by:* [US-11](#prd-0001us-11--rebuild-the-store-from-the-snapshot-on-any-machine). *Cascade:* CLI contract [§Snapshot group](../../architecture/interfaces/cli-clew.md#clew-import-snapshot) + [§7](../../architecture/interfaces/cli-clew.md#7-error-contract) gain the failure category; [UC-05's alternate path](../use-cases/uc-05-rebuild-store-from-snapshot.md) resolves.
- **D4 · Orphan-in-file surfacing home — deferred ([OI-0076](../../../project-control/open-items/open-items.md)).** [US-09](#prd-0001us-09--surface-artefacts-and-sections-that-lost-their-counterpart) specifies the *behaviour and output content* of both orphan checks; whether the orphan-section check is hosted by the adoption report or becomes a fifth scan category stays open. Both rows are Phase-1, so this blocks nothing in the v0.1 thin cut. OI-0076 remains open with its existing resolution path.
- **D5 · Metamodel source of truth — decided for v1: hand-seeded `metamodel.yaml`.** Type facts are read from a lean, git-tracked YAML mirroring the kit registry's shape. *Rationale:* the store-backed alternative has a bootstrap paradox — the store must be seeded with its own metamodel before it can validate anything — and would push E-03 work into E-01 or block E-01 on E-03. *Recorded cost:* two registries in sync by hand until E-03 lands. *Asserted by:* [US-03](#prd-0001us-03--reject-a-schema-violating-write-with-an-actionable-message) and §6. *Cascade:* [E-03](../../plans/delivery-roadmap.md#e-03--core-methodology-schema-coverage) owns the migration to the store-backed export of the [ADR-0008](../../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md) chain; this is a v1 expedient, not a reversal of ADR-0008.

### Deferred, stated explicitly

- **Relationship-verb ratification ([OI-0074](../../../project-control/open-items/open-items.md), high) lands with [E-03](../../plans/delivery-roadmap.md#e-03--core-methodology-schema-coverage), not here.** PRD-0001 therefore builds against the **pre-ratification** verb set in the [CLI contract's relationship table](../../architecture/interfaces/cli-clew.md#relationship-group--clew-link) and the [catalogue](../../metamodel/relationships.md) as they stand, including the ⚠ rows (`SPECIFIES`, `DETAILS`, `covers`). Two consequences the PRD states rather than assumes: (i) [US-06](#prd-0001us-06--assert-a-typed-relationship-that-cannot-dangle) asserts the **recorded default** that a direct link writes `validation_status = validated`, `confidence = stated`, which the ratification must **confirm or amend** — if amended, US-06's authored-fact criterion changes with it; (ii) the allowed-verb table is data, not behaviour, so ratification changes the registry contents without reopening US-06's enforcement criteria. This PRD does not assume the verb set is settled.
- **Brownfield adoption at scale** (binding pre-existing markdown across a whole repo) rides E-04's gate per the [roadmap](../../plans/delivery-roadmap.md#e-04--change-guardrail); E-01 ships only the per-artefact write path. The adoption command exists in the contract's Migration group, but its scale-out story is not specified here.

### Discussion, not yet actionable

- **Story granularity vs the epic's 25-row ceiling.** Eleven stories cover 25 rows, and the roadmap warns that any new row forces an epic split. If implementation reveals a missing functionality, the correct move is to raise the split rather than to quietly grow a story — the ceiling exists because the write path is one trust boundary and a half-trustworthy store is worse than a late one.
- **Where the E-01/E-02 seam sits inside [UC-02](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md).** This PRD covers execution; the impact preview that gates the accept step is E-02's. The use case is one goal split across two PRDs by design ([a use case is a behaviour contract, not epic-scoped](../use-cases/uc-02-refactor-artefact-with-foreseen-impact.md#related-information)), but the v0.1 thin cut ships both halves, so the seam is a documentation boundary rather than a user-visible one. Worth re-reading at E-02 authoring time to confirm no criterion fell in the gap.

---

## 9 · Open Items

This PRD carries no local Open Items table ([ADR-0005](https://github.com/VictorHueni/homemade-claude-kit/blob/main/docs/architecture/decisions/adr-0005-open-items-ledger-sole-authoring-surface.md)); actionable unresolved work is filed directly to the [central ledger](../../../project-control/open-items/open-items.md) via `util-open-items`.

Drafting resolved **OI-0084**, **OI-0085**, and **OI-0086** (§8-D1/D2/D3) — each closes once its recorded cascade is applied to the CLI contract, the value stream, and the use cases. **OI-0076** (§8-D4) and **OI-0074** stay open with their existing resolution paths. New items surfaced by this PRD are filed to the ledger in the same pass as this file.

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-26 | Initial authoring via `spec-prd`, against the [PRD-0001 authoring handoff](prd-0001-trustworthy-artefact-persistence/handoff.md). Eleven embedded `PRD-0001.US-NN` stories cover all 25 E-01 FBS rows with cut membership marked — the first live exercise of the [ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) multi-artefact file contract (umbrella frontmatter, parent-scoped story IDs, child hash exclusion). Four blocking decisions taken: OI-0084 → sequential per-write transactions (no `clew apply`); OI-0085 → duplicate edges are an idempotent no-op; OI-0086 → inconsistent-snapshot restore fails atomically with offenders named; metamodel source of truth → hand-seeded `metamodel.yaml` for v1. OI-0076 deferred with the behaviour specified and only its host command open; OI-0074 verb ratification explicitly deferred to E-03, with the `validated`/`stated` direct-link default flagged as subject to confirmation. | Victor Hueni |
