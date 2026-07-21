---
title: Competitive Landscape — Full-Replacement Scan for clew
status: active
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

# Competitive Landscape: Could Any Existing Tool Replace clew Completely?

Desk-research sweep (2026-07-21) across six tool categories, asking one question: **is there
any existing tool — or realistic combination — that fully replaces clew** as a local-first,
agent-native product-intelligence and architectural-memory layer?

**Short answer: no single tool, and no clean combination, covers all six requirements today.
The nearest single-tool competitors are Sphinx-Needs (requirements-graph half) and
basic-memory (agent-native markdown-graph half). The category moving fastest toward clew's
territory is spec-driven agent development (Spec Kit, BMAD, OpenSpec, Kiro), which owns the
"agent-native artefact discipline" story but has no typed metamodel, no deterministic IDs,
and no strategy layer.**

## Replacement criteria

Derived from [VISION.md](../VISION.md) and the [Lean Canvas](../business/02a-lean-canvas.md)
(PR-1/PR-2/PR-3, UVP). A *complete* replacement must cover all six:

| # | Requirement |
|---|---|
| **R1** | Opinionated typed metamodel spanning business architecture (personas, canvas, capabilities, value streams, OKRs), market intelligence, product specs/requirements, domain (DDD), and ADRs in one connected graph |
| **R2** | Deterministic, tool-minted stable IDs; typed relationships; write-time referential integrity (broken refs caught immediately; rename/refactor impact analysis) |
| **R3** | End-to-end traceability queries, Vision → implementation plan, answered deterministically |
| **R4** | Markdown-first, git as source of truth, local-first, readable without the tool |
| **R5** | Agent-native: designed for coding agents to read/write artefacts cheaply (file reads, not token-expensive API round-trips) |
| **R6** | Audit trail / provenance ("why was this built, what comes next") |

Scoring: ✅ covers · 🟡 partial · ❌ misses.

## 1 · Docs-as-code requirements management

The strongest category on R2/R3/R4 — these tools exist precisely to give requirements stable
IDs, typed links, and traceability inside git. None has a strategy/business layer (R1) and
none is agent-native by design (R5).

| Tool | R1 | R2 | R3 | R4 | R5 | R6 | Verdict |
|---|---|---|---|---|---|---|---|
| **Sphinx-Needs** | 🟡 | ✅ | ✅ | 🟡 | 🟡 | 🟡 | **Partial overlap — nearest RM competitor** |
| **StrictDoc** | ❌ | ✅ | ✅ | 🟡 | 🟡 | 🟡 | Partial overlap |
| **Doorstop** | ❌ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | Partial overlap, low maintenance |
| **TRLC (BMW)** | ❌ | ✅ | 🟡 | 🟡 | ❌ | 🟡 | Different category (safety-critical RM DSL) |
| **OpenFastTrace** | ❌ | 🟡 | ✅ | ✅ | ❌ | ❌ | Different category (trace checker, no authoring model) |
| **ReqView** | ❌ | ✅ | ✅ | 🟡 | ❌ | 🟡 | Partial overlap (file-based commercial RE) |
| **reqT** | 🟡 | 🟡 | 🟡 | ✅ | 🟡 | ❌ | Partial overlap (academic ancestor of the approach) |
| **SARA** | 🟡 | ✅ | ✅ | ✅ | 🟡 | 🟡 | **Partial overlap — closest new entrant (2026-07 wave)** |
| **Reqord** | ❌ | 🟡 | 🟡 | ✅ | ✅ | 🟡 | Partial overlap (agent-era RM lifecycle) |
| **RTMX** | ❌ | 🟡 | ✅ | 🟡 | ✅ | 🟡 | Partial overlap (test-loop traceability for agents) |
| **shtracer** | ❌ | 🟡 | 🟡 | ✅ | ❌ | ❌ | Different category (lightweight tag tracing) |

