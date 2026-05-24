---
title: Personas
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 90d
---

# Personas

This document is the singleton hub for every user, stakeholder, and non-target ("negative") persona that clew is designed for, or explicitly designed *against*. Personas are not marketing fiction; they are design contracts. Each persona answers: *if removing this detail would change a design or prioritisation decision, it stays; otherwise, it goes.*

Methodology and bibliography: see the [`business-persona` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/main/business-persona), which composes BABOK §10.43 (stakeholder identification), Cooper goal-directed design, NNG design-decision-relevance, Pruitt & Adlin persona lifecycle, Lene Nielsen methodology, Lean UX proto-persona discipline, and Jobs-to-be-Done framing.

## §Persona Template

> Copy this block when minting a new persona under `## §Personas`.

### P-NN · {{name}}, {{tagline}}

| Field | Value |
|---|---|
| Persona type | Primary / Secondary / Supplemental / Served / Customer / Negative |
| Tier | 1 / 2 / 3 / Negative |
| Lifecycle status | Proto / Research-grounded / Retired |
| Quote | "One memorable sentence in the persona's voice." |

#### §Snapshot

| Field | Value |
|---|---|
| Role | _TODO_ |
| Org | _TODO_ |
| Domain experience | _TODO_ |
| Usage frequency | _TODO_ |
| Usage context | _TODO_ (optional) |
| Primary language | _TODO_ (optional) |

#### §Bio

_TODO_ (2–3 sentences on day-to-day work with the product or problem).

#### §Goals

_TODO_ (3–5 goals, framed as JTBD: "When [trigger], I want [motivation], so I can [outcome].").

#### §Scenarios

_TODO_ (1–2 short narratives: triggering event → reasoning → action → outcome).

#### §Frustrations

_TODO_ (3–5 domain-specific frustrations, not generic UX complaints).

#### §Key Tasks

_TODO_ (concrete product actions; maps to FBS).

#### §System Needs

_TODO_ (quality attributes with persona-specific rationale: speed, accuracy, traceability, auditability, explainability, cognitive load, bulk operations, API, offline).

#### §Stakeholder Profile

| Dimension | Value |
|---|---|
| Authority | _TODO_ |
| Interest | Supportive / Neutral / Sceptical / Resistant |
| Attitude | _TODO_ |
| RACI | Responsible / Accountable / Consulted / Informed |
| Engagement strategy | _TODO_ |

#### §Research Grounding

| Field | Value |
|---|---|
| Evidence type | proto-persona (assumption) / research-grounded |
| Sample | _TODO_ |
| Sources | _TODO_ |
| Created | YYYY-MM-DD |
| Last validated | _TODO_ |
| Next review | YYYY-MM-DD (≤90 days for proto-personas) |

---

## §Persona Backlog

### §Tier 1 · Primary

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| P-01 | Ava | Agent-first product engineer | Primary | clew CLI | Coherent multi-artefact product thinking at agent-speed | Proto |

### §Tier 2 · Secondary

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| P-02 _TODO_ | _TODO_ | The product partner (non-engineering co-founder, designer, or domain expert) | Secondary | `snapshot/` YAML in git; marimo notebooks (read-only) | Shared understanding of what the product does and why, without running clew commands | Backlog |

### §Tier 3 · Tertiary

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| (none yet) | | | | | | |

> **Note.** The "onboarding agent" (a new Claude or Codex session picking up a project) is intentionally *not* listed as a persona. It is a design constraint already captured in P-01's §System Needs (composability with Bash, schema legibility, deterministic IDs). Treating the agent as a separate persona would dilute Cooper's "max one primary per surface" discipline.

### §Negative personas

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| P-N1 _TODO_ | _TODO_ | The enterprise programme manager | Negative | n/a | Sprint accounting, ticket lifecycle, and Gantt charts. Explicitly not clew's purpose. | Backlog |
| P-N2 _TODO_ | _TODO_ | The free-form wiki author | Negative | n/a | Author unrestricted markdown with no referential or schema constraints. clew enforces structure on purpose. | Backlog |

### §Out of scope

- **Multi-human real-time collaborators.** Single-writer per repo by design; concurrent editing is a v3+ concern.
- **End consumers of the products built with clew.** Those personas live *inside* the agent's project, modelled by clew, not as users of clew itself.
- **Stakeholders with no repo access at all.** Read access via YAML in git is the intended channel. No Slack-only or email-only delivery surface in v1 or v2.

---

## §Personas

### P-01 · Ava, the agent-first product engineer

| Field | Value |
|---|---|
| Persona type | Primary |
| Tier | 1 |
| Lifecycle status | Proto-persona |
| Quote | "I can ship a product faster than I can document one. That's the bug." |

#### §Snapshot

| Field | Value |
|---|---|
| Role | Solo founder or technical lead on a small (1–3 person) product team |
| Org | Indie, pre-seed, or early-stage; no formal product-management function |
| Domain experience | 5–15 years building software products; in the last 12 months shifted to agent-driven authoring as the default workflow |
| Usage frequency | Daily, multiple sessions; clew runs in every active agent session |
| Usage context | Local terminal alongside Claude Code or Codex; one repo at a time |
| Primary language | English (working) |

#### §Bio

Ava is a solo founder or small-team product engineer who has stopped writing most code by hand. They use Claude Code, Codex, or both to author code, architecture, PRDs, and ADRs in the same flow, often shipping several decisions per day. Their bottleneck is no longer typing or even thinking; it is keeping the *why* and the *who-for* coherent across artefacts as the agent moves at agent-speed.

