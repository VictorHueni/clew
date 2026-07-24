<!-- OKF reserved sub-folder index (docs/product-specs/use-cases/index.md): a directory
     listing, not an artefact concept document — frontmatter-free per
     the `metamodel` skill's `references/artefact-frontmatter.md` §Reserved files. The registry is the body below. -->

# clew — Use Case Registry

The registry of use cases for clew. Each row points to one `uc-NN-{slug}.md` file. A use case is the **actor↔system behavioural scenario** (all paths + guarantees) — it realises FBS functionalities and grounds PRDs; it is not a user story, an FBS row, or a UI spec.

Methodology (kit-only): `spec-use-case/references/methodology.md` — Cockburn textual use cases + UML diagrams + Jacobson Use-Case 2.0.

**Levels:** 🌊 user-goal (default) · ☁🪁 summary · 🐟🦪 subfunction. **Status:** ⬜ draft · 🔄 in progress · ✅ stable.

> **Layout note.** Files live **flat** in this folder, matching the clew-owned registry's canonical `default_path` (`use-cases/uc-{nn}-{slug}.md`) — the kit skill's capability-subfolder layout is a projection this repo does not adopt, since clew's own layout enforcement (C2.3.F03, [ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md)/[ADR-0008](../../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md)) will hold artefacts to the registry path. The registry below still groups rows by capability for navigation.

## Use Cases by capability

### C2.1 · Stable identifier generation (`id-generation`)

| ID | Use case (goal) | Level | Scope | Primary actor | Realises (FBS) | Status |
|---|---|---|---|---|---|---|
| [UC-01](uc-01-persist-artefact-with-write-time-integrity.md) | Persist a new artefact with write-time integrity | 🌊 | system | [P-01](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) | C2.1.F02–F03 · C2.2.F01–F04 · C2.3.F01–F03 · C4.1.F01/F03 · C5.4.F01 | ⬜ |

### Planned (not yet authored)

Queued per the [pre-PRD use-case prioritisation](../../plans/delivery-roadmap.md): UC-02 Refactor an artefact with foreseen impact (VS-3.2) · UC-03 Detect and reconcile drift after out-of-band edits (VS-2.4) · UC-04 Link two artefacts with a typed, validated relationship (VS-1.4) · UC-05 Rebuild the store deterministically from snapshot (VS-4.1) · UC-06+ with E-02's PRD (query, context) · brownfield adoption at dogfood start.

## Actor / use-case overview (optional)

```mermaid
flowchart LR
  ava["P-01 Ava (agent as executor)"]
  uc1(["UC-01 Persist a new artefact with write-time integrity"])
  ava --> uc1
```
