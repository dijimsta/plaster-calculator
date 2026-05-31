# uikit-web

React component library built with Tailwind CSS v4. No CSS modules, no custom design tokens — use Tailwind's default utility classes directly.

## Build

```bash
tsc --build tsconfig.build.json
```

Output goes to `out/`. Storybook dev server runs via `storybook dev --port 6006`.

## File & Folder Naming

All names are lowercase kebab-case.

- Component file: `{name}.component.tsx`
- Variant map file: `{name}.variants.ts` (only when variants exist)
- Barrel: `index.ts`
- Story: `{name}.stories.tsx`
- Folder: `{name}/` (e.g. `button/`, `full-viewport-height-container/`)

Example structure for a component with variants:

```
src/
  button/
    button.component.tsx   ← component + types
    button.variants.ts     ← variant className map
    index.ts               ← re-exports
  stories/
    button.stories.tsx
```

## Styling

Use `clsx` for all `className` values, passing each class as a separate argument so Prettier can reflow them across lines:

```tsx
<div className={clsx("flex", "items-center", "gap-3")} />
```

Base styles go inline in the component as a `clsx(...)` call. Variant styles go in `{name}.variants.ts` as a `Record<Variant, string>`.

No custom CSS files. Tailwind is loaded via `import "tailwindcss/index.css"` in `.storybook/preview.tsx`.

## Module Imports

Import using the actual source extension (`.ts` or `.tsx`). `allowImportingTsExtensions` is enabled and `rewriteRelativeImportExtensions` rewrites them to `.js` in the emitted output:

```ts
import { Button } from "./button.component.tsx";
import type { ButtonVariant } from "./button.variants.ts";
```

This applies to source files, index barrels, and story files.

## Types

Component-specific types live in `{name}.component.tsx`. Variant union types live in `{name}.variants.ts` and are re-exported from `index.ts`.

```ts
// button/index.ts
export { Button } from "./button.component.tsx";
export type {
    ButtonIconPosition,
    ButtonProps,
    ButtonSize,
} from "./button.component.tsx";
export type { ButtonVariant } from "./button.variants.ts";
```
