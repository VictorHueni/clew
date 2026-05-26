---
title: Research synthesis · P-01 wave 1 · persona + UVP validation
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 90d
script: interview-P-01-persona-and-value-fit.md
session_date: 2026-05-24
interviewee: Victor Hueni (founder, self-identified P-01 instance)
wave: 1 of OBJ-03 KR-03.2 (target 3 to 5)
---

# Research synthesis · P-01 wave 1 · 2026-05-24

## Sample summary

| Field | Value |
|---|---|
| Interviews this wave | 1 of target 3 to 5 (per [OBJ-03 KR-03.2](../../04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling)) |
| Interviewee | Victor Hueni, founder, self-identified P-01 instance |
| Date | 2026-05-24 |
| Channel | Text-based, in-session |
| Recording | N/A (full transcript preserved in conversation history) |
| Duration | ~55 minutes |
| Script | [interview-P-01-persona-and-value-fit.md](interview-P-01-persona-and-value-fit.md) |
| Language | English |

## Epistemic limit (read first)

This is **N = 1, with the founder as both interviewee and persona author**. Findings here are necessary but not sufficient for "P-01 is real". Every confidence shift in this synthesis carries an implicit `(N=1, founder-as-instance)` qualifier. Promotion past Tested requires the 2 to 4 additional external interviews planned for OBJ-03 KR-03.2 wave 2.

A second meta-bias: the interviewee authored every artefact under test. Some "captured" findings may reflect attractive framing rather than independent truth. External interviews are the only correction for this.

## Headline finding (one sentence)

clew's value proposition resonates strongly with the founder-instance of P-01, but the persona and UVP both need to be widened on two axes: from "agent-first product engineer" to "any builder using agents", and from product-centric scope to full-lifecycle scope (business architecture, market intelligence, product, QA, implementation, ops, runbook).

## Per-hypothesis verdicts

### H1 · P-01 §Frustrations correct + correctly prioritised

**Cluster size:** 1 of 1.
**Verdict:** Confirmed with refinement.

**Evidence (verbatim):** when asked for top 3 frustrations in priority order, the interviewee gave:

- **F1 (top):** *"no views on a reliable traceability matrix nor a documentation relationship graph that is directly come from the document it self."*
- **F2:** *"no confidence in the integrity check and audit I need to do on the documentation if I rely solely on llm. determinism is key here."*
- **F3:** *"if I change structure, name, Id the effort to update the existing docs is massive."*

**Mapping against current PR-1 / PR-2 / PR-3:**

| Current persona bullet | Interviewee mapping |
|---|---|
| PR-1 drift / silent rot across artefacts | Split into F1 (graph-from-docs) + F3 (refactor effort). The current PR-1 conflates two distinct pains. |
| PR-2 cross-artefact lookup latency | Subsumed by F1: lookup-latency is a symptom of the absent traceability graph. |
| PR-3 methodology skip | **Not in top 3.** Real pain perhaps, but not top-priority. |

**New pains surfaced (not currently in P-01 §Frustrations):**

- "Joins are impossible": cross-artefact analytics (effort estimation, quantitative models) blocked because IDs are unenforced prose. Verbatim: *"when I wanted to create an effort estimation analysis I discovered that with those features and epic I'd embedded in the markdown it will be hard to reproduce the analysis systematically for other project."* Subsumed by F1.
- LLM silently renumbers items while updating an artefact; downstream references rot. Verbatim: *"if I mentions an ID somewhere what protects me from an llm renumbered items after updating an artefact without me knowing?"* Subsumed by F2.
- "Constantly double check" cognitive load. Verbatim: *"the llm perform not that bad, but you have to constantly double check, make sure we didn't miss a part."* Subsumed by F2.

**Update to apply:** rewrite P-01 §Frustrations as F1 / F2 / F3 per the interviewee's ranking. Mark Tested (N=1, founder-as-instance). PR-3 (methodology skip) moves to a lower-priority position or is removed.

### H2 · P-01 §Goals + §System Needs cover the wanted outcomes

**Cluster size:** 1 of 1.
**Verdict:** Confirmed with refinement.

**Evidence:** when asked what works well in current workflows, the interviewee gave a 7-item "I like" list. Five items map to existing Lean Canvas §3 UVP bullets (markdown-first, close to code, methodology-as-substrate, end-to-end same agent, templated authoring). Two items don't currently map to P-01 §Goals or §System Needs:

- **External evidence-backing on claims.** Verbatim: *"I like that for some documents, I can enrich them with proof found on the internet and add the url."* Not in §Goals today. New goal candidate.
- **Selective compositional context.** Refined elaboration: *"the real advantage is I can pick and choose the level of context I would give my agent depending on the work I need to do"* (VISION/BMC for general task; glossary/domain for PRD; test strategy for QA). Not in §Goals or §System Needs today. New system need candidate.

