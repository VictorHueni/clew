---
title: Research Supplement — Problems & Challenges Agentic Harnesses Solve (2025-2026)
status: active
owner: Victor Hueni
last_reviewed: 2026-06-27
review_interval: 90d
---

<!-- doc-version: 1.0 | created: 2026-06-27 | type: research supplement -->

# Research Supplement — What Problems Does the Agentic Harness Solve?

**Purpose:** Complement the main research synthesis (2026-06-24) by documenting the concrete pain points, failure modes, and industry crises that drive demand for agentic harness engineering. Drawn from online research conducted 2026-06-27 across 15+ sources including academic surveys, practitioner essays, engineering blogs from Anthropic/OpenAI, and industry benchmarks.

**Method:** Targeted web research supplementing the prior 7-source systematic review. Sources span: Morph (analysis of 40+ harnesses), OpenAI Engineering (Codex 1M-line experiment), DEV/Hector Flores (agent sprawl data), Meng et al. "Agent Harness Survey" (110+ papers, 23 systems), Li et al. "Agent Harness Engineering Survey" (CMU/Amazon/7 universities), Picrew ETCLOVG taxonomy, SWE-Lancer benchmark, SandboxEscapeBench, Salesforce Connectivity Benchmark, Gartner forecasts, and CIODive/MIT enterprise studies.

---

## The Core Thesis

The agentic harness exists because the dominant intuition — "better models solve everything" — has been empirically falsified. Across every major benchmark and production deployment studied in 2025-2026, **harness quality determines agent performance more than model capability does.** The problems the harness solves are not theoretical — they are measured, quantified, and compounding.

---

## §1 — The Performance Gap: Model ≠ Agent

### §1.1 Same Model, Different Harness: The Evidence

| Study | Metric | Before | After | Change | What changed |
|---|---|---|---|---|---|
| Pi Research / Grok Code Fast 1 | SWE-bench | 6.7% | **68.3%** | **+61.6pp** | Only harness edit-tool format — model unchanged |
| Claude Opus 4.5 (Li citing HAL CORE-Bench) | HAL CORE-Bench | 42% | **78%** | **+36pp** | Only harness — model unchanged |
| AHE paper (Lin et al., arXiv 2604.25850) | Terminal-Bench 2 pass@1 | 69.7% | **77.0%** | **+7.3pp** | 10 iterations of harness-only evolution (surpassed hand-designed Codex-CLI at 71.9%) |
| AHE frozen harness transfer | SWE-bench-verified | baseline | **tops aggregate** | **12% fewer tokens** | Evolved harness transferred to different benchmark |
| AHE cross-family transfer | Terminal-Bench 2 | baseline | **+5.1 to +10.1pp** | across 3 model families | Same evolved harness, different models |

**Magnitude matters:** A 36-62 percentage point improvement by changing the harness alone — with zero model change — is not marginal. It is structural. The field is investing heavily in model architecture while leaving the larger lever untouched.

### §1.2 Frontier Models Still Fail at Real-World Engineering

The SWE-Lancer benchmark (OpenAI, Feb 2025, 1,488 real Upwork tasks worth $1M) found:

| Model | Individual task success | Management task success | Implied earnings |
|---|---|---|---|
| Claude 3.5 Sonnet | **26.2%** | 44.9% | ~$400K / $1M |
| GPT-4o | **8.6%** | 38.7% | far lower |

> "Even the best models struggle with real-world software engineering." — DevOps.com, Feb 2025

The framing problem: these results are not "model A beats model B." They are "every model, even the best, operates far below human competence on realistic tasks." The missing variable is not intelligence — it is infrastructure.

### §1.3 The Evaluation Crisis: Benchmarks Lie

METR's longitudinal study found that **benchmark-passing PRs have a 24.2 percentage point lower human merge rate**, and this gap is **widening at 9.6pp/year**. OSWorld reports a **28% false negative rate** in automated evaluation.

Benchmark scores are inflating faster than actual agent capability. The harness is the unmeasured variable corrupting the entire evaluation pipeline.

---

## §2 — The Context Crisis

### §2.1 Context Pollution Is the #1 Failure Mode

Morph's analysis of 40+ coding agent harnesses (March 2026) found a single dominant pattern:

> **"Context pollution determines task failure. Search wastes 60% of agent time. Edit retries inject redundant file reads. The agents that win are the ones that keep their context clean."** — Tejas Bhakta, Morph

