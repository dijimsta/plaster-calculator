import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

import { requireAuth } from "./auth.js";
import { toDetail } from "./mappers.js";
import { requireOwnedProject } from "./ownership.js";
import { analyseProjectPages } from "./processing-pages.js";
import { processingStrategies } from "./processing-strategies.js";
import { isOwnedPageSourcePath, requireStorageImage } from "./storage.js";
import { LONG_RUNNING_TIMEOUT_SECONDS } from "./types.js";
import {
    isRecord,
    readOptionalString,
    readRequiredNumber,
    readRequiredString,
} from "./validation.js";

import type {
    ProcessingStrategyInfo,
    ProcessProjectRequest,
    ProjectDetail,
    ProjectWithPages,
} from "./types.js";

export const listProcessingStrategies = onCall<
    unknown,
    { strategies: ProcessingStrategyInfo[] }
>((request) => {
    requireAuth(request);
    return { strategies: processingStrategies };
});

export const processProject = onCall<
    ProcessProjectRequest,
    Promise<ProjectDetail>
>(
    { timeoutSeconds: LONG_RUNNING_TIMEOUT_SECONDS, memory: "512MiB" },
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const project = await requireOwnedProject(projectId, auth.uid);
        const pageNumbers = readPageNumbers(request.data.pageNumbers, project);
        const strategy = selectProcessingStrategy(
            readOptionalString(request.data.strategyKey),
        );

        if (!strategy) {
            throw new HttpsError(
                "internal",
                "No processing strategy is configured.",
            );
        }

        const pdfPageImagePaths =
            project.uploadType === "PDF"
                ? await readPdfPageImagePaths(
                      request.data.pageImagePaths,
                      pageNumbers,
                      auth.uid,
                      projectId,
                  )
                : new Map<number, string>();

        await DataConnector.touchProject({
            id: projectId,
            status: "PROCESSING",
            processingError: null,
        });
        await DataConnector.deleteFloorplanPages({ projectId });

        try {
            await analyseProjectPages(
                auth.uid,
                project,
                pageNumbers,
                pdfPageImagePaths,
                strategy,
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Floorplan analysis failed.";
            logger.error("processProject failed", { projectId, message });
            await DataConnector.touchProject({
                id: projectId,
                status: "FAILED",
                processingError: message,
            });
            throw error instanceof HttpsError
                ? error
                : new HttpsError("internal", message);
        }

        await DataConnector.touchProject({
            id: projectId,
            status: "READY",
            processingError: null,
        });
        return toDetail(await requireOwnedProject(projectId, auth.uid));
    },
);

function selectProcessingStrategy(strategyKey: string | undefined) {
    return (
        processingStrategies.find((item) => item.key === strategyKey) ??
        processingStrategies.find((item) => item.defaultStrategy) ??
        processingStrategies[0]
    );
}

function readPageNumbers(value: unknown, project: ProjectWithPages) {
    if (!Array.isArray(value) || value.length === 0) {
        return [1];
    }

    const numbers = value.map((item) =>
        readRequiredNumber(item, "Page number"),
    );
    const unique = Array.from(new Set(numbers)).sort(
        (left, right) => left - right,
    );

    if (project.uploadType === "IMAGE") {
        return [1];
    }

    unique.forEach((pageNumber) => {
        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            pageNumber > project.pageCount
        ) {
            throw new HttpsError(
                "invalid-argument",
                "Page number is outside the uploaded PDF range.",
            );
        }
    });

    return unique;
}

async function readPdfPageImagePaths(
    value: unknown,
    pageNumbers: number[],
    uid: string,
    projectId: string,
) {
    if (!isRecord(value)) {
        throw new HttpsError(
            "invalid-argument",
            "Selected PDF page images are required.",
        );
    }

    const paths = new Map<number, string>();
    for (const pageNumber of pageNumbers) {
        const rawPath = value[String(pageNumber)];
        if (typeof rawPath !== "string" || rawPath.trim().length === 0) {
            throw new HttpsError(
                "invalid-argument",
                `Source image is required for PDF page ${pageNumber}.`,
            );
        }

        const path = rawPath.trim();
        if (!isOwnedPageSourcePath(path, uid, projectId, pageNumber)) {
            throw new HttpsError(
                "permission-denied",
                "PDF page source image path must belong to the signed-in user and project.",
            );
        }

        await requireStorageImage(path);
        paths.set(pageNumber, path);
    }

    return paths;
}
