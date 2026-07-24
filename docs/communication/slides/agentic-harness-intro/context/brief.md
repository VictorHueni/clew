# Presentation Brief

## Summary
A lean ~10-slide visual deck (plus one appendix) for a dev audience, making one argument: in agentic development the harness — not the model — is the dominant performance lever, and the highest-leverage, least-engineered piece of harness is durable long-term memory — the layer clew engineers as product architecture management: the integrity layer where agents write prose and only clew creates facts. Style modelled on BCG / McKinsey: action-title slides, one graphic per slide, minimal body text.

## Goal
Leave developers understanding two things: (a) the harness, not the model, is the performance lever (proven, not asserted), and (b) clew engineers the deepest memory layer as a typed, referentially-enforced metamodel — so the agent always knows where it is and why, and references never rot.

## Audience
Dev colleagues. Technically fluent. Familiar with LLMs and coding agents. Unfamiliar with formal harness anatomy or what clew does.

## Tone
Authoritative, graphic-first, terse. Action titles carry the conclusion; the graphic is the evidence. One big idea per slide. Consulting-quality layout: wide whitespace, strong typographic hierarchy, single visual per content slide. Burgundy accent used as the single punch of colour.

## Governing thought
The harness — not the model — is the dominant performance lever. The highest-leverage piece of harness almost nobody engineers is durable, deterministic long-term memory. That is the layer clew engineers — product architecture management, the integrity layer: agents write prose, only clew creates facts.

## Narrative arc (SCQA)
- Situation: every month a better model ships; the field tunes the engine.
- Complication: hold the model fixed, swap the harness → 42% to 78%. The lever isn't where the attention is.
- Question: what is a good harness, and where is it weakest?
- Answer: a harness is 15 capabilities around one loop; the weakest, highest-leverage one is memory. clew engineers it as a referentially-enforced metamodel.

## Slide Outline
1. Cover — "The model is the engine. The harness is the car."
2. Proof — same model, better harness: 42% → 78% (bar comparison)
3. The lever — ablation ranking: Tools › Middleware › Long-term memory › System prompt
4. Anatomy — one loop + 15 capabilities clustered onto the 7 phases (anchor diagram)
5. The gap — 3-layer memory pyramid; most harnesses stop at the shallowest layer
6. clew — the three P-01 pains vs clew's structured answer
7. Metamodel — product thinking as a typed graph, VISION → code
8. Mechanism — IDs minted by the app, links checked at write time, never by the LLM
9. Payoff — trace upstream, measure blast radius, prove integrity (clew trace / impact / check)
10. Close — engineer the harness, not the prompt; positioning + "product architecture memory for AI agents"
- A1 (appendix) — the full 15-capability map for Q&A

## Sources
- Li (aidanli.dev) — Claude Opus 4.5: 42% → 78% by switching harnesses (HAL CORE-Bench)
- arXiv 2604.25850 (Agentic Harness Engineering) — ablation ranking; observability-driven evolution
- arXiv 2602.14690 — Configuring Agentic AI Coding Tools (2,853 repos); context-file prevalence
- Sebastian Raschka — Components of a Coding Agent; "context quality is model quality"
- docs/discovery/interviews/research-synthesis-2026-06-24-agentic-harness.md
- docs/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md (P-01 pains)

## Constraints
- Positioning language for clew follows [ADR-0014 — Product Architecture Management positioning](../../../../architecture/decisions/adr-0014-product-architecture-management-positioning.md): category "Product Architecture Management for AI-native builders and small teams", pitch "agents write prose, only clew creates facts", taglines in the "product architecture memory for AI agents" direction; "repo-scale EA" / "repo-native EA" never appear in outbound material
- ~10 core slides + 1 appendix; one idea per slide
- No bullet-point slides — every content slide has a primary graphic; the action title is the takeaway
- Minimal body text per slide
- All colours via design tokens only (--accent = #800020 burgundy)
- Every external figure backed by a `data-sources` citation in bibliography.yaml

## Checklist
- [x] Summary written
- [x] Goal defined
- [x] Audience described
- [x] Tone specified
- [x] Key messages listed
- [x] Outline complete
- [x] Sources listed
- [x] Constraints stated
