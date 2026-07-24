---
type: Product Vision
title: clew — Product Vision
description: "Product architecture management for AI-native builders and small teams: every strategic and architectural artefact persisted in an opinionated, referentially-enforced metamodel."
tags: [vision, strategy, product-intent]
timestamp: 2026-05-24T08:31:53Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# VISION

> *A clew is the corner of a sail you pull to steer, and the thread that guides you through the labyrinth.*

## The Elevator Pitch

For **AI-native builders and small teams who build with agents as primary co-authors**, who need their full product thinking (business architecture, market intelligence, product specs, domain, and requirements) to stay coherent at agent-speed, **clew** is **product architecture management** ([ADR-0014](architecture/decisions/adr-0014-product-architecture-management-positioning.md)) — the **product intelligence and architectural memory layer** that persists every strategic and architectural artefact in an opinionated, referentially-enforced metamodel. Unlike project management tools, which track *what's in progress* and lose the thinking behind it, **we** manage *what must be true*: every artefact, from VISION down to Implementation Plan, traceable end-to-end and surviving every refactor.

**In one line:** clew is the product-intent contract an agent must satisfy before it changes code — *agents write prose, only clew creates facts.* The wedge is deliberately narrow: a **minimal mandatory** enforceable graph of product intent kept in **perfect sync** with the repo, not an exhaustive model ([ADR-0013](architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md)) — coverage beyond the core grows only per-repo, through opt-in layer packages under the same write-time guarantee ([ADR-0015](architecture/decisions/adr-0015-opt-in-layer-packages.md)).

## The Problem We Solve

Engineers building with agents generate strategy, market intelligence, requirements, and architectural decisions faster than markdown or tickets can hold together. Teams reach for project management tools because that is where structure lives, but PM tools track delivery, not thinking. Personas get reduced to labels, ADRs vanish into commits, competitive analysis dies in unread docs, and the product's *why*, *who-for*, and *how-it-must-be-true* exist only in whatever the agent last remembered.

## The World We're Building

Every product has a queryable, agent-native memory of its full architecture, where strategy is as legible as code and survives every refactor.

## What We Are NOT

- **Not a project or ticketing tool**: we manage *what must be true*, not *what's in progress*. Delivery accounting belongs elsewhere.
- **Not five disconnected tools**: strategy, market, requirements, and domain live in one connected graph.
- **Not a cloud SaaS**: the repo is the source of truth.
- **Not a multi-user collaboration platform**: single-writer per repo, by design.
- **Not a generic knowledge-graph framework**: the metamodel is opinionated and complete.
- **Not an enterprise-architecture modelling platform** (Ardoq, BiZZdesign, LeanIX): we enforce the *minimal mandatory* contract of product intent inside the delivery loop, not an exhaustive model above it. What we reject is the EA tool shape — maximal mandatory model, hand-maintained sync, GUI modelling for a procurement-shaped buyer — not layered coverage: multi-layer coverage is available as **opt-in layer packages** under full write-time enforcement, so every artefact a repo enforces is drift surface that repo chose ([ADR-0013](architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md), amended by [ADR-0014](architecture/decisions/adr-0014-product-architecture-management-positioning.md) and [ADR-0015](architecture/decisions/adr-0015-opt-in-layer-packages.md)).

## North Star Metric

**End-to-end traceability across the architecture**: the share of artefacts that resolve cleanly through their declared relationships, from VISION to Implementation Plan, without broken links.

## Linked Artefacts

- **Personas**: [P-01 Ava, agent-first product engineer](business/01a-personas.md) (mandatory core) and [P-03 Arno, AI-augmented architect-builder](business/01a-personas.md) (opt-in layer packages).
- **Objectives**: [OBJ-01, OBJ-02, OBJ-03](business/04b-objectives.md).
- **Value propositions**: [Lean Canvas UVP](business/02a-lean-canvas.md).
- **Scope & positioning**: [ADR-0014 — Product Architecture Management positioning](architecture/decisions/adr-0014-product-architecture-management-positioning.md) and [ADR-0015 — opt-in layer packages](architecture/decisions/adr-0015-opt-in-layer-packages.md) (current), amending [ADR-0013 — minimal-model / perfect-sync, not repo-native EA](architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md); grounded in the [2026-07-07 competitive landscape](discovery/competitive-landscape-2026-07-07-agentic-architecture-tools.md) and the [2026-07-21 replacement scan](discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md), whose conclusion — the prior framing occupied from four angles in a single quarter — drove the reposition.

## Changelog

- 2026-05-24 · Initial vision · Repo seeded with metamodel design (ADR-0001).
- 2026-05-24 · Reposition · Framed as agent-native requirements management (RM lineage), distinct from project management.
- 2026-05-24 · Broaden · Five-pillar scope: business architecture, market intelligence, product specs, domain, requirements.
- 2026-05-24 · Link · P-01, OBJ-01/02/03, and Lean Canvas added to Linked Artefacts.
- 2026-07-07 · Scope · Added the "only clew creates facts" one-liner and a "Not an EA modelling platform" guardrail; positioning pinned to ADR-0013 (minimal-model / perfect-sync) after the competitive scan showed write-side primitives are table stakes and the EA reframe would worsen the persona↔rigor gap.
- 2026-07-24 · Reposition · Public category set to "Product Architecture Management for AI-native builders and small teams" (ADR-0014); audience widened to cover P-01 Ava and the newly minted P-03 Arno; wedge sentence gains the minimal-mandatory + opt-in-layer-packages nuance (ADR-0015); NOT-EA bullet updated (the rejection is of the EA tool shape, not of layered coverage); Linked Artefacts gain P-03, ADR-0014/0015, and the 2026-07-21 replacement scan.
