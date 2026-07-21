---
title: Competitor — StrictDoc (CO-03)
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-21
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-07-21 | tier: 1 (Indirect) | parent: cl-01-five-forces.md -->

# CO-03 · StrictDoc

**Indirect** competitor and clew's closest architectural cousin: its Machine Identifier (MID)
design — stable, non-human-readable IDs that survive human-readable UID renames — is
essentially the ADR-0001/0002 idea shipped, in the requirements-compliance domain.

**Last verified:** 2026-07-21 · **Overall confidence:** Tested (desk research, primary sources) · **Reviewed by:** _TODO_

## Basics

| Field | Value | Source | Confidence |
|---|---|---|---|
| Maker | strictdoc-project (OSS; lead: Stanislav Pankevich) | [GitHub](https://github.com/strictdoc-project/strictdoc) | Tested |
| Maturity | Active; DO-178C-oriented self-documentation; web UI; dogfoods itself | [Docs](https://strictdoc.readthedocs.io/) | Tested |

## ICP / Target segments

- Requirements/compliance engineers (aerospace/safety lineage) who need rigorous
  requirements documents, traceability to source code, and change tracking in git.

## Value proposition

- Requirements with guaranteed-stable identity and a full traceability DAG (docs ⇄ source ⇄
  tests), **so that** compliance-grade change tracking works across renames and refactors.

## Go-to-market motion / Pricing

| Aspect | Detail | Evidence |
|---|---|---|
| Model | Free OSS, community-driven | [GitHub](https://github.com/strictdoc-project/strictdoc) · 2026-07-21 |

## Product / capability scope

- `.sdoc` document format (textX grammar); traceability index (DAG); MIDs + UIDs;
  diff/changelog between document trees; web-based editing UI; RST/HTML/PDF export
  (two-stage Sphinx pipeline); source-file relation roles; JUnit integration.

## SWOT — relative to clew

| Dimension | Items | Confidence |
|---|---|---|
| Strengths (vs us) | The deterministic-ID + rename-survival + diff/changelog problem is *solved and shipped*; serious traceability rigor; active maintenance. | Tested |
| Weaknesses (vs us) | Custom `.sdoc` format (not markdown; readable but not idiomatic); requirements domain only — no personas/canvas/domain/ADR layers; no agent-native surface; Sphinx-lineage toolchain. | Tested |
| Opportunities (for them) | Markdown input support or an MCP layer would broaden reach. | Assumed |
| Threats (they pose) | Low direct threat (different segment); main risk is talent-of-idea: it proves the substrate design clew bets on, so others can copy it too. | Assumed |

## Strategic implications for us

- Steal shamelessly (it's open source): MID/UID split, diff/changelog UX, and traceability
  index design are directly relevant prior art for clew's persistence layer.

## Evidence sources

| Source | URL | Date accessed |
|---|---|---|
| Docs (MIDs, traceability) | https://strictdoc.readthedocs.io/ | 2026-07-21 |
| FAQ (tool comparisons) | https://strictdoc.readthedocs.io/en/latest/sphinx/strictdoc_03_faq.html | 2026-07-21 |
| Scan §1 assessment | [discovery scan](../../discovery/competitive-landscape-2026-07-21-clew-replacement-scan.md) | 2026-07-21 |

## Changelog

| Date | Change | Source | Confidence change |
|---|---|---|---|
| 2026-07-21 | Initial profile from discovery scan | Desk research | Baseline Tested/Assumed |
