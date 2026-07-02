# Plaster Calculator Web

`@inivi/plaster-calculator-web` is the Next.js web application for Plaster Calculator. It provides authenticated
project workflows, account management, questionnaire screens, PDF and floorplan editing, and Firebase-backed client
integration.

## Architecture

- Use `@libraries/uikit-web` for application-agnostic presentation primitives.
- Use `@libraries/plaster-calculator-ui` for reusable domain-aware patterns when available.
- Keep Next.js routing, client boundaries, Firebase client adapters, and application composition in this app.
- Use `@libraries/plaster-calculator-common` contracts indirectly through domain UI or add an explicit dependency when
  application code needs those public contracts directly.

Application-specific presentation must follow `AGENTS.md`: do not add raw Tailwind classes, inline styles, or new
app-owned style helpers. Extend UIKit when a reusable presentation capability is missing.

## Development

From the repository root:

```bash
pnpm --filter @inivi/plaster-calculator-web dev
```

The Firebase emulator suite starts this command automatically for App Hosting when running the repository emulator
workflow.

## Build and verification

```bash
pnpm build
pnpm lint
pnpm format
```

Do not commit local environment files, Firebase credentials, or generated `.next` output.
