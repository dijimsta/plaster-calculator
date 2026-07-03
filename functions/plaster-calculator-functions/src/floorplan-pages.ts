import "./bootstrap.js";

import {
    createFloorplanPage as dcCreateFloorplanPage,
    touchProject,
    updateFloorplanPage as dcUpdateFloorplanPage,
} from "@generated/example-data-connector";
import { HttpsError, onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { toDetail, toPage } from "./mappers.js";
import { requireFloorplanPage, requireOwnedProject } from "./ownership.js";
import {
    ensureFileDownloadUrl,
    isOwnedPageSourcePath,
    requireStorageImage,
} from "./storage.js";
import {
    hasField,
    isRecord,
    readNullableNumber,
    readRequiredString,
} from "./validation.js";

import type {
    FloorplanPage,
    FloorplanPageRow,
    InitializeFloorplanPagesRequest,
    ProjectDetail,
    UpdateFloorplanPageRequest,
    UpdateFloorplanPagesRequest,
} from "./types.js";

export const getFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    return toPage(
        await requireFloorplanPage(
            projectId,
            readRequiredString(request.data.pageId, "Page ID"),
        ),
    );
});

export const updateFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);

    const page = await requireFloorplanPage(
        projectId,
        readRequiredString(request.data.pageId, "Page ID"),
    );
    if (page.status === "PROCESSING") {
        throw new HttpsError(
            "failed-precondition",
            "This page cannot be edited while analysis is running.",
        );
    }
    const nextValues = nextFloorplanPageValues(request.data, page);

    await dcUpdateFloorplanPage({
        id: page.id,
        overlayJson: nextValues.overlayJson,
        scaleMmPerPx: nextValues.scaleMmPerPx,
        ceilingHeightMm: nextValues.ceilingHeightMm,
        referencePointsJson: nextValues.referencePointsJson,
        referenceLengthMm: nextValues.referenceLengthMm,
    });
    await touchProject({ id: projectId });

    return toPage(await requireFloorplanPage(projectId, page.id));
});

export const initializeFloorplanPages = onCall<
    InitializeFloorplanPagesRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
    if (project.uploadType !== "PDF") {
        throw new HttpsError(
            "failed-precondition",
            "Only PDF projects require page initialization.",
        );
    }
    if (project.pages.length > 0) {
        throw new HttpsError(
            "already-exists",
            "Floorplan pages have already been initialized.",
        );
    }
    if (!isRecord(request.data.pageImagePaths)) {
        throw new HttpsError(
            "invalid-argument",
            "PDF page images are required.",
        );
    }

    const entries = readPageImageEntries(request.data.pageImagePaths);
    if (entries.length === 0) {
        throw new HttpsError(
            "invalid-argument",
            "Select at least one PDF page.",
        );
    }

    for (const entry of entries) {
        if (
            !isValidPageImageEntry(
                entry,
                project.pageCount,
                auth.uid,
                projectId,
            )
        ) {
            throw new HttpsError("invalid-argument", "Invalid PDF page image.");
        }
        await requireStorageImage(entry.path);
        const sourceImageUrl = await ensureFileDownloadUrl(entry.path);
        await dcCreateFloorplanPage({
            projectId,
            pageNumber: entry.pageNumber,
            status: "READY",
            processingError: null,
            sourceImagePath: sourceImageUrl,
            previewImagePath: sourceImageUrl,
            overlayJson: JSON.stringify({
                sourceFile: `${project.originalFileName} page ${entry.pageNumber}`,
                areas: [],
            }),
            scaleMmPerPx: null,
            ceilingHeightMm: null,
            referencePointsJson: null,
            referenceLengthMm: null,
            processingStrategy: null,
            processingMetadataJson: null,
        });
    }

    await touchProject({
        id: projectId,
        status: "READY",
        processingError: null,
    });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

interface PageImageEntry {
    readonly pageNumber: number;
    readonly path: unknown;
}

