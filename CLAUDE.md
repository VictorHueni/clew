# clew · agent context

Project-scoped instructions for agent sessions on this repo. Imports below load
automatically into every Claude Code session opened from this directory.

## North star

The product vision is the single source of truth for *why* clew exists, who it serves,
and what it explicitly is NOT. Every authoring or implementation decision must reconcile
against it.

@docs/VISION.md

## Where to look next

- **Build order + canonical artefact paths:** [`docs/README.md`](README.md) and the
  `homemade-claude-kit/rules/metamodel.md` stack reference.
- **Strategy layer:** [`docs/business/`](docs/business/) (personas, capability map,
  value streams, objectives, Lean Canvas).
- **Domain layer:** [`docs/domain/`](docs/domain/) (bounded contexts, glossary,
  domain model per BC).
- **Architecture decisions + interfaces:** [`docs/architecture/decisions/`](docs/architecture/decisions/)
  and [`docs/architecture/interfaces/`](docs/architecture/interfaces/).
- **Pre-formal evidence:** [`docs/discovery/`](docs/discovery/) (cross-cutting; feeds
  every downstream artefact).
- **Open governance work:** [`project-control/open-items/open-items.md`](project-control/open-items/open-items.md)
  — repo-wide consolidated ledger. Authoring lives in each artefact's local `## Open Items`
  section; the ledger is the read-out.

## Working style for this repo

- **Stack discipline.** Follow `homemade-claude-kit/rules/metamodel.md` for the build
  order; don't skip prerequisites when adding a new artefact.
- **Open Items contract.** Every artefact's `## Open Items` section uses the canonical
  11-column schema from `homemade-claude-kit/rules/open-items-governance.md §4`. No
  legacy `Open Issues / Next Tests` or `Open questions surfaced` headings.
- **Audit before declaring "done".** Run `util-metamodel-audit` (full mode) before
  shipping a stack-level change; review report at `var/reports/metamodel-audit/`.
