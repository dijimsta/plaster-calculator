import { z } from "zod";

export const QuestionnaireTemplateOriginSchema = z.union([
    z.literal("standard"),
    z.literal("custom"),
]);

export const QuestionnaireTemplateSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        scope: z.string(),
        origin: QuestionnaireTemplateOriginSchema,
        isDefault: z.boolean(),
        questionCount: z.number().int().nonnegative(),
        sectionCount: z.number().int().nonnegative(),
        usedByLabel: z.string(),
        updated: z.string(),
    })
    .readonly();

export type QuestionnaireTemplateOrigin = z.infer<
    typeof QuestionnaireTemplateOriginSchema
>;

export type QuestionnaireTemplate = z.infer<typeof QuestionnaireTemplateSchema>;