Key figures:
- **60% of agent time** wasted on search
- **Context rot is measurable and universal** across all harnesses studied
- **Edit retries compound the problem** — each retry reads the file again, bloating context

### §2.2 Context Windows Are Not Infinite

Even with 1M-token context windows, performance degrades measurably:
- **Opus 4.6 drops ~14 points over 750K tokens** (from main synthesis)
- This is not a hardware limit — it is a fundamental attention-allocation problem

### §2.3 The Monolithic AGENTS.md Failure

OpenAI's engineering team (Ryan Lopopolo, Feb 2026) tried the "one big AGENTS.md" approach in their 1M-line Codex experiment. It failed in four predictable ways:

1. **Context is a scarce resource.** A giant instruction file crowds out the task, the code, and relevant docs.
2. **Too much guidance becomes non-guidance.** When everything is "important," nothing is.
3. **It rots instantly.** Monolithic files become graveyards of stale rules. Agents can't tell what's still true.
4. **It's hard to verify.** Drift is inevitable without mechanical checks.

> "We tried the 'one big AGENTS.md' approach. It failed." — Ryan Lopopolo, OpenAI

Their solution: treat AGENTS.md as a **table of contents**, not an encyclopedia — roughly 100 lines that serve as a map with pointers to deeper sources of truth in a structured `docs/` directory.

---

## §3 — Agent Sprawl: The New Technical Debt

### §3.1 The Numbers

| Metric | Value | Source |
|---|---|---|
| Average enterprise AI agents deployed | **12** | Salesforce 2026 Connectivity Benchmark |
| Projected by 2027 | **20** | Salesforce |
| Agents connected to the rest of the stack | **27%** | Salesforce |
| Shadow agents (unmonitored, ungoverned) | **73%** | Derived from above |
| Fortune 500 companies with active AI agents | **>80%** | Microsoft telemetry |
| Gartner position | Calling for **AI Agent Management Platforms** | Gartner 2026 |

> "We solved 'how to build agents' in 2025. The real engineering challenge of 2026 isn't building more agents — it's building the infrastructure that controls them." — Hector Flores, DEV.to

### §3.2 Why Sprawl Is Worse Than the Microservices Parallel

The historical parallel is precise but the stakes are higher:

- **Microservices sprawl (2015-2020)** → **Service mesh** → Contained blast radius
- **Agent sprawl (2025-2026)** → **Agent harness** → **Larger blast radius** because agents make autonomous decisions

Without centralized governance:
- Inconsistent safety policies
- Duplicated LLM spend
- Unmonitored tool access
- Compliance gaps no audit can catch retroactively
- Agents accumulating "technical debt faster than anyone wants to admit"

---

## §4 — The 2025 "Year of the Agent" Failure

### §4.1 Hype vs. Reality

The industry set 2025 expectations high — and the results were sobering:

| Finding | Source |
|---|---|
| **95%** of enterprise pilots saw **no measurable ROI** | MIT |
| **80-90%** of pilots **stalled** | Multiple reports |
| Agents delivering **incremental gains in narrow applications only** | Industry consensus |
| Most "agents" were **glorified chatbots or RPA with AI overlays** | Expert analysis |
| **Legacy systems, poor data quality, and integration bottlenecks** as primary blockers | Deloitte |

> "Agents failed to transform work in 2025." — VFuture Media

The root cause was not model intelligence but **harness immaturity**: agents lacked reliable execution environments, context management, validation loops, and safety boundaries.

### §4.2 Why They Failed: The Engineering Perspective

The failure modes mapped onto missing harness components:

1. **No validation loop** → errors compound across multi-step tasks
2. **No context management** → agents lose task state mid-execution
3. **No permission model** → unmonitored side effects
4. **No sandboxing** → safety failures cascade
5. **No observable trajectories** → debugging is impossible

> "Hallucinations and errors compounded in multi-step tasks." — Multiple sources

---

## §5 — Safety and Security Crises

### §5.1 Agents Can Escape Their Containers

| Finding | Detail | Source |
|---|---|---|
| Frontier LLM container escape rate | **15-35%** | SandboxEscapeBench |
| Zero-fork runtime overhead | **<5ms** with near-zero escape rate | PRISM (arXiv 2603.11853) |

> "Agent sandboxes must prevent malicious tool use while permitting legitimate system access — a harder problem than traditional application sandboxing because agents intentionally interact with sensitive resources." — Meng et al. Agent Harness Survey (110+ papers)

