import { z } from "zod";

import { ProjectSummarySchema } from "./project-summary.schema.ts";

export const ListProjectsResponseSchema = z
    .object({
        projects: z.array(ProjectSummarySchema),
    })
    .readonly();

export type ListProjectsResponse = z.infer<typeof ListProjectsResponseSchema>;
