---
type: Competitor Profile
title: Competitor — OpenLore (CO-08)
description: "Tier-1 Indirect/complement competitor profile — OpenLore: deterministic, local-first code-architecture memory and guardrails for AI agents."
tags: [business, competitive-landscape, competitor]
timestamp: 2026-07-21T17:06:15Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | tier: 1 (Indirect / complement) | parent: cl-01-five-forces.md -->

# CO-08 · OpenLore

Strategically the most important find of the **2026-07 wave**: deterministic, local-first
**code-architecture** memory and guardrails for AI agents, with "no LLM in the hot path."
It ships the guard/gate mechanism clew envisions — `record_decision` before code, a
pre-commit hook that blocks unverified changes — one layer down from clew's product scope.
Classified Indirect: overlapping mechanism and audience, different object (code vs product
truth). (The adjacent **Cairn** — declared code plan kept aligned with shipped code, served
to agents as stable JSON/MCP context — sits in the same niche; tracked here jointly.)

**Last verified:** 2026-07-21 · **Overall confidence:** Tested (desk research, primary sources) · **Reviewed by:** _TODO_

## Basics

| Field | Value | Source | Confidence |
|---|---|---|---|
| Maker | clay-good (OSS) | [GitHub](https://github.com/clay-good/OpenLore) | Tested |
| Maturity | Young, active; listed on MCP directories | [mcpmarket listing](https://mcpmarket.com/server/openlore) | Tested |

## ICP / Target segments

- Developers running Claude Code / Cursor-class agents on non-trivial codebases who want
  agents oriented by a stable architecture graph and governed before changes land.

## Value proposition

- Deterministic architectural memory + change certification, **so that** the same question
  always returns the same grounded answer and no agent change lands unreviewed.

## Go-to-market motion / Pricing

| Aspect | Detail | Evidence |
|---|---|---|
| Model | Free OSS; MCP-directory distribution | [GitHub](https://github.com/clay-good/OpenLore) · 2026-07-21 |

## Product / capability scope

- Codebase → navigable knowledge graph (static analysis: call graphs, clusters); living
  specifications via OpenSpec with automated drift detection; 45 graph-native MCP tools;
  `record_decision` workflow + pre-commit gating; deterministic, local, no LLM in hot path.

## SWOT — relative to clew

| Dimension | Items | Confidence |
|---|---|---|
| Strengths (vs us) | The guard/gate + determinism mechanism is *shipped*, with a strong purity claim ("no LLM in the hot path") and deep MCP integration; graph is auto-derived from code, so adoption needs no authoring effort. | Tested |
| Weaknesses (vs us) | No product/business layer at all: no personas, strategy, domain models, PRDs, or plans — it governs whether a change respects the *code* architecture, not whether the product being built is the right one; graph derived, not authored, so it cannot hold intent that isn't in code. | Tested |
| Opportunities (for them) | Extending upward from code architecture toward specs/product intent is conceivable (OpenSpec integration is a first step). | Assumed |
| Threats (they pose) | Claims the "deterministic guardrails for agents" narrative; if it moves up-stack before clew ships, the integrity story arrives code-first rather than product-first. | Assumed |

## Strategic implications for us

- Proves the mechanism and the demand for deterministic agent gating — and proves the
  narrative alone is not ownable. clew's ownable layer is product truth above OpenLore's
  code truth: "OpenLore stops agents breaking the architecture; clew stops them building
  the wrong product."
- Integration candidate, not just rival: a clew↔OpenLore pairing would cover product intent
  down to code structure. Explore once clew's core exists.

## Evidence sources

| Source | URL | Date accessed |
|---|---|---|
| Repo | https://github.com/clay-good/OpenLore | 2026-07-21 |
| MCP directory listing | https://mcpmarket.com/server/openlore | 2026-07-21 |
| Scan §3 assessment | [discovery scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | 2026-07-21 |

## Changelog

| Date | Change | Source | Confidence change |
|---|---|---|---|
| 2026-07-21 | Initial profile (founder-sourced discovery, verified) | Desk research | Baseline Tested/Assumed |
