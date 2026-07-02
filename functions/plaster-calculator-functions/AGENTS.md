# plaster-calculator-functions

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
and [Firebase Admin guidelines](../../docs/firebase-admin-guidelines.md). The Data Connect client follows the
[generated SDK rules](../../generated/example-data-connector/AGENTS.md).

- Export deployed functions from `src/index.ts`; keep global initialization in `src/bootstrap.ts`.
- Keep handlers focused and extract validation, ownership, mapping, and domain operations.
- Preserve Node.js 24 ESM, `us-west1`, App Check enforcement, and runtime limits unless deployment policy explicitly
  changes.
- The bundle command generates `dist/` and rewrites deployment metadata; use it only in the deployment workflow.
