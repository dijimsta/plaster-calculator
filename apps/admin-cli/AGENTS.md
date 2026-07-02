# admin-cli

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
and [Firebase Admin guidelines](../../docs/firebase-admin-guidelines.md). Reusable services follow
[Node Core](../../libraries/plaster-calculator-node-core/AGENTS.md).

- Keep Ink terminal UI and navigation here; reusable Firebase Admin operations belong in Node Core.
- Do not import browser or web UI packages.
- Validate identifiers and claims before writes. Show the target and destructive scope.
- Represent asynchronous loading, empty, error, and success states explicitly.
