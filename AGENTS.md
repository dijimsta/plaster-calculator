# Monorepo

## Workflow

Always verify changes work before committing. If you cannot verify the changes yourself, ask the user to verify
before committing.

## Jira

Every branch and PR must be associated with a Jira ticket. When starting work or creating a PR, ask the user if
there is an existing ticket, if a new one should be created, or if they explicitly want to skip.

**Branch naming:** `{jira-ticket}/{short-description}`

**PR title:** `[WORK-42] Short description`

**Commit messages:** Append the issue key in square brackets at the end of the subject line. Omit if there is no
associated ticket.

```
WORK-42/add-login-endpoint
WORK-99/fix-npe-on-startup
```

## Commit Messages

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description [ISSUE-KEY]
```

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scope:** Must be a Gradle subproject name from `settings.gradle`. Read that file to find valid scopes before writing a
commit message. Scope is required — every commit should be attributable to a module. For repo-level changes (root
config, tooling, CI), use `monorepo` as the scope.

**One module per commit:** Each commit must contain changes for a single Gradle subproject only. If changes span
multiple modules, split them into separate commits.

**Examples:**

```
feat(plaster-calculator-api): add user authentication endpoint [WORK-42]
fix(plaster-calculator-desktop): handle null pointer in payment processor [WORK-99]
chore(monorepo): update Gradle wrapper to 8.5
```
