---
title: Research Synthesis — What Makes a Good Agentic Harness (2025-2026)
status: active
owner: Victor Hueni
last_reviewed: 2026-06-24
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-06-24 | type: web-research synthesis -->

# Research Synthesis — What Makes a Good Agentic Harness (2025-2026)

**Research question:** What does current literature, empirical research, and mature reference implementations identify as the essential components, design principles, and quality signals of a well-engineered agentic coding harness?

**Method:** Systematic review of 7 ranked sources (academic papers, practitioner essays, official reference implementations) published or updated in 2025–2026, conducted 2026-06-24.

**Downstream intent:** Feed the `/com-slide-deck` deck that visualises the agentic development process and the harness taxonomy for clew's communication artefacts.

---

## §Sources

| Rank | Source | Type | Confidence |
|---:|---|---|---|
| 1 | Raschka — "Components of a Coding Agent" | Practitioner essay | High |
| 2 | Fowler site — "Building your own CLI Coding Agent with Pydantic-AI" | Practitioner tutorial | High |
| 3 | Li — "An Opinionated Guide to Agentic Coding" | Practitioner essay | High |
| 4 | arXiv 2602.14690 — "Configuring Agentic AI Coding Tools: An Exploratory Study" | Empirical paper (2,853 repos) | High |
| 5 | arXiv 2604.25850 — "Agentic Harness Engineering" | Research paper (AHE framework) | High |
| 6 | Anthropic — Claude Code tools reference | Reference implementation | High |
| 7 | OpenAI — Codex CLI docs | Reference implementation | Medium |

---

## §1 — The Central Insight: Harness Determines Performance, Not Model Alone

The most consequential finding across sources is a direct challenge to the dominant intuition: **model capability is secondary to harness quality**.

> "The LLM is the engine, a reasoning model is a beefed-up engine, and an agent harness helps us use the model." — Raschka

> "The harness matters more than the model." — Li, citing empirical evidence: Claude Opus 4.5 improved from **42% → 78%** on HAL CORE-Bench by switching harnesses, with the model unchanged.

The AHE paper (arXiv 2604.25850) formalises this: harnesses are "now central to coding-agent performance, mediating how models interact with tools and execution environments." Yet harness engineering remains largely manual, ad hoc, and under-studied compared to model benchmarking. This is a structural gap in the field.

**Implication for clew:** The `homemade-claude-kit` is a harness. Its quality — context files, AGENTS.md, skill definitions, metamodel rules — is a larger lever on agent output quality than model selection. This is the empirical grounding for clew's core hypothesis.

---

## §2 — Anatomy of a Good Agentic Harness

The synthesis across all sources converges on six structural layers. These map directly onto the taxonomy used in the clew slide deck.

### §2.1 The Agent Loop (Sense → Retrieve → Remember → Plan → Act → Validate → Learn)

All sources describe an iterative loop as the harness's beating heart. The canonical form:

1. **Sense** — collect environmental state (repo layout, git status, open files, logs)
2. **Retrieve** — pull relevant context from long-term memory and knowledge base
3. **Remember** — update working memory with current task state
4. **Plan** — decompose the task, sequence subtasks, model dependencies
5. **Act** — invoke tools (file edits, bash commands, API calls, code generation)
6. **Validate** — run tests, linters, type-checkers, assertions; observe results
7. **Learn** — integrate feedback; update heuristics; record decision in audit trail

The loop is not always linear. Validation failure returns to Plan; blocked retrieval loops back to Sense. The harness governs these transitions; the model only fills each step.

> "Iterative loops: Observe → Inspect → Choose → Act" — Raschka

### §2.2 Memory Architecture (Working · Episodic · Long-term · State Tracking)

Memory is the single component most consistently underdeveloped in amateur harnesses. Sources identify three distinct layers:

