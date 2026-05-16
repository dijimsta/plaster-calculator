import { readFileSync, writeFileSync } from "node:fs";

import { build } from "esbuild";

const TAB_WIDTH = 4;
const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

// Remove workspace dependencies from the bundled package.json
Object.keys(pkg.dependencies).forEach((dependency) => {
    if (pkg.dependencies[dependency].startsWith("workspace:")) {
        delete pkg.dependencies[dependency];
    }
});

// Bundle the code using esbuild
await build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node24",
    format: "esm",
    outdir: "dist",
    external: Object.keys(pkg.dependencies),
});

// Write the modified package.json to the dist directory
writeFileSync("package.json", JSON.stringify(pkg, null, TAB_WIDTH));
