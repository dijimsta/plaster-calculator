import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";

import { auth, functions, storage } from "@/firebase/firebase.utils.js";
import type {
    PdfPagePreview,
    PlanDetail,
    PlanPage,
    PlanSummary,
    ProcessingStrategyInfo,
} from "@/types.js";

type UploadResponse = {
    planId: string;
    uploadType: "PDF" | "IMAGE";
    pageCount: number;
    status: string;
};

type CreatePlanFromUploadRequest = {
    planId: string;
    name: string;
    originalFileName: string;
    contentType: string;
    size: number;
    storagePath: string;
};

type ProcessPlanRequest = {
    planId: string;
    pageNumbers: number[];
    strategyKey?: string;
};

type SavePageOverlayRequest = {
    planId: string;
    pageId: string;
    overlay: unknown;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: unknown;
    referenceLengthMm: number | null;
};

type ExportCsvResponse = {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
};

const listPlansCallable = httpsCallable<unknown, { plans: PlanSummary[] }>(
    functions,
    "listPlans",
);
const createPlanFromUploadCallable = httpsCallable<
    CreatePlanFromUploadRequest,
    UploadResponse
>(functions, "createPlanFromUpload");
const getPlanCallable = httpsCallable<{ planId: string }, PlanDetail>(
    functions,
    "getPlan",
);
const renamePlanCallable = httpsCallable<
    { planId: string; name: string },
    PlanDetail
>(functions, "renamePlan");
const deletePlanCallable = httpsCallable<{ planId: string }, { ok: true }>(
    functions,
    "deletePlan",
);
const listPdfPagePreviewsCallable = httpsCallable<
    { planId: string },
    { pages: PdfPagePreview[] }
>(functions, "listPdfPagePreviews");
const listProcessingStrategiesCallable = httpsCallable<
    unknown,
    { strategies: ProcessingStrategyInfo[] }
>(functions, "listProcessingStrategies");
const processPlanCallable = httpsCallable<ProcessPlanRequest, PlanDetail>(
    functions,
    "processPlan",
);
const getPlanPageCallable = httpsCallable<
    { planId: string; pageId: string },
    PlanPage
>(functions, "getPlanPage");
const updatePlanPageCallable = httpsCallable<
    SavePageOverlayRequest,
    PlanPage
>(functions, "updatePlanPage");
const updatePlanPagesCallable = httpsCallable<
    {
        planId: string;
        scaleMmPerPx?: number | null;
        ceilingHeightMm?: number | null;
    },
    PlanDetail
>(functions, "updatePlanPages");
const exportPlanCsvCallable = httpsCallable<
    { planId: string },
    ExportCsvResponse
>(functions, "exportPlanCsv");

export async function listPlans() {
    const result = await listPlansCallable();
    return result.data.plans;
}

export async function uploadPlan(name: string, file: File) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error("Must be signed in to upload a plan.");
    }

    const planId = crypto.randomUUID();
    const storagePath = `uploads/${uid}/projects/${planId}/uploads/${sanitizeStorageName(file.name)}`;
    await uploadBytes(ref(storage, storagePath), file, {
        contentType: file.type || "application/octet-stream",
    });

    const result = await createPlanFromUploadCallable({
        planId,
        name,
        originalFileName: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        storagePath,
    });
    return result.data;
}

function sanitizeStorageName(value: string) {
    return (
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, "-")
            .replace(/^-+|-+$/g, "") || "upload"
    );
}

export async function getPlan(planId: string) {
    const result = await getPlanCallable({ planId });
    return result.data;
}

export async function renamePlan(planId: string, name: string) {
    const result = await renamePlanCallable({ planId, name });
    return result.data;
}

export async function deletePlan(planId: string) {
    await deletePlanCallable({ planId });
}

export async function getPdfPages(planId: string) {
    const result = await listPdfPagePreviewsCallable({ planId });
    return result.data.pages;
}

export async function listProcessingStrategies() {
    const result = await listProcessingStrategiesCallable();
    return result.data.strategies;
}

export async function processPlan(
    planId: string,
    pageNumbers: number[],
    strategyKey?: string,
) {
    const result = await processPlanCallable({
        planId,
        pageNumbers,
        strategyKey,
    });
    return result.data;
}

export async function getPage(planId: string, pageId: string) {
    const result = await getPlanPageCallable({ planId, pageId });
    return result.data;
}

export async function savePageOverlay(
    planId: string,
    pageId: string,
    payload: unknown,
) {
    const body = payload as Partial<SavePageOverlayRequest>;
    const result = await updatePlanPageCallable({
        planId,
        pageId,
        overlay: body.overlay ?? { areas: [] },
        scaleMmPerPx: body.scaleMmPerPx ?? null,
        ceilingHeightMm: body.ceilingHeightMm ?? null,
        referencePoints: body.referencePoints ?? null,
        referenceLengthMm: body.referenceLengthMm ?? null,
    });
    return result.data;
}

export async function applyCeilingHeightToPlan(
    planId: string,
    ceilingHeightMm: number | null,
) {
    const result = await updatePlanPagesCallable({
        planId,
        ceilingHeightMm,
    });
    return result.data;
}

export async function applyScaleToPlan(
    planId: string,
    scaleMmPerPx: number | null,
) {
    const result = await updatePlanPagesCallable({ planId, scaleMmPerPx });
    return result.data;
}

export async function exportPlanCsv(planId: string) {
    const result = await exportPlanCsvCallable({ planId });
    return result.data;
}

