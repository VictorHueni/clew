---
type: Research Note
title: Agentic Harness — Capabilities, Techniques, and Real Tool Ecosystem
description: Reference taxonomy of the agentic harness — fifteen functional domains grouped into capability zones, each decomposed into capabilities, techniques, and real tools ranked by adoption.
tags: [agentic-harness, discovery, capabilities, tooling]
timestamp: 2026-07-24T08:19:00Z
status: active
owner: Victor Hueni
last_reviewed: 2026-06-28
review_interval: 90d
---

# Agentic Harness: Capabilities, Techniques, and Real Tool Examples

This document organizes an agentic harness into clean levels, grounded in real tools and engineering flows.

```text
Level 1 = Functional domain
Level 2 = Capability / responsibility
Level 3 = Technique or implementation pattern
Level 4 = Concrete artifact or example
```

A good rule:

```text
Functional domain = what the agent needs.
Capability = what that domain must do.
Technique = how it can be implemented.
Artifact / example = one concrete instance.
```

---

## Capability Zones — the Agent Core and six functional groups

The fifteen domains cluster into **one hub plus six functional zones**. The **Agent Core** is the decision hub at the centre; the other fourteen domains group by *what they do for the core* — laid out as a compass: **sense** comes in from one side, **act** goes out the other, **knowledge** feeds from above, and **assurance** (verify + govern) grounds it from below.

```text
        +------------- KNOW -------------+   +-------- DIRECT --------+
        | Knowledge . Memory . Learning  |   | Goals . Planning       |
        +--------------------------------+   +------------------------+
+- PERCEIVE -+            [#]  AGENT CORE -- the model           +---- ACT ----+
| Sensors    |            reason . choose . run the loop         | Actuators   |
| Env. State |                                                   | Tools&Skills|
+------------+ +------------- VERIFY ----------+ +-- GOVERN --+  +-------------+
               | Controls . Observability      | | Safety     |
               +-------------------------------+ | Identity   |
                                                 | Human FB   |
                                                 +------------+
```

| Zone | Theme | Domains |
|---|---|---|
| **Agent Core** (hub) | reason · choose · run the loop | Agent Core (§1) |
| **① Perceive** | sense the world | Sensors / Perception (§4) · Environment State (§14) |
| **② Know** | acquire · retain · improve | Knowledge (§3) · Memory (§2) · Learning & Adaptation (§12) |
| **③ Direct** | intent & plan | Goals & Tasking (§8) · Planning & Decomposition (§9) |
| **④ Act** | change the world | Actuators / Actions (§5) · Tools & Skills (§15) |
| **⑤ Verify** | is the work correct? | Controls & Validation (§6) · Observability (§7) |
| **⑥ Govern** | safe & in-bounds | Safety & Governance (§13) · Identity & Access (§10) · Human Feedback (§11) |

These zones are a **static grouping** of the domains — the harness-anatomy view used in clew's slide deck — and are complementary to the dynamic [agent loop](#clean-top-level-agent-loop) defined further below (the zones say *what each capability is for*; the loop says *in what order they fire*). Each domain below is tagged with its zone; full definitions follow in §1–§15.

---

## 1. Agent Core

_Zone:_ **Agent Core** — the decision hub

**Definition:**
The decision-making center of the agent. It receives goals, reasons about state, chooses actions, calls tools, and manages the loop until the task is complete.

### Capabilities

#### 1.1 Reasoning

**Definition:**
Interprets the task, compares options, and decides what should happen next.

**Example:**
The agent sees a failing test and decides to inspect the implementation before editing.

#### 1.2 Planning

**Definition:**
Converts a high-level goal into ordered steps.

**Example:**
Reproduce the bug → inspect relevant files → patch the issue → run tests → summarize the change.

#### 1.3 Tool Selection

**Definition:**
Chooses the right available interface for the next action.

**Example:**
Use file search to locate a function, then use the terminal to run a targeted test.

#### 1.4 Execution Loop

**Definition:**
Repeats observe → decide → act → verify until the task is complete, blocked, or unsafe to continue.

