---
title: Metamodel — Operations Package
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Operations Package

> Part of [The Metamodel](../README.md). Prefix `ops-` → `docs/ops/`.

The **post-ship layer.** Operations artefacts are captured *after* delivery — operational procedures
(runbooks) and root-cause analyses (bug RCAs). They are real metamodel artefacts but **mint no IDs**
and sit outside the authoring build order; their links back into the spec layer are advisory
(post-ship lifecycle, no enforced FK).

## Zoom

Slate nodes are inside Operations; the faded dashed node is the upstream artefact they attach to.
Dashed edges are post-ship lifecycle links — no enforced foreign key.

```mermaid
flowchart TD
    classDef ops fill:#E2E8F0,stroke:#475569,color:#1E293B
    classDef ext fill:#ffffff,stroke:#cbd5e1,color:#94a3b8,stroke-dasharray:3 3

    PLAN["implementation-plan · Plan-NNNN"]:::ext

    subgraph OPS["Operations"]
        RB["runbook"]:::ops
        RCA["bug-rca"]:::ops
    end

    PLAN -.->|"operated via"| RB
    RCA -.->|"feeds fixes"| PLAN
```

## Artefacts in this package

### runbook — _(no ID)_
An operational procedure captured post-ship — how to run, recover, or respond.
- **Skill:** `ops-runbook` · **Layout:** one-per-artefact · **Path:** `docs/ops/runbooks/{slug}.md`

### bug_rca — _(no ID)_
A post-incident root-cause analysis; feeds corrective work back into implementation plans.
- **Skill:** `ops-bug-rca` · **Layout:** one-per-artefact · **Path:** `docs/ops/rcas/{YYYY-MM-DD}-{slug}.md`

> Infra provisioning (`ops-terraform-exoscale`) also lives under the `ops-` umbrella but is tooling,
> not a metamodel artefact (mints no IDs, produces no governed doc).

## Boundary relationships

Both edges are **post-ship, soft, no enforced FK** (dashed on every diagram).

| Verb | Source → Target | Strength | Neighbour package | Meaning |
| :-- | :-- | :-- | :-- | :-- |
| operated via | implementation_plan → runbook | soft | Product Specs | A shipped increment is operated via runbooks |
| feeds fixes | bug_rca → implementation_plan | soft | Product Specs | An RCA feeds corrective increments |

---

*Relationship verbs are the canonical types clew stores in `artefact_references.relationship`. Full
catalogue: [`../relationships.md`](../README.md#how-to-read-this-section) (forthcoming).*
