import { z } from "zod";

export const AnswerQuestionnaireWithAiResponseSchema = z
    .object({
        updatedCount: z.number(),
    })
    .readonly();

export type AnswerQuestionnaireWithAiResponse = z.infer<
    typeof AnswerQuestionnaireWithAiResponseSchema
>;
