import { Module } from "@nestjs/common";

import { BundleCommand } from "./bundle.command.ts";

@Module({
    providers: [BundleCommand],
})
export class BundleModule {}
