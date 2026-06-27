---
title: Agent-tooling skills regroup into an `agent-` package (Agent-Centric Development Cycle)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Agent-tooling skills regroup into an `agent-` package (Agent-Centric Development Cycle)

## Context and Problem Statement

Four kit skills sit in packages whose prefix no longer matches what the skill *is*:

- `dev-agent-config` — configures the agent (`CLAUDE.md` / `AGENTS.md`): context, standards, guardrails.
- `dev-ralph-loop` — drives the agent through autonomous increment execution. Its `metadata.category`
  is already `execution`, **disagreeing with its `dev-` prefix**.
- `spec-peer-review` — critiques an existing PRD / plan for gaps. A *review method*, not a product spec.
- `spec-grill-me` — Socratically stress-tests an existing PRD / plan. Also a method, not a spec.

`dev-` is developer-workflow plumbing (git, PRs, worktrees, reference guides); `spec-` is *product
specification* (FBS, quality attributes, use cases, PRDs). None of these four fit: two operate the
agent, two review artefacts. They share one trait — **none mints a metamodel artefact** — and one
purpose: they are the loop that wraps agent code-generation.

Question: **do these four belong together, and under what package?**

## Decision Drivers

- Keep each package mapped 1:1 to a single, coherent discipline (the same driver as
  [ADR-0009](adr-0009-plan-package-split-from-product-specs.md)).
- A package name should name a *discipline*, not "things an agent happens to run" (which would absorb
  every skill).
- Do not pollute the reserved `qa-` category, which is for *tests that verify the product*.
- Minimal disruption: these skills mint no IDs, so no artefact type, ID, or instance changes.
- clew is the metamodel SoT ([ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md)) —
  the decision originates here and propagates to the kit.

## Considered Options

- **A. Leave them in `dev-`/`spec-`.** Status quo; prefixes keep contradicting the skills' nature
  (`dev-ralph-loop`'s category already says `execution`).
- **B. One `agent-` package, organised by the Agent-Centric Development Cycle (chosen).** Group all
  four under the AC-DC **Guide → Verify → Solve** loop.
- **C. Two packages — `agent-` (config + loop) and `review-` (grill + peer-review).** Cleaner by
  sub-discipline, but proliferates one/two-skill packages and misses the unifying cycle.
- **D. Move the review pair into `qa-`.** Conflates *in-cycle spec verification* with *product
  testing*; muddies the reserved `qa-` boundary.

## Decision Outcome

**Chosen: B — a single `agent-` (Agent-Centric Development Cycle) package**, framed on SonarSource's
[AC-DC](https://www.sonarsource.com/blog/the-future-is-ac-dc-the-agent-centric-development-cycle/)
**Guide → Verify → Solve** triad. The cycle is the unifying discipline; each skill maps to a pillar.

| Was | Becomes | AC-DC pillar |
| :-- | :-- | :-- |
| `dev-agent-config` | `agent-config` | **Guide** — context, standards, guardrails before work |
| `spec-grill-me` | `agent-grill-me` | **Verify** · inner loop — live Socratic stress-test |
| `spec-peer-review` | `agent-peer-review` | **Verify** · outer loop — static review by severity |
| `dev-ralph-loop` | `agent-ralph-loop` | **Solve** — autonomous increment execution |

- **These skills mint no IDs and write no `docs/` artefacts.** No artefact type, ID, instance,
  dependency-graph, or ER change; no `artefact-types-registry.md` row (they have none).
- **Boundary with `qa-`:** `agent-` Verify checks the *specs and the agent's work in-cycle*
  (before/while building); the reserved `qa-` produces the *tests* that verify the shipped product's
  `QA-XXNN` requirements. Different fact-class, different SDLC stage — `qa-` stays reserved for tests.
- Touchpoints are by *reference*, not ownership: the Verify skills read a `prd` / `implementation_plan`
  and `agent-grill-me` crystallises decisions into `adr` via `arch-adr` (owned by Architecture);
  `agent-ralph-loop` consumes a `plan-implementation` and emits committed code.

This adds a fifth **supporting** package (`agent-`, alongside `ux-`/`com-`/`dev-`/`util-`); the eight
ID-minting metamodel packages are unchanged.

## Consequences

**Positive** — every skill's prefix now matches its discipline (`agent-ralph-loop`'s category/prefix
contradiction is resolved); the agent loop has a principled spine (Guide/Verify/Solve) instead of an
ad-hoc bucket; `qa-` stays clean for product tests; no instance re-mint.

**Negative / cascade** — as the SoT change, this propagates to the kit: rename four skills, update
`metamodel.md` (supporting-skills list + prefix→folder), `skill-creation-sync.md` (categories table),
`metamodel-changelog.md`, `README.md` skill index, and cross-refs. Tracked below.

## Related decisions

- **Exercises** [ADR-0008](adr-0008-clew-canonical-source-of-truth-for-metamodel.md) — clew defines the
  package taxonomy; the kit conforms downstream.
- **Same pattern as** [ADR-0009](adr-0009-plan-package-split-from-product-specs.md) — a package recut
  originating in clew, cascaded to the kit by manual PR ahead of `clew metamodel export`.

## Open Items

| OI-ID  | Type           | Summary                                                                                              | Source anchor      | Source heading      | Resolution path                                                                                   | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :------------- | :--------------------------------------------------------------------------------------------------- | :----------------- | :------------------ | :------------------------------------------------------------------------------------------------ | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0036 | doc-gap        | Apply the `agent-` package across clew's metamodel docs (new `agent.md`, `dev.md`, README support table). | #decision-outcome  | Decision Outcome    | This change.                                                                                       | high     | closed | Victor Hueni | 2026-06-27        | This commit |
| OI-0037 | execution-item | Kit cascade — rename the four skills to `agent-*`; update `metamodel.md` + `skill-creation-sync.md` + `README.md` + cross-refs. | #consequences      | Consequences        | Kit-side PR (manual, ahead of `clew metamodel export`). | medium   | closed | Victor Hueni | 2026-06-27        | [kit PR #52](https://github.com/VictorHueni/homemade-claude-kit/pull/52) merged (`602296b`); 21 files |

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-06-27 | Initial draft. Regroup `agent-config`, `agent-grill-me`, `agent-peer-review`, `agent-ralph-loop` into a new `agent-` (Agent-Centric Development Cycle) supporting package; skills mint no IDs, so no metamodel-structure change. Exercises ADR-0008 (clew as SoT); kit cascade tracked as OI-0037. | Victor Hueni |
