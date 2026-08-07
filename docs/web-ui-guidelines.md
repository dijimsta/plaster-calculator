# Web UI Guidelines

Applies to the web app, Storybook, `plaster-calculator-ui`, `uikit-web`, and `@ui/atoms`.

## Layers

- `@ui/atoms` owns atoms: the smallest, non-composing visual primitives and their Tailwind implementation.
- `uikit-web` owns application-agnostic compound components composed from those atoms. It is migrating its remaining
  atom-level components out to `@ui/atoms` incrementally.
- `plaster-calculator-ui` composes atoms and UIKit into reusable domain molecules and organisms.
- Apps own framework integration, routing, page composition, and infrastructure adapters.

## Presentation

- Application, domain UI, and story code must express layout and presentation through public `@ui/atoms` and UIKit
  APIs. Do not add Tailwind classes, new `className` values, CSS, style maps, inline styles, or raw layout markup
  there.
- Existing application-owned styles may be migrated or removed but must not be expanded.
- Lucide icons are leaf content, not layout or presentation primitives.
- If `@ui/atoms` or UIKit lacks a capability, stop and propose the missing responsibility and typed API. Do not
  approximate it in the consumer.
- `@ui/atoms` and UIKit keep Tailwind strings in component style maps, compose them with `clsx`, and expose typed
  presentation props.

## Framework and stories

- Shared UI libraries remain framework-agnostic: no Next.js imports, `"use client"`, routing, or app dependencies.
  Consuming apps declare framework boundaries.
- Stories live in `apps/storybook-web` and import UI libraries only through public package entry points.
