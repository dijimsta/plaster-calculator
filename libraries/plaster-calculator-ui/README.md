# Plaster Calculator UI

`@libraries/plaster-calculator-ui` contains reusable, domain-aware React patterns for Plaster Calculator applications.
It bridges platform-neutral domain contracts from `plaster-calculator-common` with presentation primitives from
`uikit-web`.

## Atomic design boundary

This workspace applies atomic design through package responsibilities:

- `uikit-web` owns atoms and application-agnostic compound components.
- `plaster-calculator-ui` composes those atoms into domain-aware molecules and organisms.
- Applications own page templates, routing, infrastructure, and feature orchestration specific to that application.

Components are organised by domain namespace, such as `questionnaires/`, rather than by generic `molecules/` and
`organisms/` folders. Atomic design describes the composition boundary, while domain folders preserve discoverability.

## Composition and styling

Patterns must be composed entirely from public `@libraries/uikit-web` components. Do not introduce new Tailwind class
names, CSS files, style maps, CSS modules, or inline styles in this library. Lucide icons may be used as leaf content;
they must not provide layout or presentation structure.

If UIKit cannot express a required layout or visual treatment, stop and discuss the missing component responsibility
and proposed API. Add the reusable capability to UIKit before continuing the domain pattern.

Existing consumer class-name workarounds are technical debt and must not be expanded. Migrate them to typed UIKit APIs
when the affected pattern is changed.

## Services and React context

Platform-neutral service interfaces live in `plaster-calculator-common`. This library may provide React context,
providers, and hooks that make those services available to domain patterns without prop drilling.

The raw context should remain private. Export a typed provider and a hook that throws a clear error when no provider is
present. The provider accepts a stable service instance:

```tsx
<QuestionnaireTemplateServiceProvider service={questionnaireTemplateService}>
    {children}
</QuestionnaireTemplateServiceProvider>
```

The context is an injection mechanism, not an infrastructure implementation. This library must not call Firebase,
hard-code URLs, read environment variables, or implement application authentication. Applications supply production
service implementations; Storybook supplies deterministic stubs.

Presentational components should remain independently usable where practical. Connected patterns may own loading,
empty, error, success, retry, and cancellation behaviour by consuming an injected service.

## Framework boundary

The library is React-aware but application-framework-agnostic. Do not add Next.js imports or directives such as
`"use client"`. A consuming application declares its framework boundary.

## Stories

Stories live in `apps/storybook-web` and import this package through `@libraries/plaster-calculator-ui`. Stories should
exercise meaningful domain and service states with local stubs.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
