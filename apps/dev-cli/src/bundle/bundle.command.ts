import { Command, CommandRunner, Option } from "nest-commander";

import { BundleService } from "./bundle.service.ts";

export type BundleCommandOptions = {
    readonly dir: string;
};

@Command({ name: "bundle", description: "Bundle for Firebase Functions" })
export class BundleCommand extends CommandRunner {
    public constructor(private readonly bundleService: BundleService) {
        console.log("Initializing BundleCommand");
        super();
    }

    public async run(
        _: readonly string[],
        { dir }: BundleCommandOptions,
    ): Promise<void> {
        return await this.bundleService.bundle(dir);
    }

    @Option({
        flags: "-d, --dir [path]",
        description: "Path to the directory containing the package to bundle",
        defaultValue: process.cwd(),
    })
    public parseDir(value: string): string {
        return value;
    }
}
