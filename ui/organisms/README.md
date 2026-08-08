# ui/organisms

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
and [web UI guidelines](../../docs/web-ui-guidelines.md).

`@ui/organisms` is the organism-level, framework- and application-agnostic React component layer for web interfaces
in this workspace. It provides organisms: composed sections that combine `@ui/atoms` and `@ui/molecules` (and other
organisms) into larger, still domain-agnostic units, such as a navbar or a sidebar, with no domain awareness.

This package is being introduced to split organisms out of `uikit-web`, which had accumulated components spanning
multiple atomic design tiers alongside its atoms. Migration out of `uikit-web` happens incrementally as each organism
is touched, not as a single rewrite.

`@ui/organisms` holds no Tailwind class strings or style maps of its own: organisms compose `@ui/atoms` and
`@ui/molecules` entirely through their typed props (see [Presentation](../../docs/web-ui-guidelines.md#presentation)).

## Responsibilities

`@ui/organisms` owns:

- Organism-level visual components: composed sections that combine `@ui/atoms` and `@ui/molecules`, and other
  organisms, into a single presentation unit, purely by arranging those components' typed props.
- Presentation APIs (typed props) for those organisms.
- Accessibility behaviour intrinsic to those organisms.

`@ui/organisms` does not own:

- Atomic or molecular primitives that this package composes (`@ui/atoms`, `@ui/molecules`).
- Tailwind class strings, style maps, CSS, or inline styles — only `@ui/atoms` owns styling.
- Page-level templates that arrange organisms into a full layout (`@ui/templates`).
- Plaster Calculator domain concepts, schemas, or domain-aware molecules/organisms (`plaster-calculator-ui`).
- Data fetching, service contexts, or application state.
- Next.js, Firebase, routing, or other application-framework integrations.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, app code, or `uikit-web`.
- Only compose `@ui/atoms`, `@ui/molecules`, and other `@ui/organisms` components, entirely through their typed
  props. Do not add Tailwind classes, CSS, style maps, or inline styles here. If `@ui/atoms` or `@ui/molecules`
  can't express a needed capability, propose the missing prop or component in that package instead of working around
  it here.
- Organise components by name directly under `src/` (e.g. `src/navbar/`).
- Keep names kebab-case: `{name}.component.tsx` and `index.ts` inside the component folder.
- Keep component types with the component and export public APIs through barrels.
- Unlike `@ui/atoms` and `@ui/molecules`, which must stay pure (see
  [Purity](../../docs/web-ui-guidelines.md#purity)), organisms may depend on the `react-i18next` peer dependency for
  copy the organism owns itself rather than receiving via props. This is about content, not styling: organisms still
  hold no Tailwind of their own.

## Public component APIs

`@ui/organisms` props are deliberate component APIs, not extensions of React DOM attribute types. Components do not
accept `className` or raw accessibility attributes. Add an owned visual or semantic prop when consumers need a new
capability; `@ui/organisms` is responsible for translating that prop into the composed `@ui/atoms`/`@ui/molecules`
props, HTML semantics, and accessibility attributes — not into styling of its own.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