| Layer | Contents | Persistence | Implementation |
|---|---|---|---|
| **Working memory** | Current task summary, recently read files, active notes | Session-scoped | Distilled summary in system prompt or structured scratchpad |
| **Episodic memory** | Full transcript of this session — every request, tool call, result | Session-durable (resumable) | Transcript file; enables `/resume` |
| **Long-term memory** | Cross-session knowledge — AGENTS.md, CLAUDE.md, skill files, metamodel rules | Persistent | Context files loaded at session start |

> "A lot of apparent 'model quality' is really context quality." — Raschka

> "Without written records, the next session starts from zero." — Li

**State tracking** is a sub-concern: the harness must maintain awareness of repository state (active branch, dirty files, locked resources, open PRDs) so the agent does not act on stale premises.

**Prompt partitioning** is the key implementation pattern: split the system prompt into a **stable prefix** (cached: instructions, tool descriptions, workspace summary) and a **dynamic component** (per-turn: working memory, recent transcript, latest request). This reduces per-turn token cost dramatically.

### §2.3 Tools & Actuators (File Edits · Commands · API Calls · Code Generation)

A harness is only as capable as its tool set. The Claude Code reference implementation defines the canonical tool taxonomy for a mature coding agent harness (as of 2026):

**Sensors / read-only:**
- `Read` — file contents with line numbers; handles images, PDFs, notebooks
- `Grep` — ripgrep-backed pattern search; respects `.gitignore`
- `Glob` — filename pattern matching; sorted by modification time
- `LSP` — code intelligence (go-to-definition, find-references, type errors, call hierarchy)
- `WebFetch` — URL fetch → markdown extraction via small fast model
- `WebSearch` — query → titles + URLs (then WebFetch for page content)
- `Monitor` — background log/file watcher; feeds each line back to the agent

**Actuators / write:**
- `Edit` — exact string replacement (old_string → new_string; read-before-edit enforced)
- `Write` — full file create or overwrite (read-before-write enforced for existing files)
- `Bash` — shell command execution; background tasks via `run_in_background`
- `NotebookEdit` — Jupyter cell-level edits

**Agent coordination:**
- `Agent` — spawns subagent in isolated context window; foreground or background
- `SendMessage` — messages to agent team teammates; resumes stopped subagents
- `Workflow` — orchestrates many subagents via a script; returns consolidated result

**Scheduling:**
- `CronCreate` / `CronDelete` / `CronList` — session-scoped recurring or one-shot prompts
- `ScheduleWakeup` — self-paced loop interval selection

**Communication:**
- `AskUserQuestion` — structured multiple-choice clarification before acting
- `PushNotification` — desktop/mobile notification for long-running tasks

**Extension surface:**
- MCP (Model Context Protocol) — add any external tool without changing the core harness. Codex CLI, Claude Code, and the Pydantic-AI agent all use MCP for extension. The empirical study (arXiv 2602.14690) confirms MCP adoption is growing; `AGENTS.md` is emerging as the interoperable cross-tool standard for context files.

**Tool design principle:** bounded tool definitions (the harness validates arguments before execution) outperform open-ended tool access. The harness is the guard, not the model.

### §2.4 Controls & Validation (Tests · Assertions · Linting · Type Checking · Build)

Validation is the harness component most correlated with reliable output. Sources consistently identify it as the mechanism that separates "autocomplete with tools" from a genuine engineering agent.

> "Force tool usage over hallucination: make agents read files rather than guess, require test execution rather than assumptions." — Li

> "Success criteria is the most critical and most underrated component of the harness." — Li

Concrete validation mechanisms across the reference implementations:
- **Automated test execution** — run the full test suite after every edit batch; use failure output to re-plan
- **Type checking** — LSP-reported type errors after each edit (zero-latency vs. build-time checks)
- **Linting** — static analysis gate before marking a task complete
- **Build verification** — confirm the project compiles before returning to the user
- **Assertions** — sandboxed Python execution for calculation verification (Fowler/Pydantic-AI agent)
- **Simulations** — replay patterns in test environments before committing to production paths

