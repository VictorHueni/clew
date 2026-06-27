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
3. **Relationships** — [`relationships.md`](relationships.md): the catalogue of every typed edge —
   verb, source→target, cardinality, strength (hard/soft), role vocabulary, and meaning. The
   human-readable form of clew's `ALLOWED_RELATIONSHIPS`. *(Transitional: an identical copy still
   lives in [`artefact-store.md` §Relationship registry](../domain/07b-models/artefact-store.md#relationship-registry)
   until OI-0029 reduces it to a pointer.)*

The whole metamodel as one build-order graph (overview, all packages at once) lives in the
[repository README](../../README.md#artefact-layers-and-build-order).

---

## The packages

| Package | Prefix | What it holds | Page |
| :-- | :-- | :-- | :-- |
| **Discovery** | `discovery-` | Pre-formal evidence — ideas, research, workshops (cross-cutting) | [discovery.md](packages/discovery.md) |
| **Business Architecture** | `business-` | Vision, personas, capability map, value streams, objectives, processes, models, competitive landscape | [business-architecture.md](packages/business-architecture.md) |
| **Domain** | `domain-` | Bounded contexts, glossary, domain model | [domain.md](packages/domain.md) |
| **Product Specs** | `spec-` | FBS, quality attributes, use cases, PRDs | [product-specs.md](packages/product-specs.md) |
| **Planning** | `plan-` | Delivery roadmap (epics), implementation plans | [planning.md](packages/planning.md) |
| **Architecture** | `arch-` | ADRs, service & CLI contracts (+ C4/arc42/UML diagrams) | [architecture.md](packages/architecture.md) |
| **Quality Assurance** | `qa-` | Test strategy, scenarios, plans — **reserved**, no skill yet | [quality-assurance.md](packages/quality-assurance.md) |
| **Operations** | `ops-` | Runbooks, bug RCAs — post-ship; mints no IDs | [operations.md](packages/operations.md) |

> **Packages map 1:1 to kit prefixes** (`discovery-`, `business-`, `domain-`, `spec-`, `plan-`,
> `arch-`, `qa-`, `ops-`). **Build planning** (`plan-` → `docs/plans/`: the delivery roadmap and
> implementation plans) was split out of `spec-` in
> [ADR-0009](../architecture/decisions/adr-0009-plan-package-split-from-product-specs.md) — they
> specify *intended sequence*, not the product. `agent-`/`ux-`/`com-`/`dev-`/`util-` mint no
> artefacts — they are tooling, described under [Supporting packages](#supporting-packages--tooling)
> below.

> **Status:** all seven package pages drafted, each ending with a **Planned additions** table of
> candidate skills from the [kit backlog](https://github.com/VictorHueni/homemade-claude-kit/issues)
> (qa-*, `domain-event-storming`, `arch-threat-model`, `ops-slo`, …); the
> [`relationships.md`](relationships.md) catalogue is in place. Still to come: reducing the duplicate
> registry in `artefact-store.md` to a pointer, and later generation from clew's schema. Tracked as
> OI-0029 on
> [ADR-0008](../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md).

---

## Supporting packages — tooling

These prefixes are **not metamodel packages** — they mint no IDs, hold no typed relationships, and
appear in no registry. They *operate on* or *render from* the metamodel rather than being part of it.
Documented here for completeness, and because clew will eventually own how they read the model.

| Package | Prefix | Role | Page |
| :-- | :-- | :-- | :-- |
| **UX** | `ux-` | The project's visual design system → token contract the `com-` layer themes from | [ux.md](packages/ux.md) |
| **Communication** | `com-` | Render metamodel artefacts into slide decks + interactive HTML views | [com.md](packages/com.md) |
| **Agent** | `agent-` | Agent-Centric Development Cycle — Guide (`CLAUDE.md`), Verify (grill / review), Solve (autonomous loop) | [agent.md](packages/agent.md) |
| **Dev** | `dev-` | Developer workflow — git, commits, PRs, worktrees, reference guides | [dev.md](packages/dev.md) |
| **Util** | `util-` | Governance & housekeeping — scaffold, audit, migrate, lint the metamodel itself | [util.md](packages/util.md) |
