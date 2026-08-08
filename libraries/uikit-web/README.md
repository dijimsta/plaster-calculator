# UIKit Web

`@libraries/uikit-web` is the framework- and application-agnostic React component library for web interfaces in this
workspace. It provides framework-agnostic compound components: reusable visual primitives such as buttons, badges,
cards, and layout components that compose one or more atoms.

Atoms (the smallest, non-composing primitives such as headings) live in `@ui/atoms`, molecules in `@ui/molecules`,
and organisms in `@ui/organisms`. UIKit is migrating its atom-, molecule-, and organism-level components out to those
packages incrementally as each one is touched, rather than as a single rewrite — so some existing UIKit components
are still atoms, molecules, or organisms in practice until that migration reaches them.

UIKit is transitional: see [Direction](../../docs/web-ui-guidelines.md#direction) for why it is ultimately
deprecated once that migration is complete. Components that are still atoms or molecules in practice must already
follow the [Purity](../../docs/web-ui-guidelines.md#purity) rule that applies to `@ui/atoms` and `@ui/molecules`, so
they migrate out unchanged.

UIKit components own their presentation APIs and Tailwind implementation. Consumers compose those APIs instead of
adding application CSS or utility classes.

## Responsibilities

UIKit owns:

- Framework-agnostic compound components that compose one or more atoms.
- Layout, spacing, colour, state, and responsive presentation APIs.
- Accessibility behaviour intrinsic to those components.
- Reusable capabilities required by more than one application or domain pattern.

UIKit does not own:

- Atomic, molecule-, and organism-level components already split out — see `@ui/atoms`, `@ui/molecules`, and
  `@ui/organisms`.
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
