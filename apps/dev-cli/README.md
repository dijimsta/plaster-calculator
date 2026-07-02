# Dev CLI

`@apps/dev-cli` provides repository development and deployment tooling that is exposed through the `dev-cli` binary.
It is implemented with NestJS and `nest-commander`.

## Bundle command

The current `bundle` command prepares a TypeScript Firebase Functions package for deployment:

```bash
pnpm --filter @inivi/plaster-calculator-functions bundle
```

The command:

- Bundles `src/index.ts` to `dist/index.js` with esbuild for Node.js 24.
- Leaves third-party runtime dependencies external.
- Bundles workspace dependencies that Firebase Cloud Build cannot resolve.
- Rewrites the target package's `main`, `exports`, and workspace dependency entries for deployment.

Because bundling mutates the target `package.json`, use it only as part of the intended deployment workflow and review
the resulting changes when running it manually.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