### §5.2 Prompt Injection Is Not Theoretical

- Indirect prompt injections can hijack tool-selection logic
- Agent-to-agent protocol layer (MCP/A2A) adds new attack surface
- No broadly adopted security-equivalent of SWE-bench exists for coding agent safety

### §5.3 The Compliance Gap

Without harness-level audit:
- Every agent action is a potential compliance violation
- Autonomous decisions cannot be retroactively governed
- "Shadow agents" create invisible liability

---

## §6 — The Harness Engineering Gap

### §6.1 The Field Is Underinvested

From the AHE paper (arXiv 2604.25850):

> "Harness engineering remains a manual craft, because automating it faces a heterogeneous action space across editable components, voluminous trajectories that bury actionable signal, and edits whose effect is hard to attribute."

The Li et al. survey (CMU/Amazon, 7 universities) confirms:

> "The harness is becoming the binding constraint."

### §6.2 The Priority Inversion

The AHE paper's ablation study ranks levers by impact:

| Rank | Lever | Typical investment | Actual impact |
|---|---|---|---|
| 1 | **Tools** — breadth + quality of tool set | Low | **Highest** |
| 2 | **Middleware** — arg validation, retry, error routing | Low | **Very high** |
| 3 | **Long-term memory** — persistent context | Medium | **High** |
| 4 | **System prompt** — instructions, persona | **Highest** | **Lower** |

> "Most harness-tuning effort goes into prompt engineering (position 4) while the highest-leverage levers — tool quality and middleware robustness — are neglected."

### §6.3 The Configuration Primitive

From the empirical study of 2,853 GitHub repos (arXiv 2602.14690):

| Pattern | Finding |
|---|---|
| Context files | Most prevalent; often the **only** mechanism used |
| Skills / subagents | **Rarely adopted**; when used, rely on static instructions not executable code |
| Advanced mechanisms (hooks, workflows, etc.) | **Low adoption** — most repos use only static context |

> "The field is still in a primitive configuration phase."

---

## §7 — The OpenAI Codex Experiment: What Broke

OpenAI's internal experiment (Aug 2025-Jan 2026): build a product with **0 lines of human-written code**.

### §7.1 What Worked
- 1M lines of code in ~5 months
- 1,500 PRs merged by 3 engineers (3.5 PRs/engineer/day)
- Product had hundreds of internal daily users

### §7.2 What Broke (Harness Problems)

