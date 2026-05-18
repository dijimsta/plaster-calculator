import { readFileSync, writeFileSync } from "node:fs";

import { build } from "esbuild";

const TAB_WIDTH = 4;
const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const deployPkg = structuredClone(pkg);

// Remove workspace dependencies from the bundled package.json
Object.keys(deployPkg.dependencies).forEach((dependency) => {
    if (deployPkg.dependencies[dependency].startsWith("workspace:")) {
        delete deployPkg.dependencies[dependency];
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
    sourcemap: true,
    external: Object.keys(pkg.dependencies),
});

// Update entry point and exports in package.json
deployPkg.main = "./dist/index.js";
deployPkg.exports = "./dist/index.js";

// Write deployment metadata beside the bundled output without mutating source.
writeFileSync("package.json", JSON.stringify(deployPkg, null, TAB_WIDTH));
