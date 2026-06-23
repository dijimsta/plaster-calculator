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
- Style map file: `{name}.styles.ts`
- Barrel: `index.ts`
- Story: `{name}.stories.tsx`
- Folder: `{name}/` (e.g. `button/`, `full-viewport-height-container/`)

Example structure for a component:

```text
src/
  button/
    button.component.tsx   ← component + types
    button.styles.ts       ← style and variant className maps
    index.ts               ← re-exports
  stories/
    button.stories.tsx
```

## Styling

Use `clsx` for all `className` values.

All Tailwind class strings used by a component should live in that component's `{name}.styles.ts` file. Components should compose those exported style maps with `clsx(...)` and only pass through consumer-provided `className` values inline.

No custom CSS files. Tailwind is loaded via `import "tailwindcss/index.css"` in `.storybook/preview.tsx`.

## Module Imports

Import using the actual source extension (`.ts` or `.tsx`). `allowImportingTsExtensions` is enabled and `rewriteRelativeImportExtensions` rewrites them to `.js` in the emitted output:

```ts
import { Button } from "./button.component.tsx";
import type { ButtonVariant } from "./button.styles.ts";
```

This applies to source files, index barrels, and story files.

## Types

Component-specific types live in `{name}.component.tsx`. Variant union types live in `{name}.styles.ts` and are re-exported from `index.ts`.

```ts
// button/index.ts
export { Button } from "./button.component.tsx";
export type {
    ButtonIconPosition,
    ButtonProps,
    ButtonSize,
} from "./button.component.tsx";
export type { ButtonVariant } from "./button.styles.ts";
```
