---
title: clew Bounded Context Map
status: draft
owner: Victor Hueni
last_reviewed: 2026-05-25
review_interval: 180d
---

# clew Bounded Context Map

## Bounded context catalogue

| BC-ID | Name | Subdomain type | Rationale |
|---|---|---|---|
| BC-01 | Artefact Store | Core | clew's competitive differentiator: deterministic ID generation, FK-enforced cross-artefact relationships, file binding, and snapshot / restore. This is where the integrity guarantee lives. |

## BC-01 — Artefact Store

**Ubiquitous language scope:** the language agents and developers use when interacting with
the persistence layer — artefact, business ID, relationship, file binding, snapshot, import,
export, layout.

**Core capabilities:**
- Registering artefacts with deterministic, application-managed business IDs
- Enforcing FK relationships between artefacts via a typed edge table
- Binding artefact records to their narrative markdown files (file path + section anchor)
- Exporting a business-ID-centric YAML snapshot and restoring from it

**Subdomain type rationale:** this is the primary differentiator of clew vs. status-quo
markdown. Any tool can store text; enforcing referential integrity across a heterogeneous
artefact graph with deterministic IDs is the specific capability that justifies the
persistence layer investment.

**Domain model:** [`docs/domain/07b-models/artefact-store.md`](07b-models/artefact-store.md)

## Context map

Single bounded context at v1 scope — no integration patterns to map. The CLI (`clew`) is
the sole entry point into BC-01. External contexts (agent sessions, marimo notebooks) are
consumers of the CLI's stdout contract; they do not hold domain objects.

When clew grows to v2 (MCP server interface), the CLI and MCP server will be two upstream
published-language integrations over the same BC-01 core — no new bounded context is
required.

## Open Items

None at present.
