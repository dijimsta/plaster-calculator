# Web UI Guidelines

Applies to the web app, Storybook, `plaster-calculator-ui`, `uikit-web`, `@ui/atoms`, `@ui/molecules`,
`@ui/organisms`, and `@ui/templates`.

## Layers

`@ui/atoms` is the only layer that owns Tailwind class strings and style maps. Every layer above it — `@ui/molecules`,
`@ui/organisms`, `@ui/templates`, `uikit-web`, `plaster-calculator-ui`, and apps — composes only the tier(s) directly
beneath it, entirely through that tier's typed props, and holds no styling of its own (see [Presentation](#presentation)).

- `@ui/atoms` owns atoms: the smallest, non-composing visual primitives and their Tailwind implementation.
- `@ui/molecules` owns molecules: reusable compounds composed purely from `@ui/atoms` props.
- `@ui/organisms` owns organisms: composed sections built purely from `@ui/atoms` and `@ui/molecules` props.
- `@ui/templates` owns templates: framework- and domain-agnostic page-layout skeletons composed purely from
  `@ui/organisms`, `@ui/molecules`, and `@ui/atoms` props, with typed slots for consumer content.
- `uikit-web` owns application-agnostic compound components composed from those layers. It is migrating its
  remaining atom-, molecule-, and organism-level components out to `@ui/atoms`, `@ui/molecules`, and `@ui/organisms`
  incrementally.
- `plaster-calculator-ui` composes atoms, molecules, organisms, and UIKit into reusable domain molecules and
  organisms.
- Apps own framework integration, routing, page composition (including filling in `@ui/templates`), and
  infrastructure adapters.

## Purity

`@ui/atoms` and `@ui/molecules` must be pure: they render deterministically from their typed props alone, with no
dependency on ambient context, translation, or other runtime services. Consumers pass already-resolved strings as
props rather than these packages calling into i18n themselves.

`@ui/organisms` and `@ui/templates` may depend on `react-i18next` where a component owns default copy that isn't
threaded through props (e.g. an organism's own accessible label).

## Direction

`uikit-web` and `plaster-calculator-ui` are transitional and will ultimately be deprecated as their components
migrate into the atomic design libraries:

- `uikit-web` is retired once its remaining atom-, molecule-, and organism-level components have moved to
  `@ui/atoms`, `@ui/molecules`, and `@ui/organisms`.
- `plaster-calculator-ui` is retired by moving its domain-aware molecules and organisms into
  `apps/plaster-calculator-web`, composed directly from the `@ui/*` packages. Plaster Calculator domain UI does not
  need its own cross-app library once the atomic design libraries own the reusable, non-domain composition layer.

## Presentation

- `@ui/atoms` is the only package that holds Tailwind class strings and style maps. It keeps them in component style
  maps, composes them with `clsx`, and exposes typed presentation props.
- `@ui/molecules`, `@ui/organisms`, `@ui/templates`, UIKit, domain UI, story code, and application code must express
  layout and presentation entirely through the public props of the tier(s) they compose. Do not add Tailwind classes,
  new `className` values, CSS, style maps, inline styles, or raw layout markup at any of those layers.
- Existing application-owned styles may be migrated or removed but must not be expanded.
- Lucide icons are leaf content, not layout or presentation primitives.
- If `@ui/atoms` lacks a capability a higher layer needs, stop and propose the missing prop or new atom. Do not
  approximate it with a wrapper element or styling of your own at the layer that needs it.

## Framework and stories

- Shared UI libraries remain framework-agnostic: no Next.js imports, `"use client"`, routing, or app dependencies.
  Consuming apps declare framework boundaries.
- Stories live in `apps/storybook-web` and import UI libraries only through public package entry points.
