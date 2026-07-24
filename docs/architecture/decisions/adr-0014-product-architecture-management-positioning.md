---
type: Architecture Decision Record
title: Public category — Product Architecture Management for AI-native builders and small teams
description: Adopts "Product Architecture Management" as clew's public category with the integrity-layer pitch, widens the audience wording, and confines "repo-scale EA" to internal use — amending ADR-0013's positioning clauses.
tags: [positioning, category, product-architecture-management, adr]
timestamp: 2026-07-24T17:05:00Z
status: active
owner: Victor Hueni
last_reviewed: 2026-07-24
review_interval: 180d
---

# Public category — Product Architecture Management for AI-native builders and small teams

## Context and Problem Statement

[ADR-0013 — clew is minimal-model / perfect-sync, not repo-native enterprise architecture](adr-0013-minimal-model-not-repo-native-ea.md) settled what clew is *not* — no maximal EA model, no "repo-native EA" in public positioning — but left the public category question open. Three developments since force it closed:

1. **The prior framing is no longer available.** The [2026-07-21 replacement scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) concluded that "git-native traceability for agents" was occupied from four angles within a single quarter (SARA, Reqord, RTMX, OpenLore). Keeping the current framing means competing for a position that is already gone; the empty position on both strategic-group maps ([cl-02 — strategic group map](../../business/01b-competitive-landscape/cl-02-strategic-group-map.md)) is the product-architecture layer.
2. **The founder's repositioning thesis is captured and assessed.** [IDEA-0001 — Reposition clew as the product-architecture integrity layer](../../discovery/ideation/IDEA-0001-product-architecture-integrity-repositioning.md) proposes "Product Architecture Management" as the category and *"agents write prose, only clew creates facts"* as the core guarantee, with an agent assessment flagging four caveats (scope discipline, deterministic guard, layer positioning vs OpenLore, moat honesty).
3. **The depth persona is no longer hypothetical.** The cartography prototype (external: `swiss-aos-drug-reimbursement-model/docs/architecture/cartography/`, Plans 0138/0139) shows an EA-literate, AI-augmented builder modelling five domains at small-company scale — empirical evidence that an audience deeper than [P-01 Ava](../../business/01a-personas.md) exists and reaches for exactly this class of tool.

The question this ADR decides: **what public category does clew claim, for which audience, and what happens to ADR-0013's "repo-native EA" ban?** Decided in the [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) (D4, with D5's audience implications); this ADR is the record. It resolves OI-0066 (ledger closure handled in the open-items pass).

## Decision Drivers

- **The old position is occupied.** Post-2026-07-21, "git-native traceability for agents" reads as one of five entrants, not a category of one; clew needs a claim the wave did not take.
- **The category must not summon the wrong buyer.** ADR-0013's core hazard stands: an open EA category invites the procurement-shaped enterprise-governance buyer that clew's local-first, single-writer architecture ([ADR-0001 — persistence layer](adr-0001-metamodel-persistence-layer.md)) cannot serve, and frames clew as a derivative of Ardoq/BiZZdesign rather than a new thing.
- **The audience wording must cover both personas.** The two-persona model (D5) keeps P-01 Ava on the mandatory core and mints an architect-builder persona for depth; "AI-native product engineers" is too narrow to name both.
- **The pitch must be enforceable, not aspirational.** "Agents write prose, only clew creates facts" is only honest if the guard stays deterministic ([ADR-0016 — two-speed integrity](adr-0016-two-speed-integrity-edge-property-bag.md)) and the model stays in sync ([ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md)).
- **IDEA-0001's caveats bind.** The public-protocol/ecosystem pillar stays deferred (ADR-0013's sequencing guard: standards are earned by adoption, not declared at N=1), and no LLM-inferred judgment enters the integrity hot path.

## Considered Options

