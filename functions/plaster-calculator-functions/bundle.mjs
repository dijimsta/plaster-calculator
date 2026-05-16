import esbuild from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node24",
    outdir: "deploy",
    external: [
        "firebase-admin",
        "firebase-admin/*",
        "firebase-functions",
        "firebase-functions/*",
    ],
    format: "esm",
});

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

const deployPkg = {
    name: pkg.name,
    private: true,
    type: "module",
    main: "index.js",
    engines: pkg.engines,
    dependencies: {
        "firebase-admin": pkg.dependencies["firebase-admin"],
        "firebase-functions": pkg.dependencies["firebase-functions"],
    },
};

mkdirSync("deploy", { recursive: true });
writeFileSync("deploy/package.json", JSON.stringify(deployPkg, null, 4) + "\n");
