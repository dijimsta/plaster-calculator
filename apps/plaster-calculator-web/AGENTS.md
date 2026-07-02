# AGENTS.md — TypeScript Style Guide

> Based on [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

---

## 1. Guiding Principles

- **Clarity over cleverness.** Code is read far more than it is written.
- **Small, focused units.** Every file, class, and function does one thing well.
- **Explicit over implicit.** Prefer obvious types, names, and structures.
- **Fail loudly.** Prefer strict types and early errors over silent bugs.

---

## 2. File & Module Structure

### File layout (top to bottom)

1. Optional `@fileoverview` JSDoc
2. Imports (grouped: external → internal → relative)
3. Constants / module-level declarations
4. Exported types / interfaces
5. Exported classes / functions

### File naming

- Use `kebab-case` for filenames: `plaster-calculator.ts`, `mix-ratio.service.ts`
- One primary export per file. The filename should reflect the export.

### Imports

```ts
// ✅ Named imports — prefer these
import { MixRatio } from './mix-ratio';
import { formatWeight } from '../utils/format';

// ✅ Namespace import — use for large APIs with many symbols
import * as validation from './validation';

// ❌ Default imports — avoid (makes refactoring harder)
export default class Calculator { ... }
```

- Use `import type { Foo }` when the symbol is only used as a type.
- Use relative imports (`./`, `../`) within the same project. Avoid deep chains (`../../../`); restructure instead.
- Never use `require()`. Always use ES6 `import`.

### Exports

```ts
// ✅ Named exports only
export class PlasterCalculator { ... }
export const MAX_RATIO = 2.5;
export function computeMix(ratio: MixRatio): Mix { ... }

// ❌ No default exports
export default class PlasterCalculator { ... }

// ❌ No mutable exports
export let currentRatio = 1.5; // use a getter function instead
```

---

## 3. Class Design — Keeping Classes Small

> **The single most common source of problems: classes that try to do too much.**

### Rules

- A class should have **one clear responsibility**. If you need "and" to describe what it does, split it.
- **Max ~150–200 lines** per class (excluding JSDoc/comments) is a strong signal to refactor.
- Prefer **standalone exported functions** over static utility classes.

### Split large classes by extracting

| Pattern                              | When to apply                                                  |
| ------------------------------------ | -------------------------------------------------------------- |
| Extract a **service**                | Logic for fetching/saving data mixed into a UI component       |
| Extract a **helper module**          | Static utility methods that don't use `this`                   |
| Extract a **sub-class or interface** | A class has multiple "modes" or conceptually separate concerns |
| Extract a **type/interface file**    | A class is half-types, half-logic                              |

```ts
// ❌ Too broad
class PlasterCalculator {
  fetchMaterials() { ... }
  computeRatio() { ... }
  renderForm() { ... }
  validateInput() { ... }
  exportToPdf() { ... }
}

// ✅ Focused classes
class MixRatioCalculator {
  computeRatio(water: number, plaster: number): Ratio { ... }
}

// standalone helpers — no class needed
export function validateInput(input: unknown): input is MixInput { ... }
export function formatRatio(r: Ratio): string { ... }
```

### Avoid static container classes

```ts
// ❌ Namespace disguised as a class
class Utils {
  static formatWeight(g: number): string { ... }
  static clamp(n: number, min: number, max: number): number { ... }
}

// ✅ Just export functions from a module
export function formatWeight(g: number): string { ... }
export function clamp(n: number, min: number, max: number): number { ... }
```

### Class member order

1. `static readonly` constants
2. `readonly` instance properties
3. Private fields
4. Constructor
5. Public methods
6. Private methods

---

## 4. Variables & Functions

```ts
// ✅ const by default, let only when reassigned, never var
const ratio = 1.5;
let attempt = 0;

// ✅ One variable per declaration
const a = 1;
const b = 2;
// ❌ const a = 1, b = 2;

// ✅ Descriptive names — no single letters except loop counters
const waterVolumeL = computeWater(mix);

// ✅ Boolean names start with is/has/can/should
const isValid = validate(input);
const hasError = errors.length > 0;
```

### Functions

- Keep functions **under ~30 lines**. Extract helpers liberally.
- Prefer pure functions (no side effects, same input → same output).
- Avoid more than **3 parameters**; use an options object instead.

```ts
// ❌ Too many positional args
function computeMix(water: number, plaster: number, temp: number, unit: string) { ... }

// ✅ Options object
interface MixOptions {
  waterL: number;
  plasterKg: number;
  tempCelsius?: number;
  unit?: 'metric' | 'imperial';
}
function computeMix(options: MixOptions): MixResult { ... }
```

---

## 5. Types & Interfaces

- Always annotate **public API** return types and parameters explicitly.
- Use `interface` for object shapes; use `type` for unions, intersections, and aliases.
- Prefer `readonly` on properties that should not be mutated after construction.
- Never use `any`. Use `unknown` and narrow with type guards when the type is truly unknown.
- Avoid non-null assertions (`!`). Use optional chaining (`?.`) or explicit guards instead.

```ts
// ✅
interface MixRatio {
  readonly water: number;
  readonly plaster: number;
}

type Unit = 'metric' | 'imperial';

function getLabel(unit: Unit): string { ... }

// ❌
function doStuff(x: any) { ... }
const value = maybeNull!.property;
```

---

## 6. Classes — Detailed Rules

### Constructor

```ts
// ✅ Use parameter properties for simple injection
class MixCalculator {
    constructor(
        private readonly validator: InputValidator,
        private readonly formatter: OutputFormatter,
    ) {}
}
```

- Always call `new Foo()` with parentheses, even with no arguments.
- Do not write empty constructors unless they have a visibility modifier or decorators.
- Mark properties never reassigned after the constructor as `readonly`.
- Initialize fields at declaration when possible — often eliminates the constructor entirely.

### Visibility

- Use TypeScript `private` / `protected` / `public`, not `#privateFields`.
- Default to `private`. Only widen to `protected` or `public` when necessary.
- Do not use `obj['field']` to bypass visibility.

### Getters & setters

```ts
// ✅ Getters must be pure (no side effects)
get totalWeight(): number {
  return this.water + this.plaster;
}
```

---

## 7. Control Flow & Patterns

```ts
// ✅ Prefer for...of over for...in (which includes prototype chain)
for (const item of items) { ... }
for (const [key, value] of Object.entries(obj)) { ... }

// ✅ Prefer array methods for transformations
const weights = mixes.map(m => m.totalWeight);
const heavy = mixes.filter(m => m.totalWeight > 10);

// ✅ Short-circuit defaults
const unit = options.unit ?? 'metric';
const label = mix?.label ?? 'Unknown';
```

---

## 8. Naming Conventions

| Construct                | Convention         | Example                        |
| ------------------------ | ------------------ | ------------------------------ |
| Classes                  | `PascalCase`       | `MixRatioCalculator`           |
| Interfaces               | `PascalCase`       | `MixOptions`                   |
| Type aliases             | `PascalCase`       | `WeightUnit`                   |
| Enums                    | `PascalCase`       | `MixState`                     |
| Enum values              | `UPPER_SNAKE_CASE` | `MixState.NOT_STARTED`         |
| Functions & methods      | `camelCase`        | `computeRatio()`               |
| Variables & parameters   | `camelCase`        | `waterVolumeL`                 |
| Constants (module-level) | `UPPER_SNAKE_CASE` | `MAX_PLASTER_KG`               |
| Files                    | `kebab-case`       | `mix-ratio-calculator.ts`      |
| Test files               | `*.test.ts`        | `mix-ratio-calculator.test.ts` |

---

## 9. Comments & JSDoc

- Write comments that explain **why**, not **what** (the code shows what).
- Use JSDoc (`/** */`) for all exported symbols.
- Use `//` for inline implementation notes.

```ts
/**
 * Computes the optimal plaster-to-water ratio for casting.
 * Ratios above MAX_RATIO produce brittle results.
 */
export function computeRatio(options: MixOptions): Ratio {
  // Clamp to safe range before any calculation — inputs from the UI
  // can exceed physical limits if the user types freely.
  const safeWater = clamp(options.waterL, 0, MAX_WATER_L);
  ...
}
```

---

## 10. Quick Refactor Checklist

Before marking a PR ready, verify:

- [ ] No class exceeds ~150 lines (excluding JSDoc)
- [ ] No function exceeds ~30 lines
- [ ] No file has more than one primary export responsibility
- [ ] No `any` types (use `unknown` + type guard if needed)
- [ ] All public APIs have explicit return type annotations
- [ ] No default exports
- [ ] No `var` declarations
- [ ] `readonly` used on all properties that don't change after construction
- [ ] Static utility methods extracted to standalone functions in a helper module
- [ ] File name matches its primary export

---
