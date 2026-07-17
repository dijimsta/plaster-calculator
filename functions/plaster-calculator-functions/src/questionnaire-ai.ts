import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { AI_SUGGESTED_ANSWER_SOURCE } from "@libraries/plaster-calculator-common";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

import { answerQuestionnaireFlow } from "./ai/flows/answer-questionnaire.js";
import { buildRoomSummary } from "./ai/room-summary.js";
import { requireAuth } from "./auth.js";
import { requireOwnedProject } from "./ownership.js";
import { analyzeFloorplanPageCore } from "./page-analysis.js";
import { extractPdfText } from "./pdf-text-extraction.js";
import { LONG_RUNNING_TIMEOUT_SECONDS } from "./types.js";
import { readRequiredString } from "./validation.js";

import type { ProjectIdRequest, ProjectWithPages } from "./types.js";

// Bounds the OCR/PDF text sent to the model per call. Large multi-page spec
// PDFs could otherwise blow context/cost; exact budget to tune empirically.
const MAX_TEXT_CHARACTERS = 20_000;

interface ExtractedPdfPage {
    readonly pageNumber: number;
    readonly text: string;
}

export const answerQuestionnaireWithAI = onCall<
    ProjectIdRequest,
    Promise<{ updatedCount: number }>
>(
    { timeoutSeconds: LONG_RUNNING_TIMEOUT_SECONDS, memory: "512MiB" },
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        return answerQuestionnaire(projectId, auth.uid);
    },
);

export async function answerQuestionnaire(
    projectId: string,
    uid: string,
): Promise<{ updatedCount: number }> {
    let project = await requireOwnedProject(projectId, uid);

    const questionsResponse =
        await DataConnector.getProjectQuestionnaireQuestionsForProject({
            projectId,
        });
    const questions =
        questionsResponse.data.projectQuestionnaire?.questions ?? [];
    if (questions.length === 0) {
        throw new HttpsError(
            "failed-precondition",
            "Add at least one question before auto-filling.",
        );
    }

    try {
        project = await ensurePagesAnalyzed(project, projectId, uid);

        const pdfText = await resolveExtractedText(project);
        const ocrText = buildOcrText(project);
        const rooms = project.pages.flatMap((page) => buildRoomSummary(page));

        const { answers } = await answerQuestionnaireFlow({
            questions: questions.map((question) => ({
                id: question.id,
                label: question.label,
            })),
            rooms,
            ocrText: truncate(ocrText, MAX_TEXT_CHARACTERS),
            pdfText: truncate(pdfText, MAX_TEXT_CHARACTERS),
        });

        const answeredQuestions = answers.filter(
            (answer): answer is { questionId: string; answer: string } =>
                answer.answer != null,
        );

        await Promise.all(
            answeredQuestions.map((answer) =>
                DataConnector.updateProjectQuestionnaireQuestionAiAnswer({
                    id: answer.questionId,
                    answer: answer.answer,
                    answerSource: AI_SUGGESTED_ANSWER_SOURCE,
                }),
            ),
        );

        return { updatedCount: answeredQuestions.length };
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
}

async function ensurePagesAnalyzed(
    project: ProjectWithPages,
    projectId: string,
    uid: string,
): Promise<ProjectWithPages> {
    const pagesNeedingAnalysis = project.pages.filter(
        (page) =>
            page.status !== "PROCESSING" &&
            (page.status === "FAILED" || page.scaleMmPerPx == null),
    );
    if (pagesNeedingAnalysis.length === 0) {
        return project;
    }

    for (const page of pagesNeedingAnalysis) {
        try {
            await analyzeFloorplanPageCore(uid, projectId, page.id, {});
        } catch (error) {
            logger.error("Inline floorplan analysis failed during auto-fill", {
                projectId,
                pageId: page.id,
                errorMessage:
                    error instanceof Error ? error.message : String(error),
            });
        }
    }

    return requireOwnedProject(projectId, uid);
}

async function resolveExtractedText(
    project: ProjectWithPages,
): Promise<string> {
    if (project.extractedTextJson) {
        return flattenExtractedText(project.extractedTextJson);
    }

    if (project.uploadType !== "PDF") {
        return "";
    }

    const pdfBytes = await fetchOriginalPdf(project.originalPath);
    const pages = await extractPdfText(pdfBytes);
    const extractedTextJson = JSON.stringify(pages);
    await DataConnector.updateProjectExtractedText({
        id: project.id,
        extractedTextJson,
    });

    return flattenExtractedText(extractedTextJson);
}

function flattenExtractedText(extractedTextJson: string): string {
    const pages = JSON.parse(extractedTextJson) as ExtractedPdfPage[];
    return pages
        .map((page) => page.text)
        .filter((text) => text.length > 0)
        .join("\n\n");
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

async function fetchOriginalPdf(originalUrl: string): Promise<Buffer> {
    const response = await fetch(originalUrl);
    if (!response.ok) {
        throw new HttpsError(
            "internal",
            `Could not fetch the uploaded PDF (HTTP ${response.status}).`,
        );
    }

    return Buffer.from(await response.arrayBuffer());
}
