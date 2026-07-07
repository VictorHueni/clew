---
type: Architecture Decision Record
title: clew is minimal-model / perfect-sync, not repo-native enterprise architecture
description: Positions clew as a minimal, perfectly-synced product-intent contract for agents and records the EA-scope and delivery-accounting cuts.
tags: [positioning, scope, minimal-model, adr]
timestamp: 2026-07-07T16:13:11Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-07
review_interval: 180d
---

# clew is minimal-model / perfect-sync, not repo-native enterprise architecture

## Context and Problem Statement

clew's positioning has been circling three framings: "AI-native product intelligence,"
"git-native traceability for agents," and — most recently — "repo-native enterprise
architecture" (an Ardoq / BiZZdesign / LeanIX for the agentic delivery loop). A
[2026-07-07 competitive scan](../../discovery/competitive-landscape-2026-07-07-agentic-architecture-tools.md)
and an architecture/product review surfaced two facts that force a positioning decision:

1. **The lower layers are crowded and the primitives are table stakes.** Stable IDs, FK
   enforcement, drift detection, and deterministic git-friendly export are already shipped by
   [ContextGit](https://github.com/Mohamedsaleh14/ContextGit), [Doorstop](https://github.com/doorstop-dev/doorstop),
   and [OpenFastTrace](https://github.com/itsallcode/openfasttrace). clew cannot differentiate on
   write-side integrity plumbing alone.
2. **The "repo-native EA" framing is attractive but hazardous.** It fits the *shape* of what
   clew models (strategy → domain → spec → plan) and names a real weakness of classic EA tools
   (they are detached from code and rot because the model is hand-maintained). But taken as a
   product programme it pulls clew toward the exact properties that make EA tools fail and that
   [VISION](../../VISION.md) already disowns: a maximal model, a SaaS/multi-user governance
   surface, and an enterprise-architect buyer that clew's local-first, single-writer
   architecture ([ADR-0001](adr-0001-metamodel-persistence-layer.md)) cannot serve.

The unresolved question: **what is clew's durable wedge, and which capabilities are therefore
in scope for the product versus out of scope as EA-style or PM-style scope creep?** Without a
recorded boundary, the "repo-native EA" reframe silently re-expands scope every planning cycle.

Two review findings sharpen the stakes:

- **The recursion trap.** Every artefact type and feature that enlarges the model *also*
  enlarges the surface that must be kept in sync. clew exists to eliminate drift; a maximal
  model manufactures more of the drift it is meant to cure. clew's own repo already shows this —
  changelog and soft-link cascades outweigh substantive content in several files, at N=1, with
  none of the proposed EA features.
- **The persona ↔ rigor mismatch.** clew's validated persona ([P-01 Ava](../../business/01a-personas.md):
  solo / 1–3-person, agent-first) is the segment least likely to author a TOGAF capability map.
  Adding EA-grade breadth widens, not narrows, that gap.

## Decision Drivers

- **Differentiation must sit where the competition is absent** — the strategy→spec seam and the
  read-into-agent-context side — not on the copyable write-side primitives.
- **Model size is drift surface.** The core value (perfect sync between structure and prose) gets
  *harder* linearly with model size. Minimising the mandatory model protects the core promise.
- **Architecture constraints are fixed.** Local-first, single-writer, no-SaaS, no-multi-user are
  load-bearing [VISION](../../VISION.md) commitments; any positioning that requires an enterprise
  governance buyer contradicts them.
- **Validation gates scope.** Deepening the metamodel ahead of wave-2 evidence
  ([OBJ-03](../../business/04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling))
  bets on an untested persona appetite.
- **Positioning must be enforceable by the metamodel itself**, not held in memory — hence this
  ADR, which downstream artefacts cite when cutting scope.

## Considered Options

- **A. Repo-native EA (maximal model).** Adopt the EA feature programme — capability health
  scoring, portfolio management, scenario/target-state modelling, calculated fields, stakeholder
  views (exec / architect / product / agent), roadmaps. Position as "Ardoq for AI agents."
- **B. Generic git-native traceability.** Compete head-on with ContextGit / Doorstop on the
  requirement→test trace matrix and agent integration.
- **C. Minimal-model / perfect-sync + read-into-the-loop (chosen).** Keep the mandatory model as
  small as possible, make integrity on that small model ironclad, and invest the differentiation
  budget in serving the graph *into the agent's context* (selective context assembly, and later a
  change-guardrail). Use "repo-native EA" only as an internal metaphor, never as a public
  category claim or feature checklist.

## Decision Outcome

Chosen option: **C (minimal-model / perfect-sync + read-into-the-loop).**

clew is positioned as **the product-intent contract an AI agent must satisfy before it changes
code** — "only clew creates facts." The wedge is the *inverse* of the EA tools:

> EA tools: **rich model · weak (manual) sync · above the delivery loop.**
> clew: **minimal model · ironclad sync · inside the delivery loop.**

