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

## Component Styling

Keep component class names in a sibling `*.styles.ts` file rather than inline in the component. When styling pushes a
component over a complexity limit, extract the class names and style-selection logic before splitting the component
into smaller internal components.

## Storybook Stories

Do not factor story render logic out into wrapper components (e.g. a local `function ResponsiveNavbar() {...}` used by
multiple stories). Each story's `render` function must be self-contained, including any `useState` calls, so the code
can be copy-pasted directly out of Storybook and used as-is. Prefer duplicating markup across stories over sharing it
through a helper component.

## Generated Directories

The `generated/` directory (e.g. `generated/example-data-connector`) holds Firebase Data Connect SDK output.
Do not add manual files there, including README.md or AGENTS.md — `firebase dataconnect:sdk:generate` fails with
"unexpected file" if the output directory contains anything other than the `.ts`/`.js`/`.json` files it produces.
Document generated code elsewhere (e.g. the connector's schema/source directory) instead.

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
