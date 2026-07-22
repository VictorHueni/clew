---
title: Competitor — basic-memory (CO-01)
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | tier: 1 (Direct) | parent: cl-01-five-forces.md -->

# CO-01 · basic-memory

The nearest **Direct** competitor: same segment (agent-first builders on Claude/MCP), same
storage philosophy (local-first markdown in git), overlapping value proposition (persistent
knowledge your agent reads and writes). Differs on the decisive layer: generic unenforced
schema vs clew's opinionated, referentially-enforced metamodel.

**Last verified:** 2026-07-21 · **Overall confidence:** Tested (desk research, primary sources) · **Reviewed by:** _TODO_

## Basics

| Field | Value | Source | Confidence |
|---|---|---|---|
| Maker | Basic Machines (basicmachines-co) | [GitHub](https://github.com/basicmachines-co/basic-memory) | Tested |
| Type | Open source + hosted cloud option | [Docs](https://docs.basicmemory.com/start-here/what-is-basic-memory) | Tested |
| Maturity | Active, shipping (incl. companion "memory skills" repo for reflection/defrag) | [basic-memory-skills](https://github.com/basicmachines-co/basic-memory-skills) | Tested |

## ICP / Target segments

- Developers/knowledge workers using Claude Desktop, Claude Code, Cursor, or ChatGPT who are
  tired of re-explaining context, and want conversations to accumulate into a local, portable
  knowledge base.

## Value proposition

- "AI conversations that actually remember" — knowledge persists as plain markdown you own,
  readable by human and agent alike, **so that** context survives across sessions with no
  cloud dependency.

## Go-to-market motion

| Aspect | Approach | Evidence |
|---|---|---|
| Sales model | OSS/PLG, MCP-directory distribution, Discord community | [GitHub](https://github.com/basicmachines-co/basic-memory) · 2026-07-21 |
| Channels | MCP server directories, Claude-ecosystem word of mouth | [mcpservers.org listing](https://mcpservers.org/servers/basicmachines-co/basic-memory) · 2026-07-21 |

## Pricing model

| Aspect | Detail | Evidence |
|---|---|---|
| Model type | Free OSS core; cloud sync as paid layer | [Docs](https://docs.basicmemory.com/start-here/what-is-basic-memory) · 2026-07-21 |

## Product / capability scope

- Notes as **entities** with categorized **observations** and typed **relations**
  (wikilinks); semantic graph derived from markdown; semantic + full-text search; MCP
  read/write from all major agent clients; sync across projects.

## SWOT — relative to clew

| Dimension | Items | Confidence |
|---|---|---|
| Strengths (vs us) | Shipping today with real users and multi-client MCP integration; simplest possible mental model; owns the "markdown memory for agents" mindshare clew also needs. | Tested |
| Weaknesses (vs us) | Generic entity/observation/relation schema — no product metamodel, so cross-artefact discipline is the user's problem; relations are wikilink-loose: no write-time FK enforcement, no rename impact analysis, no deterministic IDs, no audit trail — exactly clew's PR-1/PR-2/PR-3. | Tested |
| Opportunities (for them) | Adding typed schemas/templates would move it directly onto clew's seam with a distribution head start. | Assumed |
| Threats (they pose) | Good-enough effect: users adopt it as "memory solved" and never feel the need for enforced structure until much later. | Assumed |

## Strategic implications for us

- Sharpest positioning foil: **clew = basic-memory + an opinionated, enforced metamodel** —
  use the contrast, don't dismiss the tool.
- Watch for schema/template features in their releases (tier-4 trigger in the hub).

## Evidence sources

| Source | URL | Date accessed |
|---|---|---|
| GitHub repo | https://github.com/basicmachines-co/basic-memory | 2026-07-21 |
| Product docs | https://docs.basicmemory.com/start-here/what-is-basic-memory | 2026-07-21 |
| Scan §3 assessment | [discovery scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | 2026-07-21 |

## Changelog

| Date | Change | Source | Confidence change |
|---|---|---|---|
| 2026-07-21 | Initial profile from discovery scan | Desk research | Baseline Tested/Assumed |
