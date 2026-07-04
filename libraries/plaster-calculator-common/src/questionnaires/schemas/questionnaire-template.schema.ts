import { z } from "zod";

export const QuestionnaireTemplateSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        usedByLabel: z.string(),
        updated: z.string(),
    })
    .readonly();

export type QuestionnaireTemplate = z.infer<typeof QuestionnaireTemplateSchema>;
