import "./bootstrap.js";

import { updateFloorplanPageAnalysis } from "@generated/example-data-connector";
import { HttpsError, onCall } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

import { requireAuth } from "./auth.js";
import { exampleDataConnect } from "./data-connect.js";
import { toDetail } from "./mappers.js";
import { requireFloorplanPage, requireOwnedProject } from "./ownership.js";
import { analyzePageImage } from "./processing-pages.js";
import { processingStrategies } from "./processing-strategies.js";
import { fetchStorageImage } from "./storage.js";
import { LONG_RUNNING_TIMEOUT_SECONDS } from "./types.js";
import {
    hasField,
    readNullableNumber,
    readOptionalNullableString,
    readRequiredString,
} from "./validation.js";

import type {
    AnalyzeFloorplanPageRequest,
    FloorplanPageRow,
    ProjectDetail,
} from "./types.js";

export const analyzeFloorplanPage = onCall<
    AnalyzeFloorplanPageRequest,
    Promise<ProjectDetail>
>(
    { timeoutSeconds: LONG_RUNNING_TIMEOUT_SECONDS, memory: "512MiB" },
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const pageId = readRequiredString(request.data.pageId, "Page ID");
        const project = await requireOwnedProject(projectId, auth.uid);
        const page = await requireFloorplanPage(projectId, pageId);
        if (page.status === "PROCESSING") {
            throw new HttpsError(
                "already-exists",
                "This page is already being analyzed.",
            );
        }

        const settings = readAnalysisSettings(request.data, page);
        await writeAnalysisState(page, settings, "PROCESSING", null);
        try {
            const source = await readSourceImage(page.sourceImagePath);
            const strategy =
                processingStrategies.find((item) => item.defaultStrategy) ??
                processingStrategies[0];
            if (!strategy) {
                throw new HttpsError(
                    "internal",
                    "No processing strategy is configured.",
                );
            }
            const analyzed = await analyzePageImage({
                uid: auth.uid,
                projectId,
                pageNumber: page.pageNumber,
                originalFileName: `${project.originalFileName} page ${page.pageNumber}`,
                imageBytes: source,
                strategy,
            });
            await updateFloorplanPageAnalysis(exampleDataConnect, {
                id: page.id,
                status: "READY",
                processingError: null,
                sourceImagePath: page.sourceImagePath ?? null,
                previewImagePath: analyzed.previewImagePath,
                rawJsonPath: analyzed.rawJsonPath,
                rawFloorplanPath: analyzed.rawFloorplanPath,
                overlayJson: analyzed.overlayJson,
                scaleMmPerPx: settings.scaleMmPerPx,
                ceilingHeightMm: settings.ceilingHeightMm,
                referencePointsJson: settings.referencePointsJson,
                referenceLengthMm: settings.referenceLengthMm,
                processingStrategy: analyzed.processingStrategy,
                processingMetadataJson: analyzed.processingMetadataJson,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Floorplan analysis failed.";
            logger.error("analyzeFloorplanPage failed", {
                projectId,
                pageId,
                errorMessage: message,
            });
            await writeAnalysisState(page, settings, "FAILED", message);
            throw error instanceof HttpsError
                ? error
                : new HttpsError("internal", message);
        }

        return toDetail(await requireOwnedProject(projectId, auth.uid));
    },
);

async function readSourceImage(
    path: string | null | undefined,
): Promise<Buffer> {
    if (!path) {
        throw new HttpsError(
            "failed-precondition",
            "This page is missing its source image.",
        );
    }
    if (!path.startsWith("http")) {
        return (await fetchStorageImage(path)).bytes;
    }
    const response = await fetch(path);
    if (!response.ok) {
        throw new HttpsError(
            "internal",
            `Could not fetch the page image (HTTP ${response.status}).`,
        );
    }
    return Buffer.from(await response.arrayBuffer());
}

async function writeAnalysisState(
    page: FloorplanPageRow,
    settings: AnalysisSettings,
    status: "PROCESSING" | "FAILED",
    processingError: string | null,
): Promise<void> {
    await updateFloorplanPageAnalysis(exampleDataConnect, {
        id: page.id,
        status,
        processingError,
        sourceImagePath: page.sourceImagePath ?? null,
        previewImagePath: page.previewImagePath ?? null,
        rawJsonPath: page.rawJsonPath ?? null,
        rawFloorplanPath: page.rawFloorplanPath ?? null,
        overlayJson: page.overlayJson ?? null,
        scaleMmPerPx: settings.scaleMmPerPx,
        ceilingHeightMm: settings.ceilingHeightMm,
        referencePointsJson: settings.referencePointsJson,
        referenceLengthMm: settings.referenceLengthMm,
        processingStrategy: page.processingStrategy ?? null,
        processingMetadataJson: page.processingMetadataJson ?? null,
    });
}

interface AnalysisSettings {
    readonly scaleMmPerPx: number | null;
    readonly ceilingHeightMm: number | null;
    readonly referencePointsJson: string | null;
    readonly referenceLengthMm: number | null;
}

function readAnalysisSettings(
    data: AnalyzeFloorplanPageRequest,
    page: FloorplanPageRow,
): AnalysisSettings {
    return {
        scaleMmPerPx: hasField(data, "scaleMmPerPx")
            ? readNullableNumber(data.scaleMmPerPx, "Scale")
            : (page.scaleMmPerPx ?? null),
        ceilingHeightMm: hasField(data, "ceilingHeightMm")
            ? readNullableNumber(data.ceilingHeightMm, "Ceiling height")
            : (page.ceilingHeightMm ?? null),
        referencePointsJson: hasField(data, "referencePoints")
            ? readOptionalNullableString(
                  data.referencePoints,
                  "Reference points",
              )
            : (page.referencePointsJson ?? null),
        referenceLengthMm: hasField(data, "referenceLengthMm")
            ? readNullableNumber(data.referenceLengthMm, "Reference length")
            : (page.referenceLengthMm ?? null),
    };
}
