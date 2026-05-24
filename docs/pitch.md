# clew · pitch

> *A clew is the corner of a sail you pull to steer — and the thread that guides you through the labyrinth.*

## In one line

**clew is product intelligence and architectural memory for AI-native teams** — the deterministic layer where agents persist, query, and reason about a product's full architecture, from vision down to implementation plan.

## Who it's for

Engineers and founders who **build with agents as primary co-authors**. Not "people who use AI to help them code" — people who ship with Claude, Codex, and others in the loop for every architectural decision. They author at agent-speed, and they have discovered that markdown alone does not survive that speed.

## The problem

**Strategy collapses into delivery — and the substrate is why.**

Today, strategic artefacts (vision, personas, capabilities, value streams, objectives) get flattened into Jira tickets or buried in markdown no one re-reads. Delivery tools win because they are the only place with structure. Strategy loses because it has nowhere structured to live.

Agents accelerate this collapse. They generate artefacts fast, but they cannot hold referential integrity across them: IDs drift, links break, "which PRDs serve KR-03?" becomes unanswerable. The architecture exists in the corpus and nowhere else. Without a substrate, strategic thinking has no choice but to fold into the delivery tool — which is the only place it can be tracked.

**Fix the substrate, and strategy survives.**

## What clew is

An **opinionated 16-artefact metamodel**, persisted locally as YAML + DuckDB, with referential integrity enforced at write time.

- Agents call clew through Bash; clew mints IDs the LLM cannot guess and rejects writes that would break the graph.
- Markdown narrative lives alongside, written by the agent, referencing IDs returned by clew.
- The schema is not configurable — it is the value. Vision, personas, capability map, value streams, objectives, key results, bounded contexts, domain model, FBS, epics, quality attributes, PRDs, implementation plans, ADRs. You don't design the metamodel; you populate it.

## North Star

**Percentage of architectural artefacts that resolve end-to-end from VISION to Implementation Plan with zero broken references.**

A single query against the DB returns this number at any point. When it stays near 100% as the agent ships, the substrate is doing its job. When it falls, the substrate tells you exactly where.

## What clew is NOT (today)

- **Not a PM or ticketing tool.** Issue tracking is delivery accounting. clew is product thinking.
- **Not a cloud SaaS.** The MVP runs locally. Your repo is the source of truth.
- **Not a multi-user collaboration platform.** Single-writer per repo, by design.
- **Not a generic knowledge-graph framework.** The 16-artefact schema is opinionated and complete.

*Tomorrow, any of these could change — multi-user, hosted, broader ontology. The MVP narrows the shape so the substrate ships first.*

## Why now

Agent-authored code is normal. Agent-authored architecture is not — because nothing yet treats it as first-class. clew is the layer that makes the second category possible: an artefact graph an agent can read, write, and reason over without losing its place.
