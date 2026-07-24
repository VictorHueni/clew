---
type: Persona
title: Personas
description: Singleton hub for every user, stakeholder, and negative persona that clew is designed for or explicitly designed against.
tags: [business, personas]
timestamp: 2026-05-24T09:05:21Z
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
| P-03 | Arno | AI-augmented architect-builder | Primary | Opt-in layer packages (multi-layer modelling + cartography export) | Full-layer coherent modelling, affordable and drift-free at repo scale | Proto |

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

> **Two-tier persona model** per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md): P-01 Ava owns the mandatory core (the wedge persona) and never pays an unopted layer's drift cost; P-03 Arno owns the opt-in layer packages (the depth persona). Distinct surfaces, so Cooper's one-primary-per-surface discipline holds.

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

Ordered by priority per the [wave-1 P-01 validation synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md).

1. **No reliable traceability matrix or documentation relationship graph that comes directly from the documents themselves.** Cross-artefact questions (which capability serves P-01, which KRs roll up to OBJ-02, which features land in a given epic) cannot be answered without the LLM scoping IDs from files and joining them in its head. Cross-artefact analytics (effort estimation, quantitative models) are blocked for the same reason. Even the existence of broken references is invisible without bespoke grep. *(Tested · N=1, founder-as-instance)*
2. **No confidence in integrity-check or audit when relying solely on the LLM.** The LLM silently renumbers items while updating an artefact; it forgets or paraphrases canonical IDs instead of using them; downstream references rot. Determinism is the missing primitive: same input, same output, every time, with an audit trail anyone (human or future agent) can replay. *(Tested · N=1, founder-as-instance)*
3. **Changing structure, name, or ID has massive blast radius across existing docs.** A folder rename, an artefact renumber, or a schema refactor means scanning every file for references and either fixing them by hand or trusting the agent to find them all (which is the audit-confidence problem above). Even after a careful pass, dead links keep surfacing weeks later. *(Tested · N=1, founder-as-instance)*

#### §Key Tasks

