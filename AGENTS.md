# Repository Guidelines

## Workflow

After every code change, run the following checks in order before committing:

```bash
pnpm build
pnpm lint
pnpm format
```

Run lint before format — lint may reorder or rewrite code that format would then need to fix. All three must pass
with no errors before the commit is made. If you cannot run them yourself, ask the user to do it first.

These checks must also be run before opening a pull request. If any check modifies files (e.g. prettier rewrites),
stage and commit those changes before creating the PR.

## Branching

Never commit directly to `main`. All work must be done on a feature branch and merged via a pull request.

Branch names should be descriptive and follow the conventions in the Jira section below when a ticket exists.

## Configuration Guardrails

Do not loosen, disable, or override TypeScript, ESLint, formatting, or styling configuration to make errors disappear.
Fix the underlying code instead. Only change these configurations when the user explicitly asks for a configuration
change, or when the change is the direct purpose of the task.

When using code complexity ESLint rules, prefer the modified variants where appropriate so patterns like `switch` statements can reduce measured complexity.

## Code Style

Prefer an explicit `else` branch when both an `if` branch and its alternative return. This makes the two mutually
exclusive paths visible in the control-flow structure instead of expressing the alternative as an unguarded return.

## UI Component Boundaries

Do not introduce raw Tailwind classes, inline styles, or any ad hoc CSS in application or story code. All layout and
presentation must be expressed through UIKit components or established app-level patterns from
`apps/plaster-calculator-web/src/lib/styles.ts`. This applies everywhere — app pages, components, and stories alike.

Do not add new presentation class names, style-map entries, or CSS to application code. The app is moving iteratively
toward having no application-owned styles. Existing app-level styles may be migrated or removed, but must not be
expanded. New or changed presentation must be implemented through UIKit component APIs.

When an implementation needs a layout or UI element that UIKit does not provide, stop and tell the user what is
missing. Describe the component's responsibility and proposed API before creating it or substituting another pattern.
Do not approximate a missing component with raw utility classes as a temporary measure.

## Framework Boundaries

Keep shared libraries, including `libraries/uikit-web`, framework-agnostic. Do not add Next.js-specific directives such
as `"use client"`, Next.js imports, or other application-framework dependencies to shared library code. When a
framework boundary is required, declare it in the consuming app module instead.

## Jira

Jira tickets are optional.

If a ticket exists, include it in branch names, PR titles, and commit messages. If there is no ticket, use plain
descriptive names and titles. Do not interrupt normal work to ask whether Jira should be used.

Examples:

```text
WORK-42/add-login-endpoint
fix-login-endpoint

[WORK-42] Add login endpoint
Add login endpoint
```

For commit messages, append the issue key in square brackets at the end of the subject when a ticket exists. Omit it
when there is no ticket.

## Commit Messages

All commits must use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
type(scope): description [ISSUE-KEY]
```

Rules:

- `type` must be one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, or `revert`.
- `scope` is required. Use the affected app, function, library, or `monorepo` for repo-level work such as root config, tooling, or CI.
- Keep each commit focused on one app, function, library, or repo-level concern. Split multi-area work into separate commits when practical.

Examples:

```text
feat(plaster-calculator-web): add movies view [WORK-42]
fix(plaster-calculator-functions): handle missing auth context [WORK-99]
chore(monorepo): update Firebase configuration
```
