---
title: Interview script · P-01 Ava · persona + UVP validation (wave 1)
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 90d
interview_target: P-01
language: English
style: semi-structured
session_context: Interview 1 of [OBJ-03 KR-03.2](../../04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling) (target 3 to 5). Interviewee self-identifies as a direct instance of P-01.
duration_target: 55 minutes
---

# Interview script · P-01 Ava · persona + UVP validation (wave 1)

## Hypotheses under test

This interview elevates four specific Assumed claims toward Tested. Each hypothesis maps to a concrete artefact section that will be updated in the post-interview synthesis.

| # | Hypothesis | Source artefact | Current state | Target state |
|---|---|---|---|---|
| H1 | P-01's §Frustrations are the top 3 pains an agent-first product engineer faces, in the right priority order. | [01a-personas.md §Frustrations](../../01a-personas.md) | Assumed | Tested (confirmed / refuted / refined per item) |
| H2 | P-01's §Goals (1 to 5) and §System Needs cover the outcomes the persona actually wants. | [01a-personas.md §Goals + §System Needs](../../01a-personas.md) | Assumed | Tested |
| H3 | The Lean Canvas §3 UVP bullets (north-star, high-concept, three concrete wins, anti-promise) resonate as a pitch that would prompt the persona to try clew. | [02a-lean-canvas.md §3 UVP](../../02a-lean-canvas.md#3-unique-value-proposition--confidence-assumed) | Assumed | Tested |
| H4 | The existing alternatives listed in PR-1 (markdown + grep, Notion DBs, bespoke YAML metamodels, spreadsheets, "trust the agent") are real tools the persona has used. | [02a-lean-canvas.md §1 Problem](../../02a-lean-canvas.md#1-problem--confidence-assumed) | Assumed | Tested |

## Pre-interview prep checklist

| Done | Item | Why |
|---|---|---|
| ☐ | Open [01a-personas.md](../../01a-personas.md) to §Frustrations, §Goals, §System Needs. | Need exact bullets in working memory to cross-check against interviewee's answers in Sections 1 to 3. |
| ☐ | Open [02a-lean-canvas.md](../../02a-lean-canvas.md) to §1 Problem (existing alternatives) and §3 UVP (all 6 bullets). | These are what gets read aloud in Section 4. Order them by bullet for clean delivery. |
| ☐ | Re-read [04b-objectives.md](../../04b-objectives.md) OBJ-03 KR-03.2 (interview-count target). | Shapes how aggressively to push for saturation signal in this wave. |
| ☐ | Mental check: ready to listen, not ready to defend. Close other tabs. | Founder-as-author bias is the largest risk for this specific interview; presence reduces it. |
| ☐ | Have synthesis template open in a second tab. | Goal: complete §Post-interview synthesis within 1h of the interview ending. |

## Opening (2 minutes)

> "Thanks for the time. I want to validate the P-01 Ava persona and the rough UVP for clew. We'll go through five sections covering your current workflow, frustrations, goals, the tools you actually use today, and only at the end your reaction to the value proposition. I'll deliberately not pitch anything for the first 35 minutes. I want your un-coached signal first.
>
> No right answers. If a question doesn't fit, say so. If something I assumed is wrong, that's the most valuable possible signal. We'll wrap with two closing questions in the last 5 minutes.
>
> Estimated 55 minutes. Ready?"

**DO NOT PITCH** until Section 4. Repeat: no mention of what clew does, no framing of the problem, no "the way I see it" until Section 4 explicitly opens the floor.

## Section 1 · Workflow + frustrations (15 minutes) · H1

**Goal:** surface how the interviewee actually works today on agent-driven product engineering, and what hurts when authoring across artefacts. Compare answers against P-01 §Frustrations bullets PR-1, PR-2, PR-3.

**Soft prime:**
> "Before we get into specifics, tell me about your current product-engineering setup. What kinds of projects, what tools, what role does the agent play day-to-day?"

| # | Question | What you're listening for |
|---|---|---|
| 1.1 | Tell me about the last new project you started. Walk me through the first day. | Presence or absence of architecture artefacts at the start; whether the agent was involved from minute one; what the first thing they wrote down was; whether it was structured or improvised. |
| 1.2 | When you write a persona, a value prop, or a requirement, where does it actually live in your repo? Show me a recent example if you can. | Format used (markdown, YAML, Notion); structure vs. ad-hoc; whether cross-references exist; how those cross-references are spelled (IDs, links, prose). |
| 1.3 | Tell me about the last time you noticed an inconsistency between two artefacts in one of your projects. What happened, and how long had it been wrong before you caught it? | Specific story of drift (not abstract claim); the time-to-detection delay; the cost of the fix; whether the agent had been the unaware perpetrator. |
| 1.4 | Where does the agent break down for you, structurally, after a few rounds of authoring on the same project? | Specific failure modes (loss of context, broken references, contradictions, rework); whether these match PR-1 / PR-2 / PR-3 or are different. |
| 1.5 | If you had to name your top 3 frustrations when doing this kind of work, what would they be? Don't filter; just name them. | Whether the ordering matches PR-1 (drift) > PR-2 (lookup latency) > PR-3 (methodology skip); brand new frustrations not in the persona doc. |

**Cross-check:**
> "On your top frustration, if I asked you to estimate how many minutes per week you lose to it, what would you say?"

What you're listening for: a concrete number that grounds the abstract claim. If they hedge, ask "okay, ballpark: under 30 min, an hour, half a day, a full day?" The bracket forces commitment without anchoring.

## Section 2 · Goals + system needs (10 minutes) · H2

**Goal:** surface what the interviewee considers a successful tool experience, and what trust criteria they apply. Compare against P-01 §Goals 1 to 5 and §System Needs.

**Soft prime:**
> "Flipping the question: what does it look like when your tooling actually works for this kind of work? Describe a session that went well."

| # | Question | What you're listening for |
|---|---|---|
| 2.1 | Describe the best authoring session you've had in the last month. What made it good? | Positive signals (specifics, not generic praise); the baseline they're benchmarking against; whether the goodness came from tool, agent, or their own discipline. |
| 2.2 | When you imagine "the agent works for product architecture", what does that mean concretely to you? | Vague vs. concrete answers; whether their phrasing matches P-01 §Goals (coherence at velocity, single source of truth, etc.); novel goals not captured. |
| 2.3 | What would make you trust an architectural tool enough to depend on it daily? | Trust criteria; what failure modes are unacceptable; whether trust is about determinism, transparency, reversibility, or something else. |
| 2.4 | If you had a magic wand and could fix one structural thing about how product architecture is documented, what would you fix? | Priority signal (singular fix surfaces what hurts most); whether it matches the Lean Canvas Problem block's framing. |

**Cross-check:**
> "You said the magic-wand fix is X. What's the next-best thing you'd settle for if X is unrealistic?"

What you're listening for: the priority gradient. A wide gap between magic-wand and settle-for reveals the deepest pain; a narrow gap reveals the work is more incremental.

## Section 3 · Existing alternatives (10 minutes) · H4

**Goal:** catalogue what the interviewee actually uses today. Compare against PR-1's existing-alternatives bullet (markdown + grep, Notion DBs, bespoke YAML metamodels, spreadsheets, "trust the agent").

**Soft prime:**
> "Let's talk about what you actually do today. No judgement; I'm interested in the real workflow, including any embarrassing hacks."

| # | Question | What you're listening for |
|---|---|---|
| 3.1 | Walk me through every tool, file format, or hack you've used in the last 6 months to keep product architecture coherent. | Specific tool names; which ones overlap with PR-1's list; new ones we missed; sequencing (started with X, moved to Y). |
| 3.2 | Of those, which ones worked? Which ones failed, and how? | Pros and cons per tool; specific failure modes; the moment they abandoned each one. |
| 3.3 | Have you tried building or maintaining your own metamodel or schema for this? If so, what happened? | "Bespoke YAML metamodel" is in PR-1's list; this validates or refines. Listen for: did they ship one? Abandon one? Why? |
| 3.4 | What is the single biggest reason you have not already built clew yourself, given you are now building it? | Implicit blockers (time, methodology gap, hadn't seen the right primitives); confirms or refines the Lean Canvas Unfair Advantage's "founder's practitioner background" bullet. |

**Cross-check:**
> "If I asked you to estimate how much time per month you spend on cosmetic markdown maintenance (formatting, link fixing, restructuring), what would you say?"

What you're listening for: whether the cosmetic-layer cost is big enough to justify bundling util-docs-lint, or whether it is a rounding error against the semantic-drift cost. Quantifies the value of the Solution §4 cross-cutting bullet.

## Section 4 · Value-prop reaction (15 minutes) · H3

**Goal:** stress-test whether the Lean Canvas §3 UVP's specific promises resonate. **Pitching is now permitted** (we have passed the 30-minute extraction threshold).

**Soft prime:**
> "I want to read you the rough value-prop for clew and get your unfiltered reaction. Don't worry about being polite. The most valuable answer for me is which bullets fall flat."

| # | Question | What you're listening for |
|---|---|---|
| 4.1 | (Read UVP north-star promise.) Immediate reaction. Does this describe a tool you'd want? | Emotional reaction; "yes / no / it depends" qualifiers; what they'd need to see to say a confident yes; whether the phrasing felt earned or buzzword-y. |
| 4.2 | (Read each "concrete win" in turn: 30-second cross-artefact answers; write-time integrity; methodology-as-substrate.) Which of these three matters most to you? Which feels overhyped or doesn't apply? | Ordering; "I don't actually have that problem" signals; new wins they'd add; whether they reach for the same priority as PR-1 / PR-2 / PR-3. |
| 4.3 | (Show the anti-promise: not a knowledge graph for everyone, not a BPMN tool, not a SaaS.) Do those anti-promises feel right, or am I excluding something I should include? | Positioning concerns; what they think clew should also NOT be; whether the bundled-cosmetic-linting framing reads naturally. |
| 4.4 | (Show the "Git for product architecture" high-concept.) Does that metaphor work for you, or does it feel forced? What metaphor would you use? | Better positioning language; metaphor reactions; whether they reach for a developer-tools analogy (Git, GitHub, Linear) or something else (Notion, ArchiMate, IDE). |
| 4.5 | If you saw clew on GitHub tomorrow, which sentence on the README would make you clone it within the hour? | What triggers action vs. what they'd skim past; the headline that earns the demo. |

**Cross-check:**
> "Earlier in Section 1 you said your top frustration was X. Looking at the value-prop now, which bullet directly addresses X? Does the match feel tight or loose?"

What you're listening for: alignment between Section 1's stated pain and Section 4's claimed relief. If the match is loose, that's the headline finding: the UVP and the actual pain set are out of register, and the UVP needs to be rewritten.

## Section 5 · Closing (5 minutes)

> "Two last things, then we wrap."

| # | Question | What you're listening for |
|---|---|---|
| 5.1 | If you were me, what should I be asking but haven't? | The lurking truth no one else has said. This question routinely produces the most valuable signal of the entire interview, because the interviewee is most warmed-up at the end. |
| 5.2 | Are there one or two other people in your network who fit the agent-first product engineer profile and might be willing to do a 30-to-45-minute conversation like this? | Warm-intro leads for wave 2 of OBJ-03 KR-03.2. Costs nothing to ask; halves recruitment effort. |

**Wrap-up script:**
> "Thanks. I'll synthesise this within an hour and the synthesis will land in `docs/business/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md` along with the specific updates to the persona and Lean Canvas. You'll see exactly which of your answers shifted which bullet. If anything I write doesn't match your intent, push back on the synthesis and I'll re-state."

## Limits

This interview deliberately does **not** test:

- **Pricing willingness-to-pay.** Out of scope for v1 (Lean Canvas §6 Revenue Streams = "none in v1 by design"). Will need a separate WTP-focused wave once a hosted variant is being considered.
- **Competitive landscape depth.** Section 3 surfaces tools the interviewee uses, but does not probe how they'd evaluate clew against named competitors in a head-to-head. Defer to a `business-competitive-landscape` wave.
- **Quantitative market sizing.** N = 1 produces no useful market estimate; KR-03.3 (≥ 5 active users) is a different validation track from this script's hypotheses.
- **Saturation.** This is wave 1 of 3 to 5. A single interview cannot reach saturation by definition; do not over-claim from it.
- **External validity.** The interviewee is the persona's author. Findings here are necessary but not sufficient for "P-01 is real"; external interviews (KR-03.2) close that gap.

## Post-interview synthesis (fill within 1 hour)

```markdown
# Synthesis · P-01 wave 1 · 2026-05-24

## Sample summary
- Interviews this wave: 1 of target 3 to 5
- Interviewee: Victor Hueni (founder, self-identified P-01 instance)
- Date: 2026-05-24
- Channel: text-based, in-session
- Recording: N/A (full transcript in conversation history)
- Duration: actual minutes

## Headline finding (one sentence, written within 24h)
{TBD: the single most important thing learned}

## Per-hypothesis verdict

### H1 · P-01 §Frustrations correct + correctly prioritised
- Cluster size: N out of 1 interview
- Verdict: Confirmed / Refuted / Refined
- Evidence: {quote or paraphrase + context}
- Update to apply: {file:§ + before/after}

### H2 · P-01 §Goals + §System Needs cover the wanted outcomes
- Cluster size: N out of 1 interview
- Verdict: Confirmed / Refuted / Refined
- Evidence: {quote or paraphrase + context}
- Update to apply: {file:§ + before/after}

### H3 · Lean Canvas §3 UVP bullets resonate
- Cluster size: N out of 1 interview
- Verdict: Confirmed / Refuted / Refined per bullet
- Evidence: {per-bullet reaction}
- Update to apply: {file:§ + before/after}

### H4 · PR-1 existing alternatives are real and used
- Cluster size: N out of 1 interview
- Verdict: Confirmed / Refuted / Refined
- Evidence: {tools named; tools dropped}
- Update to apply: {file:§ + before/after}

## Open questions surfaced (for wave 2)
- {new hypotheses or pains the interview surfaced but did not answer}

## Per-artefact updates table

| File | § | Before | After | Confidence shift |
|---|---|---|---|---|
| docs/business/01a-personas.md | §Frustrations | Assumed | Tested (per item) | Assumed → Tested |
| docs/business/01a-personas.md | §Goals | Assumed | Tested (per item) | Assumed → Tested |
| docs/business/02a-lean-canvas.md | §1 Problem | Assumed | Tested (per PR-N) | Assumed → Tested |
| docs/business/02a-lean-canvas.md | §3 UVP | Assumed | Tested (per bullet) | Assumed → Tested |
| docs/business/04b-objectives.md | OBJ-03 KR-03.2 | 0 of 3 to 5 interviews | 1 of 3 to 5 | Progress recorded |

## Confidence summary
- Before this interview: 12 KR Assumed across OBJ-01/02/03; persona Assumed; UVP Assumed
- After this interview: {updated count}
- Honesty check: N = 1 with author-as-interviewee is the *floor* of evidence, not the ceiling. Promotion to Validated requires external interviews per KR-03.2.

## What to do after

- [ ] Update [01a-personas.md §Research Grounding](../../01a-personas.md#research-grounding) with this interview's date, method, and confidence shifts.
- [ ] Update [01a-personas.md §Frustrations](../../01a-personas.md) per-item confidence labels (Assumed / Tested / Refined-by-wave-1).
- [ ] Update [02a-lean-canvas.md §1 Problem and §3 UVP](../../02a-lean-canvas.md) confidence per bullet, and amend any bullet that the interview refuted or refined.
- [ ] Increment OBJ-03 KR-03.2 baseline-to-current: 0 → 1 interview complete.
- [ ] Capture warm-intro names (if any) in a queue for wave 2.
- [ ] Schedule wave 2 (target: 2 to 4 more interviews with external candidates) per KR-03.2.
```

## Methodology references

This script follows: BABOK §10.25 (interviews), Portigal *Interviewing Users* (2nd ed., 2022), NN/g semi-structured guidance, Tomer Sharon's assumption-testing pattern. See the [`business-research` skill in homemade-claude-kit](https://github.com/VictorHueni/homemade-claude-kit/tree/claude/metamodel-personal-skills-naecw/business-research) for the full bibliography.
