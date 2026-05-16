/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { randomUUID } from "node:crypto";
import {
    createMovie,
    createProjectFromUpload as dcCreateProjectFromUpload,
    createFloorplanPage as dcCreateFloorplanPage,
    deleteMovie,
    deleteProject as dcDeleteProject,
    deleteFloorplanPages as dcDeleteFloorplanPages,
    getProjectById,
    getFloorplanPageById,
    listMovies,
    listProjectsByOwner,
    renameProject as dcRenameProject,
    touchProject,
    updateFloorplanPage as dcUpdateFloorplanPage,
    type GetProjectByIdData,
    type GetFloorplanPageByIdData,
    type ListMoviesData,
    type ListProjectsByOwnerData,
} from "@inivi/example-data-connector";
import { setGlobalOptions } from "firebase-functions";
import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({
    maxInstances: 5,
    region: "us-west1",
});

if (getApps().length === 0) {
    initializeApp();
}

type Movie = ListMoviesData["movies"][number];
type ProjectListRow = ListProjectsByOwnerData["projects"][number];
type ProjectWithPages = NonNullable<GetProjectByIdData["project"]>;
type FloorplanPageRow = NonNullable<GetFloorplanPageByIdData["floorplanPage"]>;

interface CreateExampleMovieRequest {
    title?: unknown;
    genre?: unknown;
    imageUrl?: unknown;
}

interface DeleteExampleMovieRequest {
    id?: unknown;
}

interface ExampleMoviesResponse {
    movies: Movie[];
}

type UploadType = "PDF" | "IMAGE";
type ProjectStatus = "DRAFT" | "PROCESSING" | "READY" | "FAILED";

interface ProjectSummary {
    id: string;
    name: string;
    originalFileName: string;
    uploadType: UploadType;
    status: ProjectStatus;
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
}

interface FloorplanPage {
    id: string;
    pageNumber: number;
    status: ProjectStatus;
    imageUrl: string;
    previewUrl: string;
    overlay: string | null;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: string | null;
    referenceLengthMm: number | null;
    processingStrategy?: string | null;
    processingMetadata?: string | null;
    updatedAt: string;
}

interface ProjectDetail extends ProjectSummary {
    ownerId?: string | null;
    pages: FloorplanPage[];
}

interface PdfPagePreview {
    pageNumber: number;
    previewUrl: string;
}

interface ProcessingStrategyInfo {
    key: string;
    label: string;
    description: string;
    defaultStrategy: boolean;
}

interface UploadResponse {
    projectId: string;
    uploadType: UploadType;
    pageCount: number;
    status: ProjectStatus;
}

interface CreateProjectFromUploadRequest {
    projectId?: unknown;
    name?: unknown;
    originalFileName?: unknown;
    contentType?: unknown;
    size?: unknown;
    storagePath?: unknown;
}

interface ProjectIdRequest {
    projectId?: unknown;
}

interface RenameProjectRequest extends ProjectIdRequest {
    name?: unknown;
}

interface ProcessProjectRequest extends ProjectIdRequest {
    pageNumbers?: unknown;
    strategyKey?: unknown;
}

interface UpdateFloorplanPageRequest extends ProjectIdRequest {
    pageId?: unknown;
    overlay?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
}

interface UpdateFloorplanPagesRequest extends ProjectIdRequest {
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
}

interface ExportProjectCsvResponse {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
}

const processingStrategies: ProcessingStrategyInfo[] = [
    {
        key: "mock-empty-overlay",
        label: "Mock empty overlay",
        description:
            "Creates editable placeholder pages until real processing is implemented.",
        defaultStrategy: true,
    },
    {
        key: "mock-detected-rooms",
        label: "Mock detected rooms",
        description: "Creates a sample detected room overlay for UI testing.",
        defaultStrategy: false,
    },
];

function requireAuth(request: CallableRequest<unknown>) {
    const auth = request.auth;

    if (!auth) {
        throw new HttpsError(
            "unauthenticated",
            "Must be signed in to call this function.",
        );
    }

    return auth;
}

function readRequiredString(value: unknown, field: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value.trim();
}

function readRequiredNumber(value: unknown, field: string) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value;
}

function readOptionalString(value: unknown) {
    if (value == null || value === "") {
        return undefined;
    }

    if (typeof value !== "string") {
        throw new HttpsError("invalid-argument", "Expected a string value.");
    }

    return value.trim();
}

