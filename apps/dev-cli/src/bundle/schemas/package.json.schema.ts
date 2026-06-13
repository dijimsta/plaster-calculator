import { z } from "zod";

export const PackageJsonSchema = z
    .object({
        dependencies: z.record(z.string(), z.string()).readonly().optional(),
        devDependencies: z.record(z.string(), z.string()).readonly().optional(),
    })
    .readonly();