Concretely, clew commits to holding *the smallest enforceable graph of product intent that lets
it answer, in-session and correctly, "does this proposed change still respect what is declared,
and what must be updated first?"* — and no more. The differentiation budget goes to the
**read side** (assembling the right slice into the agent's context, token-costed) and, once the
graph is provably dense and drift-free, a **change-guardrail** — not to enlarging the model.

"Repo-native EA / Ardoq-for-agents" is retained as an **internal design metaphor** only. It must
not appear in public positioning: it reads as derivative and invites the enterprise-governance
buyer the architecture cannot serve.

### Scope boundary — out of scope (this ADR is the citation for cutting these)

The following are recorded as **out of scope for clew** (with the artefact edits they trigger):

| Cut | Rationale | Cascades to |
|---|---|---|
| **Effort estimation / delivery accounting** (`clew estimate`, complexity → day rollups, C3.2.F04, the `complexity` property) | VISION: "NOT a project or ticketing tool… delivery accounting belongs elsewhere." | CLI contract, FBS C3.2, domain model, capability map |
| **DB-resident audit trail as a modelled capability** (C4.3) | Duplicates git on `snapshot/`; the DB is gitignored so a DB audit is non-durable across rebuild. Delegate to the VCS. | Capability map C4.3, FBS C4.3, domain model |
| **Heavyweight migration framework urgency** (Alembic + SQLAlchemy Core) | A 4-table schema built (ADR-0003) so new types need *no DDL* does not warrant a full migration framework at v1. Defer; hand-roll `PRAGMA user_version` steps until the core spine actually churns. **Amends [ADR-0012](adr-0012-schema-migration-framework.md).** | ADR-0012, capability map C4.4, FBS C4.4 |
| **EA feature programme** — capability health scoring, portfolio management, scenario/target-state modelling, calculated fields, multi-stakeholder view generation, roadmaps | Each enlarges drift surface, serves an unserviceable buyer, and is years of work ahead of a single validated user. | (prevents future scope creep; nothing to cut yet) |
| **Declaring a versioned public protocol / "clew-compatible" ecosystem now** | Standards are earned by adoption, not declared at N=1 with zero external users and no shipped CLI. A v3+ consequence of winning, not a v0.1 move. | (sequencing guard) |

### In scope — the wedge

- **Minimal typed graph** — the self-dogfooding spine only (the ~11 persisted types of
  [ADR-0003](adr-0003-schema-design-typed-property-graph.md) / the
  [artefact-store model](../../domain/07b-models/artefact-store.md)), not the full kit catalogue.
- **Write-time reference integrity** (C4.1) and **stable IDs** (C2.1) — table stakes, but the
  floor the wedge stands on.
- **Pre-built traceability + impact views** (C3.2 `trace` / `impact` / `matrix`) — the read-side
  differentiator that already exists in the model.
- **Selective context assembly** (`clew context <task>`, token-costed) — elevated from the thin
  C1.2 to a first-class read-side capability; this is where the competition is weakest.
- **Change-guardrail** (`clew guard`) — planned, *after* the graph is dense and drift-free.
  Guarding on a sparse or stale graph produces confidently-wrong guardrails, which is worse than
  none; guard is the reward for perfect-sync, not the thing that builds it.

### Positive Consequences

- One recorded, citable boundary stops the "repo-native EA" reframe from re-expanding scope.
- The differentiation budget concentrates on the uncontested seam (strategy→spec) and the
  read-into-context side, rather than on copyable plumbing.
- Cutting estimate / audit-as-capability / migration-framework-urgency shrinks the v1 build
  surface and reduces the drift surface clew must keep in sync.
- Positioning stays consistent with the fixed local-first / single-writer / no-SaaS constraints.

### Negative Consequences

- Foregoes the (superficially larger) EA-tool market and the enterprise-governance buyer.
- "Minimal model" is a discipline that must be actively defended against feature-request
  gravity every cycle; this ADR is the enforcement mechanism but not self-executing.
- The read-side bets (`context`, `guard`) are less proven than the write-side machine already
  built; value depends on graph density and freshness, which is the hard part.
- Deferring the migration framework accepts hand-rolled schema evolution until/unless the core
  spine churns (revisit trigger in [ADR-0012](adr-0012-schema-migration-framework.md)).

## Related decisions

- [ADR-0001 Persistence layer (CLI + SQLite)](adr-0001-metamodel-persistence-layer.md) —
  **reaffirmed**; the local-first / single-writer constraints this ADR relies on originate there.
- [ADR-0003 Schema design — typed property graph](adr-0003-schema-design-typed-property-graph.md)
  — **reaffirmed**; the minimal-model stance is the product expression of ADR-0003's no-DDL,
  small-spine design.
- [ADR-0012 Schema migration framework (Alembic + SQLAlchemy Core)](adr-0012-schema-migration-framework.md)
  — **amended**; its adoption is deferred (hand-roll for v1) on the minimal-model rationale.
  (ADR-0012 is the former duplicate `ADR-0007`, renumbered in the same pass so ADR IDs stay
  unique — clew passing its own referential-integrity rule.)
- [VISION](../../VISION.md) — a new "What We Are NOT" clause (not an EA modelling platform) is
  added to carry this boundary at the north-star level.

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| North-star scope guard (not-EA "What We Are NOT") | [VISION](../../VISION.md) |
| High-concept pitch reframe ("only clew creates facts") | [Lean Canvas §3 UVP](../../business/02a-lean-canvas.md) |
| Write-time vs check-time guarantee wording | [OBJ-02 KR-02.1](../../business/04b-objectives.md) · [CLI contract §5](../interfaces/cli-clew.md) |
| Scope cuts (estimate / audit / migration) + `clew context` / `clew guard` | [Capability map](../../business/03a-capability-map.md) · [FBS](../../product-specs/07a-fbs.md) · [CLI contract](../interfaces/cli-clew.md) · [Artefact Store model](../../domain/07b-models/artefact-store.md) |
| Persona↔rigor validation gate | [OBJ-03 KR-03.2](../../business/04b-objectives.md) |
