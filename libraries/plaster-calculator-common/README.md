# Plaster Calculator Common

`@libraries/plaster-calculator-common` contains platform-neutral domain contracts shared by browser and Node.js
packages. It is the source of truth for runtime schemas, inferred domain types, and service interfaces.

## Responsibilities

The library may contain:

- Zod schemas and their inferred TypeScript types.
- Domain constants and platform-neutral value types.
- Service interfaces that describe application capabilities.

It must not contain:

- React components, hooks, contexts, or presentation models.
- Firebase, HTTP, storage, or other infrastructure implementations.
- UIKit or application-framework dependencies.

## Service contracts

A service interface belongs here when it represents a capability shared across layers or applications. For example,
`QuestionnaireTemplateService` can describe listing, duplicating, and deleting questionnaire templates without
specifying whether Firebase, HTTP, or an in-memory stub performs the work.

Service contracts use domain data and must not encode loading spinners, toast behaviour, React state, or transport
details. Production implementations belong in their consuming application or infrastructure library.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
