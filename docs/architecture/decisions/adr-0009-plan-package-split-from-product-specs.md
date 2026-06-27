---
title: Build-planning artefacts move to a `plan-` package, split from Product Specs
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Build-planning artefacts move to a `plan-` package, split from Product Specs

## Context and Problem Statement

The `spec-` package (Product Specs) conflates two different fact-classes:

- **Product specification** — *what must be true about the product*: FBS, quality attributes, use
  cases, PRDs.
- **Build planning** — *how and in what order we build it*: the delivery roadmap (epics, phases,
  walking skeleton) and the implementation plans (atomic increments).

These are different concerns with different audiences and cadences. Bundling the planning artefacts
under `spec-` blurs the package and sits awkwardly next to the [VISION](../../VISION.md), which states
clew is **not** a delivery/ticketing tool. The planning artefacts are best understood as *specifications
of intended build sequence* — still "what must be true", but about the **plan**, not the product.

Question: **where do the delivery roadmap and implementation plans belong?**

## Decision Drivers

- Keep packages mapped 1:1 to a single, coherent discipline.
- Keep these artefacts on the "what must be true" side (a plan is a spec of sequence), not "delivery
  tracking" — honouring the VISION boundary.
- Minimal disruption: artefact **types** and **IDs** should not change, only the package/skill/path.
- clew is the metamodel SoT ([ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md)) — this
  decision originates here and propagates to the kit.

## Considered Options

- **A. Keep them in `spec-`.** Status quo; the package keeps mixing product spec + planning.
- **B. `plan-` (chosen).** A new Planning package for build-planning artefacts.
- **C. `delivery-`.** Reads naturally for "delivery roadmap" but brushes against the VISION's
  "delivery accounting belongs elsewhere".
- **D. `exec-`.** Matches the existing `docs/exec-plans/` folder, but "execution" implies *doing*,
  whereas a roadmap is planning.

## Decision Outcome

**Chosen: B — a `plan-` (Planning) package.** It names the discipline precisely (build/technical
planning), keeps the artefacts as sequence *specifications* rather than delivery tracking, and is the
cleanest split from product specification.

| Was | Becomes | Mints (unchanged) | Path |
| :-- | :-- | :-- | :-- |
| `spec-delivery-roadmap` | `plan-delivery-roadmap` | `epic` (`E-NN`) | `docs/plans/delivery-roadmap.md` |
| `spec-implementation-plan` | `plan-implementation` | `implementation_plan` (`Plan-NNNN`) | `docs/plans/active/{nnnn}_exec_{slug}.md` |

- **Artefact types and IDs are unchanged** (`epic` / `E-NN`, `implementation_plan` / `Plan-NNNN`); only
  the minting skill name, package, and default path move.
- The planned `spec-release-plan` (kit [#15](https://github.com/VictorHueni/homemade-claude-kit/issues/15))
  becomes `plan-release`.
- Product Specs is left as pure product specification (FBS, quality attributes, use cases, PRDs).
- Cross-package coupling is expected and fine: `epic GROUPS fbs_functionality` and
  `epic SPECIFIES prd` now cross Planning → Product Specs; `prd DETAILS implementation_plan` crosses
  Product Specs → Planning. The relationships themselves are unchanged.

This takes the metamodel package taxonomy from 7 to **8**.

## Consequences

**Positive** — Product Specs and Planning each become single-discipline packages; the VISION boundary
("not a delivery tool") is reinforced; artefact IDs are untouched so no instance re-mint is required.

**Negative / cascade** — as the SoT change, this must propagate to the kit (rename two skills, update
`artefact-types-registry.md` rows + `metamodel.md` build-order/paths, and migrate any
`docs/product-specs/08a-*` / `docs/exec-plans/` instance files to `docs/plans/`). Tracked below.

## Related decisions

- **Exercises** [ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md) — clew defines the
  structural taxonomy; the kit conforms downstream.

## Open Items

| OI-ID  | Type           | Summary                                                                                              | Source anchor      | Source heading      | Resolution path                                                                                   | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :--------------------------------------------------------------------------------------------------- | :----------------- | :------------------ | :------------------------------------------------------------------------------------------------ | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0034 | doc-gap        | Apply the `plan-` package across clew's metamodel docs (planning.md, product-specs.md, README, slide, flowchart). | #decision-outcome  | Decision Outcome    | This change.                                                                                       | high     | closed | Victor Hueni | 2026-06-27        | This commit |
| OI-0035 | execution-item | Kit cascade — rename `spec-delivery-roadmap`→`plan-delivery-roadmap`, `spec-implementation-plan`→`plan-implementation`; update `artefact-types-registry.md` + `metamodel.md`; migrate instance paths to `docs/plans/`. | #consequences      | Consequences        | Kit-side PR (manual, ahead of `clew metamodel export`). | medium   | in-progress | Victor Hueni | 2026-09-30        | [kit PR #51](https://github.com/VictorHueni/homemade-claude-kit/pull/51) — full cascade (33 files); closes on merge |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-06-27 | Initial draft. Split build-planning (`delivery-roadmap`, `implementation-plan`) out of `spec-` into a new `plan-` package; artefact types/IDs unchanged. Exercises ADR-0008 (clew as SoT); kit cascade tracked as OI-0035. | Victor Hueni |
