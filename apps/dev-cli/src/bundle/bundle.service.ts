// import { readFile, writeFile } from "node:fs/promises";

import { Injectable } from "@nestjs/common";
// import { build } from "esbuild";

@Injectable()
export class BundleService {
    // public async bundle(packageJsonPath: string): Promise<void> {
    // const text = await readFile(packageJsonPath, "utf-8");
    // const json = JSON.parse(text);
    // const [workspaceDependencies, external] = Object.entries(
    //     json.dependencies,
    // ).reduce(
    //     (
    //         [previousWorkspaceDependencies, previousExternal],
    //         [dependency, version],
    //     ) => {
    //         if (version.startsWith(WORKSPACE_PREFIX)) {
    //             return [
    //                 [...previousWorkspaceDependencies, dependency],
    //                 previousExternal,
    //             ];
    //         } else {
    //             return [
    //                 previousWorkspaceDependencies,
    //                 [...previousExternal, dependency],
    //             ];
    //         }
    //     },
    //     [[], []],
    // );
    // // Bundle the code using esbuild
    // await build({
    //     entryPoints: ["src/index.ts"],
    //     bundle: true,
    //     platform: "node",
    //     target: "node24",
    //     format: "esm",
    //     outdir: "dist",
    //     sourcemap: true,
    //     external,
    // });
    // // Update entry point and exports in package.json
    // pkg.main = "./dist/index.js";
    // pkg.exports = "./dist/index.js";
    // // Remove workspace dependencies from package.json
    // workspaceDependencies.forEach((dependency) => {
    //     delete pkg.dependencies[dependency];
    // });
    // // Write the modified package.json
    // writeFileSync("package.json", JSON.stringify(pkg, null, TAB_WIDTH));
    // }
}
