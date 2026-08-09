# plaster-calculator-web-core

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
[service architecture](../../docs/service-architecture.md), and [web UI guidelines](../../docs/web-ui-guidelines.md).

- Keep reusable browser and Firebase client SDK adapters here. Own each service's implementation alongside its React
  context, provider, and hook in the same subject folder (e.g. `teams/teams.service.ts`, `teams.context.ts`,
  `teams.provider.tsx`, `teams.hooks.ts`).
- Do not import Next.js, routing, or app-specific code.
- Give a provider's injected dependency a constructor default parameter that builds the real implementation, and
  accept an optional override (e.g. a provider prop) for tests and Storybook. Do not export a module-level singleton
  service instance.
- Do not import UIKit or app-specific code; React and browser-only Firebase client APIs belong here.
