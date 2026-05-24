---
title: Lean Canvas
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 60d
---

<!-- doc-version: 1.0 | created: 2026-05-24 | variant: Lean Canvas (Maurya 2010) | timeframe: clew v1 MVP (current-state) -->

# clew · Lean Canvas

**Variant:** Lean Canvas (Ash Maurya, 2010). Chosen over BMC because clew is pre-revenue, pre-product, and high-uncertainty; the riskiest unknowns are persona existence and problem fit, not infrastructure scaling. [OBJ-03](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling) makes this explicit.

**Timeframe:** clew v1 MVP, current-state only. A future-state canvas (post-validation, post-monetisation) belongs in a separate dated file when needed; per skill discipline, this canvas does not mix the two.

**Companion docs:**
- [`docs/VISION.md`](../VISION.md): north star this canvas operationalises.
- [`docs/business/01a-personas.md`](01a-personas.md): P-01 Ava, the only segment in v1.
- [`docs/business/04b-objectives.md`](04b-objectives.md): the OKR set this canvas's Key Metrics roll up to.

**Methodology and bibliography:** see the [`business-model-canvas` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-model-canvas) (Osterwalder & Pigneur 2010, Maurya 2010, Strategyzer practitioner discipline, plus 8-anti-pattern literature).

**Upstream gaps:** value streams (`VS-N.M`), capabilities (`C-N.M`), processes (`proc-NN-{slug}`), FBS functionalities, and quantitative models are not yet defined. Soft-link slots referencing them are marked `_TODO_` and should be wired when those artefacts land.

## Confidence Legend

| Level | Meaning |
|---|---|
| Assumed | Author hypothesis. No external evidence yet. |
| Tested | At least one interview, prototype test, smoke test, or analogous experiment supports the bullet. Directionally positive, not conclusive. |
| Validated | Multiple independent data points or sustained real-world use. High confidence. |

## 1. Problem · *Confidence: Assumed*

Top 3 problems P-01 faces, plus the alternatives she uses today.

