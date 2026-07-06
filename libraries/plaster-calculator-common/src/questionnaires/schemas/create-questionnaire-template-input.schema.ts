import { z } from "zod";

import { QuestionnaireTemplateQuestionInputSchema } from "./questionnaire-template-question-input.schema.ts";

export const CreateQuestionnaireTemplateInputSchema = z
    .object({
        name: z.string(),
        questions: z.array(QuestionnaireTemplateQuestionInputSchema).readonly(),
    })
    .readonly();

export type CreateQuestionnaireTemplateInput = z.infer<
    typeof CreateQuestionnaireTemplateInputSchema
>;
