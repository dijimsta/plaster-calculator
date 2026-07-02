# plaster-calculator-web

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
[web UI guidelines](../../docs/web-ui-guidelines.md), and [service architecture](../../docs/service-architecture.md).

- Keep Next.js routing, client boundaries, Firebase browser adapters, and app composition here.
- Do not add entries in `src/lib/styles.ts`; migrate existing app styles when touched.
- Keep Firebase configuration and environment access under `src/firebase/`; never commit credentials or local env
  files.
- Keep data access behind focused modules under `src/lib/api/` or injected service implementations.