**Testing-driven workflow pattern** (from the Fowler implementation):
1. Run test suite → identify failures
2. Read test files → understand expectations
3. Examine implementation → diagnose root cause
4. Search for related patterns → check conventions
5. Make surgical edits (minimal change philosophy)
6. Re-run tests → verify

The "minimal change philosophy" is not aesthetic — it is a harness discipline that prevents cascading regressions in downstream validation passes.

### §2.5 Observability (Logs · Tool Traces · Metrics · Summaries · Decision History)

A harness without observability cannot improve. The AHE paper identifies observability as the enabler of automatic harness evolution:

Three observability pillars (from AHE, arXiv 2604.25850):
1. **Component observability** — file-level representations make the action space explicit and reversible; every tool call is inspectable
2. **Experience observability** — trajectory data distilled into consumable evidence for the evolving agent
3. **Decision observability** — each edit is paired with a prediction, verified against subsequent outcomes ("falsifiable contracts")

This architecture transformed harness evolution from manual trial-and-error to automated improvement: 10 iterations improved pass@1 from 69.7% → 77.0% on Terminal-Bench 2, with cross-family gains of +5.1 to +10.1 percentage points and 12% fewer tokens.

**Practical observability minimum:**
- Structured logs of every tool call (tool name, arguments, result, timestamp)
- Working-memory snapshots at key decision points
- Decision history accessible to the agent for self-correction
- Summaries of completed subtasks persisted for session resume

### §2.6 Context & Knowledge Management

Context management is the highest-leverage engineering surface in a harness. The empirical study (arXiv 2602.14690) found that **context files are the most prevalent configuration mechanism** across all studied tools (Claude Code, Copilot, Cursor, Gemini, Codex) — often used exclusively, ahead of skills, subagents, or any other mechanism.

**Context degradation is real:** Even with 1M-token context windows, Opus 4.6 drops ~14 points over 750K tokens. Treating context as infinite is a harness design error.

**AGENTS.md / CLAUDE.md as the emerging standard:** The study identifies `AGENTS.md` as "an interoperable standard across multiple tools." It functions as the long-term memory anchor: loaded at every session, it gives the agent the stable project identity it needs to avoid re-deriving context. clew's `homemade-claude-kit/rules/metamodel.md` is the discipline-layer equivalent.

**Context reduction techniques** (Raschka):
- **Clipping** — truncate large tool outputs and file reads to prevent context bloat
- **Transcript reduction** — compress older events more aggressively than recent ones
- **Selective loading** — inject only the slice of the metamodel relevant to the current task (P-01's "give the agent exactly what it needs")
- **Stable prefix caching** — reuse the instruction + workspace summary across turns

**Knowledge sources** the harness provides:
- Documentation (README, AGENTS.md, metamodel rules, skill files)
- Code search (grep, LSP, glob over the live repo)
- Web search + fetch (live docs, current library APIs, research)
- RAG over the project's own artefact graph (clew's core capability: C3.1, C3.2)
- Knowledge base (the full artefact store — VISION → Implementation Plans)

### §2.7 Human Feedback & Safety (Approval · Permissions · Guardrails · Sandboxing)

A production harness must be safe by default, not just capable. The permission architecture is a first-class harness concern.

**Permission model (Claude Code reference):**
- Every destructive tool (`Bash`, `Edit`, `Write`, `WebFetch`) requires explicit permission
- Rules take the form `ToolName(specifier)` — e.g. `Bash(npm run *)`, `Edit(/src/**)`, `WebFetch(domain:example.com)`
- Permission modes: `default` (prompt on first use per domain) → `acceptEdits` → `auto` → `bypassPermissions`
- Hooks system: custom shell commands that fire on `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart` events — enabling audit, logging, linting gates before any write