- **A. Product Architecture Management for AI-native builders and small teams (chosen).** Claim a new category at the product layer, pitched as the integrity layer; widen the audience wording; keep "repo-scale EA" internal.
- **B. Open EA category ("repo-scale EA" / "Ardoq for agents" public).** Names the shape accurately and rides existing EA vocabulary — but invites the procurement-shaped enterprise buyer the architecture cannot serve, and frames clew as a derivative of the incumbents it is structurally the inverse of (ADR-0013's original rationale for the ban, unchanged).
- **C. Keep current framing ("AI-native product engineers" / product intelligence and architectural memory).** Zero repositioning cost — but untenable post-2026-07-21: the wave occupied the adjacent traceability framing from four angles, and the current wording neither claims the empty product-architecture position nor names the architect-builder audience the prototype evidences.

## Decision Outcome

Chosen option: **A (Product Architecture Management for AI-native builders and small teams).**

- **Public category** (canonical wording): **"Product Architecture Management for AI-native builders and small teams."**
- **Pitch:** clew is the **integrity layer** — *"agents write prose, only clew creates facts."* The category names the layer (product architecture, not code architecture, not delivery); the pitch names the guarantee.
- **Audience:** widened from "AI-native product engineers" to **"AI-native builders and small teams"** — wide enough to cover both P-01 Ava (mandatory core) and the architect-builder persona (layer packages), per D5.
- **"Repo-scale EA" is internal-only.** ADR-0013's ban **survives on the term, dies on the substance**: the phrase remains banned from public positioning (derivative frame, wrong buyer), but the substance — multi-layer coverage at repo scale — is now sanctioned as opt-in product scope via [ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md). Internally the metaphor stays useful design shorthand.
- **IDEA-0001 is adopted with amendments:** the category language and integrity-layer pitch graduate; the public-protocol/ecosystem pillar **stays deferred** (ADR-0013's sequencing guard holds — a v3+ consequence of winning, not a v0.1 move); the guard **stays deterministic** (invariant recorded in [ADR-0016](adr-0016-two-speed-integrity-edge-property-bag.md)).
- **Amendment scope:** this ADR amends ADR-0013's **positioning clauses only** — the no-public-reframe stance is replaced by the PAM category. ADR-0013's scope clauses (minimal mandatory model, out-of-scope cuts, read-side priority) are untouched here; they are amended separately and narrowly by ADR-0015.

### Positive Consequences

- clew claims the empty position both strategic-group maps show, instead of contesting an occupied one.
- The audience wording matches the two-persona model, so personas, canvas, and pitch stop pulling in different directions.
- The term-ban / substance-adoption split keeps the useful design intuition without the public liability: no derivative "EA for X" frame, no procurement-shaped buyer.
- OI-0066 is decided, which unblocks the OI-0071 reconciliation cascade (VISION · Lean Canvas · value curve · slide brief) with a single citable decision.

### Negative Consequences

- "Product Architecture Management" is a category clew must *teach* — there is no existing search demand or analyst definition to draft behind.
- "Small teams" widens the audience ahead of wave-2 evidence for the architect-builder; mitigated by D5's requirement that wave-2 interview at least one of each persona before layer packages reach the public roadmap.
- A term banned in public but alive internally is a discipline that must be actively policed in every outbound artefact (deck, README, canvas); this ADR is the citation but not self-executing.

## Related decisions

- [ADR-0013 — minimal-model / perfect-sync, not repo-native EA](adr-0013-minimal-model-not-repo-native-ea.md) — **amended** (positioning clauses only): the no-public-reframe stance is replaced by the PAM public category; the ban on "repo-native EA" as a public term is retained.
- [ADR-0015 — opt-in layer packages](adr-0015-opt-in-layer-packages.md) — companion decision from the same session; carries the *substance* side of the term-ban split (multi-layer coverage as opt-in scope) and amends ADR-0013's scope clause.
- [ADR-0016 — two-speed integrity: edge property bag and relationship review lifecycle](adr-0016-two-speed-integrity-edge-property-bag.md) — companion decision; operationalises the "only clew creates facts" pitch this category claim depends on.
- [IDEA-0001 — Reposition clew as the product-architecture integrity layer](../../discovery/ideation/IDEA-0001-product-architecture-integrity-repositioning.md) — **adopted with amendments** (protocol deferred, guard deterministic); this ADR is its graduation target for category naming.

## Dependent artefacts

| Concern | Where it lives |
|---|---|
| Elevator pitch + category language + audience wording | [VISION](../../VISION.md) |
| UVP ("only clew creates facts") + unfair-advantage wording | [Lean Canvas §3 / §9](../../business/02a-lean-canvas.md) |
| Value-curve breadth targets reconciled with the PAM claim | [cl-03 — value curve](../../business/01b-competitive-landscape/cl-03-value-curve.md) |
| Slide-deck category language ("Git for product architecture" close) | [Slide brief](../../communication/slides/agentic-harness-intro/context/brief.md) |
| Audience split: P-01 Ava (core) + architect-builder mint (layers) | [Personas](../../business/01a-personas.md) |
| Decision record (D4/D5 canonical wording) | [2026-07-24 grill-me session](../../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) |
| OI-0066 closure + OI-0071 cascade trigger | [Open-items ledger](../../../project-control/open-items/open-items.md) |
