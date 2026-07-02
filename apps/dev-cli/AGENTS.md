# dev-cli

Inherits the [repository guidelines](../../AGENTS.md) and
[TypeScript guidelines](../../docs/typescript-guidelines.md).

- Keep commands focused on repository tooling, not application runtime logic.
- Validate options and package metadata before filesystem mutations; document every side effect.
- The bundle command targets Node.js 24 ESM with source maps, externalises third-party dependencies, bundles workspace
  dependencies, and rewrites the target `package.json`. Changes require Firebase deployment-focused verification.
- Keep package parsing behind the Zod schema and generated output in the configured deployment directory.