function readNullableNumber(value: unknown, field: string) {
    if (value == null || value === "") {
        return null;
    }

    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} must be a number.`);
    }

    return value;
}

function hasField(data: object, field: string) {
    return Object.prototype.hasOwnProperty.call(data, field);
}

export const helloWorld = onCall((request) => {
    const auth = requireAuth(request);
    const name = auth.token["name"] ?? auth.token.email ?? "stranger";
    logger.info("Hello logs!", { structuredData: true });
    return { message: `Hello, ${name}!` };
});

export const listExampleMovies = onCall<
    unknown,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    const response = await listMovies();
    return { movies: response.data.movies };
});

export const createExampleMovie = onCall<
    CreateExampleMovieRequest,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    await createMovie({
        title: readRequiredString(request.data.title, "Title"),
        genre: readRequiredString(request.data.genre, "Genre"),
        imageUrl: readRequiredString(request.data.imageUrl, "Image URL"),
    });

    const response = await listMovies();
    return { movies: response.data.movies };
});

export const deleteExampleMovie = onCall<
    DeleteExampleMovieRequest,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    await deleteMovie({
        id: readRequiredString(request.data.id, "Movie ID"),
    });

    const response = await listMovies();
    return { movies: response.data.movies };
});

export const listProjects = onCall<
    unknown,
    Promise<{ projects: ProjectSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await listProjectsByOwner({ ownerId: auth.uid });
    return { projects: response.data.projects.map(toSummary) };
});

export const createProjectFromUpload = onCall<
    CreateProjectFromUploadRequest,
    Promise<UploadResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const name = readRequiredString(request.data.name, "Name");
    const originalFileName = readRequiredString(
        request.data.originalFileName,
        "Original file name",
    );
    const contentType = readRequiredString(
        request.data.contentType,
        "Content type",
    );
    const storagePath = readRequiredString(
        request.data.storagePath,
        "Storage path",
    );
    readRequiredNumber(request.data.size, "Size");

    if (!isOwnedUploadPath(storagePath, auth.uid, projectId)) {
        throw new HttpsError(
            "permission-denied",
            "Upload path must belong to the signed-in user.",
        );
    }

    const [exists] = await getStorage().bucket().file(storagePath).exists();
    if (!exists) {
        throw new HttpsError("not-found", "Uploaded file was not found.");
    }

    const uploadType = inferUploadType(originalFileName, contentType);
    const pageCount = uploadType === "PDF" ? 3 : 1;
    const response = await dcCreateProjectFromUpload({
        id: projectId,
        ownerId: auth.uid,
        name,
        originalFileName,
        uploadType,
        originalPath: storagePath,
        status: "DRAFT",
        pageCount,
    });

    return {
        projectId: response.data.project_insert.id,
        uploadType,
        pageCount,
        status: "DRAFT",
    };
});

export const getProject = onCall<ProjectIdRequest, Promise<ProjectDetail>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        return toDetail(project);
    },
);

export const renameProject = onCall<
    RenameProjectRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    await dcRenameProject({
        id: projectId,
        name: readRequiredString(request.data.name, "Name"),
    });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

export const deleteProject = onCall<ProjectIdRequest, Promise<{ ok: true }>>(
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const project = await requireOwnedProject(projectId, auth.uid);

        await deleteOwnedProjectStorage(project, auth.uid);
        await dcDeleteFloorplanPages({ projectId });
        await dcDeleteProject({ id: projectId });

        return { ok: true };
    },
);

export const listProjectPdfPagePreviews = onCall<
    ProjectIdRequest,
    Promise<{ pages: PdfPagePreview[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const project = await requireOwnedProject(
        readRequiredString(request.data.projectId, "Project ID"),
        auth.uid,
    );

    // Deprecated mock: move PDF thumbnail rendering to the web client with PDF.js.
    const pages =
        project.uploadType === "PDF"
            ? Array.from({ length: project.pageCount }, (_, index) => ({
                  pageNumber: index + 1,
                  previewUrl: mockImageDataUrl(`PDF page ${index + 1}`),
              }))
            : [];

    return { pages };
});

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
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
    const pageNumbers = readPageNumbers(request.data.pageNumbers, project);
    const strategyKey = readOptionalString(request.data.strategyKey);
    const strategy =
        processingStrategies.find((item) => item.key === strategyKey) ??
        processingStrategies[0];

    if (!strategy) {
        throw new HttpsError(
            "internal",
            "No processing strategy is configured.",
        );
    }

    await touchProject({
        id: projectId,
        status: "PROCESSING",
        processingError: null,
    });
    await dcDeleteFloorplanPages({ projectId });

    for (const pageNumber of pageNumbers) {
        const page = createMockPage(pageNumber, strategy.key);
        await dcCreateFloorplanPage({
            projectId,
            pageNumber: page.pageNumber,
            status: page.status,
            sourceImagePath: page.imageUrl,
            previewImagePath: page.previewUrl,
            overlayJson: page.overlay,
            scaleMmPerPx: page.scaleMmPerPx,
            ceilingHeightMm: page.ceilingHeightMm,
            referencePointsJson: page.referencePoints,
            referenceLengthMm: page.referenceLengthMm,
            processingStrategy: page.processingStrategy ?? null,
            processingMetadataJson: page.processingMetadata ?? null,
        });
    }

    await touchProject({
        id: projectId,
        status: "READY",
        processingError: null,
    });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

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
    const data = request.data;
    const overlayJson = hasField(data, "overlay")
        ? JSON.stringify(data.overlay ?? { areas: [] })
        : page.overlayJson;
    const scaleMmPerPx = hasField(data, "scaleMmPerPx")
        ? readNullableNumber(data.scaleMmPerPx, "Scale")
        : (page.scaleMmPerPx ?? null);
    const ceilingHeightMm = hasField(data, "ceilingHeightMm")
        ? readNullableNumber(data.ceilingHeightMm, "Ceiling height")
        : (page.ceilingHeightMm ?? null);
    const referencePointsJson = hasField(data, "referencePoints")
        ? data.referencePoints == null
            ? null
            : JSON.stringify(data.referencePoints)
        : (page.referencePointsJson ?? null);
    const referenceLengthMm = hasField(data, "referenceLengthMm")
        ? readNullableNumber(data.referenceLengthMm, "Reference length")
        : (page.referenceLengthMm ?? null);

    await dcUpdateFloorplanPage({
        id: page.id,
        overlayJson: overlayJson ?? null,
        scaleMmPerPx,
        ceilingHeightMm,
        referencePointsJson,
        referenceLengthMm,
    });
    await touchProject({ id: projectId });

    return toPage(await requireFloorplanPage(projectId, page.id));
});

export const updateFloorplanPages = onCall<
    UpdateFloorplanPagesRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
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
        const nextScaleMmPerPx: number | null = hasScale
            ? (readNullableNumber(data.scaleMmPerPx, "Scale") ??
              page.scaleMmPerPx ??
              null)
            : (page.scaleMmPerPx ?? null);
        const nextCeilingHeightMm: number | null = hasCeilingHeight
            ? (readNullableNumber(data.ceilingHeightMm, "Ceiling height") ??
              page.ceilingHeightMm ??
              null)
            : (page.ceilingHeightMm ?? null);

        await dcUpdateFloorplanPage({
            id: page.id,
            overlayJson: page.overlayJson ?? null,
            scaleMmPerPx: nextScaleMmPerPx,
            ceilingHeightMm: nextCeilingHeightMm,
            referencePointsJson: page.referencePointsJson ?? null,
            referenceLengthMm: page.referenceLengthMm ?? null,
        });
    }

    await touchProject({ id: projectId });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

export const exportProjectCsv = onCall<
    ProjectIdRequest,
    Promise<ExportProjectCsvResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const project = await requireOwnedProject(
        readRequiredString(request.data.projectId, "Project ID"),
        auth.uid,
    );

    return {
        fileName: `plaster-estimate-${csvFileNamePart(project.name)}.csv`,
        mimeType: "text/csv",
        csv: buildProjectCsv(project),
    };
});

async function requireOwnedProject(projectId: string, ownerId: string) {
    const response = await getProjectById({ id: projectId });
    const project = response.data.project;
    if (!project || project.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Project was not found.");
    }

    return project;
}

async function requireFloorplanPage(projectId: string, pageId: string) {
    const response = await getFloorplanPageById({ projectId, pageId });
    const page = response.data.floorplanPage;
    if (!page) {
        throw new HttpsError("not-found", "Page was not found.");
    }

    return page;
}

function toSummary(project: ProjectListRow | ProjectWithPages): ProjectSummary {
    return {
        id: project.id,
        name: project.name,
        originalFileName: project.originalFileName,
        uploadType: toUploadType(project.uploadType),
        status: toProjectStatus(project.status),
        processingError: project.processingError ?? null,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        pageCount: project.pageCount,
    };
}

function toDetail(project: ProjectWithPages): ProjectDetail {
    return {
        ...toSummary(project),
        ownerId: project.ownerId,
        pages: project.pages.map(toPage),
    };
}

function toPage(page: FloorplanPageRow): FloorplanPage {
    const imageUrl = storagePathToUrl(page.sourceImagePath);
    return {
        id: page.id,
        pageNumber: page.pageNumber,
        status: toProjectStatus(page.status),
        imageUrl,
        previewUrl: storagePathToUrl(page.previewImagePath) || imageUrl,
        overlay: page.overlayJson ?? null,
        scaleMmPerPx: page.scaleMmPerPx ?? null,
        ceilingHeightMm: page.ceilingHeightMm ?? null,
        referencePoints: page.referencePointsJson ?? null,
        referenceLengthMm: page.referenceLengthMm ?? null,
        processingStrategy: page.processingStrategy ?? null,
        processingMetadata: page.processingMetadataJson ?? null,
        updatedAt: page.updatedAt,
    };
}

function toUploadType(value: string): UploadType {
    return value === "PDF" ? "PDF" : "IMAGE";
}

function toProjectStatus(value: string): ProjectStatus {
    if (
        value === "DRAFT" ||
        value === "PROCESSING" ||
        value === "READY" ||
        value === "FAILED"
    ) {
        return value;
    }

    return "DRAFT";
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

function inferUploadType(fileName: string, contentType: string): UploadType {
    const lowerName = fileName.toLowerCase();
    const lowerType = contentType.toLowerCase();
    return lowerName.endsWith(".pdf") || lowerType.includes("pdf")
        ? "PDF"
        : "IMAGE";
}

function isOwnedUploadPath(
    storagePath: string,
    uid: string,
    projectId: string,
) {
    return storagePath.startsWith(
        `uploads/${uid}/projects/${projectId}/uploads/`,
    );
}

async function deleteOwnedProjectStorage(
    project: ProjectWithPages,
    uid: string,
) {
    const bucket = getStorage().bucket();
    const paths = [
        project.originalPath,
        ...project.pages.flatMap((page) => [
            page.sourceImagePath,
            page.previewImagePath,
            page.rawJsonPath,
            page.rawFloorplanPath,
        ]),
    ].filter((path): path is string => Boolean(path));

    for (const path of new Set(paths)) {
        if (path.startsWith(`uploads/${uid}/`) && !path.startsWith("data:")) {
            await bucket.file(path).delete({ ignoreNotFound: true });
        }
    }

    await bucket.deleteFiles({
        force: true,
        prefix: `uploads/${uid}/projects/${project.id}/`,
    });
}

function storagePathToUrl(path?: string | null) {
    if (!path) {
        return "";
    }

    if (path.startsWith("data:") || path.startsWith("http")) {
        return path;
    }

    const bucketName = getStorage().bucket().name;
    return `https://storage.googleapis.com/${bucketName}/${encodeStoragePath(path)}`;
}

