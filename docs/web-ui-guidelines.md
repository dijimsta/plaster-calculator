# Web UI Guidelines

Applies to the web app, Storybook, `plaster-calculator-ui`, and `uikit-web`.

## Layers

- `uikit-web` owns application-agnostic visual primitives and their Tailwind implementation.
- `plaster-calculator-ui` composes UIKit into reusable domain molecules and organisms.
- Apps own framework integration, routing, page composition, and infrastructure adapters.

## Presentation

- Application, domain UI, and story code must express layout and presentation through public UIKit APIs. Do not add
  Tailwind classes, new `className` values, CSS, style maps, inline styles, or raw layout markup there.
- Existing application-owned styles may be migrated or removed but must not be expanded.
- Lucide icons are leaf content, not layout or presentation primitives.
- If UIKit lacks a capability, stop and propose the missing responsibility and typed API. Do not approximate it in the
  consumer.
- UIKit keeps Tailwind strings in component style maps, composes them with `clsx`, and exposes typed presentation props.

## Framework and stories

- Shared UI libraries remain framework-agnostic: no Next.js imports, `"use client"`, routing, or app dependencies.
  Consuming apps declare framework boundaries.
- Stories live in `apps/storybook-web` and import UI libraries only through public package entry points.
