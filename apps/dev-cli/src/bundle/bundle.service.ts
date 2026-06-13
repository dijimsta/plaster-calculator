import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Injectable } from "@nestjs/common";
import { build } from "esbuild";

import { TAB_WIDTH, WORKSPACE_PREFIX } from "./bundle.constants.ts";
import { PackageJsonSchema } from "./schemas/package.json.schema.ts";

@Injectable()
export class BundleService {
    public async bundle(directory: string): Promise<void> {
        const path = resolve(directory, "package.json");
        const text = await readFile(path, "utf-8");
        const json = JSON.parse(text);
        const { dependencies = {}, devDependencies = {} } =
            PackageJsonSchema.parse(json);

        const [workspaceDependencies, external] = Object.entries(
            dependencies,
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
            [[] as readonly string[], [] as readonly string[]],
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
            external: [...external],
        });

        // Update entry point and exports in the original package.json
        json.main = "./dist/index.js";
        json.exports = "./dist/index.js";

        // Workspace packages are bundled and cannot be resolved by Cloud Build's npm install.
        workspaceDependencies.forEach((dependency) => {
            delete json.dependencies[dependency];
        });
        Object.entries(devDependencies).forEach(([dependency, version]) => {
            if (version.startsWith(WORKSPACE_PREFIX)) {
                delete json.devDependencies[dependency];
            }
        });

        // Write the modified package.json
        await writeFile("package.json", JSON.stringify(json, null, TAB_WIDTH));
    }
}