1. **Environment underspecification** — the agent lacked tools, abstractions, and structure required for high-level goals
2. **Context management failure** — monolithic AGENTS.md failed; had to restructure
3. **Knowledge illegibility** — anything not in the repository (Slack threads, Google Docs, tacit knowledge) was invisible to agents
4. **Pattern replication** — Codex replicated suboptimal existing patterns ("AI slop")
5. **"20% Fridays"** — humans spent every Friday cleaning up agent-generated artifacts (didn't scale)

> "The fix was almost never 'try harder.'" — OpenAI Engineering

The lesson: **"Our most difficult challenges now center on designing environments, feedback loops, and control systems."**

---

## §8 — Where Harness Engineering Is Going

### §8.1 Open Problems (from Li et al. survey, CMU/Amazon, 7 universities)

1. **Hardening execution environments** — sandboxes that are both secure and capable
2. **Reliable state in long-running agents** — context management as state estimation
3. **Trace-native failure diagnosis** — traces as primary diagnostic object
4. **Standard handoffs across agents, tools, humans** — beyond text summaries
5. **Adaptive simplification** — harnesses that shed components as models improve

### §8.2 Open Problems (from Meng et al. survey, 110+ papers, 23 systems)

1. **Formal security models** — proving safety specifications
2. **Cross-harness portability** — same agent works across harnesses
3. **Protocol interoperability** — MCP + A2A + ACP integration
4. **Context economics at 1M+ tokens/task**
5. **Byzantine fault tolerance** in multi-agent systems
6. **Compositional verification** — proving emergent harness properties

### §8.3 The LangChain View

Open problems in harness engineering (LangChain DeepAgents team):
- Orchestrating **hundreds of agents** in parallel on a shared codebase
- Agents that **analyze their own traces** to identify harness-level failure modes
- **Just-in-time harness assembly** — dynamic tool/context configuration per task

---

## §9 — Numbers Summary (Quick Reference)

| Problem area | Key figure | Source |
|---|---|---|
| Harness change improves SWE-bench | 6.7% → 68.3% **(+61.6pp)** | Pi Research |
| Harness change improves HAL CORE-Bench | 42% → 78% **(+36pp)** | Li citing HAL |
| Harness evolution improves Terminal-Bench 2 | 69.7% → 77.0% | AHE paper |
| Search wasted agent time | **60%** | Morph (40+ harnesses) |
| Context degradation over 750K tokens | **-14 points** | Anthropic docs |
| Benchmark-human merge rate gap | **24.2pp**, widening 9.6pp/year | METR |
| Frontier model container escape rate | **15-35%** | SandboxEscapeBench |
| Enterprise agents deployed (avg) | **12** | Salesforce 2026 |
| Agents connected to stack | **27%** | Salesforce 2026 |
| Fortune 500 with active agents | **>80%** | Microsoft |
| Enterprise pilots with no ROI | **95%** | MIT |
| Pilot stall rate | **80-90%** | Multiple reports |
| Frontier model individual task success | **26.2%** (Sonnet), **8.6%** (GPT-4o) | SWE-Lancer |
| OpenAI Codex experiment | 1M lines, 0 hand-written, 1500 PRs | OpenAI Engineering |
| Context files as sole config mechanism | Most prevalent pattern | arXiv 2602.14690 (2,853 repos) |

---

## Open Items

| OI-ID | Type | Summary | Source anchor | Resolution path | Priority | Status | Owner | Due / Review date | Tracker ref |
|---|---|---|---|---|---|---|---|---|---|
| OI-0045 | execution-item | Merge relevant findings from this supplement into the main research synthesis document (§2 context crisis numbers, §3 agent sprawl data, §5 safety figures) | Cross-document | Determine whether to inline into main synthesis or keep as standalone supplement | medium | open | Victor Hueni | 2026-07-31 | _TBD_ |
| OI-0046 | decision-gap | Whether clew's harness design should target the "primitive configuration phase" finding — most users use only context files, not skills/subagents | §6.3 | Review whether clew should invest in skills/subagents or double down on context-file excellence | medium | open | Victor Hueni | 2026-08-31 | _TBD_ |

---

## Sources

1. Morph Blog — "Lessons from 40+ Coding Agent Harnesses: Context Is the Entire Game" (Tejas Bhakta, March 2026)
2. OpenAI Engineering — "Harness Engineering: Leveraging Codex in an Agent-First World" (Ryan Lopopolo, Feb 2026)
3. DEV.to — "Agent Harnesses: Why 2026 Isn't About More Agents — It's About Controlling Them" (Hector Flores, Feb/May 2026)
4. Meng et al. — "Agent Harness for Large Language Model Agents: A Survey" (arXiv, 110+ papers, 23 systems, Apr 2026)
5. Li et al. — "Agent Harness Engineering: A Survey" (CMU/Amazon/7 universities, May 2026) — ETCLOVG taxonomy
6. Lin et al. — "Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses" (arXiv 2604.25850, Apr-May 2026)
7. SandboxEscapeBench (arXiv 2603.02277, March 2026)
8. SWE-Lancer: "Can Frontier LLMs Earn $1 Million from Real-World Freelance Software Engineering?" (OpenAI, Feb 2025)
9. Salesforce 2026 Connectivity Benchmark (via CIODive)
10. Microsoft telemetry on Fortune 500 agent adoption
11. Gartner forecasts on AI Agent Management Platforms (via Parloa)
12. MIT enterprise pilot study (referenced in VFuture Media, Dec 2025)
13. Deloitte report on agent integration barriers
14. CIODive — "The Challenge for Software Engineers in 2026 — and Beyond" (Jan 2026)
15. VFuture Media — "Why AI Agents Failed to Transform Work in 2025" (Dec 2025)
16. DevOps.com — "AI Coding: Even the Best Models Struggle With Real-World Software Engineering" (Feb 2025)
17. LangChain DeepAgents documentation
18. Ning et al. — "Code as Agent Harness" (UIUC/Meta/Stanford, arXiv 2605.18747, 102-page survey, May 2026)

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-06-27 | Initial supplement compiled from web research across 18+ sources focused on problems/challenges agentic harnesses solve — context crisis, performance gap, agent sprawl, 2025 failure, safety, engineering gap, OpenAI Codex lessons, open problems. | Victor Hueni |
