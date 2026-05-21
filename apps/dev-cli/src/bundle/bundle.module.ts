import { Module } from "@nestjs/common";

import { BundleCommand } from "./bundle.command.ts";
import { BundleService } from "./bundle.service.ts";

@Module({
    providers: [BundleCommand, BundleService],
})
export class BundleModule {}
