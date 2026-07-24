---
title: Competitor — SARA (CO-07)
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | tier: 1 (Direct-adjacent) | parent: cl-01-five-forces.md -->

# CO-07 · SARA

The closest single tool to clew's *mechanism* found to date, and the flagship of the
**2026-07 wave**: a Rust CLI treating markdown + YAML frontmatter documents across solution
/ architecture / requirements as one knowledge graph, with a custom model schema,
validation, traceability queries, matrices, and git-ref diffing. Announced on Hacker News
January 2026 as a DOORS alternative for modern workflows.

**Last verified:** 2026-07-21 · **Overall confidence:** Tested (desk research, primary sources) · **Reviewed by:** _TODO_

## Basics

| Field | Value | Source | Confidence |
|---|---|---|---|
| Maker | cledouarec (OSS, individual author) | [GitHub](https://github.com/cledouarec/sara) | Tested |
| Stack | Rust CLI | [Show HN, Jan 2026](https://news.ycombinator.com/item?id=46752826) | Tested |
| Maturity | Young (public ~Jan 2026), active | Same | Tested |

## ICP / Target segments

- Engineering teams wanting DOORS-class traceability without the price or lock-in — solution
  architects and requirements owners working in git with markdown.

## Value proposition

- One knowledge graph from vision to detailed design in plain markdown + git, **so that**
  traceability, consistency, and visibility need no proprietary platform.

## Go-to-market motion / Pricing

| Aspect | Detail | Evidence |
|---|---|---|
| Model | Free OSS; HN/dev-community distribution | [Show HN](https://news.ycombinator.com/item?id=46752826) · 2026-07-21 |

## Product / capability scope

- Custom YAML model schema (user-defined types); validation: broken references, orphaned
  items, circular dependencies, duplicate IDs; upstream/downstream traceability queries;
  coverage/matrix reports; multi-repository aggregation; diff between git commits/branches.

## SWOT — relative to clew

| Dimension | Items | Confidence |
|---|---|---|
| Strengths (vs us) | Shipped and public while clew's CLI is still target-shape; covers much of clew's R2/R3/R4 mechanism (typed graph, validation, matrices, git diff) in one small tool; Rust single-binary distribution. | Tested |
| Weaknesses (vs us) | Scope is solution/architecture/requirements — no business strategy, personas, domain, or plans layer (R1 partial); schema is BYO, no opinionated metamodel or methodology content; IDs author-assigned, checks at validate time not write time; no minted-ID/audit substrate; no agent surface or skill-mediated authoring. | Tested |
| Opportunities (for them) | Adding an MCP surface + richer default schemas would make it the default "SARA for X" answer in the quadrant. | Assumed |
| Threats (they pose) | Occupies the "markdown+git knowledge graph with validation" narrative first — clew can no longer claim generic git-native traceability as its identity. | Tested |

## Strategic implications for us

- Confirms the repositioning imperative: clew's claim must be the *product-architecture
  integrity layer* (minted IDs, write-time enforcement, full metamodel, agent contract), not
  generic traceability.
- Hands-on spike warranted (scan OI-0062): verify depth of its validation and schema
  flexibility first-hand.

## Evidence sources

| Source | URL | Date accessed |
|---|---|---|
| Repo | https://github.com/cledouarec/sara | 2026-07-21 |
| Show HN thread | https://news.ycombinator.com/item?id=46752826 | 2026-07-21 |
| Community write-up | https://dev.to/tumf/sara-a-cli-tool-for-managing-markdown-requirements-with-knowledge-graphs-nco | 2026-07-21 |
| Scan §1 (2026-07 wave) | [discovery scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | 2026-07-21 |

## Changelog

| Date | Change | Source | Confidence change |
|---|---|---|---|
| 2026-07-21 | Initial profile (founder-sourced discovery, verified) | Desk research | Baseline Tested/Assumed |
| 2026-07-24 | Open-items reference renumber (governance sync, no content change): the discovery scan's OI-0001 was renumbered to OI-0062 in the repo-wide collision cleanup; the §Strategic implications spike reference updated. | Central ledger `project-control/open-items/open-items.md` | None |
