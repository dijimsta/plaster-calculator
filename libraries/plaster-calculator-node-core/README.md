# Plaster Calculator Node Core

`@libraries/plaster-calculator-node-core` contains reusable Node.js services and adapters for Plaster Calculator. It
bridges platform-neutral contracts from `plaster-calculator-common` to server-side infrastructure such as the Firebase
Admin SDK.

The current public API provides `UsersService` for reading and updating validated Firebase custom user claims.

## Boundaries

- Domain schemas and service contracts belong in `plaster-calculator-common`.
- Reusable Node.js and Firebase Admin implementations belong here.
- Firebase Functions handlers, CLI screens, routing, and application composition remain in their consuming packages.
- Browser code and React UI dependencies do not belong here.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
