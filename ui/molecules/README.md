# ui/molecules

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md), and
[web UI guidelines](../../docs/web-ui-guidelines.md).

`@ui/molecules` is the molecular, framework- and application-agnostic React component layer for web interfaces in
this workspace. It provides molecules: small, reusable compounds that combine `@ui/atoms` primitives (and other
molecules) into a single presentation unit, such as a labelled form field or a combobox, with no domain awareness.

This package is being introduced to split molecules out of `uikit-web`, which had accumulated components spanning
multiple atomic design tiers alongside its atoms. Migration out of `uikit-web` happens incrementally as each molecule
is touched, not as a single rewrite.

`@ui/molecules` holds no Tailwind class strings or style maps of its own: molecules compose `@ui/atoms` entirely
through their typed props (see [Presentation](../../docs/web-ui-guidelines.md#presentation)).

## Responsibilities

`@ui/molecules` owns:

- Molecule-level visual components: reusable compounds that combine `@ui/atoms` primitives, and other molecules,
  into a single presentation unit, purely by arranging those components' typed props.
- Presentation APIs (typed props) for those molecules.
- Accessibility behaviour intrinsic to those molecules.

`@ui/molecules` does not own:

- Atomic (non-composing) primitives (`@ui/atoms`).
- Tailwind class strings, style maps, CSS, or inline styles — only `@ui/atoms` owns styling.
- Organism-level sections or page-level templates that compose molecules (`@ui/organisms`, `@ui/templates`).
- Plaster Calculator domain concepts, schemas, or domain-aware molecules/organisms (`plaster-calculator-ui`).
- Data fetching, service contexts, or application state.
- Next.js, Firebase, routing, or other application-framework integrations.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, app code, or `uikit-web`.
- Only compose `@ui/atoms` and other `@ui/molecules` components, entirely through their typed props. Do not add
  Tailwind classes, CSS, style maps, or inline styles here. If `@ui/atoms` can't express a needed capability, propose
  a new atom or atom prop instead of working around it in this package.
- Organise components by name directly under `src/` (e.g. `src/combobox/`).
- Keep names kebab-case: `{name}.component.tsx` and `index.ts` inside the component folder.
- Keep component types with the component and export public APIs through barrels.
- Components must be pure (see [Purity](../../docs/web-ui-guidelines.md#purity)): render deterministically from
  typed props alone, with no `react-i18next` or other ambient context dependency. Accept already-resolved strings as
  props.

## Public component APIs

`@ui/molecules` props are deliberate component APIs, not extensions of React DOM attribute types. Components do not
accept `className` or raw accessibility attributes. Add an owned visual or semantic prop when consumers need a new
capability; `@ui/molecules` is responsible for translating that prop into the composed `@ui/atoms` props, HTML
semantics, and accessibility attributes — not into styling of its own.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
