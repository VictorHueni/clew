---
title: Metamodel — UX (Supporting Package)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# UX Package — _supporting_

> Part of [The Metamodel](../README.md) → **Supporting packages**. Prefix `ux-` → `docs/ux/`.

> **Tooling, not a metamodel artefact.** This package mints no IDs, holds no typed relationships,
> and appears in no registry. It is described here for completeness because it is a real kit prefix
> with a `docs/` home — but it sits *outside* the metamodel dependency graph.

The **design + experience layer.** It authors the project's single visual source of truth and
generates the token contract every communication artefact themes from. Cross-cutting foundation:
scaffold it any time before producing slide decks or artefact visualisations.

## Skills

| Skill | Output | What it does |
| :-- | :-- | :-- |
| `ux-design-system` | `docs/ux/design-system.md` + `docs/ux/tokens.css` | Authors the brand rationale + token tables once, then generates `tokens.css` — the canonical `:root` variable contract the `com-` presentation layer consumes (`var(--token)` only, never hard-coded colour/font/radius). Modes: scaffold, generate/refresh. Adapts Anthropic's `brand-guidelines` pattern, kept domain-agnostic. |

## Relation to the metamodel

`ux-design-system` produces no governed artefact and carries no FK to anything in the graph — it is a
**foundation the presentation layer stands on**. Its `tokens.css` is consumed downstream by the
**`com-`** packages (`com-slide-deck`, `com-artefact-viz`), which render metamodel artefacts into
slides and interactive HTML. So the dependency runs *one way and outward*: metamodel artefacts are the
source data; `ux-` themes how they look; `com-` renders them. None of it feeds back into the model.

## Experience artefacts — where they live

The `ux-` prefix is the *design **and** experience* layer, so you might expect service blueprints and
customer-journey maps here. Both were considered for `ux-` and **deliberately placed elsewhere** — so
`ux-` ships only `ux-design-system` today, with no standalone `ux-*` experience skill planned.

| Experience artefact | Actually lives in | Why not a `ux-` skill |
| :-- | :-- | :-- |
| **Service blueprint** | `com-artefact-viz --kind service-blueprint` (Communication) | Scoped as `ux-service-blueprint` but found ~80% overlap with `business-process`; shipped as a composition **renderer** over process + value-stream + persona. Mints no IDs. (kit [OI-0025 / #29](https://github.com/VictorHueni/homemade-claude-kit/issues/29)) |
| **Customer journey map** | `business-customer-journey-map` — Business Architecture, *planned* | Filed under BIZBOK business architecture; mints `CJ-N.M`. (kit [#9](https://github.com/VictorHueni/homemade-claude-kit/issues/9)) |

Both are experience views *derived from* business artefacts — which is why the kit keeps their source in
`business-`/`com-` rather than minting a parallel `ux-` artefact.
