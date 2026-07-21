---
title: Competitive Landscape — clew (hub)
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 -->

# clew — Competitive Landscape

This document is the strategic analysis of clew's competitive landscape: industry structure
(Porter's Five Forces), competitor tiering (Direct / Indirect / Substitute / Potential),
strategic group clustering, and positioning (Strategy Canvas + Value Curve). Per Tier-1
competitor, companion files in this folder carry the deep-dive (`CO-NN-{slug}.md`).

> **Methodology:** built using the canonical synthesis of Porter's Five Forces (1979/80) +
> Kim & Mauborgne Blue Ocean Strategy (2005) + Strategic Group Mapping + SCIP practitioner
> discipline. The full bibliography lives with the
> [business-competitive-landscape skill](https://github.com/VictorHueni/homemade-claude-kit/tree/main/plugins/strategy/skills/business-competitive-landscape)
> — single source of truth across every project.

**Industry / scope:** persistent product-architecture knowledge substrates for agent-first
software builders (intersection of docs-as-code RM, spec-driven agent development, agent
memory, and EA tooling).
**Last refreshed:** 2026-07-21
**Reviewed by:** _TODO_ (solo-drafted from desk research; needs founder review pass)
**Next refresh:** 2026-10-21 (fast-moving AI dev-tools market → 90 days)

**Scope discipline:**
- Captures **current state** of the market. Future projections go in a separate strategic doc.
- Every claim carries `Source:` + `Last verified:` + `Confidence:` ratings.
- Tier-1 competitors get their own `CO-NN-{slug}.md` file. Tier-2/3/4 stay in tables below.

**Primary evidence base:** the
[full-replacement scan (discovery, 2026-07-21)](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md)
— 40+ tools across 7 categories scored against the six replacement criteria (R1–R6). This
hub is the strategic read-out of that scan; per-claim sources live there and in each profile.

**Companion documents:**
- Personas: [01a-personas.md](../01a-personas.md) (P-01 Ava)
- Lean Canvas: [02a-lean-canvas.md](../02a-lean-canvas.md) (§1 Problem, §9 Unfair Advantage)
- Business Capability Map: [03a-capability-map.md](../03a-capability-map.md)
- Value Streams: [04a-value-streams.md](../04a-value-streams.md)
- Objectives: [04b-objectives.md](../04b-objectives.md)

---

## Executive summary + strategic implications

The industry is structurally **hostile but strategically open**: every entry barrier is low
and substitutes are free, yet the 2026-07-21 replacement scan found **zero tools covering
clew's six requirements together** — the seam between RE-grade enforcement, EA-grade breadth,
and agent-native local-first economics is unoccupied. Rivalry therefore concentrates in
*adjacent* categories: basic-memory (agent-native markdown graphs) from one flank, the Spec
Kit/BMAD spec-driven wave (93k★ distribution, throwaway artefacts) from another, and Sparx EA
(broadest typed repository, now MCP-queryable) from above. On the value curve, clew wins on
enforcement rigor, deterministic traceability, and agent read economics, and is structurally
behind on distribution and maturity everywhere. Strategic implication: **occupy the
"architecture-anchored" position fast** — raise write-time integrity and methodology depth
(the factors everyone under-serves), eliminate GUI-modeling and cloud-collab factors
entirely, and treat the moat honestly as *content + integration* (metamodel + skills), since
the mechanism alone is reproducible by any of the four flanking groups.

---

## 1. Porter's Five Forces — Industry Structure

| Force | Rating | Rationale | Key drivers | Evidence sources |
|---|---|---|---|---|
| **1. Threat of new entrants** | **Very High** | Near-zero capital or regulatory barrier; a funded startup or OSS side-project can ship a comparable substrate in months. | LLMs lower authoring cost; $125M funded entrants exist (Tessl); Spec Kit went 0→93k★ in ~8 months; no lock-in norms in dev tools. | [Tessl Series A](https://tessl.io/blog/announcing-our-series-a-for-ai-native-software-development/) · [Spec Kit growth](https://reenbit.com/bmad-vs-spec-kit-vs-openspec-choosing-your-spec-driven-ai-framework/) · Last verified: 2026-07-21 · Confidence: Tested |
| **2. Bargaining power of suppliers** | **Medium** | clew's "suppliers" are harness/model vendors (Anthropic, etc.): their conventions (skills, MCP, CLAUDE.md) define the integration surface and can shift it unilaterally. | High model-vendor concentration; harness memory features evolve fast (auto-memory layers, 2026); mitigated by markdown/git being vendor-neutral. | [Claude Code memory practices 2026](https://orchestrator.dev/blog/2026-04-06--claude-code-agent-memory-2026/) · Last verified: 2026-07-21 · Confidence: Assumed |
| **3. Bargaining power of buyers** | **High** | Individual agent-first engineers expect dev tools free/OSS, switch at zero cost, and can always fall back to plain markdown. | OSS-first norms in the segment; clew v1 deliberately free ([Lean Canvas §6](../02a-lean-canvas.md)); exit ramp is built-in by design (markdown readable without clew). | [Lean Canvas §6 Revenue](../02a-lean-canvas.md) · Last verified: 2026-07-21 · Confidence: Tested |
| **4. Threat of substitutes** | **Very High** | The dominant "competitor" is the free status quo: hand-rolled markdown + grep + prose discipline, PKM vaults, or generic memory MCPs — all feel good-enough until drift bites. | Zero cost; wave-1 evidence that prose discipline *fails* (the founding pain) cuts both ways — most users haven't felt the failure yet. | [Wave-1 synthesis](../../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) · [Dataview integrity gaps](https://github.com/blacksmithgu/obsidian-dataview/issues/2019) · Last verified: 2026-07-21 · Confidence: Tested |
| **5. Industry rivalry (existing competitors)** | **Medium** | No incumbent occupies the exact niche (scan verdict: zero full replacements); rivalry is intense *within* each adjacent category but diffuse *at the seam* clew targets. | Adjacent categories crowded (5+ SDD tools, 6+ memory layers); seam unoccupied; fast feature velocity everywhere. | [Full-replacement scan §Synthesis](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · Last verified: 2026-07-21 · Confidence: Tested |

**Composite industry attractiveness:** **Mixed** — structurally unattractive (free
substitutes, trivial entry, zero buyer willingness-to-pay in v1) but with a clearly
identified, currently unoccupied strategic position; attractiveness therefore depends
entirely on occupying the seam before an adjacent player closes it.

---

## 2. Competitor Tiers

### Tier 1 — Direct + consequential Indirect (profiled)

*Per-competitor deep-dive in `CO-NN-{slug}.md`. basic-memory is the only near-Direct
competitor (same segment, overlapping value proposition); the rest are the most consequential
Indirect players, profiled because each owns one flank of clew's position.*

| Competitor | Type | Segment served | Value proposition | Profile | Last verified |
|---|---|---|---|---|---|
| basic-memory | Direct | Agent-first builders (Claude/MCP users) | Persistent local markdown knowledge graph your AI reads/writes | [CO-01](CO-01-basic-memory.md) | 2026-07-21 |
| Sphinx-Needs | Indirect | Docs-as-code engineering teams (safety/embedded lineage) | Typed, validated requirements graph inside Sphinx docs | [CO-02](CO-02-sphinx-needs.md) | 2026-07-21 |
| StrictDoc | Indirect | Requirements/compliance engineers | Rigorous requirements + traceability DAG with stable machine IDs | [CO-03](CO-03-strictdoc.md) | 2026-07-21 |
| GitHub Spec Kit | Indirect | Agent-first engineers | Constitution→spec→plan→tasks workflow for AI coding agents | [CO-04](CO-04-github-spec-kit.md) | 2026-07-21 |
| BMAD-METHOD | Indirect | Agent-first engineers/teams | Simulated agile team of AI agents with file-based artefact handoffs | [CO-05](CO-05-bmad-method.md) | 2026-07-21 |
| Sparx Enterprise Architect | Indirect | Enterprise/system architects | Strategy-to-technology typed model repository, now MCP-queryable | [CO-06](CO-06-sparx-enterprise-architect.md) | 2026-07-21 |

### Tier 2 — Indirect competitors (not profiled)

| Competitor | Approach | Why indirect (not direct) | Threat horizon | Evidence |
|---|---|---|---|---|
| OpenSpec | Proposal-first spec deltas with change trail | Specs-only scope; no persistent architecture layer | Medium | [Scan §2](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| AWS Kiro | Spec-aware agentic IDE | Vendor-tied IDE; per-feature specs, not product memory | Medium | [Scan §2](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Doorstop / ReqView / TRLC | File-based requirements in git | Requirements-only; no strategy layer, no agent surface | Long | [Scan §1](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Ardoq / LeanIX | SaaS EA platforms with capability metamodels | Cloud/enterprise posture; wrong segment and economics | Long | [Scan §6](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Letta / mem0 / Zep / cognee | LLM-extracted conversational memory | Probabilistic memories, not typed artefacts; DB-backed, not files | Long | [Scan §3](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |

### Tier 3 — Substitutes

*Porter: substitutes deserve the most attention because they're easy to dismiss — and here
the substitute is what every prospective user already does today.*

| Substitute | What the customer does instead | Why they consider it | Switching cost | Evidence |
|---|---|---|---|---|
| Hand-rolled markdown + grep + prose discipline (status quo) | CLAUDE.md rules, naming conventions, trust-the-agent | Free, zero setup, feels sufficient until drift | **Low** (it's the default) | [Wave-1 synthesis](../../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) · 2026-07-21 |
| Obsidian / PKM vault (+ Dataview, MCP plugins) | Wikilinked notes as product memory | Familiar, flexible, huge ecosystem | Low | [Scan §4](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Archi + coArchi (ArchiMate) | Free typed EA model, file-per-element in git | Zero cost, real typed metamodel, git-native | Medium (modeling skill needed) | [Scan §7](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Notion / Atlassian (+MCP) | PM-tool databases as structure | Where teams already live | Medium; **already rejected by P-01** (API complexity, token cost) | [Lean Canvas §1](../02a-lean-canvas.md) · 2026-07-21 |

### Tier 4 — Potential new entrants

| Entrant candidate | Why they might enter | Their advantage if they do | Expected timing | Evidence |
|---|---|---|---|---|
| Harness vendors (Anthropic et al.) | Memory layers keep deepening (auto-memory, subagent memory); a typed project-knowledge store is a natural next step | Default distribution to the entire segment | Unknown; capability trend visible | [Claude Code memory 2026](https://orchestrator.dev/blog/2026-04-06--claude-code-agent-memory-2026/) · 2026-07-21 |
| Spec-driven ecosystem (Spec Kit/BMAD maintainers) | Adding stable IDs + link-checking over their artefacts is an obvious v-next | 93k★ distribution, existing agent workflows | Near-medium | [Scan §Synthesis](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) · 2026-07-21 |
| Funded "product context" SaaS (Tessl, Bagel AI) | Both already sell "context for agents"; local-first is a pivot away | Capital, teams, GTM | Medium | [Tessl review](https://codemyspec.com/blog/tessl-review) · [Bagel AI](https://bagel.ai/platform-overview/) · 2026-07-21 |
| useblocks (Sphinx-Needs authors) | Commercial arm exists; an agent-native/markdown frontend over the needs graph would land on clew's seam | Deepest RM-graph engineering in the field | Medium | [Sphinx-Needs](https://sphinx-needs.readthedocs.io/) · 2026-07-21 |

---

## 3. Strategic Group Map

**Primary dimensions:** artefact scope breadth (per-feature specs → full product
architecture) × integrity enforcement (convention → tool-enforced).

**Groups identified:** Spec-workflow tools · Docs-as-code RM · EA modeling · Agent memory.

**Our group:** none cleanly — clew targets the empty quadrant combining EA-grade breadth
with RM-grade enforcement on an agent-native/local-first posture (validated on both maps).

[Full strategic group analysis →](cl-02-strategic-group-map.md)

---

## 4. Strategy Canvas / Value Curve

**Factors of competition:** metamodel breadth · integrity enforcement · deterministic
traceability · local-first markdown/git posture · agent-native economics · methodology depth
· distribution & maturity.

**Headline differentiation opportunities** (Four Actions):
- **Eliminate:** GUI/diagram modeling layer; cloud collaboration/multi-writer.
- **Reduce:** per-feature spec-workflow ceremony (interoperate with SDD tools instead);
  breadth of export formats.
- **Raise:** write-time integrity, deterministic IDs + audit, agent read economics — the
  factors every group under-serves.
- **Create:** methodology-as-skills authoring; the architecture-anchored persistent substrate
  (strategy → implementation) as a factor of competition no group offers.

[Full value-curve analysis →](cl-03-value-curve.md)

---

## 5. SWOT (clew relative to this landscape)

| Dimension | Items |
|---|---|
| **Strengths** | Opinionated full-stack metamodel + methodology skill catalogue (no competitor ships one); deterministic ID/audit substrate design (ADR-0001/0002); local-first token economics ([Lean Canvas §9](../02a-lean-canvas.md), Tested N=1). |
| **Weaknesses** | Pre-product, zero users, solo founder; moat is content + integration, not mechanism — every flank could reproduce the mechanism ([scan §Synthesis](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md)); no distribution vs 93k★ incumbents. |
| **Opportunities** | Unoccupied seam confirmed by the scan; "architecture-anchored" positioning language (vs spec-first throwaway artefacts, per [Böckeler](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)); prior art (reqT) legitimises the approach academically. |
| **Threats** | Sparx EA closing the agent gap from above (MCP server, 2026); Spec Kit/BMAD adding integrity from below; harness vendors bundling typed project memory; category noise drowning a solo OSS entrant. |

---

## Changelog

| Date | Mode | Change | Author | Reviewed by |
|---|---|---|---|---|
| 2026-07-21 | Scaffold + Industry analysis + Profiles + Mapping | Initial landscape persisted from the [discovery full-replacement scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md): Five Forces, 4-tier table, 6 Tier-1 profiles (CO-01…CO-06), strategic group map, value curve. All content desk-research based. | Victor Hueni (agent-drafted) | _TODO_ |
