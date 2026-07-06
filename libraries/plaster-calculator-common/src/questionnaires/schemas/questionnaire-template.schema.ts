import { z } from "zod";

export const QuestionnaireTemplateSchema = z
    .object({
        id: z.string(),
        ownerId: z.string(),
        name: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
    .readonly();

export type QuestionnaireTemplate = z.infer<typeof QuestionnaireTemplateSchema>;
