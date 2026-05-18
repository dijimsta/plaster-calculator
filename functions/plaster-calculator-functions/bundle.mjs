import { writeFileSync } from "node:fs";

import { build } from "esbuild";

import pkg from "./package.json" with { type: "json" };

const TAB_WIDTH = 4;
const WORKSPACE_PREFIX = "workspace:";

const [workspaceDependencies, external] = Object.entries(
    pkg.dependencies,
).reduce(
    (
        [previousWorkspaceDependencies, previousExternal],
        [dependency, version],
    ) => {
        if (version.startsWith(WORKSPACE_PREFIX)) {
            return [
                [...previousWorkspaceDependencies, dependency],
                previousExternal,
            ];
        } else {
            return [
                previousWorkspaceDependencies,
                [...previousExternal, dependency],
            ];
        }
    },
    [[], []],
);

// Bundle the code using esbuild
await build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node24",
    format: "esm",
    outdir: "dist",
    sourcemap: true,
    external,
});

// Update entry point and exports in package.json
pkg.main = "./dist/index.js";
pkg.exports = "./dist/index.js";

// Remove workspace dependencies from package.json
workspaceDependencies.forEach((dependency) => {
    delete pkg.dependencies[dependency];
});

// Write the modified package.json
writeFileSync("package.json", JSON.stringify(pkg, null, TAB_WIDTH));