**Sandboxing:** OS-level enforcement that covers every process (not just Claude's direct tool calls). Network restrictions, file system boundaries, and sandbox boundaries are independent configuration axes.

**Human-in-the-loop checkpoints:**
- `AskUserQuestion` before acting on ambiguous intent (structured multiple-choice)
- Approval gates for risky operations (configurable per tool, per path, per domain)
- Clarification loops: the harness routes back to the user when success criteria cannot be determined
- Handoff points: the agent signals "I need human review" rather than failing silently

**Approval modes in practice (from Codex CLI):** users select a comfort level that matches their risk tolerance — from interactive-review-every-step to fully-automated. The harness architecture must make this a first-class dial, not an afterthought.

---

## §3 — What Matters Most: Empirical Rankings

The AHE paper's ablation study provides the clearest empirical answer to "what makes a harness good":

**Ranked by performance impact (descending):**
1. **Tools** — the specific capabilities the agent can invoke; breadth and quality of the tool set
2. **Middleware** — the glue between the model and tools: argument validation, output formatting, error routing, retry logic
3. **Long-term memory** — persistent context (AGENTS.md, project rules, skill files)
4. **System prompt** — instructions, persona, behavioral constraints (matters less than the above three)

> "Ablations localize the gain to tools, middleware, and long-term memory rather than the system prompt." — arXiv 2604.25850

This ranking has counter-intuitive implications: most harness-tuning effort goes into prompt engineering (position 4) while the highest-leverage levers — tool quality and middleware robustness — are neglected.

---

## §4 — Configuration Patterns in the Wild

From the empirical study of 2,853 GitHub repositories:

| Pattern | Finding |
|---|---|
| Context files | Most prevalent mechanism; often the only one used |
| `AGENTS.md` | Emerging cross-tool interoperability standard |
| Skills / subagents | Rarely adopted; when used, rely on static instructions not executable code |
| Claude Code | Users employ the broadest range of configuration mechanisms vs. other tools |
| Advanced mechanisms | Low adoption; most repos use only static context, not hooks, subagents, or skills |

**Takeaway:** The field is still in a primitive configuration phase. The majority of practitioners are not using the harness's most powerful mechanisms. This is simultaneously evidence of opportunity (clew's structured context approach is ahead of the curve) and a market risk (the TAM for sophisticated harness tooling may take time to mature).

---

## §5 — Reference Implementations: Key Architectural Decisions

### §5.1 Claude Code (Anthropic)

The most mature reference implementation with the broadest tool set. Distinctive architectural choices:

- **40+ tools** covering sensing, acting, coordination, scheduling, and extension
- **MCP as extension protocol** — unbounded tool addition without core harness changes
- **Skills** — reusable prompt-based workflows that run through the existing `Skill` tool (not new tool entries)
- **Subagents with inheritance model** — tool access governed by `tools` / `disallowedTools` frontmatter; background subagents surface permission prompts in main session
- **Workflows** — scripts that orchestrate many subagents and return one consolidated result; the meta-coordination layer above individual subagents
- **Hooks system** — `PreToolUse` / `PostToolUse` / `Stop` / `SessionStart` events; custom shell commands fire at each event — this is the harness's extension point for audit, linting, and custom gates
- **Read-before-edit discipline** — `Edit` and `Write` require a prior `Read` in the current session; prevents acting on stale file state
- **LSP integration** — language-server-backed code intelligence (type errors after edit, go-to-definition, call hierarchy) — brings IDE-grade understanding into the harness

### §5.2 Pydantic-AI + MCP (Fowler/Li pattern)

The practitioner-assembled harness. Distinctive choices:

- **Composition over monolith** — assembles capabilities from MCP servers (Desktop Commander, Context7, DuckDuckGo, code reasoning, Deno sandbox)
- **Project-specific instruction files** — custom AGENTS.md encoding domain conventions ("fix implementation, not tests")
- **Long timeouts** (300s read, 60s connect) — patience for complex architectural analysis
- **Sandboxed Python execution** — calculations and assertions without filesystem risk
- **Live documentation via Context7** — real-time library docs prevent hallucinated API calls

