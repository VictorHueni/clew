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
| P-01 | Ava | Agent-first product engineer | Primary | clew (daily authoring) | Coherent multi-artefact product thinking at agent-speed | Proto |

### §Tier 2 · Secondary

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| P-02 _TODO_ | _TODO_ | The product partner (non-engineering co-founder, designer, or domain expert) | Secondary | The published architecture (read-only, reviewed in version control) | Shared understanding of what the product does and why, without authoring it | Backlog |

### §Tier 3 · Tertiary

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| (none yet) | | | | | | |

> **Note.** A new Claude or Codex session picking up a project is intentionally *not* listed as a persona. It is a design constraint already captured in P-01's §System Needs (responsiveness, scriptability, discoverable structure). Treating the agent as a separate persona would dilute Cooper's "max one primary per surface" discipline.

### §Negative personas

| ID | Name | Role | Cooper type | Surface | Key job outcome | Status |
|---|---|---|---|---|---|---|
| P-N1 _TODO_ | _TODO_ | The enterprise programme manager | Negative | n/a | Sprint accounting, ticket lifecycle, and Gantt charts. Explicitly not clew's purpose. | Backlog |
| P-N2 _TODO_ | _TODO_ | The free-form wiki author | Negative | n/a | Author unrestricted markdown with no referential or schema constraints. clew enforces structure on purpose. | Backlog |

### §Out of scope

- **Multi-human real-time collaborators.** Single-writer per repo by design; concurrent editing is a v3+ concern.
- **End consumers of the products built with clew.** Those personas live *inside* the agent's project, modelled by clew, not as users of clew itself.
- **Stakeholders with no access to the project source at all.** Read access to the published architecture in version control is the intended channel. No Slack-only or email-only delivery surface in v1 or v2.

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

1. **When** I'm starting a new product idea, **I want** every strategic artefact (vision, personas, capabilities, market context) to live in one structured place from day one, **so I can** let the agent build on a coherent foundation instead of re-deriving context every session. *(Tested · N=1)*
2. **When** the agent invents a feature, I review what shipped, or I revisit a claim weeks later, **I want** to trace from any artefact to its ancestors, descendants, and grounding evidence (the personas it serves, the KRs it rolls up to, the external sources or URLs that back its claims), **so I can** sanity-check work, audit decisions, and reconnect strategy to delivery without re-reading the whole repo. *(Tested · N=1)*
3. **When** I refactor the product (new capability, new persona, dropped epic, renamed structure), **I want** broken references to surface at write-time, **so** drift does not compound into silent incoherence weeks later. *(Tested · N=1)*
4. **When** I onboard another agent or another human into the project, **I want** the full architecture queryable in one place, **so** they can pick up the product mid-flight without me re-explaining. *(Tested · N=1)*
5. **When** I start a new agent session for a specific task (PRD authoring, test design, ops runbook), **I want** to give the agent exactly the slice of the metamodel relevant to that task (VISION+BMC for orientation, glossary+domain model for PRD, test strategy for QA), **so** the agent has the right context without wading through every artefact in the repo. *(Tested · N=1)*

#### §Scenarios

**Scenario 1 · The Friday-afternoon pivot.** Ava is two months into a clinical-scheduling tool. After a customer call, the primary persona shifts from "OR coordinator" to "head nurse." Ava asks Claude Code to update the persona and re-derive any affected epics. Without clew, the agent rewrites the persona document but quietly leaves three downstream requirements and a capability map stale. With clew, the persona update surfaces every artefact that still references the old assumption, and the agent revises each one in the same session.

**Scenario 2 · The Wednesday-morning sanity check.** Ava opens the project after two days away and wants to know "which requirements serve our top goal, and which of those are still in scope after last week's roadmap change?" With prose documents alone, that question is a 20-minute reading exercise. With clew, it is a single question to the tool and a 15-second answer that orients the whole session.

#### §Frustrations

Ordered by priority per the [wave-1 P-01 validation synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md).

1. **No reliable traceability matrix or documentation relationship graph that comes directly from the documents themselves.** Cross-artefact questions (which capability serves P-01, which KRs roll up to OBJ-02, which features land in epic E-02) cannot be answered without the LLM scoping IDs from files and joining them in its head. Cross-artefact analytics (effort estimation, quantitative models) are blocked for the same reason. Even the existence of broken references is invisible without bespoke grep. *(Tested · N=1, founder-as-instance)*
2. **No confidence in integrity-check or audit when relying solely on the LLM.** The LLM silently renumbers items while updating an artefact; it forgets or paraphrases canonical IDs instead of using them; downstream references rot. Determinism is the missing primitive: same input, same output, every time, with an audit trail anyone (human or future agent) can replay. *(Tested · N=1, founder-as-instance)*
3. **Changing structure, name, or ID has massive blast radius across existing docs.** A folder rename, an artefact renumber, or a schema refactor means scanning every file for references and either fixing them by hand or trusting the agent to find them all (which is the audit-confidence problem above). Even after a careful pass, dead links keep surfacing weeks later. *(Tested · N=1, founder-as-instance)*

#### §Key Tasks

