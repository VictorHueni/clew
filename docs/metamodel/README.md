# The Metamodel

The canonical, **tool-agnostic** definition of the strategic-architecture metamodel clew
persists and enforces: which artefact **types** exist, which **relationships** between them are
legal, and how they **package** up.

clew is the **source of truth** for this structural and relational definition
([ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md)).
The `homemade-claude-kit` skills retain the **semantic** definitions — *how* to author a good
persona, capability, or ADR (methodology, anti-patterns, examples) — because a skill needs that to
produce the artefact. This section owns the structure; the skills own the craft.

> **What lives here vs. elsewhere**
> | Fact-class | Home |
> | :-- | :-- |
> | Types · IDs · layout · packages · relationships · cardinality | **this section** (clew) |
> | Methodology · examples · anti-patterns · when-to-use | kit `SKILL.md` § `## Canonical definition` |
> | How clew *stores* any of this (the typed property graph) | [`../domain/07b-models/artefact-store.md`](../domain/07b-models/artefact-store.md) |
> | Build-order narrative + project variants (greenfield/brownfield) | kit `rules/metamodel.md` |

Downstream, the kit's `artefact-types-registry.md` and the structural blocks of its
`metamodel.md` are **generated projections** of this section, refreshed by a future
`clew metamodel export` step ([ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md)
Phase 4). Don't hand-edit those to diverge from here.

---

## How to read this section

Three lenses on the same model, from coarse to fine:

1. **Packages** — the model grouped by kit prefix. Each [package page](packages/) describes the
   package, shows a **zoom diagram** of just its artefacts and their named relationships, and lists
   the cross-package links that cross its boundary (its in-ports and out-ports).
2. **Artefacts** — every artefact *type*: its purpose, package, ID format, file layout, what it
   mints, and its in/out relationships. (Described inline on each package page for now; a
   standalone artefact index is forthcoming.)
3. **Relationships** — the catalogue of every typed edge: verb, source→target, cardinality,
   strength (hard/soft), role vocabulary, and meaning. This is the human-readable form of clew's
   `ALLOWED_RELATIONSHIPS`. *(`relationships.md` — forthcoming; the registry currently lives in
   [`../domain/07b-models/artefact-store.md` §Relationship registry](../domain/07b-models/artefact-store.md#relationship-registry)
   and will consolidate here.)*

The whole metamodel as one build-order graph (overview, all packages at once) lives in the
[repository README](../../README.md#artefact-layers-and-build-order).

---

## The packages

| Package | Prefix | What it holds | Page |
| :-- | :-- | :-- | :-- |
| **Discovery** | `discovery-` | Pre-formal evidence — ideas, research, workshops (cross-cutting) | [discovery.md](packages/discovery.md) |
| **Business Architecture** | `business-` | Vision, personas, capability map, value streams, objectives, processes, models, competitive landscape | [business-architecture.md](packages/business-architecture.md) |
| **Domain** | `domain-` | Bounded contexts, glossary, domain model | [domain.md](packages/domain.md) |
| **Product Specs** | `spec-` | FBS, delivery roadmap, quality attributes, use cases, PRDs, implementation plans | [product-specs.md](packages/product-specs.md) |
| **Architecture** | `arch-` | ADRs, service & CLI contracts (+ C4/arc42/UML diagrams) | [architecture.md](packages/architecture.md) |
| **Quality Assurance** | `qa-` | Test strategy, scenarios, plans — **reserved**, no skill yet | [quality-assurance.md](packages/quality-assurance.md) |
| **Operations** | `ops-` | Runbooks, bug RCAs — post-ship; mints no IDs | [operations.md](packages/operations.md) |

> **Packages map 1:1 to kit prefixes** (`discovery-`, `business-`, `domain-`, `spec-`, `arch-`,
> `qa-`, `ops-`). `spec-` spans `docs/product-specs/` **and** `docs/exec-plans/` — implementation
> plans belong to Product Specs, not a separate "Execution" package. `ux-`/`com-`/`dev-`/`util-`
> mint no artefacts and are tooling, not metamodel packages.

> **Status:** all seven package pages drafted. Still to come: the consolidated
> [`relationships.md`](#how-to-read-this-section) catalogue (moved out of `artefact-store.md`) and,
> later, generation from clew's schema. Tracked as OI-0029 on
> [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md).
