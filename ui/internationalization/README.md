# Internationalization

`@ui/internationalization` is the framework- and application-agnostic internationalization layer for web interfaces
in this workspace. It is shared across apps and other UI packages that need locale-handling primitives without
depending on Plaster Calculator domain code.

## Responsibilities

`@ui/internationalization` owns:

- Framework-agnostic i18next/react-i18next configuration and setup helpers.
- Shared typing utilities for translation resources and namespaces.

`@ui/internationalization` does not own:

- Plaster Calculator domain translation strings, which stay with the package that defines them (e.g.
  `plaster-calculator-ui`).
- Next.js, Firebase, routing, or other application-framework integrations.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, or app code.
- Export public APIs through `src/index.ts`.
