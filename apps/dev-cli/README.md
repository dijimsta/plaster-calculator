# Dev CLI

`@apps/dev-cli` provides repository development and deployment tooling that is exposed through the `dev-cli` binary.
It is implemented with NestJS and `nest-commander`.

## Bundle command

The current `bundle` command prepares a TypeScript Firebase Functions package for deployment:

```bash
pnpm --filter @functions/plaster-calculator-functions run bundle
```

The command:

- Bundles `src/index.ts` to `dist/index.js` with esbuild for Node.js 24.
- Leaves third-party runtime dependencies external.
- Bundles workspace dependencies that Firebase Cloud Build cannot resolve.
- Removes development dependencies that are not needed by the deployment artifact.
- Rewrites the target package's `main`, `exports`, and runtime dependency entries for deployment.

Because bundling mutates the target `package.json`, use it only as part of the intended deployment workflow and review
the resulting changes when running it manually. The command always rewrites the manifest in the directory passed to
`--dir`, even when it is invoked from another working directory.

## Build

From the repository root:

```bash
pnpm build
pnpm lint
pnpm format
```
