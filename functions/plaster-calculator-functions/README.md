# Plaster Calculator Functions

`@functions/plaster-calculator-functions` is the Node.js 24 Firebase Functions backend for Plaster Calculator. It exposes
callable operations for projects, floorplan processing, reminders, and exports. Account CRUD and user settings CRUD are
accessed directly from the web app through Firebase Data Connect.

## Runtime

Function bootstrap configures:

- Firebase Admin initialization.
- Region `us-west1`.
- A maximum of five instances.
- App Check enforcement.

The package uses the generated Firebase Data Connect Admin SDK at `@generated/data-connector-admin` for relational
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
