import { isEmulator } from "../../environment.js";
import { ai, checkLmStudioSetup, z } from "../genkit.js";
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
    // False before floorplan pages exist (e.g. the project-creation wizard's
    // clarifications step, which runs before page selection). In that case
    // `rooms` is omitted and `ocrText` is always empty, since both are derived
    // from analyzed pages; only `pdfText` carries signal.
    hasPages: z.boolean(),
    rooms: z.array(RoomSummaryInputSchema).optional(),
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
        const prompt = buildPrompt(input);
        // LM Studio's local server truncates prompts/responses in its own logs, so log
        // the untruncated request/response here instead when running under the emulator.
        logAiDebug("answerQuestionnaireFlow request", {
            system: SYSTEM_PROMPT,
            prompt,
        });

        await checkLmStudioSetup();

        const { output } = await ai.generate({
            system: SYSTEM_PROMPT,
            prompt,
            output: { schema: AnswerQuestionnaireOutputSchema },
        });

        logAiDebug("answerQuestionnaireFlow response", {
            output: JSON.stringify(output, null, 2),
        });

        if (output == null) {
            throw new Error("Response doesn't satisfy schema.");
        }

        return output;
    },
);

function logAiDebug(title: string, sections: Record<string, string>): void {
    if (!isEmulator()) {
        return;
    }

    const body = Object.entries(sections)
        .map(([heading, content]) => `--- ${heading} ---\n${content}`)
        .join("\n\n");
    // Plain console output, not firebase-functions/logger: the emulator writes logger
    // output as a single-line structured JSON entry, which escapes newlines and makes a
    // multi-line prompt/response unreadable.

    console.debug(`\n=== ${title} ===\n${body}\n`);
}

function buildPrompt(input: AnswerQuestionnaireInput): string {
    return [
        ...buildGeometrySections(input),
        "## Text extracted from the uploaded PDF",
        input.pdfText || "(none)",
        "## Questions to answer",
        JSON.stringify(input.questions, null, 2),
        "Answer each question in `questions` and return one entry per question ID in " +
            "the same order.",
    ].join("\n\n");
}

function buildGeometrySections(input: AnswerQuestionnaireInput): string[] {
    if (!input.hasPages) {
        return [
            "## Floor plan pages have not been processed yet",
            "No room geometry or OCR text is available for this project yet — it's still " +
                "at the plan-upload stage, before pages are analyzed. Answer only from the " +
                "extracted PDF text below.",
        ];
    }

    return [
        "## Room-by-room computed data",
        JSON.stringify(input.rooms ?? [], null, 2),
        "## OCR-detected text from the floor plan drawing",
        input.ocrText || "(none)",
    ];
}
