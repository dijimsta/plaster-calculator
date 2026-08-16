import { HttpsError } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

import type {
    AnswerQuestionnaireInput,
    AnswerQuestionnaireOutput,
} from "./ai/flows/answer-questionnaire.js";
import type { RoomSummary } from "./ai/room-summary.js";
import type { ProjectWithPages } from "./types.js";

// Bounds the OCR/PDF text sent to the model per call. Large multi-page spec
// PDFs could otherwise blow context/cost; exact budget to tune empirically.
export const MAX_TEXT_CHARACTERS = 20_000;

export interface QuestionnaireQuestion {
    readonly id: string;
    readonly label: string;
}

interface AnsweredQuestion {
    readonly questionId: string;
    readonly answer: string;
}

/**
 * External effects `answerQuestionnaire` needs, injected so the branching logic
 * (pages vs. no pages, truncation, zero-answer short-circuit) can be unit
 * tested without a live Firestore/Data Connect/genkit stack. Production wiring
 * lives in `questionnaire-ai.ts`.
 */
export interface AnswerQuestionnaireDependencies {
    getProject(projectId: string, uid: string): Promise<ProjectWithPages>;
    getQuestions(projectId: string): Promise<QuestionnaireQuestion[]>;
    /** Runs inline floorplan analysis for any pages that still need it. Only called when pages exist. */
    ensurePagesAnalyzed(
        project: ProjectWithPages,
        projectId: string,
        uid: string,
    ): Promise<ProjectWithPages>;
    /** Reads `extractedTextJson`, extracting it from the uploaded PDF on demand if not yet cached. */
    resolveExtractedText(project: ProjectWithPages): Promise<string>;
    /** Computes room-by-room geometry summaries from analyzed page overlays. Only called when pages exist. */
    buildRoomSummaries(project: ProjectWithPages): RoomSummary[];
    generate(
        input: AnswerQuestionnaireInput,
    ): Promise<AnswerQuestionnaireOutput>;
    updateAnswer(questionId: string, answer: string): Promise<void>;
}

export function createAnswerQuestionnaireService(
    dependencies: AnswerQuestionnaireDependencies,
) {
    return {
        run: async (
            projectId: string,
            uid: string,
        ): Promise<{ updatedCount: number }> => {
            const project = await dependencies.getProject(projectId, uid);

            const questions = await dependencies.getQuestions(projectId);
            if (questions.length === 0) {
                throw new HttpsError(
                    "failed-precondition",
                    "Add at least one question before auto-filling.",
                );
            }

            try {
                return project.pages.length > 0
                    ? await runWithPages(
                          dependencies,
                          project,
                          projectId,
                          uid,
                          questions,
                      )
                    : await runWithoutPages(dependencies, project, questions);
            } catch (error) {
                logger.error("answerQuestionnaireWithAI failed", {
                    projectId,
                    questionCount: questions.length,
                });
                throw error instanceof HttpsError
                    ? error
                    : new HttpsError(
                          "internal",
                          "AI auto-fill failed. Please try again.",
                      );
            }
        },
    };
}

/**
 * Floorplan pages already exist (e.g. the scope of work tab): behaviour is
 * unchanged from before the plan-text-only path was added. Pages are
 * analyzed if needed and room summaries are the primary signal, alongside OCR
 * and PDF text.
 */
async function runWithPages(
    dependencies: AnswerQuestionnaireDependencies,
    initialProject: ProjectWithPages,
    projectId: string,
    uid: string,
    questions: QuestionnaireQuestion[],
): Promise<{ updatedCount: number }> {
    const project = await dependencies.ensurePagesAnalyzed(
        initialProject,
        projectId,
        uid,
    );

    const pdfText = await dependencies.resolveExtractedText(project);
    const ocrText = buildOcrText(project);
    const rooms = dependencies.buildRoomSummaries(project);

    const { answers } = await dependencies.generate({
        questions: toFlowQuestions(questions),
        hasPages: true,
        rooms,
        ocrText: truncate(ocrText, MAX_TEXT_CHARACTERS),
        pdfText: truncate(pdfText, MAX_TEXT_CHARACTERS),
    });

    return applyAnswers(dependencies, answers);
}

/**
 * No floorplan pages exist yet (the new project-creation wizard runs
 * clarifications before page selection). There is no page geometry and
 * nothing to analyze, so this skips `ensurePagesAnalyzed` and room summaries
 * entirely and answers from `Project.extractedTextJson` alone (extracted from
 * the uploaded PDF on demand via `resolveExtractedText`). A leaner prompt
 * (no rooms/OCR sections) is sent in this branch, and if there is no
 * extractable plan text at all (e.g. a non-PDF upload), the model is not
 * called at all — this is both an honest "nothing to answer from" result and
 * the cheaper of the two paths, which matters once a credit cost is charged
 * per call: this branch does strictly less work (no page-analysis calls, no
 * room-summary computation, a shorter prompt) than the pages-present path,
 * so it should plausibly cost less/nothing when billing is wired up.
 */
async function runWithoutPages(
    dependencies: AnswerQuestionnaireDependencies,
    project: ProjectWithPages,
    questions: QuestionnaireQuestion[],
): Promise<{ updatedCount: number }> {
    const pdfText = truncate(
        await dependencies.resolveExtractedText(project),
        MAX_TEXT_CHARACTERS,
    );
    if (pdfText.trim().length === 0) {
        return { updatedCount: 0 };
    }

    const { answers } = await dependencies.generate({
        questions: toFlowQuestions(questions),
        hasPages: false,
        ocrText: "",
        pdfText,
    });

    return applyAnswers(dependencies, answers);
}

async function applyAnswers(
    dependencies: AnswerQuestionnaireDependencies,
    answers: AnswerQuestionnaireOutput["answers"],
): Promise<{ updatedCount: number }> {
    const answeredQuestions = answers.filter(
        (answer): answer is AnsweredQuestion => answer.answer != null,
    );

    await Promise.all(
        answeredQuestions.map((answer) =>
            dependencies.updateAnswer(answer.questionId, answer.answer),
        ),
    );

    return { updatedCount: answeredQuestions.length };
}

function toFlowQuestions(
    questions: QuestionnaireQuestion[],
): { id: string; label: string }[] {
    return questions.map((question) => ({
        id: question.id,
        label: question.label,
    }));
}

function buildOcrText(project: ProjectWithPages): string {
    return project.pages
        .map((page) => page.ocrTextContent)
        .filter((text): text is string => Boolean(text))
        .join("\n");
}

function truncate(text: string, maxCharacters: number): string {
    return text.length > maxCharacters ? text.slice(0, maxCharacters) : text;
}
