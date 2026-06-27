---
title: Metamodel — Architecture Package
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Architecture Package

> Part of [The Metamodel](../README.md). Prefix `arch-` → `docs/architecture/`.

The **technical-decision and external-surface layer.** It records the decisions (ADRs) and the
research that informs them, defines the contracts the system exposes (service/API and CLI), and
produces the C4/arc42/UML **views** of the rest of the metamodel. ADRs are not in the linear build
chain but gate Quality Attributes and PRDs whose decisions they settle.

## Zoom

Red nodes are inside Architecture; faded dashed nodes are neighbours. `UPPERCASE` edges are typed
relationships clew enforces.

```mermaid
flowchart TD
    classDef arch fill:#FEE2E2,stroke:#EF4444,color:#7F1D1D
    classDef ext  fill:#ffffff,stroke:#cbd5e1,color:#94a3b8,stroke-dasharray:3 3

    DM["domain-model · AGG/EVT"]:::ext
    FBS["FBS · C-N.M.FXX"]:::ext
    QA["quality-attribute · QA-XXNN"]:::ext
    PRD["PRD-NNNN"]:::ext

    subgraph ARCH["Architecture"]
        RES["research · Research-NNNN"]:::arch
        ADR["adr · ADR-NNNN"]:::arch
        CTR["interface-contract · BC-NN.CTR-NN"]:::arch
        CLI["cli-surface · CLI-NN · CMD-NN"]:::arch
        DIAG["C4 / arc42 / UML views"]:::arch
    end

    RES -->|"informs"| ADR
    ADR -->|"GOVERNS"| CTR
    ADR -->|"DECIDES"| CLI
    CLI -->|"CONTAINS"| CLI
    CLI -->|"WRAPS"| CTR
    DIAG -->|"visualise"| ADR

    DM -->|"EXPOSES"| CTR
    FBS -->|"MAPS_TO (← cmd)"| CLI
    ADR -->|"DECIDES"| QA
    ADR -->|"DECIDES"| PRD
```

> `CONTAINS` is drawn as a self-loop on cli-surface because CLI commands (`CLI-NN.CMD-NN`) are
> sub-elements of the surface, not a separate node. The C4/arc42/UML node represents diagram
> producers — they mint diagram IDs (`SYS/CON/CMP/DN-NN`, `SCN/CST/CC/RSK-NN`) but are **derived
> views**, deliberately outside the persisted relationship set.

## Artefacts in this package

### research · `Research-NNNN`
Architecture research notes that inform ADR decisions; lifecycle Draft → Active → Frozen → Superseded.
- **Skill:** `arch-research` · **Layout:** one-per-artefact · **Path:** `docs/architecture/research/{nnnn}-{slug}.md`

### adr · `ADR-NNNN`
An Architecture Decision Record (MADR). Gates Quality Attributes (security/flexibility/maintainability) and the PRDs whose choices it settles; governs contract versioning/auth.
- **Skill:** `arch-adr` · **Layout:** one-per-artefact · **Path:** `docs/architecture/decisions/adr-{nnnn}-{slug}.md` · **Frontmatter:** `supersedes`/`superseded_by`

### interface_contract · `BC-NN.CTR-NN`
The external API + async surface per bounded context — REST resources + domain-event topics, error contract, versioning, security.
- **Skill:** `arch-service-contract` · **Layout:** one-per-artefact · **Path:** `docs/architecture/interfaces/{bc-slug}.md`

### cli_surface · `CLI-NN` (+ `cli_command CLI-NN.CMD-NN`)
The CLI command tree — flags, exit codes, output contract — when the product exposes a CLI.
- **Skill:** `arch-cli-contract` · **Layout:** one-per-artefact · **Path:** `docs/architecture/interfaces/cli-{slug}.md`

### C4 / arc42 / UML views — _(diagram IDs only; derived)_
C4 (`arch-c4`/`arch-structurizr`), arc42 narrative (`arch-arc42`), UML (`arch-uml`/`arch-plantuml`). They **visualise** IDs owned elsewhere; they author no persisted relationships.
- **Paths:** `docs/architecture/c4/`, `docs/architecture/arc42/`, `docs/architecture/diagrams/`

## Boundary relationships

| Verb | Source → Target | Card. | Strength | Neighbour package | Meaning |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `EXPOSES` | domain_model → interface_contract | N:M | hard | Domain | Aggregates/events become contract resources |
| `MAPS_TO` | cli_command → fbs_functionality | N:M | hard | Product Specs | CLI commands map to functionalities |
| `DECIDES` | adr → quality_attribute | N:M | soft | Product Specs | ADR decisions inform Security/Flexibility QAs |
| `DECIDES` | adr → prd | N:M | soft | Product Specs | ADR decisions inform PRD architecture |
| `GOVERNS` | adr → interface_contract | N:M | soft | _(intra)_ | ADR governs contract versioning/auth |
| references | interface_contract / cli_command → prd | N:M | soft | Product Specs | PRD acceptance criteria reference CTR/CMD IDs |

---

*Relationship verbs are the canonical types clew stores in `artefact_references.relationship`. Full
catalogue: [`../relationships.md`](../README.md#how-to-read-this-section) (forthcoming).*
