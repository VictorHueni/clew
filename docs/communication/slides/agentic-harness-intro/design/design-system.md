# Design System — Agentic Harness Deck

## 1. Design Philosophy

**Name:** Clew Consulting Dark

**Principles:**
1. One idea per slide — every element serves the single key message; nothing decorative that doesn't reinforce meaning.
2. Graphic-first — the visual carries the argument; text captions the visual, never replaces it.
3. Typographic authority — large, confident type weights (700–800) for claims; monospace for IDs, labels, and metadata.
4. Restrained palette — near-black backgrounds on the cover, cool off-white on content slides; burgundy accent (#800020) used sparingly as the single punch of colour.
5. Breathing room — wide margins, generous whitespace between elements; never crowd the canvas.

---

## 2. Color Tokens

### Core palette — inherited from docs/ux/tokens.css (do not redefine)

| Token | Usage |
|---|---|
| `--canvas-bg` | Content slide background (#f8f9fc) |
| `--surface` | Card / cell background (#ffffff) |
| `--surface-2` | Recessed / grouped background (#eef0f6) |
| `--ink` | Primary text (#0f1117) |
| `--muted` | Secondary text (#5c6470) |
| `--border` | Card borders, dividers (#d0d5e1) |
| `--accent` | Burgundy brand accent (#800020) |
| `--accent-ink` | Text on accent fills (#ffffff) |

### Semantic state — inherited

| Token | Usage |
|---|---|
| `--success` | Done / validated (#1ea97c) |
| `--warning` | In progress / tested (#e8a219) |
| `--danger` | Error / critical (#e03e3e) |
| `--info` | Planned / neutral-active (#3b82f6) |

### Deck-only tokens

| Token | Value | Usage |
|---|---|---|
| `--dim` | `#9aa2ae` | Tertiary text, captions, timestamps |
| `--accent-lt` | `color-mix(in srgb, var(--accent) 10%, var(--surface))` | Subtle accent backgrounds |
| `--dark-bg` | `#0f1117` | Cover slide background |
| `--dark-surface` | `#1a1f2e` | Cards on dark background |
| `--dark-border` | `#2a3045` | Borders on dark background |
| `--dark-muted` | `#6b7a9a` | Secondary text on dark |
| `--dark-ink` | `#f0f2f8` | Primary text on dark |
| `--accent-bright` | `#c04060` | Brighter burgundy variant for dark backgrounds |
| `--loop-bg` | `#1a1f2e` | Model/loop box background |

---

## 3. Typography

### Font Stack

| Token | Usage |
|---|---|
| `--font-sans` | All headings, body, cards — Inter |
| `--font-mono` | IDs, labels, section chips, slide numbers — JetBrains Mono |

### Type Scale

| Element | Font | Size | Weight | Line-Height | Letter-Spacing |
|---|---|---|---|---|---|
| Cover title | sans | 56px | 800 | 1.08 | -0.02em |
| Content slide claim | sans | 34px | 700 | 1.15 | -0.01em |
| Section label | mono | 11px | 500 | 1 | 0.12em |
| Diagram label | sans | 13px | 600 | 1.3 | 0 |
| Diagram sublabel | mono | 11px | 400 | 1.4 | 0 |
| Stat (big number) | sans | 72px | 800 | 1 | -0.03em |
| Stat label | mono | 12px | 500 | 1.2 | 0.06em |
| Slide number | mono | 11px | 400 | 1 | 0 |

---

## 4. Canvas

| Property | Value |
|---|---|
| Width | 1280px |
| Height | 720px |
| Background (content) | var(--canvas-bg) |
| Background (cover) | var(--dark-bg) |
| Overflow | hidden |
| Positioning | relative |

---

## 5. Layout & Spacing

### Standard Regions

| Region | Position |
|---|---|
| Section label | `top: 44px; left: 68px;` |
| Slide title / claim | `top: 72px; left: 68px; right: 68px;` |
| Content area start | `top: 160px;` |
| Content area padding | `left: 68px; right: 68px;` |
| Slide number | `bottom: 32px; right: 52px;` |
| Left panel (2-col layout) | `left: 68px; width: 420px;` |
| Right panel (2-col layout) | `left: 520px; right: 68px;` |

### Spacing Scale

| Context | Value |
|---|---|
| Card gap | 16px |
| Grid gap | 20px |
| Section label to claim | 28px |
| Claim to content | 48px |
| Bottom margin (numbers) | 32px |
| Card internal padding | 20px 24px |

---

## 6. Iconography

| Property | Value |
|---|---|
| Library | Lucide Icons |
| CDN URL | https://unpkg.com/lucide@latest/dist/umd/lucide.min.js |
| Init call | `lucide.createIcons()` |

### Icon Usage Rules
- Monochrome: inherit colour from parent element
- Default stroke width: 1.5
- Sizes: sm=16px, md=22px, lg=32px
- Usage: `<i data-lucide="name" class="icon-md"></i>`
- Do not mix with emoji as primary icons

---

## 7. Reusable Atoms

### Section Label
```css
.section-label {
  position: absolute;
  top: 44px; left: 68px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}
```

### Slide Title / Claim
```css
.slide-title {
  position: absolute;
  top: 72px; left: 68px; right: 68px;
  font-family: var(--font-sans);
  font-size: 34px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--ink);
}
```

### Accent Line
```css
.accent-line {
  width: 48px; height: 3px;
  background: var(--accent);
  border-radius: 2px;
}
```

### Accent Bar Left (cover)
```css
.accent-bar-left {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  background: var(--accent);
}
```

### Slide Number
```css
.slide-number {
  position: absolute;
  bottom: 32px; right: 52px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--dim);
}
```

---

## 8. Component Library

### Component: Harness Chip
**Purpose:** Small label showing a harness layer name with icon.
```html
<div class="h-chip">
  <i data-lucide="database" class="icon-sm"></i>
  <span>Memory</span>
</div>
```

### Component: Artefact Node
**Purpose:** Pill showing a metamodel artefact with its ID.
```html
<div class="art-node">
  <span class="art-id">P-01</span>
  <span class="art-name">Personas</span>
</div>
```

### Component: Workflow Step
**Purpose:** Numbered step box in the horizontal workflow flow.
```html
<div class="wf-step">
  <div class="wf-num">1</div>
  <i data-lucide="book-open" class="icon-md"></i>
  <div class="wf-label">READ</div>
  <div class="wf-sub">artefacts</div>
</div>
```

### Component: Big Stat
**Purpose:** A large number with label for key metrics.
```html
<div class="big-stat">
  <div class="stat-num">2×</div>
  <div class="stat-label">PERFORMANCE UPLIFT</div>
  <div class="stat-desc">same model, better harness</div>
</div>
```

---

## 9. Link Styling

| State | Style |
|---|---|
| Default | color: var(--accent); text-decoration: none |
| Hover | text-decoration: underline |
| Target | target="_blank" on all external |

---

## 10. Presentation Mode

| Property | Value |
|---|---|
| Background | #000 |
| Scaling method | transform: scale() proportional to viewport |
| Navigation keys | ArrowLeft / ArrowRight |
| Enter key | fullscreen toggle |
| Exit key | Escape |
| Fullscreen API | yes |

---

## 11. Do / Don't Rules

### Do
- One visual + one headline per content slide
- Use monospace for all IDs (P-01, C2.3, PRD-0001)
- Use var(--accent) burgundy for the single emphasis element per slide
- Keep diagrams to 6 elements max
- Align to the standard regions defined above

### Don't
- Don't use bullet lists on any slide
- Don't hard-code hex values — always var(--token)
- Don't use more than 2 typefaces (sans + mono)
- Don't put more than 20 words of running text on a content slide
- Don't centre body text

---

## 12. Checklist Before Building
- [x] Every color token has a value
- [x] Every font has a family, fallback, and loading method
- [x] The type scale is fully filled in
- [x] Canvas dimensions are set (1280×720)
- [x] Section label, slide title, and slide number atoms are defined
- [x] At least one component is documented
- [x] Icon library is specified with CDN URL and init call
- [x] Presentation mode behavior is documented
- [x] styles.css defines all tokens and atoms
