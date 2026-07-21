---
title: Competitor — BMAD-METHOD (CO-05)
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | tier: 1 (Indirect) | parent: cl-01-five-forces.md -->

# CO-05 · BMAD-METHOD

**Indirect** competitor and the only tool in any category that *touches* clew's upstream
layers: it simulates an agile team of 12+ specialized AI agents (Analyst, PM, Architect, UX,
QA, …) producing briefs, PRDs, and architecture docs with file-based handoffs — validating
demand for multi-role, full-lifecycle artefact discipline without competing on the substrate.

**Last verified:** 2026-07-21 · **Overall confidence:** Tested (desk research, primary sources) · **Reviewed by:** _TODO_

## Basics

| Field | Value | Source | Confidence |
|---|---|---|---|
| Maker | bmad-code-org (OSS community, "Breakthrough Method for Agile AI-Driven Development") | [GitHub](https://github.com/bmad-code-org/BMAD-METHOD) | Tested |
| Maturity | Active, large community; regarded as the most architecturally ambitious SDD framework | [Reenbit, May 2026](https://reenbit.com/bmad-vs-spec-kit-vs-openspec-choosing-your-spec-driven-ai-framework/) | Tested |

## ICP / Target segments

- Agent-first engineers and small teams on larger/greenfield projects who want the *whole*
  SDLC (analysis → PM → architecture → dev → QA) role-played by agents with documented
  handoffs.

## Value proposition

- A full simulated team with a traceable requirements-to-delivery artefact chain, **so
  that** solo builders get enterprise-style planning discipline from agents.

## Go-to-market motion / Pricing

| Aspect | Detail | Evidence |
|---|---|---|
| Model | Free OSS; community-driven (courses/content ecosystem around it) | [GitHub](https://github.com/bmad-code-org/BMAD-METHOD) · 2026-07-21 |

## Product / capability scope

- Agent personas + workflows per SDLC role; markdown artefact templates (brief, PRD,
  architecture, stories); file-based handoffs between agents. Chain is traceable **by
  convention only**: no IDs, no typed relationships, no integrity checks; artefacts rot
  silently after generation.

## SWOT — relative to clew

| Dimension | Items | Confidence |
|---|---|---|
| Strengths (vs us) | Only competitor covering business-analysis-to-QA breadth; strong community; proves P-01-like users want multi-role artefact discipline (evidence for clew's UVP Concrete win 3). | Tested |
| Weaknesses (vs us) | Generation-time discipline with no persistence substrate: nothing prevents drift, nothing is queryable, nothing enforces references — the artefacts are prose the LLM wrote. | Tested |
| Opportunities (for them) | Bolting a typed store under their artefact chain is conceivable and would be a direct attack on clew. | Assumed |
| Threats (they pose) | Its breadth makes "we already document everything with BMAD" a plausible objection even though the substrate guarantees differ entirely. | Assumed |

## Strategic implications for us

- Natural integration target rather than pure rival: BMAD's role-agents could author *into*
  clew's typed artefacts (the kit's skills already play the analogous role).
- Its popularity is market evidence for the full-lifecycle scope choice in clew's VISION.

## Evidence sources

| Source | URL | Date accessed |
|---|---|---|
| Repo | https://github.com/bmad-code-org/BMAD-METHOD | 2026-07-21 |
| Category comparison | https://reenbit.com/bmad-vs-spec-kit-vs-openspec-choosing-your-spec-driven-ai-framework/ | 2026-07-21 |
| Scan §2 assessment | [discovery scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | 2026-07-21 |

## Changelog

| Date | Change | Source | Confidence change |
|---|---|---|---|
| 2026-07-21 | Initial profile from discovery scan | Desk research | Baseline Tested/Assumed |
