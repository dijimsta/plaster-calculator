# UIKit Web

`@libraries/uikit-web` is the framework- and application-agnostic React component library for web interfaces in this
workspace. It provides the atomic design layer: reusable visual primitives such as buttons, badges, text, cards, and
layout components.

UIKit components own their presentation APIs and Tailwind implementation. Consumers compose those APIs instead of
adding application CSS or utility classes.

## Responsibilities

UIKit owns:

- Atomic visual components and framework-agnostic compound components.
- Layout, spacing, colour, state, and responsive presentation APIs.
- Accessibility behaviour intrinsic to those components.
- Reusable capabilities required by more than one application or domain pattern.

UIKit does not own:

- Plaster Calculator domain concepts or schemas.
- Data fetching, service contexts, or application state.
- Next.js, Firebase, routing, or other application-framework integrations.
- Domain patterns such as questionnaire template cards.

## Extending UIKit

When a consuming pattern cannot be expressed using the public UIKit API, propose the missing responsibility and API
here. Do not work around a missing capability with consumer-owned class names, CSS, or inline styles.

Consumer-facing stories live in `apps/storybook-web` and import UIKit through `@libraries/uikit-web`.

## Public component APIs

UIKit props are deliberate component APIs, not extensions of React DOM attribute types. Components do not accept
`className` or raw accessibility attributes. Add an owned visual or semantic prop when consumers need a new capability;
UIKit is responsible for translating that prop into styling, HTML semantics, and accessibility attributes.

## Conventions

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, or app code.
- Keep names kebab-case: `{name}.component.tsx`, `{name}.styles.ts`, and `index.ts` inside the component folder.
- Keep component types with the component, style unions with the style map, and export public APIs through barrels.
- Use TypeScript namespaces only when a compound API clearly expresses component ownership.
