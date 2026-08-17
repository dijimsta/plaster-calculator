# Plaster Calculator Web Core

`@libraries/plaster-calculator-web-core` contains reusable browser and Firebase client SDK adapters for Plaster
Calculator. It bridges platform-neutral contracts from `plaster-calculator-common` to browser-side infrastructure.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```

## Conventions

- Keep reusable browser and Firebase client SDK adapters here. Own each service's implementation alongside its React
  context, provider, and hook in the same subject folder (e.g. `teams/teams.service.ts`, `teams.context.ts`,
  `teams.provider.tsx`, `teams.hooks.ts`).
- Do not import Next.js, routing, or app-specific code.
- The `"use client"` directive is a React Server Components convention, not a Next.js-specific feature — add it to
  the top of client-only hooks, contexts, and providers here as needed. It does not violate the rule above.
- Give a provider's injected dependency a constructor default parameter that builds the real implementation, and
  accept an optional override (e.g. a provider prop) for tests and Storybook. Do not export a module-level singleton
  service instance.
- Do not import UIKit or app-specific code; React and browser-only Firebase client APIs belong here.
