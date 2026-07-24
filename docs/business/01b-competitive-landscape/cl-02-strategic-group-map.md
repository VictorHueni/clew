---
type: Competitor Profile
title: Strategic Group Map — clew competitive landscape
description: Strategic group map clustering competitors of persistent product-knowledge substrates for agent-first builders on two dimensions, with a second validation map.
tags: [business, competitive-landscape, strategic-groups]
timestamp: 2026-07-21T10:13:21Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | parent: cl-01-five-forces.md -->

# Strategic Group Map — persistent product-knowledge substrates for agent-first builders

Clusters competitors by similar strategic choices on 2 dimensions; a second validation map
on different dimensions guards against single-map artifacts. Members and placements derive
from the [full-replacement scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md)
(R1–R6 scoring, 2026-07-21).

---

## Map 1 — Primary view

**Dimension A (horizontal):** artefact scope breadth — per-feature implementation specs →
full product architecture (strategy + domain + requirements + decisions).
**Dimension B (vertical):** integrity enforcement — convention/prose → tool-enforced (typed
links, validation, IDs).

**Why these dimensions:** they are independent (breadth says *what* is held, enforcement
says *how reliably*) and they are the two halves of clew's R1+R2 core.

```text
Enforced ▲
         │  [Group B: Docs-as-code RM]      [Group C: EA modeling]
         │   Sphinx-Needs · StrictDoc        Sparx EA · Archi/coArchi
         │   Doorstop · ReqView · TRLC       Ardoq · LeanIX
         │                                          ★ CLEW (target)
         │
         │  [Group D: Agent memory]
         │   basic-memory · mem0 · Letta
         │
         │  [Group A: Spec-workflow]
         │   Spec Kit · BMAD · OpenSpec · Kiro
Convention└──────────────────────────────────────────────►
          Per-feature specs                Full product architecture
```

### Groups identified (Map 1)

| Group | Members | Shared strategic profile | Intra-group rivalry |
|---|---|---|---|
| **A: Spec-workflow tools** | Spec Kit, BMAD, OpenSpec, Kiro | Agent-first audience, per-feature markdown artefacts, convention-only discipline | **High** (fast-moving, feature-copying) |
| **B: Docs-as-code RM** | Sphinx-Needs, StrictDoc, Doorstop, ReqView, TRLC, **SARA, Reqord, RTMX** (2026-07 wave) | Requirements/architecture-scope typed graphs with validation; the wave adds agent-era posture to this group | **High** (wave raised entry tempo) |
| **C: EA modeling** | Sparx EA, Archi/coArchi, Ardoq, LeanIX | Strategy-to-technology typed metamodels, architect segment, model-repository posture | Medium |
| **D: Agent memory** | basic-memory, mem0, Letta, Zep, cognee, **OpenLore/Cairn** (deterministic code-architecture guardrails) | Agent-first audience, persistent recall; OpenLore adds a deterministic-governance sub-cluster | High |

**Our position:** the upper-right quadrant (broad scope × enforced) is occupied only by
Group C — and Group C holds it with diagram-model repositories, not prose artefacts. clew
targets that quadrant with Group B's enforcement style and Group A/D's audience and posture.

---

## Map 2 — Validation view

**Dimension C (horizontal):** storage posture — cloud/DB platform → local files + git.
**Dimension D (vertical):** agent-nativeness — none → API/MCP-mediated → file-native (agents
read/write the artefacts directly, zero marginal token cost).

**Why these dimensions:** orthogonal to Map 1 (where the data lives and how agents reach it,
vs what/how-reliably) and they capture clew's R4+R5 posture bet.

```text
File-native▲
agents     │                             [Group F: Agent-native local]
           │                              basic-memory · Spec Kit · BMAD
           │                                     ★ CLEW (target)
           │
MCP/API    │  [Group G: Platform+MCP]
           │   Sparx EA · Bagel · Atlassian
           │   Jama/Polarion (API)
           │
None       │  [Group E: Local, no agent surface]────────────────────
           │   Archi · StrictDoc · Sphinx-Needs · ReqView · reqT
           └──────────────────────────────────────────────►
           Cloud/DB platform                Local files + git
```

### Groups identified (Map 2)

| Group | Members | Shared strategic profile |
|---|---|---|
| **E: Local, no agent surface** | Archi/coArchi, StrictDoc, Sphinx-Needs, ReqView, reqT | Files (often in git), human-tool-mediated authoring, agents an afterthought |
| **F: Agent-native local** | basic-memory, Spec Kit, BMAD (+ clew's target) | Markdown in git, agents author directly, zero-marginal-cost reads |
| **G: Platform + API/MCP** | Sparx EA, Jama, Polarion, Ardoq, LeanIX, Bagel AI, Atlassian | Central repository, agent access token-metered through APIs |

---

## Cross-map analysis

- **Stable clusters:** docs-as-code RM (B≈E) and the SaaS/modeling platforms (C≈G) hold
  together across both maps — they are real strategic groups, not dimension artifacts.
- **The split that matters:** Group A/D members land in F on Map 2 (right posture, weak
  structure), while Group B/C members land in E/G (strong structure, wrong posture or
  economics). **No existing player is simultaneously upper-right on both maps.** That
  double-quadrant — enforced + broad + local + file-native — is clew's target and it is
  empty on 2026-07-21 evidence.
- **Closest approachers:** Sparx EA (upper-right Map 1, moving up Map 2 via MCP — but capped
  by token-metered access and DB storage) and basic-memory (upper-right Map 2, far left on
  Map 1's enforcement axis).
- **2026-07 wave update:** SARA is the first player near-upper-right on *both* maps'
  mechanism axes (validated graph + markdown/git; agent surface still missing) but at
  requirements/architecture scope, not full product architecture. OpenLore is fully
  agent-native + deterministic but its object is code, not product. The double-quadrant at
  *product* scope remains empty — the margin, however, shrank measurably within one quarter.

## Strategic implications

- Defend the double-quadrant by shipping the parts hardest to retrofit: write-time
  enforcement over prose artefacts and the opinionated metamodel content.
- Watch the two approach vectors named above at every 90-day refresh (hub Tier-4 triggers).

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-07-21 | Initial draft from discovery scan | Victor Hueni (agent-drafted) |
| 2026-07-21 | 2026-07 wave folded in: SARA/Reqord/RTMX join Group B (rivalry raised to High), OpenLore/Cairn join Group D as deterministic-governance sub-cluster; cross-map analysis gains wave update (seam still empty at product scope, margin shrinking) | Victor Hueni (agent-drafted) |
