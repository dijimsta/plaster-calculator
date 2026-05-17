import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(scriptsDir, "..");
const analyzerDir = join(rootDir, "functions", "floorplan-analyzer");

run("uv", [
    "pip",
    "compile",
    "pyproject.toml",
    "--output-file",
    "requirements.txt",
]);
run("uv", ["venv", "venv"]);
run("uv", ["pip", "sync", "requirements.txt", "--python", "venv"]);

function run(command, args) {
    const result = spawnSync(command, args, {
        cwd: analyzerDir,
        shell: process.platform === "win32",
        stdio: "inherit",
    });

    if (result.error) {
        console.error(result.error.message);
        process.exit(1);
    }

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}
