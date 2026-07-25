---
type: Use Case
title: "UC-03 — Detect and reconcile drift after out-of-band edits"
description: "Ava (via her agent) verifies that the documentation layer still matches the store, gets every mismatch classified into one of the four canonical drift categories, and reconciles each one deliberately — accepting legitimate narrative evolution, repairing damage, never laundering either into the other."
tags: [product-specs, use-case, drift-detection]
timestamp: 2026-07-25T07:49:12Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-07-25
review_interval: 180d
---

# UC-03 — Detect and reconcile drift after out-of-band edits

> Methodology: the kit's `spec-use-case/references/methodology.md` (Cockburn fully-dressed format). This file is the behavioural contract; command signatures, output shapes, and the drift-category definitions live in the [CLI contract](../../architecture/interfaces/cli-clew.md) and [ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md) and are cited, never restated.

| Field | Value |
|---|---|
| **Scope** | system — the clew CLI + artefact store ([BC-01](../../domain/02b-bounded-contexts.md#bc-01--artefact-store)) checking against the documentation layer; the scan itself never writes markdown |
| **Level** | user-goal 🌊 (one sitting: from "can I trust the prose?" to "verified, safe to proceed") |
| **Primary Actor** | [P-01 Ava](../../business/01a-personas.md#p-01--ava-the-agent-first-product-engineer) — the agent executes; Ava owns the triage verdicts. The *source* of drift (a hand-editing human, a colleague's PR, a non-clew agent session) is not an actor here — their edits are the terrain, not the goal |
| **Supporting Actors** | git (history used to distinguish evolution from damage and to restore trampled sections; not called by the system itself) |
| **Realises** | [C4.2.F01](../07a-fbs.md#c42--drift-detection) · [C4.2.F02, C4.2.F03](../07a-fbs.md#c42--drift-detection) (orphan flows — surfacing home pending [OI-0076](../../../project-control/open-items/open-items.md)) · [C2.3.F02](../07a-fbs.md#c23--file-binding-management) |

## Stakeholders and Interests

- **P-01 Ava** — before acting on a query answer, starting a refactor, or sharing the set, she knows whether the narrative still matches the facts; "I have an answer" becomes "I trust this answer enough to act on it" ([VS-2.4](../../business/04a-value-streams.md#vs-24--validate-against-current-state)).
- **The hand-editors** (humans, other agents, PR authors) — their *legitimate* prose improvements are accepted into the fingerprint record, not reverted; the substrate tolerates out-of-band writing, it just refuses to let it pass unnoticed.
- **The executing agent** — a finite, classified finding list with locations, instead of "diff everything against everything"; each category has a known reconciliation move.
- **The substrate ([OBJ-02](../../business/04b-objectives.md#obj-02--the-architectural-substrate-is-trustworthy-enough-that-agents-depend-on-it))** — the check-time half of KR-02.1: prose↔store agreement is verified on demand, complementing the write-time store-side guarantee; unreconciled drift stays visible on every run, never silently suppressed.

## Preconditions

- The store is initialised and at least one artefact carries a file binding ([UC-01](uc-01-persist-artefact-with-write-time-integrity.md) has run at least once).
- Bindings in scope have a recorded fingerprint — populated by their first successful scan ([CLI contract §Health](../../architecture/interfaces/cli-clew.md#health-group--clew-check); see Variations for the first-run case).

## Guarantees

- **Minimal guarantees** (hold even on failure or abandoned reconciliation):
  - The scan **never modifies markdown** and never mutates store facts — detection is strictly read-only ([§Health](../../architecture/interfaces/cli-clew.md#health-group--clew-check)).
  - Every finding is classified into **exactly one** of the four canonical categories with location detail ([ADR-0007](../../architecture/decisions/adr-0007-file-binding-content-hash-strategy.md)); nothing is reported as vague "mismatch".
  - Drift is never suppressed without an explicit acceptance: a finding left unreconciled reappears on every subsequent run — abandoning the sitting leaves the drift *visible*, not resolved.
- **Success guarantees**:
  - Every binding in scope reports OK; refreshed fingerprints (content hash, canonicaliser version, last-seen timestamp) are recorded for accepted changes.
  - Every reconciliation was a deliberate verdict: narrative evolution accepted, damage repaired, structural intent re-routed through the write path — no category was laundered into another.
  - Ava holds the trust certificate the downstream task needed (acting on an answer, starting [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md), or sharing per [VS-4.1](../../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current)).

## Trigger

Ava wants assurance the documentation layer still matches the store: session-start hygiene, after a colleague's PR or a hand-editing session, before a refactor's impact preview, or before publishing the artefact set.

## Main Success Scenario

1. Ava asks whether the prose still matches the facts.
2. The agent runs the drift scan across all bound files ([§Health](../../architecture/interfaces/cli-clew.md#health-group--clew-check)).
3. The system compares each recorded fingerprint against the documentation layer and reports every finding classified into one of the four categories — `file-missing`, `anchor-missing`, `content-drift`, `canonicaliser-changed` — with file and section detail; parent bindings in umbrella files are hashed with child-bound sections excluded, so a story edit flags the story, never its PRD ([ADR-0017](../../architecture/decisions/adr-0017-multi-artefact-file-contract.md) D2).
4. The agent triages each finding with Ava, using git history to see what changed: legitimate narrative evolution, unintended damage, or tooling change.
5. For legitimate evolution — the common case — the agent accepts the new prose by re-hashing the binding ([`clew bind --update`](../../architecture/interfaces/cli-clew.md#health-group--clew-check)), storing the refreshed fingerprint.
6. The system re-runs the scan; every binding in scope reports OK.
7. Ava proceeds with the task that demanded the trust, on a verified substrate.

## Extensions

- **2a.** No store exists (`not-initialised`, [§7](../../architecture/interfaces/cli-clew.md#7-error-contract)):
  - **2a1.** There is nothing to verify — the repo is pre-clew. Initialise and adopt first ([UC-01](uc-01-persist-artefact-with-write-time-integrity.md); brownfield adoption is its own goal, planned). Use case ends.
- **3a.** The scan is clean on the first pass:
  - **3a1.** The goal is already met; continue at 7. (The common outcome in a healthy repo — the scan's value is that this "nothing to report" is *proven*, not assumed.)
- **3b.** A finding is `anchor-missing` — the section's heading was renamed, mangled, or deleted out-of-band:
  - **3b1.** The section still exists under a wrong heading: the agent restores the identifier-titled heading so the anchor derives correctly again ([ADR-0002](../../architecture/decisions/adr-0002-artefact-file-binding.md)); re-scan.
  - **3b2.** The section was deliberately removed because the *artefact* should go: that intent is a retirement, not a prose fix — route through [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md); the scan is never the deletion path.
- **3c.** A finding is `file-missing` — a bound file was moved or deleted out-of-band:
  - **3c1.** Unintended: restore the file from git; re-scan.
  - **3c2.** Intended restructure: file moves are layout-governed store operations, not filesystem operations — undo the move, then re-do it through the write path so bindings follow ([UC-02](uc-02-refactor-artefact-with-foreseen-impact.md)); store records are never deleted to "match" a vanished file.
- **3d.** Findings are `canonicaliser-changed` — the hashing toolchain was bumped, not the prose:
  - **3d1.** Not real drift: the agent bulk re-hashes all affected bindings ([`clew bind --update --all`](../../architecture/interfaces/cli-clew.md#health-group--clew-check)); re-scan.
- **4a.** Triage shows unintended damage — a session trampled a section, a merge went wrong:
  - **4a1.** The agent repairs the prose from git history and re-scans. **Never `bind --update` over damage** — re-hashing without the verdict would launder the damage into accepted state, which is the one way this use case can lie to its stakeholders.
- **4b.** Triage shows the hand-edit carries *structural* intent — new ID-shaped headings invented by hand, a reference re-pointed in prose only, a status claim contradicting the store:
  - **4b1.** Prose cannot create or change facts. Ava decides which side is right: the store wins → fix the prose; the prose's intent wins → apply the change through the write path ([UC-01](uc-01-persist-artefact-with-write-time-integrity.md) / [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md)), then accept the narrative. Hand-minted ID-shaped headings with no store record are the orphan-in-file case whose surfacing home is an open decision ([OI-0076](../../../project-control/open-items/open-items.md)).
- **6a.** The re-run still reports findings:
  - **6a1.** The residue loops back to 4 — each remaining finding gets its verdict. The loop terminates because every verdict either updates a fingerprint or repairs prose, and the scan is deterministic over the result.

## Technology and Data Variations

- Step 2: the scan may run repo-wide or scoped to one file (`--path`) when the suspect edit is known — same classification, smaller surface.
- Step 3: on a binding's **first** successful scan, the system *populates* the fingerprint rather than reporting drift ([§Health](../../architecture/interfaces/cli-clew.md#health-group--clew-check)) — a baseline run, not a drift report.
- Step 2 (unattended variant): the same scan runs headless in CI as a gate; findings fail the build and the triage (steps 4–5) happens in the next interactive session. Detection is mechanical; *verdicts* are always human-owned.

## Related Information

- **Value-stream stages:** [VS-2.4 · Validate Against Current State](../../business/04a-value-streams.md#vs-24--validate-against-current-state) (High) and [VS-3.4 · Confirm No Drift](../../business/04a-value-streams.md#vs-34--confirm-no-drift) (Medium); also the gate of [VS-4.1](../../business/04a-value-streams.md#vs-41--confirm-snapshot-is-current) before sharing.
- **Epic / PRD:** [E-01](../../plans/delivery-roadmap.md#e-01--trustworthy-artefact-persistence) (`clew check` + `bind --update` are E-01 scope); grounds PRD-0001 stories via `Covers: UC-03`.
- **Why this exists:** the C3.3-retirement saga in this very repo — orphan references surviving two months and two repair passes ([OI-0073](../../business/04b-objectives.md#open-items) still open) — is the baseline this use case eliminates; detection latency is KR-02.3's "weeks → under a minute".
- **Frequency:** every session start in disciplined use; always before [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md) (its extension 3a calls this use case) and before sharing.
- **Siblings:** [UC-01](uc-01-persist-artefact-with-write-time-integrity.md) persist · [UC-02](uc-02-refactor-artefact-with-foreseen-impact.md) refactor · UC-04 link (planned) · UC-05 rebuild (planned).

## Use-Case 2.0 Slices

_Populated by the `slice` mode. The basic flow is the first slice; each alternative flow becomes a further slice. Every slice needs a test case._

| Slice | Narrative | Test case(s) | Status |
|---|---|---|---|
| UC-03.S1 | Basic flow (main success scenario) | _TBD (with PRD-0001)_ | ⬜ |