**Magic-wand finding:** *"a mechanism on place that can make 100% sure that all internal reference are up to date at all time. a easy audit and fix way to control this."* This is sharper than [OBJ-02 KR-02.1](../../04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it)'s current ≥99% target. Two options for synthesis: tighten KR-02.1 to 100%, or keep ≥99% as engineering tolerance with explicit note that 100% is the user-stated trust criterion.

**Trust-threshold finding:** *"I think that I can built the traceability matrix consistently and deterministically."* This is the singular adoption pivot. Not a feature list. The README headline should lead with this capability rather than a feature laundry-list.

**Token-economics finding:** *"using tools like that having to use api etc... add complexity and token consumption for nothing really."* Local-first is a unit-economics decision for the persona, not just a preference. Not in P-01 §System Needs today. New system need candidate.

**Update to apply:** add §Goals items for external-evidence-backing and selective-compositional-context. Add §System Need for token-economics awareness. Mark applicable §Goals items as Tested (N=1).

### H3 · Lean Canvas §3 UVP bullets resonate

**Cluster size:** 1 of 1.
**Verdict:** Confirmed with substantial refinement.

**Per-bullet evidence:**

| UVP element | Reaction | Action |
|---|---|---|
| North-star promise | "love it. but I think it might need to encapsulate more the whole scope from business arch, to market analysis, to product, to qa, to implementation, to ops and runbook." | Core fit confirmed. Widen scope language. |
| Concrete win 1 (30-second cross-artefact answer) | Confirmed as the user-visible demo of the deterministic-matrix capability. Paraphrase: Win 1 reads as a yes; "the traceability matrix deterministic generation solves this." | Keep. Promote to README headline candidate. |
| Concrete win 2 (write-time integrity enforcement) | Confirmed (implicit via F1 + F3 ranking). | Keep. |
| Concrete win 3 (methodology-as-substrate) | Confirmed: "I like the fact that the skills embedded some methodology references." | Keep. |
| Anti-promise (not knowledge graph for everyone / not BPMN / not SaaS) | Partially refuted. "the knowledge graph, might come at some point if that makes sense." Linting "should be there", whether bundled or via classical tools. | Refactor: keep "not BPMN" + "not SaaS-first" as hard exclusions; soften or drop knowledge-graph and linting exclusions. |
| High-concept metaphor ("Git for product architecture") | "love the métaphore but product architecture might under state the whole scope." | Keep metaphor; replace scope qualifier. |

**README-headline finding (verbatim from interviewee):** three sentences proposed as the basis for the rewritten UVP.

1. *"clew allow any builder to use proper methodology to document its building process and make the knowledge produce navigable for human and agent with high level of confidence."*
2. *"you will always know why things have been done and what is ahead for your product."*
3. *"its like business, architect, product manager, developer, qa engineer, devops work hand in hand towards the same goal shaping their understanding in a standard way"*

**Three findings the current UVP doesn't capture:**

- *"any builder"* + *"navigable for human and agent"*: dual-audience, lifecycle-broad. The "agent-first product engineer" framing is too narrow; the substrate serves anyone in the agentic product workflow.
- *"why things have been done"* + *"what is ahead"*: bidirectional traceability through time. Decisions + rationale preserved (the why); roadmap state visible (the ahead). Neither is in the current UVP; both deserve dedicated bullets.
- *"shaping their understanding in a standard way"*: DDD's ubiquitous-language concept applied to the multi-role agentic workflow. The metamodel as the shared mental model across business / architect / PM / dev / QA / DevOps. This is the alignment claim that ties the other findings together.

**Update to apply:** adopt the interviewee's three sentences as the basis for the rewritten §3 UVP. Preserve the "so that" discipline and the three concrete wins (all confirmed). Replace product-centric language throughout. Refactor anti-promise. Mark Tested (N=1).

### H4 · PR-1 existing alternatives are real and used

**Cluster size:** 1 of 1.
**Verdict:** Partly refuted, partly refined.

**Evidence:**

| Current alternative in PR-1 | Verdict from interview |
|---|---|
| Hand-rolled markdown conventions + grep | Confirmed (implicit through 3-project arc and `rules/metamodel.md` mitigation attempt). |
| Notion databases with broken relations | **Refuted for this instance:** "never tries any of those alternatives myself." |
| Bespoke per-team YAML metamodels | **Refuted for this instance.** |
| Spreadsheets | **Refuted for this instance.** |
| "Trust the agent to remember" | Confirmed (implicit via repeated determinism complaints). |

**New alternative surfaced (not in PR-1 today):** prose-discipline triad. Verbatim: *"I try to rely solely on llm, skulls [skills] and claude rules."* Plus the failed `homemade-claude-kit/rules/metamodel.md` prose-rules document.

