# Repository Guidelines

## Workflow

Verify changes before committing. If you cannot verify them yourself, ask the user to do it before the commit is made.

## Configuration Guardrails

Do not loosen, disable, or override TypeScript, ESLint, formatting, or styling configuration to make errors disappear.
Fix the underlying code instead. Only change these configurations when the user explicitly asks for a configuration
change, or when the change is the direct purpose of the task.

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