- Mint a new persona, capability, objective, key result, bounded context, or PRD and receive a stable identifier to refer to it from then on.
- Connect artefacts: link a functionality to an epic, an epic to an objective and its key results.
- Ask the architecture cross-cutting questions: "what does this epic serve?" / "which artefacts reference this persona?" / "where is this domain area used?"
- Refactor with confidence: rename, re-tier, or retire an artefact and see the full downstream impact before committing.
- Share the architecture in a form colleagues can review alongside the work, including those who do not use the tool directly.

#### §System Needs

- **Responsiveness.** Every interaction returns fast enough that the agent's flow does not break. *(Assumed)*
- **Repeatability.** The same input always produces the same record, so changes that show up in code review are real changes, not noise. *(Tested · N=1)*
- **Immediate feedback on broken links.** When a reference breaks, the failure surfaces the moment it happens, with enough detail for the agent to fix it without guesswork. *(Tested · N=1)*
- **Scriptable end-to-end.** Every action can be chained into the agent's existing workflow without manual confirmation steps. *(Tested · N=1)*
- **Works without an account or network connection.** No login, no external service. The project itself is the source of truth. *(Tested · N=1)*
- **Discoverable structure.** The architecture's shape is fully describable from one place, so a new collaborator (agent or human) can pick it up without a guided tour. *(Tested · N=1)*
- **Local-first as unit economics.** Every context fetch is a file read (zero token cost), not an API roundtrip (N tokens per fetch). For an agent-first workflow running many sessions per week, the per-fetch cost difference between local files and MCP-mediated tools is a real economic factor, not a preference. *(Tested · N=1)*

#### §Stakeholder Profile

| Dimension | Value |
|---|---|
| Authority | High; solo founder or technical lead with unilateral decision power over product and architecture choices. |
| Interest | Very high; clew directly shapes the daily workflow. |
| Attitude | Supportive but exacting. Will adopt if the tool earns its place inside 15 minutes; will discard it the moment it adds friction. |
| RACI | Responsible and Accountable (their repo, their call). |
| Engagement strategy | Optimise for time-to-first-value: from a blank project to the first persona minted in under 5 minutes. Document the metamodel inside the project itself; do not require external docs. Treat onboarding friction reports as P0. |

#### §Research Grounding

| Field | Value |
|---|---|
| Evidence type | Partially researched. Wave 1 complete (N=1, founder-as-instance). External validation pending. |
| Sample | 1 interview · Victor Hueni (founder, self-identified P-01 instance) · 2026-05-24. Wave 2 target: 2 to 4 external interviews, including at least one non-product role (QA / DevOps / SRE) to test the "any builder using agents" generalisation finding. |
| Sources | [`docs/VISION.md`](../VISION.md); [`docs/architecture/decisions/adr-0001-metamodel-persistence-layer.md`](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) motivation; [`docs/business/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md`](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (wave-1 synthesis with full per-hypothesis verdicts and verbatim quotes). |
| Created | 2026-05-24 |
| Last validated | 2026-05-24 (wave 1, N=1, founder-as-instance; promotion to research-grounded requires external N ≥ 3). |
| Next review | 2026-08-22 (wave 2 deadline per [OBJ-03 KR-03.2](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)). |
| Conversion plan | Wave 1 (N=1, founder) complete; §Frustrations rewritten, §Goals + §System Needs extended per synthesis. Wave 2 to run 2 to 4 external interviews with agent-first builders (at least one non-product role mandatory). Promote to research-grounded once external N ≥ 3 confirms or refines the wave-1 findings. |

---

## Changelog

- 2026-05-24 · Scaffold · Created `personas.md` with template, backlog, and `§Personas` section per the `business-persona` skill.
- 2026-05-24 · Fill-One · P-01 Ava (agent-first product engineer) added as proto-persona, Primary, Tier 1. Next review 2026-08-22.
- 2026-05-24 · Backlog · Refined Tier 2 to one persona (the product partner). Removed the "onboarding agent" entry (captured as a design constraint in P-01's §System Needs, not a separate persona). Added P-N2 (the free-form wiki author) to the negative roster.
- 2026-05-24 · Rename · File moved from `personas.md` to `01a-personas.md` to match the homemade-claude-kit metamodel path rule (`docs/business/01a-personas.md`).
- 2026-05-24 · De-tech · Reframed P-01 sections (Scenarios, Frustrations, Key Tasks, System Needs, Engagement strategy) and the backlog surface columns in user-intent language. Removed clew-implementation specifics (YAML, FK error messages, CLI syntax, snapshot folder, marimo) so the persona describes who the user is and what they want, not how the product delivers it.
- 2026-05-24 · Synthesis cascade · Applied [wave-1 P-01 validation synthesis](discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md). §Frustrations rewritten as F1 (no traceability graph from documents) > F2 (no integrity / audit confidence with LLM alone; determinism is key) > F3 (refactor blast radius); methodology-skip dropped as it did not make the interviewee's top 3. §Goals consolidated from 5 to 5 items with new selective-compositional-context goal added; existing items marked Tested (N=1) where confirmed. §System Needs gained local-first-as-unit-economics item; existing items marked Tested (N=1) where confirmed (Responsiveness remains Assumed, not directly tested in wave 1). §Research Grounding partially promoted from proto-persona to "wave 1 complete (N=1 internal)"; wave 2 plans 2 to 4 external interviews including ≥1 non-product role.
