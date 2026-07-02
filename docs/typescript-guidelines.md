# TypeScript Guidelines

Applies to handwritten TypeScript packages that reference this document.

- Prefer an explicit `else` when both an `if` branch and its alternative return.
- Use kebab-case filenames and named, immutable exports. Prefer one primary responsibility per file.
- Use `import type` for type-only imports, relative imports within a package, and public entry points across packages.
  Never use `require()` in TypeScript source.
- Give public APIs explicit parameter and return types plus concise JSDoc. Use interfaces for object shapes and type
  aliases for unions or intersections.
- Prefer readonly data, `unknown` over `any`, explicit narrowing over non-null assertions, and `const` over `let`. Never
  use `var`.
- Keep functions under roughly 30 lines and classes under roughly 150–200 lines. Prefer an options object beyond three
  parameters, and extract pure helpers instead of static utility containers.
- Default class members to private, use TypeScript `private` rather than `#` fields, and mark stable members readonly.
  Call constructors with parentheses and omit empty constructors.
- Prefer `for...of` or array transformations over `for...in`. Use descriptive camelCase names and boolean prefixes such
  as `is`, `has`, `can`, or `should`; reserve UPPER_SNAKE_CASE for module constants.
- Write comments that explain why, and export public APIs through the nearest barrel and package `src/index.ts`.
