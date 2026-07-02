# uikit-web

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md), and
[web UI guidelines](../../docs/web-ui-guidelines.md).

- Do not depend on Plaster Calculator domains, services, Firebase, Next.js, or app code.
- Keep names kebab-case: `{name}.component.tsx`, `{name}.styles.ts`, and `index.ts` inside the component folder.
- Keep component types with the component, style unions with the style map, and export public APIs through barrels.
- Use TypeScript namespaces only when a compound API clearly expresses component ownership.
