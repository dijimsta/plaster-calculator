import { Command, CommandRunner } from "nest-commander";

// import type { BuildService } from "./build.service.ts";

@Command({ name: "bundle", description: "Build the project" })
export class BundleCommand extends CommandRunner {
    public constructor() {
        super();
    }

    public async run(): Promise<void> {}
}