### §5.3 Codex CLI (OpenAI)

- **Rust-native** — performance-first terminal agent
- **Local execution model** — reads, changes, and runs code on the user's machine in scoped directories
- **Flexible approval modes** — comfort-level dial from interactive to automated
- **MCP integration** — same extension protocol as Claude Code
- **`exec` command** — scripted non-interactive automation
- **Visual input** — accepts screenshots and design specs as task input

---

## §6 — Synthesis: Principles for a High-Quality Agentic Harness

Ranked by impact, cross-referenced across all sources:

### P-1: Make success criteria unambiguous before acting
Define what "done" looks like before the loop starts. Use tests, assertions, or explicit acceptance criteria as the ground truth. A harness that lets the agent decide when it is finished without a deterministic check is a harness that hallucinates completion.

> "Success criteria is the most critical and most underrated component." — Li

### P-2: Context quality > context quantity
A well-partitioned, selectively-loaded context outperforms a full-dump context. Stable prefix caching, transcript compression, and selective artefact loading (only the slice relevant to the task) are first-class engineering concerns, not optimisations.

> "A lot of apparent 'model quality' is really context quality." — Raschka

### P-3: Long-term memory is the harness's durable competitive advantage
AGENTS.md / CLAUDE.md / metamodel rules are the highest-leverage configuration surface. They persist across sessions, load at zero token cost per fetch (local file reads vs. MCP API roundtrips), and compound over time as the project's knowledge base grows. This is clew's foundational insight applied to harness design.

### P-4: Tool quality and middleware robustness outrank prompt quality
Invest in the tool set first, then the middleware (argument validation, retry logic, error routing), then long-term memory, then the system prompt. Most practitioners invert this priority ordering.

### P-5: Force grounding — tools over hallucination
Every claim the agent makes about the codebase must be verified by a tool call. Read the file; run the test; execute the linter. The harness must actively route the agent toward deterministic verification rather than allowing plausible-but-wrong inference.

### P-6: Design observability in from the start
Every tool call must be logged. Decision history must be accessible to the agent for self-correction. Trajectory data distilled into consumable summaries enables both human audit and automatic harness improvement.

### P-7: Subagents for parallelism; strict tool inheritance for safety
Independent subtasks (find a symbol definition, check a config, investigate a test failure) parallelise cleanly via subagents. Each subagent's tool access should be explicitly bounded (narrow `tools` list, no bare `Bash` unless required). Background subagents surface permission prompts to the main session.

### P-8: Permission model is a first-class architecture concern
Destructive operations must require approval by default. Sandboxing must be OS-level (covers every process, not just direct tool calls). Approval modes are a comfort dial — the harness provides the dial; the user sets the position.

### P-9: Persistence between sessions is the harness's primary moat
A harness that forgets between sessions forces the agent to re-derive what it already knows. Session-durable memory (transcript resume) plus cross-session memory (AGENTS.md + project artefacts) is what separates a coding assistant from a coding agent.

### P-10: Iterate the harness, not just the prompts
The AHE paper demonstrates that the harness itself can be evolved automatically through observability data. At minimum: maintain a changelog of harness changes, attribute performance changes to specific modifications, and treat the harness as a first-class engineering artefact with its own review cadence.

---

## §7 — Mapping to the Agentic Harness Taxonomy

The taxonomy used for the clew slide deck maps cleanly onto the research findings:

