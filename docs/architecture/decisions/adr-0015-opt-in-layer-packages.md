---
type: Architecture Decision Record
title: Opt-in layer packages — the mandatory core stays minimal, coverage grows per-repo
description: Keeps the mandatory model at the minimal spine and adds per-artefact-type opt-in layer packages with a prerequisite DAG, guide-and-scaffold enablement, declared absences, and full write-time strictness — amending ADR-0013's scope clause.
tags: [scope, layer-packages, enablement, metamodel, adr]
timestamp: 2026-07-24T17:20:00Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# Opt-in layer packages — the mandatory core stays minimal, coverage grows per-repo

## Context and Problem Statement

[ADR-0013 — clew is minimal-model / perfect-sync, not repo-native EA](adr-0013-minimal-model-not-repo-native-ea.md) pinned the mandatory model to the ~11-type self-dogfooding spine "and no more", on the argument that model size is drift surface. That boundary left a question unanswered (filed as OI-0072): what happens when a user legitimately needs *more* model — multi-layer coverage in the strategy/motivation → business → application → technology → implementation-and-migration sense — without clew becoming the maximal-model EA tool ADR-0013 disowns?

Two pieces of evidence make the question concrete:

1. **The depth need is real, not hypothetical.** The cartography prototype (external: `swiss-aos-drug-reimbursement-model/docs/architecture/cartography/`, Plans 0138/0139) modelled **five domains** on a **tiered 14-type core** — an AI-augmented architect-builder doing full-layer modelling at small-company scale, in practice, before clew could serve it. Its ontology also demonstrated the governing principles that make such a model survivable: a closed type enum, richness via properties not types, projection never a second source of truth, tiered adoption.
2. **The historical cost argument has inverted.** Full-layer EA was overkill below enterprise scale because hand-maintaining the model cost more than it returned. AI collapses that modelling cost — which removes the reason multi-layer coverage was out of reach for small teams, but *not* the reason it is dangerous for clew: every enforced type is drift surface that must be kept in perfect sync.

The question this ADR decides: **how does clew offer multi-layer coverage without growing the mandatory model — and with what enablement, integrity, and sequencing semantics?** Decided in the [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) (D1/D2/D3/D6/D7); this ADR is the record. **Closes OI-0072** (ledger closure handled in the open-items pass).

## Decision Drivers

