/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { getApps, initializeApp } from "firebase-admin/app";
import { randomUUID } from "node:crypto";
import {
    createMovie,
    deleteMovie,
    listMovies,
    type ListMoviesData,
} from "@inivi/example-data-connector";
import { setGlobalOptions } from "firebase-functions";
import {
    onCall,
    HttpsError,
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
setGlobalOptions({ maxInstances: 10 });

if (getApps().length === 0) {
    initializeApp();
}

type Movie = ListMoviesData["movies"][number];

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

type UploadType = "PDF" | "IMAGE";
type PlanStatus = "DRAFT" | "PROCESSING" | "READY" | "FAILED";

interface PlanSummary {
    id: string;
    name: string;
    originalFileName: string;
    uploadType: UploadType;
    status: PlanStatus;
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
}

interface PlanPage {
    id: string;
    pageNumber: number;
    status: PlanStatus;
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

interface PlanDetail extends PlanSummary {
    ownerId?: string | null;
    pages: PlanPage[];
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
    planId: string;
    uploadType: UploadType;
    pageCount: number;
    status: PlanStatus;
}

interface CreatePlanFromUploadRequest {
    name?: unknown;
    originalFileName?: unknown;
    contentType?: unknown;
    size?: unknown;
    storagePath?: unknown;
}

interface PlanIdRequest {
    planId?: unknown;
}

interface RenamePlanRequest extends PlanIdRequest {
    name?: unknown;
}

interface ProcessPlanRequest extends PlanIdRequest {
    pageNumbers?: unknown;
    strategyKey?: unknown;
}

interface SavePlanPageOverlayRequest extends PlanIdRequest {
    pageId?: unknown;
    overlay?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
}

interface ApplyPlanCeilingHeightRequest extends PlanIdRequest {
    ceilingHeightMm?: unknown;
}

interface ApplyPlanScaleRequest extends PlanIdRequest {
    scaleMmPerPx?: unknown;
}

interface ExportPlanCsvResponse {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
}

const mockPlans = new Map<string, PlanDetail>();

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

export const listPlans = onCall<unknown, { plans: PlanSummary[] }>(
    (request) => {
        const auth = requireAuth(request);
        ensureSeedPlan(auth.uid);

        const plans = Array.from(mockPlans.values())
            .filter((plan) => plan.ownerId === auth.uid)
            .sort((left, right) =>
                right.updatedAt.localeCompare(left.updatedAt),
            )
            .map(toSummary);

        return { plans };
    },
);

export const createPlanFromUpload = onCall<
    CreatePlanFromUploadRequest,
    UploadResponse
>((request) => {
    const auth = requireAuth(request);
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

    if (!storagePath.startsWith(`plans/${auth.uid}/uploads/`)) {
        throw new HttpsError(
            "permission-denied",
            "Upload path must belong to the signed-in user.",
        );
    }

    const now = new Date().toISOString();
    const uploadType = inferUploadType(originalFileName, contentType);
    const pageCount = uploadType === "PDF" ? 3 : 1;
    const plan: PlanDetail = {
        id: randomUUID(),
        ownerId: auth.uid,
        name,
        originalFileName,
        uploadType,
        status: "DRAFT",
        processingError: null,
        createdAt: now,
        updatedAt: now,
        pageCount,
        pages: [],
    };

    mockPlans.set(plan.id, plan);
    return {
        planId: plan.id,
        uploadType: plan.uploadType,
        pageCount: plan.pageCount,
        status: plan.status,
    };
});

export const getPlan = onCall<PlanIdRequest, PlanDetail>((request) => {
    const auth = requireAuth(request);
    const planId = readRequiredString(request.data.planId, "Plan ID");
    ensureSeedPlan(auth.uid, planId);
    return clonePlan(requirePlan(planId, auth.uid));
});

export const renamePlan = onCall<RenamePlanRequest, PlanDetail>((request) => {
    const auth = requireAuth(request);
    const plan = requirePlan(
        readRequiredString(request.data.planId, "Plan ID"),
        auth.uid,
    );
    plan.name = readRequiredString(request.data.name, "Name");
    touch(plan);
    return clonePlan(plan);
});

export const deletePlan = onCall<PlanIdRequest, { ok: true }>((request) => {
    const auth = requireAuth(request);
    const plan = requirePlan(
        readRequiredString(request.data.planId, "Plan ID"),
        auth.uid,
    );
    mockPlans.delete(plan.id);
    return { ok: true };
});

export const listPdfPagePreviews = onCall<
    PlanIdRequest,
    { pages: PdfPagePreview[] }
>((request) => {
    const auth = requireAuth(request);
    const plan = requirePlan(
        readRequiredString(request.data.planId, "Plan ID"),
        auth.uid,
    );
    const pages =
        plan.uploadType === "PDF"
            ? Array.from({ length: plan.pageCount }, (_, index) => ({
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

export const processPlan = onCall<ProcessPlanRequest, PlanDetail>((request) => {
    const auth = requireAuth(request);
    const plan = requirePlan(
        readRequiredString(request.data.planId, "Plan ID"),
        auth.uid,
    );
    const pageNumbers = readPageNumbers(request.data.pageNumbers, plan);
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

    plan.pages = pageNumbers.map((pageNumber) =>
        createMockPage(pageNumber, strategy.key),
    );
    plan.status = "READY";
    plan.processingError = null;
    touch(plan);

    return clonePlan(plan);
});

export const getPlanPage = onCall<SavePlanPageOverlayRequest, PlanPage>(
    (request) => {
        const auth = requireAuth(request);
        const plan = requirePlan(
            readRequiredString(request.data.planId, "Plan ID"),
            auth.uid,
        );
        return clonePage(
            requirePage(
                plan,
                readRequiredString(request.data.pageId, "Page ID"),
            ),
        );
    },
);

export const savePlanPageOverlay = onCall<SavePlanPageOverlayRequest, PlanPage>(
    (request) => {
        const auth = requireAuth(request);
        const plan = requirePlan(
            readRequiredString(request.data.planId, "Plan ID"),
            auth.uid,
        );
        const page = requirePage(
            plan,
            readRequiredString(request.data.pageId, "Page ID"),
        );

        page.overlay = JSON.stringify(request.data.overlay ?? { areas: [] });
        page.scaleMmPerPx = readNullableNumber(
            request.data.scaleMmPerPx,
            "Scale",
        );
        page.ceilingHeightMm = readNullableNumber(
            request.data.ceilingHeightMm,
            "Ceiling height",
        );
        page.referencePoints =
            request.data.referencePoints == null
                ? null
                : JSON.stringify(request.data.referencePoints);
        page.referenceLengthMm = readNullableNumber(
            request.data.referenceLengthMm,
            "Reference length",
        );
        page.updatedAt = new Date().toISOString();
        touch(plan);

        return clonePage(page);
    },
);

export const applyPlanCeilingHeight = onCall<
    ApplyPlanCeilingHeightRequest,
    PlanDetail
>((request) => {
    const auth = requireAuth(request);
    const plan = requirePlan(
        readRequiredString(request.data.planId, "Plan ID"),
        auth.uid,
    );
    const ceilingHeightMm = readNullableNumber(
        request.data.ceilingHeightMm,
        "Ceiling height",
    );

    plan.pages.forEach((page) => {
        page.ceilingHeightMm = ceilingHeightMm;
        page.updatedAt = new Date().toISOString();
    });
    touch(plan);
    return clonePlan(plan);
});

export const applyPlanScale = onCall<ApplyPlanScaleRequest, PlanDetail>(
    (request) => {
        const auth = requireAuth(request);
        const plan = requirePlan(
            readRequiredString(request.data.planId, "Plan ID"),
            auth.uid,
        );
        const scaleMmPerPx = readNullableNumber(
            request.data.scaleMmPerPx,
            "Scale",
        );

        plan.pages.forEach((page) => {
            page.scaleMmPerPx = scaleMmPerPx;
            page.updatedAt = new Date().toISOString();
        });
        touch(plan);
        return clonePlan(plan);
    },
);

export const exportPlanCsv = onCall<PlanIdRequest, ExportPlanCsvResponse>(
    (request) => {
        const auth = requireAuth(request);
        const plan = requirePlan(
            readRequiredString(request.data.planId, "Plan ID"),
            auth.uid,
        );
        const rows = [
            ["Plan", "Page", "Area count", "Scale mm/px", "Ceiling height mm"],
            ...plan.pages.map((page) => [
                plan.name,
                String(page.pageNumber),
                String(countAreas(page.overlay)),
                page.scaleMmPerPx == null ? "" : String(page.scaleMmPerPx),
                page.ceilingHeightMm == null
                    ? ""
                    : String(page.ceilingHeightMm),
            ]),
        ];

        return {
            fileName: `plaster-estimate-${csvFileNamePart(plan.name)}.csv`,
            mimeType: "text/csv",
            csv: rows.map((row) => row.map(csvCell).join(",")).join("\n"),
        };
    },
);

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

function readPageNumbers(value: unknown, plan: PlanDetail) {
    if (!Array.isArray(value) || value.length === 0) {
        return [1];
    }

    const numbers = value.map((item) =>
        readRequiredNumber(item, "Page number"),
    );
    const unique = Array.from(new Set(numbers)).sort(
        (left, right) => left - right,
    );

    if (plan.uploadType === "IMAGE") {
        return [1];
    }

    unique.forEach((pageNumber) => {
        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            pageNumber > plan.pageCount
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

function requirePlan(planId: string, ownerId: string) {
    const plan = mockPlans.get(planId);
    if (!plan || plan.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Plan was not found.");
    }

    return plan;
}

function requirePage(plan: PlanDetail, pageId: string) {
    const page = plan.pages.find((item) => item.id === pageId);
    if (!page) {
        throw new HttpsError("not-found", "Page was not found.");
    }

    return page;
}

function ensureSeedPlan(ownerId: string, preferredPlanId?: string) {
    const hasPlan = Array.from(mockPlans.values()).some(
        (plan) =>
            plan.ownerId === ownerId &&
            (preferredPlanId == null || plan.id === preferredPlanId),
    );
    if (hasPlan) {
        return;
    }

    const now = new Date().toISOString();
    const planId = preferredPlanId ?? randomUUID();
    const plan: PlanDetail = {
        id: planId,
        ownerId,
        name: "Mock test plan",
        originalFileName: "mock-floorplan.pdf",
        uploadType: "PDF",
        status: "READY",
        processingError: null,
        createdAt: now,
        updatedAt: now,
        pageCount: 1,
        pages: [createMockPage(1, "mock-detected-rooms", `${planId}-page-1`)],
    };

    mockPlans.set(plan.id, plan);
}

function createMockPage(
    pageNumber: number,
    strategyKey: string,
    pageId: string = randomUUID(),
): PlanPage {
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
        id: pageId,
        pageNumber,
        status: "READY",
        imageUrl: mockImageDataUrl(`Plan page ${pageNumber}`),
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

function toSummary(plan: PlanDetail): PlanSummary {
    return {
        id: plan.id,
        name: plan.name,
        originalFileName: plan.originalFileName,
        uploadType: plan.uploadType,
        status: plan.status,
        processingError: plan.processingError ?? null,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
        pageCount: plan.pageCount,
    };
}

function touch(plan: PlanDetail) {
    plan.updatedAt = new Date().toISOString();
}

function clonePlan(plan: PlanDetail): PlanDetail {
    return {
        ...plan,
        pages: plan.pages.map(clonePage),
    };
}

function clonePage(page: PlanPage): PlanPage {
    return { ...page };
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

function countAreas(overlay: string | null) {
    if (!overlay) {
        return 0;
    }

    try {
        const parsed = JSON.parse(overlay) as {
            areas?: Array<{ deleted?: boolean }>;
        };
        return parsed.areas?.filter((area) => !area.deleted).length ?? 0;
    } catch {
        return 0;
    }
}

function csvFileNamePart(value: string) {
    const cleaned = value
        .trim()
        .replace(/[^A-Za-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return cleaned || "plan";
}

function csvCell(value: string) {
    return `"${value.replace(/"/g, '""')}"`;
}
