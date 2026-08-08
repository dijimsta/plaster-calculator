# ui/templates

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
and [web UI guidelines](../../docs/web-ui-guidelines.md).

`@ui/templates` is the framework- and application-agnostic page-layout layer for web interfaces in this workspace. It
provides templates: structural, page-level layouts that arrange `@ui/organisms`, `@ui/molecules`, and `@ui/atoms`
into slots, with no domain content and no application framework, routing, or data concerns.

This package is being introduced alongside `@ui/atoms`, `@ui/molecules`, and `@ui/organisms` as the top tier of the
application-agnostic UI layer stack. It has no existing components to migrate; templates are added here directly as
reusable page-level layouts are identified.

`@ui/templates` holds no Tailwind class strings or style maps of its own: templates compose `@ui/organisms`,
`@ui/molecules`, and `@ui/atoms` entirely through their typed props (see
[Presentation](../../docs/web-ui-guidelines.md#presentation)).

## Responsibilities

`@ui/templates` owns:

- Template-level layout components: the structural arrangement of organisms, molecules, and atoms into a full
  page-shaped layout with typed slots for consumer content, purely by arranging those components' typed props.
- Presentation APIs (typed props) for those layouts.
- Accessibility behaviour intrinsic to those layouts (e.g. landmark structure).

`@ui/templates` does not own:

- The organisms, molecules, and atoms it arranges (`@ui/organisms`, `@ui/molecules`, `@ui/atoms`).
- Tailwind class strings, style maps, CSS, or inline styles — only `@ui/atoms` owns styling.
- Domain content, data fetching, or routing for what fills a template's slots.
- Plaster Calculator domain concepts, schemas, or domain-aware molecules/organisms (`plaster-calculator-ui`).
- Actual page composition: applications choose a template, supply real content, and own routing.
- Next.js, Firebase, or other application-framework integrations.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, app code, or `uikit-web`.
- Only compose `@ui/atoms`, `@ui/molecules`, and `@ui/organisms`, entirely through their typed props. Do not add
  Tailwind classes, CSS, style maps, or inline styles here. If a lower tier can't express a needed capability,
  propose the missing prop or component in that package instead of working around it here.
- Organise components by name directly under `src/` (e.g. `src/sidebar-layout/`).
- Keep names kebab-case: `{name}.component.tsx` and `index.ts` inside the component folder.
- Keep component types with the component and export public APIs through barrels.
- Unlike `@ui/atoms` and `@ui/molecules`, which must stay pure (see
  [Purity](../../docs/web-ui-guidelines.md#purity)), templates may depend on the `react-i18next` peer dependency for
  copy the template owns itself rather than receiving via props. This is about content, not styling: templates still
  hold no Tailwind of their own.

## Public component APIs

`@ui/templates` props are deliberate component APIs, not extensions of React DOM attribute types. Components do not
accept `className` or raw accessibility attributes. Add an owned visual or semantic prop when consumers need a new
capability; `@ui/templates` is responsible for translating that prop into the composed lower-tier props, HTML
semantics, and accessibility attributes — not into styling of its own.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
