---
okf_version: "0.1"
---

# Documentation Stack — clew

> **Scaffolded:** 2026-07-24 · **Last refreshed:** 2026-07-24
>
> Run the Scaffold mode Mode 3 to refresh status.
> Run the Audit mode Mode 2 for a full progress snapshot.
>
> This is the OKF bundle root `index.md` (reserved file — no artefact frontmatter).

---

## Stack progress

Status key: ✅ Done · 🔄 In progress (scaffold exists, needs filling) · ⬜ Not started

| Step | Artefact | Skill | Status | Canonical path | Last modified |
|---|---|---|---|---|---|
| 0 | Product Vision | `business-vision` | ✅ | [`docs/VISION.md`](VISION.md) | 2026-07-22 |
| 1 | Personas | `business-persona` | ✅ | [`docs/business/01a-personas.md`](business/01a-personas.md) | 2026-05-26 |
| 2 | Business Model Canvas | `business-model-canvas` | ✅ | [`docs/business/02a-lean-canvas.md`](business/02a-lean-canvas.md) (Lean Canvas variant) | 2026-07-24 |
| 2b | Bounded Context Map | `domain-bounded-context` | ✅ | [`docs/domain/02b-bounded-contexts.md`](domain/02b-bounded-contexts.md) | 2026-07-24 |
| 2c | Domain Glossary | `domain-glossary` | ✅ | [`docs/domain/02c-glossary.md`](domain/02c-glossary.md) | 2026-07-24 |
| 3 | Capability Map | `business-capability-map` | ✅ | [`docs/business/03a-capability-map.md`](business/03a-capability-map.md) | 2026-07-24 |
| 4 | Value Streams | `business-value-stream` | ✅ | [`docs/business/04a-value-streams.md`](business/04a-value-streams.md) | 2026-07-24 |
| 4.5 | Business Objectives | `business-objective` | ✅ | [`docs/business/04b-objectives.md`](business/04b-objectives.md) | 2026-07-24 |
| 5 | Business Processes | `business-process` | ⬜ | `docs/business/05a-processes/` | — |
| 6 | Quantitative Models | `business-quantitative-model` | ⬜ | `docs/business/06a-models/` | — |
| 7 | Functional Breakdown Structure | `spec-functional-breakdown-structure` | ✅ | [`docs/product-specs/07a-fbs.md`](product-specs/07a-fbs.md) | 2026-07-24 |
| 7b | Domain Model | `domain-model` | ✅ | [`docs/domain/07b-models/`](domain/07b-models/) | 2026-07-24 |
| 8 | Delivery Roadmap | `plan-delivery-roadmap` | ⬜ | `docs/plans/delivery-roadmap.md` | — |
| 9 | Quality Attributes | `spec-quality-attributes` | ⬜ | `docs/product-specs/09a-quality-attributes.md` | — |
| 10 | PRDs | `spec-prd` | ⬜ | `docs/product-specs/prds/` | — |
| 11 | Implementation Plans | `plan-implementation` | ⬜ | `docs/plans/active/` | — |

**Summary:** ✅ 10 / 🔄 0 / ⬜ 6 of 16 artefact steps

**Next step:** Step 5 — Business Processes · invoke `business-process` Mode 1 (scaffold)

---

## Supporting artefacts (run as needed — not in the linear build order)

| Artefact | Skill | Path |
|---|---|---|
| Architecture Decision Records | `arch-adr` | `docs/architecture/decisions/adr-NNNN-{slug}.md` |
| CLI Surface Contract | `arch-cli-contract` | `docs/architecture/interfaces/cli-clew.md` |
| Competitive Landscape | `business-competitive-landscape` | `docs/business/01b-competitive-landscape/` |
| Discovery Research | `discovery-research` | `docs/discovery/interviews/` |
| Pre-formal Ideas | `discovery-idea` | `docs/discovery/ideation/IDEA-NNNN-{slug}.md` |
| Metamodel (clew canonical, per ADR-0008) | — | `docs/metamodel/` |
| Design System | `ux-design-system` | `docs/ux/design-system.md` |
| Slide Decks | `com-slide-deck` | `docs/communication/slides/{slug}/` |
| PRD / Plan reviews | `agent-peer-review` | — (interactive, no persistent artefact) |

---

## Audit

| Tool | Purpose | Cadence |
|---|---|---|
| the Audit mode Mode 1 | Full health audit | Monthly (active) / Quarterly (maintenance) |
| the Audit mode Mode 2 | Progress snapshot | Before sprint planning |
| the Audit mode Mode 4 | Freshness check | Before research waves or presentations |
| the Scaffold mode Mode 3 | Refresh this index.md | After completing any stack step |

---

## ID conventions at a glance

| ID format | Artefact | Owning file |
|---|---|---|
| `P-NN` | Persona | `01a-personas.md` |
| `C-N.M` | Capability | `03a-capability-map.md` |
| `VS-N.M` | Value-stream stage | `04a-value-streams.md` |
| `OBJ-NN` · `KR-NN.M` | Objective · Key Result | `04b-objectives.md` |
| `BC-NN` | Bounded Context | `02b-bounded-contexts.md` |
| `BC-NN.GT-NN` | Glossary Term | `02c-glossary.md` |
| `BC-NN.AGG-NN` · `BC-NN.ENT-NN` | Aggregate · Entity | `07b-models/{bc-slug}.md` |
| `C-N.M.FXX` | Functionality | `07a-fbs.md` |
| `CO-NN` | Competitor Profile | `01b-competitive-landscape/CO-NN-{slug}.md` |
| `IDEA-NNNN` | Idea | `discovery/ideation/IDEA-NNNN-{slug}.md` |
| `ADR-NNNN` | Architecture Decision | `architecture/decisions/adr-NNNN-{slug}.md` |
