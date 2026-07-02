# Plaster Calculator Functions

`@functions/plaster-calculator-functions` is the Node.js 24 Firebase Functions backend for Plaster Calculator. It exposes
callable operations for accounts, projects, floorplan processing, reminders, settings, and exports.

## Runtime

Function bootstrap configures:

- Firebase Admin initialization.
- Region `us-west1`.
- A maximum of five instances.
- App Check enforcement.

The package uses the generated Firebase Data Connect Admin SDK at `@generated/example-data-connector` for relational
data operations.

## Commands

From the repository root:

```bash
pnpm --filter @functions/plaster-calculator-functions build
pnpm --filter @functions/plaster-calculator-functions bundle
pnpm --filter @functions/plaster-calculator-functions logs
```

The bundle command prepares the package for Firebase deployment and rewrites deployment-related package metadata. The
repository's Firebase configuration runs it as a predeploy step.

Deploy through the repository Firebase workflow or, when intentionally targeting the configured project:

```bash
pnpm --filter @functions/plaster-calculator-functions deploy
```

## Verification

Before committing, run:

```bash
pnpm build
pnpm lint
pnpm format
```
