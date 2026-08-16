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
import { createAnswerQuestionnaireService } from "./questionnaire-answer-domain.js";
import type { AnswerQuestionnaireDependencies } from "./questionnaire-answer-domain.js";
import { LONG_RUNNING_TIMEOUT_SECONDS } from "./types.js";
import type { ProjectIdRequest, ProjectWithPages } from "./types.js";
import { readRequiredString } from "./validation.js";

interface ExtractedPdfPage {
    readonly pageNumber: number;
    readonly text: string;
}

const defaultDependencies: AnswerQuestionnaireDependencies = {
    getProject: requireOwnedProject,
    getQuestions: async (projectId) => {
        const response =
            await DataConnector.getProjectQuestionnaireQuestionsForProject({
                projectId,
            });
        const questions = response.data.projectQuestionnaire?.questions ?? [];
        return questions.map((question) => ({
            id: question.id,
            label: question.label,
        }));
    },
    ensurePagesAnalyzed,
    resolveExtractedText,
    buildRoomSummaries: (project) =>
        project.pages.flatMap((page) => buildRoomSummary(page)),
    generate: (input) => answerQuestionnaireFlow(input),
    updateAnswer: async (questionId, answer) => {
        await DataConnector.updateProjectQuestionnaireQuestionAiAnswer({
            id: questionId,
            answer,
            answerSource: AI_SUGGESTED_ANSWER_SOURCE,
        });
    },
};

const answerQuestionnaireService =
    createAnswerQuestionnaireService(defaultDependencies);

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
    return answerQuestionnaireService.run(projectId, uid);
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
