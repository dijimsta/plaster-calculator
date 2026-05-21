import { Module } from "@nestjs/common";

import { BundleModule } from "./bundle/bundle.module.ts";

@Module({
    imports: [BundleModule],
})
export class AppModule {}
