# plaster-calculator-common

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
and [service architecture](../../docs/service-architecture.md).

- Keep this package platform-neutral: no React, UIKit, Next.js, Firebase, browser-only APIs, or app code.
- Define runtime schemas with Zod, infer exported types with `z.infer`, and use readonly object schemas where suitable.
- Keep schemas in kebab-case `*.schema.ts` files and export public contracts through barrels.
- Place questionnaire contracts under `src/questionnaires/services/`; implementations belong in apps or an
  infrastructure library.