**Out-of-context alternative surfaced:** Atlassian + MCP. Used at work, rejected for agent product workflows due to API complexity + token consumption. Verbatim: *"at work in using Atlassian tool and their mcp but I found that using tools like that having to use api etc... add complexity and token comsumptiosn for nothing really."*

**Update to apply:** trim PR-1's existing-alternatives list to the three confirmed entries; add prose-discipline triad as a fourth; reference Atlassian + MCP as a rejected enterprise-context alternative (separate framing).

**Positioning insight (also relevant to §5 Channels and §9 Unfair Advantage):** local file reads vs. API roundtrips + token consumption is a sharper differentiator than the current canvas surfaces. Not "we're free, they're paid" but "we're zero-token-per-context-fetch, they're N tokens per API call".

## Open Items

These emerged but cannot be answered by N = 1; they should inform wave-2 interview scripts and may justify expanding KR-03.2's target from "3 to 5" to "5 to 8" if external interviewees are reachable across roles.

| OI-ID  | Type            | Summary                                                                                                                                                                                                                                                                | Source anchor                       | Source heading                                                                | Resolution path                                                                                                                                                              | Priority | Status | Owner        | Due / Review date | Tracker ref |
| :----- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----- | :----------- | :---------------- | :---------- |
| OI-0029 | execution-item  | Persona generalisation. Does the "any builder" framing generalise to QA / DevOps / SRE personae who reach for clew, or are they too different from P-01 to share a substrate? Wave 2 must include ≥1 non-product role to test this.                                   | #h2--p-01-goals-and-system-needs    | H2 · P-01 §Goals + §System Needs cover the wanted outcomes                    | Schedule wave-2 cohort with ≥1 non-product role (QA / DevOps / SRE) per [OBJ-03 KR-03.2](../../business/04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling). | high     | open   | Victor Hueni | 2026-08-31        | _TBD_       |
| OI-0030 | execution-item  | Adoption-commitment gap. A P-01 stranger must bet on a 3-month commitment beyond initial demo-trigger. What evaluation criteria do they apply that the founder cannot self-assess?                                                                                    | #h3--lean-canvas-3-uvp              | H3 · Lean Canvas §3 UVP bullets resonate                                      | Add adoption-criteria probe to wave-2 interview script (post-demo decision factors, alternatives considered, exit-ramp expectations).                                         | medium   | open   | Victor Hueni | 2026-08-31        | _TBD_       |
| OI-0031 | decision-gap    | Methodology canon depth. Which methodologies are missing given the broadened lifecycle scope? Candidates: DDD (Evans / Vernon / Wlaschin) for domain modelling, ATDD / BDD (North / Beck) for testing, SRE discipline (Beyer et al.) for ops / runbook.               | #h3--lean-canvas-3-uvp              | H3 · Lean Canvas §3 UVP bullets resonate                                      | Methodology canon audit via `business-capability-map` C5 + cross-check against wave-2 interviewee roles; document candidate skills in `homemade-claude-kit`.                  | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |
| OI-0032 | execution-item  | Token-economics quantification. How much agent-cost saving does local-first actually deliver vs MCP-mediated tooling, at what scale? Speculative until measured.                                                                                                       | #h3--lean-canvas-3-uvp              | H3 · Lean Canvas §3 UVP bullets resonate                                      | Author a quantitative model (`business-quantitative-model`) `qm-NN-token-economics.md` once baseline session-cost data is reachable; until then, mark §9 bullet as Assumed.   | low      | open   | Victor Hueni | 2026-12-31        | _TBD_       |
| OI-0033 | doc-gap         | Schema migration cost. v0.1 → v0.2 migration story unknown. Exit-ramp risk is invisible to a prospective adopter without it.                                                                                                                                          | #per-artefact-updates-table         | Per-artefact updates table                                                    | Surface in ADR (likely a new ADR-NNNN on schema-evolution policy) once C4.4 functionality lands; reference from `cli-clew.md §4 Validation rules`.                            | medium   | open   | Victor Hueni | 2026-09-30        | _TBD_       |

## Per-artefact updates table