function readPageImageEntries(
    value: Record<string, unknown>,
): PageImageEntry[] {
    return Object.entries(value)
        .map(([pageNumber, path]) => ({ pageNumber: Number(pageNumber), path }))
        .sort((left, right) => left.pageNumber - right.pageNumber);
}

function isValidPageImageEntry(
    entry: PageImageEntry,
    pageCount: number,
    uid: string,
    projectId: string,
): entry is PageImageEntry & { readonly path: string } {
    return (
        Number.isInteger(entry.pageNumber) &&
        entry.pageNumber >= 1 &&
        entry.pageNumber <= pageCount &&
        typeof entry.path === "string" &&
        isOwnedPageSourcePath(entry.path, uid, projectId, entry.pageNumber)
    );
}

export const updateFloorplanPages = onCall<
    UpdateFloorplanPagesRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
    if (project.pages.some((page) => page.status === "PROCESSING")) {
        throw new HttpsError(
            "failed-precondition",
            "Page settings cannot be changed while analysis is running.",
        );
    }
    const data = request.data;

    const hasScale = hasField(data, "scaleMmPerPx");
    const hasCeilingHeight = hasField(data, "ceilingHeightMm");

    if (!hasScale && !hasCeilingHeight) {
        throw new HttpsError(
            "invalid-argument",
            "Scale or ceiling height is required.",
        );
    }

    for (const page of project.pages) {
        const nextValues = nextBatchPageValues(data, page);

        await dcUpdateFloorplanPage({
            id: page.id,
            overlayJson: page.overlayJson ?? null,
            scaleMmPerPx: nextValues.scaleMmPerPx,
            ceilingHeightMm: nextValues.ceilingHeightMm,
            referencePointsJson: page.referencePointsJson ?? null,
            referenceLengthMm: page.referenceLengthMm ?? null,
        });
    }

    await touchProject({ id: projectId });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

function nextFloorplanPageValues(
    data: UpdateFloorplanPageRequest,
    page: FloorplanPageRow,
) {
    return {
        ceilingHeightMm: nextNullableNumber(
            data,
            "ceilingHeightMm",
            "Ceiling height",
            page.ceilingHeightMm,
        ),
        overlayJson: nextOverlayJson(data, page),
        referenceLengthMm: nextNullableNumber(
            data,
            "referenceLengthMm",
            "Reference length",
            page.referenceLengthMm,
        ),
        referencePointsJson: nextReferencePointsJson(data, page),
        scaleMmPerPx: nextNullableNumber(
            data,
            "scaleMmPerPx",
            "Scale",
            page.scaleMmPerPx,
        ),
    };
}

function nextOverlayJson(
    data: UpdateFloorplanPageRequest,
    page: FloorplanPageRow,
) {
    if (!hasField(data, "overlay")) {
        return page.overlayJson ?? null;
    }

    return JSON.stringify(data.overlay ?? { areas: [] });
}

function nextReferencePointsJson(
    data: UpdateFloorplanPageRequest,
    page: FloorplanPageRow,
) {
    if (!hasField(data, "referencePoints")) {
        return page.referencePointsJson ?? null;
    }

    return data.referencePoints == null
        ? null
        : JSON.stringify(data.referencePoints);
}

function nextBatchPageValues(
    data: UpdateFloorplanPagesRequest,
    page: FloorplanPageRow,
) {
    return {
        scaleMmPerPx: nextNullableNumber(
            data,
            "scaleMmPerPx",
            "Scale",
            page.scaleMmPerPx,
        ),
        ceilingHeightMm: nextNullableNumber(
            data,
            "ceilingHeightMm",
            "Ceiling height",
            page.ceilingHeightMm,
        ),
    };
}

function nextNullableNumber(
    data: Partial<Record<NullableNumberField, unknown>>,
    field: NullableNumberField,
    label: string,
    current: number | null | undefined,
) {
    if (!hasField(data, field)) {
        return current ?? null;
    }

    return readNullableNumber(data[field], label) ?? current ?? null;
}

type NullableNumberField =
    "ceilingHeightMm" | "referenceLengthMm" | "scaleMmPerPx";
