---
type: Design System
title: clew — Design System
description: The single visual source of truth for clew's communication layer — every generated deck and visualisation themes from the tokens defined here.
tags: [ux, design-system, tokens]
timestamp: 2026-06-24T16:59:31Z
status: draft
owner: Victor Hueni
last_reviewed: 2026-06-24
review_interval: 180d
---

<!-- doc-version: 1.0 | created: 2026-06-24 -->

# clew — Design System

The single visual source of truth for clew's communication layer. Every generated visual artefact — slide decks (`com-slide-deck`), artefact visualisations (`com-artefact-viz`) — themes from the tokens defined here. Edit the tables below, regenerate `tokens.css`, and every deck and view re-themes with no renderer changes.

> **Authoring contract:** the `## Tokens` tables below are machine-read by the `ux-design-system` skill to generate [`tokens.css`](./tokens.css). Keep the `Token` and `Value` columns intact; the `Role` column is for humans. Token *names* are the fixed contract — change values freely, but do not rename or drop a token.

---

## Brand rationale

clew is a precision tool for an audience that lives in terminals, reads code reviews, and trusts structure over decoration. The design language reflects the product's core promise: coherence, determinism, and traceability without friction.

- **Personality:** Precise, structured, minimal — intelligent tooling with calm confidence. Not playful; not cold. The tone of a well-designed developer dashboard.
- **Primary audience:** P-01 Ava (core) + P-03 Arno (depth) — AI-native builders and small teams, from agent-first product engineers to AI-augmented architect-builders, who evaluate tools by their structural integrity, not their marketing surface.
- **Accent reasoning:** Burgundy-crimson (`#800020`). The product name "clew" is the thread that guides you through the labyrinth — the archetypal thread is red (Ariadne's clew). Deep burgundy is authoritative and instantly distinctive in a sea of blue/indigo dev tools, while carrying the literal semantic of the product name. It signals confidence, precision, and the single thread that keeps everything coherent.
- **Typography reasoning:** Inter for body and UI — the default of the developer-tooling world, universally legible, mathematically precise. JetBrains Mono for IDs, code, and labels — it gives every `P-01`, `C2.3`, `OBJ-02` identifier the fixed-width authority it deserves. The monospace choice signals that IDs are stable references, not prose.
- **Light mode first:** presentations consume this palette. A near-white canvas keeps slide backgrounds from feeling like a slide tool; the surfaces feel like an IDE or a well-structured doc.

---

## Tokens

### Base palette

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0f1117` | Primary text — near-black with slight blue undertone |
| `--muted` | `#5c6470` | Secondary text, metadata, captions |
| `--canvas-bg` | `#f8f9fc` | Page / slide background — off-white, cool-toned |
| `--surface` | `#ffffff` | Card / panel background |
| `--surface-2` | `#eef0f6` | Recessed / group background, alternating rows |
| `--border` | `#d0d5e1` | Hairlines, dividers, table rules |
| `--accent` | `#800020` | Primary action, links, IDs, clew brand colour — Ariadne's thread |
| `--accent-ink` | `#ffffff` | Text on accent fills |

### Semantic state (generic — portable)

Generic, tool-agnostic state colours. Consumers derive their domain-specific tokens from these (e.g. `com-artefact-viz` maps delivery status / pain / confidence onto these in its own stylesheet), so a project only ever themes these four.

| Token | Value | Role |
|---|---|---|
| `--success` | `#1ea97c` | Positive / done / validated — teal-green |
| `--warning` | `#e8a219` | Caution / in-progress / tested — warm amber |
| `--danger` | `#e03e3e` | Negative / error / critical — clear red |
| `--info` | `#3b82f6` | Informational / planned / neutral-active — steel blue |

### Typography

| Token | Value | Role |
|---|---|---|
| `--font-sans` | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Body + UI — Inter preferred |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, monospace` | IDs, code, labels — JetBrains Mono preferred |
| `--title-size` | `1.6rem` | View / slide title size |

### Spacing & shape

| Token | Value | Role |
|---|---|---|
| `--space-sm` | `0.5rem` | Tight gaps |
| `--space-md` | `1rem` | Default gaps |
| `--space-lg` | `2rem` | Section padding |
| `--shell-max` | `1400px` | Max content width |
| `--card-radius` | `12px` | Card corners |
| `--btn-radius` | `8px` | Button corners |
| `--node-radius` | `10px` | Tree-node / chip corners |
| `--shadow` | `0 1px 2px rgba(15,17,23,.05), 0 2px 6px rgba(15,17,23,.09)` | Card elevation — subtle, cool-toned |

---

## How consumers use this

| Consumer | How it themes from this design system |
|---|---|
| `com-artefact-viz` | `python scripts/render.py SRC.md --design-system docs/ux/tokens.css` (auto-detected if present) |
| `com-slide-deck` | `build.py` inlines this `tokens.css` before the deck's `design/styles.css` (config `paths.design_tokens`, or auto-detected) |

---

## Open Items

_None at present._

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-06-24 | Initial scaffold | Victor Hueni |
| 2026-06-24 | Brand rationale authored: burgundy-crimson accent #800020 (Ariadne's clew / literal thread metaphor), Inter + JetBrains Mono type pair, light-mode-first cool palette | Victor Hueni |
| 2026-07-24 | Brand-audience line widened from P-01-only to the two-tier persona set (P-01 Ava core + P-03 Arno depth) per ADR-0014/ADR-0015 | Victor Hueni |
