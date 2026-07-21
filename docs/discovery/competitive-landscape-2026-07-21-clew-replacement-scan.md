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

## 2 · Spec-driven agent development

The category that shares clew's *audience* (agent-first engineers) and R4/R5 posture, but not
its *object* — these tools manage per-feature implementation specs, not a persistent product
architecture. Artefacts are LLM-authored prose files: no typed graph, no minted IDs, no
referential enforcement.

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

**Verdict: different category on posture alone.** Jama Connect, Polarion, IBM DOORS Next
(requirements: strong R1-subset/R2/R3/R6 within their domain) and Ardoq/LeanIX (EA
metamodels with capability maps — the only tools besides clew that treat *business
architecture* as first-class typed data) are all cloud/server platforms: not markdown, not
git-source-of-truth, not local-first, not single-writer, API-metered for agents. They violate
R4/R5 by construction and clew's "Not a cloud SaaS" boundary. Atlassian+MCP was already
tried and rejected in [wave 1](interviews/research-synthesis-2026-05-24-P-01-validation.md)
(API complexity, token cost). Emerging SaaS "decision layers for AI-native teams" (e.g.
[Bagel AI](https://bagel.ai/) — customer-signal decisions served to Cursor/Claude Code over
MCP) confirm the "agents need product context" thesis but from the opposite architecture:
cloud-hosted, signal-driven, token-metered.

## Synthesis

**1 · No full replacement exists.** Nothing found covers R1 at all — no tool ships an
opinionated metamodel that spans strategy → market → specs → domain → ADRs. Since R1+R2
together are clew's core, every candidate fails on at least one of them:

- Requirements tools have R2/R3 but no strategy layer and no agent surface.
- Spec-driven tools have the agent surface but LLM-authored, unenforced artefacts.
- Memory layers have the agent surface but probabilistic, non-artefact storage.
- PKM has the files but no enforcement.
- EA suites have the metamodel breadth but the wrong (SaaS) architecture.

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
[Stanislaw Pankevich's OSS RM tools list](https://gist.github.com/stanislaw/aa40eb7de9f522ad482e5d239c435ff8).

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0001 | execution-item | Findings are single-pass desk research; the four "nearest competitor" claims (Sphinx-Needs, basic-memory, Spec Kit/BMAD, StrictDoc) deserve hands-on trials before informing positioning or roadmap bets. | #synthesis | Synthesis | Run a 1-day hands-on spike per nearest competitor; capture per-requirement evidence; upgrade this scan's verdicts from Assumed to Tested. | medium | open | Victor Hueni | 2026-09-30 | _TBD_ |
| OI-0002 | doc-gap | Lean Canvas §1 "existing alternatives" and §9 Unfair Advantage do not yet reference this scan; the competitive set named there (grep, prose-discipline triad, Atlassian+MCP) predates it. | #synthesis | Synthesis | Backfill Lean Canvas soft-links to this artefact on next canvas revision; consider whether §9 honest-gap bullet should name Sphinx-Needs/basic-memory explicitly. | low | open | Victor Hueni | 2026-09-30 | _TBD_ |
| OI-0003 | execution-item | Watch-list monitoring: spec-driven tools (Spec Kit, BMAD) adding stable IDs/link-checking, or basic-memory adding schema enforcement, would materially change the threat model. | #synthesis | Synthesis | Re-run this scan at review interval (90d); diff verdict tables. | medium | open | Victor Hueni | 2026-10-21 | _TBD_ |

## Changelog

- 2026-07-21 · Initial scan · Six categories swept (docs-as-code RM, spec-driven agent dev, agent memory, PKM, architecture-as-code, enterprise RM/EA) against six replacement criteria derived from VISION + Lean Canvas. Verdict: no full replacement; nearest competitors Sphinx-Needs, basic-memory, StrictDoc, and the Spec Kit/BMAD ecosystem.
