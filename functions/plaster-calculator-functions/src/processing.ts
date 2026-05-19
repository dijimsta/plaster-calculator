import "./bootstrap.js";

import {
    createFloorplanPage as dcCreateFloorplanPage,
    deleteFloorplanPages as dcDeleteFloorplanPages,
    touchProject,
} from "@generated/example-data-connector";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

import {
    buildOverlayFromAnalyzerResult,
    callFloorplanAnalyzer,
} from "./analyzer.js";
import { requireAuth } from "./auth.js";
import { toDetail } from "./mappers.js";
import { requireOwnedProject } from "./ownership.js";
import { processingStrategies } from "./processing-strategies.js";
import {
    fetchStorageImage,
    isOwnedPageSourcePath,
    requireStorageImage,
    uploadStorageBuffer,
} from "./storage.js";
import { LONG_RUNNING_TIMEOUT_SECONDS } from "./types.js";
import {
    isRecord,
    readOptionalString,
    readRequiredNumber,
    readRequiredString,
} from "./validation.js";

import type {
    ProcessingStrategy,
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
        const strategyKey = readOptionalString(request.data.strategyKey);
        const strategy =
            processingStrategies.find((item) => item.key === strategyKey) ??
            processingStrategies.find((item) => item.defaultStrategy) ??
            processingStrategies[0];

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

        await touchProject({
            id: projectId,
            status: "PROCESSING",
            processingError: null,
        });
        await dcDeleteFloorplanPages({ projectId });

        try {
            if (project.uploadType === "IMAGE") {
                const imageBytes = await fetchOriginalImage(
                    project.originalPath,
                );
                for (const pageNumber of pageNumbers) {
                    await analysePage(
                        auth.uid,
                        projectId,
                        pageNumber,
                        project.originalPath,
                        project.originalFileName,
                        imageBytes,
                        strategy,
                    );
                }
            } else {
                for (const pageNumber of pageNumbers) {
                    const sourcePath = pdfPageImagePaths.get(pageNumber);
                    if (!sourcePath) {
                        throw new HttpsError(
                            "invalid-argument",
                            `Missing source image for PDF page ${pageNumber}.`,
                        );
                    }
                    const { bytes, url } = await fetchStorageImage(sourcePath);
                    await analysePage(
                        auth.uid,
                        projectId,
                        pageNumber,
                        url,
                        `${project.originalFileName} page ${pageNumber}`,
                        bytes,
                        strategy,
                    );
                }
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Floorplan analysis failed.";
            logger.error("processProject failed", { projectId, message });
            await touchProject({
                id: projectId,
                status: "FAILED",
                processingError: message,
            });
            throw error instanceof HttpsError
                ? error
                : new HttpsError("internal", message);
        }

        await touchProject({
            id: projectId,
            status: "READY",
            processingError: null,
        });
        return toDetail(await requireOwnedProject(projectId, auth.uid));
    },
);

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

async function analysePage(
    uid: string,
    projectId: string,
    pageNumber: number,
    originalUrl: string,
    originalFileName: string,
    imageBytes: Buffer,
    strategy: ProcessingStrategy,
): Promise<void> {
    const { result, floorplanPng } = await callFloorplanAnalyzer(
        strategy.endpoint,
        imageBytes,
        originalFileName,
        strategy.queryParams,
    );

    const overlay = buildOverlayFromAnalyzerResult(
        strategy,
        originalFileName,
        result,
    );

    const floorplanPath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/floorplan.png`;
    const floorplanUrl = await uploadStorageBuffer(
        floorplanPath,
        floorplanPng,
        "image/png",
    );

    const jsonPath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/result.json`;
    const jsonUrl = await uploadStorageBuffer(
        jsonPath,
        Buffer.from(JSON.stringify(result), "utf-8"),
        "application/json",
    );

    await dcCreateFloorplanPage({
        projectId,
        pageNumber,
        status: "READY",
        sourceImagePath: originalUrl,
        previewImagePath: floorplanUrl,
        overlayJson: JSON.stringify(overlay),
        scaleMmPerPx: null,
        ceilingHeightMm: null,
        referencePointsJson: null,
        referenceLengthMm: null,
        processingStrategy: strategy.key,
        processingMetadataJson: JSON.stringify({
            strategy: strategy.key,
            endpoint: strategy.endpoint,
            polygonsKey: strategy.polygonsKey,
            imageSizePx: result.image_size_px ?? null,
            roomCount: overlay.areas.length,
            ocrSeedCount: result.ocr_seed_count ?? null,
            jsonUrl,
            floorplanUrl,
        }),
    });
}

async function fetchOriginalImage(originalUrl: string): Promise<Buffer> {
    if (!originalUrl) {
        throw new HttpsError(
            "failed-precondition",
            "Project is missing an uploaded image.",
        );
    }

    const response = await fetch(originalUrl);
    if (!response.ok) {
        throw new HttpsError(
            "internal",
            `Could not fetch the uploaded image (HTTP ${response.status}).`,
        );
    }

    return Buffer.from(await response.arrayBuffer());
}
