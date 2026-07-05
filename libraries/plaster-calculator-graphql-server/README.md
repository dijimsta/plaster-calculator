# Plaster Calculator GraphQL Server

`@libraries/plaster-calculator-graphql-server` exposes a GraphQL endpoint (via `graphql-yoga`) for Plaster
Calculator. It bridges platform-neutral domain contracts from `plaster-calculator-common` to generated Data
Connect admin SDK calls, with no intermediate service layer, since this package is itself a trusted server-side
process.

The current public API provides `graphqlRequestHandler` for handling raw `Request`/`Response` GraphQL calls
(drops in directly as a Next.js Route Handler export, and ships GraphiQL by default), and `schema` for tooling
such as schema printing.

## Boundaries

- Domain schemas and service contracts belong in `plaster-calculator-common`.
- Resolvers call generated Data Connect admin SDK functions directly.
- App routing, HTTP framework glue, and application composition remain in consuming packages.
- Browser code and React UI dependencies do not belong here.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
