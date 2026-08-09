import { z } from "zod";

import { FloorplanPageSchema } from "./floorplan-page.schema.ts";
import { ProjectSummarySchema } from "./project-summary.schema.ts";

export const ProjectDetailSchema = ProjectSummarySchema.extend({
    teamId: z.string().nullable().optional(),
    assignee: z.string().nullable().optional(),
    pages: z.array(FloorplanPageSchema),
});

export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
