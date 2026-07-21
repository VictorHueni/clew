---
title: IDEA-0001 — Reposition clew as the product-architecture integrity layer
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 60d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | graduates_to: vision-revision + canvas-§3/§9 + positioning ADR -->

# IDEA-0001 · Reposition clew: Product Architecture Management / the integrity layer

Pre-formal capture of the founder's 2026-07-21 moat/positioning rework, prompted by the
[2026-07 competitor wave](../competitive-landscape-2026-07-21-clew-replacement-scan.md)
(SARA, Reqord, RTMX, OpenLore). Not yet doctrine — graduates into a VISION revision, Lean
Canvas §3/§9 updates, and a positioning ADR once the founder decides how much to adopt.

## The thesis (founder-authored, condensed)

- **Category:** not a docs/traceability tool — **Product Architecture Management for
  AI-native teams**: EA discipline (Ardoq/BiZZdesign class) compressed to repo scale, inside
  the delivery loop, operated by agents. "Repo-scale EA" is the wedge.
- **Core guarantee:** *"Agents may write prose, but only clew may create facts."* No
  hallucinated IDs, no illegal relationships, no orphan specs, no silent drift between prose
  and structure. Sharper form: *clew prevents agents from building the wrong product, not
  just the wrong code.*
- **Moat pillars:** (1) the versioned metamodel as protocol (`clew-metamodel@0.1`,
  `clew-agent-contract@0.1`…); (2) write-time integrity; (3) the agent contract (first and
  last thing an agent calls); (4) `clew check` as CI choke-point; (5) brownfield import
  ("bring your messy repo"); (6) a `clew-compatible` ecosystem of methodology packs.
- **Anti-moats (explicitly not the moat):** git-native docs, markdown specs, generic
  traceability, SQLite, CLI, MCP — all present in adjacent tools or trivially copyable.
- **Killer-feature direction:** `clew guard` / `clew impact` / `clew diff` / `clew check` —
  telling an agent what it may change, what it must preserve, and which product-architecture
  records must be updated before a change is valid.
- **Staged roadmap:** v0.1 integrity core → v0.2 agent contract → v0.3 CI gate →
  v0.4 brownfield import → v0.5 protocol/ecosystem.
- **Tagline candidate:** "clew — product architecture memory for AI agents."

## Assessment (agent review, 2026-07-21)

Supporting evidence and four caveats, from the
[landscape refresh](../../business/01b-competitive-landscape/cl-01-five-forces.md):

1. **The reframe is evidence-backed and urgent.** The 2026-07 wave occupied "git-native
   traceability for agents" from four angles within one quarter; that positioning is gone.
   The empty position on both strategic-group maps is exactly the one this thesis claims.
2. **Scope discipline risk.** The full feature catalogue (scenarios, health scoring,
   portfolio, views, transition states) is a multi-year enterprise roadmap that collides
   with OBJ-03 (validate before scaling). The provable core is ~5 commands: mint, link,
   check, trace/impact, diff. Everything past that is a parking lot until wave-2 validates.
3. **`guard` must stay honestly deterministic.** Its sample output mixes deterministic graph
   facts with architectural judgment; the latter is only defensible as *authored
   constraints stored as artefacts* — LLM-inferred advice in the hot path would break the
   core guarantee (and concede the purity claim to OpenLore, which markets "no LLM in the
   hot path"). Same rule for health scores: graph-derived metrics only.
4. **Layer positioning vs OpenLore/Cairn.** The guard/gate mechanism already ships at the
   code layer ([CO-08](../../business/01b-competitive-landscape/CO-08-openlore.md)).
   "Deterministic agent guardrails" alone is not ownable; the ownable claim is the product
   layer — and OpenLore is an integration candidate, not just a rival.
5. **Moat pillar honesty.** Pillars 1–3 are content + engineering (copyable in quarters);
   the compounding moats are the CI choke-point and ecosystem, both post-adoption. For a
   solo OSS project the binding constraint stays distribution — elevate brownfield import
   to co-equal with the integrity core. VISION boundary watch: transition
   epics/roadmap/portfolio drift toward "what's in progress," which VISION disclaims.

## Graduation path

| Target artefact | What graduates | Precondition |
|---|---|---|
| `docs/VISION.md` revision | Elevator pitch + category language ("Product Architecture Management" / integrity layer), "What We Are NOT" additions (not code-architecture guardrails; not a spec-workflow tool) | Founder decision on category naming |
| Lean Canvas §3 UVP / §9 | "Only clew may create facts" as north-star promise wording; moat pillars honesty pass | Same |
| Positioning ADR (`docs/architecture/decisions/`) | The deterministic-guard rule: no LLM-inferred judgments in guard/check output; constraints must be authored artefacts | Can be decided now — it is an architectural invariant |
| Roadmap / implementation plans | v0.1–v0.5 staging, P0 = integrity core ~5 commands | After OBJ-03 wave-2 evidence |

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0001 | execution-item | Founder decision pending: adopt "Product Architecture Management" category language and the integrity-layer elevator pitch into VISION + canvas, or keep current framing. | #graduation-path | Graduation path | Decide; then graduate rows 1–2 of the table via the vision + business-model skills. | high | open | Victor Hueni | 2026-08-15 | _TBD_ |
| OI-0002 | execution-item | Draft the deterministic-guard positioning ADR (no LLM in the integrity hot path; constraints are authored artefacts) — decidable independently of the category question. | #assessment-agent-review-2026-07-21 | Assessment | Author ADR via `architecture-adr` skill; link OpenLore precedent as prior art. | medium | open | Victor Hueni | 2026-08-31 | _TBD_ |

## Changelog

- 2026-07-21 · Captured · Founder's moat/positioning rework + agent assessment persisted as IDEA-0001, following the 2026-07 competitor wave.
