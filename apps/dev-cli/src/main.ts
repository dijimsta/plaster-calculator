import { CommandFactory } from "nest-commander";

import { AppModule } from "./app.module.ts";

await CommandFactory.run(AppModule);
