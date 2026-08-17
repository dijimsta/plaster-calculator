# Contributing

## Workflow

After every code change, run the following checks in order before committing:

```bash
pnpm build
pnpm lint
pnpm format
```

Run lint before format — lint may reorder or rewrite code that format would then need to fix. All three must pass
with no errors before the commit is made. If you cannot run them yourself, ask the user to do it first.

The `.husky/pre-commit` hook (installed by `pnpm install` through the `prepare` script) also runs these checks and
rejects the commit if any of them fail. Running them yourself first lets you fix problems before the commit is
rejected, rather than finding out at commit time.

These checks must also be run before opening a pull request. If any check modifies files (e.g. prettier rewrites),
stage and commit those changes before creating the PR.

## Scratch files

When a task needs a throwaway file (command output, logs, a one-off script), write it under the repo's `tmp/`
directory (gitignored) rather than `/tmp` or a loose untracked path in the repo root.

## Manual UI verification

Do not launch dev servers, Storybook, or browser automation (e.g. Playwright/chromium-cli) to visually verify UI
changes yourself. The user will verify in their own running session. Instead, describe exactly what to check (URL or
story name, the interaction steps, and the expected result) and let the user confirm it.

## Branch names

Never commit directly to `main`. All work must be done on a feature branch and merged via a pull request.

Use the active contributor's GitHub username, a short hyphen-separated description, and an optional Jira issue key:

```text
<user>/<description>[-<Jira-issue-key>]
```

Determine the active GitHub username before creating the branch:

```sh
gh api user --jq .login
```

Use that username as `<user>`. Do not substitute `agent`, `claude`, or another AI-assistant name. This convention
overrides generic branch-naming defaults used by development tools.

Examples:

```text
dijimsta/add-login-endpoint-WORK-42
dijimsta/add-login-endpoint
```

The Jira issue key is optional — include one when a ticket exists (see [Jira](README.md#jira)); do not interrupt
normal work to ask whether a ticket should be created.

## Pull requests

Commit and push to the feature branch freely, but do not open a pull request (e.g. `gh pr create`) until the user
explicitly asks for it in that turn. Once they do ask, treat that as sufficient approval — proceed straight to
pushing and opening the PR without a separate confirmation round-trip, even if the underlying commits were made in
an earlier turn. If code changes were just made in the same turn, commit them and stop there — let the user see the
commit before it's pushed, unless they've already asked for a PR in that same turn.

### Titles

Append the Jira issue key in brackets when applicable:

```text
<description> [<Jira-issue-key>]
```

`gh stack submit --auto` only follows this convention when a branch has a single commit (it reuses that commit's
subject as the title). A branch with multiple commits gets a humanized version of the branch name instead — e.g.
`quote-appearance-connector-WORK-201` became "quote appearance connector WORK 201", with no bracketed issue key and
the squash-merge commit inheriting that same title. Check every PR's title after `submit --auto`
(`gh pr view <number> --json title`) and fix any multi-commit branch's title with `gh pr edit <number> --title`
before merging, the same pass as the description fix above.

### Descriptions

Before creating or updating a pull request description, read and follow
[.github/pull_request_template.md](.github/pull_request_template.md). Preserve its headings and order, complete
every applicable section, and remove only sections that the template marks as optional.

`gh stack submit --auto` (see the `gh-stack` skill) does not fill this template — it leaves each PR with the raw,
unfilled template placeholders as the body, regardless of the branch's actual commits. After running it, check every
PR's description (`gh pr view <number> --json body`) and rewrite any that are still the raw template with
`gh pr edit <number> --body-file <file>`, following the template properly for that branch's actual change.

`gh stack submit --auto` also creates every PR as a **draft**, which blocks merging even after CI passes. Before
merging a stack, confirm none of its PRs are still drafts (`gh pr view <number> --json isDraft`) and mark any that
are with `gh pr ready <number>` — or pass `--open` to `submit` up front to skip the draft state entirely.

## Configuration guardrails

Do not loosen, disable, or override TypeScript, ESLint, formatting, or styling configuration to make errors
disappear. Fix the underlying code instead. Only change these configurations when the user explicitly asks for a
configuration change, or when the change is the direct purpose of the task.

When using code complexity ESLint rules, prefer the modified variants where appropriate so patterns like `switch`
statements can reduce measured complexity.

## Generated directories

The `generated/` directory (e.g. `generated/data-connector-admin`) holds Firebase Data Connect SDK output. Do not
add manual files there, including README.md or AGENTS.md — `firebase dataconnect:sdk:generate` fails with
"unexpected file" if the output directory contains anything other than the `.ts`/`.js`/`.json` files it produces.
Document generated code elsewhere (e.g. the connector's schema/source directory) instead.

## Commit messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) and enforces the
[`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
rules with a Git commit hook.

All commits must use this format, appending the Jira issue key in brackets when applicable:

```text
<type>[optional scope]: <description> [<Jira-issue-key>]
```

### Scope

Changes to a named package require a scope that exactly matches its package name, such as `@apps/plaster-calculator-web`
or `@libraries/plaster-calculator-common`. Omit the scope only for changes outside named packages, such as root
configuration or top-level documentation.

Keep each scoped commit to one package. Do not combine changes from multiple packages or mix package and
repository-level changes.

For example:

```text
feat(@apps/plaster-calculator-web): add movies view [WORK-42]
fix(@functions/plaster-calculator-functions): handle missing auth context [WORK-99]
chore: update Firebase configuration
```

Use one of the following types:

| Type       | When to use it                                                                                |
| ---------- | --------------------------------------------------------------------------------------------- |
| `build`    | Changes to the build system, package management, or external dependencies.                    |
| `chore`    | Routine maintenance that does not change application or test behaviour.                       |
| `ci`       | Changes to CI configuration, workflows, or scripts.                                           |
| `docs`     | Documentation-only changes.                                                                   |
| `feat`     | A new feature or capability for users.                                                        |
| `fix`      | A bug fix for users.                                                                          |
| `perf`     | A change that improves performance.                                                           |
| `refactor` | A code change that neither fixes a bug nor adds a feature.                                    |
| `revert`   | Reverts a previous commit.                                                                    |
| `style`    | Formatting-only changes that do not affect code behaviour, such as whitespace or punctuation. |
| `test`     | Adds, updates, or fixes tests without changing production behaviour.                          |
