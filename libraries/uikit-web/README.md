# UIKit Web

`@libraries/uikit-web` is the framework- and application-agnostic React component library for web interfaces in this
workspace. It provides framework-agnostic compound components: reusable visual primitives such as buttons, badges,
cards, and layout components that compose one or more atoms.

Atoms (the smallest, non-composing primitives such as headings) live in `@ui/atoms`. UIKit is migrating its
atom-level components out to `@ui/atoms` incrementally as each one is touched, rather than as a single rewrite — so
some existing UIKit components are still atoms in practice until that migration reaches them.

UIKit components own their presentation APIs and Tailwind implementation. Consumers compose those APIs instead of
adding application CSS or utility classes.

## Responsibilities

UIKit owns:

- Framework-agnostic compound components that compose one or more atoms.
- Layout, spacing, colour, state, and responsive presentation APIs.
- Accessibility behaviour intrinsic to those components.
- Reusable capabilities required by more than one application or domain pattern.

UIKit does not own:

- Atomic (non-composing) primitives — see `@ui/atoms`.
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

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
