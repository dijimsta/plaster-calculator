# plaster-calculator-graphql-server

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
[service architecture](../../docs/service-architecture.md), and
[Firebase Admin guidelines](../../docs/firebase-admin-guidelines.md).

- Resolvers call generated Data Connect admin SDK functions directly; there is no intermediate service/DI layer.
  This package is itself a trusted server-side process.
- Served via `graphql-yoga`'s `createYoga`. Rely on its default error masking rather than hand-rolling it: throw
  `GraphQLError`s (e.g. `unauthenticatedError()`) directly from resolvers for errors that should reach the client
  unmasked; any other thrown error is masked to a generic message automatically.
- Do not initialize the Firebase Admin app here — that is the consuming app's responsibility.
- Do not import React, UIKit, Next.js, or browser-only APIs.
