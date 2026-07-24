---
type: Competitor Profile
title: Strategy Canvas / Value Curve — clew
description: Strategy canvas / value curve showing how the industry competes across the factors of competition and where clew's target state sits versus Tier-1 competitors.
tags: [business, competitive-landscape, value-curve]
timestamp: 2026-07-21T10:13:21Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | parent: cl-01-five-forces.md -->

# Strategy Canvas / Value Curve — clew

Per Kim & Mauborgne's *Blue Ocean Strategy*: how the industry competes across the factors of
competition, and where clew (target state — pre-product) sits vs Tier-1 competitors. Factor
scores condense the R1–R6 verdicts of the
[full-replacement scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md)
(2026-07-21). clew's curve is its **designed** position, not shipped reality — flagged
Assumed until dogfooding validates it.

---

## Factors of competition (horizontal axis)

1. **Metamodel breadth** — how much of strategy → market → specs → domain → decisions one
   connected model holds (scan R1).
2. **Integrity enforcement** — typed relationships validated at write time; rename/refactor
   impact surfaced (R2).
3. **Deterministic traceability** — cross-artefact queries answered reproducibly, with
   stable tool-minted IDs (R2+R3).
4. **Local-first markdown/git posture** — artefacts readable and diffable without the tool
   (R4).
5. **Agent-native economics** — agents author/read artefacts directly at zero marginal token
   cost (R5).
6. **Methodology depth** — practitioner discipline (BIZBOK/BABOK/Strategyzer/Sommerville)
   embedded in the authoring path.
7. **Distribution & maturity** — stars, installed base, ecosystem, years of hardening.

## Value curves (Low / Medium / High per factor)

| Factor | clew (target) | Sphinx-Needs | basic-memory | Spec Kit | Sparx EA | SARA |
|---|---|---|---|---|---|---|
| 1 Metamodel breadth | **High** | Med (BYO types) | Low (generic) | Low | **High** | Med (BYO schema; arch+reqs scope) |
| 2 Integrity enforcement | **High** | Med-High (build-time) | Low | Low | Med (in-model) | Med-High (validate-time) |
| 3 Deterministic traceability | **High** | Med | Low | Low | High | Med-High (queries, matrices, diff) |
| 4 Local-first markdown/git | **High** | Med (RST build) | **High** | **High** | Low | **High** |
| 5 Agent-native economics | **High** | Low | **High** | **High** | Low-Med (MCP) | Med (plain files, no agent surface) |
| 6 Methodology depth | **High** | Low | Low | Low-Med (constitution) | Med (notations, not practice) | Low |
| 7 Distribution & maturity | **Low** | Med-High | Med | **High** | High | **Low** (new, Jan 2026) |

```text
        F1      F2      F3      F4      F5      F6      F7
High  ──★───────★───────★───────★●──────★●──────★───────────     ★ clew (target)
Med   ──▲───────▲───────▲───────▲───────────────────────▲●──     ▲ Sphinx-Needs
Low   ──●───────●───────●───────────────▲───────▲●──────★───     ● basic-memory
```

*(ASCII indicative for 3 of the 5 curves — the table above is authoritative.)*

The pattern: **every competitor is High on some factors and structurally Low on others; only
clew's designed curve is High on F1–F6 simultaneously — and alone at Low on F7.** That last
cell is the honest cost of the position.

**2026-07 wave note:** SARA's curve is the most clew-shaped yet (Med to Med-High across
F1–F4 with F4 High) — but it plateaus at Med on the factors clew must own (breadth,
write-time enforcement, methodology, agent surface) and shares clew's F7 weakness without
clew's differentiation. The differentiating gap is now clearly F1+F2+F6 *together*: full
product-architecture scope, write-time (not validate-time) integrity, and embedded
methodology.

**2026-07-24 reconciliation note:** F1's High (designed) score is delivered as **opt-in layer packages over a minimal mandatory core** — breadth a repo enables type-by-type under the same full write-time enforcement as the core, never a maximal mandatory model. The designed High-breadth curve and ADR-0013's minimal-model stance are therefore no longer in tension: the mandatory model stays minimal, the curve's breadth is the opt-in ceiling ([ADR-0014 — Product Architecture Management positioning](../../architecture/decisions/adr-0014-product-architecture-management-positioning.md) · [ADR-0015 — opt-in layer packages](../../architecture/decisions/adr-0015-opt-in-layer-packages.md)).

---

## Four Actions Framework

### 1. Eliminate

- **GUI diagram/modeling editing** — the EA groups' table-stakes factor; clew's consumers
  are agents and readers of markdown, not diagram authors. Views can be *generated*.
- **Cloud collaboration / multi-writer** — deliberately excluded (VISION "What We Are NOT");
  the platforms' biggest cost center, irrelevant to single-writer repos.

### 2. Reduce

- **Per-feature spec-workflow ceremony** — don't out-Spec-Kit Spec Kit; interoperate (their
  artefacts graduate into the graph) instead of owning that workflow.
- **Export/report format breadth** (PDF/ReqIF/HTML suites) — markdown-in-repo is the
  deliverable; other formats only when a consumer instance exists (VS-4 is Tier-2).

### 3. Raise

- **Write-time integrity** — the factor *every* group under-serves (build-time at best,
  convention at worst); clew's PR-2/PR-3 answer. Raise far above industry standard.
- **Deterministic IDs + replayable audit** — only StrictDoc treats this seriously, and only
  for requirements.
- **Agent read/write economics** — zero-marginal-cost file access as a measured, marketed
  number vs MCP round-trips (Lean Canvas §9 token-economics advantage).

### 4. Create

- **Methodology-as-skills** — practitioner discipline (personas, canvases, value streams,
  DDD, ADRs) applied *at authoring time* by the agent via the kit's skill catalogue; no
  group offers embedded practice, only formats or notations.
- **The architecture-anchored substrate** — a persistent, enforced, queryable product memory
  spanning strategy → implementation as a *named factor of competition* (extending
  Böckeler's spec-anchored level above code): defining the factor is itself the blue-ocean
  move.

---

## Headline blue-ocean opportunity

The industry forces a choice between structure (RM/EA groups) and agent-native local-first
posture (SDD/memory groups). The white space is refusing that trade-off: enforced, broad,
methodology-laden product memory that lives as markdown in git and costs agents nothing to
read. No 2026-07-21 competitor curve crosses F1–F6 High together; the position is open.

## Strategic implications

- Roadmap priority mirrors the Raise/Create lists: write-time enforcement + ID/audit
  substrate first (they're hardest to retrofit and least served), methodology skills as the
  compounding content moat.
- F7 (distribution) is the conceded factor — offset via the Spec Kit/BMAD interop wedge and
  the basic-memory positioning foil rather than head-on competition.
- All clew scores are design intent: validate F1–F6 High claims during dogfooding
  ([Lean Canvas OI-0002](../02a-lean-canvas.md)) before using this canvas externally.

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-21 | Initial draft from discovery scan R1–R6 verdicts | Victor Hueni (agent-drafted) |
| 2026-07-21 | 2026-07 wave: SARA column added (most clew-shaped competitor curve; plateaus at Med on F1/F2/F6); wave note on the differentiating gap | Victor Hueni (agent-drafted) |
| 2026-07-24 | Reconciliation note: F1 High (designed) breadth is delivered as opt-in layer packages over the minimal mandatory core (ADR-0014/ADR-0015); no tension with ADR-0013. Scores unchanged | Victor Hueni (agent-drafted) |
