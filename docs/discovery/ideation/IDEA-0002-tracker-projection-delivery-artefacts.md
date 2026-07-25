---
type: Idea
title: IDEA-0002 — Tracker projection for delivery-shaped artefacts (Linear / Jira / GitHub Issues)
description: Pre-formal capture of the 2026-07-25 idea to project clew's delivery-shaped artefacts (epics, user stories) one-way into a work tracker, with clew remaining the system of record for what must be true.
tags: [discovery, ideation, integration, tracker]
timestamp: 2026-07-25T07:16:51Z
status: active
lifecycle: captured
owner: Victor Hueni
last_reviewed: 2026-07-25
review_interval: 60d
---

<!-- doc-version: 1.0 | created: 2026-07-25 | graduates_to: capability-map/FBS extension + projection-boundary ADR + post-v1 roadmap epic -->

# IDEA-0002 · Tracker projection for delivery-shaped artefacts

Pre-formal capture of a founder-raised question from the 2026-07-25 working session: *could clew be replaced by — or partially delegated to — a tool like Linear, Jira, or GitHub Issues?* The session's assessment (condensed below) reframed "replace" into "project": not yet doctrine — graduates into a capability/FBS extension, a projection-boundary ADR, and a post-v1 roadmap epic once wave-2 surfaces demand.

## The thesis (founder-raised, agent-elaborated, condensed)

- **Delivery-shaped artefacts have a dual life.** An epic (`E-NN`) or user story (`PRD-NNNN.US-NN`) is simultaneously a *fact of product intent* (clew's territory) and a *unit of work in progress* (tracker territory). Today clew holds the first and [VISION](../../VISION.md) explicitly concedes the second: *"delivery accounting belongs elsewhere."* A projector turns that concession into an integration surface.
- **Shape: one-way projection, never a backend.** A projector pushes epics and stories into the tracker as work items, each carrying its clew ID; the tracker item's URL flows back into a property on the clew record (the `Tracker ref` slot that already exists in the governance schema). Structure, references, and identity **never originate tracker-side**. At most a narrow status round-trip (tracker "Done" → story status property).
- **Explicitly not a replacement**, because tracker data models cannot carry the substrate: no typed edges with write-time type/cardinality enforcement (deleting an issue silently orphans its links — *dangling references become representable*, breaking the core guarantee); prose leaves the repo (breaks file binding C2.3, drift detection C4.2, repo-as-source-of-truth, and the local-first zero-token read economics in [P-01 §System Needs](../../business/01a-personas.md#system-needs)); no byte-identical deterministic export (breaks KR-02.4 rebuild); the metamodel degrades to labels and custom fields nothing validates — the maximal-tool / weak-enforcement shape [ADR-0013](../../architecture/decisions/adr-0013-minimal-model-not-repo-native-ea.md) rejects.
- **Precedent already in the stack:** the kit's open-items governance ships a pluggable `markdown | github` backend (kit ADR-0002/0003), and every OI row carries a `Tracker ref` column at `_TBD_` — the seam exists; this idea widens it from open items to delivery artefacts.
- **First target candidate:** GitHub Issues (free, ubiquitous, already adjacent to the repo); Linear as the P-01-flavoured option; Jira is enterprise-buyer territory, not the wedge persona.

## Assessment (agent review, 2026-07-25)

1. **Doctrinally clean.** Under [ADR-0015](../../architecture/decisions/adr-0015-opt-in-layer-packages.md)'s read-surface rule, the tracker becomes another projection (after markdown, query views, snapshot, cartography): *projection is never a second source of truth.* It also reinforces the [ADR-0014](../../architecture/decisions/adr-0014-product-architecture-management-positioning.md) category boundary instead of blurring it — clew manages *what must be true*, the tracker manages *what's in progress*, and the projector is the explicit handshake between the two.
2. **The single-writer invariant is the design risk.** Any status round-trip makes the tracker a second writer in disguise ([ADR-0001](../../architecture/decisions/adr-0001-metamodel-persistence-layer.md): single-writer per repo). The boundary must be decided in an ADR before any build: which properties (if any) may flow back, and everything else one-way out. The safe v1 answer may be "nothing flows back; the tracker ref is a link, full stop."
3. **Sequencing is hard-gated.** There is nothing to project until stories exist as store records — E-01 shipped and PRD-0001 dogfooded. This idea is post-v1; building it earlier would be delivery-accounting scope creep against [OBJ-03](../../business/04b-objectives.md#obj-03--validate-the-core-hypotheses-before-scaling).
4. **Demand is unvalidated (N=0).** Unlike IDEA-0001, no interview evidence supports it — it emerged from a founder thought experiment. The cheap test is a wave-2 interview probe ("would you want your clew stories to appear in Linear/GitHub Issues automatically?") before any capability is minted.

## Graduation path

| Target artefact | What graduates | Precondition |
|---|---|---|
| Wave-2 interview guide | The demand probe: tracker-projection interest, target tool, and whether one-way is acceptable | None — add now ([OI-0083](#open-items)) |
| Capability map + FBS extension | A projection functionality (likely under C2.4's export family, or a new C3.x read surface) with mirrored `C-N.M.FXX` rows | Wave-2 demand signal ≥ 1 external instance |
| Projection-boundary ADR | One-way rule, ID carriage, tracker-ref back-link property, status round-trip decision (or its explicit rejection), single-writer preservation | Wave-2 signal; before any build |
| Roadmap epic (post-v1) | The projector build, first target tool | E-01 shipped + PRD-0001 dogfooded + the ADR above |

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0083 | execution-item | Wave-2 interview guide must gain the tracker-projection demand probe (interest, target tool, one-way acceptability) so IDEA-0002's graduation rows 2–4 have evidence to gate on; without it, wave-2 closes and the idea stays permanently N=0. | #graduation-path | Graduation path | Add the probe to the wave-2 interview guide (extends the OI-0015/OI-0016 wave-2 scope alongside the P-03 interview mix); record per-interview answers; decide graduation or parking after wave-2. | medium | open | Victor Hueni | 2026-08-31 | _TBD_ |

## Changelog

- 2026-07-25 · Captured · Founder-raised "could a tracker replace clew?" question from the 2026-07-25 session persisted as IDEA-0002 with the replace→project reframe, the four-point assessment, and the wave-2-gated graduation path. OI-0083 filed (wave-2 probe).
