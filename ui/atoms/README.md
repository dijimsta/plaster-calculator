# ui/atoms

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md), and
[web UI guidelines](../../docs/web-ui-guidelines.md).

`@ui/atoms` is the atomic, framework- and application-agnostic React primitive layer for web interfaces in this
workspace. It provides atoms only: the smallest presentational building blocks (headings, text, form controls, and
similar) with no composition of other components.

This package is being introduced to split atoms out of `uikit-web`, which had accumulated compound and molecule-level
components alongside its atoms. Migration out of `uikit-web` happens incrementally as each atom is touched, not as a
single rewrite.

`@ui/atoms` is the only package in the `@ui/*` stack that owns Tailwind class strings and style maps. Every layer
above it composes atoms entirely through these typed props instead of styling itself (see
[Presentation](../../docs/web-ui-guidelines.md#presentation)).

## Responsibilities

`@ui/atoms` owns:

- Atomic visual components: single-purpose primitives that do not compose other components.
- Presentation APIs (typed props) and their Tailwind implementation for those atoms.
- Accessibility behaviour intrinsic to those atoms.

`@ui/atoms` does not own:

- Compound or molecule-level components that compose multiple atoms (`uikit-web`).
- Plaster Calculator domain concepts, schemas, or domain-aware molecules/organisms (`plaster-calculator-ui`).
- Data fetching, service contexts, or application state.
- Next.js, Firebase, routing, or other application-framework integrations.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, app code, or `uikit-web`.
- Organise components by name directly under `src/` (e.g. `src/heading/`); every component in this package is an atom,
  so no additional tier folder is needed.
- Keep names kebab-case: `{name}.component.tsx`, `{name}.styles.ts`, and `index.ts` inside the component folder.
- Keep component types with the component, style unions with the style map, and export public APIs through barrels.
- Components must be pure (see [Purity](../../docs/web-ui-guidelines.md#purity)): render deterministically from
  typed props alone, with no `react-i18next` or other ambient context dependency. Accept already-resolved strings as
  props.

## Public component APIs

`@ui/atoms` props are deliberate component APIs, not extensions of React DOM attribute types. Components do not
accept `className` or raw accessibility attributes. Add an owned visual or semantic prop when consumers need a new
capability; `@ui/atoms` is responsible for translating that prop into styling, HTML semantics, and accessibility
attributes.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