function encodeStoragePath(path: string) {
    return path
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
}

function createMockPage(
    pageNumber: number,
    strategyKey: string,
): FloorplanPage {
    const now = new Date().toISOString();
    const overlay =
        strategyKey === "mock-detected-rooms"
            ? {
                  imageSizePx: { width: 1200, height: 900 },
                  areas: [
                      {
                          id: randomUUID(),
                          label: `Area ${pageNumber}`,
                          points: [
                              [180, 180],
                              [620, 180],
                              [620, 480],
                              [180, 480],
                          ],
                          wallPlasterType: "Recessed Edge",
                          ceilingPlasterType: "Recessed Edge",
                          source: "detected",
                          deleted: false,
                      },
                  ],
              }
            : { imageSizePx: { width: 1200, height: 900 }, areas: [] };

    return {
        id: randomUUID(),
        pageNumber,
        status: "READY",
        imageUrl: mockImageDataUrl(`Project page ${pageNumber}`),
        previewUrl: mockImageDataUrl(`Preview ${pageNumber}`),
        overlay: JSON.stringify(overlay),
        scaleMmPerPx: null,
        ceilingHeightMm: null,
        referencePoints: null,
        referenceLengthMm: null,
        processingStrategy: strategyKey,
        processingMetadata: JSON.stringify({ mocked: true }),
        updatedAt: now,
    };
}