| Taxonomy cluster | Research finding | Highest-impact lever |
|---|---|---|
| **Agent Core** (Planner, Reasoner, Policy, Execution Loop) | The loop is the harness backbone; policy/orchestrator governs transitions | Execution loop design |
| **Memory** (Working, Episodic, Long-term, State) | Three-layer memory is essential; most harnesses only implement working memory | Long-term memory (AGENTS.md) |
| **Knowledge** (Documentation, Search, RAG, KB) | Context files dominate real-world usage; RAG over artefact graph is the next frontier | Context file discipline |
| **Sensors / Perception** (File inspection, Logs, Browser, Telemetry, Error detection) | Read-before-act discipline; LSP for code-aware sensing; Monitor for async streams | LSP + Monitor tools |
| **Actuators / Actions** (File edits, Commands, API, UI, Code gen) | Tool quality is the #1 performance lever; bounded definitions beat open access | Tool set breadth + middleware |
| **Controls & Validation** (Tests, Assertions, Linting, Type checking, Build) | Most underinvested component; most correlated with reliable output | Testing-driven workflow |
| **Observability** (Logs, Tool traces, Metrics, Decision history) | Decision observability enables automatic harness evolution (AHE) | Structured tool call logs |
| **Goals & Tasking** (Intent, Success criteria, Constraints, Priority, Scope) | Success criteria is the most critical underrated component | Explicit success criteria |
| **Planning & Decomposition** (Task graph, Subtasks, Sequencing, Retries) | Subagents + Workflow tool for parallel decomposition | Workflow orchestration |
| **Identity & Access** (Roles, Credentials, Permissions, Auth) | Permission model is a first-class architecture concern; OS-level sandboxing | Sandbox + permission rules |
| **Human Feedback** (Review, Approval, Clarification, Handoff) | AskUserQuestion before ambiguous actions; approval modes as a comfort dial | Structured approval gates |
| **Learning & Adaptation** (Feedback loops, Self-improvement, Heuristics) | AHE paper: automatic harness evolution via observability — 69.7% → 77.0% | Decision observability |
| **Safety & Governance** (Guardrails, Approval gates, Sandbox) | Hooks system for custom gates; deny rules per tool/path/domain | Hooks + deny rules |
| **Environment State** (Repo state, System status, Runtime context) | Upfront workspace summary; git status + README + AGENTS.md loaded before first action | Stable workspace summary |
| **Tools & Skills** (Shell, Code, Browser, MCP, Domain-specific) | MCP as the extension protocol; Skills for reusable prompt-based workflows | MCP + Skills |

---

## Open Items

| OI-ID | Type | Summary | Source anchor | Source heading | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
| :---- | :--- | :------ | :------------ | :------------- | :-------------- | :------- | :----- | :---- | :---------------- | :---------- |
| OI-0053 | execution-item | Deep-dive the AHE paper (arXiv 2604.25850) methodology — the observability-driven automatic harness evolution approach is directly relevant to a future `util-harness-audit` skill. | #observation-observability | §2.5 Observability | Obtain and read full paper; assess whether AHE's three observability pillars map onto a clew skill concept. | medium | open | Victor Hueni | 2026-09-30 | _TBD_ |
| OI-0054 | decision-gap | Whether clew's `homemade-claude-kit` should adopt `AGENTS.md` as the cross-tool interoperability surface (alongside the existing `CLAUDE.md`), given the empirical study's finding that `AGENTS.md` is the emerging cross-tool standard. | #configuration-patterns | §4 Configuration Patterns in the Wild | Review arXiv 2602.14690 §4 configuration-mechanism taxonomy; decide whether to add `AGENTS.md` generation to `util-metamodel-scaffold`. | medium | open | Victor Hueni | 2026-08-31 | _TBD_ |

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-06-24 | Initial synthesis from 7 ranked sources — Raschka, Fowler/Li, arXiv 2602.14690, arXiv 2604.25850, Claude Code docs, Codex CLI docs. Structured around the 6-layer harness anatomy and 10 design principles. | Victor Hueni |
| 2026-07-24 | Open-items renumber (governance sync, no content change): this note's rows OI-0030/OI-0031 collided with ledger-owned IDs (canonical since the 2026-05-26 sync); renumbered to OI-0053/OI-0054 per the central ledger (`project-control/open-items/open-items.md`) mapping. | Victor Hueni |
