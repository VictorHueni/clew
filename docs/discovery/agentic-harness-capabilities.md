---
title: Agentic Harness — Capabilities, Techniques, and Real Tool Ecosystem
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

| Tool | What it does | Link |
|---|---|---|
| **Claude Code** | Agentic coding assistant; built-in ReAct loop with Read / Edit / Bash / Write tools and permission-gated execution | [docs](https://docs.anthropic.com/en/docs/claude-code) |
| **OpenAI Assistants API** | Hosted thread + tool-call loop with built-in code interpreter and file search; manages the run lifecycle | [docs](https://platform.openai.com/docs/assistants/overview) |
| **LangGraph** | Graph-based agent orchestration; nodes are reasoning steps, edges are conditional transitions; first-class persistence and branching | [github](https://github.com/langchain-ai/langgraph) |
| **Anthropic extended thinking** | Exposes chain-of-thought reasoning as a structured block before the final response; useful for verifying multi-step decisions | [docs](https://docs.anthropic.com/en/docs/extended-thinking) |
| **ReAct pattern** | Interleaves Reason and Act steps; the foundational pattern behind most production agent loops (Yao et al. 2022) | [paper](https://arxiv.org/abs/2210.03629) |
| **smolagents** (HuggingFace) | Lightweight framework where the agent writes and executes Python as its primary action; minimal abstraction overhead | [github](https://github.com/huggingface/smolagents) |

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

| Tool | What it does | Link |
|---|---|---|
| **Mem0** | Managed long-term memory layer; auto-extracts and stores facts from conversations; REST API + Python/JS SDKs | [mem0.ai](https://mem0.ai/) |
| **Letta (formerly MemGPT)** | OS-inspired memory management: paged main context + archival storage for unlimited effective memory; open-source | [github](https://github.com/letta-ai/letta) |
| **Zep** | Memory layer for AI apps; structured episode + fact extraction with semantic search; self-hosted or cloud | [github](https://github.com/getzep/zep) |
| **LangChain memory** | `ConversationBufferMemory`, `ConversationSummaryMemory`, `VectorStoreRetrieverMemory` — drop-in modules for any chain | [docs](https://python.langchain.com/docs/how_to/#memory) |
| **OpenAI Assistants threads** | Server-side conversation history; the API stores and manages message threads automatically across runs | [docs](https://platform.openai.com/docs/assistants/how-it-works/managing-threads-and-messages) |
| **CLAUDE.md / AGENTS.md** | File-based persistent project memory loaded at agent startup by Claude Code, OpenAI Codex-style agents, and Cursor | [docs](https://docs.anthropic.com/en/docs/claude-code/memory) |

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

| Tool | What it does | Link |
|---|---|---|
| **LlamaIndex** | Full RAG framework: connectors, node parsers, indexes, retrievers, query engines, and response synthesizers | [docs](https://docs.llamaindex.ai/) |
| **LangChain RAG** | Document loaders + text splitters + vector retrievers + generation chains; 100+ source connectors | [docs](https://python.langchain.com/docs/tutorials/rag/) |
| **Chroma** | Embedded open-source vector store; zero-config local dev; scales to hosted deployment | [github](https://github.com/chroma-core/chroma) |
| **Qdrant** | Production vector search engine; supports hybrid sparse/dense retrieval and named vectors | [docs](https://qdrant.tech/documentation/) |
| **pgvector** | PostgreSQL extension for embedding storage and cosine / L2 / inner-product similarity search | [github](https://github.com/pgvector/pgvector) |
| **OpenAI file search** | Built-in RAG for Assistants API; auto-chunks and embeds uploaded files into a hosted vector store | [docs](https://platform.openai.com/docs/assistants/tools/file-search) |
| **Haystack** | Production NLP + RAG pipelines; `DocumentStore` + `Retriever` + `Reader` architecture with pipeline graphs | [docs](https://haystack.deepset.ai/) |
| **Anthropic RAG cookbook** | Reference implementation of RAG over a document corpus with Claude; chunking + embedding + retrieval patterns | [github](https://github.com/anthropics/anthropic-cookbook/blob/main/skills/retrieval_augmented_generation/) |

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

| Tool | What it does | Link |
|---|---|---|
| **Playwright** | Headless browser automation; DOM inspection, screenshots, network interception, accessibility tree access | [playwright.dev](https://playwright.dev/) |
| **Stagehand** (Browserbase) | AI-native browser automation; natural language → browser actions with fallback to Playwright primitives | [github](https://github.com/browserbase/stagehand) |
| **BrowserBase** | Hosted headless browser infrastructure for agents; persistent sessions, proxies, and CAPTCHA handling | [browserbase.com](https://browserbase.com/) |
| **tree-sitter** | Incremental parsing library for source code; provides structured syntax trees for 100+ languages; used by editors and agents for symbol extraction | [tree-sitter.github.io](https://tree-sitter.github.io/tree-sitter/) |
| **Language Server Protocol (LSP)** | Standard interface for IDE-grade code intelligence: go-to-definition, symbol lookup, find-references, type info | [spec](https://microsoft.github.io/language-server-protocol/) |
| **Claude computer use** | Screenshot + click + keyboard input API for observing and interacting with any rendered desktop or browser UI | [docs](https://docs.anthropic.com/en/docs/computer-use) |

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

| Tool | What it does | Link |
|---|---|---|
| **Claude Code Edit / Write / Bash** | Patch-based file editing and auditable shell command execution; native tools in the Claude Code harness with permission modes | [docs](https://docs.anthropic.com/en/docs/claude-code/tools) |
| **E2B Code Interpreter** | Secure sandboxed code execution in a microVM; < 200 ms hot-start, file-system scoped, network-isolated; Python and JavaScript | [e2b.dev](https://e2b.dev/docs) |
| **GitHub CLI (`gh`)** | Create branches, PRs, issues, and merge from the command line; scriptable for git-based agent workflows | [cli.github.com](https://cli.github.com/manual/) |
| **Octokit** | GitHub REST + GraphQL client; agents use it to comment on, merge, and label PRs programmatically | [github](https://github.com/octokit/octokit.js) |
| **Playwright (action mode)** | Browser click / type / form-submit / file-upload actions; standard for UI-driven agent workflows | [playwright.dev/docs/input](https://playwright.dev/docs/input) |
| **Modal** | Serverless GPU/CPU execution platform; agents dispatch sandboxed workloads (data processing, model inference) without managing infra | [modal.com](https://modal.com/) |

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

| Tool | What it does | Link |
|---|---|---|
| **Vitest** | Fast unit and integration testing for JS/TS; watch mode and inline snapshots suit agent-driven TDD loops | [vitest.dev](https://vitest.dev/) |
| **Pytest** | Python test runner; `parametrize` + fixtures make it easy for agents to write targeted regression suites | [docs.pytest.org](https://docs.pytest.org/) |
| **Promptfoo** | LLM output evaluation framework; define test cases + assertions, run evals against live or recorded model outputs, compare across prompt versions | [github](https://github.com/promptfoo/promptfoo) |
| **OpenAI Evals** | Open-source framework for evaluating LLM completions against ground-truth datasets; jsonl-based eval definitions | [github](https://github.com/openai/evals) |
| **Braintrust** | Eval and observability platform for LLM apps; tracks scores across prompt versions and model changes with experiment UI | [braintrust.dev](https://www.braintrust.dev/) |
| **LangSmith** | LangChain's testing + tracing platform; record runs, annotate with labels, compare metrics across deployments | [docs.smith.langchain.com](https://docs.smith.langchain.com/) |

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

| Tool | What it does | Link |
|---|---|---|
| **LangSmith** | Traces every LLM call, tool invocation, and chain step; shareable run URLs for debugging; dataset management for evals | [docs.smith.langchain.com](https://docs.smith.langchain.com/) |
| **LangFuse** | Open-source LLM observability; traces, scores, prompt versioning, cost tracking; self-hosted or cloud | [github](https://github.com/langfuse/langfuse) |
| **Helicone** | Proxy-based observability for OpenAI / Anthropic; zero-code integration via base URL override; per-request cost and latency | [docs.helicone.ai](https://docs.helicone.ai/) |
| **Weights & Biases (W&B)** | Experiment tracking and prompt management for ML/LLM workflows; run comparison and artifact versioning | [docs.wandb.ai](https://docs.wandb.ai/guides/prompts) |
| **OpenTelemetry** | Vendor-neutral distributed tracing standard; `opentelemetry-instrumentation-openai` auto-instruments every LLM call | [github](https://github.com/open-telemetry/opentelemetry-python-contrib) |
| **Arize AI** | LLM performance monitoring in production; embedding drift detection, hallucination scoring, retrieval quality metrics | [docs.arize.com](https://docs.arize.com/) |

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

| Tool | What it does | Link |
|---|---|---|
| **Instructor** | Structured output library for Python + TypeScript; validates LLM responses against Pydantic / Zod schemas with automatic retry on schema violation | [python.useinstructor.com](https://python.useinstructor.com/) |
| **DSPy** | Declarative LLM programming; define input → output signatures and let optimizers find the best prompts and few-shot examples automatically | [dspy-docs.vercel.app](https://dspy-docs.vercel.app/) |
| **OpenAI structured outputs** | Schema-constrained JSON generation; guarantees model response matches a JSON Schema with no parsing or retry needed | [docs](https://platform.openai.com/docs/guides/structured-outputs) |
| **Anthropic tool use** | Type-safe function calling; model returns `tool_use` blocks with structured, validated arguments that map directly to function signatures | [docs](https://docs.anthropic.com/en/docs/tool-use) |
| **Marvin** | Lightweight Python library for structured extraction, classification, and generation; wraps any LLM with type-annotated function decorators | [github](https://github.com/prefecthq/marvin) |

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

| Tool | What it does | Link |
|---|---|---|
| **LangGraph** | State-machine graph for agent orchestration; nodes are Python functions, edges are routing logic; native persistence, checkpointing, and human-in-the-loop | [langchain-ai.github.io/langgraph](https://langchain-ai.github.io/langgraph/) |
| **AutoGen** (Microsoft) | Multi-agent conversation framework; specialized agents negotiate task completion via structured message passing | [github](https://github.com/microsoft/autogen) |
| **CrewAI** | Role-based multi-agent orchestration; crews of agents with defined goals, tools, backstories, and delegation rules | [github](https://github.com/crewAIInc/crewAI) |
| **smolagents** (HuggingFace) | Lightweight code-first agents; the agent writes and executes Python as its primary action primitive; minimal overhead | [github](https://github.com/huggingface/smolagents) |
| **Tree of Thoughts** | Explores multiple reasoning paths as a tree; prunes weak branches before committing; works best for combinatorial planning tasks (Yao et al. 2023) | [arxiv.org/abs/2305.10601](https://arxiv.org/abs/2305.10601) |
| **OpenAI Swarm** | Experimental lightweight multi-agent handoff model; routines + handoffs pattern for distributing subtasks across specialized agents | [github](https://github.com/openai/swarm) |

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

| Tool | What it does | Link |
|---|---|---|
| **GitHub fine-grained tokens** | Repository-scoped, operation-specific tokens; an agent gets read/write on one repo but cannot touch others or delete branches | [docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) |
| **HashiCorp Vault** | Secrets management; dynamic credentials for databases and cloud; agents fetch just-in-time short-lived secrets that auto-expire | [developer.hashicorp.com/vault](https://developer.hashicorp.com/vault/docs) |
| **AWS IAM roles** | Instance profiles and OIDC give agents time-limited cloud credentials without static keys; the standard least-privilege pattern for cloud agents | [docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html) |
| **Claude Code permission modes** | `bypassPermissions` / `default` / `autoEdit` modes gate which tool calls execute automatically and which require user approval at runtime | [docs](https://docs.anthropic.com/en/docs/claude-code/settings) |

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

| Tool | What it does | Link |
|---|---|---|
| **LangGraph `interrupt()`** | Pauses a running agent graph at any node; awaits human input before resuming — first-class HITL primitive in the state-machine model | [langchain-ai.github.io/langgraph/concepts/human_in_the_loop](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/) |
| **OpenAI Assistants `requires_action`** | Run status that pauses a thread when tool calls need human input or approval before the run can continue | [docs](https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps) |
| **Claude Code permission prompts** | Tool calls that exceed the current permission mode surface a real-time y/n prompt in the terminal before execution | [docs](https://docs.anthropic.com/en/docs/claude-code/settings) |
| **GitHub PR review** | Agent creates a PR; human inspects the diff and approves / requests changes before merge — the standard HITL gate for code changes in team workflows | [docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) |

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

| Tool | What it does | Link |
|---|---|---|
| **DSPy optimizers** | `BootstrapFewShot`, `MIPRO`, and `BayesianSignatureOptimizer` learn better prompts and few-shot examples from labeled data automatically — no manual prompt engineering | [dspy-docs.vercel.app/docs/building-blocks/optimizers](https://dspy-docs.vercel.app/docs/building-blocks/optimizers) |
| **Promptfoo** | A/B tests prompt variants against eval suites; tracks pass rates across versions to guide iterative refinement | [promptfoo.dev](https://www.promptfoo.dev/docs/) |
| **OpenAI fine-tuning** | Supervised fine-tuning on curated conversation examples; improves behavior and reduces prompt length for domain-specific tasks | [docs](https://platform.openai.com/docs/guides/fine-tuning) |
| **Weights & Biases sweeps** | Hyperparameter and prompt sweep with Bayesian optimization; compares runs across prompt variants, model versions, and temperature settings | [docs.wandb.ai/guides/sweeps](https://docs.wandb.ai/guides/sweeps) |

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

| Tool | What it does | Link |
|---|---|---|
| **NeMo Guardrails** (NVIDIA) | Programmable rails defined in Colang; blocks off-topic, unsafe, or hallucinated responses before they leave the agent; integrates with any LLM | [github](https://github.com/NVIDIA/NeMo-Guardrails) |
| **Guardrails AI** | Schema-based validators + fix strategies for LLM outputs; plugs into any inference call with configurable retry and correction policies | [github](https://github.com/guardrails-ai/guardrails) |
| **E2B Code Interpreter** | MicroVM sandbox for agent-generated code; 150 ms cold-start, network-isolated, file-system scoped; prevents host system access | [e2b.dev/docs/sandbox/overview](https://e2b.dev/docs/sandbox/overview) |
| **Firecracker** | AWS open-source microVM hypervisor; sub-second boot; the runtime behind E2B, AWS Lambda, and Fly.io machines — the gold standard for sandboxed agent code execution | [github](https://github.com/firecracker-microvm/firecracker) |
| **Rebuff** | Prompt injection detection; semantic + heuristic analysis of user inputs before they reach the agent's reasoning step | [github](https://github.com/woop/rebuff) |
| **Anthropic Constitutional AI** | Training-time principle set that shapes the model's built-in refusal and policy boundaries before any harness layer is applied | [anthropic.com/research](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) |

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

| Tool | What it does | Link |
|---|---|---|
| **Git** | Branching, status, and diff as the primary environment state tracker for code agents; `git status` + `git diff` are standard agent perception calls | [git-scm.com/docs](https://git-scm.com/docs) |
| **Docker Compose** | Defines the full service environment; agents snapshot runtime state via `docker ps` and service log inspection | [docs.docker.com/compose](https://docs.docker.com/compose/) |
| **GitHub Actions** | CI state as environment truth; agents check workflow run status via `gh run list --json status,conclusion` before deciding to proceed | [docs.github.com/en/actions](https://docs.github.com/en/actions) |
| **Nix** | Reproducible build environments; agents can pin and restore exact dependency states across machines and CI runs | [nix.dev](https://nix.dev/) |

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

| Tool | What it does | Link |
|---|---|---|
| **Model Context Protocol (MCP)** | Anthropic's open standard for connecting agents to tools, data, and services; JSON-RPC transport, resource + tool + prompt primitives; 1000+ community servers | [modelcontextprotocol.io](https://modelcontextprotocol.io/) |
| **Composio** | 150+ managed MCP-compatible integrations: GitHub, Linear, Slack, Notion, Salesforce — auth, refresh, and rate-limiting handled for each integration | [docs.composio.dev](https://docs.composio.dev/) |
| **LangChain tools** | Standardized tool interface; 100+ pre-built tools for web search, file system, SQL, Wolfram Alpha, and more; wraps any Python function | [docs](https://python.langchain.com/docs/integrations/tools/) |
| **Arcade AI** | Hosted tool infrastructure for agents; built-in OAuth, rate limiting, and per-call observability; no per-integration plumbing | [docs.arcade-ai.com](https://docs.arcade-ai.com/) |
| **Toolhouse** | Tool execution platform; agents call tools via a single API without managing per-integration infra; usage-based billing | [toolhouse.ai/docs](https://toolhouse.ai/docs) |

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