#### §Goals

1. **When** I'm starting a new product idea, **I want** every strategic artefact (vision, personas, capabilities, market context) to live in one structured place from day one, **so I can** let the agent build on a coherent foundation instead of re-deriving context every session.
2. **When** the agent invents a feature or makes an architectural decision, **I want** the trace from that decision back to the persona, capability, and objective it serves, **so I can** sanity-check the work without re-reading the whole repo.
3. **When** I refactor the product (new capability, new persona, dropped epic), **I want** broken references to surface immediately, **so** drift does not compound into silent incoherence.
4. **When** I onboard another agent or another human into the project, **I want** the full architecture queryable in one place, **so** they can pick up the product mid-flight without me re-explaining.
5. **When** I review what shipped this week, **I want** to ask cross-cutting questions (which PRDs serve KR-03, which epics touch BC-02), **so** strategy stays connected to delivery instead of drifting apart.

#### §Scenarios

**Scenario 1 · The Friday-afternoon pivot.** Ava is two months into a clinical-scheduling tool. After a customer call, the primary persona shifts from "OR coordinator" to "head nurse." Ava asks Claude Code to update the persona and re-derive any affected epics. Without clew, the agent rewrites the persona file but quietly leaves three downstream PRDs and a capability map stale. With clew, the persona update triggers an integrity check; the agent surfaces the seven artefacts that now reference an outdated assumption, and revises each one in the same session.

**Scenario 2 · The Wednesday-morning sanity check.** Ava opens the repo after two days away. They want to know "which PRDs serve KR-03, and which of those are still in scope after last week's roadmap change?" With markdown alone, that question is a 20-minute grep-plus-read exercise. With clew, it is `clew list prd --kr KR-03 --status in-scope` and a 15-second answer that orients the whole session.

#### §Frustrations

- The agent invents IDs that collide with existing ones, or forgets the canonical ID and uses a paraphrase ("the surgery-scheduling persona" instead of P-02), making cross-references unreliable.
- Project-management tools (Jira, Linear) want to track tickets, not requirements; importing strategic artefacts there turns them into to-do items and loses the *why*.
- After a refactor, broken references sit silently in markdown for weeks until something downstream catches fire.
- Strategy documents written in week one become unread fossils by week three because nothing keeps them connected to the code that gets shipped.
- Onboarding a second agent (or human) means re-explaining the architecture from scratch because there is no queryable substrate.

#### §Key Tasks

- Mint a new persona, capability, objective, KR, bounded context, or PRD and get a deterministic ID back.
- Link an FBS functionality to an epic, or an epic to an objective and its key results.
- Query the graph: "what does this epic serve?" / "which artefacts reference P-01?" / "where is BC-02 used?"
- Run a refactor: rename, re-tier, or retire an artefact and see the full downstream impact before committing.
- Export the metamodel to YAML for git review, code review, or sharing with a non-CLI collaborator.

#### §System Needs

- **Speed.** Every clew command returns in well under a second locally; latency breaks the agent's flow.
- **Determinism.** Same input always produces the same ID and the same YAML output, so git diffs reflect real change, not LLM serialisation noise.
- **Referential integrity at write time.** Broken FKs fail loudly with a clear, machine-parseable error the agent can recover from on the next call.
- **Composability with Bash.** Every command is scriptable, pipeable, and free of interactive prompts that would block an agent loop.
- **Local-first.** Works offline, no account, no network call; the repo is the source of truth.
- **Schema legibility.** A single document defines the 16 artefacts and their relationships, so onboarding a new agent is one file read away.

#### §Stakeholder Profile

| Dimension | Value |
|---|---|
| Authority | High; solo founder or technical lead with unilateral decision power over product and architecture choices. |
| Interest | Very high; clew directly shapes the daily workflow. |
| Attitude | Supportive but exacting. Will adopt if the tool earns its place inside 15 minutes; will discard it the moment it adds friction. |
| RACI | Responsible and Accountable (their repo, their call). |
| Engagement strategy | Optimise for time-to-first-value: `clew init` to first persona minted in under 5 minutes. Document the metamodel and CLI in the repo itself; do not require external docs. Treat onboarding friction reports as P0. |

#### §Research Grounding

| Field | Value |
|---|---|
| Evidence type | proto-persona (assumption) |
| Sample | none yet; persona derived from the project author's own workflow and the audience defined in `VISION.md`. |
| Sources | `docs/VISION.md` (this repo); `docs/architecture/decisions/0001-metamodel-persistence-layer.md` motivation section. |
| Created | 2026-05-24 |
| Last validated | n/a |
| Next review | 2026-08-22 (≤90 days, per Lean UX validate-or-retire discipline) |
| Conversion plan | Validate via 3–5 interviews with solo founders or small-team engineers actively shipping with Claude Code or Codex as primary co-author. Promote to research-grounded once notes are filed and key claims (frustrations, goals, snapshot fields) are confirmed or revised. |

---

## Changelog

- 2026-05-24 · Scaffold · Created `personas.md` with template, backlog, and `§Personas` section per the `business-persona` skill.
- 2026-05-24 · Fill-One · P-01 Ava (agent-first product engineer) added as proto-persona, Primary, Tier 1. Next review 2026-08-22.
- 2026-05-24 · Backlog · Refined Tier 2 to one persona (the product partner). Removed the "onboarding agent" entry (captured as a design constraint in P-01's §System Needs, not a separate persona). Added P-N2 (the free-form wiki author) to the negative roster.
