---
title: clew · Open Items Ledger
status: active
owner: Victor Hueni
last_reviewed: 2026-05-26
review_interval: 30d
---

<!-- ledger-version: 1.0 | created: 2026-05-26 -->

# clew · Open Items Ledger

The repo-wide consolidated read-out of unresolved governance work across every artefact.
This file lives **outside `docs/`** because it is the operational system of record for
governance, not a product spec — see [`rules/open-items-governance.md` §5](../../../homemade-claude-kit/rules/open-items-governance.md) for the
authoring contract.

**Source-of-truth rule.** The local `## Open Items` section in each artefact is the
**authoring surface**. This ledger is the consolidated read-out. Authoring updates land
in the source artefact first; `util-open-items` then syncs canonical `OI-NNNN` IDs into
this file. Conflicts resolve in the artefact's favour.

## Schema

Each row preserves three coordinates back to the originating artefact:

- **Source artefact** — the relative repo path (e.g. `docs/business/02a-lean-canvas.md`).
- **Source anchor** — the fragment identifier (e.g. `#2-customer-segments`).
- **Source heading** — the full human-readable heading text.

A row whose `Source heading` is the sentinel `_central-only_` has no in-artefact origin
(raised directly at the central plane) and its `Source artefact` + `Source anchor` are
empty.

## Sync state

| Field | Value |
| :-- | :-- |
| First sync | _pending_ |
| Last sync | _pending_ |
| Tool | `util-open-items` (sync mode) |

Until the first `util-open-items` sync runs, the live items section below carries no
canonical `OI-NNNN` rows. The eight artefact-local `## Open Items` sections (counted in
the audit log below) remain the authoritative source. The sync run will:

1. Walk every `docs/**/*.md` `## Open Items` section.
2. Mint a canonical `OI-NNNN` ID per row, preserving the local OI-NN as a `Legacy local-ID` annotation if useful.
3. Populate the live items table below with one row per migrated artefact-local row.
4. Update each artefact's local `OI-ID` column to the canonical `OI-NNNN`.
5. Stamp the `Last sync` field above.

## Live items

| OI-ID | Type | Summary | Source artefact | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :-------------- | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |

_No canonical `OI-NNNN` rows yet. See **Sync state** above. Authoritative rows are the
local `## Open Items` sections enumerated in **Artefacts with local sections** below._

## Artefacts with local sections (as of 2026-05-26)

| # | Source artefact | Local rows | Notes |
| :- | :-- | :-- | :-- |
| 1 | [`docs/business/02a-lean-canvas.md`](../../docs/business/02a-lean-canvas.md#open-items) | 5 | All `open` / `in-progress`; due 2026-07-15 → 2026-09-30 |
| 2 | [`docs/business/03a-capability-map.md`](../../docs/business/03a-capability-map.md#open-items) | 5 | All `open` / `in-progress`; due 2026-08-31 → 2026-09-30 |
| 3 | [`docs/business/04a-value-streams.md`](../../docs/business/04a-value-streams.md#open-items) | 6 | All `open`; due 2026-08-31 → 2026-12-31 |
| 4 | [`docs/domain/02b-bounded-contexts.md`](../../docs/domain/02b-bounded-contexts.md#open-items) | 2 | OI-001 `closed` 2026-05-25, OI-002 `open` due 2026-12-01 |
| 5 | [`docs/domain/02b-context-map.md`](../../docs/domain/02b-context-map.md#open-items) | 0 | "None at present." — see cross-reference to BC catalogue |
| 6 | [`docs/domain/02c-glossary.md`](../../docs/domain/02c-glossary.md#open-items) | 0 | "None at present." — see cross-reference to BC catalogue |
| 7 | [`docs/domain/07b-models/artefact-store.md`](../../docs/domain/07b-models/artefact-store.md#open-items) | 2 | OI-001 `closed` 2026-05-25, OI-002 `open` due 2026-09-01 |
| 8 | [`docs/architecture/interfaces/cli-clew.md`](../../docs/architecture/interfaces/cli-clew.md#open-items) | 0 | "None at present." |
| 9 | [`docs/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md`](../../docs/discovery/interviews/research-synthesis-2026-05-24-P-01-validation.md#open-items) | 5 | All `open`; due 2026-08-31 → 2026-12-31 |
| 10 | [`docs/discovery/interviews/interview-P-01-persona-and-value-fit.md`](../../docs/discovery/interviews/interview-P-01-persona-and-value-fit.md#open-items) | 0 | Template-only (interview script); rows are placeholder schema |
| 11 | [`docs/business/01a-personas.md`](../../docs/business/01a-personas.md#open-items) | 0 | "None at present." |
| 12 | [`docs/business/04b-objectives.md`](../../docs/business/04b-objectives.md#open-items) | 0 | "None at present." |
| 13 | [`docs/product-specs/07a-fbs.md`](../../docs/product-specs/07a-fbs.md#open-items) | 0 | "None at present." |

**Total live local rows awaiting sync:** 25 across 6 artefacts.

## Archive

Closed and dropped rows remain in the live ledger for one review cycle (default 30 days
per [`rules/open-items-governance.md` §6](../../../homemade-claude-kit/rules/open-items-governance.md))
before moving to time-bucketed snapshots at [`archive/`](archive/). The live ledger
never silently deletes rows.

## Changelog

| Date | Change | Author |
| :-- | :-- | :-- |
| 2026-05-26 | Scaffolded the central ledger per [`rules/open-items-governance.md` §5](../../../homemade-claude-kit/rules/open-items-governance.md). Live items table empty pending first `util-open-items` sync; artefact-local sections remain the authoritative source until then. | Victor Hueni |
