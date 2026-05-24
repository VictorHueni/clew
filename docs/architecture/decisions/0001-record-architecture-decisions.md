---
title: Record Architecture Decisions
status: active
owner: Victor Hueni
last_reviewed: 2026-05-24
review_interval: 180d
---

# Record Architecture Decisions

Date: 2026-05-24

## Status

Accepted

## Context and Problem Statement

Significant architectural decisions made during the design and evolution of
clew need to be traceable. Without recorded context, future contributors and
AI agents cannot understand the reasoning behind the current design.

## Decision Drivers

- Decisions made without recorded context are hard to revisit or challenge
- AI agents using clew as a tool need to understand its design constraints
- The tool is designed to evolve (CLI → MCP server → HTTP API) — the upgrade
  path must be documented

## Considered Options

- Unstructured notes in README
- Architecture Decision Records (MADR 4.x format)

## Decision Outcome

Chosen option: "Architecture Decision Records (MADR 4.x)", because the
structured format makes drivers, options, and trade-offs explicit and
queryable — consistent with what clew itself encourages for product teams.

### Positive Consequences

- Decisions are self-contained and searchable
- Supersession chains preserve the full history of a design choice

### Negative Consequences

- Requires discipline to write ADRs before implementing, not after
