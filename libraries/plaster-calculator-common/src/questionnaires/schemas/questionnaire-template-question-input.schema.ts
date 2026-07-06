import { z } from "zod";

export const QuestionnaireTemplateQuestionInputSchema = z
    .object({
        label: z.string(),
        description: z.string(),
    })
    .readonly();

export type QuestionnaireTemplateQuestionInput = z.infer<
    typeof QuestionnaireTemplateQuestionInputSchema
>;
