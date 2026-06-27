---
title: Metamodel — Util (Supporting Package)
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 180d
---

# Util Package — _supporting_

> Part of [The Metamodel](../README.md) → **Supporting packages**. Prefix `util-` → _(no doc folder)_;
> reports land in `var/reports/`, the open-items ledger in `docs/project-control/`.

> **Tooling, not a metamodel artefact.** These skills mint no IDs and hold no typed relationships.
> They *operate on* the metamodel — scaffolding, auditing, migrating, linting it — rather than being
> part of it. This is the metamodel's own housekeeping and CI.

The **governance & housekeeping layer.** It stands the canonical `docs/` tree up, keeps it compliant
(IDs resolve, dependencies hold, sections present, links live), migrates legacy repos onto the
metamodel, and maintains the cross-cutting open-items ledger. As clew becomes the source of truth
([ADR-0008](../../architecture/decisions/adr-0008-clew-canonical-source-of-truth-for-metamodel.md)),
these `util-metamodel-*` checks are the natural home for validating clew's exports.

## Skills

| Skill | Output | What it does |
| :-- | :-- | :-- |
| `util-metamodel-scaffold` | `docs/` tree + `docs/INDEX.md` + `CLAUDE.md` pointer | Initialise the canonical folder tree (variant-aware) and a live navigation hub; wire the stack pointer. |
| `util-metamodel-audit` | `var/reports/metamodel-audit/` | Deep compliance audit across 18 dimensions — stack progress, placement, links, ID integrity, dependency enforcement, sections, staleness, orphans. Report-only. |
| `util-metamodel-migration` | `var/reports/metamodel-migration/` | One-time migration doctor — detect misplaced files by tiered confidence; emit atomic `git mv` + link-repair blocks. Report-only. |
| `util-open-items` | `docs/project-control/open-items/` | Maintain the repo-wide living ledger — sync local `## Open Items` sections into the central plane, triage, close, archive. |
| `util-docs-audit` | freshness report | Generic file-level rot scan — stale, outdated, dead docs. Not stack-aware (that's `util-metamodel-audit`). |
| `util-docs-lint` | lint report | Local-first Markdown toolchain — format (dprint), prose style (Vale + Microsoft), link-check (lychee). |
| `util-provenance` | provenance record | Hash-only provenance for any file — SHA-256 + RFC 3161 trusted timestamp over the digest, verified and published. |
| `util-toolkit-doctor` | repaired local setup | Audit/repair the Claude Code setup — chezmoi state, dotfiles + kit sync, `~/.claude/` symlink integrity. |

## Relation to the metamodel

`util-` is the metamodel's **control plane**, not its content. `util-metamodel-scaffold` creates the
folders the seven metamodel packages live in; `util-metamodel-audit` verifies the IDs, dependencies,
and relationships those packages declare; `util-open-items` runs the governance ledger referenced from
every artefact's `## Open Items`. None of these mint or own an artefact — they enforce the rules the
rest of the metamodel is written against. Under ADR-0008, the audit's source of truth for IDs and
relationships becomes clew's export rather than the kit registry.

## Planned additions

| Planned skill / feature | Adds | Kit issue |
| :-- | :-- | :-- |
| `util-open-items` runner | Deterministic CLI — parse tables, mint `OI-NNNN`, sync, validate, archive | [#20](https://github.com/VictorHueni/homemade-claude-kit/issues/20) |
| `util-provenance --sign` | Detached digital signature of the digest (GPG / openssl), fully local | [#27](https://github.com/VictorHueni/homemade-claude-kit/issues/27) |
| `util-provenance --c2pa` | Signed C2PA Content Credentials manifest (author + edit history) | [#28](https://github.com/VictorHueni/homemade-claude-kit/issues/28) |