- **Model size is drift surface** (ADR-0013's core argument, unchanged): whatever grows must be *chosen* by the repo that pays its sync cost, never imposed.
- **The enablement choice must price drift surface, never check honesty.** A type that is enabled must get the identical guarantee as the core ([OBJ-02 KR-02.1](../../business/04b-objectives.md)); a "lite" tier would recreate exactly the rich-model / weak-sync failure mode clew exists to invert.
- **Two personas, two costs.** [P-01 Ava](../../business/01a-personas.md) owns the mandatory core and must never pay an unopted layer's drift cost; the architect-builder persona (minted per D5, the cartography prototype as proof-of-need) justifies the layers and opts into their cost knowingly.
- **No-DDL is already the schema contract.** [ADR-0003 — typed property graph](adr-0003-schema-design-typed-property-graph.md) was designed so new types need no DDL; layer type-definitions are therefore registry *data*, not code — cheap to author on demand, cheap to keep off the mandatory path.
- **Validation gates the public roadmap.** OBJ-03 wave-2 has found one architect-builder (the founder); public commitment to layer content waits for a second.
- **Read-side priority stands.** ADR-0013 put the differentiation budget on the read side (`context`, `trace`/`impact`/`matrix`); new layers must not displace it in the build order.

## Considered Options

- **A. Keep the hard boundary — no multi-layer coverage at all.** Preserves ADR-0013 verbatim, but abandons the evidenced architect-builder need: the prototype shows that user modelling five domains *anyway*, outside any enforcement substrate — exactly the drift clew exists to prevent.
- **B. Grow the mandatory core to multi-layer.** Serves the architect-builder by making everyone pay: every repo inherits the full drift surface, P-01 Ava is priced out, and clew becomes the maximal-model tool ADR-0013 correctly rejected.
- **C. Opt-in at whole-layer granularity.** Coarse packages ("enable the technology layer") are simpler to explain but force all-or-nothing adoption within a layer; the session's worked examples showed users pick *types* (e.g. `fbs` without the rest of its layer), not layers.
- **D. Opt-in at per-artefact-type granularity with a prerequisite DAG (chosen).** Users enable individual types; clew knows each type's prerequisites and guides — the finest granularity that still keeps the graph well-formed.

## Decision Outcome

Chosen option: **D (per-artefact-type opt-in with a prerequisite DAG), with guide-and-scaffold semantics and no soft tier.**

- **The mandatory core does not grow — zero additions.** The minimal spine of [ADR-0013](adr-0013-minimal-model-not-repo-native-ea.md) / the [Artefact Store model](../../domain/07b-models/artefact-store.md) remains the only model every repo carries. Everything beyond it is **opt-in product scope**: multi-layer capability (strategy/motivation → business → application → technology → implementation & migration) ships as product capability because AI collapses the modelling cost that historically made full-layer EA overkill below enterprise scale — but only for repos that choose it.
- **Enablement is per-artefact-type, not per-layer.** Users pick and choose individual artefact types. Each type's prerequisites (e.g. `fbs` requires `capability`) are persisted as a **prerequisite DAG in the metamodel registry** ([metamodel](../../metamodel/README.md), packages + [relationships](../../metamodel/relationships.md)) and enforced as **guide-and-scaffold**: enabling a type auto-enables/scaffolds its prerequisites.
- **Guide-and-scaffold semantics — the three-way distinction (D3):**
  - **Stub parent.** Where identity requires a parent (parent-scoped IDs like `C2.1.F01`), clew mints a **real ID with `_TODO_` content**. The graph stays well-formed; the prose debt is visible.
  - **Declared absence.** A `_TODO_` sentinel in a soft-link slot for an unenabled or unfilled target is **first-class declared absence**: no edge row is persisted, and `clew check` reports it as info-level "declared absences" — never a violation.
  - **Dangling reference.** An edge to a non-existent ID is **never representable**: hard-blocked at write time, no exceptions, regardless of what is enabled.
- **No soft tier.** Enabled types get the **identical 100% write-time guarantee as the core** (KR-02.1). There is no enabled-with-warnings tier: a warnings tier would recreate the rich-model / weak-sync EA failure ADR-0013 defines clew against. The enablement choice prices drift surface, never check honesty.
- **Sequencing (D6).** The **enablement mechanism** (per-type on/off, prerequisite DAG, stub-scaffold, declared absences) is **v0.1 core infrastructure** — it ships regardless of wave-2's outcome. **Layer type-definitions** are registry **data, not code** (ADR-0003's no-DDL design): the founder authors them for dogfood whenever needed, but they stay off the public roadmap and out of the mandatory model until wave-2 finds a second architect-builder. The **read side** (`context`, `trace`/`impact`/`matrix`) keeps build-order priority over any new layer.
- **Cartography export is the fourth read-side surface (D7).** `clew export likec4` (cartography views) joins `context`/`trace`/`impact`. Boundary: **ArchiMate is an export-time mapping only**, never clew's mandatory ontology — "LikeC4 is a view tool; clew is an enforcement substrate — they compose" (Plan 0138).
- **Governing principles** (lifted from the cartography prototype's ontology, credited as its contribution): **closed type enum** · **richness via properties, not types** · **projection is never a second source of truth** · **tiered adoption**.
- **Amendment to ADR-0013 §In scope:** the clause "the ~11 persisted types … and no more" becomes "…**and no more in the mandatory model; opt-in packages extend the enforced graph per-repo**." Nothing else in ADR-0013's scope boundary changes; the out-of-scope cuts (estimate, audit-as-capability, EA feature programme, protocol declaration) all stand.

### Positive Consequences

- The architect-builder need is served without P-01 Ava ever paying for it: each repo's drift surface is exactly what that repo opted into.
- The minimal-model discipline gains a pressure valve — feature-request gravity toward "more model" now has a sanctioned path (a package) instead of eroding the mandatory core.
- Full write-time strictness on enabled types keeps the "only clew creates facts" guarantee uniform: there is one integrity story, not a core/periphery split.
- Registry-data type-definitions (no DDL, per ADR-0003) make dogfood-driven layer authoring cheap and reversible.
- The prototype's five-domain, 14-type validation means the mechanism is designed against a real workload, not a speculative one.

### Negative Consequences

- The enablement mechanism (DAG persistence, stub minting, declared-absence reporting) is genuine v0.1 build surface added before wave-2 evidence — the mechanism is a bet that only the *content* is evidence-gated.
- Stub parents with `_TODO_` content are honest but ugly: a repo that enables aggressively can accumulate visible prose debt, and `clew check`'s info-level declared-absence report must stay useful, not noisy.
- Per-type granularity is more to explain than whole-layer packages; the prerequisite DAG carries the teaching burden.
- A fourth read-side surface (`export likec4`) widens the read-side commitment; the ArchiMate-as-export-only boundary must be defended against "just persist the ArchiMate model" requests.

## Related decisions

- [ADR-0013 — minimal-model / perfect-sync, not repo-native EA](adr-0013-minimal-model-not-repo-native-ea.md) — **amended** (§In scope only): mandatory-model minimalism is retained; opt-in layer packages are added as the sanctioned growth path.
- [ADR-0003 — schema design: typed property graph](adr-0003-schema-design-typed-property-graph.md) — **reaffirmed and load-bearing**: the no-DDL design is what makes layer type-definitions registry data instead of schema migrations.
- [ADR-0008 — clew is the canonical source of truth for the metamodel](adr-0008-clew-canonical-source-of-truth-for-metamodel.md) — the prerequisite DAG and package definitions live in the clew-owned metamodel registry that ADR-0008 governs.
- [ADR-0014 — Product Architecture Management positioning](adr-0014-product-architecture-management-positioning.md) — companion decision from the same session; this ADR carries the substance side of its "ban survives on the term, dies on the substance" split.
- [ADR-0016 — two-speed integrity: edge property bag and relationship review lifecycle](adr-0016-two-speed-integrity-edge-property-bag.md) — companion decision; the edge schema it fixes is decided while the DDL is unbuilt, on the same pre-build economics as this ADR's registry approach.

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| Prerequisite DAG + package/type registry (core vs opt-in distinction) | [Metamodel](../../metamodel/README.md) · [relationships](../../metamodel/relationships.md) · `docs/metamodel/packages/` |
| Enablement state, stub-parent minting, declared-absence semantics | [Artefact Store model](../../domain/07b-models/artefact-store.md) |
| `clew check` info-level declared-absence reporting + `clew export likec4` | [CLI contract](../interfaces/cli-clew.md) |
| Write-time guarantee wording extended to enabled types | [OBJ-02 KR-02.1](../../business/04b-objectives.md) |
| Architect-builder persona (justifying persona for layer packages) | [Personas](../../business/01a-personas.md) |
| Glossary terms (*layer package*, *enablement*, *stub parent*, *declared absence*, *cartography export*) | [Glossary](../../domain/02c-glossary.md) |
| Decision record (D1/D2/D3/D6/D7 canonical wording) | [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) |
| OI-0072 closure | [Open-items ledger](../../../project-control/open-items/open-items.md) |