- Mint a new persona, capability, objective, key result, bounded context, or PRD and receive a stable identifier to refer to it from then on. *(Realised by [VS-1 Compose Architecture](04a-value-streams.md#vs-1--compose-architecture), end-to-end.)*
- Connect artefacts: link a functionality to an epic, an epic to an objective and its key results. *(Realised within [VS-1.3 Draft Artefact Content](04a-value-streams.md#vs-13--draft-artefact-content) where cross-artefact references are identified, and validated at [VS-1.4 Persist with Stable ID](04a-value-streams.md#vs-14--persist-with-stable-id).)*
- Ask the architecture cross-cutting questions: "what does this epic serve?" / "which artefacts reference this persona?" / "where is this domain area used?" *(Realised by [VS-2 Navigate Architecture](04a-value-streams.md#vs-2--navigate-architecture), filled: scope the question at VS-2.1, get the deterministic answer at [VS-2.2 Resolve from Canonical Source](04a-value-streams.md#vs-22--resolve-from-canonical-source), drill into provenance at [VS-2.3 Surface Provenance](04a-value-streams.md#vs-23--surface-provenance), and validate against current state at [VS-2.4 Validate Against Current State](04a-value-streams.md#vs-24--validate-against-current-state).)*
- Refactor with confidence: rename, re-tier, or retire an artefact and see the full downstream impact before committing. *(Realised by [VS-3 Refactor Architecture](04a-value-streams.md#vs-3--refactor-architecture), filled: identify the change at VS-3.1, see the full downstream impact at [VS-3.2 Preview Downstream Impact](04a-value-streams.md#vs-32--preview-downstream-impact) (the value-gating stage; C3.2's impact-analysis view turns the "100% sure" magic-wand into a mechanical preview), execute atomically at [VS-3.3 Execute Change with Integrity](04a-value-streams.md#vs-33--execute-change-with-integrity) (C4.1 enforces integrity across the full change-set), and confirm no drift at [VS-3.4 Confirm No Drift](04a-value-streams.md#vs-34--confirm-no-drift). Write-time integrity substrate already realised at [VS-1.4 Persist](04a-value-streams.md#vs-14--persist-with-stable-id) for new artefacts; VS-3.3 extends it to change-sets.)*
- Share the architecture in a form colleagues can review alongside the work, including those who do not use the tool directly. *(Realised by [VS-4 Share Architecture](04a-value-streams.md#vs-4--share-architecture), filled: confirm current state at [VS-4.1 Confirm Snapshot Is Current](04a-value-streams.md#vs-41--confirm-snapshot-is-current), pre-render canonical views as static markdown at [VS-4.2 Materialise Self-Contained Views](04a-value-streams.md#vs-42--materialise-self-contained-views) so no clew runtime is required to read, publish at [VS-4.3 Publish to Reachable Location](04a-value-streams.md#vs-43--publish-to-reachable-location), and provide reader orientation at [VS-4.4 Provide Reader Orientation](04a-value-streams.md#vs-44--provide-reader-orientation). Overall pain Medium - the only Key Task whose realising stream does not inherit Critical pain - because the consumer instance does not yet exist for wave-1 validation.)*

#### §System Needs

- **Responsiveness.** Every interaction returns fast enough that the agent's flow does not break. *(Assumed)*
- **Repeatability.** The same input always produces the same record, so changes that show up in code review are real changes, not noise. *(Tested · N=1)*
- **Immediate feedback on broken links.** When a reference breaks, the failure surfaces the moment it happens, with enough detail for the agent to fix it without guesswork. *(Tested · N=1)*
- **Scriptable end-to-end.** Every action can be chained into the agent's existing workflow without manual confirmation steps. *(Tested · N=1)*
- **Works without an account or network connection.** No login, no external service. The project itself is the source of truth. *(Tested · N=1)*
- **Discoverable structure.** The architecture's shape is fully describable from one place, so a new collaborator (agent or human) can pick it up without a guided tour. *(Tested · N=1)*
- **Local-first as unit economics.** Every context fetch is a file read (zero token cost), not an API roundtrip (N tokens per fetch). For an agent-first workflow running many sessions per week, the per-fetch cost difference between local files and MCP-mediated tools is a real economic factor, not a preference. *(Tested · N=1)*

*Capability cousins in the [capability map](03a-capability-map.md): Responsiveness → [C3.1](03a-capability-map.md#c31--ad-hoc-cross-artefact-query-surface); Repeatability → [C2.1](03a-capability-map.md#c21--stable-identifier-generation) + [C2.4](03a-capability-map.md#c24--deterministic-structural-export); Immediate feedback on broken links → [C4.1](03a-capability-map.md#c41--write-time-reference-validation); Scriptable end-to-end → [C1.2](03a-capability-map.md#c12--selective-context-loading); Discoverable structure → [C3.2](03a-capability-map.md#c32--pre-built-traceability-views) + [C2.4](03a-capability-map.md#c24--deterministic-structural-export). The "works without an account or network" and "local-first as unit economics" bullets sit outside the capability map: deployment posture and cost-model properties respectively, not capabilities.*

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
| Sources | [`docs/VISION.md`](../VISION.md); [`docs/architecture/decisions/adr-0001-metamodel-persistence-layer.md`](../architecture/decisions/adr-0001-metamodel-persistence-layer.md) motivation; [`docs/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md`](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md) (wave-1 synthesis with full per-hypothesis verdicts and verbatim quotes). |
| Created | 2026-05-24 |
| Last validated | 2026-05-24 (wave 1, N=1, founder-as-instance; promotion to research-grounded requires external N ≥ 3). |
| Next review | 2026-08-22 (wave 2 deadline per [OBJ-03 KR-03.2](04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)). |
| Conversion plan | Wave 1 (N=1, founder) complete; §Frustrations rewritten, §Goals + §System Needs extended per synthesis. Wave 2 to run 2 to 4 external interviews with agent-first builders (at least one non-product role mandatory). Promote to research-grounded once external N ≥ 3 confirms or refines the wave-1 findings. |

---

### P-03 · Arno, the AI-augmented architect-builder

| Field | Value |
|---|---|
| Persona type | Primary |
| Tier | 1 |
| Lifecycle status | Proto-persona |
| Quote | "Agents made the modelling cheap. Rot is the only thing still priced at enterprise scale." |

#### §Snapshot

| Field | Value |
|---|---|
| Role | Solo architect-builder: an enterprise-architecture-literate engineer who models software AND business AND strategy for the products they build |
| Org | Solo or small company (1–10 people); EA background without an enterprise-architecture team or a procurement budget |
| Domain experience | 10+ years spanning software delivery and enterprise-architecture practice (ArchiMate/TOGAF-literate); in the last 12 months uses AI agents to make full-layer modelling affordable at repo scale |
| Usage frequency | Modelling campaigns in bursts (a domain per day with agents), plus continuous coherence upkeep across sessions |
| Usage context | Local terminal alongside coding agents; one repo per product, the enforced graph extended by exactly the layer packages that repo opted into |
| Primary language | English (working) |

#### §Bio

Arno has an enterprise-architecture background — capable of modelling software, business, and strategy — but works solo or in a small company where a hand-maintained EA repository never survived contact with delivery. With agents as co-modellers, the historical cost wall has collapsed: full-layer coherent modelling is now a day's work instead of an architecture team's quarter. What Arno still lacks is the enforcement substrate underneath — something that keeps the agent-built multi-layer model referentially true through every refactor, instead of rotting the way every hand-maintained model before it did.

#### §Goals

1. **When** I take on a new product or domain, **I want** to model business, application, and technology layers step-by-step with an agent, **so I can** reach full-layer coverage in days instead of quarters. *(Tested · N=1, founder-as-instance)*
2. **When** my repo needs more model, **I want** to enable exactly the artefact types it needs — with prerequisites scaffolded for me — **so I** choose my drift surface deliberately instead of inheriting a maximal model. *(Assumed)*
3. **When** an upstream driver changes (a regulation, a platform, a strategy shift), **I want** cross-layer influence chains queryable, **so** blast-radius questions get deterministic answers instead of workshop archaeology. *(Tested · N=1, founder-as-instance)*
4. **When** I share the architecture, **I want** cartography views generated from the enforced graph, **so** the picture can never quietly diverge from the model. *(Tested · N=1, founder-as-instance)*
5. **When** an agent proposes relationships faster than I can vet them, **I want** proposals quarantined until I validate them, **so** agent speed never contaminates what counts as a fact. *(Tested · N=1, founder-as-instance)*

#### §Scenarios

**Scenario 1 · The five-domain day.** Arno needs an enterprise cartography for a regulated product: business actors, application services, technology stack, plus the regulatory environment around them. With agents as co-modellers, five ArchiMate domains are modelled, tiered, in a single day — the cartography prototype did exactly this — but outside any enforcement substrate, so every subsequent refactor silently invalidates edges nobody re-checks. With clew, the same day of modelling lands in an enforced graph: every edge validated at write time, every later change surfacing its blast radius before it lands.

**Scenario 2 · The regulator's question.** A tariff regime changes. Arno asks which application services, capabilities, and product commitments sit downstream of that driver. With hand-maintained diagrams, the answer is a meeting and a week of doubt; with the enforced graph, it is one impact query and a regenerated cartography view.

#### §Frustrations

1. **Hand-maintained EA models rot.** The classic Sparx-repository failure: the model is current the week of the workshop and fiction a month later, because upkeep is manual and nothing enforces coherence between model and reality. *(Tested · N=1, founder-as-instance)*
2. **Multi-layer coherence has historically been priced at enterprise-team cost.** The tooling (Ardoq, BiZZdesign, LeanIX) and the upkeep both assume a team of architects and a procurement budget; below that scale, full-layer modelling was simply forgone. *(Tested · N=1, founder-as-instance)*
3. **Existing agent-native tools stop at the spec/plan layers.** Spec-driven development and traceability tools connect requirement to code, but nothing enforces business, application, and technology layers — or the influence chains between them. *(Tested · N=1, founder-as-instance)*
4. **Agent-generated models leak unreviewed assertions as facts.** An agent proposes edges faster than a human can vet them; without a review lifecycle, the inferred and the validated become indistinguishable in every view. *(Tested · N=1, founder-as-instance)*

#### §Key Tasks

- Enable the artefact types a repo's model needs and model business + application + technology layers step-by-step, guided by prerequisite scaffolding. *(Realised by the opt-in layer packages per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md).)*
- Keep cross-layer influence chains queryable: which capabilities, services, and commitments sit downstream of a given driver.
- Generate cartography views of the enforced graph for sharing and review. *(The fourth read-side surface per [ADR-0015](../architecture/decisions/adr-0015-opt-in-layer-packages.md) — projection, never a second source of truth.)*
- Review agent-proposed relationships: validate or reject proposals so only human-confirmed edges become facts. *(Per [ADR-0016 — two-speed integrity](../architecture/decisions/adr-0016-two-speed-integrity-edge-property-bag.md).)*

#### §System Needs

- **Identical strictness on everything enabled.** An opted-in type must get the same 100% write-time guarantee as the core; a "lite" tier would recreate the rich-model / weak-sync failure that killed every previous EA repository. *(Tested · N=1, founder-as-instance)*
- **Honest partial models.** Unfilled slots are declared absences (info-level), never violations — a model in progress must be legal, not nagging. *(Assumed)*
- **Deterministic integrity verdicts.** Integrity output derives from graph facts and authored constraints only; agent-inferred judgment never reaches the hot path. *(Tested · N=1, founder-as-instance)*
- **Projection is never a second source of truth.** Views are regenerated from the graph, never hand-edited into divergence. *(Tested · N=1, founder-as-instance)*
- **Cheap, reversible enablement.** Type definitions are registry data, not schema migrations — trying a layer must not be a commitment. *(Assumed)*

#### §Stakeholder Profile

| Dimension | Value |
|---|---|
| Authority | High; sole (or lead) architect with unilateral say over the model and its tooling. |
| Interest | Very high; the opt-in layer packages exist for this persona. |
| Attitude | Supportive but standards-literate and wary: has watched EA tooling fail before, and will reject any tool that imposes a mandatory ontology (ArchiMate must stay an export-time mapping, never the required model). |
| RACI | Responsible and Accountable (their repo, their model, their call). |
| Engagement strategy | Let the prerequisite scaffolding carry the teaching burden — enablement should feel like guided growth, not configuration. Prove the rot problem solved on one layer before proposing five. Never market "EA" at this persona; the term stays internal per [ADR-0014 — Product Architecture Management positioning](../architecture/decisions/adr-0014-product-architecture-management-positioning.md). |

#### §Research Grounding

| Field | Value |
|---|---|
| Evidence type | Proto-persona (assumption). N=1, founder-as-instance — mirroring P-01's wave-1 grounding pattern. |
| Sample | 1 instance · Victor Hueni (founder, self-identified P-03 instance) · 2026-07-24. Wave 2 must interview **both** personas, ≥1 each (P-01 and P-03), extending [OI-0016](../../project-control/open-items/open-items.md)'s interview-mix requirement. |
| Sources | The cartography prototype as proof-of-need (external: `swiss-aos-drug-reimbursement-model` Plans 0138/0139 — five ArchiMate domains modelled, tiered, in one day with agents); its clew fit assessment imported at [`docs/discovery/cartography-prototype-clew-fit-2026-07-24.md`](../discovery/cartography-prototype-clew-fit-2026-07-24.md); the [2026-07-24 grill-me session record](../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) (D5); [ADR-0014 — Product Architecture Management positioning](../architecture/decisions/adr-0014-product-architecture-management-positioning.md); [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md). |
| Created | 2026-07-24 |
| Last validated | 2026-07-24 (N=1, founder-as-instance; promotion to research-grounded requires external instances). |
| Next review | 2026-10-22 (≤90 days for proto-personas). |
| Conversion plan | Wave 2 to find and interview at least one external architect-builder (≥1 interview per persona across P-01/P-03, per D5, extending OI-0016). The second external instance also gates layer-package content reaching the public roadmap ([ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md) sequencing). |

---

## Open Items

None at present. *(P-01 wave-2 follow-ups are tracked in [`docs/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md` §Open Items](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md#open-items); P-03's wave-2 interview requirement rides [OI-0016](../../project-control/open-items/open-items.md) per the two-persona mix decided in D5; P-02 backlog work surfaces through the relevant Tier table rows above rather than as separate OI rows.)*

---

## Changelog

- 2026-05-24 · Scaffold · Created `personas.md` with template, backlog, and `§Personas` section per the `business-persona` skill.
- 2026-05-24 · Fill-One · P-01 Ava (agent-first product engineer) added as proto-persona, Primary, Tier 1. Next review 2026-08-22.
- 2026-05-24 · Backlog · Refined Tier 2 to one persona (the product partner). Removed the "onboarding agent" entry (captured as a design constraint in P-01's §System Needs, not a separate persona). Added P-N2 (the free-form wiki author) to the negative roster.
- 2026-05-24 · Rename · File moved from `personas.md` to `01a-personas.md` to match the homemade-claude-kit metamodel path rule (`docs/business/01a-personas.md`).
- 2026-05-24 · De-tech · Reframed P-01 sections (Scenarios, Frustrations, Key Tasks, System Needs, Engagement strategy) and the backlog surface columns in user-intent language. Removed clew-implementation specifics (YAML, FK error messages, CLI syntax, snapshot folder, marimo) so the persona describes who the user is and what they want, not how the product delivers it.
- 2026-05-24 · Synthesis cascade · Applied [wave-1 P-01 validation synthesis](../discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md). §Frustrations rewritten as F1 (no traceability graph from documents) > F2 (no integrity / audit confidence with LLM alone; determinism is key) > F3 (refactor blast radius); methodology-skip dropped as it did not make the interviewee's top 3. §Goals consolidated from 5 to 5 items with new selective-compositional-context goal added; existing items marked Tested (N=1) where confirmed. §System Needs gained local-first-as-unit-economics item; existing items marked Tested (N=1) where confirmed (Responsiveness remains Assumed, not directly tested in wave 1). §Research Grounding partially promoted from proto-persona to "wave 1 complete (N=1 internal)"; wave 2 plans 2 to 4 external interviews including ≥1 non-product role.
- 2026-05-24 · Capability backlinks · §System Needs gained a capability-cousin footer mapping each bullet to its L1 capability counterpart in [03a-capability-map.md](03a-capability-map.md). Responsiveness → C3.1; Repeatability → C2.1 + C2.4; Immediate feedback on broken links → C4.1; Scriptable end-to-end → C1.2; Discoverable structure → C3.2 + C2.4. The "works without an account or network" and "local-first as unit economics" bullets are flagged as out-of-scope for the capability map (deployment posture and cost-model properties, not capabilities).
- 2026-05-25 · Value-stream backlinks · P-01 §Key Tasks gained a per-bullet `Realised by:` annotation mapping each task to its value stream in [04a-value-streams.md](04a-value-streams.md): mint artefact → VS-1 Compose (filled, end-to-end); connect artefacts → VS-1.3 Draft + VS-1.4 Persist (filled); cross-cutting questions → VS-2 Navigate (catalogued); refactor with confidence → VS-3 Refactor (catalogued) + partial VS-1.4; share architecture → VS-4 Share (catalogued). Cascade companion to today's value-streams VS-1 fill.
- 2026-05-25 · VS-2 cascade · P-01 §Key Tasks bullet 3 (cross-cutting questions) upgraded from "VS-2 catalogued; stages not yet decomposed" to a full per-stage mapping: scope at VS-2.1, deterministic answer at VS-2.2 Resolve from Canonical Source, provenance drill-down at VS-2.3 Surface Provenance, drift validation at VS-2.4 Validate Against Current State. Cascade companion to today's value-streams VS-2 fill. Bullets for the other 4 Key Tasks unchanged.
- 2026-05-25 · VS-3 cascade · P-01 §Key Tasks bullet 4 (refactor with confidence) upgraded from "VS-3 catalogued; stages not yet decomposed; partial VS-1.4 realisation" to a full per-stage mapping: identify the change at VS-3.1, preview full downstream impact at VS-3.2 Preview Downstream Impact (the value-gating stage where C3.2 turns the magic-wand into a mechanical preview), execute atomically at VS-3.3 Execute Change with Integrity (C4.1 across the full change-set), confirm no drift at VS-3.4. Note added that VS-1.4 realises write-time integrity for new artefacts and VS-3.3 extends it to change-sets. Cascade companion to today's value-streams VS-3 fill. Bullets for the other 4 Key Tasks unchanged.
- 2026-05-25 · VS-4 cascade · P-01 §Key Tasks bullet 5 (share architecture) upgraded from "VS-4 catalogued; stages not yet decomposed" to a full per-stage mapping: confirm current state at VS-4.1, materialise self-contained views at VS-4.2 (pre-render canonical views as static markdown so no clew runtime is required to read), publish at VS-4.3, provide reader orientation at VS-4.4. Honest note added: overall pain Medium, the only Key Task whose realising stream does not inherit Critical pain, reflecting that the consumer instance does not yet exist for wave-1 validation. This closes the per-Key-Task value-stream wiring loop: all 5 Key Tasks now point to filled streams. Cascade companion to today's value-streams VS-4 fill.
- 2026-07-24 · Mint · P-03 Arno (AI-augmented architect-builder) added as proto-persona, Primary, Tier 1 — the depth persona owning the opt-in layer packages per [ADR-0015 — opt-in layer packages](../architecture/decisions/adr-0015-opt-in-layer-packages.md), within the widened audience of [ADR-0014 — Product Architecture Management positioning](../architecture/decisions/adr-0014-product-architecture-management-positioning.md); decided in the [2026-07-24 grill-me session](../../var/reports/grill-me/2026-07-24-positioning-layer-packages.md) (D5). N=1, founder-as-instance; proof-of-need is the cartography prototype (`swiss-aos-drug-reimbursement-model` Plans 0138/0139). Tier-1 backlog table gained the P-03 row; §Personas gained the two-tier intro note (Ava = mandatory core, Arno = layer packages); wave-2 requirement recorded as ≥1 interview per persona, extending OI-0016. P-01 unmodified.
