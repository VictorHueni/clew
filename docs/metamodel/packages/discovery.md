---
title: Metamodel — Discovery Package
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Discovery Package

> Part of [The Metamodel](../README.md). Prefix `discovery-` → `docs/discovery/`.

The **pre-formal evidence layer.** Discovery is cross-cutting: it sits upstream of everything and
feeds (or reality-checks) every downstream artefact. It captures raw ideas before they have a home,
runs the interviews and workshops that turn `Assumed` claims into `Tested`/`Validated` ones, and
graduates matured ideas into whichever downstream artefact fits. It mints almost no structure of its
own — its value is the evidence it injects elsewhere.

## Zoom

Teal nodes are inside Discovery; faded dashed nodes are downstream artefacts it feeds. `UPPERCASE`
edges are typed relationships clew enforces; lowercase edges are advisory evidence flows the registry
does not type.

```mermaid
flowchart TD
    classDef disc fill:#CCFBF1,stroke:#0D9488,color:#115E59
    classDef ext  fill:#ffffff,stroke:#cbd5e1,color:#94a3b8,stroke-dasharray:3 3

    P["persona · P-NN"]:::ext
    OBJ["objective · OBJ-NN"]:::ext
    PRD["PRD-NNNN"]:::ext
    BC["bounded-context · BC-NN"]:::ext
    VS["value-stream · VS-N.M"]:::ext

    subgraph DISC["Discovery"]
        IDEA["idea · IDEA-NNNN"]:::disc
        RES["research"]:::disc
        WS["workshop"]:::disc
    end

    IDEA -->|"GRADUATES_TO"| P
    IDEA -->|"GRADUATES_TO"| OBJ
    IDEA -->|"GRADUATES_TO"| PRD
    RES -->|"validates"| P
    WS -->|"event storming"| BC
    WS -->|"aligns"| VS
```

## Artefacts in this package

### idea · `IDEA-NNNN`

A pre-formal idea captured, refined through a divergent/convergent loop, and **graduated** into the
downstream artefact that matches its matured form. The only Discovery artefact that mints an ID.

- **Minting skill:** `discovery-idea` · **Layout:** one-per-artefact · **Path:** `docs/discovery/ideation/IDEA-{nnnn}-{slug}.md` (+ `INDEX.md`)
- **Mints:** `IDEA-NNNN` · **Key property:** `graduates_to` (the downstream skill that owns the matured artefact)
- **Out:** `GRADUATES_TO` → persona, objective, canvas, process, research, adr, fbs_functionality, prd (one-way; the target carries no back-FK)

### research — _(no ID)_

Hypothesis-anchored interview scripts and synthesis. Reality-checks individual assumptions; its
synthesis feeds confidence ratings (`Assumed → Tested → Validated`) back into the artefacts that
carry `Assumed` claims.

- **Minting skill:** `discovery-research` · **Layout:** one-per-artefact · **Path:** `docs/discovery/interviews/`
- **Mints:** nothing · **Out (advisory):** validates persona, canvas, value-stream pain, quantitative-model inputs, objective KR baselines

### workshop — _(no ID)_

Group facilitation guides and synthesis — group reality-checking and alignment. Its Event Storming
mode is the canonical bridge into Domain (boundary discovery → bounded contexts).

- **Minting skill:** `discovery-workshop` · **Layout:** one-per-artefact · **Path:** `docs/discovery/workshops/`
- **Mints:** nothing · **Out (advisory):** aligns vision, canvas, value-stream, capability-map, objective; **event storming →** bounded_context boundaries

## Boundary relationships

Discovery is all out-ports (it feeds downstream and mints no incoming dependency). Only
`GRADUATES_TO` is a typed edge; the rest are advisory evidence flows.

| Verb | Source → Target | Card. | Strength | Neighbour package | Meaning |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `GRADUATES_TO` | idea → persona/objective/canvas/process/research/adr/fbs/prd | N:0..1 | soft | many | An idea matures into a downstream artefact (one-way; no back-FK) |
| validates | research → persona/canvas/value_stream/quantitative_model/objective | N:M | soft | Business Architecture | Interview synthesis upgrades `Assumed` claims |
| aligns | workshop → vision/canvas/value_stream/capability/objective | N:M | soft | Business Architecture | Group consensus before lock-in |
| event storming | workshop → bounded_context | N:M | soft | Domain | Event Storming surfaces context boundaries |

---

*Relationship verbs are the canonical types clew stores in `artefact_references.relationship`. Full
catalogue: [`../relationships.md`](../README.md#how-to-read-this-section) (forthcoming).*
