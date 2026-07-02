# Storybook Web

`@apps/storybook-web` is the production-like component workshop for the workspace's web UI libraries. Stories import
components through the same public package entry points used by regular applications:

- `@libraries/uikit-web`
- `@libraries/plaster-calculator-ui`

This boundary exposes missing exports, undeclared dependencies, styling-source issues, and accidental reliance on
library internals.

## Service scenarios

Storybook provides deterministic stub implementations of service interfaces from `plaster-calculator-common`. Stories
inject those stubs through providers exported by `plaster-calculator-ui` and can exercise successful, delayed, empty,
failing, retrying, and cancellation behaviour without contacting a live backend.

Firebase implementations, credentials, environment-specific URLs, and production application providers do not belong
in this app.

## Commands

From the repository root:

```bash
pnpm storybook
pnpm --filter @apps/storybook-web build
```

Before committing changes, also run:

```bash
pnpm build
pnpm lint
pnpm format
```