- **[Sphinx-Needs](https://sphinx-needs.readthedocs.io/)** (useblocks; active, v8.x, 2026).
  Fully user-definable need types with typed link options — you *could* declare `persona`,
  `capability`, `objective` types and model most of clew's metamodel yourself. Link
  validation, filters, and the companion [sphinx-modeling](https://github.com/useblocks/sphinx-modeling)
  project add pydantic-validated constraints per type. Gaps: the metamodel is BYO (empty
  toolbox, not an opinionated stack — no BIZBOK/Strategyzer/Sommerville content); RST/Sphinx
  build required (validation at build time, not write time; not readable-as-plain-markdown in
  the clew sense); IDs are author-assigned strings, not tool-minted sequences; no
  agent-facing authoring discipline. It is the strongest "assemble-it-yourself clew" on the
  requirements half — at the cost of building and maintaining the metamodel, the skills, and
  the agent integration yourself.
- **[StrictDoc](https://strictdoc.readthedocs.io/)** (active, DO-178-grade traceability).
  Notably has **Machine Identifiers (MIDs)** — unique, stable, non-human-readable IDs that
  survive UID renames — plus a traceability DAG, diff/changelog, web UI, and source-code
  tracing. This is the closest architectural cousin to clew's "deterministic ID + binding"
  design (ADR-0001/0002 territory). Gaps: `.sdoc` custom format (not markdown), requirements
  domain only (no personas/canvas/domain layer), no agent-native surface.
- **[Doorstop](https://github.com/doorstop-dev/doorstop)**: YAML-file-per-requirement in git
  with parent links and integrity checks — philosophically closest to clew's file-binding
  idea, but per [community assessments](https://github.com/zephyrproject-rtos/zephyr/issues/57703)
  it is barely maintained, with limited link relations. StrictDoc explicitly credits it as
  inspiration.
- **[TRLC](https://github.com/bmw-software-engineering/trlc)** / **OpenFastTrace**: serious
  typed-requirements DSLs with static analysis (TRLC's LRM is at v3.x, active), but aimed at
  automotive/safety compliance, requirements-only, no markdown, no agent story.
- **[ReqView](https://www.reqview.com/)** (commercial, desktop): the one commercial RE tool
  matching clew's storage posture — projects are human-readable JSON files managed directly
  in git, offline-first, open format, with end-to-end traceability, baselines, and git-diff
  change review. Gaps: requirements domain only, editing goes through the proprietary app
  (JSON is readable but not authorable-by-agent in practice), no metamodel beyond
  requirements documents, no agent surface. Strong evidence that "file-based + git-native RE"
  is a commercially viable posture — without touching clew's strategy layer or R5.
- **ReqIF** is an exchange *format* (OEM/supplier requirements interchange), not a tool — a
  potential future export target for clew, not a competitor.
- **[reqT](https://reqt.github.io/)** (Björn Regnell, Lund University): open-source RE tool
  whose `reqT-lang` is a **markdown-subset language** (indented bullet lists + keywords)
  expressing typed entities, relations, and attributes over natural-language requirements —
  "structure to natural language, enabling analysis, visualization and automation." Its
  published metamodel even includes Stakeholder/Goal/Product/Release concepts beyond bare
  requirements. This is the closest *philosophical ancestor* to clew found in the scan: a
  semi-formal typed metamodel embedded in markdown-like plain text. Gaps: academic/education
  posture (used for teaching RE at Lund; Scala library + desktop app, small community); the
  model is per-file/in-memory, with no repo-wide persistence, minted IDs, write-time FK
  enforcement, or audit trail; no agent integration despite the agent-friendly text format.
  Worth reading for metamodel-design prior art, not a replacement.

**The 2026-07 wave — agent-era git-native traceability.** Three young tools (surfaced
2026-07-21, days after the initial scan) confirm the quadrant is filling fast:

- **[SARA](https://github.com/cledouarec/sara)** (Rust CLI, Show HN Jan 2026): markdown +
  YAML frontmatter as a knowledge graph across solution / architecture / requirements, with
  a custom YAML model schema, validation (broken refs, orphaned items, circular deps,
  duplicate IDs), traceability queries, matrix reports, multi-repo aggregation, and diff
  between git refs. **The closest single new tool to clew's mechanism** — typed graph over
  markdown-in-git with real validation. Gaps: scope is solution/architecture/requirements,
  not business strategy → domain → plans (R1 partial); IDs are author-assigned and checks
  run at validate time, not write time; no minted-ID/audit substrate; no explicit agent
  surface or methodology layer.
- **[Reqord](https://github.com/kicchann/reqord)**: "git-native requirements management for
  the AI coding era" — YAML metadata + markdown content per requirement, lifecycle states,
  a Claude Code plugin, and a `.reqord/context/` directory for persistent AI project
  context. Strong R4+R5 posture; requirements-only scope, no typed cross-artefact graph or
  enforcement.
- **[RTMX](https://github.com/rtmx-ai/rtmx)** (Go, MCP server): requirements as CSV in git,
  each with ID, spec, linked tests; status *derived from test results*; `rtmx next` /
  `rtmx verify` close the agent build loop. The sharpest "closed-loop intent for agents"
  story — and the narrowest scope (requirements ⇄ tests only).
- **[shtracer](https://github.com/qq3g7bad/shtracer)** (shell): markdown-tag tracing
  requirements → architecture → implementation → tests with orphan/duplicate detection.
  Same traceability primitive, minimal scope.

- **[OpenReq](https://github.com/OpenReqEU/OpenReq)** (EU Horizon 2020, 2017–2020, ended):
  research project on *recommendation and decision support* for community-driven RE —
  requirements intelligence from user feedback, dependency detection, release-planning
  group decisions — delivered as open-source microservices, largely dormant since project
  end. Different category: it recommends and prioritises requirements held elsewhere; it is
  not a persistence substrate. Relevant only as research lineage for a possible future
  "requirements intelligence" capability on top of clew's graph.

## 2 · Spec-driven agent development

The category that shares clew's *audience* (agent-first engineers) and R4/R5 posture, but not
its *object* — these tools manage per-feature implementation specs, not a persistent product
architecture. Artefacts are LLM-authored prose files: no typed graph, no minted IDs, no
referential enforcement.

[Böckeler's analysis on martinfowler.com](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
(Oct 2025) gives the category its sharpest frame — three rigor levels: **spec-first** (spec
gives initial clarity, then is discarded or drifts — the default behaviour of Spec Kit and
Kiro), **spec-anchored** (spec maintained alongside code for the system's life), and
**spec-as-source** (humans edit only specs; Tessl's still-unshipped bet). The criticism cuts
in clew's favour twice: the dominant tools are spec-*first* — their artefacts are throwaway
by default, the exact anti-pattern clew's persistent substrate exists to prevent — and even
"spec-anchored," the level Böckeler calls the sweet spot, is defined per-system at code
level, with nothing above it holding strategy, domain, and decisions together. clew is in
effect *architecture-anchored*: the anchored-artefact idea applied to the whole product
stack, with enforcement rather than convention keeping it aligned.

| Tool | R1 | R2 | R3 | R4 | R5 | R6 | Verdict |
|---|---|---|---|---|---|---|---|
| **GitHub Spec Kit** | ❌ | ❌ | 🟡 | ✅ | ✅ | 🟡 | Partial overlap (workflow, not memory) |
| **BMAD-METHOD** | 🟡 | ❌ | 🟡 | ✅ | ✅ | 🟡 | **Partial overlap — nearest on lifecycle breadth** |
| **OpenSpec** | ❌ | ❌ | 🟡 | ✅ | ✅ | ✅ | Partial overlap (change-trail focus) |
| **AWS Kiro** | ❌ | ❌ | 🟡 | 🟡 | ✅ | 🟡 | Different category (agentic IDE) |
| **Tessl** | ❌ | ❌ | ❌ | 🟡 | ✅ | ❌ | Different category (pivoted to skills registry) |

- **[GitHub Spec Kit](https://github.com/github/spec-kit)** (~93k★ by May 2026, 30+ agent
  harnesses): constitution → spec → plan → tasks pipeline. Massive mindshare for "artefacts
  the agent reads before coding," but artefacts are unstructured markdown per feature;
  nothing prevents drift between them and no cross-artefact query exists.
- **[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)**: simulates a full agile
  team (Analyst, PM, Architect, UX, QA…) with file-based handoffs — the only tool in the
  category that *touches* clew's upstream layers (brief, PRD, architecture doc). The chain is
  traceable by convention only: no IDs, no integrity checks, artefacts rot silently after
  generation. It validates the demand for multi-role, full-lifecycle artefact discipline
  (clew's UVP Concrete win 3) without competing on the substrate.
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)**: proposal-first deltas with an
  explicit change trail — scored highest in a Feb 2026 independent comparison for change
  accountability (a slice of R6). Specs-only scope.
- **[Kiro](https://kiro.dev/)** (AWS, GA Nov 2025): spec-aware agentic IDE
  (requirements.md/design.md/tasks.md + steering files). Vendor-tied, per-feature scope.
- **[Tessl](https://tessl.io/)** (~$125M raised): the boldest spec-as-source vision, but its
  regeneration engine remains closed beta and in Jan 2026 it repositioned around an
  agent-skills registry — moving *away* from clew's territory.

## 3 · AI/agent memory layers

Same R5 story, opposite R2 philosophy: memories are **LLM-extracted and probabilistic**,
exactly what PR-2 rejects ("determinism is the missing primitive"). None has a product
metamodel.

| Tool | R1 | R2 | R3 | R4 | R5 | R6 | Verdict |
|---|---|---|---|---|---|---|---|
| **basic-memory** | ❌ | 🟡 | 🟡 | ✅ | ✅ | 🟡 | **Partial overlap — nearest agent-native competitor** |
| **OpenLore (/ Cairn)** | ❌ | ✅ | 🟡 | 🟡 | ✅ | ✅ | **Partial overlap — the guardrail mechanism, one layer down (code)** |
| **Letta / mem0 / Zep (Graphiti) / cognee** | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | Different category (conversational memory) |
| **Microsoft GraphRAG** | ❌ | ❌ | 🟡 | ❌ | 🟡 | ❌ | Different category (corpus indexing) |

- **[basic-memory](https://github.com/basicmachines-co/basic-memory)** (Basic Machines):
  local-first markdown knowledge base where notes are entities with typed relations and
  categorized observations, read/written by Claude via MCP, plain files on disk. This is the
  closest *architecture* to clew's substrate in the agent-native world. Decisive gaps: the
  schema is generic (entity/observation/relation — no product metamodel, R1); relations are
  wikilink-loose, not FK-enforced (no write-time integrity, no impact analysis, R2); the
  graph is derived, best-effort, not audited (R6). "clew = basic-memory + an opinionated,
  enforced metamodel" is a fair one-line positioning check.
- **[OpenLore](https://github.com/clay-good/OpenLore)** (and the adjacent **Cairn**;
  surfaced 2026-07-21): deterministic, local-first **code-architecture** memory and
  guardrails — "no LLM in the hot path." Builds a navigable graph of the codebase (static
  analysis + living specs via OpenSpec), exposes 45 graph-native MCP tools, and gates
  changes: agents call `record_decision` before writing code and a pre-commit hook blocks
  the commit until verified decisions are reviewed. **Strategically the most important
  find of the wave: it ships the exact guard/gate mechanism clew envisions — one layer
  down.** OpenLore governs whether a change respects the *code* architecture; clew's claim
  is the *product* layer (why it exists, who it's for, what must remain true). Gaps vs
  clew: no product/business metamodel (R1 ❌), graph derived from code rather than authored
  strategy artefacts, no markdown-prose artefact layer. Complement and integration
  candidate more than rival — but it proves "deterministic agent guardrails" alone is not
  ownable positioning.
- **Letta, mem0, Zep/Graphiti, cognee** ([2026 comparisons](https://www.graphlit.com/blog/survey-of-ai-agent-memory-frameworks)):
  all optimize conversational recall (extracted facts, temporal graphs, vector stores).
  Storage is a DB/service, not readable markdown; facts are minted by the LLM; there is no
  concept of an artefact, let alone a Vision→plan trace. Different problem.

## 4 · PKM / knowledge graphs (Obsidian, Dendron, Logseq, Foam, org-roam)

**Verdict: partial overlap, refuted as replacement — and wave-1 already refuted Notion-style
alternatives empirically.** Obsidian + Dataview gets R4 and (via community MCP servers) some
R5, plus free-form typed-ish links. But there is no schema enforcement of any kind: Dataview
has [long-standing issues](https://github.com/blacksmithgu/obsidian-dataview/issues/2019)
even *recognizing* links in properties; broken links are a rendering artifact, not a blocked
write; IDs are filenames; queries are best-effort over whatever conventions the author kept.
Dendron (schema'd hierarchies, effectively unmaintained since ~2023) came closest and died.
This category is where PR-1/PR-2/PR-3 pain is *generated*, not solved.

## 5 · Architecture-as-code & ADR tooling

**Verdict: different category — covers one metamodel package (architecture), nothing above
it.** [Structurizr](https://structurizr.com/) (C4 model-as-code + decision log),
[LikeC4](https://likec4.dev/) (customizable element types — a genuine typed metamodel, but
for C4-style software views only), [log4brains](https://github.com/thomvaill/log4brains) /
adr-tools (ADR lifecycle in git). All R4-friendly; none model personas, canvases,
capabilities, or requirements; none enforce cross-artefact integrity; none are agent-native.
clew's architecture package overlaps them; they cannot absorb clew.

## 6 · Enterprise RM / EA / PM suites

**Verdict: different category on posture alone.** Jama Connect, Polarion, IBM DOORS Next,
Codebeamer (PTC), Visure, and objectiF RM (requirements: strong R1-subset/R2/R3/R6 within
their domain, and by 2026 all shipping AI-assist features — authoring, quality checks,
impact analysis) and Ardoq/LeanIX (EA metamodels with capability maps as first-class typed
data) are all cloud/server platforms: not markdown, not git-source-of-truth, not
local-first, not single-writer, API-metered for agents. They violate R4/R5 by construction
and clew's "Not a cloud SaaS" boundary. Atlassian+MCP was already tried and rejected in
[wave 1](interviews/research-synthesis-2026-05-24-P-01-validation.md) (API complexity,
token cost). Emerging SaaS "decision layers for AI-native teams" (e.g.
[Bagel AI](https://bagel.ai/) — customer-signal decisions served to Cursor/Claude Code over
MCP) confirm the "agents need product context" thesis but from the opposite architecture:
cloud-hosted, signal-driven, token-metered.

## 7 · Modeling-centric EA & MBSE tools (Sparx EA, Archi/ArchiMate, objectiF-style)

The EA modeling tradition deserves separate treatment from the SaaS EA platforms above,
because two of its tools land much closer to clew than expected:

| Tool | R1 | R2 | R3 | R4 | R5 | R6 | Verdict |
|---|---|---|---|---|---|---|---|
| **Sparx Enterprise Architect** | 🟡 | 🟡 | ✅ | ❌ | 🟡 | 🟡 | **Partial overlap — broadest single-repository trace; now agent-queryable via MCP** |
| **Archi + coArchi (ArchiMate)** | 🟡 | 🟡 | 🟡 | 🟡 | ❌ | 🟡 | **Partial overlap — free, git-native, typed EA metamodel** |
| **Eclipse Capella / SysML MBSE** | ❌ | 🟡 | 🟡 | ❌ | ❌ | 🟡 | Different category (systems engineering) |

- **[Sparx Enterprise Architect](https://sparxsystems.com/products/ea/)**: the incumbent
  that comes closest to R1's *breadth* — business processes, strategy, requirements, data,
  application, and technology models with typed relationships and end-to-end traceability in
  one repository (UML/SysML/BPMN/ArchiMate). Critically, **Sparx released an official
  [MCP server](https://sparxsystems.com/forums/smf/index.php?topic=49025.0) (2026)** so AI
  assistants can query the repository as a semantic layer — an EA incumbent explicitly
  moving onto the "agents need architectural context" ground. Gaps remain structural: the
  repository is a binary/DB model, not markdown in git (R4 ❌); artefacts are diagram
  elements, not prose documents (no Lean Canvas, persona narrative, or PRD as first-class
  text); agent access is exactly the token-metered MCP round-trip economics wave 1 rejected;
  and the Lean Canvas already scopes Sparx-tooling teams out of v1. Still: the single most
  capable "one connected graph" product on the market, and now the most important incumbent
  to watch on R5.
- **[Archi](https://www.archimatetool.com/) + [coArchi](https://github.com/archimatetool/archi-modelrepository-plugin2)**
  (free, open source): ArchiMate is itself an *opinionated typed metamodel* — capabilities,
  value streams, business actors, goals/drivers/requirements (Motivation layer) with
  relationship-validity rules enforced at modeling time — and coArchi stores the model
  **file-per-element in a git repository** (GRAFICO format). That is the closest existing
  analog to clew's "typed business-architecture graph, versioned in git" on a zero-cost
  stack. Gaps: elements are diagram nodes with XML persistence, not readable markdown
  artefacts (a persona is a named box, not a researched document); the Motivation layer is
  far coarser than RM-grade requirements; no deterministic ID minting story beyond internal
  GUIDs; no agent-native surface (jArchi scripting exists, but nothing MCP/file-read
  friendly); integrity holds *within* the model, with no binding to prose docs or code.
- **Eclipse Capella / SysML tools**: model-based *systems* engineering — hardware/software
  co-design lineage, not product-strategy memory. Out of scope.

**The pattern across RE and EA tooling:** requirements engineering tools own R2/R3 depth
(IDs, links, impact analysis, baselines) but stop at the requirements layer; EA tools own
R1 breadth (strategy-to-technology typed graphs) but live in diagram models or SaaS
platforms. **No tool in either tradition combines its half with markdown-prose artefacts in
git plus an agent-native authoring surface — that seam is exactly where clew sits.**

## Synthesis

**1 · No full replacement exists.** Nothing found covers R1 at all — no tool ships an
opinionated metamodel that spans strategy → market → specs → domain → ADRs. Since R1+R2
together are clew's core, every candidate fails on at least one of them:

- Requirements tools have R2/R3 but no strategy layer and no agent surface.
- Spec-driven tools have the agent surface but LLM-authored, unenforced artefacts.
- Memory layers have the agent surface but probabilistic, non-artefact storage.
- PKM has the files but no enforcement.
- EA suites have the metamodel breadth but the wrong (SaaS) architecture; modeling EA
  (Sparx, Archi) has typed graphs but diagram-element artefacts, not prose-in-git.

**2 · The realistic replacement combination** is Sphinx-Needs/sphinx-modeling (typed graph +
validation) + Spec Kit (agent workflow) + log4brains (ADRs) + hand-written business-layer
need types. That combination could approximate R1–R6 — but it *is* clew's build-vs-buy
alternative: the integrator must author the metamodel, the methodology content, and the agent
skills themselves, which is precisely the founder-time moat named in
[Lean Canvas §9](../business/02a-lean-canvas.md#9-unfair-advantage--confidence-assumed-one-tested-item-added-wave-1).

**3 · Nearest competitors to watch** (each owns one flank):

| Threat | Owns | Would need to add |
|---|---|---|
| **Sphinx-Needs** | typed links, validation, mature RM graph | opinionated product metamodel, markdown/agent-native surface, minted IDs |
| **basic-memory** | local-first markdown graph, MCP-native, entity/relation model | typed schema enforcement, product metamodel, deterministic IDs/audit |
| **Spec Kit / BMAD ecosystem** | agent-workflow mindshare, distribution (93k★) | persistent typed substrate under the generated artefacts |
| **StrictDoc** | MID design, traceability DAG, diff/changelog rigor | markdown, strategy layer, agent surface |
| **Sparx EA (+ MCP server)** | broadest strategy→tech typed repository, incumbent installed base | markdown/git artefacts, file-read agent economics, prose documents |
| **Archi + coArchi** | free typed ArchiMate metamodel, file-per-element in git | prose artefacts, RM-grade requirements, agent surface, ID minting |
| **SARA** (2026-07 wave) | markdown+YAML typed graph in git, validation, matrices, git-ref diff | business/strategy layers, minted IDs, write-time enforcement, agent surface, methodology |
| **OpenLore** (2026-07 wave) | deterministic guard/gate mechanism, MCP-native, pre-commit governance | the product/business layer entirely — governs code architecture, not product truth |

**3b · The 2026-07 wave changes the tempo, not the verdict.** SARA, Reqord, RTMX, and
OpenLore — all surfaced within days of the initial scan — collectively occupy "git-native
traceability/guardrails for agents" from four angles, without any of them holding the full
seam (business→implementation metamodel + minted IDs + write-time enforcement + prose
artefacts + agent economics). Verdict unchanged: still no full replacement. But two
consequences: (a) generic "Git-native traceability for AI agents" is no longer available as
positioning — clew must claim the product-architecture integrity layer explicitly; (b) the
90-day watch cadence assumed by OI-0003 is too slow for this quadrant.

**4 · Where clew's differentiation is thinnest.** (a) *Versus a determined Sphinx-Needs
user*: everything except the packaged metamodel + skills is reproducible — the moat is
content and integration, not mechanism, matching the "honest gap" in Lean Canvas §9.
(b) *Versus the spec-driven wave*: if Spec Kit or BMAD adds stable IDs + link checking over
its artefacts, it attacks from the distribution-rich side; clew's defensible ground is the
strategy/domain layers those tools don't model. (c) *Category risk*: "agents need persistent
product context" is now a funded thesis (Tessl, Bagel) — validation of the problem, and a
clock on occupying the local-first/deterministic corner of it.

## Method & sources

Web sweep 2026-07-21 (search + targeted source review; single-pass, not adversarially
verified — claims about fast-moving projects should be re-checked before strategic bets).
Key sources: [StrictDoc FAQ (tool comparisons)](https://strictdoc.readthedocs.io/en/latest/sphinx/strictdoc_03_faq.html) ·
[Zephyr RM tool re-evaluation](https://github.com/zephyrproject-rtos/zephyr/issues/57703) ·
[Sphinx-Needs docs](https://sphinx-needs.readthedocs.io/) · [sphinx-modeling](https://github.com/useblocks/sphinx-modeling) ·
[spec-compare (6-tool study)](https://github.com/cameronsjo/spec-compare) ·
[BMAD vs Spec Kit vs OpenSpec (Reenbit, May 2026)](https://reenbit.com/bmad-vs-spec-kit-vs-openspec-choosing-your-spec-driven-ai-framework/) ·
[Augment Code SDD tool roundup](https://www.augmentcode.com/tools/best-spec-driven-development-tools) ·
[Graphlit agent-memory survey 2026](https://www.graphlit.com/blog/survey-of-ai-agent-memory-frameworks) ·
[basic-memory](https://github.com/basicmachines-co/basic-memory) · [TRLC](https://github.com/bmw-software-engineering/trlc) ·
[Dataview link-property issues](https://github.com/blacksmithgu/obsidian-dataview/issues/2019) ·
[ADR tooling index](https://adr.github.io/adr-tooling/) · [LikeC4](https://likec4.dev/) ·
[Tessl review (spec-as-source status)](https://codemyspec.com/blog/tessl-review) · [Bagel AI](https://bagel.ai/platform-overview/) ·
[reqSuite RM tools 2026 comparison](https://www.reqsuite.io/en/blog/requirements-management-tools-2026-a-comparison-for-medium-sized-product-developers) ·
[Stanislaw Pankevich's OSS RM tools list](https://gist.github.com/stanislaw/aa40eb7de9f522ad482e5d239c435ff8) ·
[ReqView (git collaboration docs)](https://www.reqview.com/doc/git-collaboration/) ·
[Sparx EA overview](https://sparxsystems.com/products/ea/) · [Sparx MCP server announcement](https://sparxsystems.com/forums/smf/index.php?topic=49025.0) ·
[Archi](https://www.archimatetool.com/) · [coArchi2 plugin](https://github.com/archimatetool/archi-modelrepository-plugin2) ·
[reqT](https://reqt.github.io/) ([metamodel paper, Lund](https://lup.lub.lu.se/search/publication/4191773)) ·
[OpenReq (H2020)](https://github.com/OpenReqEU/OpenReq) ·
[Böckeler — Understanding SDD: Kiro, spec-kit, Tessl (martinfowler.com)](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0001 | execution-item | Findings are single-pass desk research; the four "nearest competitor" claims (Sphinx-Needs, basic-memory, Spec Kit/BMAD, StrictDoc) deserve hands-on trials before informing positioning or roadmap bets. | #synthesis | Synthesis | Run a 1-day hands-on spike per nearest competitor; capture per-requirement evidence; upgrade this scan's verdicts from Assumed to Tested. | medium | open | Victor Hueni | 2026-09-30 | _TBD_ |
| OI-0002 | doc-gap | Lean Canvas §1 "existing alternatives" and §9 Unfair Advantage do not yet reference this scan; the competitive set named there (grep, prose-discipline triad, Atlassian+MCP) predates it. | #synthesis | Synthesis | ~~Backfill Lean Canvas soft-links~~ Done 2026-07-21: §1 competitive-landscape bullet + §9 honest-gap flanks named (Sphinx-Needs, basic-memory, Spec Kit/BMAD, Sparx EA) + §9 positioning soft-links, in the canvas changelog. | low | done | Victor Hueni | 2026-07-21 | _TBD_ |
| OI-0003 | execution-item | Watch-list monitoring: spec-driven tools (Spec Kit, BMAD) adding stable IDs/link-checking, basic-memory adding schema enforcement, or Sparx EA's MCP server gaining adoption among agent-first teams would materially change the threat model. | #synthesis | Synthesis | Re-run this scan at review interval (90d); diff verdict tables. | medium | open | Victor Hueni | 2026-10-21 | _TBD_ |
| OI-0004 | execution-item | Watch cadence falsified: the 2026-07 wave (SARA, Reqord, RTMX, OpenLore) was found days after the initial scan, showing the git-native-traceability quadrant moves faster than a 90-day cycle. | #synthesis | Synthesis | Set up passive monitoring (GitHub topic/HN alerts for "requirements traceability agents", "architectural memory MCP"); do a lightweight monthly sweep of the quadrant between full 90-day refreshes. | medium | open | Victor Hueni | 2026-08-21 | _TBD_ |

## Changelog

- 2026-07-21 · Initial scan · Six categories swept (docs-as-code RM, spec-driven agent dev, agent memory, PKM, architecture-as-code, enterprise RM/EA) against six replacement criteria derived from VISION + Lean Canvas. Verdict: no full replacement; nearest competitors Sphinx-Needs, basic-memory, StrictDoc, and the Spec Kit/BMAD ecosystem.
- 2026-07-21 · RE/EA deep-dive · §1 gains ReqView (file-based commercial RE on git) + ReqIF note; §6 extended with Codebeamer/Visure/objectiF RM; new §7 covers modeling-centric EA (Sparx EA incl. its 2026 MCP server, Archi+coArchi's git-native typed ArchiMate metamodel, Capella). Synthesis + watch-list updated: Sparx EA is now the most important incumbent to watch on the agent-access flank; the RE-depth/EA-breadth seam remains unoccupied.
- 2026-07-21 · Reader-suggested candidates · §1 gains reqT (Lund; typed metamodel in markdown-subset text — closest philosophical ancestor, academic posture, no persistence/agent layer) and OpenReq (ended H2020 research on RE recommendation; different category, lineage only). §2 gains Böckeler's spec-first/spec-anchored/spec-as-source taxonomy (martinfowler.com) with the "architecture-anchored" positioning read-out. ReqView and the Augment SDD roundup were already covered.
- 2026-07-21 · Graduated to strategy layer · Findings persisted as the business competitive landscape: hub + 6 Tier-1 profiles + strategic group map + value curve at [`docs/business/01b-competitive-landscape/`](../business/01b-competitive-landscape/cl-01-five-forces.md). This scan remains the evidence base; strategic read-outs live there.
- 2026-07-21 · 2026-07 wave (founder-sourced) · §1 gains SARA (closest new entrant: markdown+YAML typed graph, validation, matrices, git-ref diff), Reqord (agent-era RM lifecycle + Claude Code plugin), RTMX (test-derived closed-loop traceability over MCP), shtracer. §3 gains OpenLore/Cairn (deterministic code-architecture guardrails — the guard/gate mechanism one layer down). Synthesis: new §3b (quadrant filled from four angles; verdict unchanged; "git-native traceability for agents" no longer available as positioning); nearest-competitor table +2 rows. New OI-0004: watch cadence falsified, add monthly quadrant sweep.