- **PR-1.** Architecture coherence rots silently at agent-speed. Personas, value propositions, requirements, and processes drift apart across artefacts because the agent that authored each one has no shared substrate to check against. Failure surfaces weeks later, when a downstream artefact references a renamed or deleted ID and nothing breaks loudly.
- **PR-2.** Cross-artefact questions inside an agent session ("which capabilities serve P-01?", "which OBJ-NN does this KR roll up to?") cost 20+ minutes of grep-and-read, killing flow at exactly the moment momentum matters.
- **PR-3.** BIZBOK / BABOK / Strategyzer / Sommerville disciplines are easy to skip when authoring at velocity, because the methodology lives in a PDF the engineer read once and the agent has never read at all.
- **Existing alternatives P-01 uses today:** hand-rolled markdown conventions + grep; Notion databases with broken relations; bespoke per-team YAML metamodels; spreadsheets; or "trust the agent to remember" (it doesn't).

**Soft-links:** [P-01 §Frustrations](01a-personas.md) · VPC-_TODO_.

## 2. Customer Segments · *Confidence: Assumed*

- **CS-1 · P-01 Ava.** Agent-first product engineer building products solo or in tiny teams (1 to 3 people), using Claude Code or comparable agentic harnesses daily, triggered the moment a new project needs persona / value / requirement / process artefacts the agent can read back later in the same session. Full profile: [P-01 Ava (proto-persona)](01a-personas.md).
- **v1 target size:** ≥ 5 active users running clew on their own projects ([OBJ-03 KR-03.3](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)).
- **Out of scope for v1:** traditional business analysts working without agents; teams already on enterprise BA tooling (Sparx, Mega, ARIS); knowledge-graph generalists; non-product domains (legal, finance, ops).

**Soft-links:** [P-01](01a-personas.md).

## 3. Unique Value Proposition · *Confidence: Assumed*

Each bullet passes the "so that" test: feature *so that* outcome.

- **North-star promise.** A typed, persistent architectural substrate **so that** agent-first product engineers can trust the agent to author at velocity without the *why* and the *who-for* drifting between artefacts.
- **High-concept pitch.** "Git for product architecture": every artefact gets a stable ID, declared relationships, and a confidence rating, **so that** the next agent session can pick up exactly where the last one left off.
- **Concrete win 1.** Ask "which X serves Y?" inside the agent session and get an answer in under 30 seconds, **so that** flow is not broken to go hunt context.
- **Concrete win 2.** Rename, delete, or refactor an artefact and have every broken reference caught at write-time, **so that** drift is impossible instead of silently common.
- **Concrete win 3.** BIZBOK / BABOK / Strategyzer / Sommerville disciplines wired in as first-class typed artefacts with skill-mediated authoring, **so that** methodology becomes the substrate, not a checklist a tired engineer skips.
- **Anti-promise (what clew is not).** Not a knowledge graph for everyone, not a BPMN tool, not a SaaS. The cosmetic layer of docs linting (formatting, prose, dead links) is bundled via [util-docs-lint](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/util-docs-lint); clew's differentiator is the *semantic* layer above that: broken artefact references, missing required relationships, drift a markdown linter cannot see.

**Soft-links:** VS-_TODO_ · VPC-_TODO_.

## 4. Solution · *Confidence: Assumed*

Each solution bullet maps to one specific problem.

- **For PR-1 (drift).** A typed metamodel covering the BIZBOK / BABOK / Strategyzer / Sommerville stack (personas, BMC, capabilities, value streams, processes, objectives, requirements, FBS, domain) with stable IDs and declared relationships, plus a persistence layer that refuses to commit broken references.
- **For PR-1 (silent failure).** Write-time integrity enforcement, so a violation surfaces at the moment it is introduced ([OBJ-02 KR-02.2](04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it)) rather than weeks later when a downstream reader notices.
- **For PR-2 (flow-breaking lookups).** An agent-facing query surface so cross-artefact questions resolve inside the session, targeting [OBJ-01 KR-01.3](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed) (< 30 s).
- **For PR-3 (methodology drift).** A companion skill catalogue ([homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit)) that encodes each methodology as authoring discipline the agent invokes when filling an artefact.
- **Cross-cutting.** Markdown-first export so artefacts remain human-readable and grep-able in the repo, with no proprietary file format walls. Cosmetic docs linting (formatting, prose, dead links) bundled via [util-docs-lint](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/util-docs-lint), layered beneath clew's semantic integrity checks.

**Soft-links:** FBS-_TODO_ · C-_TODO_.

## 5. Channels · *Confidence: Assumed*

At least one channel per phase (discovery / evaluation / delivery / support).

- **Discovery.** Word of mouth among Claude Code and agentic-dev power users; the founder's network; occasional long-form writeups (Substack, HN); talks at BABOK / Strategyzer / agentic-dev community meetups.
- **Evaluation.** Open-source on GitHub. Install in under 5 minutes, run against your own project, decide within a week.
- **Delivery.** CLI plus integration with Claude Code (and other agentic harnesses); local-first, no SaaS in v1.
- **Support.** GitHub Issues; founder-direct loop (email, Discord) for the first cohort.

**Soft-links:** VS-_TODO_ stages.

## 6. Revenue Streams · *Confidence: Assumed*

- **v1: none, by design.** Free and open-source during the validation phase. Monetisation introduced now would pollute the OBJ-03 signal (are users adopting because clew helps, or because it's free?).
- **Pricing model:** N/A in v1.
- **Risk:** developer-tools markets often treat free + open-source as table stakes. A revenue path that doesn't damage the OSS community is undefined and out of scope for this canvas; it belongs in a separate future-state canvas when v1 validates.

**Soft-links:** Quantitative model _TODO_.

## 7. Cost Structure · *Confidence: Assumed*

- **Posture.** Value-driven. Substrate quality is the priority; cost optimisation is not.
- **Dominant cost.** Founder time (Victor Hueni, full-time on engineering, product, and methodology authorship).
- **Second cost.** Agent inference (Claude API) during development and dogfooding.
- **Long-tail cost.** Maintaining the [homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit) skill catalogue. Every methodology added (BIZBOK, BABOK, Strategyzer, Sommerville extensions) is a recurring discipline-maintenance cost, not zero.
- **Near-zero in v1.** Hosting (local-first), sales (no GTM motion), legal (OSS licence, no contracts).

**Soft-links:** Cost model _TODO_.

## 8. Key Metrics · *Confidence: Assumed*

AARRR with at least one metric per stage relevant to v1.

- **Acquisition.** Number of independent agent-first product engineers who clone clew and run it on their own project. Target ≥ 5 ([OBJ-03 KR-03.3](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)).
- **Activation.** Number of users who get their first persona persisted in under 5 minutes on their own project ([OBJ-01 KR-01.1](04b-objectives.md#obj-01--ava-ships-coherent-product-thinking-at-agent-speed)).
- **Retention.** Number of users still authoring artefacts via clew after 4 weeks. No target yet; needs baseline.
- **Referral.** Number of new users who arrived via existing-user word of mouth. No target yet.
- **Revenue.** N/A in v1.

**Soft-links:** Quantitative model _TODO_ · [OBJ-01](04b-objectives.md) · [OBJ-03](04b-objectives.md).

## 9. Unfair Advantage · *Confidence: Assumed*

Honest reflection. Per skill discipline: if it doesn't exist yet, say so.

- **Embedded methodology depth.** clew encodes BIZBOK, BABOK, Strategyzer (Osterwalder, Maurya), and Sommerville disciplines as first-class typed artefacts with skill-mediated authoring. A competitor would have to internalise four bodies of practitioner literature before shipping a comparable substrate.
- **Compounding skill catalogue.** Every methodology skill shipped in [homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit) strengthens clew. The catalogue raises the cost-to-fork over time.
- **Founder's practitioner background.** Victor Hueni's accumulated experience with these frameworks gives faster judgement on where the metamodel must bend and where it must hold.
- **Honest gap.** No insider data, no exclusive licence, no proprietary distribution, no captive customer base, no team. If a well-resourced competitor matches the methodology embedding, the moat is small. This needs deliberate work to deepen, not assumption.

**Soft-links:** Differentiator-rated capability _TODO_.

## Inter-Block Coherence Check

The skill requires every Customer Segment to trace through every block. CS-1 (P-01 Ava) below.

| Block | Coverage for CS-1 |
|---|---|
| Problem | PR-1, PR-2, PR-3 all rooted in Ava's stated frustrations. |
| UVP | 5 of 6 bullets explicitly address Ava's bottleneck (the 6th is the anti-promise). |
| Solution | Every solution bullet maps to PR-1, PR-2, or PR-3. |
| Channels | Discovery, evaluation, delivery, and support phases each name at least one channel reaching Ava's communities. |
| Revenue | None in v1 by design; Ava is not asked to pay. |
| Cost | Founder time plus inference cost; Ava bears zero cost. |
| Key Metrics | Acquisition and Activation tie directly to OBJ KRs measuring Ava's outcome. |
| Unfair Advantage | Methodology depth serves Ava (she will not get it from a generic markdown tool). |

Result: CS-1 traces through every block. No orphan segments.

## Open Issues / Next Tests

- **Riskiest assumption #1:** that P-01 exists at scale beyond the author's head. Tested by OBJ-03 (3 to 5 interviews, ≥ 5 active independent users).
- **Riskiest assumption #2:** that write-time integrity enforcement is worth more than the friction it introduces. Untested until users hit a "no, you can't commit that" error and either thank clew or rage-quit. Smoke test: dogfood for 4 weeks, log every block.
- **Riskiest assumption #3:** that markdown-first export is sufficient. If teams need a UI or graph view to navigate, the UVP cracks. Tested by watching whether interview subjects ask "is there a UI?" within the first 10 minutes.
- **VPC drill-down deferred.** P-01 is the only Tier-1 segment and PMF is uncertain, so a VPC for CS-1 is the natural next companion artefact. Deferred to a follow-up pass.
- **Soft-link gaps:** VS-_TODO_, C-_TODO_, FBS-_TODO_, Quantitative model _TODO_, Cost model _TODO_, VPC-_TODO_. These wire up as the metamodel fills out.

## Changelog

| Date | Block(s) | Evidence | Cascading effects |
|---|---|---|---|
| 2026-05-24 | All 9 blocks scaffolded + filled (Lean Canvas variant). | Drafted from VISION.md, P-01 (Ava), OBJ-01/02/03. All bullets Assumed; no Tested or Validated yet. | [VISION.md](../VISION.md) Linked Artefacts should backfill `Value propositions` slot to reference §3 UVP of this canvas. [04b-objectives.md](04b-objectives.md) Linked-from slots can backfill VP-_TODO_ entries. [01a-personas.md](01a-personas.md) §Frustrations gains a backlink target (PR-1, PR-2, PR-3). |
| 2026-05-24 | §3 UVP anti-promise rewritten; §4 Solution cross-cutting bullet extended. | Author clarification: util-docs-lint (dprint + Vale + markdown-link-check) will be bundled into the clew CLI, so "not a markdown linter" was inaccurate. Reframed as: cosmetic linting bundled, semantic integrity is the differentiator. | None outside the canvas; the rewrite tightens the boundary statement, it does not change Problem, Customer Segments, or Key Metrics. |