**Example:**
Edit file → run test → read failure → patch again → test passes.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[AutoGen](https://github.com/microsoft/autogen)** | 59.3k | Multi-agent conversation framework for collaborating, tool-using agents |
| **[CrewAI](https://github.com/crewAIInc/crewAI)** | 54.5k | Role-based multi-agent “crews” with task delegation and process control |
| **[Agno](https://github.com/agno-agi/agno)** | 40.9k | Full-stack framework for multi-modal agents with memory, tools, reasoning |
| [LangGraph](https://github.com/langchain-ai/langgraph) | 35.9k | Graph-based stateful orchestration for cyclic, multi-step agent loops |
| [DSPy](https://github.com/stanfordnlp/dspy) | 35.5k | Programs (and optimizes) LM pipelines instead of hand-tuned prompts |
| [smolagents](https://github.com/huggingface/smolagents) | 28.1k | Minimal code-writing agent library (agents act by emitting Python) |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 27.5k | Lightweight agent loop with handoffs, guardrails, tracing |
| [Pydantic-AI](https://github.com/pydantic/pydantic-ai) | 18.0k | Type-safe agent framework with structured, validated outputs |

**Most popular:** AutoGen (59.3k), CrewAI (54.5k) and LangGraph (35.9k) are the most-used dedicated orchestration cores.


---

## 2. Memory

_Zone:_ **② Know** — acquire · retain · improve

**Definition:**
Memory is the harness domain responsible for carrying useful information across the agent's reasoning process, across tool calls, and sometimes across sessions.

Memory answers:

```text
What does the agent already know?
What has it learned during this run?
What should persist into future runs?
What context should be loaded now?
```

### Capabilities

#### 2.1 Context Window

**Definition:**
The current information loaded into the model at inference time.

This includes user task, system instructions, repo instructions, relevant files, tool results, summaries, errors, and previous messages.

**Example:**

```text
User task: Fix checkout bug.
Relevant files: checkout.ts, cart.test.ts.
Tool result: failing test output.
Repo instruction: use pnpm, not npm.
```

**Important distinction:**
Context is not memory by itself. It is the active workspace where memory, knowledge, tool results, and instructions become visible to the model.

#### 2.2 Working Memory

**Definition:**
Short-lived information the agent keeps active during the current task.

**Example:**

```text
The failing test is cart.test.ts.
The suspected bug is in calculateTotal().
The user asked for a minimal patch.
```

#### 2.3 Task State

**Definition:**
Structured record of where the agent is in the current workflow.

**Example:**

```yaml
status: investigating
current_step: reproduce_failure
files_read:
  - cart.test.ts
  - checkout.ts
tests_run:
  - pnpm test cart.test.ts
next_action: patch calculateTotal()
```

#### 2.4 Episodic Memory

**Definition:**
Memory of prior actions, observations, and attempts.

**Example:**

```text
The agent tried changing the serializer.
That fixed one test but broke the API response shape.
The agent reverted that change.
```

#### 2.5 Long-Term Memory

**Definition:**
Persistent information that survives across sessions or tasks.

**Example:**

```text
This repo uses pnpm.
Tests should be run from packages/web.
The team prefers small PRs.
Never edit generated files directly.
```

#### 2.6 Project Memory

**Definition:**
Persistent memory about a specific codebase or repository.

**Example:**

```text
Use pnpm.
Run pnpm test:unit before final response.
API routes live in apps/api/src/routes.
Do not modify schema.prisma without migration review.
```

#### 2.7 User Preference Memory

**Definition:**
Persistent memory about the user's working style, preferences, and recurring expectations.

**Example:**

```text
The user prefers small diffs.
The user wants direct explanations.
The user wants uncertainty stated explicitly.
```

#### 2.8 Team Convention Memory

**Definition:**
Persistent memory about how a team or organization prefers work to be done.

**Example:**

```text
All migrations require rollback scripts.
Every PR needs a test plan.
Security-sensitive changes require reviewer approval.
```

### Techniques

#### 2.9 Context Compression

**Definition:**
Reduces large context into a smaller representation while preserving important facts.

**Example:**

```text
Instead of keeping 20,000 lines of logs, store:
- failing command
- error message
- suspected source
- files already inspected
```

#### 2.10 Summarization Memory

**Definition:**
Stores compressed summaries of conversations, tool results, file contents, or previous attempts.

**Example:**

```text
Summary: Authentication fails because token expiry is parsed as seconds instead of milliseconds.
Files inspected: auth.ts, session.test.ts.
Next step: patch parseExpiry().
```

#### 2.11 Retrieval Memory

**Definition:**
Stores past information in a retrievable form, often using search indexes or embeddings.

**Example:**

```text
Search previous debugging notes for "tenant isolation bug".
Retrieve the most relevant memory chunk.
Inject it into current context.
```

#### 2.12 Memory Imports

**Definition:**
Composes memory from multiple files or sources instead of keeping everything in one large file.

**Example:**

```md
Read @README.md for project overview.
Read @package.json for available commands.
Read @docs/testing.md for test conventions.
Read @~/.claude/my-project-preferences.md for personal preferences.
```

#### 2.13 State Snapshots

**Definition:**
Captures the environment or agent state at a moment in time.

**Example:**

```text
Before editing:
- branch: feature/checkout-fix
- tests: failing cart.test.ts
- modified files: none

After editing:
- modified files: checkout.ts
- tests: cart.test.ts passing
```

### Concrete Artifacts

#### 2.14 `CLAUDE.md`

**Definition:**
A Claude Code memory file used to give Claude persistent project instructions and context.

**Example:**

```md
# Project instructions

- Use pnpm, not npm.
- Run pnpm test before final response.
- Do not edit generated files in src/generated.
- Prefer service-layer fixes over controller rewrites.
- Use small, targeted changes.
```

**What it is:**

```text
Persistent project memory
Instruction context
Repo-local guidance
```

**What it is not:**

```text
A hard permission system
A security boundary
A guaranteed policy enforcement layer
```

#### 2.15 `AGENTS.md`

**Definition:**
A repo-level instruction file used by some coding agents to understand project conventions, commands, and expectations.

**Example:**

```md
# Agent instructions

## Commands
- Install: pnpm install
- Test: pnpm test
- Typecheck: pnpm typecheck

## Rules
- Do not edit generated files.
- Add tests for behavior changes.
- Prefer minimal changes.
```

#### 2.16 `.cursor/rules`

**Definition:**
Cursor-specific rule files that provide project guidance to the agent/editor.

**Example:**

```text
Use server actions only in app/actions.
Use zod schemas for input validation.
Do not introduce new UI libraries without approval.
```

#### 2.17 Copilot Instructions

**Definition:**
GitHub Copilot-specific instructions for project-level guidance.

**Example:**

```text
This project uses Vitest.
Prefer React function components.
Use Tailwind utility classes.
```

#### 2.18 Claude Auto-Memory

**Definition:**
A product-specific mechanism where Claude Code can store useful project insights across sessions.

**Example:**

```text
Claude notices this repo always runs tests with pnpm.
Claude stores that as a memory for future sessions.
```

### Governance

#### 2.19 Memory Review

**Definition:**
A process for inspecting and approving what gets saved into memory.

**Example:**
The agent proposes adding "use pnpm" to project memory, and the user approves.

#### 2.20 Secret Exclusion

**Definition:**
Prevents credentials, tokens, private keys, or sensitive data from being stored.

**Example:**
Do not store API keys found in `.env`.

#### 2.21 Staleness Handling

**Definition:**
Detects and updates memory that may no longer be true.

**Example:**
A memory says "use Node 18," but `package.json` now requires Node 22.

#### 2.22 Trust Levels

**Definition:**
Assigns confidence or source quality to memory.

**Example:**

```text
High trust: user-confirmed instruction
Medium trust: inferred from repeated repo usage
Low trust: observed once during a failed run
```

#### 2.23 Forgetting / Cleanup

**Definition:**
Removes outdated, wrong, or unnecessary memory.

**Example:**
Delete a project instruction after the repo migrates from Jest to Vitest.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Mem0](https://github.com/mem0ai/mem0)** | 59.6k | Self-improving memory layer that extracts/stores facts across sessions |
| **[Cognee](https://github.com/topoteretes/cognee)** | 24.0k | Memory engine building knowledge graphs from agent interactions |
| **[Letta (ex-MemGPT)](https://github.com/letta-ai/letta)** | 23.5k | Stateful agents server with self-editing long-term + working memory |
| [txtai](https://github.com/neuml/txtai) | 12.7k | Embeddings database for semantic memory, search and retrieval |
| [Zep](https://github.com/getzep/zep) | 4.7k | Temporal knowledge-graph memory for chat history and user state |
| [Memary](https://github.com/kingjulio8238/Memary) | 2.6k | Open-source long-term (knowledge-graph) memory for autonomous agents |

**Most popular:** Mem0 (59.6k) is the clear leader of the dedicated agent-memory layer, with Cognee (24.0k) and Letta (23.5k) next.


---

## 3. Knowledge

_Zone:_ **② Know** — acquire · retain · improve

**Definition:**
External information the agent can consult to understand the world, codebase, APIs, frameworks, or organization.

### Capabilities

#### 3.1 Repository Knowledge

**Definition:**
Knowledge about the current codebase.

**Example:**
Folder structure, domain models, API routes, test conventions.

#### 3.2 Documentation Knowledge

**Definition:**
Access to written docs, manuals, READMEs, and API references.

**Example:**
Framework documentation, internal API docs, database schema docs.

#### 3.3 Dependency Knowledge

**Definition:**
Knowledge about libraries, package versions, framework behavior, and compatibility constraints.

**Example:**
The project uses Next.js App Router rather than Pages Router.

#### 3.4 Organizational Knowledge

**Definition:**
Internal conventions, standards, and policies.

**Example:**
Every migration must include a rollback script.

### Techniques

#### 3.5 Retrieval-Augmented Generation (RAG)

**Definition:**
Retrieves relevant documents and injects them into the agent context.

**Example:**
Search internal billing docs before changing webhook behavior.

#### 3.6 Codebase Indexing

**Definition:**
Builds searchable indexes over files, symbols, imports, definitions, and references.

**Example:**
Find every caller of `createSession()`.

#### 3.7 Semantic Search

**Definition:**
Searches by meaning rather than exact text.

**Example:**
Search "where do we validate subscription status?" even if no file contains that exact phrase.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[LangChain](https://github.com/langchain-ai/langchain)** | 140.3k | Broad RAG toolkit: loaders, splitters, retrievers, vector-store glue |
| **[RAGFlow](https://github.com/infiniflow/ragflow)** | 83.8k | Open RAG engine: deep document understanding + end-to-end retrieval pipeline |
| **[LlamaIndex](https://github.com/run-llama/llama_index)** | 50.5k | Data framework for indexing/retrieval — the canonical RAG ingestion+query layer |
| [Milvus](https://github.com/milvus-io/milvus) | 45.0k | Distributed, high-scale vector database for similarity search |
| [PageIndex](https://github.com/VectifyAI/PageIndex) | 33.5k | Vectorless, reasoning-based document index (hierarchical tree retrieval) |
| [Qdrant](https://github.com/qdrant/qdrant) | 32.7k | Rust vector database with rich filtering and hybrid search |
| [Chroma](https://github.com/chroma-core/chroma) | 28.6k | Developer-friendly embedded/serverable vector store for RAG |
| [Haystack](https://github.com/deepset-ai/haystack) | 25.8k | Production RAG/search pipelines and retrieval-augmented QA |
| [pgvector](https://github.com/pgvector/pgvector) | 22.0k | Postgres extension adding vector similarity search to an existing DB |
| [Weaviate](https://github.com/weaviate/weaviate) | 16.4k | Vector database with built-in hybrid search and module ecosystem |
| [txtai](https://github.com/neuml/txtai) | 12.7k | All-in-one embeddings database for semantic search and RAG |

**Most popular:** Among *specialised* retrieval tools, RAGFlow (83.8k) leads the open RAG-engine tier, Milvus (45.0k) is the top pure vector store, PageIndex (33.5k) the reasoning-based/vectorless indexer, and Chroma (28.6k) the popular embedded vector DB. LangChain and LlamaIndex are multi-capability frameworks — tracked under [§1 Agent Core](#1-agent-core).


---

## 4. Sensors / Perception

_Zone:_ **① Perceive** — sense the world

**Definition:**
The channels through which the agent observes the environment.

### Capabilities

#### 4.1 File Perception

**Definition:**
Reads files and understands their contents.

**Example:**
Inspect `package.json`, source files, config files, and tests.

#### 4.2 Runtime Perception

**Definition:**
Observes the result of executed commands.

**Example:**
Read stack traces, test output, and build failures.

#### 4.3 Browser Perception

**Definition:**
Observes a running user interface.

**Example:**
Open localhost, inspect page state, capture screenshots.

#### 4.4 System Perception

**Definition:**
Observes operating system, environment, dependencies, and process state.

**Example:**
Check Node version, installed packages, open ports, running services.

#### 4.5 Telemetry Perception

**Definition:**
Reads logs, traces, metrics, or monitoring output.

**Example:**
Inspect production error logs for a failed request path.

### Techniques

#### 4.6 Static Inspection

**Definition:**
Observes code without running it.

**Example:**
Read imports, type definitions, and control flow.

#### 4.7 Dynamic Inspection

**Definition:**
Observes behavior by executing code.

**Example:**
Run a failing test to see the actual error.

#### 4.8 Visual Inspection

**Definition:**
Observes rendered UI output.

**Example:**
Compare a screenshot before and after a CSS change.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[browser-use](https://github.com/browser-use/browser-use)** | 101.0k | Drives a real browser from LLM instructions; makes the web agent-accessible |
| **[Puppeteer](https://github.com/puppeteer/puppeteer)** | 95.3k | Headless Chrome/Firefox automation over DevTools; DOM + screenshots |
| **[Playwright](https://github.com/microsoft/playwright)** | 91.8k | Cross-browser observation (accessibility tree, DOM, screenshots) — the dominant browser sensor |
| [Playwright-MCP](https://github.com/microsoft/playwright-mcp) | 34.4k | MCP server exposing Playwright accessibility snapshots as agent-native perception |
| [Selenium](https://github.com/SeleniumHQ/selenium) | 34.2k | Long-standing WebDriver browser automation/observation framework |
| [tree-sitter](https://github.com/tree-sitter/tree-sitter) | 26.0k | Incremental parser → concrete syntax trees: how agents “see” code structure |
| [Stagehand](https://github.com/browserbase/stagehand) | 23.3k | AI-first browser framework adding natural-language act/observe/extract on Playwright |
| [chromedp](https://github.com/chromedp/chromedp) | 13.1k | Go driver for headless Chrome DevTools — browser observation, no external deps |
| [Language Server Protocol (LSP)](https://github.com/microsoft/language-server-protocol) | — (spec ~12.9k) | Industry-standard IDE protocol for code symbols/diagnostics/hover — how agents perceive code semantics |

**Most popular:** browser-use (101.0k) leads; Puppeteer (95.3k) and Playwright (91.8k) are the entrenched browser-perception engines. LSP + tree-sitter are the standard *code*-perception layer.


---

## 5. Actuators / Actions

_Zone:_ **④ Act** — change the world

**Definition:**
The ways the agent can change the environment.

### Capabilities

#### 5.1 File Editing

**Definition:**
Modifies source code, tests, docs, or config files.

**Example:**
Patch `auth.ts` to fix token expiration.

#### 5.2 Command Execution

**Definition:**
Runs shell commands.

**Example:**
Run `pnpm test`, `npm install`, or `docker compose up`.

#### 5.3 Git Actions

**Definition:**
Creates branches, commits, diffs, or pull requests.

**Example:**
Create a branch and commit the fix with a generated message.

#### 5.4 API Actions

**Definition:**
Calls external or internal APIs.

**Example:**
Create a Jira ticket or update a GitHub issue.

#### 5.5 UI Actions

**Definition:**
Interacts with a user interface.

**Example:**
Click through a browser flow using Playwright.

### Techniques

#### 5.6 Patch-Based Editing

**Definition:**
Applies precise diffs instead of rewriting whole files.

**Example:**
Replace one function body without touching unrelated code.

#### 5.7 Command Sandboxing

**Definition:**
Runs commands inside controlled permissions.

**Example:**
Allow tests, but require approval before deleting files.

#### 5.8 Transactional Action

**Definition:**
Performs changes in reversible units.

**Example:**
Edit → test → revert if validation fails.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Open Interpreter](https://github.com/OpenInterpreter/open-interpreter)** | 64.1k | Lets LLMs run code locally — natural-language code-execution actuator |
| **[Aider](https://github.com/Aider-AI/aider)** | 47.0k | AI pair-programmer — edits files, runs tests/commands, commits (code-edit actuator) |
| **[GitHub CLI](https://github.com/cli/cli)** | 45.0k | `gh` — scriptable git/VCS actions (PRs, issues, repos, releases) |
| [E2B](https://github.com/e2b-dev/E2B) | 12.8k | Secure cloud sandboxes (SDK) for executing AI-generated code |
| [Octokit](https://github.com/octokit/octokit.js) | 7.8k | Official GitHub API SDK — programmatic git/repo/PR actuation |
| [microsandbox](https://github.com/microsandbox/microsandbox) | 6.7k | Self-hosted microVM sandbox for running untrusted AI-generated code |
| [GitHub Actions Runner](https://github.com/actions/runner) | 6.1k | Executes CI workflows — agent-triggered build/test/deploy |
| [GitPython](https://github.com/gitpython-developers/GitPython) | 5.1k | Python library for programmatic git actions (commit, branch, diff) |
| Modal | — (SaaS) | Serverless compute/sandbox for running code & GPU jobs (closed-source) |

**Most popular:** Open Interpreter (64.1k) leads code-execution actuation and Aider (47.0k) code-editing actuation; GitHub CLI (45.0k) dominates git-action tooling. Daytona is sandbox *infrastructure* — tracked under [§13 Safety & Governance](#13-safety--governance).


---

## 6. Controls & Validation

_Zone:_ **⑤ Verify** — is the work correct?

**Definition:**
Mechanisms that determine whether the agent's work is correct, safe, and complete.

### Capabilities

#### 6.1 Unit Validation

**Definition:**
Checks isolated functions or modules.

**Example:**
Run `auth.test.ts`.

#### 6.2 Integration Validation

**Definition:**
Checks multiple components working together.

**Example:**
Test login flow from API to database.

#### 6.3 Type Validation

**Definition:**
Checks static types.

**Example:**
Run `tsc --noEmit`.

#### 6.4 Style Validation

**Definition:**
Checks formatting and lint rules.

**Example:**
Run ESLint and Prettier.

#### 6.5 Build Validation

**Definition:**
Confirms the project compiles or packages successfully.

**Example:**
Run `pnpm build`.

#### 6.6 Behavioral Validation

**Definition:**
Confirms visible behavior matches the goal.

**Example:**
Browser test confirms the checkout button works.

### Techniques

#### 6.7 Test-First Validation

**Definition:**
Reproduces the failure before editing.

**Example:**
Run the failing test before changing code.

#### 6.8 Regression Testing

**Definition:**
Checks that old behavior still works.

**Example:**
Run the full auth test suite after a login fix.

#### 6.9 Golden Test / Snapshot Test

**Definition:**
Compares output to an approved expected output.

**Example:**
UI snapshot for a component.

#### 6.10 Eval Harness

**Definition:**
Reusable evaluation suite for agent outputs.

**Example:**
Score code changes across benchmark tasks.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Playwright](https://github.com/microsoft/playwright)** | 91.8k | Cross-browser E2E automation; backbone for agent UI/web-action testing |
| **[Promptfoo](https://github.com/promptfoo/promptfoo)** | 22.7k | Declarative prompt/LLM/agent eval + red-teaming with assertions and CI gating |
| **[OpenAI Evals](https://github.com/openai/evals)** | 18.8k | Framework + registry for benchmarking LLM behaviour against eval suites |
| [Vitest](https://github.com/vitest-dev/vitest) | 16.8k | Fast Vite-native JS/TS unit + integration test runner |
| [DeepEval](https://github.com/confident-ai/deepeval) | 16.5k | “Pytest for LLMs” — metric-based unit tests (G-Eval, hallucination, RAG) |
| [Ragas](https://github.com/explodinggradients/ragas) | 14.6k | RAG/agent eval metrics (faithfulness, answer/context relevance) |
| [Pytest](https://github.com/pytest-dev/pytest) | 14.3k | De-facto Python test framework; harness for tool/code validation |
| [Giskard](https://github.com/Giskard-AI/giskard) | 5.5k | Automated testing + vulnerability scanning for ML/LLM systems |
| [Inspect](https://github.com/UKGovernmentBEIS/inspect_ai) | 2.3k | UK AISI framework for rigorous LLM evals (datasets, solvers, scorers) |

**Most popular:** Playwright (91.8k) leads overall; Promptfoo (22.7k) and OpenAI Evals (18.8k) lead LLM/agent-specific evaluation.


---

## 7. Observability

_Zone:_ **⑤ Verify** — is the work correct?

**Definition:**
The ability to inspect what the agent did, why it did it at a high level, and what happened.

### Capabilities

#### 7.1 Tool Trace Visibility

**Definition:**
Records tool calls and their results.

**Example:**
Read file X, edited file Y, ran command Z.

#### 7.2 Decision Trace Visibility

**Definition:**
Records high-level decisions without exposing private reasoning.

**Example:**
Chose to patch the parser because the failing test showed malformed dates.

#### 7.3 Runtime Logs

**Definition:**
Captures logs from commands, applications, or services.

**Example:**
Server logs during a Playwright test.

#### 7.4 Metrics

**Definition:**
Quantitative measures of the run.

**Example:**
Number of edits, tests run, failures, retries, and duration.

#### 7.5 Final Report

**Definition:**
Human-readable summary of outcome.

**Example:**
Changed two files, added one test, all auth tests pass.

### Techniques

#### 7.6 Structured Logging

**Definition:**
Logs actions in machine-readable form.

**Example:**
A JSON event for each tool call.

#### 7.7 Trace Replay

**Definition:**
Reconstructs the agent's path after completion.

**Example:**
Replay the sequence of file reads, edits, and tests.

#### 7.8 Diff Audit

**Definition:**
Inspects final changes before completion.

**Example:**
Review `git diff` before summarizing.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[LangFuse](https://github.com/langfuse/langfuse)** | 29.9k | OSS LLM-engineering platform: tracing, evals, prompt mgmt, cost/metrics |
| **[Opik](https://github.com/comet-ml/opik)** | 20.0k | LLM/agent tracing, evaluation, and production monitoring (Comet) |
| **[Arize Phoenix](https://github.com/Arize-ai/phoenix)** | 10.3k | OSS observability for tracing, eval and debugging of LLM/agent apps |
| [Evidently](https://github.com/evidentlyai/evidently) | 7.6k | ML + LLM monitoring, eval reports, drift/quality dashboards |
| [OpenLLMetry](https://github.com/traceloop/openllmetry) | 7.2k | OpenTelemetry-based instrumentation for LLM apps (vendor-neutral) |
| [Helicone](https://github.com/Helicone/helicone) | 5.9k | Proxy-based LLM logging: cost, latency, usage observability |
| [OpenLIT](https://github.com/openlit/openlit) | 2.6k | OTel-native GenAI observability, cost tracking, evals |
| [Langtrace](https://github.com/Scale3-Labs/langtrace) | 1.2k | Open-source, OTel-compatible LLM/agent tracing and metrics |
| [Weave](https://github.com/wandb/weave) | 1.1k | W&B’s LLM app tracing + evaluation toolkit |
| LangSmith | — (SaaS) | LangChain’s commercial LLMOps tracing/eval platform (default for LangChain users) |

**Most popular:** LangFuse (29.9k) is the leading open-source LLM-observability platform, with Opik (20.0k) and Arize Phoenix (10.3k) next.


---

## 8. Goals & Tasking

_Zone:_ **③ Direct** — intent & plan

**Definition:**
The mechanism that defines what the agent is trying to accomplish.

### Capabilities

#### 8.1 Intent Capture

**Definition:**
Understands the user's actual goal.

**Example:**
"Fix login bug" means restore successful authentication, not rewrite the whole auth system.

#### 8.2 Success Criteria

**Definition:**
Defines how completion will be judged.

**Example:**
The login test passes and the UI shows the dashboard.

#### 8.3 Constraint Handling

**Definition:**
Respects boundaries and requirements.

**Example:**
Do not change the database schema.

#### 8.4 Priority Handling

**Definition:**
Chooses what matters most when tradeoffs exist.

**Example:**
Prefer minimal patch over large refactor.

#### 8.5 Scope Control

**Definition:**
Prevents unnecessary work.

**Example:**
Fix the failing endpoint without redesigning all authentication.

### Techniques

#### 8.6 Task Contract

**Definition:**
Explicit statement of goal, constraints, and done criteria.

**Example:**
Done = test passes, no public API change.

#### 8.7 Clarification Gate

**Definition:**
Asks or escalates only when required.

**Example:**
Ask before deleting data or changing architecture.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[DSPy](https://github.com/stanfordnlp/dspy)** | 35.5k | Declarative, typed LM pipelines (signatures) instead of hand-tuned prompts |
| **[SGLang](https://github.com/sgl-project/sglang)** | 29.7k | Fast serving runtime with structured/constrained, grammar-based decoding |
| **[Guidance](https://github.com/guidance-ai/guidance)** | 21.5k | Constrained generation enforcing grammars, regex and typed templates |
| [Pydantic-AI](https://github.com/pydantic/pydantic-ai) | 18.0k | Pydantic-model-typed, validated structured LLM I/O |
| [Outlines](https://github.com/dottxt-ai/outlines) | 14.2k | Structured generation enforcing JSON Schema / regex / grammars at decode time |
| [Instructor](https://github.com/jxnl/instructor) | 13.3k | Patches LLM clients to return validated Pydantic models with auto-retries |
| [BAML](https://github.com/BoundaryML/baml) | 8.4k | DSL + codegen for typed LLM functions with schema-aligned parsing/tests |
| [Marvin](https://github.com/PrefectHQ/marvin) | 6.2k | Pydantic toolkit turning functions/types into structured AI tasks |
| OpenAI Structured Outputs | — (API) | Native JSON-Schema-constrained responses; the de-facto baseline SDKs build on |

**Most popular:** SGLang (29.7k), Guidance (21.5k) and Outlines (14.3k) are the constrained-decoding / structured-output workhorses. DSPy's home is [§12 Learning & Adaptation](#12-learning--adaptation).


---

## 9. Planning & Decomposition

_Zone:_ **③ Direct** — intent & plan

**Definition:**
The process of breaking a task into manageable steps and dependencies.

### Capabilities

#### 9.1 Task Decomposition

**Definition:**
Splits a goal into smaller work items.

**Example:**
Reproduce bug → locate cause → patch → test.

#### 9.2 Sequencing

**Definition:**
Orders steps correctly.

**Example:**
Inspect tests before editing implementation.

#### 9.3 Dependency Mapping

**Definition:**
Identifies what depends on what.

**Example:**
API route depends on service layer and schema validation.

#### 9.4 Retry Strategy

**Definition:**
Decides what to do after failure.

**Example:**
If the unit test still fails, inspect the mocked dependency.

#### 9.5 Stopping Criteria

**Definition:**
Knows when to stop.

**Example:**
Stop after tests pass and the diff is reviewed.

### Techniques

#### 9.6 Plan-and-Execute

**Definition:**
Create a plan first, then execute step by step.

**Example:**
A five-step bug-fix plan.

#### 9.7 ReAct Loop

**Definition:**
Alternate reasoning and action based on observations.

**Example:**
Read error → inspect file → edit → run test.

#### 9.8 Task Graph

**Definition:**
Represents subtasks as nodes and dependencies as edges.

**Example:**
Schema fix must happen before API test.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[LangChain](https://github.com/langchain-ai/langchain)** | 140.3k | Foundational chaining of LLM calls, tools and decomposition logic |
| **[MetaGPT](https://github.com/geekan/MetaGPT)** | 69.1k | Multi-agent SOP roles (PM/architect/engineer) decomposing software tasks |
| **[AutoGen](https://github.com/microsoft/autogen)** | 59.3k | Conversational multi-agent orchestration and group-chat task solving |
| [CrewAI](https://github.com/crewAIInc/crewAI) | 54.5k | Role-based orchestration with sequential/hierarchical task graphs |
| [LlamaIndex](https://github.com/run-llama/llama_index) | 50.5k | Event-driven agent workflows and task-graph orchestration |
| [Agno](https://github.com/agno-agi/agno) | 40.9k | High-performance multi-agent teams and reasoning workflows |
| [LangGraph](https://github.com/langchain-ai/langgraph) | 35.9k | Agents as nodes/edges with controllable loops and state |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | 28.2k | Planners decomposing goals into orchestrated tool/skill steps |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 27.5k | Handoffs, guardrails and multi-agent routing |
| [OpenAI Swarm](https://github.com/openai/swarm) | 21.7k | Lightweight experimental multi-agent handoff/routing pattern |

**Most popular:** Planning is mostly *framework*-delivered. Among planning-specific tools, BabyAGI (22.3k) is the classic task-decomposition loop, with Plandex (15.5k) and Tree-of-Thoughts (6.0k). The multi-agent frameworks (LangChain, AutoGen, MetaGPT, CrewAI, LangGraph) span many domains — tracked under [§1 Agent Core](#1-agent-core).


---

## 10. Identity & Access

_Zone:_ **⑥ Govern** — safe & in-bounds

**Definition:**
The system that controls who or what the agent is allowed to act as.

### Capabilities

#### 10.1 Authentication

**Definition:**
Proves the agent has access.

**Example:**
GitHub token, cloud credential, database credential.

#### 10.2 Authorization

**Definition:**
Defines what the agent may do.

**Example:**
Read issues but not merge pull requests.

#### 10.3 Role Separation

**Definition:**
Uses different permissions for different tasks.

**Example:**
Read-only docs agent vs deployment agent.

#### 10.4 Secret Handling

**Definition:**
Prevents exposing or misusing credentials.

**Example:**
Redact API keys from logs.

### Techniques

#### 10.5 Least Privilege

**Definition:**
Give only the permissions needed for the task.

**Example:**
Allow repo read/write but block production database access.

#### 10.6 Scoped Tokens

**Definition:**
Credentials limited by operation or resource.

**Example:**
Token can create pull requests but cannot delete repositories.

#### 10.7 Approval Escalation

**Definition:**
Require human approval for sensitive operations.

**Example:**
Ask before deploying to production.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[HashiCorp Vault](https://github.com/hashicorp/vault)** | 35.8k | Secrets management & dynamic credentials; standard secret store for agent runtimes |
| **[Keycloak](https://github.com/keycloak/keycloak)** | 35.3k | OSS IAM / OIDC / OAuth2 provider for authenticating agents and services |
| **[Infisical](https://github.com/Infisical/infisical)** | 27.5k | OSS secrets platform with SDK/CLI injection for apps and agents |
| [Teleport](https://github.com/gravitational/teleport) | 20.5k | Identity-aware access proxy (SSH/k8s/DB) with short-lived certs |
| [Casbin](https://github.com/casbin/casbin) | 20.2k | Embeddable authorization library (ACL/RBAC/ABAC) across many languages |
| [Ory Hydra](https://github.com/ory/hydra) | 17.4k | Certified OAuth2 / OIDC server issuing tokens to clients and agents |
| [Ory Kratos](https://github.com/ory/kratos) | 13.7k | Headless identity, login and credential-management API |
| [Permify](https://github.com/Permify/permify) | 5.9k | Zanzibar-style fine-grained authorization-as-a-service (ReBAC) |
| [OpenFGA](https://github.com/openfga/openfga) | 5.4k | CNCF Zanzibar-inspired relationship-based authz; scopes agent permissions |
| [Cerbos](https://github.com/cerbos/cerbos) | 4.5k | Stateless policy-decision-point for context-aware RBAC/ABAC |
| [Oso](https://github.com/osohq/oso) | 3.5k | Polar policy library for app- and agent-level access rules |
| [SPIFFE/SPIRE](https://github.com/spiffe/spire) | 2.4k | Workload identity (SVIDs/mTLS) issuing cryptographic identities to agents |

**Most popular:** HashiCorp Vault (35.8k) leads on secrets; OpenFGA (5.4k) is the most-starred purpose-built fine-grained agent-authz engine.


---

## 11. Human Feedback

_Zone:_ **⑥ Govern** — safe & in-bounds

**Definition:**
The interface through which humans guide, correct, approve, or stop the agent.

### Capabilities

#### 11.1 Review

**Definition:**
Human inspects proposed work.

**Example:**
Review final diff before merge.

#### 11.2 Approval

**Definition:**
Human authorizes a sensitive action.

**Example:**
Approve dependency installation.

#### 11.3 Clarification

**Definition:**
Human resolves ambiguity.

**Example:**
Should this support legacy users?

#### 11.4 Correction

**Definition:**
Human redirects the agent after a mistake.

**Example:**
Do not edit the API contract; fix the caller.

#### 11.5 Handoff

**Definition:**
Agent returns control to a human.

**Example:**
The database migration needs manual review.

### Techniques

#### 11.6 Human-in-the-Loop Gate

**Definition:**
Pauses before risky or irreversible actions.

**Example:**
Approval required before production deploy.

#### 11.7 Reviewable Artifact

**Definition:**
Agent produces something easy to inspect.

**Example:**
Pull request, patch, summary, screenshot, or test report.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Streamlit](https://github.com/streamlit/streamlit)** | 45.1k | Python framework for building human review/approval UIs fast |
| **[Gradio](https://github.com/gradio-app/gradio)** | 43.0k | UI library with built-in feedback, flagging and chat-review widgets |
| **[LangGraph](https://github.com/langchain-ai/langgraph)** | 35.9k | `interrupt()` — native human-in-the-loop approval/edit gate for agents |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | 35.6k | React framework for in-app copilots with HITL/approval surfaces |
| [Reflex](https://github.com/reflex-dev/reflex) | 28.6k | Pure-Python full-stack framework for agent review/control panels |
| [Chainlit](https://github.com/Chainlit/chainlit) | 12.3k | Conversational-AI UI with feedback collection and human handoff |
| [HumanLayer](https://github.com/humanlayer/humanlayer) | 11.1k | API/SDK adding human approval gates (Slack/email) to agent tool calls |
| [Panel](https://github.com/holoviz/panel) | 5.7k | Python dashboarding framework for review/monitoring interfaces |

**Most popular:** Streamlit (45.1k) and Gradio (43.0k) dominate review-UI building; Chainlit (12.3k) is the popular conversational HITL UI and HumanLayer (11.1k) the purpose-built approval API. LangGraph's approval gates live in the framework — tracked under [§1 Agent Core](#1-agent-core).


---

## 12. Learning & Adaptation

_Zone:_ **② Know** — acquire · retain · improve

**Definition:**
The ability of the system to improve future behavior from feedback, outcomes, or patterns.

### Capabilities

#### 12.1 Preference Adaptation

**Definition:**
Learns user or team preferences.

**Example:**
Prefer small pull requests with tests.

#### 12.2 Error Adaptation

**Definition:**
Avoids repeating known mistakes.

**Example:**
Do not run the full integration suite before starting Docker.

#### 12.3 Workflow Adaptation

**Definition:**
Improves process based on repeated outcomes.

**Example:**
Always run typecheck after editing generated types.

#### 12.4 Heuristic Improvement

**Definition:**
Updates practical rules of thumb.

**Example:**
When auth tests fail, inspect middleware first.

### Techniques

#### 12.5 Feedback Logging

**Definition:**
Stores corrections and review comments.

**Example:**
Reviewer said this project avoids mocks.

#### 12.6 Prompt / Config Refinement

**Definition:**
Updates instructions based on repeated feedback.

**Example:**
Add a rule to `AGENTS.md`.

#### 12.7 Eval-Driven Improvement

**Definition:**
Uses measurable results to tune behavior.

**Example:**
Compare success rate before and after a new planning rule.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[DSPy](https://github.com/stanfordnlp/dspy)** | 35.5k | Compiles/optimizes prompts + weights via teleprompters (eval-driven) |
| **[Optuna](https://github.com/optuna/optuna)** | 14.4k | Hyperparameter/program optimization used in eval-driven tuning |
| **[TextGrad](https://github.com/zou-group/textgrad)** | 3.6k | Optimizes prompts/solutions via natural-language "textual gradients" (feedback-driven adaptation) |
| [Weights & Biases](https://github.com/wandb/wandb) | 11.1k | Experiment tracking + sweeps powering eval-driven improvement |
| [ell](https://github.com/MadcowD/ell) | 5.9k | LM programming with prompt versioning/optimization first-class |
| [AdalFlow](https://github.com/SylphAI-Inc/AdalFlow) | 4.2k | Auto-optimizes prompts/pipelines (text-grad style) |
| [TextGrad](https://github.com/zou-group/textgrad) | 3.6k | “Textual gradients” — backprops NL feedback to optimize prompts |
| [Prompty](https://github.com/microsoft/prompty) | 1.2k | Spec + tooling for observable, iterable prompt assets |
| [OPRO](https://github.com/google-deepmind/opro) | 0.8k | “LLMs as Optimizers” — reference impl of prompt optimization research |

**Most popular:** DSPy (35.5k) is the dominant framework for eval-driven prompt/program optimization, with Optuna (14.4k) for tuning and TextGrad (3.6k) for textual-gradient optimization. Promptfoo is an eval/red-team tool — tracked under [§6 Controls & Validation](#6-controls--validation).


---

## 13. Safety & Governance

_Zone:_ **⑥ Govern** — safe & in-bounds

**Definition:**
Rules, permissions, and boundaries that keep the agent safe, controlled, and compliant.

### Capabilities

#### 13.1 Permission Control

**Definition:**
Defines what the agent can and cannot do.

**Example:**
Can edit repo files, cannot access the user's home directory.

#### 13.2 Sandbox Isolation

**Definition:**
Contains actions inside a safe environment.

**Example:**
Run commands inside a workspace container.

#### 13.3 Network Control

**Definition:**
Restricts external access.

**Example:**
Block internet except approved package registry.

#### 13.4 Destructive Action Control

**Definition:**
Prevents irreversible changes without approval.

**Example:**
Require confirmation before deleting files.

#### 13.5 Policy Enforcement

**Definition:**
Applies organizational, security, or legal rules.

**Example:**
Do not send source code to unapproved external services.

### Techniques

#### 13.6 Allowlist / Denylist

**Definition:**
Explicitly permits or blocks commands, paths, or tools.

**Example:**
Allow `pnpm test`; block `rm -rf`.

#### 13.7 Approval Policy

**Definition:**
Defines which actions need human approval.

**Example:**
Ask before installing packages.

#### 13.8 Runtime Sandbox

**Definition:**
Technical boundary around execution.

**Example:**
Container, VM, restricted filesystem, or restricted network.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Daytona](https://github.com/daytonaio/daytona)** | 72.4k | Secure, elastic sandboxes/infrastructure for running AI-generated code |
| **[Firecracker](https://github.com/firecracker-microvm/firecracker)** | 35.2k | MicroVM for secure, fast sandbox isolation of untrusted agent/code execution |
| [gVisor](https://github.com/google/gvisor) | 18.6k | Application-kernel sandbox: strong container isolation for untrusted workloads |
| **[E2B](https://github.com/e2b-dev/E2B)** | 12.8k | Firecracker-based cloud sandboxes for running agent-generated code safely |
| [Presidio](https://github.com/microsoft/presidio) | 9.7k | PII detection/anonymization — data-governance guardrail for agent I/O |
| [garak](https://github.com/NVIDIA/garak) | 8.2k | LLM vulnerability scanner / red-team probes (injection, jailbreak, leakage) |
| [Guardrails AI](https://github.com/guardrails-ai/guardrails) | 7.1k | Input/output validation framework with a hub of LLM/agent validators |
| [NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) | 6.6k | Programmable rails (Colang) for topical/safety/dialog control |
| [PurpleLlama (Llama Guard · LlamaFirewall)](https://github.com/meta-llama/PurpleLlama) | 4.2k | Meta trust-and-safety suite: Llama Guard classifier + LlamaFirewall agent guardrails |
| [LLM Guard](https://github.com/protectai/llm-guard) | 3.1k | Scans prompts/outputs for injection, toxicity, secrets and PII |
| [Rebuff](https://github.com/protectai/rebuff) | 1.5k | Self-hardening prompt-injection detector (heuristics + canary tokens) |
| Lakera Guard | — (SaaS) | Commercial real-time prompt-injection/PII firewall API |

**Most popular:** Daytona (72.4k) and Firecracker (35.2k) lead sandbox isolation, with E2B (13.0k) the LLM-native sandbox; among LLM-specific guardrails, garak (8.2k) and Guardrails AI (7.1k) are most-starred.


---

## 14. Environment State

_Zone:_ **① Perceive** — sense the world

**Definition:**
The current condition of the world the agent is operating in.

### Capabilities

#### 14.1 Repository State

**Definition:**
Current files, branch, diff, and project layout.

**Example:**
`git status` shows three modified files.

#### 14.2 Runtime State

**Definition:**
Current running services and processes.

**Example:**
Local server is running on port 3000.

#### 14.3 Dependency State

**Definition:**
Installed packages and versions.

**Example:**
React version is 19 and TypeScript version is 5.8.

#### 14.4 Test State

**Definition:**
Current validation result.

**Example:**
Unit tests pass, E2E tests fail.

#### 14.5 Context State

**Definition:**
What the agent currently knows and has already inspected.

**Example:**
The agent has read the controller but not the model.

### Techniques

#### 14.6 State Snapshot

**Definition:**
Captures the environment at a moment in time.

**Example:**
Save `git status`, test result, and active branch.

#### 14.7 State Diffing

**Definition:**
Compares before and after states.

**Example:**
Check which files changed after the agent acted.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[Docker (moby)](https://github.com/moby/moby)** | 71.8k | Container engine — reproducible runtime/environment state |
| **[Git](https://github.com/git/git)** | 61.7k | Distributed VCS — canonical repo/source state and history |
| **[Docker Compose](https://github.com/docker/compose)** | 37.6k | Declarative multi-container environment definition and state |
| [Podman](https://github.com/containers/podman) | 32.1k | Daemonless OCI container/runtime state engine (Docker-compatible) |
| [Nixpkgs](https://github.com/NixOS/nixpkgs) | 25.2k | Nix package set — reproducible dependency/environment state |
| [Renovate](https://github.com/renovatebot/renovate) | 21.9k | Automated dependency-state tracking and update PRs |
| [Nix](https://github.com/NixOS/nix) | 17.2k | Purely-functional package manager — fully reproducible build state |
| [Dagger](https://github.com/dagger/dagger) | 16.0k | Programmable CI/build engine modelling pipeline/environment state as code |
| [BuildKit](https://github.com/moby/buildkit) | 10.1k | Modern image-build engine underpinning reproducible build state |
| [Testcontainers](https://github.com/testcontainers/testcontainers-java) | 8.7k | Throwaway containerised dependencies for tests — ephemeral runtime state |

**Most popular:** Docker/moby (71.8k) and Git (61.7k) are the foundational runtime- and repo-state primitives; Docker Compose (37.6k) is standard for multi-service env state.


---

## 15. Tools & Skills

_Zone:_ **④ Act** — change the world

**Definition:**
The concrete interfaces and specialized abilities the agent can use to operate.

### Capabilities

#### 15.1 Code Tools

**Definition:**
Tools for reading, editing, searching, and understanding code.

**Example:**
File search, symbol lookup, patch editor.

#### 15.2 Shell Tools

**Definition:**
Tools for command-line execution.

**Example:**
Run tests, install packages, start services.

#### 15.3 Browser Tools

**Definition:**
Tools for observing and interacting with web UIs.

**Example:**
Playwright, screenshots, DOM inspection.

#### 15.4 External Tools

**Definition:**
Tools connected to outside systems.

**Example:**
GitHub, Jira, Slack, database, cloud APIs.

#### 15.5 Specialized Skills

**Definition:**
Reusable domain-specific procedures.

**Example:**
Write migration safely, review security risks, generate tests.

### Techniques

#### 15.6 MCP Server

**Definition:**
Standard interface exposing external tools and data to the agent.

**Example:**
GitHub MCP server exposing issues and pull requests.

#### 15.7 Tool Schema

**Definition:**
Structured definition of a tool's inputs and outputs.

**Example:**

```text
run_command(command, cwd, timeout)
```

#### 15.8 Skill File

**Definition:**
Reusable instruction package for a specialized task.

**Example:**
A frontend QA skill that tells the agent how to inspect UI changes.

### Real tools used in practice

> Real, widely-used tools ranked by GitHub stars (★, fetched 2026-06-28); **bold** = top 3 by popularity. Closed-source SaaS / specs shown without a star count.

| Tool | GitHub ★ | What it does |
|---|---|---|
| **[MCP Servers](https://github.com/modelcontextprotocol/servers)** | 87.8k | Reference + community collection of MCP servers exposing tools/data to agents |
| **[Composio](https://github.com/ComposioHQ/composio)** | 29.0k | Managed tool platform: authenticated access to 250+ apps and APIs |
| **[FastMCP](https://github.com/jlowin/fastmcp)** | 25.8k | Pythonic framework for building MCP servers/clients (upstreamed into the SDK) |
| [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) | 23.5k | Official Python SDK for MCP servers and clients |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | 12.7k | Official TypeScript SDK for MCP servers and clients |
| [MCP Specification](https://github.com/modelcontextprotocol/modelcontextprotocol) | 8.5k | The MCP spec + docs; standard adopted across Anthropic, OpenAI and IDEs |
| [mcp-agent](https://github.com/lastmile-ai/mcp-agent) | 8.4k | Framework for building agents on MCP servers with composable patterns |
| [MCP Registry](https://github.com/modelcontextprotocol/registry) | 7.0k | Official community registry for discovering published MCP servers |
| [Arcade](https://github.com/arcadeai/arcade-ai) | 0.9k | Tool-calling platform with managed auth and an SDK for serving agent tools |
| [Toolhouse](https://github.com/toolhouseai/toolhouse-sdk-python) | <0.1k | Hosted tool/function-execution backend for agents (cloud SaaS) |

**Most popular:** The MCP servers collection (87.8k) anchors the tool ecosystem; Composio (29.0k) and FastMCP (25.8k) lead the build-and-integrate tier.


---

## Clean Top-Level Agent Loop

The agent loop should stay separate from the functional domains.

```text
Sense → Retrieve → Remember → Plan → Act → Validate → Learn
```

### Mapping

```text
Sense      = Sensors / Perception
Retrieve   = Knowledge
Remember   = Memory
Plan       = Planning & Decomposition + Agent Core
Act        = Actuators / Actions + Tools & Skills
Validate   = Controls & Validation
Learn      = Learning & Adaptation
```

---

## Compact Memory Hierarchy

```text
Memory
├── Runtime memory
│   ├── Context window
│   ├── Working memory
│   ├── Task state
│   └── Episodic memory
│
├── Persistent memory
│   ├── Long-term memory
│   ├── Project memory
│   ├── User preference memory
│   └── Team convention memory
│
├── Concrete artifacts
│   ├── CLAUDE.md
│   ├── AGENTS.md
│   ├── .cursor/rules
│   ├── Copilot instructions
│   └── Local preference files
│
├── Product-specific mechanisms
│   ├── Claude Code auto-memory
│   ├── /memory command
│   └── # memory shortcut
│
├── Techniques
│   ├── Context compression
│   ├── Memory imports
│   ├── Semantic retrieval
│   ├── Summarization
│   └── State snapshots
│
└── Governance
    ├── Memory review
    ├── Secret exclusion
    ├── Staleness handling
    ├── Trust levels
    └── Forgetting / cleanup
```

---

## Real Agentic Engineering Flows

End-to-end examples showing how the 15 domains compose in production agentic systems. Each flow maps steps to domains.

---

### Flow A — Bug-fix loop (Claude Code + Git + Vitest)

**Domains active:** Goals → Sensors → Memory → Actuators → Controls → Observability → Human Feedback

```text
1. [Goals]      User submits: "Fix the failing auth test in cart.test.ts"
2. [Sensors]    Read CLAUDE.md → load project conventions (pnpm, test path, no mock DB)
3. [Memory]     Initialize task state: { failing_test: cart.test.ts, step: reproduce }
4. [Actuators]  Bash: pnpm test cart.test.ts → capture failure output
5. [Sensors]    Read checkout.ts, auth.ts → locate calculateTotal() as suspect
6. [Planning]   Decompose: inspect → patch → test → regression → diff review
7. [Actuators]  Edit: patch calculateTotal() with minimal diff
8. [Controls]   Bash: pnpm test cart.test.ts → green
9. [Controls]   Bash: pnpm test → full suite, no regressions
10. [Observ.]   git diff reviewed before summary
11. [HITL]      Return PR-ready diff to user for merge decision
```

**Core pattern:** [ReAct loop](https://arxiv.org/abs/2210.03629) — each step alternates Reason (inspect + decide) and Act (run + edit).

**Stack:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) · [Vitest](https://vitest.dev/) · [GitHub CLI](https://cli.github.com/manual/)

---

### Flow B — RAG-backed knowledge agent (LangGraph + LlamaIndex + Qdrant)

**Domains active:** Goals → Planning → Knowledge → Memory → Agent Core → Controls → Observability → Human Feedback

```text
1. [Goals]      User asks: "What is the retry policy for our billing webhook?"
2. [Planning]   LangGraph node: classify intent → knowledge retrieval path selected
3. [Knowledge]  LlamaIndex queries Qdrant: embed question → top-5 chunks from billing docs
4. [Memory]     Inject retrieved chunks + conversation history into context window
5. [Core]       LangGraph node: generate → Claude synthesizes answer from retrieved context
6. [Controls]   Hallucination check: answer must cite a retrieved chunk; else re-retrieve
7. [Observ.]    LangSmith traces: query, chunks, generation, latency, token cost per call
8. [HITL]       If confidence below threshold → escalate to human support agent
```

**Stack:** [LangGraph](https://langchain-ai.github.io/langgraph/) · [LlamaIndex](https://docs.llamaindex.ai/) · [Qdrant](https://qdrant.tech/documentation/) · [LangSmith](https://docs.smith.langchain.com/)

---

### Flow C — Multi-agent feature development (CrewAI + Playwright + Guardrails AI)

**Domains active:** Goals → Planning → Identity → Actuators → Controls → Observability → Safety → Human Feedback

```text
1. [Goals]      PRD delivered: "Add CSV export to the billing dashboard"
2. [Planning]   CrewAI spawns three specialized agents:
                - Architect agent: reads codebase, proposes implementation plan
                - Engineer agent: writes code and unit tests
                - QA agent: runs E2E tests via Playwright, reports regressions
3. [Identity]   Each agent gets a scoped GitHub fine-grained token
                (read repo / write PR only — no branch deletion, no admin)
4. [Actuators]  Engineer edits service layer + adds Pytest suite; runs pytest
5. [Controls]   QA agent: Playwright opens localhost, clicks "Export CSV",
                asserts file download, checks column headers match spec
6. [Safety]     Guardrails AI validates Engineer output: no credentials in diff,
                no schema changes without a migration file present
7. [Observ.]    LangFuse traces each agent's LLM calls with cost and latency
8. [HITL]       QA agent posts screenshot + test report as PR comment
9. [Actuators]  gh pr create → human reviews and merges
```

**Stack:** [CrewAI](https://github.com/crewAIInc/crewAI) · [Playwright](https://playwright.dev/) · [LangFuse](https://github.com/langfuse/langfuse) · [Guardrails AI](https://github.com/guardrails-ai/guardrails)

---

### Flow D — Sandboxed code execution agent (E2B + LangGraph + NeMo Guardrails)

**Domains active:** Goals → Safety → Actuators → Sensors → Controls → Observability → Human Feedback

```text
1. [Goals]      User submits a Python script: "Run this and show me the output"
2. [Safety]     NeMo Guardrails pre-check: detect filesystem wipe, network
                exfiltration, or crypto-mining patterns → block before execution
3. [Safety]     E2B spawns a fresh microVM sandbox (< 150 ms);
                mounts only user-uploaded files, no host filesystem access
4. [Actuators]  Execute script inside sandbox; capture stdout, stderr, file outputs
5. [Sensors]    Read result: exit code, stdout, any generated files
6. [Controls]   If exit code != 0: parse error, suggest fix, re-execute (max 3 retries)
7. [Observ.]    LangSmith trace: prompt → sandbox spawn → execution → result → response
8. [Safety]     Sandbox auto-destroys after timeout; no state persists across sessions
9. [HITL]       Return formatted output; offer to save generated files
```

**Stack:** [E2B](https://e2b.dev/docs) · [LangGraph](https://langchain-ai.github.io/langgraph/) · [NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) · [LangSmith](https://docs.smith.langchain.com/)

---

### Flow E — Eval-driven prompt improvement (DSPy + Braintrust + Promptfoo)

**Domains active:** Goals → Controls → Learning → Observability → Actuators → Memory

```text
1. [Goals]      Target: improve code-review agent accuracy from 71% to 85%
                on the eval suite without manual prompt engineering
2. [Controls]   Promptfoo: run baseline eval on 200 examples → 71% pass rate;
                failure cases logged with expected vs actual outputs
3. [Learning]   DSPy: define signature: code_diff → review_verdict
                BootstrapFewShot selects the best few-shot examples from training set
                MIPRO generates candidate instruction variants and scores each
4. [Controls]   Braintrust: score each candidate prompt version on held-out eval set;
                compare accuracy, latency, and cost per variant
5. [Observ.]    Braintrust experiment UI: compare runs — pass rate per prompt version,
                failure clustering, token cost per correct answer
6. [Actuators]  Deploy winning prompt version to production system prompt config
7. [Memory]     Log refined prompt to CLAUDE.md / agent system prompt for persistence
8. [Learning]   Schedule weekly re-eval run via CI; if pass rate drops > 5% → re-run DSPy
```

**Stack:** [DSPy](https://dspy-docs.vercel.app/) · [Braintrust](https://www.braintrust.dev/) · [Promptfoo](https://www.promptfoo.dev/)

---

### Flow F — Browser-driven data extraction agent (Stagehand + LangGraph + Mem0)

**Domains active:** Goals → Planning → Sensors → Actuators → Memory → Controls → Observability

```text
1. [Goals]      Task: "Extract pricing data from the top 10 competitor pages"
2. [Planning]   LangGraph graph: for each URL → navigate → extract → validate → store
3. [Memory]     Mem0 checks: have we already extracted this URL in a prior session?
                Skip duplicates, resume from last successful page
4. [Sensors]    Stagehand navigates to each URL; natural language instruction:
                "find the pricing table and extract plan names and monthly costs"
5. [Actuators]  Stagehand clicks "See all plans", dismisses cookie banners,
                scrolls to load dynamic pricing rows
6. [Sensors]    Playwright captures DOM snapshot; LLM extracts structured pricing object
7. [Controls]   Validate: required fields present (plan name, price, currency),
                price is a number, no null values → retry page on failure
8. [Memory]     Mem0 stores: { url, extracted_at, pricing_rows[] } for future sessions
9. [Observ.]    LangFuse: traces each page visit with extraction time and field counts
10. [Controls]  Final output: CSV with all 10 competitors and confidence scores
```

**Stack:** [Stagehand](https://github.com/browserbase/stagehand) · [LangGraph](https://langchain-ai.github.io/langgraph/) · [Mem0](https://mem0.ai/) · [LangFuse](https://github.com/langfuse/langfuse)

---

## Open Items

None at present.
