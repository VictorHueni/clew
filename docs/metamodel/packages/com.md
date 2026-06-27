---
title: Metamodel — Communication (Supporting Package)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Communication Package — _supporting_

> Part of [The Metamodel](../README.md) → **Supporting packages**. Prefix `com-` → `docs/communication/`.

> **Tooling, not a metamodel artefact.** These skills mint no IDs and hold no typed relationships.
> They **render the metamodel** into presentation surfaces — a regenerable read-out, never a source
> of truth. Delete the output and re-run; the artefacts it read remain authoritative.

The **presentation layer.** It turns metamodel artefacts into things people look at — slide decks and
single-file interactive HTML views — theming everything from the `ux-` design system's token contract
([`tokens.css`](ux.md)). Outputs are derived: a capability-map visualisation or a deck reflects the
artefacts at render time and is rebuilt when they change.

## Skills

| Skill | Output | What it does |
| :-- | :-- | :-- |
| `com-slide-deck` | `docs/communication/slides/{slug}/` | Build single-file HTML slide presentations from modular partials + a shared design system + a Python build pipeline (`build.py` stitches, `render.py` exports PDF). Layers tokens: shipped fallback → `docs/ux/tokens.css` → deck `styles.css`. One folder per deck. |
| `com-artefact-viz` | `docs/communication/visualisations/{kind}.html` | Render canonical artefacts into self-contained interactive HTML via a shared parse→model→render pipeline (Python stdlib only), token-driven. Five pluggable renderers (below). |

### `com-artefact-viz` renderers

| `--kind` | Renders | Reads from |
| :-- | :-- | :-- |
| `capability-map` | L0-grouped cards + directional left-axis band | capability map (`C-N.M`) |
| `delivery-roadmap` | Phase-column timeline + walking-skeleton band + expandable per-epic features | delivery roadmap (`E-NN`) |
| `fbs` | Collapsible tree (horizontal/vertical toggle) + status badges | FBS (`C-N.M.FXX`) |
| `bmc` | Business Model / Lean Canvas 9-block grid | model canvas |
| `service-blueprint` | Swimlane grid (actor lanes × steps, line of visibility) — front/back-stage | **composition** over `business-process` + `business-value-stream` + `business-persona` |

> **Where the service blueprint lives.** It is a `com-artefact-viz` *renderer*, not a standalone
> `ux-service-blueprint` skill — the kit found ~80% overlap with `business-process` and shipped it as
> a composition lens (kit [OI-0025 / #29](https://github.com/VictorHueni/homemade-claude-kit/issues/29)).
> See [ux.md → Experience artefacts](ux.md#experience-artefacts--where-they-live).

## Relation to the metamodel

`com-` is a **pure consumer**: every renderer reads metamodel artefacts and emits a view; none mint,
own, or feed back an artefact. It depends *outward* on two things — the source artefacts (the data) and
`ux-design-system`'s `tokens.css` (the theme). The dependency chain is one-way:
**metamodel artefacts → `ux-` themes them → `com-` renders them.** Because the output is regenerable, it
is deliberately *not* part of the governed artefact set the audit sweeps.
