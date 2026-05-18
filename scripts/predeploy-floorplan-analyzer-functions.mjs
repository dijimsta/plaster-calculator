import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptsDir, "..");
const functionDir = resolve(rootDir, "functions", "floorplan-analyzer");
const python =
    process.platform === "win32"
        ? "venv\\Scripts\\python.exe"
        : "venv/bin/python";

const commands = [
    [
        "uv",
        "pip",
        "compile",
        "pyproject.toml",
        "--output-file",
        "requirements.txt",
    ],
    ["uv", "venv", "venv", "--clear"],
    ["uv", "pip", "sync", "requirements.txt", "--python", "venv"],
    [
        python,
        "-c",
        [
            "from pathlib import Path",
            "from firebase_functions.private.serving import functions_as_yaml, get_functions",
            "Path('functions.yaml').write_text(functions_as_yaml(get_functions()), encoding='utf-8')",
        ].join("; "),
    ],
];

for (const [command, ...args] of commands) {
    const result = spawnSync(command, args, {
        cwd: functionDir,
        shell: false,
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
