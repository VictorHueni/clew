# Agentic Harness: Capabilities, Definitions, Techniques, and Examples

This document organizes an agentic harness into clean levels.

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

## 1. Agent Core

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

---

## 2. Memory

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

---

## 3. Knowledge

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

---

## 4. Sensors / Perception

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

---

## 5. Actuators / Actions

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

---

## 6. Controls & Validation

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

---

## 7. Observability

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

---

## 8. Goals & Tasking

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

---

## 9. Planning & Decomposition

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

---

## 10. Identity & Access

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

---

## 11. Human Feedback

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

---

## 12. Learning & Adaptation

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

---

## 13. Safety & Governance

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

---

## 14. Environment State

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

---

## 15. Tools & Skills

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