| File | § | Before (current) | After (proposed) | Confidence shift |
|---|---|---|---|---|
| [01a-personas.md](../../01a-personas.md) | §Frustrations | PR-1 drift > PR-2 lookup latency > PR-3 methodology skip | F1 traceability/relation-graph > F2 determinism + audit > F3 refactor effort. PR-3 removed or demoted. | Assumed → Tested (N=1) + reordered |
| [01a-personas.md](../../01a-personas.md) | §Goals | 5 items | Add: external evidence-backing on claims; selective compositional context. | Assumed → Tested (N=1); +2 items |
| [01a-personas.md](../../01a-personas.md) | §System Needs | Existing list | Add: token-economics awareness (local-first as unit-economics decision). | Assumed → Tested (N=1); +1 item |
| [01a-personas.md](../../01a-personas.md) | §Research Grounding | Proto, next review 2026-08-22 | Wave 1 complete on 2026-05-24 with this synthesis; partial promotion (researched, N=1 internal, founder-as-instance); external wave pending. | Promotion partial |
| [02a-lean-canvas.md](../../02a-lean-canvas.md) | §1 Problem | PR-1 / PR-2 / PR-3 + 5-item alternatives | Rewrite PR items per F1 / F2 / F3 ranking. Trim alternatives list to {markdown+grep; trust-the-agent; prose-discipline triad incl. rules.md}. | Assumed → Tested (N=1) |
| [02a-lean-canvas.md](../../02a-lean-canvas.md) | §3 UVP | 6 bullets | Adopt interviewee's 3 sentences as basis. Widen scope language throughout. Preserve 3 concrete wins. Soften anti-promise on knowledge-graph + linting. | Assumed → Tested (N=1) |
| [02a-lean-canvas.md](../../02a-lean-canvas.md) | §5 Channels OR §9 Unfair Advantage | Existing | Add: token-economics differentiator (local file reads vs. MCP-API roundtrips). | New positioning insight |
| [04b-objectives.md](../../04b-objectives.md) | OBJ-02 KR-02.1 | ≥99% references resolve cleanly | Decision needed: tighten to 100% per magic-wand, or keep ≥99% with explicit note that 100% is the user-stated trust criterion. | Refinement candidate |
| [04b-objectives.md](../../04b-objectives.md) | OBJ-03 KR-03.2 | 0 of 3 to 5 interviews | 1 of 3 to 5 interviews complete (this synthesis is the deliverable) | Progress recorded |

## Confidence summary

**Before this interview:** 12 KRs Assumed across OBJ-01/02/03; all P-01 §Frustrations / §Goals / §System Needs Assumed; all Lean Canvas blocks Assumed.

**After this interview:** Multiple persona + canvas bullets shift from Assumed to Tested (N=1, founder-as-instance). Several new bullets added. README-headline language refactored from author-draft to user-validated phrasing. OBJ-03 KR-03.2 moves from 0 to 1 interview complete.

**Honesty check:** nothing is Validated. Validation requires external N. Single-source interpretive bias remains as the largest open risk.

## What to do after

**Cascading edits to apply across the repository** (proposed, await go-ahead before mass-editing):

- [ ] **[01a-personas.md](../../01a-personas.md)**: rewrite §Frustrations per F1 / F2 / F3; add §Goals items for external-evidence-backing and selective-compositional-context; add §System Need for token-economics; update §Research Grounding to wave-1-complete with partial promotion.
- [ ] **[02a-lean-canvas.md](../../02a-lean-canvas.md)**: rewrite §1 Problem PR items per F1 / F2 / F3; trim §1 existing alternatives list; rewrite §3 UVP per interviewee's three README sentences plus scope-widening across north-star, metaphor, anti-promise; add token-economics differentiator to §5 Channels or §9 Unfair Advantage.
- [ ] **[04b-objectives.md](../../04b-objectives.md)**: update OBJ-03 KR-03.2 progress (1 of 3 to 5); decide on OBJ-02 KR-02.1 refinement (100% vs. ≥99%).
- [ ] **[VISION.md](../../../VISION.md)**: no immediate update required; the lifecycle-scope finding may eventually inform a north-star metric refinement, but not blocking.

**Open follow-ups (separate work, not part of this synthesis):**

- [ ] `docs/business/02b-vpc-cs-1.md` (VPC for CS-1): now lower priority given how much value-fit signal this interview produced. Defer until external interviews complete.
- [ ] `docs/business/03a-capability-map.md`: next artefact in the canonical order (per the user's previous direction).
- [ ] `docs/business/01b-competitive-landscape/`: gap from interview close. Captures methodology-encoding alternatives (Sparx, ARIS, Mega, Cursor / Copilot rules patterns) absent from ADR-0001's persistence-only competitive review.
- [ ] Methodology canon audit for QA + ops / runbook coverage (DDD, ATDD / BDD, SRE).
- [ ] Schedule wave 2 interviews: target 2 to 4 more candidates across roles (one non-product role mandatory).

## Methodology references

This synthesis follows the post-interview template from the [`business-research` skill](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-research). Frameworks: BABOK §10.25 (interviews), Portigal *Interviewing Users* (2nd ed., 2022) for probing discipline, Tomer Sharon assumption-testing for hypothesis grounding, NN/g for sample-size and saturation.