function mockImageDataUrl(label: string) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#eef3f5"/><path d="M160 150h880v600H160zM300 150v600M160 360h880M720 360v390" fill="none" stroke="#64748b" stroke-width="18"/><text x="600" y="820" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#334155">${escapeXml(label)}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildProjectCsv(project: ProjectWithPages) {
    const rows: ExportRow[] = [];
    const wallColumns = new Set<string>();
    const ceilingColumns = new Set<string>();

    for (const page of project.pages) {
        if (!page.overlayJson || page.scaleMmPerPx == null) {
            continue;
        }

        const overlay = parseJsonObject(page.overlayJson);
        const areas = Array.isArray(overlay["areas"]) ? overlay["areas"] : [];

        for (const area of areas) {
            if (!isRecord(area) || Boolean(area["deleted"])) {
                continue;
            }

            const row: ExportRow = {
                label:
                    typeof area["label"] === "string" ? area["label"] : "Area",
                pageNumber: page.pageNumber,
                wallValues: wallBreakdown(
                    area,
                    page.scaleMmPerPx,
                    page.ceilingHeightMm ?? null,
                ),
                ceilingValues: new Map([
                    [
                        ceilingColumn(area),
                        ceilingAreaM2(area, page.scaleMmPerPx),
                    ],
                ]),
            };

            row.wallValues.forEach((_, key) => wallColumns.add(key));
            row.ceilingValues.forEach((_, key) => ceilingColumns.add(key));
            rows.push(row);
        }
    }

    const sortedWallColumns = Array.from(wallColumns).sort();
    const sortedCeilingColumns = Array.from(ceilingColumns).sort();
    const totals = new Map<string, number>();
    const csvRows = [
        [
            "Area Label",
            "Page Number",
            ...sortedWallColumns,
            ...sortedCeilingColumns,
        ],
    ];

    for (const row of rows) {
        const cells = [row.label, String(row.pageNumber)];
        for (const column of sortedWallColumns) {
            const value = row.wallValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        for (const column of sortedCeilingColumns) {
            const value = row.ceilingValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        csvRows.push(cells);
    }

    csvRows.push([
        "Total",
        "",
        ...sortedWallColumns.map((column) =>
            formatNumber(totals.get(column) ?? 0),
        ),
        ...sortedCeilingColumns.map((column) =>
            formatNumber(totals.get(column) ?? 0),
        ),
    ]);

    return csvRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

interface ExportRow {
    label: string;
    pageNumber: number;
    wallValues: Map<string, number>;
    ceilingValues: Map<string, number>;
}

type JsonRecord = Record<string, unknown>;
type Point = [number, number];

function addTotal(totals: Map<string, number>, column: string, value: number) {
    totals.set(column, (totals.get(column) ?? 0) + value);
}

function ceilingColumn(area: JsonRecord) {
    const ceilingType = readString(area["ceilingPlasterType"], "Recessed Edge");
    return `Ceiling (${ceilingType}) in m2`;
}

function ceilingAreaM2(area: JsonRecord, scaleMmPerPx: number) {
    const points = readPoints(area["points"]);
    const flatM2 = polygonAreaPx(points) * Math.pow(scaleMmPerPx / 1000, 2);
    if (readString(area["ceilingMode"], "flat") !== "raked") {
        return flatM2;
    }

    const raked = isRecord(area["rakedCeiling"]) ? area["rakedCeiling"] : null;
    if (!raked) {
        return flatM2;
    }

    const lowEdgeIndex = readInteger(raked["lowEdgeIndex"], -1);
    const highEdgeIndex = readInteger(raked["highEdgeIndex"], -1);
    const lowHeight = readNumberOrNull(raked["lowHeightMm"]);
    const highHeight = readNumberOrNull(raked["highHeightMm"]);
    if (
        lowHeight == null ||
        highHeight == null ||
        lowEdgeIndex === highEdgeIndex
    ) {
        return flatM2;
    }

    const runM =
        (edgeMidpointDistance(points, lowEdgeIndex, highEdgeIndex) *
            scaleMmPerPx) /
        1000;
    if (runM <= 0) {
        return flatM2;
    }

    const riseM = Math.abs(highHeight - lowHeight) / 1000;
    return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
}

function edgeMidpointDistance(
    points: Point[],
    firstEdge: number,
    secondEdge: number,
) {
    if (
        firstEdge < 0 ||
        secondEdge < 0 ||
        firstEdge >= points.length ||
        secondEdge >= points.length
    ) {
        return 0;
    }

    const firstA = points[firstEdge];
    const firstB = points[(firstEdge + 1) % points.length];
    const secondA = points[secondEdge];
    const secondB = points[(secondEdge + 1) % points.length];
    if (!firstA || !firstB || !secondA || !secondB) {
        return 0;
    }

    const firstX = (firstA[0] + firstB[0]) / 2;
    const firstY = (firstA[1] + firstB[1]) / 2;
    const secondX = (secondA[0] + secondB[0]) / 2;
    const secondY = (secondA[1] + secondB[1]) / 2;
    return Math.hypot(secondX - firstX, secondY - firstY);
}

function wallBreakdown(
    area: JsonRecord,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
) {
    const totals = new Map<string, number>();
    if (Boolean(area["isOutdoor"])) {
        return totals;
    }

    const points = readPoints(area["points"]);
    if (points.length < 2) {
        return totals;
    }

    const overrides: JsonRecord = isRecord(area["edgeOverrides"])
        ? area["edgeOverrides"]
        : {};

    for (let index = 0; index < points.length; index += 1) {
        const rawOverride = overrides[String(index)];
        const override: JsonRecord | null = isRecord(rawOverride)
            ? rawOverride
            : null;
        if (override && Boolean(override["noPlaster"])) {
            continue;
        }

        const wallType =
            override && typeof override["wallPlasterType"] === "string"
                ? override["wallPlasterType"]
                : readString(area["wallPlasterType"], "Recessed Edge");
        const height = wallHeightForEdge(area, pageHeightMm, index);
        const column = `${wallType} @ ${heightLabel(height)} in m`;
        const a = points[index];
        const b = points[(index + 1) % points.length];
        if (!a || !b) {
            continue;
        }

        const lengthM =
            (Math.hypot(b[0] - a[0], b[1] - a[1]) * scaleMmPerPx) / 1000;
        totals.set(column, (totals.get(column) ?? 0) + lengthM);
    }

    return totals;
}

function wallHeightForEdge(
    area: JsonRecord,
    pageHeightMm: number | null,
    edgeIndex: number,
) {
    if (
        readString(area["ceilingMode"], "flat") === "raked" &&
        isRecord(area["rakedCeiling"])
    ) {
        const raked = area["rakedCeiling"];
        const low = readNumberOrNull(raked["lowHeightMm"]);
        const high = readNumberOrNull(raked["highHeightMm"]);
        if (low != null && high != null) {
            return edgeIndex === readInteger(raked["lowEdgeIndex"], -1)
                ? low
                : high;
        }
    }

    const areaHeight = readNumberOrNull(area["ceilingHeightMm"]);
    if (areaHeight != null) {
        return areaHeight;
    }

    return pageHeightMm ?? 0;
}

function parseJsonObject(value: string): JsonRecord {
    try {
        const parsed: unknown = JSON.parse(value);
        return isRecord(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

function readPoints(value: unknown): Point[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.flatMap((item) => {
        if (
            Array.isArray(item) &&
            item.length >= 2 &&
            typeof item[0] === "number" &&
            typeof item[1] === "number"
        ) {
            return [[item[0], item[1]] as Point];
        }

        return [];
    });
}

function polygonAreaPx(points: Point[]) {
    if (points.length < 3) {
        return 0;
    }

    let sum = 0;
    for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        if (!current || !next) {
            continue;
        }
        sum += current[0] * next[1] - next[0] * current[1];
    }

    return Math.abs(sum) / 2;
}

function isRecord(value: unknown): value is JsonRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, fallback: string) {
    return typeof value === "string" ? value : fallback;
}

function readInteger(value: unknown, fallback: number) {
    return typeof value === "number" && Number.isInteger(value)
        ? value
        : fallback;
}

function readNumberOrNull(value: unknown) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function heightLabel(heightMm: number) {
    return `${heightMm.toFixed(0)}mm`;
}

function formatNumber(value: number) {
    return value.toFixed(3);
}

function csvFileNamePart(value: string) {
    const cleaned = value
        .trim()
        .replace(/[^A-Za-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return cleaned || "project";
}

function csvCell(value: string) {
    return `"${value.replace(/"/g, '""')}"`;
}
