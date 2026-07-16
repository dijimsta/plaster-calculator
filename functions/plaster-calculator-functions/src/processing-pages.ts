import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { HttpsError } from "firebase-functions/https";

import {
    buildOverlayFromAnalyzerResult,
    callFloorplanAnalyzer,
} from "./analyzer.js";
import {
    fetchStorageImage,
    storageProjectId,
    uploadStorageBuffer,
} from "./storage.js";

import type { ProcessingStrategy, ProjectWithPages } from "./types.js";

export interface AnalyzedPageData {
    readonly overlayJson: string;
    readonly ocrTextContent: string | null;
    readonly previewImagePath: string;
    readonly processingMetadataJson: string;
    readonly processingStrategy: string;
    readonly rawFloorplanPath: string;
    readonly rawJsonPath: string;
}

export async function analyseProjectPages(
    uid: string,
    project: ProjectWithPages,
    pageNumbers: number[],
    pdfPageImagePaths: Map<number, string>,
    strategy: ProcessingStrategy,
) {
    if (project.uploadType === "IMAGE") {
        await analyseOriginalImagePages(uid, project, pageNumbers, strategy);
        return;
    }

    await analysePdfPages(
        uid,
        project,
        pageNumbers,
        pdfPageImagePaths,
        strategy,
    );
}

async function analyseOriginalImagePages(
    uid: string,
    project: ProjectWithPages,
    pageNumbers: number[],
    strategy: ProcessingStrategy,
) {
    const imageBytes = await fetchOriginalImage(project.originalPath);
    for (const pageNumber of pageNumbers) {
        await analysePage(
            uid,
            project.id,
            pageNumber,
            project.originalPath,
            project.originalFileName,
            imageBytes,
            strategy,
        );
    }
}

async function analysePdfPages(
    uid: string,
    project: ProjectWithPages,
    pageNumbers: number[],
    pdfPageImagePaths: Map<number, string>,
    strategy: ProcessingStrategy,
) {
    for (const pageNumber of pageNumbers) {
        const sourcePath = requirePdfPageImagePath(
            pdfPageImagePaths,
            pageNumber,
        );
        const { bytes, url } = await fetchStorageImage(sourcePath);
        await analysePage(
            uid,
            project.id,
            pageNumber,
            url,
            `${project.originalFileName} page ${pageNumber}`,
            bytes,
            strategy,
        );
    }
}

function requirePdfPageImagePath(
    pdfPageImagePaths: Map<number, string>,
    pageNumber: number,
) {
    const sourcePath = pdfPageImagePaths.get(pageNumber);
    if (!sourcePath) {
        throw new HttpsError(
            "invalid-argument",
            `Missing source image for PDF page ${pageNumber}.`,
        );
    }

    return sourcePath;
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
    const analyzed = await analyzePageImage({
        uid,
        projectId,
        pageNumber,
        originalFileName,
        imageBytes,
        strategy,
    });

    await DataConnector.createFloorplanPage({
        projectId,
        pageNumber,
        status: "READY",
        processingError: null,
        sourceImagePath: originalUrl,
        previewImagePath: analyzed.previewImagePath,
        rawJsonPath: analyzed.rawJsonPath,
        rawFloorplanPath: analyzed.rawFloorplanPath,
        overlayJson: analyzed.overlayJson,
        ocrTextContent: analyzed.ocrTextContent,
        scaleMmPerPx: null,
        ceilingHeightMm: null,
        referencePointsJson: null,
        referenceLengthMm: null,
        processingStrategy: analyzed.processingStrategy,
        processingMetadataJson: analyzed.processingMetadataJson,
    });
}

export async function analyzePageImage(options: {
    readonly uid: string;
    readonly projectId: string;
    readonly pageNumber: number;
    readonly originalFileName: string;
    readonly imageBytes: Buffer;
    readonly strategy: ProcessingStrategy;
}): Promise<AnalyzedPageData> {
    const {
        uid,
        projectId,
        pageNumber,
        originalFileName,
        imageBytes,
        strategy,
    } = options;
    const resultStorageProjectId = storageProjectId(projectId);
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

    const floorplanPath = `uploads/${uid}/projects/${resultStorageProjectId}/pages/${pageNumber}/floorplan.png`;
    const floorplanUrl = await uploadStorageBuffer(
        floorplanPath,
        floorplanPng,
        "image/png",
    );

    const jsonPath = `uploads/${uid}/projects/${resultStorageProjectId}/pages/${pageNumber}/result.json`;
    const jsonUrl = await uploadStorageBuffer(
        jsonPath,
        Buffer.from(JSON.stringify(result), "utf-8"),
        "application/json",
    );

    return {
        overlayJson: JSON.stringify(overlay),
        ocrTextContent: buildOcrTextContent(result.ocr_detected_text),
        previewImagePath: floorplanPath,
        rawFloorplanPath: floorplanPath,
        rawJsonPath: jsonPath,
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
    };
}

function buildOcrTextContent(
    detectedText: { text: string; confidence: number }[] | undefined,
): string | null {
    if (!detectedText || detectedText.length === 0) {
        return null;
    }

    return detectedText.map((entry) => entry.text).join("\n");
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
