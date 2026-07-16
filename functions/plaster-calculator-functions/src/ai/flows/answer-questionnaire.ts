import { ai, z } from "../genkit.js";
import { SYSTEM_PROMPT } from "../system-prompt.js";

const RoomSummaryInputSchema = z.object({
    label: z.string(),
    roomType: z.string().nullable(),
    isWetArea: z.boolean(),
    ceilingAreaM2: z.number().nullable(),
    wallAreaM2ByType: z.record(z.string(), z.number()),
    ceilingHeightMm: z.number().nullable(),
    ceilingMode: z.union([z.literal("flat"), z.literal("raked")]),
});

const QuestionInputSchema = z.object({
    id: z.string(),
    label: z.string(),
});

const AnswerQuestionnaireInputSchema = z.object({
    questions: z.array(QuestionInputSchema),
    rooms: z.array(RoomSummaryInputSchema),
    ocrText: z.string(),
    pdfText: z.string(),
});

const AnswerQuestionnaireOutputSchema = z.object({
    answers: z.array(
        z.object({
            questionId: z.string(),
            answer: z
                .string()
                .nullable()
                .describe(
                    "The answer to this question, or null if the provided data does not " +
                        "clearly support a confident answer.",
                ),
        }),
    ),
});

export type AnswerQuestionnaireInput = z.infer<
    typeof AnswerQuestionnaireInputSchema
>;
export type AnswerQuestionnaireOutput = z.infer<
    typeof AnswerQuestionnaireOutputSchema
>;

export const answerQuestionnaireFlow = ai.defineFlow(
    {
        name: "answerQuestionnaireFlow",
        inputSchema: AnswerQuestionnaireInputSchema,
        outputSchema: AnswerQuestionnaireOutputSchema,
    },
    async (input) => {
        const { output } = await ai.generate({
            system: SYSTEM_PROMPT,
            prompt: buildPrompt(input),
            output: { schema: AnswerQuestionnaireOutputSchema },
        });
        if (output == null) {
            throw new Error("Response doesn't satisfy schema.");
        }

        return output;
    },
);

function buildPrompt(input: AnswerQuestionnaireInput): string {
    return [
        "## Room-by-room computed data",
        JSON.stringify(input.rooms, null, 2),
        "## OCR-detected text from the floor plan drawing",
        input.ocrText || "(none)",
        "## Text extracted from the uploaded PDF",
        input.pdfText || "(none)",
        "## Questions to answer",
        JSON.stringify(input.questions, null, 2),
        "Answer each question in `questions` and return one entry per question ID in " +
            "the same order.",
    ].join("\n\n");
}
