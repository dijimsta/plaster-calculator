# Utilities

`@libraries/utilities` contains framework-agnostic shared utility functions used across Plaster Calculator packages,
such as currency formatting helpers.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```

## Conventions

- Framework-agnostic: no React, Next.js, Firebase, or Plaster Calculator domain dependencies.
- Export public APIs through the package barrel (`src/index.ts`).
